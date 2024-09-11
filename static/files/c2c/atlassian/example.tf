resource "sumologic_cloud_to_cloud_source" "Atlassian_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Atlassian"
  }
  config = jsonencode({
            "name": "Atlassian Test",
            "fields": {
                "_siemForward": true
            },
            "pollingInterval": "1h",
            "organizations": [
                {
                    "orgID": "**************",
                    "token": "*******"
                }
            ]
        })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}