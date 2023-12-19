resource "sumologic_cloud_to_cloud_source" "okta-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Okta"
  }
  config = jsonencode({
      "name":"Okta",
      "description":"East field",
      "domain":"mydomain.okta.com",
      "users":true,
      "collectAll":true,
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