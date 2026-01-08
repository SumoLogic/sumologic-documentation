resource "sumologic_cloud_to_cloud_source" "webex_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Webex"
  }
  config = jsonencode({
      "name":"Webex- sandbox",
      "authorizationCode":"********",
      "clientId":"********",
      "collectAll":false,
      "orgId":"********",
      "eventCategories":["LOGINS","LOGOUT","ORG_SETTINGS"],
      "fields":{
        "_siemForward":false
      },
      "clientSecret":"********",
      "category":"sandbox/webex/audit"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}