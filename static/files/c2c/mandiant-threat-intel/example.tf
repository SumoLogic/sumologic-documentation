resource "sumologic_cloud_to_cloud_source" "mandiant-threat-intel-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Mandiant Threat Intel"
  }
  config = jsonencode({
			"name": "Mandiant",
			"category": "mandiant",
			"apiKeyId": "076xxxxd69832568xxxxxe778b73f98b375",
			"apiSecret": "fcbe4fd8ce72b5dxxxxxx10032",
			"userSourceId": "user_source_id",
			"pollingIntervalMin": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}