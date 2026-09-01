---
id: migration-strategy-v2x-to-v300-cloudformation
title: Migrate AWS Observability from v2.x to v3.0.0 using CloudFormation
sidebar_label: Automate
description: Learn how to migrate your existing AWS Observability CloudFormation stack or StackSet from v2.x to v3.0.0 using the provided migration scripts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation walks you through migrating an existing [AWS Observability CloudFormation](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-aws-cloudformation/) deployment from v2.x to v3.0.0.
:::danger
Migration script supports only active versions listed [here](/docs/observability/aws/deploy-use-aws-observability/changelog/#awso-lifecycle)
:::

Two migration scripts are available depending on your deployment type:

| Deployment type | Script                                                                                         |
|:--|:-----------------------------------------------------------------------------------------------|
| Single CloudFormation stack (one account, one region) | `MigrateAWSOStackToV300.sh` — [covered here](#single-stack-migrationsingle-account-and-region) |
| CloudFormation StackSet (multiple accounts and/or regions, including AWS Control Tower deployments) | `MigrateAWSOStackSetToV300.sh` — [covered here](#stackset-migrationmulti-regions-and-accounts) |

Both scripts automate the entire migration process and pause at key points for your approval before making any destructive changes.

:::note
This guide is for CloudFormation-based deployments only. If you deployed using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/migration-strategy-using-terraform/). If you prefer to migrate manually without the script, see [Manually Migrate AWS Observability from v2.x to v3.0.0](/docs/observability/aws/deploy-use-aws-observability/migration/cloudformation/migration-strategy-v2x-to-v300-manual/).
:::

---

## Single-stack migration—single account and region

Use this script [MigrateAWSOStackToV300.sh](https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/refs/heads/master-v3x/cloudformation-sumologic-aws-observability/scripts/MigrateAWSOStackToV300.sh) when AWSO was deployed via a CloudFormation Stack 


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

### Phase Overview

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


### Prerequisites

Before running the migration, ensure the following are in place.

#### Tools

| Tool | How to install |
|:--|:--|
| `bash` | Pre-installed on macOS and Linux |
| `aws` CLI v2 | [AWS CLI installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| `jq` | `brew install jq` (macOS) or `apt install jq` (Linux) |
| `curl` | Pre-installed on macOS and Linux |

#### AWS permissions

Your AWS credentials must have permissions to:
- Read and update CloudFormation stacks (`cloudformation:DescribeStacks`, `cloudformation:UpdateStack`, `cloudformation:DeleteStack`, `cloudformation:CreateStack`).
- Read S3 bucket metadata (`s3:HeadBucket`, `s3api:GetBucketPolicy`, `s3api:GetBucketNotificationConfiguration`).
- Read IAM roles (`iam:GetRole`).
- Read CloudTrail trails (`cloudtrail:DescribeTrails`, `cloudtrail:GetTrailStatus`).
- Read SNS topic attributes (`sns:GetTopicAttributes`).

#### Sumo Logic credentials

You will need a Sumo Logic **Access ID** and **Access Key** with the Administrator role. To generate them, go to **Administration > Security > Access Keys**. For more information, see [Access Keys](/docs/manage/security/access-keys/).

You will also need your **Sumo Logic Org ID**, found at **Administration > Account > Org ID**.

#### Back up your Field Extraction Rules

Before running the migration, export a backup of your [Field Extraction Rules](/docs/manage/field-extractions/) from **Manage Data > Logs > Field Extraction Rules**. The script renames them rather than deleting them, but it is good practice to have a backup.

#### Verify FER quota

Phase 7 renames your existing AWSO Field Extraction Rules and v3.0.0 then creates 17 new ones. You need at least **17 free slots** in your FER quota before running the migration.

To check your current usage, go to **Manage Data > Logs > Field Extraction Rules** and review the quota indicator at the top of the page. If fewer than 17 slots are free, delete or consolidate unused Field Extraction Rules until sufficient quota is available.

If you run the migration without enough quota, phase 7 will pause and list the specific FERs that need to be removed before the script can continue.

#### Back up your Metric Rules

The migration permanently deletes 4 AWSO [Metric Rules](/docs/metrics/metric-rules-editor/). Record them before running the script by going to **Manage Data > Metrics > Metric Rules**. They will be recreated automatically by v3.0.0 during deployment, but having a record is useful if you need to verify them afterward.

### Running the migration

Download the migration script and make it executable:

```bash
curl -O https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master-v3x/cloudformation-sumologic-aws-observability/scripts/MigrateAWSOStackToV300.sh
chmod +x MigrateAWSOStackToV300.sh
```

**Run the migration**

```bash
./MigrateAWSOStackToV300.sh \
  -d <deployment> \
  -i <access_id> \
  -o <org_id> \
  -s <v2x_stack_name> \
  -r <aws_region> \
  -n <v300_stack_name> \
  --install-apps Yes
```

The script will prompt you interactively for your access key (input is hidden and not saved to shell history).

**Example**

```bash
./MigrateAWSOStackToV300.sh \
  -d us2 \
  -i <your_access_id> \
  -o <your_org_id> \
  -s my-awso-production \
  -r us-east-1 \
  -n my-awso-production-v300 \
  --install-apps Yes
```

#### Script parameters

**Required**

| Flag | Description | Example |
|:--|:--|:--|
| `-d DEPLOYMENT` | Your Sumo Logic deployment | `us1`, `us2`, `kr`, `eu`, `de`, `au`, `jp`, `ca`, `ch`, `fed`, `esc` |
| `-i ACCESS_ID` | Sumo Logic access ID | `suXXXXXXXXXXXX` |
| `-o ORG_ID` | Sumo Logic org ID | `00000000XXXXXXXX` |
| `-s STACK_NAME` | Name of your existing v2.x CloudFormation stack | `my-awso-production` |
| `-r REGION` | AWS region where the stack is deployed | `us-east-1` |

**Optional**

| Flag | Description | Default |
|:--|:--|:--|
| `-k ACCESS_KEY` | Sumo Logic access key | **Prompted interactively** (hidden input) if omitted |
| `-n NEW_STACK_NAME` | Name for the new v3.0.0 stack. **Required when using `--resume`.** | Same as `-s` |
| `-v VERSION` | Source version override: `2.12`, `2.13`, `2.14`, `2.15` | Auto-detected |
| `--install-apps` | Install Sumo Logic observability apps: `Yes` or `No` | `Yes` |
| `-p AWS_PROFILE` | AWS CLI named profile | `default` |
| `--dry-run` | Preview the mapped parameters without making any changes | Off |
| `--resume` | Skip phases 2–5; automatically run Phase 6 if the old stack still needs deletion; resume from Phase 7 using a saved params file | Off |
| `--params-file FILE` | Path to the saved params JSON file to use with `--resume` | — |
| `--patch-roles-only` | Run only validate, role patching (phase 11), and report — use when sources need their IAM role ARN updated without re-running the full migration | Off |

### Confirmation screens

The script pauses twice and asks for your approval before making any changes.

#### Phase 4: migration summary

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

#### Phase 9: Deployment parameters

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

### Post-migration verifications (Phase 10)

After deploying v3.0.0, the script automatically checks the following. Warnings from this phase are advisory — they do not stop the migration, but you should review and act on any that apply.

| Check | What is verified |
|:--|:--|
| Stack resources | All CloudFormation resources reached `CREATE_COMPLETE`. |
| Sumo collector and sources | The AWSO collector is found and all sources are alive. |
| S3 bucket policies | Each log bucket has the required service principals (`cloudtrail.amazonaws.com` for the CloudTrail bucket; `delivery.logs.amazonaws.com` for ALB/ELB buckets). A missing policy silently blocks log delivery. |
| CloudTrail trails | At least one trail writing to your CloudTrail bucket is active and `IsLogging=true`. The v2.x `Aws-Observability-*` trail is deleted with the old stack and is not recreated by v3.0.0 unless it also creates a new bucket. |
| S3 bucket notifications | The SNS topic configured on your log bucket exists and has not been deleted. A stale or deleted topic means S3 sources stop receiving new object events. |

### Dry run (preview only)

To preview the mapped parameters without making any changes, add `--dry-run`:

```bash
./MigrateAWSOStackToV300.sh \
  -d us2 -i <access_id> -o <org_id> \
  -s my-awso-production -r us-east-1 \
  --dry-run
```

The script runs phases 1 to 3, prints the mapped v3.0.0 parameters, and exits without modifying anything.

### Log and params files

Every run writes two files to the directory where the script is executed:

| File | Purpose |
|:--|:--|
| `./migration_<stack>_<YYYYMMDD_HHMMSS>.log` | Full plain-text log of the run. Keep this file in case you need to contact Sumo Logic support. |
| `./migration_params_<stack>_<YYYYMMDD_HHMMSS>.json` | v3.0.0 CloudFormation parameters captured in phase 3. Used automatically if you need to resume. |

### If phase 6 times out

If the script exits with a timeout message during phase 6 (Delete), stack deletion is still in progress in AWS. Once deletion finishes, **re-run the exact same command you used originally** — no extra flags needed:

```bash
./MigrateAWSOStackToV300.sh -d us2 -i <...> -s my-awso-production -r us-east-1 -n my-awso-production-v300 ...
```

The script detects that the stack is already deleted, locates the params file saved during phase 3, and automatically continues from phase 7 (FER cleanup + deploy). If more than one params file exists for the same stack name, you will be prompted to choose which one to use.

### If the v3.0.0 deployment fails

If phase 9 (Deploy) fails and the stack ends up in `ROLLBACK_COMPLETE`, the v2.x stack has already been deleted, and a fresh full migration is not possible. Use resume mode to retry the deployment without re-deleting.

**Step 1**: Delete the failed stack:

```bash
aws cloudformation delete-stack --stack-name <v300_stack_name> --region <region>
aws cloudformation wait stack-delete-complete --stack-name <v300_stack_name> --region <region>
```

**Step 2**: Resume using the params file saved during phase 3. The script prints its exact path in the log:

```bash
./MigrateAWSOStackToV300.sh \
  -d us2 -i <access_id> -o <org_id> \
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

### Patching IAM role ARNs after migration

If v3.0.0 is already deployed but your Sumo Logic sources are showing errors because they still reference the old IAM role ARN (for example, if the script was interrupted before phase 11), you can run role patching on its own:

```bash
./MigrateAWSOStackToV300.sh \
  -d us2 -i <access_id> -o <org_id> \
  -r <region> -n <v300_stack_name> \
  --patch-roles-only
```

The script runs the following phases without touching the stack or any Sumo Logic configuration:
Validate > Patch Roles > Report

### Troubleshooting

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

---

## StackSet migration—Multi Regions and Accounts

Use this script [`MigrateAWSOStackSetToV300.sh`](https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/refs/heads/master-v3x/cloudformation-sumologic-aws-observability/scripts/MigrateAWSOStackSetToV300.sh) when AWSO was deployed via a CloudFormation StackSet — typically through AWS Control Tower or manual StackSet management — spanning multiple AWS accounts and/or regions.

:::note
Multi-region and multi-account migrations can take a significant amount of time, so it would be better to set up a pipeline to automate the process.
:::

:::danger
The solution recommends deploying across **regions or accounts sequentially** rather than in parallel. Parallel deployments may exceed the Sumo Logic API rate limit, potentially resulting in API rate-limiting errors.
:::

The script:
- Enumerates every stack instance (account × region) from the StackSet automatically
- Lets you optionally select a subset of instances to migrate
- Captures per-region S3 bucket names and account aliases from each deployed stack
- Runs FER and Metric Rule cleanup once at the Sumo Logic org level (not once per account)
- Updates the StackSet in-place (no delete and recreate) then creates new v3.0.0 stack instances one per account/region with the correct per-region overrides
- Patches Sumo Logic source IAM role ARNs by assuming the execution role in each member account

### What stays the same

- Your Sumo Logic collectors (same names and IDs — one per account)
- All Sumo Logic sources (reused by name — same IDs, no data gap)
- Your S3 log buckets and all existing log data
- The StackSet itself (updated in-place, not recreated)

### What changes

- All v2.x stack instances are deleted and replaced by new v3.0.0 stack instances.
- AWSO [Field Extraction Rules](/docs/manage/field-extractions/) are renamed to `v215_backup_<name>` and disabled (not deleted).
- Four AWSO [Metric Rules](/docs/metrics/metric-rules-editor/) are deleted and recreated by v3.0.0.
- Source IAM role ARNs in Sumo Logic are updated to the new v3.0.0 roles.

### Phase overview

| Phase | Action |
|:--|:--|
| 1. Validate | Checks AWS and Sumo Logic credentials, confirms the StackSet exists, and verifies no operation is currently running. |
| 2. Enumerate | Lists all stack instances (account × region); presents an interactive selection prompt; resolves account aliases and captures per-region S3 bucket names from deployed stacks. |
| 3. Map Parameters | Transforms v2.x StackSet base parameters to v3.0.0 format. |
| 4. Confirm | Displays all accounts, regions, aliases, bucket names, and mapped parameters — **no changes are made until you approve**. |
| 5. Protect | Sets `RemoveOnDeleteStack=false` on all instances (per account) so Sumo Logic resources survive stack deletion. |
| 6. Delete Instances | Deletes all v2.x stack instances with automatic FAILED and CANCELLED recovery. |
| 8. FER Cleanup | Renames and disables 17 AWSO [Field Extraction Rules](/docs/manage/field-extractions/) (org-level, runs once). |
| 9. Metric Rules | Deletes four AWSO [Metric Rules](/docs/metrics/metric-rules-editor/) that conflict with v3.0.0 (org-level, runs once). |
| 10. Update StackSet | Updates the StackSet definition in-place with the v3.0.0 template and mapped base parameters. |
| 11. Create Instances | Creates one v3.0.0 stack instance per (account, region) with the correct alias and bucket overrides. |
| 12. Verify | Confirms all stack instances reached `CURRENT` or `SUCCEEDED` status. |
| 13. Patch Roles | Assumes the execution role in each member account and updates Sumo Logic source IAM role ARNs to reference the new v3.0.0 roles. |
| 14. Report | Prints a summary of accounts, regions, FERs renamed, and sources patched. Saves a full log file. |

Expected duration: **1 to 3 hours** depending on the number of accounts and regions. Phase 5, 6, and 11 each involve async StackSet operations that poll until completion.

### Prerequisites

#### Tools

| Tool | How to install |
|:--|:--|
| `bash` 4+ | Pre-installed on Linux; on macOS install via `brew install bash` (built-in bash 3.2 has `read -a` differences) |
| `aws` CLI v2 | [AWS CLI installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| `jq` | `brew install jq` (macOS) or `apt install jq` (Linux) |
| `curl` | Pre-installed on macOS and Linux |

#### AWS permissions

Run the script from the **StackSet management account**. Your AWS credentials must have permissions to:
- `cloudformation:DescribeStackSet`, `cloudformation:ListStackInstances`, `cloudformation:UpdateStackSet`, `cloudformation:UpdateStackInstances`, `cloudformation:CreateStackInstances`, `cloudformation:DeleteStackInstances`
- `cloudformation:ListStackSetOperations`, `cloudformation:DescribeStackSetOperation`
- `sts:GetCallerIdentity`, `sts:AssumeRole` (to assume the execution role in each member account)

#### Execution role in member accounts

Each member account must have the StackSet execution role (for example, `AWSControlTowerExecution`) with a trust policy that allows the management account to assume it. This role is used to read stack parameters and patch Sumo Logic source role ARNs.

#### Sumo Logic credentials

You will need a Sumo Logic **Access ID** and **Access Key** with the Administrator role. To generate them, go to **Administration > Security > Access Keys**. For more information, see [Access Keys](/docs/manage/security/access-keys/).

You will also need your **Sumo Logic Org ID**, found at **Administration > Account > Org ID**.

#### Back up your Field Extraction Rules

Before running the migration, export a backup of your [Field Extraction Rules](/docs/manage/field-extractions/) from **Manage Data > Logs > Field Extraction Rules**. The script renames them rather than deleting them, but it is good practice to have a backup.

#### Verify FER quota

Phase 8 renames your existing AWSO Field Extraction Rules and v3.0.0 then creates 17 new ones. You need at least **17 free slots** in your FER quota before running the migration.

To check your current usage, go to **Manage Data > Logs > Field Extraction Rules** and review the quota indicator at the top of the page.

### Running the migration

Download the migration script and make it executable:

```bash
curl -O https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master-v3x/cloudformation-sumologic-aws-observability/scripts/MigrateAWSOStackSetToV300.sh
chmod +x MigrateAWSOStackSetToV300.sh
```

**Run the migration**

```bash
./MigrateAWSOStackSetToV300.sh \
  -d <deployment> \
  -i <access_id> \
  -o <org_id> \
  -r <home_region>
```

The script will prompt you interactively for your access key (input is hidden and not saved to shell history).

If your StackSet is not named `SUMO-LOGIC-AWS-OBSERVABILITY`, add `-s YOUR_STACKSET_NAME`.

**Example**

```bash
./MigrateAWSOStackSetToV300.sh \
  -d us2 \
  -i suXXXXXXXXXXXX \
  -o 00000000XXXXXXXX \
  -r us-east-1
```

#### Script parameters

##### Required

| Flag | Description | Example |
|:--|:--|:--|
| `-d DEPLOYMENT` | Your Sumo Logic deployment | `us1`, `us2`, `kr`, `eu`, `de`, `au`, `jp`, `ca`, `ch`, `fed` |
| `-i ACCESS_ID` | Sumo Logic access ID | `suXXXXXXXXXXXX` |
| `-o ORG_ID` | Sumo Logic org ID | `00000000XXXXXXXX` |
| `-r REGION` | AWS home region (where the StackSet is registered) | `us-east-1` |

##### Optional

| Flag | Description | Default |
|:--|:--|:--|
| `-k ACCESS_KEY` | Sumo Logic access key | **Prompted interactively** (hidden input) if omitted |
| `-s, --stackset-name NAME` | Name of the existing v2.x StackSet | `SUMO-LOGIC-AWS-OBSERVABILITY` |
| `--admin-role-arn ARN` | StackSet administration role ARN | Auto-detected from existing StackSet |
| `--execution-role NAME` | StackSet execution role name | Auto-detected from existing StackSet |
| `-p AWS_PROFILE` | AWS CLI named profile | `default` |
| `--install-apps YES/NO` | Install Sumo Logic observability apps in v3.0.0 | `No` |
| `--concurrency N` | `MaxConcurrentCount` for StackSet operations | `1` |
| `--failure-tolerance N` | `FailureToleranceCount` for StackSet operations | `0` |
| `--dry-run` | Enumerate and map parameters; exit without making any changes | Off |
| `--resume` | Resume from a saved state file | Off (auto-enabled if state file exists) |
| `--state-file PATH` | Path to the state JSON file | Auto-generated timestamped filename |
| `--from-phase PHASE` | Reset progress and re-run from this phase; implies `--resume` | — |
| `--patch-roles-only` | Skip directly to Phase 13 (patch IAM role ARNs); implies `--resume` | Off |

### Instance selection

At the start of Phase 2, after all instances are enumerated, the script asks:

```
  Migrate all instances or select specific ones? (all/select) [all]:
```

- **`all`** (or press Enter): all instances are migrated.
- **`select`**: the script presents a numbered table — one row per account/region — and you type `y` or `n` for each row.

If you select 0 instances, the script exits cleanly without making any changes.

On `--resume`, the selection is loaded from the saved state file and this prompt is skipped.

### Confirmation screen (Phase 4)

Before touching any infrastructure, the script displays a full summary:

```
  StackSet to migrate:
    Name:        SUMO-LOGIC-AWS-OBSERVABILITY
    Home Region: us-east-1

  Instances:
    Account         Region       Alias
    285573938264    us-east-1    prod
    285573938264    us-east-2    prod
    537124934508    us-east-1    staging

  Per-account/region bucket map:
    285573938264 / us-east-1  ALB: aws-observability-logs-abc123  CloudTrail: aws-observability-logs-abc123
    285573938264 / us-east-2  ALB: aws-observability-logs-def456  CloudTrail: aws-observability-logs-def456
    537124934508 / us-east-1  ALB: aws-observability-logs-ghi789  CloudTrail: aws-observability-logs-ghi789

  Mapped v3.0.0 base parameters:
    Section1aSumoLogicDeployment = us2
    Section3aInstallObservabilityApps = No
    ...

Proceed with migration? Type 'yes' to continue:
```

Type `yes` to proceed. Anything else aborts safely with no changes made. Confirmation is skipped when resuming.

### State file and resume support

Every run writes a state file that captures all phases completed, instance list, account aliases, per-region bucket names, and mapped parameters:

```
./awso_stackset_migration_<YYYYMMDD_HHMMSS>.json
```

If the script is interrupted (network timeout, AWS API error, manual Ctrl-C), re-run the **same command** and it will automatically resume from where it left off:

```bash
./MigrateAWSOStackSetToV300.sh \
  -d us2 -i <access_id> -o <org_id> -r us-east-1 \
  --state-file ./awso_stackset_migration_20260828_110000.json
```

:::tip
If you pass `--state-file` pointing to an existing file without `--resume`, the script automatically detects this and enables resume mode. You do not need to add `--resume` explicitly.
:::

**Re-run from a specific phase**

To force a phase to re-run (for example, after manually resolving a partial failure):

```bash
./MigrateAWSOStackSetToV300.sh \
  -d us2 -i <access_id> -o <org_id> -r us-east-1 \
  --state-file ./awso_stackset_migration_20260828_110000.json \
  --from-phase delete_instances
```

### Patching IAM role ARNs after migration

If Phase 13 was interrupted and some sources still reference the old IAM role ARN, run role patching on its own:

```bash
./MigrateAWSOStackSetToV300.sh \
  -d us2 -i <access_id> -o <org_id> -r us-east-1 \
  --state-file ./awso_stackset_migration_20260828_110000.json \
  --patch-roles-only
```

This runs Phase 13 and Phase 14 only, without touching any CloudFormation resources.

### Log and state files

| File | Purpose |
|:--|:--|
| `./awso_stackset_migration_<timestamp>.log` | Full plain-text log of the run (ANSI codes stripped). Keep this file if you need to contact Sumo Logic support. |
| `./awso_stackset_migration_<timestamp>.json` | State file: all phases completed, instances, aliases, bucket names, and mapped parameters. Used for resume. |

### Troubleshooting

| Error or warning | Cause | Resolution |
|:--|:--|:--|
| `StackSet not found` | Wrong StackSet name or home region | Verify `-s` (`--stackset-name`) and `-r` match the AWS Console. |
| `StackSet operation currently RUNNING` | Another operation is already in progress | Wait for the running operation to complete, then re-run the script. |
| `AWS credentials invalid` | AWS session has expired or wrong account | Re-authenticate and ensure you are running from the **management account** (the account that owns the StackSet). |
| `Sumo Logic credentials invalid (HTTP 401)` | Incorrect access ID or key | Verify the `-i` and `-k` values. |
| `Regions list cannot have duplicate entries` | Should not occur in current version — fixed by per-account region grouping | If seen, re-run with `--from-phase delete_instances` to retry the delete phase. |
| `StackSetNotEmptyException` on Phase 10 | Phase 6 (delete instances) did not complete — instances still exist | Resume from Phase 6: `--from-phase delete_instances`. |
| `[WARN] Retrying CANCELLED instances` | Some instances were not reached due to failure tolerance being exceeded | Automatic — the script retries cancelled instances per account. If it persists, increase `--failure-tolerance`. |
| `[WARN] Failed to patch '<source>' — HTTP 400` | A source was patched with a role ARN from the wrong region | Should not occur in current version — fixed by region-scoped source filtering. If seen, run `--patch-roles-only` to retry. |
| `[WARN] Collector ID mismatch` | The collector found via the Sumo API does not match the one recorded in the CF stack | The script prompts you to choose between the CF value, the API value, or a manual entry. Verify you are using the correct Sumo Logic credentials. |
| `[ERROR] Cannot assume execution role` | The execution role trust policy does not allow the management account to assume it | Verify the trust relationship on the execution role in the member account allows `sts:AssumeRole` from the management account. |
| `[WARN] FER quota too low` | Fewer than 17 free FER slots available | Delete or consolidate unused Field Extraction Rules until at least 17 slots are free, then re-run with `--from-phase fer_cleanup`. |
| `Failed to rename FER — already exists` | A previous partial run already renamed some FERs | Use `--resume` or `--from-phase fer_cleanup`. The script detects already-renamed FERs and skips them. |
| Phase 11 instance stuck in `FAILED` | Stack creation failed for an account/region | Check the CloudFormation events in that account/region. Resolve the issue and re-run with `--from-phase create_instances`. |
