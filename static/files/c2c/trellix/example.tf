resource "sumologic_cloud_to_cloud_source" "trellix_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Trellix"
  }
  config = jsonencode({
      "name": "Trellix",
      "clientID": "xxxxxxxxxxxxxx",
      "clientSecret": "******",
      "apiKey": "*******",
      "pollingInterval": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}