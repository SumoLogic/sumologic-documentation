resource "sumologic_cloud_to_cloud_source" "zimperium-mtd-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Zimperium MTD"
  }
  config = jsonencode({
                    "name": "Zimperium MTD",
                    "accountURL": "https://zc202.zimperium.com",
                    "clientId": "eRF12xxxR6ixxxjh1WSsqA",
                    "clientSecret": "452852c1xxe95eec3xxxx849fd956052ff212dcf6cbxxxdbdb208ef737290",
                    "pollingIntervalHour": 12
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}