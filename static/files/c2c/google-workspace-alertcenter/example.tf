resource "sumologic_cloud_to_cloud_source" "google_workspace_alertcenter_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Google Workspace AlertCenter"
  }
  config = jsonencode({
    "type": "service_account",
    "project_id": "sample_project",
    "private_key_id": "asdfgh1234556",
    "private_key": "-----BEGIN PRIVATE KEY-----\nsample_private_key\n-----END PRIVATE KEY-----\n",
    "client_email": "sample_project@sample_service_account.com",
    "client_id": "12345678",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sample_url.com"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}