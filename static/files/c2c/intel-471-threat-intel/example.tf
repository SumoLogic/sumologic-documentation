resource "sumologic_cloud_to_cloud_source" "intel-471-threat-intel-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Intel 471 Threat Intel"
  }
  config = jsonencode({
                    "name": "Intel471",
			        "username": "pal@sumologic.com",
			        "apiKey": "xxxx94429cexxxxxxc2e4ecc2e19xx190594935xxxxxx2316xxx",
			        "userSourceId": "user_source_id",
			        "pollingIntervalHour": "1h"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}