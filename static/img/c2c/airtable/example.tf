resource "sumologic_cloud_to_cloud_source" "airtable_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Airtable"
  }
  config = jsonencode({
    "name" : "airtable",
    "accountId" : "accountid",
    "personalAccessToken" : "*********",
    "fields" : {
      "_siemForward" : true
    }
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
