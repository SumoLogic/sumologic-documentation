resource "sumologic_cloud_to_cloud_source" "carbon_black_cloud_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Carbon Black Cloud"
  }
  config = jsonencode({
      "api_id":"********",
      "name":"CB Cloud",
      "domain":"defense.conferdeploy.net",
      "org_key":"ABCDEFG1",
      "polling_interval":300,
      "api_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/cb_cloud"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}