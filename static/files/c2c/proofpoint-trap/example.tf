resource "sumologic_cloud_to_cloud_source" "proofpoint_trap_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Proofpoint TRAP"
  }
  config = jsonencode({
      "name":"Proofpoint",
      "baseURL": "https://threatprotection-api.proofpoint.com",
      "authBaseURL": "https://auth.proofpoint.com",
  	  "clientId": "bf7gs36gfs-r54392c-lkdsdas",
  	  "clientSecret": "452852c1xxe95eec390",
      "pollingIntervalMin": "5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}