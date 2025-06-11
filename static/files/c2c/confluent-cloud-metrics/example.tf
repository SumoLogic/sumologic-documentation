resource "sumologic_cloud_to_cloud_source" "confluent_cloud_metrics_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Confluent Cloud Metrics"
  }
  config = jsonencode({
    "name": "Confluent Cloud Metrics",
            "clientId": "U5XXXYZYGAXXXFRZ",
            "clientSecret": "X2OSZAI4YEn5lZ0cXXXuZ556WlbKYvHPHSCTXXXyFN8dfz",
            "resourceKafkaId": true,
            "resourceConnectorId": false,
            "resourceKSQLId": false,
            "resourceSchemaRegistryId": true,
            "resourceComputePoolId": false,
            "metric": true,
            "ignoreFailedMetrics": true,
            "pollingIntervalMin": 5,
            "kafkaId": [
                "id1",
                "id2"
            ],
            "schemaRegistryId": [
                "id3",
                "id4"
            ],
            "metrics": [
                "example metric"
            ]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}