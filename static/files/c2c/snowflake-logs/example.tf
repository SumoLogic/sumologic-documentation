resource "sumologic_cloud_to_cloud_source" "snowflake_logs_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Snowflake Logs"
  }
  config = jsonencode({
      "name": "Snowflake Logs",
      "username": "SUMO",
      "password": "bhwgdy4u28c",
      "accountIdentifier": "gsy64-cnkc8",
      "collectQueryHistory": true,
      "collectSecurity": true,
      "collectEvents": true,
      "pollingIntervalMin": 5,
      "customEventTables": [
              "SNOW_DB.SCHEMA.TABLE1",
              "SNOW_INFO.SCHEMA_VAL.TABLE2"
                           ]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}