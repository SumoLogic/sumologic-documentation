resource "sumologic_cloud_to_cloud_source" "microsoft-exchange-trace-logs" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "MS Exchange Trace Logs"
  }
  config = jsonencode({
  "name": "CONN-5593",
  "description":"Microsoft Exchange Trace Logs",
    "fields":{
      "_siemForward":false
    },
  "clientID": "client_id",
  "tenantID": "tenant_id",
  "clientSecret": "client_secret",
  "pollingIntervalMin": "5m"
})
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}