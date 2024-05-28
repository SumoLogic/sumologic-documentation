resource "sumologic_cloud_to_cloud_source" "crowdstrike-filevantage_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CrowdStrike FileVantage"
  }
  config = jsonencode({
      "name":"CrowdStrike FileVantage Source",
      "base_url":"https://api.crowdstrike.com",
      "client_id":"********",
      "client_secret":"********",        
      "polling_interval":"15m",
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}