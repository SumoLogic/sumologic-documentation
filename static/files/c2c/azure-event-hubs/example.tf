resource "sumologic_cloud_to_cloud_source" "azure_event_hubs_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Azure Event Hubs"
  }
  config = jsonencode({
            "name": "Azure Event Hubs",
            "description": "East field",
            "namespace": "namespace",
            "hub_name": "hub name",
            "access_policy_name": "policyName",
            "access_policy_key": "********",
            "consumer_group": "groupName",
            "fields": {
                "_siemForward": false
            },
            "category": "eastTeamF",
            "receive_with_latest_offset": true,
            "automaticDateParsing": true,
            "autoParseTimeFormat": false,
            "defaultDateFormats": [{
                "format": "dd-MM-yyyy",
                "locator": "INFO(.*)"
            }]
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}