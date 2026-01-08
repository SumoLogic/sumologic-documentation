resource "sumologic_cloud_to_cloud_source" "AWS_cost_explorer_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "AWS Cost Explorer"
  }
  config = jsonencode({
      "accessID":"********",
      "name":"billing200",
      "description":"billing200",
      "fields":{
        "_siemForward":false,
        "account":"prod"
      },
      "accessKey":"********",
      "granularity":["daily","monthly"],
      "costMetrics":["AmortizedCost","BlendedCost","NetAmortizedCost","NetUnblendedCost","UnblendedCost"],
      "category":"aws/billing"
  })
}
resource "sumologic_collector" "collector" {
  name        = "my-collector"
  description = "Just testing this"
}