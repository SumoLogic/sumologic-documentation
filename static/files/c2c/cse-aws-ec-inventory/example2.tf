resource "sumologic_cloud_to_cloud_source" "cloud_siem_aws_ec2_inventory_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "CSE AWS EC2 Inventory"
  }
  config = jsonencode({
      "name":"AWS EC2 Inventory",
      "fields":{
        "_siemForward":true
      },
      "category":"AWSEC2Inventory",
      "limitToRegions":["all"],
      "regionType":"standardRegions",
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