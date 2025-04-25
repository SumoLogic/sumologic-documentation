resource "sumologic_cloud_to_cloud_source" "cisco_AMP_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Cisco AMP"
  }
  config = jsonencode({
      "name":"Cisco",
      "description":"East field",
      "clientId":"********",
      "apiKey":"********",
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