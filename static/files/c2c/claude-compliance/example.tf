resource "sumologic_cloud_to_cloud_source" "anthropic-compliance-source" {
  collector_id = sumologic_collector.collector.id

  schema_ref = {
    type = "Claude Compliance"
  }

  config = jsonencode({
    name                = "Claude Compliance"
    orgUUID        = "ABCD-SAMPLE-ORG-UUID"
    apiKey            = "sk-ant-XXXXXXXXX"
    pollingIntervalHour = "60m"
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}