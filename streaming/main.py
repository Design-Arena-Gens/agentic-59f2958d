from __future__ import annotations

from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col,
    from_json,
    avg,
    window,
    to_timestamp,
    expr,
)
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    DoubleType,
    TimestampType,
)


def build_stream(spark: SparkSession):
    telemetry_schema = StructType(
        [
            StructField("asset_id", StringType()),
            StructField("region", StringType()),
            StructField("measurement", DoubleType()),
            StructField("temperature", DoubleType()),
            StructField("irradiance", DoubleType()),
            StructField("timestamp", StringType()),
        ]
    )

    raw_stream = (
        spark.readStream.format("kafka")
        .option("kafka.bootstrap.servers", "kafka:9092")
        .option("subscribe", "telemetry")
        .option("startingOffsets", "latest")
        .load()
    )

    parsed = (
        raw_stream.selectExpr("CAST(value AS STRING)")
        .select(from_json(col("value"), telemetry_schema).alias("payload"))
        .select("payload.*")
        .withColumn("ts", to_timestamp("timestamp"))
        .withColumn(
            "load_factor",
            expr(
                "measurement * (1 + (temperature - 22) * 0.01) * (1 + (irradiance/1000))"
            ),
        )
    )

    aggregates = (
        parsed.groupBy(
            window(col("ts"), "5 minutes", "1 minutes"),
            col("region"),
        )
        .agg(
            avg("measurement").alias("avg_measurement"),
            avg("load_factor").alias("avg_load_factor"),
            avg("temperature").alias("avg_temperature"),
        )
        .select(
            col("region"),
            col("window.start").alias("window_start"),
            col("window.end").alias("window_end"),
            col("avg_measurement"),
            col("avg_load_factor"),
            col("avg_temperature"),
        )
    )

    query = (
        aggregates.writeStream.outputMode("append")
        .format("console")
        .option("truncate", False)
        .start()
    )

    return query


def main():
    spark = (
        SparkSession.builder.appName("deforecast-stream")
        .config("spark.sql.shuffle.partitions", "4")
        .config("spark.sql.streaming.schemaInference", True)
        .getOrCreate()
    )
    query = build_stream(spark)
    query.awaitTermination()


if __name__ == "__main__":
    main()
