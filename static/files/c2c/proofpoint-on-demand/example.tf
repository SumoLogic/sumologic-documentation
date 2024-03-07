resource "sumologic_cloud_to_cloud_source" "proofpoint_on_demand_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Proofpoint On Demand"
  }
  config = jsonencode({
      "name":"PoD",
      "api_secret":"********",
      "supported_events":["message","maillog"],
      "fields":{
        "_siemForward":false
      },
      "cluster_id":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}