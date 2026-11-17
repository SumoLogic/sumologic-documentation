resource "sumologic_cloud_to_cloud_source" "github-copilot-source" {
  collector_id = sumologic_collector.collector.id

  schema_ref = {
    type = "Github Copilot"
  }

  config = jsonencode({
    name                  = "GitHub Copilot"
    description           = "GitHub Copilot usage metrics"
    category              = "github/copilot"
    baseURL               = "https://api.github.com"
    organization          = "sanlabs"
    patToken              = "github_pat_xxxz7ARP6EABxxxxxxx"
    collectUserTeamReport = true
    collectUserMetrics    = true
    metricPeriodInDays    = 1
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Sample collector for the GitHub Copilot source"
}
