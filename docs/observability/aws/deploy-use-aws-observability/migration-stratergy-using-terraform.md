---
id: migration-strategy-using-terraform
title: Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform
sidebar_label: Migration Strategy using Terraform
description: Learn how to migrate CloudWatch Source to Kinesis Firehose Source using Terraform.
---

This document will help you to migrate CloudWatch Source to Kinesis Firehose Source using Terraform. There are two approaches which you can follow for the migration. Refer [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) and [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/#kinesis-firehose-source-or-cloudwatch-source) to know about the migration beifits.

## Approach 1: Enable forwarding of data to Sumo Logic using Kinesis Firehose for the Log and Metrics source

1. Add a **new-collection-module** where only logs and metrics collection is enabled. 
1. Disable all other collections in this block. 
1. Run `terraform init` and `terraform apply`.
    ```sql
    module "new-collection-module" {
    source = "./source-module"

    aws_account_alias         = var.aws_account_alias
    sumologic_organization_id = var.sumologic_organization_id
    access_id                 = var.sumologic_access_id
    access_key                = var.sumologic_access_key
    environment               = var.sumologic_environment  
    sumologic_collector_details = {
        "collector_name": "AWS Observability Prod",
        "description": "This collector is created using Sumo Logic terraform AWS Observability module.",
        "fields": {}
    }
    collect_cloudwatch_logs = "Kinesis Firehose Log Source"
    collect_cloudwatch_metrics = "Kinesis Firehose Metrics Source"
    collect_cloudtrail_logs = "false"
    collect_classic_lb_logs = "false"
    collect_elb_logs = "false"
    collect_root_cause_data = "None"
    }
    ```
1. Verify the following:
    1. Log group and metrics subscription. 
    1. Logs and metrics ingested into Sumo Logic via Kinesis Firehose sources.
1. Once verified, delete the old CloudWatch log sources (HTTP) and metrics sources with other associated resources like Lambdas, subscription, and more.
    1. Disable logs and metrics collection in the original collection block and run `terraform apply` again to clean up the redundant resources.
    ```sql
    module "old-collection-module" {
    source = "./source-module"

    aws_account_alias         = var.aws_account_alias
    sumologic_organization_id = var.sumologic_organization_id
    access_id                 = var.sumologic_access_id
    access_key                = var.sumologic_access_key
    environment               = var.sumologic_environment  
    collect_cloudwatch_logs = "None"
    collect_cloudwatch_metrics = "None"
    }
    ```

:::note
This approach will create an additional collector with Kinesis logs and metrics sources.
:::

### Advantages

- There is no loss of logs and metrics during migration.

### Disadvantages

- There will be ingestion of duplicate logs and metrics.

## Approach 2: Update existing collection module

1. Update `collect_cloudwatch_logs` from **Lambda Log Forwarder** to **Kinesis Firehose Log Source**.
1. Update `collect_cloudwatch_metrics` from **CloudWatch Metrics Source** to **Kinesis Firehose Metrics Source**.
    ```sql
    collect_cloudwatch_logs = "Kinesis Firehose Log Source"
    collect_cloudwatch_metrics = "Kinesis Firehose Metrics Source"
    ```
1. Run `terraform apply`.
    - Forwarding of logs and metrics will start to Sumo Logic using Kinesis Firehose for Logs and Kinesis Firehose for Metrics.
    - Old CloudWatch log source (HTTP) and metrics source along with other associated resources such as Lambdas, subscription, and more will also be deleted.

### Advantages

- There is no ingestion of duplicate logs and metrics.

### Disadvantages

- There will be a loss of logs and metrics during migration.

## Troubleshooting

### Error

`A resource with the same name already exists`

### Cause

When you try to migrate CloudWatch Source to Kinesis Firehose Source using [Approach 2](#approach-2-update-existing-collection-module), migration will fail because Terraform tries to create a Kinesis source with the same name before deleting the existing Cloudwatch Source. 

### Solution

1. Run `terraform apply` again to create a Kinesis Firehose log source. 
1. Wait until the migration gets completed.
1. Verify your subscription and log + metrics ingestion into Sumo Logic.

### Error

`Error: error creating Serverless Application Repository CloudFormation Stack (arn:aws:cloudformation:us-east-1:XXXXXXXXX:stack/serverlessrepo-serverless-hello-world-test/7a6ef230-35a6-11zb-98ff-0ab512dce13f) change set: unexpected state 'FAILED', wanted target 'CREATE_COMPLETE'. last error: %!s()`

### Solution

To resolve this issue, refer to [creating Serverless Application Repository CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/#troubleshooting).