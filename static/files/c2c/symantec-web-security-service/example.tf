resource "sumologic_cloud_to_cloud_source" "symantec_web_security_service_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Symantec Web Security Service"
  }
  config = jsonencode({
      "name":"Symantec WSS",
      "apiUsername":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/sym",
      "apiPassword":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}