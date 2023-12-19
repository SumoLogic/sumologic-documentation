resource "sumologic_cloud_to_cloud_source" "box_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Box"
  }
  config = jsonencode({
      "name":"box-test-1",
      "fields":{
        "_siemForward":false
      },
      "credentialsJson":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}