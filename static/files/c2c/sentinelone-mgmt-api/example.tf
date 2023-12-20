resource "sumologic_cloud_to_cloud_source" "sentinelone_mgmt_api_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "SentinelOne Mgmt API"
  }
  config = jsonencode({
      "name":"SentinelOne",
      "supported_apis":["activities","agents","threats"],
      "api_secret":"********",
      "base_url":"https://usea1-partners.sentinelone.net/",
      "fields":{
        "_siemForward":false
      }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}