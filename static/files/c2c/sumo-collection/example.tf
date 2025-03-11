resource "sumologic_cloud_to_cloud_source" "sumo-collection-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Sumo Collection"
  }
  config = jsonencode({
                        "name": "Sumologic Collection",
                        "deployment": "https://api.sumologic.com/api/",
                        "accessId": "sug2Ihtaa1g6xk",
                        "accessKey": "00xxxxxx-xxxx-xxx2-9316-7xx42xxx1x41",
                        "collectorType": [
                                            "installed",
                                            "dead",
                                            "hosted",
                                            "alive"
                                        ],
                        "collectSources": true,
                        "pollingIntervalCollectorHour": "12",
                        "pollingIntervalSourceMin": "5"
                    })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}