resource "sumologic_cloud_to_cloud_source" "glean_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "glean"
  }
  config = jsonencode({
    "name"        = "Glean"
    "description" = "Glean activity logs source"
    "category"    = "c2c/glean"
    "apiToken"    = "glean_api_xxxxx"
    "instanceUrl" = "https://your-company.glean.com"
    "fields" = {
      "_siemForward" = false
    }
  })
}

output "sumologic_glean_source" {
  value = sumologic_cloud_to_cloud_source.glean_source
}
