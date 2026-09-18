resource "sumologic_cloud_to_cloud_source" "zerofox-threat-intel-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "ZeroFox Threat Intel"
  }
  config = jsonencode({
                    "name": "Zerofox Intel",
			        "username": "my-user",
			        "apiKey": "xxxxxxxx",
			        "userSourceId": "ZeroFox Intel",
			        "pollingIntervalHour": "1h"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}