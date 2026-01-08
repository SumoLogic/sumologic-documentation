resource "sumologic_cloud_to_cloud_source" "microsoft-graph-identity-protection-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "MS Graph Identity Protection"
  }
  config = jsonencode({
            "name": "MS Graph Identity",
            "tenant_id": "TenantID",
            "supported_apis": ["RiskyUsers", "RiskDetections"],
            "secret_key": "********",
            "application_id": "ApplicationID",
            "fields": {
                "_siemForward": false
            }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}