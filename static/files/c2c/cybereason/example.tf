resource "sumologic_cloud_to_cloud_source" "cybereason_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Cybereason"
  }
  config = jsonencode({
      "back_collection_hours":720,
      "name":"test cybereason",
      "domain":"mydomain.cybereason.net",
      "client_password":"********",
      "polling_interval":300,
      "fields":{
        "_siemForward":false
      },
      "dup_users":true,
      "category":"c2c/cybereason",
      "client_user":"********"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}