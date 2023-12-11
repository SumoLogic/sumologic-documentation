resource "sumologic_cloud_to_cloud_source" "microsoft-exchange-trace-logs" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "MS Exchange Trace Logs"
  }
  config = jsonencode({
    "app_client_id": "client_id",
    "directory_tenant_id": "tenant_id",
    "client_secret": "secret",
    "authorization_code": "code",
    "polling_interval": 300,
    "time_offset": 3600
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}