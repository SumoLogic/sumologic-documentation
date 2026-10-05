resource "sumologic_cloud_to_cloud_source" "kandji" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Kandji"
  }
  config = jsonencode({
        "name": "Kandji",
        "requestEndpoint": "https://sumo.api.kandji.io",
        "bearerToken": "xxxxxxxxxxxxxxxxxxxxxxxx",
        "collectThreatDetails": true,
        "collectDevices": true,
        "pollingIntervalMin": 5,
        "pollingIntervalHour": 12,
        "collectDeviceActivities": true,
        "collectDeviceDetails": true,
        "collectDeviceApps": true
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}