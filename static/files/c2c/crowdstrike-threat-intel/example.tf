resource "sumologic_cloud_to_cloud_source" "crowdstrike-threat-intel" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CrowdStrike Threat Intel"
  }
  config = jsonencode({
  				"name": "Crowdstrike TI",
  				"baseURL": "https://api.crowdstrike.com",
  				"clientId": "8e094xxxxxxxxxxxx2b1nu36x2d2",
  				"clientSecret": "***********",
  				"pollingIntervalHour": 1,
				"userSourceID": "id1",
  				"maliciousConfidence": [
    					"high",
    					"medium",
    					"low",
    					"unverifed"
  				]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}