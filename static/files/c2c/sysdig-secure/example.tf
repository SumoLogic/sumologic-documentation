resource "sumologic_cloud_to_cloud_source" "sysdig-secure-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Sysdig"
  }
  config = jsonencode({
                        "name": "Sysdig",
  			                "baseURL": "https://us2.app.sysdig.com",
  			                "bearerToken": "wdwxxxxxqwedwedxxxxxqewdxxxxxxqwedxxxx",
  			                "scope": [
    			                        {
      				                      "fieldName": "Field",
      				                      "fieldValue": "Value"
    			                        }
  			                         ]
                      })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}