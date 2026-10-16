resource "sumologic_cloud_to_cloud_source" "microsoft-azure-ad-inventory-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Microsoft Azure AD Inventory"
  }
  config = jsonencode({
            "name": "Azure AD Inventory",
            "tenant_id": "TenantID",
            "supported_apis": ["Devices", "Users"],
            "secret_key": "********",
            "application_id": "ApplicationID",
            "userSignInActivity": false,
            "userGroupDetails": false,
            "fields": {
                "_siemForward": false
            }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}