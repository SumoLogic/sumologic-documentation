resource "sumologic_cloud_to_cloud_source" "trust-login-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Trust Login"
  }
  config = jsonencode({
                    "name": "Trust Login",
                    "bearerToken": "hgvwuilvgwovghwovhiowhvo",
                    "pollingIntervalMin": 5
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}