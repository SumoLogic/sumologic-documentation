resource "sumologic_cloud_to_cloud_source" "cyberark_audit_test_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CyberArk Audit"
  }
  config = jsonencode({
			"name": "CyberArkAudit",
			"identityId": "abr43969",
            "appId": "sumologic",
            "username": "c2c@cyberark.cloud.43969",
            "password": "rECxxxx__4_xxxx_G4n6",
            "tenantURL": "https://sumologic.audit.cyberark.cloud",
            "apiKey": "JxxxxxxS9gFJv96LcKcxxxxxxxxxxxxxYqP09OGxxxY",
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