resource "sumologic_cloud_to_cloud_source" "carbon_black_inventory_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Carbon Black Inventory"
  }
  config = jsonencode({
      "api_id":"********",
      "name":"CB Inv E",
      "domain":"defense.conferdeploy.net",
      "org_key":"ABCDEFG1",
      "polling_interval":600,
      "api_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/cb_inv"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}