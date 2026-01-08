resource "sumologic_cloud_to_cloud_source" "gmail_trace _logs_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Gmail Trace Logs"
  }
  config = jsonencode({
            "name":"Gmail Trace Log",
            "category":"gmail",
            "projectId":"Product123",
            "datasetId":"Product123",
            "privateKey":"*****************",
            "tokenURI":"dshjfgbkjlafdhbdhfvhjksdg",
            "clientEmail":"product123@gmail.com",
            "dataLocation":"US",
            "startTime":"24 Hours ago"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}