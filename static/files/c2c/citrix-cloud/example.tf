resource "sumologic_cloud_to_cloud_source" "citrix_cloud_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Citrix Cloud"
  }
  config = jsonencode({
         "name": "Citrix Cloud Source",
         "description": "Description",
         "category": "Source Category",
         "baseUrl": "https://api-us.cloud.com",
         "customerId":"customer_id",
         "clientId":"client_id",
         "clientSecret":"client_secret",
         "supportedAPIs":[
            "systemLogs",
            "operationLogs",
            "sessionLogs"
         ],
         "fields":{
            "_siemForward":false
         }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}