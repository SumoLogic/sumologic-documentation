resource "sumologic_cloud_to_cloud_source" "github-copilot-source" {
  collector_id = sumologic_collector.collector.id

  schema_ref = {
    type = "Github Copilot"
  }

  config = jsonencode({
    name                = "Github Copilot"
    organization        = "sanlabs"
    patToken            = "github_pat_11AYxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    collectTeamMetrics  = true
    metricPeriodInDays  = 1
    teamNames           = ["dev-team", "cse-team"]
  })
}

resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}