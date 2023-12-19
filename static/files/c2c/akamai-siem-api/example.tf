resource "sumologic_cloud_to_cloud_source" "akamai_SIEM_API" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Akamai SIEM API"
  }
  config = jsonencode({
      "name":"akamai test",
      "splitOnRules":true,
      "clientToken":"********",
      "host":"********.luna.akamaiapis.net",
      "configIds":["74215"],
      "decodeHttp":true,
      "fields":{
        "_siemForward":false
      },
      "resetOffset":false,
      "clientSecret":"********",
      "limit":10000,
      "pollInterval":30,
      "accessToken":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}