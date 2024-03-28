resource "sumologic_cloud_to_cloud_source" "cloudquery_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CloudQuery"
  }
  config = jsonencode({
            "name": "CloudQuery AWS Inventory",
            "configType": "account",
            "limitToRegions": [
                "us-east-1",
                "us-east-2"
            ],
            "limitToServices": [
                "ec2",
                "s3"
            ],
            "pollingInterval": 12,
            "awsId": "************",
            "awsKey": "***************************"
        })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}