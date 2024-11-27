resource "sumologic_cloud_to_cloud_source" "cyberark_test_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CyberArk Test"
  }
  config = jsonencode({
			"name": "CyberArk Test",
			"username": "user@sumologic.com",
			"password": "Sumo@123",
			"application_id": "sumologic-c2c",
			"epm_server": "https://in.epm.cyberark.com",
			"detailed_raw_events": false,
			"aggregated_policy_audits": false,
			"policy_audit_raw_events": false,
			"polling_interval": 600
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}