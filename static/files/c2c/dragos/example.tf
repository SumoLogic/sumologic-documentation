resource "sumologic_cloud_to_cloud_source" "dragos-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Dragos"
  }
  config = jsonencode({
                "name": "Dragos",
                "requestEndpoint": "https://sumologic-dragos.cxc.dragos.cloud/",
                "apiID": "036fxxxx-b642-xxxx-99d3-fcxxxx2exxxx",
                "apiSecret": "xxxU1TxxxxxxxxKSJwHYOpK37xxxxxxxxrEHAkU91xxxxxxxxxFrrJ06xxx",
                "collectVulnerability": true,
                "collectAddress": true,
                "collectNotification": false,
                "collectZone": false,
                "collectAsset": false,
                "pollingIntervalVulnerabilityMin": "60m",
                "pollingIntervalAddressesHour": "5h"
                })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}