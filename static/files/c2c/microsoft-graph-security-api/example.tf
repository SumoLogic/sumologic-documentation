resource "sumologic_cloud_to_cloud_source" "microsoft-graph-security-api-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Microsoft Graph Security API"
  }
  config = jsonencode({
      "name":"Graph Security",
      "tenant_id":"********",
      "polling_interval":5,
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"graph-api",
      "application_id":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}