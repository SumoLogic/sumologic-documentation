resource "sumologic_cloud_to_cloud_source" "Abnormal Security" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Abnormal Security"
  }
 config = jsonencode({
            "name": "ABCDEFGHIJKLMNOPQRSTUVWXYZABC",
            "accessToken": "ABCDEFGH",
            "description": "ABCDEFGHIJKLMNOPQRSTUV",
            "category": "ABCDEFGHIJKLMNOPQRSTUVWX",
            "dataCollection": [
              "cases",
	      "threats"
          ]
        },
  )
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}