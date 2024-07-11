resource "sumologic_cloud_to_cloud_source" "proofpoint_tap_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Proofpoint"
  }
  config = jsonencode({
      "name":"Proofpoint",
      "description":"East field",
      "domain":"tap-api-v2.proofpoint.com",
      "api_secret":"********",
      "service_principal":"********",
      "split_recipients":true,
      "split_message_parts":false,
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