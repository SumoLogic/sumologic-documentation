resource "sumologic_cloud_to_cloud_source" "cato_networks_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Cato Networks"
  }
  config = jsonencode({
        "name": "cato-network",
        "description": "sample description",
        "accountID": "1774",
        "apiKey": "***********",
        "dataTypes": [
          "securityEvents",
          "auditEvents",
          "all"
        ],
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}