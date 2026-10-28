resource "sumologic_cloud_to_cloud_source" "armis_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Armis"
  }
  config = jsonencode({
            "name": "armis",
            "description": "description",
            "category": "source_category",
            "instanceURL": "http://armis-instance.armis.com",
            "secretKey": "*********",
            "apiType": [
                "alertLogs",
                "deviceLogs"
            ],
            "fields": {
                "_siemForward": false
            }
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}