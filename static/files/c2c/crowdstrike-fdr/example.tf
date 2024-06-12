resource "sumologic_cloud_to_cloud_source" "crowdstrike_FDR_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Crowdstrike FDR"
  }
  config = jsonencode({
      "automaticDateParsing":true,
      "name":"FDR test",
      "forceTimeZone":false,
      "description":"Example config",
      "secretAccessKey":"********",
      "SqsQueueURL":"https://sqs.us-west-1.amazonaws.com/***/***",
      "multilineEnabled":false,
      "accessKeyId":"********",
      "category":"Sumo/FDR",
      "timestampFormatAutoDetection":false,
      "s3Region":"us-west-1",
      "startTime": 0
      "useAutolineMatching":true
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}