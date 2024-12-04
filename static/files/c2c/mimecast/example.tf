resource "sumologic_cloud_to_cloud_source" "mimecast-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Mimecast"
  }
  config = jsonencode({
"name": "Mimecast",
      "description": "Mimecast",
      "category": "Mimecast",
      "domain": "us-api.mimecast.com",
      "application_key": "a32axxxx-xxxx-xxxx-xxxx-xxxxxxb189bd",
      "application_id": "e399xxxx-xxxx-xxxx-xxxx-xxxxxx71eead",
      "access_key": "uGAN9BAxxxxx-xxxxxxxl8Sp06XEdky6tY",
      "secret_key": "zjRtw77K+7rtFYWxxxxxxxxxxxjB+DINTfzA",
      "supported_apis": [
        "SIEM",
        "DLP",
        "Audit Events",
        "Hold Message List"
      ]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}