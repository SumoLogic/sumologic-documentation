resource "sumologic_cloud_to_cloud_source" "sailpoint_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "SailPoint"
  }
  config = jsonencode({
      "name": "Sail",
      "org_name": "TenantName",
      "supported_apis": ["Events", "Users"],
      "client_id": "********",
      "client_secret": "********",
      "fields": {
           "_siemForward": true
      }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}