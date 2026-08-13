---
id: migration-strategy-v2x-to-v300-cloudformation
title: Migrate AWS Observability from v2.x to v3.0.0 using CloudFormation
sidebar_label: Migrate v2.x to v3.0.0 (CloudFormation)
description: Learn how to migrate your existing AWS Observability CloudFormation stack from v2.x to v3.0.0 using the provided migration script.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation walks you through migrating an existing [AWS Observability CloudFormation](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-aws-cloudformation/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0 using the `MigrateToV300.sh` migration script.

The script automates the entire migration process and pauses at key points for your approval before making any destructive changes.

:::note
This guide is for CloudFormation-based deployments only. If you deployed using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/migration-strategy-using-terraform/). If you prefer to migrate manually without the script, see [Manually Migrate AWS Observability from v2.x to v3.0.0](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-v2x-to-v300-manual/).
:::

## Overview

The migration runs through the following phases:

| Phase | Action |
|:--|:--|
| 1. Validate | Checks AWS and Sumo Logic credentials, confirms the stack exists, and detects its version. |
| 2. Capture | Reads your existing collector, sources, and S3 bucket names from Sumo Logic. Cross-checks the collector ID against the CF stack and bucket names against CF stack parameters. |
| 3. Map Parameters | Transforms v2.x parameters to v3.0.0 format and saves them to a local params file. |
| 4. Confirm | Displays a full summary — **no changes are made until you approve**. |
| 5. Protect | Sets `RemoveOnDeleteStack=false` to ensure Sumo Logic resources survive stack deletion. |
| 6. Delete | Deletes the v2.x CloudFormation stack, but preserves your S3 buckets. |
| 7. FER Cleanup | Renames and disables AWSO [Field Extraction Rules](/docs/manage/field-extractions/) to free quota for v3.0.0. |
| 8. Metric Rules | Deletes four AWSO [Metric Rules](/docs/metrics/metric-rules-editor/) that conflict with v3.0.0. |
| 9. Deploy | Deploys the v3.0.0 stack — **shows you the full parameter list before deploying**. |
| 10. Verify | Confirms all stack resources and Sumo Logic sources are healthy. Checks S3 bucket policies, CloudTrail trails, and S3 bucket notifications. |
| 11. Patch Roles | Updates the source IAM role ARNs to reference the new v3.0.0 IAM role. |
| 12. Report | Prints a summary and saves a log file. |

Expected duration: **30 to 45 minutes**. Phase 5 (stack update) and Phase 6 (stack deletion) each take 5–10 minutes depending on stack size, and Phase 9 (deploy) takes a further 10–15 minutes.

### What stays the same

- Your Sumo Logic collector (same name and ID)
- All Sumo Logic sources (reused by name — same IDs, no data gap)
- Your S3 log buckets and all existing log data

### What changes

- The v2.x CloudFormation stack is deleted and replaced by a new v3.0.0 stack.
- AWSO [Field Extraction Rules](/docs/manage/field-extractions/) are renamed to `v215_backup_<name>` and disabled (not deleted).
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
- Read S3 bucket metadata (`s3:HeadBucket`, `s3api:GetBucketPolicy`, `s3api:GetBucketNotificationConfiguration`).
- Read IAM roles (`iam:GetRole`).
- Read CloudTrail trails (`cloudtrail:DescribeTrails`, `cloudtrail:GetTrailStatus`).
- Read SNS topic attributes (`sns:GetTopicAttributes`).

### Sumo Logic credentials

You will need a Sumo Logic **Access ID** and **Access Key** with the Administrator role. To generate them, go to **Administration > Security > Access Keys**. For more information, see [Access Keys](/docs/manage/security/access-keys/).

You will also need your **Sumo Logic Org ID**, found at **Administration > Account > Org ID**.

### Back up your Field Extraction Rules

Before running the migration, export a backup of your [Field Extraction Rules](/docs/manage/field-extractions/) from **Manage Data > Logs > Field Extraction Rules**. The script renames them rather than deleting them, but it is good practice to have a backup.

### Verify FER quota

Phase 7 renames your existing AWSO Field Extraction Rules and v3.0.0 then creates 17 new ones. You need at least **17 free slots** in your FER quota before running the migration.

To check your current usage, go to **Manage Data > Logs > Field Extraction Rules** and review the quota indicator at the top of the page. If fewer than 17 slots are free, delete or consolidate unused Field Extraction Rules until sufficient quota is available.

If you run the migration without enough quota, phase 7 will pause and list the specific FERs that need to be removed before the script can continue.

### Back up your Metric Rules

The migration permanently deletes 4 AWSO [Metric Rules](/docs/metrics/metric-rules-editor/). Record them before running the script by going to **Manage Data > Metrics > Metric Rules**. They will be recreated automatically by v3.0.0 during deployment, but having a record is useful if you need to verify them afterward.

## Running the migration

Download the migration script and make it executable:

```bash
curl -O https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master-v3x/cloudformation-sumologic-aws-observability/scripts/MigrateToV300.sh
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
| `-n NEW_STACK_NAME` | Name for the new v3.0.0 stack. **Required when using `--resume`.** | Same as `-s` |
| `-v VERSION` | Source version override: `2.12`, `2.13`, `2.14`, `2.15` | Auto-detected |
| `--install-apps` | Install Sumo Logic observability apps: `Yes` or `No` | `Yes` |
| `-p AWS_PROFILE` | AWS CLI named profile | `default` |
| `--dry-run` | Preview the mapped parameters without making any changes | Off |
| `--resume` | Skip phases 2–5; automatically run Phase 6 if the old stack still needs deletion; resume from Phase 7 using a saved params file | Off |
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

  S3 Buckets (read from Sumo source configs):
    ALB bucket:        aws-observability-logs-4bc184f0
    CloudTrail bucket: aws-observability-logs-4bc184f0
    ELB bucket:        aws-observability-logs-4bc184f0

  The following PERMANENT changes will be made:
    1. UPDATE stack to set RemoveOnDeleteStack=false
    2. DELETE stack my-awso-production
    3. RENAME AWSO Field Extraction Rules
    4. DELETE 4 AWSO Metric Rules

Proceed with migration? Type 'yes' to continue:
```

:::warning
The S3 bucket names shown above come from your **Sumo Logic source configurations**, not from the AWS CloudFormation stack. If your Sumo sources reference a stale or incorrect bucket, v3.0.0 will be deployed with the wrong bucket names and no log data will be ingested.

Before typing `yes`, verify the bucket names match your actual S3 buckets:
```bash
aws s3 ls s3://<bucket-shown-above> --region <your-region>
```

If there is a mismatch, the script will warn you. Investigate before proceeding.
:::

The script also cross-checks the collector ID found in Sumo Logic against the `SumoLogicHostedCollector` resource recorded in your CF stack. If they differ — which can happen if the wrong credentials were provided or the collector was recreated outside CloudFormation — the script will display both IDs and offer three options:
1. **Use the Sumo API collector** — proceed with the name-matched collector.
2. **Enter the correct collector ID manually** — for cases where you know the exact collector ID to use.
3. **Abort** — stop the migration for manual investigation.

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

## Post-migration verifications (Phase 10)

After deploying v3.0.0, the script automatically checks the following. Warnings from this phase are advisory — they do not stop the migration, but you should review and act on any that apply.

| Check | What is verified |
|:--|:--|
| Stack resources | All CloudFormation resources reached `CREATE_COMPLETE`. |
| Sumo collector and sources | The AWSO collector is found and all sources are alive. |
| S3 bucket policies | Each log bucket has the required service principals (`cloudtrail.amazonaws.com` for the CloudTrail bucket; `delivery.logs.amazonaws.com` for ALB/ELB buckets). A missing policy silently blocks log delivery. |
| CloudTrail trails | At least one trail writing to your CloudTrail bucket is active and `IsLogging=true`. The v2.x `Aws-Observability-*` trail is deleted with the old stack and is not recreated by v3.0.0 unless it also creates a new bucket. |
| S3 bucket notifications | The SNS topic configured on your log bucket exists and has not been deleted. A stale or deleted topic means S3 sources stop receiving new object events. |

## Dry run (preview only)

To preview the mapped parameters without making any changes, add `--dry-run`:

```bash
./MigrateToV300.sh \
  -d us2 -i <access_id> -k <access_key> -o <org_id> \
  -s my-awso-production -r us-east-1 \
  --dry-run
```

The script runs phases 1 to 3, prints the mapped v3.0.0 parameters, and exits without modifying anything.

## Log and params files

Every run writes two files to the directory where the script is executed:

| File | Purpose |
|:--|:--|
| `./migration_<stack>_<YYYYMMDD_HHMMSS>.log` | Full plain-text log of the run. Keep this file in case you need to contact Sumo Logic support. |
| `./migration_params_<stack>_<YYYYMMDD_HHMMSS>.json` | v3.0.0 CloudFormation parameters captured in phase 3. Used automatically if you need to resume. |

## If phase 6 times out

If the script exits with a timeout message during phase 6 (Delete), stack deletion is still in progress in AWS. Once deletion finishes, **re-run the exact same command you used originally** — no extra flags needed:

```bash
./MigrateToV300.sh -d us2 -i <...> -s my-awso-production -r us-east-1 -n my-awso-production-v300 ...
```

The script detects that the stack is already deleted, locates the params file saved during phase 3, and automatically continues from phase 7 (FER cleanup + deploy). If more than one params file exists for the same stack name, you will be prompted to choose which one to use.

## If the v3.0.0 deployment fails

If phase 9 (Deploy) fails and the stack ends up in `ROLLBACK_COMPLETE`, the v2.x stack has already been deleted, and a fresh full migration is not possible. Use resume mode to retry the deployment without re-deleting.

**Step 1**: Delete the failed stack:

```bash
aws cloudformation delete-stack --stack-name <v300_stack_name> --region <region>
aws cloudformation wait stack-delete-complete --stack-name <v300_stack_name> --region <region>
```

**Step 2**: Resume using the params file saved during phase 3. The script prints its exact path in the log:

```bash
./MigrateToV300.sh \
  -d us2 -i <access_id> -k <access_key> -o <org_id> \
  -s <v2x_stack_name> \
  -r <region> -n <v300_stack_name> \
  --resume --params-file ./migration_params_<v300_stack_name>_<timestamp>.json
```

:::tip
Include `-s <v2x_stack_name>` with `--resume` if the old stack may still exist or be in a failed state. The script automatically detects the old stack's status and handles it:
- **Already deleted**: Skips Phase 6, checks for orphaned nested stacks.
- **DELETE_FAILED**: Retains the blocked resources and deletes everything else, then cleans up nested stacks.
- **Still exists**: Runs the full Phase 6 deletion before continuing.
:::

The resume mode skips phases 2 to 5. If `-s` is provided and the old stack still needs deletion, Phase 6 runs automatically. Then the script executes:
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

| Error or warning | Cause | Resolution |
|:--|:--|:--|
| `aws CLI not found in PATH` | AWS CLI not installed or not accessible from the shell | Install the AWS CLI and verify with `aws --version`. |
| `AWS credentials invalid` | AWS session has expired | Re-authenticate using `aws sso login` or export new session tokens. |
| `Sumo Logic credentials invalid (HTTP 401)` | Incorrect access ID or key | Verify the `-i` and `-k` values. |
| `Stack not found` | Wrong stack name or region — or stack was already deleted by a previous run | Verify `-s` and `-r` match your AWS Console. If the stack was already deleted by a previous run, re-run the same command and the script will auto-resume from phase 7. |
| `Stack update ended with status: TIMEOUT` | Phase 5 update timed out on a large stack with many nested stacks | Re-run the script. If the update is already complete, phase 5 will be skipped automatically. |
| `ROLLBACK_COMPLETE` on v3.0.0 deploy | Template or parameter error during deployment | Delete the rolled-back stack and follow the [resume steps](#if-the-v300-deployment-fails). |
| `Failed to rename FER — already exists` | A previous partial run already renamed some FERs | Use `--resume`. The script detects already-renamed FERs and skips them. |
| Sources show `<empty>` bucket in report | Expected in resume mode — buckets are not re-captured | Does not affect the migration. The params file already has the correct bucket values. |
| `[WARN] Bucket name mismatch` | Sumo source config references a different bucket than the CF stack parameter | Investigate before proceeding — wrong bucket name means no data ingested after migration. Check your Sumo source configuration and your S3 bucket names in the AWS Console. |
| `[WARN] Collector ID mismatch` | The collector found via Sumo API does not match the one recorded in the CF stack | Verify you are using the correct Sumo Logic credentials for this stack. The script will prompt you to confirm before continuing. |
| `[WARN] policy missing cloudtrail.amazonaws.com` | S3 bucket policy does not grant CloudTrail write access | Check the bucket policy with `aws s3api get-bucket-policy --bucket <bucket> --region <region> --query Policy --output text \| jq .` and add a statement granting `s3:PutObject` to `cloudtrail.amazonaws.com`. |
| `[WARN] policy missing delivery.logs.amazonaws.com` | S3 bucket policy does not grant ALB/ELB log delivery access | Add a statement granting `s3:PutObject` to `delivery.logs.amazonaws.com` in the bucket policy. |
| `[WARN] No active CloudTrail trail found` | The v2.x `Aws-Observability-*` trail was deleted with the old stack and no replacement exists | Create a new trail: `aws cloudtrail create-trail --name <name> --s3-bucket-name <bucket> --region <region>` then `aws cloudtrail start-logging --name <name> --region <region>`. |
| `Stack DELETE_FAILED — BucketNotEmpty` | Phase 6 stack deletion failed because the `CommonS3Bucket` resource is not empty. The script automatically retries using `--retain-resources` — it retains only the blocked resources (the S3 bucket), deletes everything else including nested stacks, and continues the migration. | Automatic recovery — the script handles this without intervention. If the old stack or nested stacks remain after a previous interrupted run, re-run with `--resume -s <old_stack_name>` to clean them up. |
| `[WARN] SNS topic deleted or inaccessible` | The SNS topic wiring your S3 bucket to the Sumo source was deleted with the v2.x stack | Recreate the SNS topic, set its resource policy to allow S3 to publish to it, subscribe the Sumo source endpoint URL, and update the bucket notification configuration to point at the new topic ARN. The source endpoint URL is visible in **Manage Data > Collection > your source > Show URL**. |
