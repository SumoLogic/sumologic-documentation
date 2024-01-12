resource "sumologic_cloud_to_cloud_source" "taxii2_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "TAXII 2 Client"
  }
  config = jsonencode({
			"name":"STIX TAXII 2 Client for Palo Alto",
			"description":"Collects indicators from Unit 42 and stores them in Sumo Logic",
			"category":"source_category",
            "ti_user_source_id": "Palo Alto Intel",
            "ti_version": "2.0",
            "ti_discovery_url": "https://stix2.unit42.org/taxii/",
            "http_user": "user@acme.com",
            "http_password": "****************************"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}