resource "sumologic_cloud_to_cloud_source" "asana_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Asana"
  }
  config = jsonencode({
			"name":"Asana",
			"description":"Test Source",
			"category":"source_category",
			"personalAccessToken":"****************************",
			"workspaceID":"1204094735693514"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}