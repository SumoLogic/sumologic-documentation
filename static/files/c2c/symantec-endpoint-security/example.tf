resource "sumologic_cloud_to_cloud_source" "symantec-endpoint-security-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Symantec Endpoint Security"
  }
  config = jsonencode({
        "name":"Symantec Endpoint Security Test",
        "clientID":"********",
        "incidentsIncludeEvents":true,
        "incidentsInitialLookback":"1d",
        "fields":{
          "_siemForward":false
        },
        "clientSecret":"********",
        "pollingInterval":"5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}