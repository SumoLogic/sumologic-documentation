resource "sumologic_cloud_to_cloud_source" "claude-compliance-source" {
  collector_id = sumologic_collector.collector.id

  schema_ref = {
    type = "Claude Compliance"
  }

  config = jsonencode({
    name                   = "Claude Compliance"
    orgUUID                = "ABCD-SAMPLE-ORG-UUID"
    apiKey                 = "sk-ant-XXXXXXXXX"
    pollingIntervalMinutes = "60m"
    collectChatMessages    = true
    collectActivities      = true
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
