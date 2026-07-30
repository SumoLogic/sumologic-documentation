resource "sumologic_cloud_to_cloud_source" "openai-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "OpenAI"
  }
  config = jsonencode({
                        "name": "OpenAI Organization Costs",
                        "description": "Collects organization cost data from OpenAI Admin API",
                        "category": "openai/costs",
                        "fields": {},
                        "adminApiKey": "sk-admin-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                        "projectIds": ["proj_abc123", "proj_def456"],
                        "apiKeyIds": ["key_abc123"]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}