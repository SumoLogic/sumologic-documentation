resource "sumologic_cloud_to_cloud_source" "openai-source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "OpenAI"
  }
  config = jsonencode({
    "name"                    : "OpenAI Organization Costs & Audit Logs",
    "description"             : "Collects organization cost data and audit logs from OpenAI Admin API",
    "category"                : "openai",
    "fields"                  : { "_siemForward": true },
    "adminApiKey"             : "sk-admin-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "projectIds"              : ["proj_abc123", "proj_def456"],
    "collectCost"             : true,
    "apiKeyIds"               : ["key_abc123"],
    "collectAuditLogs"        : true,
    "eventTypes"              : ["api_key.created", "api_key.deleted"],
    "actorEmails"             : [],
    "actorIds"                : [],
    "resourceIds"             : [],
    "tenantOnly"              : false,
    "auditPollingIntervalMin" : "5m"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}
