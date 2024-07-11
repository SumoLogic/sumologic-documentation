resource "sumologic_cloud_to_cloud_source" "google_bigQuery_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Google BigQuery"
  }
  config = jsonencode({
        "name":"MyBigQuerySource",
        "checkpointField":"timestamp_usec",
        "timeField":"timestamp_usec",
        "checkpointStart":"0",
        "query":"select message_info,event_info,event_info.timestamp_usec as timestamp_usec from `bigquery-dev-382704.BigQueryTest.GmailTest` where event_info.timestamp_usec > %CHECKPOINT%  LIMIT 2",
        "projectId":"********",
        "fields":{
            "_siemForward":false
            },
        "pollingInterval":"2m",
        "credentialsJson":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}