resource "sumologic_cloud_to_cloud_source" "taxii2_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "TAXII 1 Client"
  }
  config = jsonencode({
			"name":"STIX TAXII 1 Client for Unit 42",
			"description":"Collects indicators from Unit 42 and stores them in Sumo Logic",
			"category":"source_category",
            "userSourceID": "My Important Indicators",
            "discoveryURL": "https://stix2.unit42.org/taxii/",
            "useBasicAuth: true,
            "http_user": "user@acme.com",
            "http_password": "****************************",
            "pollingInterval": "1h",
            "collectionNames": [
				      "collection1",
				      "collection2"
			      ]
			      
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}