resource "sumologic_cloud_to_cloud_source" "bitwarden_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Bitwarden"
  }
  config = jsonencode({
      "name":"Bitwarden Source",
      "base_url":"https://api.bitwarden.com",
      "client_id":"********",
      "client_secret":"********",        
      "polling_interval":"15m",
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}