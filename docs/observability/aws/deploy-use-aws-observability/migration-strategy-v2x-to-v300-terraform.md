---
id: migration-strategy-v2x-to-v300-terraform
title: Migrate AWS Observability from v2.x to v3.0.0 using Terraform
sidebar_label: Migrate v2.x to v3.0.0 (Terraform)
description: Step-by-step guide to migrate your AWS Observability Terraform deployment from v2.x to v3.0.0.
---

This guide walks you through migrating an existing [AWS Observability Terraform](/docs/observability/aws/deploy-use-aws-observability/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0.

The migration approach is:
1. Destroy the existing v2.x Terraform stack.
2. Deploy v3.0.0 fresh using the **same `aws_account_alias`** value.

Using the same `aws_account_alias` ensures the Sumo Logic collector retains the same naming convention and the Explorer hierarchy remains consistent.

:::note
During the migration window (between destroy and apply), log collection will be paused. Plan for a brief gap in data ingestion.
:::

## Prerequisites

- **Terraform >= 1.5.7** installed. Run `terraform version` to verify.
- **AWS CLI** configured with credentials that have permissions for IAM, S3, SNS, Lambda, CloudTrail, CloudWatch, and Kinesis.
- **Sumo Logic Access ID and Access Key** with the Administrator role. For more information, see [Access Keys](/docs/manage/security/access-keys/).
- Note down your current `aws_account_alias` value from `main.auto.tfvars` — you will reuse it in v3.0.0.

## Step 1: Destroy the existing v2.x stack

Navigate to your v2.x deployment directory and destroy all resources:

```bash
cd <v2.x-terraform-directory>
terraform destroy
```

Review the destroy plan and confirm. This removes all AWS infrastructure (S3 buckets, IAM roles, Lambda functions, SNS topics) and Sumo Logic resources (collector, sources, apps, monitors, FERs) created by v2.x.

After the destroy completes, you can optionally remove the state file:

```bash
rm -f terraform.tfstate terraform.tfstate.backup
```

## Step 2: Deploy v3.0.0

Choose one of the following installation methods:

### Option A: Install as a Terraform module (from registry)

Create a new working directory and configure the following files:

**`main.tf`**

```hcl
provider "aws" {
  region = "us-east-1"
}

module "aws_observability" {
  source                    = "SumoLogic/aws-observability/sumologic"
  version                   = "1.0.0"
  sumologic_environment     = "us1"
  sumologic_access_id       = "<YOUR SUMO ACCESS ID>"
  sumologic_access_key      = "<YOUR SUMO ACCESS KEY>"
  sumologic_organization_id = "<YOUR SUMO ORG ID>"
  aws_account_alias         = "<YOUR AWS ACCOUNT ALIAS>"
}
```

:::note
Replace `<YOUR AWS ACCOUNT ALIAS>` with the **same alias** used in your v2.x deployment to maintain consistency in Sumo Logic Explorer View, metrics, and logs.
:::

Deploy:

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

### Option B: Install from the repository

:::note
Starting with v3.0.0, the AWS Observability Terraform module has moved to a new repository:
- **Old (v2.x):** `github.com/SumoLogic/sumologic-solution-templates` (path: `aws-observability-terraform/`)
- **New (v3.0.0):** `github.com/SumoLogic/terraform-sumologic-aws-observability`
:::

Clone the new repository:

```bash
git clone https://github.com/SumoLogic/terraform-sumologic-aws-observability
cd terraform-sumologic-aws-observability
```

Initialize the Terraform working directory. This installs the required providers (Sumo Logic, AWS, Time, Random, Null):

```bash
terraform init
```

Configure required parameters in `main.auto.tfvars`:

```hcl
sumologic_environment     = "us1"
sumologic_access_id       = "<YOUR SUMO ACCESS ID>"
sumologic_access_key      = "<YOUR SUMO ACCESS KEY>"
sumologic_organization_id = "<YOUR SUMO ORG ID>"
aws_account_alias         = "<YOUR AWS ACCOUNT ALIAS>"
```

:::note
Replace `<YOUR AWS ACCOUNT ALIAS>` with the **same alias** used in your v2.x deployment.
:::

Configure the AWS region in `providers.tf`:

```hcl
provider "aws" {
  region = "us-east-1"
}
```

Deploy:

```bash
terraform validate
terraform plan
terraform apply
```

## Step 3: Verify the deployment

**Confirm no pending changes:**

```bash
terraform plan
# Must show: No changes. Infrastructure is up-to-date.
```

**Confirm sources are collecting in Sumo Logic:**

1. Go to **Manage Data > Collection > Collection**.
2. Find your AWS Observability collector and confirm all sources show a recent **Last Message Received** timestamp. Sources may take a few minutes to start receiving data after deployment.

**Confirm v3.0.0 apps are installed:**

1. Go to **App Catalog > Installed Apps**.
2. Confirm all AWS Observability v3.0.0 catalog apps are present.

## Troubleshooting

| Issue | Cause | Resolution |
|:--|:--|:--|
| Collector name conflict | A collector with the same name already exists (v2.x destroy did not complete) | Verify the v2.x destroy completed fully. If a partial collector remains, delete it manually from **Manage Data > Collection** and retry. |
| FER name conflict during app install | Old FERs with `AwsObservability*` names still exist | Delete the old FERs manually from **Manage Data > Logs > Field Extraction Rules** and retry apply. |
| Field already exists | Fields created by v2.x were not removed during destroy | Fields are global to the org and reusable. The v3.0.0 deployment will use the existing fields — no action needed if apply succeeds. |
| Credentials error during apply | AWS session expired during a long apply | Re-authenticate and retry: `terraform apply`. |
| Sources not showing data | IAM role or S3 bucket policies not yet propagated | Wait 5–10 minutes. The module includes a wait step for IAM propagation. |
