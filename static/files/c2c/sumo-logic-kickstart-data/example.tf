resource "sumologic_cloud_to_cloud_source" "sumo-logic-kickstart-data-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "DataGen"
  }
  config = jsonencode({
          "name": "datagen_source",
          "category": "datagen_category",
          "dataType": "OTEL"
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}