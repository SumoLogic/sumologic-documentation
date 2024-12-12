resource "sumologic_cloud_to_cloud_source" "lastpass-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Smartsheet"
  }
  config = jsonencode({
        "name": "smartsheet",
        "app_client_id": "<your client id>",
        "client_secret": "***********",
        "authorization_code": "***********",
        "polling_interval": 10
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}