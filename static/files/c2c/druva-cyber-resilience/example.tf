resource "sumologic_cloud_to_cloud_source" "druva_cyber_resilience_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Druva Cyber Resilience"
  }
  config = jsonencode({
            "name": "Druva Cyber Resilience",
            "description": "Collect Realize Events from Druva Cyber Resilience Product",
            "category": "druva-cyber-resilience",
            "baseURL": "https://apis.druva.com",
            "clientID": "testclientid",
            "secretKey": "*********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}