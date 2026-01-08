resource "sumologic_cloud_to_cloud_source" "kaltura-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Kaltura"
  }
  config = jsonencode({
      "name":"Kaltura",
      "description":"",
      "apiBaseUrl":"https://www.kaltura.com",
      "collectAll":true,
      "partnerId":"********",
      "token":"***********",
      "tokenId":"*******",
      "supportedApis":["baseEntry","auditTrail"],
      "fields":{
        "_siemForward":false
      },
      "category":"sanbox/kaltura",
      "polling_interval":24,
      "baseEntryInitLookback":1
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}