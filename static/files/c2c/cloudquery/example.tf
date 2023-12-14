resource "sumologic_cloud_to_cloud_source" "cloudquery_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CloudQuery"
  }
  config = jsonencode({
            "name": "CloudQuery AWS Inventory",
            "accessKeyId": "************",
            "secretAccessKey": "***************************",
            "limitToRegions": [
                "us-east-1",
                "us-east-2"
            ],
            "awsServices": [
                "ECS",
                "EC2"
            ],
            "pollInterval": 24
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}