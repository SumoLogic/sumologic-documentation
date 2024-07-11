resource "sumologic_cloud_to_cloud_source" "docusign_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "DocuSign"
  }
  config = jsonencode({
         "name": "DocuSign",
         "description": "Test Source",
         "category": "source_category",
         "env": "dev",
         "userId": "9cfb472b-ef1f-4116-8df2-17c538xxxxxx",
         "integrationKey": "215c96c6-19a6-48e9-955f-253593xxxxxx",
         "rsaPrivateKey": "-----BEGIN RSA PRIVATE KEY----- xxxxxxx xxxxxxx xxxxx== -----END RSA PRIVATE KEY-----"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}