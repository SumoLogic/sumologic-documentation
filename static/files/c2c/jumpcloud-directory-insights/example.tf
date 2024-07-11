resource "sumologic_cloud_to_cloud_source" "jumpcloud-directory-insights-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "JumpCloud Directory Insights"
  }
  config = jsonencode({
            "name": "JumpCloud Directory Insights",
            "description": "Collect Events from JumpCloud Directory Insights Product",
            "category": "jumpcloud-directory-insights",
            "apiKey": "ebf7b9d6e1****************",
            "orgID": "64949312***************",
            "service": "all"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}