resource "sumologic_cloud_to_cloud_source" "knowbe4-api-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "KnowBe4 KMSAT"
  }
  config = jsonencode({
  		"name": "KnowBe4",
 	 	"description": "Test Source",
  		"category": "source_category",
  		"region": "US",
  		"apiKey": "************",
		"dataTypes": [
    		         "phishingTests"
  		],
		"phishingPollInterval": 1
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}