resource "sumologic_cloud_to_cloud_source" "vmware-workspace-one-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "VMware Workspace One"
  }
  config = jsonencode({
                        "name": "VMWare Workspace One",
                        "requestEndpoint": "https://abc123.abcd.com",
                        "authURL": "https://uat.uemauth.vmwservices.com",
                        "clientID": "3xxxx62vvccbv4f6fbaxxxxxxx748e201",
                        "clientSecret": "678adsfsxxxxxxxxxxxxxxxxfsf1",
                        "deviceType": [
                                        "Apple",
                                        "Android",
                                        "WindowsPC"
                                      ],
                        "pollingIntervalSearchHour": "24h",
                        "collectAppsDetails": true
                      })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}