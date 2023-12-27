resource "sumologic_cloud_to_cloud_source" "cloud_siem_aws_ec2_inventory_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Cloud SIEM AWS EC2 Inventory"
  }
  config = jsonencode({
      "name":"AWS Inventory",
      "fields":{
        "_siemForward":true
      },
      "category":"aws/inventory",
      "limitToRegions":["all"],
      "authentication":{
        "type": "S3BucketAuthentication",
        "awsId": "XXXXXXSVHNHFXXXXXXX",
        "awsKey": "XXXXXtrrIqHvXgMYJEQcwLfEQtyNXXXXXXXX"
      },
      "polling_interval":600
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}