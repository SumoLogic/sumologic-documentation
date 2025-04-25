resource "sumologic_cloud_to_cloud_source" "crowdstrike-spotlight_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Crowdstrike Spotlight"
  }
  config = jsonencode({
      "name":"crowdstrike-spotlight",
      "apiBaseUrl":"api.crowdstrike.com",
      "clientId":"********",
      "clientSecret":"********",      
      "evaluationLogic":true,
      "hostInfo":true,
      "remediation":true,
      "cve":true,      
      "pollingInterval":1,
      "fields":{
        "_siemForward":false
      } 
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}