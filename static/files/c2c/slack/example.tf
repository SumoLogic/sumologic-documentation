resource "sumologic_cloud_to_cloud_source" "slack" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Slack"
  }
  config = jsonencode({
    "ok": true,
    "access_token": "xoxp-1236544616-Example-Access-Token5bf71298dad60d941f2a44b371",
    "scope": "admin,identify,channels:history,groups:history,im:history,channels:read,team:read,users:read,users:read.email,auditlogs:read",
    "user_id": "WA7PQK3U5",
    "team_id": "EFSFVS",
    "enterprise_id": "EASFEF",
    "team_name": "Test Slack App"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}