resource "sumologic_cloud_to_cloud_source" "lastpass-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "LastPass"
  }
  config = jsonencode({
          "name": "lastpass",
          "cid": "*****",
          "apiSecret": "*************",
          "timeZone": "UTC",
          "pollingInterval": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}