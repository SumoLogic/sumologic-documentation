resource "sumologic_cloud_to_cloud_source" "databricks-audit-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Databricks Audit Source"
  }
  config = jsonencode({
        "name": "Databricks Audit Logs",
        "baseURL": "https://<workspace-name>.databricks.com",
        "warehouseId": "bf7gs36gfr54392c",
        "clientId": "bf7gs36gfs-r54392c-lkdsdas",
        "clientSecret": "wdwxxxxxqwedwedxxxxxqewdxxxxxxqwedxxxx",
        "pollingInterval": "5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}