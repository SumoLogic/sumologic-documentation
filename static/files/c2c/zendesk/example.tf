resource "sumologic_cloud_to_cloud_source" "zendesk_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Zendesk"
  }
  config = jsonencode({
                "name": "Zendesk",
                "emailId": "bob123@example.com",
                "apiToken": "gfygwfihwcboghbuwguwdsyu",
                "baseURL": "https://sumologic.zendesk.com",
                "pollingIntervalMin": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
