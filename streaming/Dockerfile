FROM bitnami/spark:3.5

USER root
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

COPY main.py /opt/bitnami/spark/app/main.py

WORKDIR /opt/bitnami/spark/app

ENTRYPOINT ["/opt/bitnami/spark/bin/spark-submit", "/opt/bitnami/spark/app/main.py"]
