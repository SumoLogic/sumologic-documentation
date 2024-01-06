resource "sumologic_cloud_to_cloud_source" "rapid7_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Rapid7"
  }
  config = jsonencode({
      "name": "Rapid7",
      "description": "Test Source",
      "category": "source_category",
      "env": "dev",
      "region": "us",
      "apiKey": "215c96c6-19a6-48e9-955f-253593xxxxxx"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}