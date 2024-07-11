resource "sumologic_cloud_to_cloud_source" "sophos_central_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Sophos Central"
  }
  config = jsonencode({
      "name":"Sophos",
      "description":"East field",
      "clientId":"********",
      "clientSecret":"********",
      "supported_apis": ["Events", "Alerts"],
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "pollingInterval":300
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}