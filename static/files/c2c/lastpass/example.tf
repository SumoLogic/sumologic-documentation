resource "sumologic_cloud_to_cloud_source" "microsoft-azure-ad-inventory-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Microsoft Azure AD Inventory"
  }
  config = jsonencode({
          "name": "lastpass",
          "cid": "*****",
          "apiSecret": "*************",
          "pollingInterval": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}