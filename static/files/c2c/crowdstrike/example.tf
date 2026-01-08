resource "sumologic_cloud_to_cloud_source" "crowdstrike_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CrowdStrike"
  }
  config = jsonencode({
      "name":"CrowdStrike",
      "description":"East field",
      "domain":"api.crowdstrike.com",
      "secretKey":"********",
      "clientID":"123",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeam"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}