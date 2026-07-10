---
id: migration-strategy-v2x-to-v300-cloudformation
title: Migrate AWS Observability from v2.x to v3.0.0 using CloudFormation
sidebar_label: Migrate v2.x to v3.0.0 (CloudFormation)
description: Learn how to migrate your existing AWS Observability CloudFormation stack from v2.x to v3.0.0 using the provided migration script.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation walks you through migrating an existing [AWS Observability CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0 using the `MigrateToV300.sh` migration script.

The script automates the entire migration process and pauses at key points for your approval before making any destructive changes.

:::note
This guide is for CloudFormation-based deployments only. If you deployed using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-using-terraform/). If you prefer to migrate manually without the script, see [Manually Migrate AWS Observability from v2.x to v3.0.0](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-v2x-to-v300-manual/).
:::

## Overview

The migration runs through the following phases:

| Phase | Action |
|:--|:--|
| 1. Validate | Checks AWS and Sumo Logic credentials, confirms the stack exists, and detects its version. |
| 2. Capture | Reads your existing collector, sources, and S3 bucket names from Sumo Logic. |
| 3. Map Parameters | Transforms v2.x parameters to v3.0.0 format and saves them to a local file. |
| 4. Confirm | Displays a full summary — **no changes are made until you approve**. |
| 5. Protect | Sets `RemoveOnDeleteStack=false` to ensure Sumo Logic resources survive stack deletion. |
| 6. Delete | Deletes the v2.x CloudFormation stack, but preserves your S3 buckets. |
| 7. FER Cleanup | Renames and disables 17 AWSO [Field Extraction Rules](/docs/manage/field-extractions/) to free quota for v3.0.0. |
| 8. Metric Rules | Deletes four AWSO [Metric Rules](/docs/metrics/metric-rules-editor/) that conflict with v3.0.0. |
| 9. Deploy | Deploys the v3.0.0 stack — **shows you the full parameter list before deploying**. |
| 10. Verify | Confirms all stack resources and Sumo Logic sources are healthy. |
| 11. Patch Roles | Updates the source IAM role ARNs to reference the new v3.0.0 IAM role. |
| 12. Report | Prints a summary and saves a log file. |

Expected duration: **15 to 20 minutes**.

### What stays the same

- Your Sumo Logic collector (same name and ID)
- All Sumo Logic sources (reused by name — same IDs, no data gap)
- Your S3 log buckets and all existing log data

### What changes

- The v2.x CloudFormation stack is deleted and replaced by a new v3.0.0 stack.
- 17 AWSO [Field Extraction Rules](/docs/manage/field-extractions/) are renamed to `v215_backup_<name>` and disabled (not deleted).
- Four AWSO [Metric Rules](/docs/metrics/metric-rules-editor/) are deleted and recreated by v3.0.0.
- Source IAM role ARNs are updated to the new v3.0.0 role.

:::warning
This migration permanently deletes your v2.x CloudFormation stack. If the v3.0.0 deployment fails after the stack is deleted, use [resume mode](#if-the-v300-deployment-fails) to retry the deployment without deleting the stack again.
:::

## Prerequisites

Before running the migration, ensure the following are in place.

### Tools

| Tool | How to install |
|:--|:--|
| `bash` | Pre-installed on macOS and Linux |
| `aws` CLI v2 | [AWS CLI installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| `jq` | `brew install jq` (macOS) or `apt install jq` (Linux) |
| `curl` | Pre-installed on macOS and Linux |

### AWS permissions

Your AWS credentials must have permissions to:
- Read and update CloudFormation stacks (`cloudformation:DescribeStacks`, `cloudformation:UpdateStack`, `cloudformation:DeleteStack`, `cloudformation:CreateStack`).
- Read S3 bucket metadata (`s3:HeadBucket`).
- Read IAM roles (`iam:GetRole`).

### Sumo Logic credentials

You will need a Sumo Logic **Access ID** and **Access Key** with the Administrator role. To generate them, go to **Administration > Security > Access Keys**. For more information, see [Access Keys](/docs/manage/security/access-keys/).

You will also need your **Sumo Logic Org ID**, found at **Administration > Account > Org ID**.

### Back up your Field Extraction Rules

Before running the migration, export a backup of your [Field Extraction Rules](/docs/manage/field-extractions/) from **Manage Data > Logs > Field Extraction Rules**. The script renames them rather than deleting them, but it is good practice to have a backup.

### Back up your Metric Rules

The migration permanently deletes 4 AWSO [Metric Rules](/docs/metrics/metric-rules-editor/). Record them before running the script by going to **Manage Data > Metrics > Metric Rules**. They will be recreated automatically by v3.0.0 during deployment, but having a record is useful if you need to verify them afterward.

## Running the migration

Download the migration script and make it executable:

```bash
curl -O https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/main/cloudformation-sumologic-aws-observability/scripts/MigrateToV300.sh
chmod +x MigrateToV300.sh
```

**Run the migration**

```bash
./MigrateToV300.sh \
  -d <deployment> \
  -i <access_id> \
  -k <access_key> \
  -o <org_id> \
  -s <v2x_stack_name> \
  -r <aws_region> \
  -n <v300_stack_name> \
  --install-apps Yes
```

**Example**

```bash
./MigrateToV300.sh \
  -d us2 \
  -i <your_access_id> \
  -k <your_access_key> \
  -o <your_org_id> \
  -s my-awso-production \
  -r us-east-1 \
  -n my-awso-production-v300 \
  --install-apps Yes
```

### Script parameters

#### Required

| Flag | Description | Example |
|:--|:--|:--|
| `-d DEPLOYMENT` | Your Sumo Logic deployment | `us1`, `us2`, `kr`, `eu`, `de`, `au`, `jp`, `ca`, `ch`, `fed`, `esc` |
| `-i ACCESS_ID` | Sumo Logic access ID | `suXXXXXXXXXXXX` |
| `-k ACCESS_KEY` | Sumo Logic access key | (64-character key) |
| `-o ORG_ID` | Sumo Logic org ID | `00000000XXXXXXXX` |
| `-s STACK_NAME` | Name of your existing v2.x CloudFormation stack | `my-awso-production` |
| `-r REGION` | AWS region where the stack is deployed | `us-east-1` |

#### Optional

| Flag | Description | Default |
|:--|:--|:--|
| `-n NEW_STACK_NAME` | Name for the new v3.0.0 stack | Same as `-s` |
| `-v VERSION` | Source version override: `2.12`, `2.13`, `2.14`, `2.15` | Auto-detected |
| `--install-apps` | Install Sumo Logic observability apps: `Yes` or `No` | `Yes` |
| `-p AWS_PROFILE` | AWS CLI named profile | `default` |
| `--dry-run` | Preview the mapped parameters without making any changes | Off |
| `--resume` | Skip phases 2–6 and resume from phase 7 using a saved params file — use after a failed v3.0.0 deployment | Off |
| `--params-file FILE` | Path to the saved params JSON file to use with `--resume` | — |
| `--patch-roles-only` | Run only validate, role patching (phase 11), and report — use when sources need their IAM role ARN updated without re-running the full migration | Off |

## Confirmation screens

The script pauses twice and asks for your approval before making any changes.

### Phase 4: migration summary

Before touching any infrastructure, the script displays a summary of what it found and what it will do:

```
  Stack to migrate:
    Name:    my-awso-production
    Region:  us-east-1
    Version: v2.15

  Sumo Logic Collector:
    Name: aws-observability-myalias-123456789012
    ID:   100537823

  Sources on collector:
    [100653038] cloudtrail-logs (Polling)
    [100653039] alb-logs (Polling)
    [100653040] cloudwatch-metrics (HTTP)
    [100653041] classic-lb-logs (Polling)
    [100653042] kinesis-firehose-cloudwatch-logs (HTTP)

  S3 Buckets:
    ALB bucket:        aws-observability-logs-4bc184f0
    CloudTrail bucket: aws-observability-logs-4bc184f0
    ELB bucket:        aws-observability-logs-4bc184f0

  The following PERMANENT changes will be made:
    1. UPDATE stack to set RemoveOnDeleteStack=false
    2. DELETE stack my-awso-production
    3. RENAME 17 AWSO Field Extraction Rules
    4. DELETE 4 AWSO Metric Rules

Proceed with migration? Type 'yes' to continue:
```

Type `yes` to proceed. Anything else aborts safely with no changes made.

### Phase 9: Deployment parameters

Just before deploying v3.0.0, the script displays every parameter that will be used. Access credentials are masked:

```
  v3.0.0 parameters to be deployed:
    Section1aSumoLogicDeployment = us2
    Section1bSumoLogicAccessID = suXXXXXXXXXXXX
    Section1cSumoLogicAccessKey = ***
    Section5bALBCreateLogSource = Yes
    Section5dALBS3LogsBucketName = aws-observability-logs-4bc184f0
    Section6aCreateCloudTrailLogSource = Yes
    Section6cCloudTrailLogsBucketName = aws-observability-logs-4bc184f0
    ...

Deploy v3.0.0 stack 'my-awso-production-v300'? Type 'yes' to continue:
```

:::note
If a source was not installed in your v2.x stack (for example, if the ALB source was set to `No`), its corresponding bucket parameter will be empty, and the source will not be created in v3.0.0 either.
:::

## Dry run (preview only)

To preview the mapped parameters without making any changes, add `--dry-run`:

```bash
./MigrateToV300.sh \
  -d us2 -i <access_id> -k <access_key> -o <org_id> \
  -s my-awso-production -r us-east-1 \
  --dry-run
```

The script runs phases 1 to 3, prints the mapped v3.0.0 parameters, and exits without modifying anything.

## Log file

Every run writes a plain-text log file to the directory where the script is executed:

```
./migration_<stack_name>_<YYYYMMDD_HHMMSS>.log
```

The log file path is printed in the phase 12 summary. Keep this file in case you need to contact Sumo Logic support.

## If the v3.0.0 deployment fails

If phase 9 (Deploy) fails and the stack ends up in `ROLLBACK_COMPLETE`, the v2.x stack has already been deleted, and a fresh full migration is not possible. Use resume mode to retry the deployment without re-deleting.

**Step 1**: Delete the failed stack:

```bash
aws cloudformation delete-stack --stack-name <v300_stack_name> --region <region>
aws cloudformation wait stack-delete-complete --stack-name <v300_stack_name> --region <region>
```

**Step 2**: Resume using the params file saved during phase 3. The script prints its exact path when a failure occurs:

```bash
./MigrateToV300.sh \
  -d us2 -i <access_id> -k <access_key> -o <org_id> \
  -r <region> -n <v300_stack_name> \
  --resume --params-file ./migration_params_<v300_stack_name>_<timestamp>.json
```

The resume mode skips phases 2 to 6 and executes the following phases:
FER Cleanup > Metric Rules Cleanup > Deploy > Verify > Patch Roles > Report.

## Patching IAM role ARNs after migration

If v3.0.0 is already deployed but your Sumo Logic sources are showing errors because they still reference the old IAM role ARN (for example, if the script was interrupted before phase 11), you can run role patching on its own:

```bash
./MigrateToV300.sh \
  -d us2 -i <access_id> -k <access_key> -o <org_id> \
  -s <v300_stack_name> -r <region> \
  --patch-roles-only
```

The script runs the following phases without touching the stack or any Sumo Logic configuration:
Validate > Patch Roles > Report

## Troubleshooting

| Error | Cause | Resolution |
|:--|:--|:--|
| `aws CLI not found in PATH` | AWS CLI not installed or not accessible from the shell | Install the AWS CLI and verify with `aws --version`. |
| `AWS credentials invalid` | AWS session has expired | Re-authenticate using `aws sso login` or export new session tokens. |
| `Sumo Logic credentials invalid (HTTP 401)` | Incorrect access ID or key | Verify the `-i` and `-k` values. |
| `Stack not found` | Wrong stack name or region | Verify `-s` and `-r` match your AWS Console. |
| `Stack update ended with status: TIMEOUT` | Phase 5 update timed out on a large stack with many nested stacks | Re-run the script. If the update is already complete, phase 5 will be skipped automatically. |
| `ROLLBACK_COMPLETE` on v3.0.0 deploy | Template or parameter error during deployment | Delete the rolled-back stack and follow the [resume steps](#if-the-v300-deployment-fails). |
| `Failed to rename FER — already exists` | A previous partial run already renamed some FERs | Use `--resume`. The script detects already-renamed FERs and skips them. |
| Sources show `<empty>` bucket in report | Expected in resume mode — buckets are not re-captured | Does not affect the migration. The params file already has the correct bucket values. |
