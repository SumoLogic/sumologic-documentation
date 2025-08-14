resource "sumologic_cloud_to_cloud_source" "aws-iam-users-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "AWS IAM Users"
  }
  config = jsonencode({
                        "name": "AWS IAM Users",
                        "limitToRegions": ["all"],
                        "authentication": {
                                            "type": "S3BucketAuthentication",
                                            "awsId": "AKIA88SVJKHFHI6WVKL4",
                                            "awsKey": "LY7k0C+gIz+t4dSKLOkRarPOGQ/a8AxbPSIseBOo"
                                          },
                        "pathPrefix": "/division_abc/subdivision_xyz/",
                        "pollingIntervalHour": 12
                     })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
