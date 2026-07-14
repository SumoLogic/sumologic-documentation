---
id: migration-strategy-v2x-to-v300-manual
title: Manually Migrate AWS Observability from v2.x to v3.0.0 using CloudFormation
sidebar_label: Manually Migrate v2.x to v3.0.0 (CloudFormation)
description: Step-by-step guide to manually migrate your AWS Observability CloudFormation stack from v2.x to v3.0.0.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation walks you through manually migrating an existing [AWS Observability CloudFormation](/docs/observability/aws/deploy-use-aws-observability/v300/deploy-with-aws-cloudformation/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0.

:::note
If you prefer an automated approach, see [Migrate AWS Observability from v2.x to v3.0.0 using the migration script](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-v2x-to-v300-cloudformation/).
:::

:::warning
This migration deletes your v2.x CloudFormation stack. Your Sumo Logic collector, sources, and S3 buckets are preserved, but the stack deletion cannot be undone.
:::

## Prerequisites

Before making any changes, create backups of the following resources:

- **[Field Extraction Rules](/docs/manage/field-extractions/)**. Export from **Manage Data > Logs > Field Extraction Rules**.
- **[Metric Rules](/docs/metrics/metric-rules-editor/)**. Record them from **Manage Data > Metrics > Metric Rules**.

You will also need:
- Your Sumo Logic **Access ID** and **Access Key** with the Administrator role. For more information, see [Access Keys](/docs/manage/security/access-keys/).
- Your Sumo Logic **Org ID**, found at **Administration > Account > Org ID**.
- The **S3 bucket name(s)** used by your existing v2.x stack — you will need these when deploying v3.0.0.

## Step 1: Set RemoveOnDeleteStack to false

This is the most critical step. Before deleting the v2.x stack, ensure that `RemoveOnDeleteStack` is set to `false`. If this parameter is `true` when the stack is deleted, the Sumo Logic Lambda helper permanently deletes the collector and all associated sources.

1. Navigate to **AWS Console > CloudFormation > Stacks** and select your v2.x stack.
2. Click **Update**.
3. Select **Use existing template** and click **Next**.
4. In the parameters screen, find **Delete Sumo Logic Resources when stack is deleted** and set it to **false**.

<img src={useBaseUrl('img/observability/migration-remove-on-delete.png')} alt="CloudFormation Update Stack showing RemoveOnDeleteStack set to false" />

5. Click through the remaining steps and submit the update.
6. Wait for the stack to reach `UPDATE_COMPLETE` before proceeding.

## Step 2: Delete the v2.x stack

1. Go to **AWS Console > CloudFormation > Stacks**.
2. Select your v2.x stack and click **Delete**.
3. Confirm the deletion.
4. Wait for the stack to reach `DELETE_COMPLETE`. If the deletion gets stuck in `DELETE_FAILED`, this is expected — the S3 bucket cannot be deleted because it contains logs. In this case, use **Force delete** to complete the deletion while leaving the bucket intact.

## Step 3: Verify your Sumo Logic resources are intact

After the stack is deleted, verify that your collector and sources are still present in Sumo Logic:

1. Go to **Manage Data > Collection > Collection**.
2. Find the collector named `aws-observability-<alias>-<accountId>`.
3. Confirm that all sources that were present in your v2.x stack are still listed. Depending on which sources you had enabled, you may see some or all of the following:
   - `alb-logs`
   - `classic-lb-logs`
   - `cloudtrail-logs`
   - `cloudwatch-metrics`
   - `kinesis-firehose-cloudwatch-logs`

## Step 4: Clean up Field Extraction Rules

The v3.0.0 deployment creates the same 17 AWSO Field Extraction Rules as v2.x. If they already exist in your v2.x installation, the v3.0.0 deployment will fail due to a quota conflict. You must rename or delete them before deploying.

1. Navigate to **Manage Data > Logs > Field Extraction Rules**.
2. Find all 17 AWSO rules (names beginning with `AwsObservability`).
3. Rename each one (for example, prefix with `v2_backup_`) or delete them.

## Step 5: Clean up Metric Rules

The v3.0.0 deployment also creates 4 AWSO Metric Rules that may already exist from your v2.x install. Delete them before deploying:

1. Go to **Manage Data > Metrics > Metric Rules**.
2. Delete the following rules:
   - `AwsObservabilityRDSClusterMetricsEntityRule`
   - `AwsObservabilityRDSInstanceMetricsEntityRule`
   - `AwsObservabilityNLBMetricsEntityRule`
   - `AwsObservabilityApiGatewayApiNameMetricsEntityRule`

## Step 6: Deploy v3.0.0

Deploy the v3.0.0 CloudFormation stack using the parameter mapping table below. Use the same account alias, Sumo Logic credentials, and source creation options as your v2.x stack. When v3.0.0 detects existing Sumo Logic sources with matching names on the collector, it reuses them — no data gap occurs and no duplicate sources are created.

Template URL:
```
https://sumologic-appdev-aws-sam-apps.s3.us-east-1.amazonaws.com/aws-observability-versions/v3.0.0/templates/sumologic_observability.master.template.yaml
```

### Parameter mapping

Use the following table to map your v2.x parameter values to v3.0.0:

<table style={{width: '100%', tableLayout: 'fixed'}}>
<thead>
<tr>
<th style={{width: '36%'}}>v2.x Parameter</th>
<th style={{width: '36%'}}>v3.0.0 Parameter</th>
<th style={{width: '28%'}}>Notes</th>
</tr>
</thead>
<tbody>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1aSumoLogicDeployment</code></td><td><code style={{wordBreak: 'break-word'}}>Section1aSumoLogicDeployment</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1bSumoLogicAccessID</code></td><td><code style={{wordBreak: 'break-word'}}>Section1bSumoLogicAccessID</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1cSumoLogicAccessKey</code></td><td><code style={{wordBreak: 'break-word'}}>Section1cSumoLogicAccessKey</code></td><td>Same value (re-enter — masked in CFN)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1dSumoLogicOrganizationId</code></td><td><code style={{wordBreak: 'break-word'}}>Section1dSumoLogicOrganizationId</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1eSumoLogicResourceRemoveOnDeleteStack</code></td><td><code style={{wordBreak: 'break-word'}}>Section1eSumoLogicResourceRemoveOnDeleteStack</code></td><td>Set to <code>false</code></td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section1fSumoLogicSendTelemetry</code></td><td><code style={{wordBreak: 'break-word'}}>Section1fSumoLogicSendTelemetry</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section2aAccountAlias</code></td><td><code style={{wordBreak: 'break-word'}}>Section2aAccountAlias</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section2bAccountAliasMappingS3URL</code></td><td><code style={{wordBreak: 'break-word'}}>Section2bAccountAliasMappingS3URL</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section3aInstallObservabilityApps</code></td><td><code style={{wordBreak: 'break-word'}}>Section3aInstallObservabilityApps</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section4aCreateMetricsSourceOptions</code></td><td><code style={{wordBreak: 'break-word'}}>Section4aCreateMetricsSourceOptions</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section4bMetricsNameSpaces</code></td><td><code style={{wordBreak: 'break-word'}}>Section4bMetricsNameSpaces</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section4cCloudWatchExistingSourceAPIUrl</code></td><td><code style={{wordBreak: 'break-word'}}>Section4cCloudWatchExistingSourceAPIUrl</code></td><td>Leave empty (create new)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section4dAWSMetricsTagFilters</code></td><td><code style={{wordBreak: 'break-word'}}>Section4dAWSMetricsTagFilters</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section5aAutoEnableS3LogsALBResourcesOptions</code></td><td><code style={{wordBreak: 'break-word'}}>Section5aAutoEnableS3LogsALBResourcesOptions</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section5bALBCreateLogSource</code></td><td><code style={{wordBreak: 'break-word'}}>Section5bALBCreateLogSource</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section5cALBLogsSourceUrl</code></td><td><code style={{wordBreak: 'break-word'}}>Section5cALBLogsSourceUrl</code></td><td>Leave empty (create new)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section5dALBS3LogsBucketName</code></td><td><code style={{wordBreak: 'break-word'}}>Section5dALBS3LogsBucketName</code></td><td>Use the existing bucket name from your v2.x stack</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section5eALBS3BucketPathExpression</code></td><td><code style={{wordBreak: 'break-word'}}>Section5eALBS3BucketPathExpression</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section6aCreateCloudTrailLogSource</code></td><td><code style={{wordBreak: 'break-word'}}>Section6aCreateCloudTrailLogSource</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section6bCloudTrailLogsSourceUrl</code></td><td><code style={{wordBreak: 'break-word'}}>Section6bCloudTrailLogsSourceUrl</code></td><td>Leave empty (create new)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section6cCloudTrailLogsBucketName</code></td><td><code style={{wordBreak: 'break-word'}}>Section6cCloudTrailLogsBucketName</code></td><td>Use the existing bucket name from your v2.x stack</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section6dCloudTrailBucketPathExpression</code></td><td><code style={{wordBreak: 'break-word'}}>Section6dCloudTrailBucketPathExpression</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section7aLambdaCreateCloudWatchLogsSourceOptions</code></td><td><code style={{wordBreak: 'break-word'}}>Section7aCreateCloudWatchLogsSourceOptions</code></td><td><strong>Renamed</strong> — drop <code>Lambda</code> from key name</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section7bLambdaCloudWatchLogsSourceUrl</code></td><td><code style={{wordBreak: 'break-word'}}>Section7bCloudWatchLogsSourceUrl</code></td><td><strong>Renamed</strong> — drop <code>Lambda</code>; leave empty (create new)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section7cAutoSubscribeLogGroupsOptions</code></td><td><code style={{wordBreak: 'break-word'}}>Section7cAutoSubscribeLogGroupsOptions</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section7dAutoSubscribeLogGroupPattern</code></td><td><code style={{wordBreak: 'break-word'}}>Section7dAutoSubscribeLogGroupPattern</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section7eAutoSubscribeLogGroupByTags</code></td><td><code style={{wordBreak: 'break-word'}}>Section7eAutoSubscribeLogGroupByTags</code></td><td>Same value</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section9aAutoEnableS3LogsELBResourcesOptions</code></td><td><code style={{wordBreak: 'break-word'}}>Section8aAutoEnableS3LogsELBResourcesOptions</code></td><td><strong>Renamed</strong> — Section 9 → Section 8</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section9bELBCreateLogSource</code></td><td><code style={{wordBreak: 'break-word'}}>Section8bELBCreateLogSource</code></td><td><strong>Renamed</strong> — Section 9 → Section 8</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section9cELBLogsSourceUrl</code></td><td><code style={{wordBreak: 'break-word'}}>Section8cELBLogsSourceUrl</code></td><td><strong>Renamed</strong> — Section 9 → Section 8; leave empty (create new)</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section9dELBS3LogsBucketName</code></td><td><code style={{wordBreak: 'break-word'}}>Section8dELBS3LogsBucketName</code></td><td><strong>Renamed</strong> — Section 9 → Section 8; use existing bucket name</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section9eELBS3BucketPathExpression</code></td><td><code style={{wordBreak: 'break-word'}}>Section8eELBS3BucketPathExpression</code></td><td><strong>Renamed</strong> — Section 9 → Section 8</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section10aAppInstallLocation</code></td><td><em>(removed)</em></td><td><strong>Removed in v3.0.0</strong> — do not include</td></tr>
<tr><td><code style={{wordBreak: 'break-word'}}>Section10bShare</code></td><td><em>(removed)</em></td><td><strong>Removed in v3.0.0</strong> — do not include</td></tr>
</tbody>
</table>

:::note
Setting the source URL parameter (for example, `Section5cALBLogsSourceUrl`) to an empty string forces v3.0.0 into **create new** mode. When v3.0.0 detects existing sources with matching names on the collector, it reuses them. So, there's no data gap.
:::

## Step 7: Update source IAM role ARNs

After v3.0.0 deploys successfully, update each existing Sumo Logic source with the new IAM role ARN that v3.0.0 creates. Although deleting the v2.x stack removes the old IAM role, the sources continue to reference it until you update them.

### Find the new IAM role ARN

1. Go to **AWS Console > CloudFormation > Stacks** and select your new v3.0.0 stack.
2. In the **Resources** tab, find the nested stack named `CreateCommonResources` and click on it.

<img src={useBaseUrl('img/observability/migration-arn-cfn-stack-resources.png')} alt="CloudFormation main stack Resources tab with CreateCommonResources highlighted" />

3. In the `CreateCommonResources` stack, go to the **Resources** tab and search for `SumoLogicSourceRole`. Click the **Physical ID** link to open the IAM role.

<img src={useBaseUrl('img/observability/migration-arn-common-resources-role.png')} alt="CreateCommonResources stack Resources tab with SumoLogicSourceRole highlighted" />

4. On the IAM role page, copy the **ARN** shown in the Summary section.

<img src={useBaseUrl('img/observability/migration-arn-iam-role-summary.png')} alt="IAM role summary page with ARN highlighted" />

### Update the role ARN in Sumo Logic

For each S3-based source on your collector (`alb-logs`, `classic-lb-logs`, `cloudtrail-logs`):

1. Go to **Manage Data > Collection > Collection**.
2. Find your AWSO collector and click on the source.
3. Update the **AWS Role ARN** field with the new ARN from the step above.
4. Save the source.

## Step 8: Verify the migration

1. Go to **Manage Data > Collection > Collection** and confirm all 5 sources show a green status.
2. Check that logs and metrics are flowing into Sumo Logic by running a search:
   - `_sourceCategory=aws/observability/cloudtrail/logs`
   - `_sourceCategory=aws/observability/cloudwatch/metrics`

## Troubleshooting

| Issue | Cause | Resolution |
|:--|:--|:--|
| Stack deletion stuck in `DELETE_FAILED` | S3 bucket is non-empty and cannot be deleted by CloudFormation | Use **Force delete** on the stack — the bucket will be preserved. |
| v3.0.0 deploy fails with `fer:invalid_extraction_rule` | AWSO Field Extraction Rules from v2.x still exist | Complete [Step 4](#step-4-clean-up-field-extraction-rules) and retry. |
| v3.0.0 deploy fails with `metrics:rule_already_exists` | AWSO Metric Rules from v2.x still exist | Complete [Step 5](#step-5-clean-up-metric-rules) and retry. |
| Sources show errors after migration | Sources still reference the old deleted IAM role ARN | Complete [Step 7](#step-7-update-source-iam-role-arns). |
| Collector or sources not found after stack deletion | `RemoveOnDeleteStack` was `true` when the stack was deleted | Resources cannot be recovered — redeploy v3.0.0 with fresh sources. |
