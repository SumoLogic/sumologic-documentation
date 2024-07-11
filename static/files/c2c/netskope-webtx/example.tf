resource "sumologic_cloud_to_cloud_source" "netskope-webtx-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Netskope WebTx"
  }
  config = jsonencode({
      "name":"webtx-test",
      "subscriptionPath":"projects/webtx-test",
      "startFromBeginning":false,
      "fields":{
        "_siemForward":false
      },
      "category":"webtx",
      "credentialsJson":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}