resource "sumologic_cloud_to_cloud_source" "dropbox_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Dropbox"
  }
  config = jsonencode({
    "access_code" : "********",
    "name" : "Dropbox source",
    "app_secret" : "********",
    "app_key" : "abcdefg1234567",
    "fields" : {
      "_siemForward" : false
    }
  })

}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
