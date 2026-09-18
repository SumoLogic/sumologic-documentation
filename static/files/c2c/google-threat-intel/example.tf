resource "sumologic_cloud_to_cloud_source" "google-threat-intel-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Google Threat Intel"
  }
  config = jsonencode({
        "name": "Google Threat Intel",
			"apiKey": "xxxx94429cexxxxxxc2e4ecc2e19xx190594935xxxxxx2316xxx",
			"userSourceId": "GoogleThreatIntelligence",
			"pollingIntervalHour": "1h"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}