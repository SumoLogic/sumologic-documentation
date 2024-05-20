resource "sumologic_cloud_to_cloud_source" "asana_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CloudQuery GCP"
  }
  config = jsonencode({
			"name": "CloudQuery GCP",
            "credentialsJson": "aa",
            "projectIds": {
                "test-gcp-435276"
                },
            "organizationIds": {
                "24584326357",
                "736586988"
                },
            "limitToServices": {
                "compute",
                "storage"
                },
            "pollingInterval": 12
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}