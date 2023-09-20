resource "sumologic_cloud_to_cloud_source" "1password_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "1Password"
  }
  config = jsonencode({
    "name" : "1Pass",
    "base_url" : "events.1password.com",
    "supported_apis" : [
      "itemUsage",
      "sign-in"
    ],
    "api_token" : "********",
    "fields" : {
      "_siemForward" : true
    }
  })

}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
