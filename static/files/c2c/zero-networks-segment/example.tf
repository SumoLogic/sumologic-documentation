resource "sumologic_cloud_to_cloud_source" "zero_networks_segment_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Zero Networks Segment"
  }
  config = jsonencode({
      "name": "zero-networks-segment",
      "apiKey": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyzxxxxxxxxxxxx",
      "collectNetworkActivities": true,
      "networkActivityFilter": "[{\"id\":\"state\",\"includeValues\":[\"4\"]}]"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}