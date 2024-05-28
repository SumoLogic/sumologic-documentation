resource "sumologic_cloud_to_cloud_source" "jfrog-xray_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "JFrog Xray"
  }
  config = jsonencode({
      "name":"JFrog Xray Source",
      "base_url":"https://acme.jfrog.io",
      "username":"sumo-source",
      "password":"********",        
      "collect_violation_details":"false",   
      "polling_interval":"5m",
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}