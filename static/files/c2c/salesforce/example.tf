resource "sumologic_cloud_to_cloud_source" "salesforce_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Salesforce"
  }
  config = jsonencode({
      "signon_url":"https://login.salesforce.com/services/oauth2/token",
      "name":"TestSalesforceSrc",
      "client_secret":"********",
      "description":"Test Salesforce source",
      "client_id":"3MVG9VeAQy5y3BQWhBnxmQyadGTCNr2zbO.TEep4g6Wik9ZEdlgREnNrGBs680cYVdTjw8SlWv2qVoNgYGddS",
      "user_token":"********",
      "inmemory_lookup":true,
      "password":"********",
      "fields":{      
        "_siemForward":false
      },
      "category":"cnc/salesforce_logs",
      "username":"testuser@sumologic.com",
      "start_time":"24 Hours ago"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}