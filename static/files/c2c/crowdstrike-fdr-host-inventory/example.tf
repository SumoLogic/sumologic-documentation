resource "sumologic_cloud_to_cloud_source" "crowdstrike_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CrowdStrike FDR Host Inventory Source"
  }
  config = jsonencode({
      "name": "crowdstrike-fdr",
      "description": "crowdstrike-fdr-inventory",
      "region": "US-1",
      "clientID": "client id",
      "clientSecret": "client secret",
         "fields":{
            "_siemForward":false
         }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}