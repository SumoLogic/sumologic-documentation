resource "sumologic_cloud_to_cloud_source" "cyberark_audit_test_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CyberArk Audit"
  }
  config = jsonencode({
			"name": "CyberArkAudit",
			"identityId": "ac212",
            "appId": "sumologic",
            "username": "user@cyberark.cloud.1234",
            "password": "******",
            "tenantURL": "https://sumologic.audit.cyberark.cloud",
            "apiKey": "*******",
            "serviceType": [],
            "statusType": [],
            "actionType": [],
            "pollingIntervalMin": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}