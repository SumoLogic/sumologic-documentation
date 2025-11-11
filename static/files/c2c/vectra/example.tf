resource "sumologic_cloud_to_cloud_source" "vectra-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Vectra"
  }
  config = jsonencode({
                "name": "Vectra",
                "accountURL": "https://123456789012.cc1.portal.vectra.ai",
                "clientId": "8e09xxxxxxxxxxxx36x2d2",
                "clientSecret": "q3Wxxxxxxxxxxxxxxpy4W5MhxJ4xxsRD63hdf",
                "pollingIntervalMin": "5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}