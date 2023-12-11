resource "sumologic_cloud_to_cloud_source" "taxii_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "TAXII"
  }
  config = jsonencode({
            "name": "Test TAXII 1.1",
            "userSourceID": "1234",
            "discoveryURL": "https://otx.alienvault.com/taxii/discovery",
            "useBasicAuth": true,
            "pollingInterval": "1h",
            "httpBasicUsername": "sample-username",
            "httpBasicPassword": "sample-password"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}