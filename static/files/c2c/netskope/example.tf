resource "sumologic_cloud_to_cloud_source" "netskope-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Netskope"
  }
  config = jsonencode({
      "name":"YL-Netskope",
      "eventTypes":["page","application","infrastructure","audit"],
      "fields":{
        "_siemForward":false
      },
      "apiToken":"********",
      "tenantID":"partners",
      "isGovAccount":false,
      "disableAlerts":false
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}