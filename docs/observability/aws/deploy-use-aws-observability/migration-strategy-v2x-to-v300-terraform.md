---
id: migration-strategy-v2x-to-v300-terraform
title: Manually Migrate AWS Observability from v2.x to v3.0.0 using Terraform
sidebar_label: Manually Migrate v2.x to v3.0.0 (Terraform)
description: Step-by-step guide to manually migrate your AWS Observability Terraform deployment from v2.x to v3.0.0.
---

This documentation walks you through manually migrating an existing [AWS Observability Terraform](/docs/observability/aws/deploy-use-aws-observability/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0. This guide covers single-region, single-account deployments. If you have a multi-region or multi-account setup (multiple `module.collection-module` blocks with different provider aliases), apply the collection-module steps to each instance.

:::note
The migration preserves all AWS infrastructure — your S3 buckets, IAM role, SNS topics, Sumo Logic collector, and all sources remain intact with no data gap. Only the Sumo Logic app layer is replaced.
:::

:::warning
**Back up your Terraform state before starting.** Some steps in this guide make irreversible changes to Terraform state. If something goes wrong after Step 4, restoring requires manually re-importing resources.
:::

## Prerequisites

Before starting, ensure you have:

- **Terraform >= 1.5.7** installed. Run `terraform version` to verify. If you are on v2.12 which supports Terraform >= 0.13.0, upgrade your Terraform binary first.
- **AWS CLI** configured with credentials that have permissions for IAM, S3, SNS, Lambda, CloudFormation, Kinesis, CloudTrail, and CloudWatch.
- **Sumo Logic Access ID and Access Key** with the Administrator role. For more information, see [Access Keys](/docs/manage/security/access-keys/).
- The **v3.0.0 Terraform module source** (`terraform-sumologic-aws-observability`) checked out locally.

## Step 1: Verify zero drift

Before making any changes, confirm your v2.x deployment is in sync with Terraform state. Any existing drift must be resolved before migrating.

```bash
eval $(aws configure export-credentials --format env)
terraform plan
```

The plan must show **no changes** before you proceed. If changes are shown, apply them first to bring the deployment in sync.

Also record your `random_string` value — this drives your S3 bucket name and all resource naming. If it ever changes, the entire infrastructure cascades.

```bash
terraform state show module.collection-module.random_string.aws_random | grep result
```

Note this value. The migration must not change it.

## Step 2: Back up your Terraform state

```bash
TIMESTAMP=$(date +%Y%m%d%H%M%S)
terraform state pull > backup-v2x-${TIMESTAMP}.tfstate
terraform state list > state-list-v2x-${TIMESTAMP}.txt
```

Store these files outside the working directory. To roll back at any point before Step 8 (apply):

```bash
terraform state push backup-v2x-${TIMESTAMP}.tfstate
# Then restore v2.x code files from git
```

## Step 3: Rename and disable v2.x Field Extraction Rules

v3.0.0 apps install their own Field Extraction Rules using the original `AwsObservability*` names. If those names are already taken in your Sumo Logic org when the v3.0.0 apps install, the deployment fails with a conflict error.

To avoid this, rename the v2.x FERs to a backup prefix and disable them — entirely through Terraform, with no external tooling required.

From your working directory, run:

```bash
# Rename all 17 FERs: AwsObservability* → v2x_backup_AwsObservability*
sed -i '' 's/name = "AwsObservability/name = "v2x_backup_AwsObservability/g' field.tf

# Disable all 17 FERs
sed -i '' 's/enabled = true/enabled = false/g' field.tf
```

:::note
On Linux, omit the empty string after `-i`: use `sed -i 's/...' field.tf`.
:::

Verify the changes look correct before applying:

```bash
grep -E 'name = "v2x_backup|enabled = false' field.tf
# Should show 17 renamed names and 17 disabled lines
```

Apply the changes. Terraform calls the Sumo Logic API to rename and disable all 17 FERs:

```bash
terraform apply -auto-approve
# Expected: 17 resources updated in-place
```

Remove the FERs from Terraform state. They remain in Sumo Logic as disabled backups under the `v2x_backup_*` names:

```bash
terraform state list | grep '^sumologic_field_extraction_rule\.' | xargs -I{} terraform state rm '{}'
```

Finally, strip the FER resource blocks from `field.tf`. After state removal, those blocks still exist in the file. If left in, Terraform would attempt to create 17 new `v2x_backup_*` FERs on the next apply.

```bash
sed -i '' '/^resource "sumologic_field_extraction_rule"/,$d' field.tf
```

:::note
On Linux, omit the empty string after `-i`: use `sed -i '/^resource.../,$d' field.tf`.
:::

Verify that `field.tf` now contains only `sumologic_field` and `time_sleep` resource blocks:

```bash
grep '^resource' field.tf
# Must show only: resource "time_sleep" and resource "sumologic_field" lines
```

## Step 4: Remove v2.x-only resources from state

Remove the resources that exist in v2.x but not in v3.0.0. These `state rm` commands make no API calls — resources remain in Sumo Logic untouched, Terraform simply stops tracking them.

```bash
# Remove root time_sleep (not present in v3.0.0 root module)
terraform state rm 'time_sleep.wait_for_10_seconds'

# Remove the entire app module — apps, monitors, folders, hierarchy, and metric rules
# This single command removes all resources nested inside module.sumo-module
terraform state rm 'module.sumo-module'
```

:::warning
Do **not** remove `sumologic_field.*` resources from state. v3.0.0 manages the same 19 fields at the same resource addresses as v2.x. Removing them causes Terraform to attempt creating them, which fails because the fields already exist in Sumo Logic.
:::

:::warning
Do **not** touch `module.collection-module`. All resource addresses inside this module are identical between v2.x and v3.0.0. The entire collection infrastructure — S3 bucket, IAM role, SNS topic, collector, and all sources — survives in-place.
:::

Verify your state contains only fields and collection resources:

```bash
terraform state list
# Expected:
# - sumologic_field.* (19 fields at root)
# - module.collection-module.* (all collection resources)
# Nothing else
```

:::note
After removing `module.sumo-module` from state, the v2.x **monitors** (typically 78 alert monitors) remain active in Sumo Logic. They will continue to fire alerts. After migration is complete, you can disable or delete them from **Manage Data > Monitoring > Monitors**. Look for monitors with names starting with `AWS`.
:::

:::note
The v2.x **app dashboards** (installed as `sumologic_content` folder-based apps) also remain in Sumo Logic. After migration, you will have two copies of each dashboard — the old folder-based ones from v2.x and the new catalog-installed apps from v3.0.0. Once you have confirmed the v3.0.0 apps are working, you can delete the old app folder from **Library > Personal > SumoLogic Amazon Observability Apps** (or wherever your v2.x apps were installed).
:::

## Step 5: Swap the Terraform code

Replace the v2.x root module files with v3.0.0 equivalents. Set `V300` to the path of your local v3.0.0 module checkout:

```bash
V300=<path-to-terraform-sumologic-aws-observability>

cp "$V300/main.tf"      ./main.tf
cp "$V300/versions.tf"  ./versions.tf
cp "$V300/variables.tf" ./variables.tf
cp "$V300/outputs.tf"   ./outputs.tf
cp "$V300/providers.tf" ./providers.tf
rm -rf ./modules
cp -r "$V300/modules"   ./modules

# v2.x used output.tf (singular); v3.0.0 uses outputs.tf (plural)
# Delete the old file to avoid duplicate output errors
rm -f ./output.tf
```

**Do not overwrite `field.tf`** — it was already updated in Step 3. Do not overwrite `main.auto.tfvars` — variable names are compatible and your existing values carry over.

**Update `providers.tf`** — the v3.0.0 `providers.tf` ships with a default `region = "us-west-2"`. If your deployment uses a different AWS region, edit `providers.tf` and set the correct region before continuing. If you use an aliased provider for multi-region, update the provider block accordingly.

One new optional variable is introduced in v3.0.0 (`sumologic_environment_base_url`) but it defaults to `null` and does not need to be set for standard deployments.

The old `app-modules/` and `source-module/` directories from v2.x can be left in place — they are no longer referenced by the new `main.tf` and are ignored by Terraform.

## Step 6: Initialize providers

```bash
terraform init -upgrade
```

This upgrades the Sumo Logic provider from `>= 2.31.3` to `>= 3.2.9` and switches the collection module source from the Terraform Registry to the v3.0.0 git reference. Both resolve the same underlying modules — this is expected.

## Step 7: Review the plan

```bash
eval $(aws configure export-credentials --format env)
terraform plan -out=tfplan.out
```

The expected plan shows resources to add (for new apps, Lambda auto-enable modules, and supporting resources), a small number of changes, and **11 resources to destroy**. The exact add count varies depending on which sources you have enabled — typically around 60–80.

The 11 destroys are expected and non-blocking:

| Resource | Reason | Impact |
|:--|:--|:--|
| 4 `aws_iam_policy` | v3.0.0 uses explicit policy names; v2.x used auto-generated names | Brief gap of a few seconds where the IAM role has no policies attached — Sumo Logic sources may show a short interruption |
| 4 `aws_iam_role_policy_attachment` | Cascade from policy name change | Same brief gap |
| 3 `aws_serverlessapplicationrepository_cloudformation_stack` | v2.x SAM-based auto-enable replaced by native Lambda modules | Auto-enable paused until new Lambda functions are created during apply (~1–2 minutes) |

**Abort the migration if the plan shows any of the following:**

| What to check | Expected result |
|:--|:--|
| `random_string.aws_random` | Must not appear in the plan at all |
| `aws_s3_bucket` | Must not show destroy or replace |
| `sumologic_collector` | Must not show destroy or replace |
| Any `sumologic_*_source` resource | Must not show destroy or replace |

If any of the above show as destroyed or replaced, do not proceed. Restore your state backup from Step 2 and investigate before retrying.

## Step 8: Apply

Review the full plan output, then apply:

```bash
terraform apply tfplan.out
```

:::note
AWS SSO sessions can expire during a long apply. If the apply fails mid-run with a credentials error, re-authenticate and retry — Terraform apply is safe to retry because resources already created are detected from state on the next run:
```bash
eval $(aws configure export-credentials --format env)
terraform apply -auto-approve
```
:::

## Step 9: Verify the migration

**Confirm no pending changes:**

```bash
eval $(aws configure export-credentials --format env)
terraform plan
# Must show: No changes. Infrastructure is up-to-date.
```

**Confirm sources are collecting in Sumo Logic:**

1. Go to **Manage Data > Collection > Collection**.
2. Find your AWSO collector and confirm all sources show a recent **Last Message Received** timestamp. Some sources may take a few minutes to resume after the IAM policy rename window.

**Confirm v3.0.0 apps are installed:**

1. Go to **App Catalog > Installed Apps**.
2. Confirm all AWSO v3.0.0 catalog apps are present.

**Verify S3 bucket policy** — confirm the log bucket grants the required service principals. Run this for each bucket used by your deployment:

```bash
aws s3api get-bucket-policy \
  --bucket <your-bucket-name> \
  --region <your-region> \
  --query Policy --output text | python3 -m json.tool
```

The policy must include all three of the following principals:
- `cloudtrail.amazonaws.com`
- `delivery.logs.amazonaws.com`
- `logdelivery.elasticloadbalancing.amazonaws.com`

**Verify CloudTrail is active:**

```bash
aws cloudtrail get-trail-status \
  --name <your-trail-name> \
  --region <your-region> \
  --query "{IsLogging:IsLogging,LatestDeliveryError:LatestDeliveryError}"
# IsLogging must be true, LatestDeliveryError must be null
```

## Step 10: Clean up disabled FERs

The 17 `v2x_backup_*` FERs are still present in your Sumo Logic org — disabled and not processing any logs, but they count against your FER quota. Once you have confirmed that v3.0.0 apps and their FERs are working correctly, delete them:

1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Find all rules with names starting with `v2x_backup_AwsObservability`.
3. Delete each one.

## Troubleshooting

| Issue | Cause | Resolution |
|:--|:--|:--|
| `field:already_exists` during apply | `sumologic_field.*` resources were removed from state | Import each field back: `terraform import sumologic_field.<name> <field-id>`, then retry apply. |
| `fer:conflict` or FER name conflict during app install | FERs were not renamed before the code swap | Rename them manually in **Manage Data > Logs > Field Extraction Rules** using the `v2x_backup_` prefix, then retry apply. |
| `app_already_installed` on apply retry | A previous partial apply created some apps in Sumo Logic but crashed before saving state | Import the orphaned app: `terraform import 'module.app-module.sumologic_app.apps["<App Name>"]' <instance-id>`, then retry apply. Get the instance ID from **App Catalog > Installed Apps** or via the Sumo Logic API. |
| `hierarchy:duplicate` on apply retry | Hierarchy was created in Sumo Logic but not saved to state | Import it: `terraform import module.app-module.sumologic_hierarchy.awso_hierarchy <hierarchy-id>`, then retry apply. |
| Credentials error during apply | AWS SSO session expired mid-apply | Run `eval $(aws configure export-credentials --format env)` and retry `terraform apply -auto-approve`. |
| Sources not showing data after migration | IAM policy rename caused a brief gap, or auto-enable Lambda functions are still initializing | Wait 5–10 minutes. Check **Manage Data > Collection** for source status. |
| `random_string` shows as changed in plan | State or provider schema mismatch | Abort immediately. Restore your state backup from Step 2 and investigate before retrying. Do not apply. |
| CloudWatch log groups not auto-subscribed after migration | The `SumoLogGroupLambdaConnector` Lambda only subscribes log groups matching its filter pattern (`apigateway\|lambda\|rds` by default) | Log groups that do not match the pattern are silently ignored. Check the `LOG_GROUP_PATTERN` environment variable on the Lambda and ensure your log group names match. |
