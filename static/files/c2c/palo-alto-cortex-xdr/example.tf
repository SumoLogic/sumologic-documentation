resource "sumologic_cloud_to_cloud_source" "palo-alto-cortex-XDR-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Palo Alto Cortex XDR"
  }
  config = jsonencode({
            "name": "Cortex XDR",
            "fields": {
                "_siemForward": false
            },
            "api_key": "***********",
            "api_id": "*",
            "fqdn": "palo-test.com",
            "polling_interval": 600,
            "ingest_events": true,
            "dup_alerts": true,
            "collect_incidents": true
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}