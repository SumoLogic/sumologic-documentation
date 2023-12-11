resource "sumologic_cloud_to_cloud_source" "duo_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Duo"
  }
  config = jsonencode({
      "name":"Duo",
      "description":"East field",
      "domain":"api-********.duosecurity.com",
      "integration_key":"********",
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "polling_interval":300
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}