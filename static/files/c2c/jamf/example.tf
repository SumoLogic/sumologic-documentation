resource "sumologic_cloud_to_cloud_source" "jamf_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "JAMF"
  }
  config = jsonencode({
			"name": "Jamf",
			"baseURL": "https://yourServer.jamfcloud.com",
			"clientID": "6cabf059-21c9-44d6-bbde-02898f7430dd",
			"clientSecret": "dzmsPks-******",
			"collectionBeginTime": 1,
			"pollingInterval": "24"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
