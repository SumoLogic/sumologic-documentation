resource "sumologic_cloud_to_cloud_source" "microsoft-graph-azure-ad-reporting-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "MS Graph Azure AD Reporting"
  }
  config = jsonencode({
      "name":"ms-azure-ad-reporting-test",
      "tenant_id":"c9b18390-9cd7-4f5f-bfa5-46a50fef83f9",
      "supported_apis":["Directory Audit","Signin","Provisioning"],
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "application_id":"5a03f2a8-4de9-4243-9d27-32c8f3921466"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}