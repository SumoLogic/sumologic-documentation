resource "sumologic_cloud_to_cloud_source" "automox_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Automox"
  }
  config = jsonencode({
        "name": "Automox",
        "bearerToken": "wevewbkueybvilebvlibvgeu",
        "orgId": 11478,
        "collectAuditTrailLogs": true,
        "collectDevices": true,
        "collectEventLogs": true,
        "pollingIntervalAuditMin": 5,
        "pollingIntervalDeviceHour": 12,
        "pollingIntervalEventMin": 5
     })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}