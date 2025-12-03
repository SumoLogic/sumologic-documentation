resource "sumologic_cloud_to_cloud_source" "chatgpt-compliance-source" {
  collector_id = sumologic_collector.collector.id

  schema_ref = {
    type = "ChatGPT Compliance"
  }

  config = jsonencode({
    name                = "ChatGPT Compliance"
    workspaceID        = "ABCD-SAMPLE-WORKSPACE-ID"
    apiKey            = "sk-proj-XXXXXXXXX"
    pollingIntervalHour = "1h"
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}