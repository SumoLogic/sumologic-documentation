resource "sumologic_cloud_to_cloud_source" "snowflake_logs_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Snowflake Logs"
  }
  config = jsonencode({
      "name": "Snowflake Logs",
      "authType": "oauth",
      "oauthClientId": "ABCDxxxxxxxxxxxxxxxxxxxxxxx=",
      "oauthClientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=",
      "oauthAuthorizationCode": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "accountIdentifier": "gsy64-cnkc8",
      "collectQueryHistory": true,
      "collectSecurity": true,
      "securityTables": ["all"],
      "collectEvents": true,
      "customEventTables": [
          {
              "tableName": "SNOW_DB.SCHEMA.TABLE1",
              "delayTime": "0m",
              "timestampField": "TIMESTAMP"
          },
          {
              "tableName": "SNOW_INFO.SCHEMA_VAL.TABLE2",
              "delayTime": "10m",
              "timestampField": "TIMESTAMP"
          }
      ],
      "pollingInterval": "1h"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
