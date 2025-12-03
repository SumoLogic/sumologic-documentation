resource "sumologic_cloud_to_cloud_source" "varonis-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Varonis"
  }
  config = jsonencode({
                    "name": "Varonis",
                    "domainURL": "https://partners1.xxx.varonis.io",
                    "apiKey": "vkey1xxxTQggH",
                    "pollingIntervalMin": "5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}