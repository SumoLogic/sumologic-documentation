resource "sumologic_cloud_to_cloud_source" "code42incydr_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Code42 Incydr"
  }
  config = jsonencode({
    "name": "Code42",
    "description": "Code42",
    "category": "code42",
    "baseURL": "https://api.us.code42.com",
    "clientID": "key-xxxx0316-xxxx-492d-xxxx-308184abxxx3",
    "secretKey": "XXXXV%DsznXXX!hxr479cXsxxnbkX@vxxrxkbfxc",
    "dataCollection": [
      "auditEvents",
      "sessions",
      "fileEvents"
    ]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}