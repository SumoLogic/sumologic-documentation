resource "sumologic_cloud_to_cloud_source" "druva_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Druva"
  }
  config = jsonencode({
            "name": "Druva",
            "description": "test_description",
            "category": "source_category",
            "baseURL": "https://apis.druva.com",
            "clientID": "testclientid",
            "secretKey": "*********",
            "fields":{
                "_siemForward":false
            }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}