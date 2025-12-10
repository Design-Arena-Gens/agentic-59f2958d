// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EnergySettlement {
    struct ForecastRecord {
        address oracle;
        bytes32 forecastHash;
        uint256 timestamp;
        uint256 horizonMinutes;
        string region;
        string modelVersion;
    }

    struct Settlement {
        address participant;
        uint256 amountWei;
        bool settled;
    }

    mapping(bytes32 => ForecastRecord) public records;
    mapping(bytes32 => Settlement[]) private settlements;

    event ForecastNotarized(
        bytes32 indexed recordId,
        address indexed oracle,
        bytes32 forecastHash,
        string region,
        string modelVersion
    );

    event SettlementTriggered(
        bytes32 indexed recordId,
        address indexed participant,
        uint256 amountWei,
        bool settled
    );

    modifier onlyOracle(bytes32 recordId) {
        require(records[recordId].oracle == msg.sender, "UNAUTHORIZED_ORACLE");
        _;
    }

    function notarizeForecast(
        bytes32 recordId,
        bytes32 forecastHash,
        string calldata region,
        string calldata modelVersion,
        uint256 horizonMinutes
    ) external {
        ForecastRecord storage record = records[recordId];
        require(record.timestamp == 0, "RECORD_EXISTS");

        records[recordId] = ForecastRecord({
            oracle: msg.sender,
            forecastHash: forecastHash,
            timestamp: block.timestamp,
            horizonMinutes: horizonMinutes,
            region: region,
            modelVersion: modelVersion
        });

        emit ForecastNotarized(recordId, msg.sender, forecastHash, region, modelVersion);
    }

    function submitSettlement(
        bytes32 recordId,
        address participant,
        uint256 amountWei,
        bool settled
    ) external onlyOracle(recordId) {
        settlements[recordId].push(
            Settlement({
                participant: participant,
                amountWei: amountWei,
                settled: settled
            })
        );

        emit SettlementTriggered(recordId, participant, amountWei, settled);
    }

    function fetchSettlements(bytes32 recordId) external view returns (Settlement[] memory) {
        return settlements[recordId];
    }
}
