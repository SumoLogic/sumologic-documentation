resource "sumologic_cloud_to_cloud_source" "workday_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Workday"
  }
  config = jsonencode({
      "name": "Workday Test",
      "description": "Testing the workday source",
      "category": "General",
      "isuUsername": "SumoLogic",
      "isuPassword": "**********",
      "clientID": "sldfsjdflk230sdflnk2342cxcoijs0",
      "clientSecret": "**********",
      "refreshTokenURL": "https://wd2-impl-services1.workday.com...token",
      "refreshToken": "**********",
      "signOnReportURL": "https://wd2-impl-services1.workday.com...-_Copy",
      "restApiURL": "https://wd2-impl-services1.workday.com...activityLogging",
      "backfillDays": 1,
      "pollingIntervalMinutes": 10
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}