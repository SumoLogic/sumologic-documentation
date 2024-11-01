resource "sumologic_cloud_to_cloud_source" "digital-guardian-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Digital Guardian"
  }
  config = jsonencode({
        "name": "DG ARC",
        "clientID": "hduj34-nduy73h-sdfnuw3r",
        "clientSecret": "sadadsfsfsdf",
        "APIGatewayURL": "https://accessgw.XYZ.abcd.com",
        "authServerURL": "https://authsrv.XYZ.abcd.com",
        "exportProfile": "profile",
        "pollingIntervalMin": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}