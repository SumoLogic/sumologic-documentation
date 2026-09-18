resource "sumologic_cloud_to_cloud_source" "cyberark_epm_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CyberArk EPM"
  }
  config = jsonencode({
    "name": "CyberArk EPM",
    "identity_id": "abr1336",
    "service_user": "svc-epm@mycompany.com",
    "service_user_password": "********",
    "app_id": "reportsapp",
    "epm_manager_url": "https://na101.epm.cyberark.com",
    "detailed_raw_events": false,
    "aggregated_policy_audits": false,
    "policy_audit_raw_events": false,
    "aggregated_events": false,
    "polling_interval": 600
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}