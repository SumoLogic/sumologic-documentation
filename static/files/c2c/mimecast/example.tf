resource "sumologic_cloud_to_cloud_source" "mimecast-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Mimecast"
  }
  config = jsonencode({
    "name": "Mimecast",
    "description": "Mimecast",
    "category": "Mimecast",
    "clientID": "XXXgXXXXXXXxfkNsaXXXXo8VqkXXXixRf5VlnwcXXXXXchX",
    "clientSecret": "XXXgXXXXXXXxfkNsaXXXXo8VqkXXXixRf5VlnwcXXXXXchX",
    "dataCollection": [
      "siem",
      "dlp",
      "auditEvent",
      "holdMessageList"
    ]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}