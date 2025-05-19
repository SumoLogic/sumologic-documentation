resource "sumologic_cloud_to_cloud_source" "akamai-cpc-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "Akamai CPC"
  }
  config = jsonencode({
            "name": "c2c-Akamai CPC",
            "clientToken":"akab-ctfkqxxxxxxa3quph-xxxxxx",
            "clientSecret":"IyVVIdYgBfxxxxxbToZMGGaxxxxxxxxxxM",
            "accessToken":"akabxxxxxx4ke52-xxxxxxxx5efol",
                    "hostName":"abcde-efgx-xxxxxx.net",
                    "collectAlertsLogs": true,
                    "pollingIntervalAlertsMin": 5,
                        "collectAlertDetails": true,
            "severityLevel": [
                "HIGH",
                "MEDIUM"
            ],
            "alertType": [
                "SUSPICIOUS_SCRIPT_ACTIVITY_EG_CPC_ALERT"
            ],
            "alertStatus": [
                "OPEN"
            ],
            "pollingIntervalCPCConfigsHrs":12
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}