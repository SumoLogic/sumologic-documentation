resource "sumologic_cloud_to_cloud_source" "tenable_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Tenable"
  }
  config = jsonencode({
            "name": "Tenable",
            "description": "East field",
            "access_key": "********",
            "secret_key": "********",
            "supported_apis": ["Vulnerability Data","Audit Logs","Asset Data"],
            "fields": {
                "_siemForward": false
            },
            "category": "eastTeamF"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}