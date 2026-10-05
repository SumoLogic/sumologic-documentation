resource "sumologic_cloud_to_cloud_source" "trend-micro-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Trend Micro Vision One"
  }
  config = jsonencode({
                    "name": "Trend Micro Vision One",
                    "description": "To collect data from trend Micro Vision",
                    "category": "category",
                    "apiBaseUrl": "api.xdr.trendmicro.com",
                    "authToken": "eYBXxxxxxxxxxxxxxxxxxx1233x",
                    "pollingInterval": 15
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}