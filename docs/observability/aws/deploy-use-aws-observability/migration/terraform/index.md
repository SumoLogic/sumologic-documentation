---
id: migration-strategy-v2x-to-v300-terraform
title: Migrate AWS Observability from v2.x to v3.0.0 using Terraform
sidebar_label: Terraform
description: Step-by-step guide to migrate your AWS Observability Terraform deployment from v2.x to v3.0.0.
---

This guide walks you through migrating an existing [AWS Observability Terraform](/docs/observability/aws/deploy-use-aws-observability/) deployment from v2.x (v2.12, v2.13, v2.14, or v2.15) to v3.0.0.

The migration approach is:
1. Destroy all existing v2.x Terraform deployments.
2. Deploy v3.0.0 fresh using the **same `aws_account_alias`** value per account.

Using the same `aws_account_alias` ensures Sumo Logic collectors retain the same naming convention and the Explorer hierarchy remains consistent.

:::note
During the migration window (between destroy and apply), log collection will be paused. Plan for a brief gap in data ingestion.
:::

:::note
Starting with v3.0.0, the AWS Observability Terraform module has moved to a new repository:
- **Old (v2.x):** `github.com/SumoLogic/sumologic-solution-templates` (path: `aws-observability-terraform/`)
- **New (v3.0.0):** `github.com/SumoLogic/terraform-sumologic-aws-observability`
:::

## Prerequisites

- **Terraform >= 1.5.7** installed. Run `terraform version` to verify.
- **AWS CLI** configured with profiles for each AWS account. See [Configure AWS account profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).
- **Sumo Logic Access ID and Access Key** with the Administrator role. For more information, see [Access Keys](/docs/manage/security/access-keys/).
- Note down your current `aws_account_alias` value(s) from each v2.x deployment — you will reuse them in v3.0.0.

---

## Single account and region

## Step 1: Destroy the existing v2.x stack

Navigate to your v2.x deployment directory and destroy all resources:

```bash
cd <v2.x-terraform-directory>
terraform destroy
```

Review the destroy plan and confirm. This removes all AWS infrastructure (S3 buckets, IAM roles, Lambda functions, SNS topics) and Sumo Logic resources (collector, sources, apps, monitors, FERs, Fields) created by v2.x.

After the destroy completes, you can optionally remove the state file:

```bash
rm -f terraform.tfstate terraform.tfstate.backup
```

## Step 2: Deploy v3.0.0

Choose one of the following installation methods:

### Option A: Install as a Terraform module (from [registry](https://registry.terraform.io/modules/SumoLogic/aws-observability/sumologic/latest))

Create a new working directory and configure the following files:

**`main.tf`**

```hcl
provider "aws" {
  region = "us-east-1"
}

module "aws_observability" {
  source                    = "SumoLogic/aws-observability/sumologic"
  version                   = "3.0.0"
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

---

## Multiple regions within a single account

Use this approach when your v2.x deployment covered multiple regions within the same AWS account.

:::note
Destroy **all** v2.x regional deployments before deploying v3.0.0. Deploying v3.0.0 while any v2.x instance still exists can cause FER and Metric Rule name conflicts.
:::

### Step 1: Back up your existing configuration

Before destroying, save copies of your v2.x `providers.tf` and `main.tf`. These files contain the provider aliases and `module "collection-module-..."` blocks you will use as a reference when configuring v3.0.0.

```bash
cp providers.tf providers.tf.v2x.bak
cp main.tf main.tf.v2x.bak
```

### Step 2: Destroy all v2.x regional deployments

For each region's v2.x working directory, run:

```bash
cd <v2.x-region-directory>
terraform destroy
```

Repeat for every region. Confirm each destroy before moving to the next.

### Step 3: Set up a new v3.0.0 working directory

Choose one of the following installation methods:

**Option A: Install as a Terraform module (from [registry](https://registry.terraform.io/modules/SumoLogic/aws-observability/sumologic/latest))**

Create a new working directory:

```bash
mkdir v3-observability && cd v3-observability
```

**Option B: Install from the repository**

Clone the v3.0.0 repository:

```bash
git clone https://github.com/SumoLogic/terraform-sumologic-aws-observability
cd terraform-sumologic-aws-observability
```

Initialize Terraform:

```bash
terraform init
```

Configure your Sumo Logic credentials in `main.auto.tfvars`:

```hcl
sumologic_environment     = "us1"
sumologic_access_id       = "<YOUR SUMO ACCESS ID>"
sumologic_access_key      = "<YOUR SUMO ACCESS KEY>"
sumologic_organization_id = "<YOUR SUMO ORG ID>"
```

### Step 4: Configure providers.tf

Add a `provider "aws"` block for each region. Each requires a unique `alias`. Use your backed-up `providers.tf.v2x.bak` as a reference for the aliases and profiles that were in use.

```hcl title="providers.tf"
provider "sumologic" {
  access_id   = var.sumologic_access_id
  access_key  = var.sumologic_access_key
  base_url    = var.sumologic_environment_base_url
  environment = (var.sumologic_environment_base_url == null || var.sumologic_environment_base_url == "") ? var.sumologic_environment : null
}

# Region us-east-1, AWS account profile production
provider "aws" {
  profile = "production"
  region  = "us-east-1"
  alias   = "production-us-east-1"
}

# Region us-east-2, AWS account profile production
provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}
```

### Step 5: Configure main.tf

Add a collection module for each region. Use your backed-up `main.tf.v2x.bak` as a reference for the module names and `aws_account_alias` values. For all regions after the first, reuse the collector created by the first region using `sumologic_existing_collector_details`.

:::note
Use the **same `aws_account_alias`** that was used in your v2.x deployment to keep the Explorer hierarchy consistent.
:::

**Option A** (registry):

```hcl title="main.tf"
module "app-module" {
  source  = "SumoLogic/aws-observability/sumologic//modules/apps"
  version = "3.0.0"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}

module "collection-module-us-east-1" {
  source  = "SumoLogic/aws-observability/sumologic//modules/collections"
  version = "3.0.0"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}

module "collection-module-us-east-2" {
  source  = "SumoLogic/aws-observability/sumologic//modules/collections"
  version = "3.0.0"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Reuse the collector created for the first region — one collector per account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-us-east-1.sumologic_collector["collector"].id
  }
}
```

**Option B** (repository):

```hcl title="main.tf"
module "app-module" {
  source                         = "./modules/apps"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}

module "collection-module-us-east-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}

module "collection-module-us-east-2" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Reuse the collector created for the first region — one collector per account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-us-east-1.sumologic_collector["collector"].id
  }
}
```

### Step 6: Configure outputs.tf

```hcl title="outputs.tf"
output "Apps" {
  value       = module.app-module
  description = "All outputs related to apps."
  sensitive   = true
}

output "Collection" {
  value = {
    us-east-1 = module.collection-module-us-east-1
    us-east-2 = module.collection-module-us-east-2
  }
  description = "All outputs related to collection and sources."
  sensitive   = true
}
```

### Step 7: Deploy

```bash
terraform validate
terraform plan
terraform apply
```

### Step 8: Verify

Follow the same verification steps as the [single account and region guide](#step-3-verify-the-deployment).

---

## Multiple AWS accounts and regions

Use this approach when your v2.x deployment covered multiple AWS accounts, each potentially with multiple regions.

:::note
Destroy **all** v2.x deployments across all accounts and regions before deploying v3.0.0.
:::

### Step 1: Back up your existing configuration

Before destroying, save copies of your v2.x `providers.tf` and `main.tf`. These files contain the provider aliases and `module "collection-module-..."` blocks for every account and region — you will use them as a reference when configuring v3.0.0.

```bash
cp providers.tf providers.tf.v2x.bak
cp main.tf main.tf.v2x.bak
```

### Step 2: Destroy all v2.x deployments

For each account/region combination, navigate to the v2.x working directory and run:

```bash
cd <v2.x-account-region-directory>
terraform destroy
```

Repeat for every account/region. Each `terraform destroy` runs against the AWS profile and region configured in that directory's `providers.tf`.

### Step 3: Set up a new v3.0.0 working directory

Choose one of the following installation methods:

**Option A: Install as a Terraform module (from [registry](https://registry.terraform.io/modules/SumoLogic/aws-observability/sumologic/latest))**

Create a new working directory:

```bash
mkdir v3-observability && cd v3-observability
```

**Option B: Install from the repository**

Clone the v3.0.0 repository:

```bash
git clone https://github.com/SumoLogic/terraform-sumologic-aws-observability
cd terraform-sumologic-aws-observability
```

Initialize Terraform:

```bash
terraform init
```

Configure your Sumo Logic credentials in `main.auto.tfvars`:

```hcl
sumologic_environment     = "us1"
sumologic_access_id       = "<YOUR SUMO ACCESS ID>"
sumologic_access_key      = "<YOUR SUMO ACCESS KEY>"
sumologic_organization_id = "<YOUR SUMO ORG ID>"
```

### Step 4: Configure providers.tf

Add a `provider "aws"` block for each account-region combination. Use your backed-up `providers.tf.v2x.bak` as a reference for the aliases and profiles that were in use. Each requires a unique `alias`, the AWS CLI `profile` for that account, and the target `region`.

```hcl title="providers.tf"
provider "sumologic" {
  access_id   = var.sumologic_access_id
  access_key  = var.sumologic_access_key
  base_url    = var.sumologic_environment_base_url
  environment = (var.sumologic_environment_base_url == null || var.sumologic_environment_base_url == "") ? var.sumologic_environment : null
}

# Production account — us-east-1
provider "aws" {
  profile = "production"
  region  = "us-east-1"
  alias   = "production-us-east-1"
}

# Production account — us-east-2
provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}

# Development account — us-west-1
provider "aws" {
  profile = "development"
  region  = "us-west-1"
  alias   = "development-us-west-1"
}
```

### Step 5: Configure main.tf

Add a collection module for each account-region combination. Use your backed-up `main.tf.v2x.bak` as a reference for the module names and `aws_account_alias` values. Key rules:
- Set `aws_account_alias` per account to match the **same alias used in v2.x** — this preserves the collector name and Explorer hierarchy.
- A Sumo Logic hosted collector is created once per AWS account. For the first region in each account, let the module create the collector. For subsequent regions in the **same account**, reuse the collector via `sumologic_existing_collector_details`.
- The `app-module` is configured once and installs apps for the entire Sumo Logic org.

**Option A** (registry):

```hcl title="main.tf"
module "app-module" {
  source  = "SumoLogic/aws-observability/sumologic//modules/apps"
  version = "3.0.0"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}

# Production account — us-east-1 (creates the production collector)
module "collection-module-production-us-east-1" {
  source  = "SumoLogic/aws-observability/sumologic//modules/collections"
  version = "3.0.0"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}

# Production account — us-east-2 (reuses the production collector)
module "collection-module-production-us-east-2" {
  source  = "SumoLogic/aws-observability/sumologic//modules/collections"
  version = "3.0.0"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Reuse the production collector — one collector per account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-production-us-east-1.sumologic_collector["collector"].id
  }
}

# Development account — us-west-1 (creates the development collector)
module "collection-module-development-us-west-1" {
  source  = "SumoLogic/aws-observability/sumologic//modules/collections"
  version = "3.0.0"

  providers = {
    aws       = aws.development-us-west-1
    sumologic = sumologic
  }

  aws_account_alias         = "development"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "development"
}
```

**Option B** (repository):

```hcl title="main.tf"
module "app-module" {
  source                         = "./modules/apps"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}

# Production account — us-east-1 (creates the production collector)
module "collection-module-production-us-east-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}

# Production account — us-east-2 (reuses the production collector)
module "collection-module-production-us-east-2" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = "production"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Reuse the production collector — one collector per account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-production-us-east-1.sumologic_collector["collector"].id
  }
}

# Development account — us-west-1 (creates the development collector)
module "collection-module-development-us-west-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.development-us-west-1
    sumologic = sumologic
  }

  aws_account_alias         = "development"   # same alias as v2.x
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "development"
}
```

### Step 6: Configure outputs.tf

```hcl title="outputs.tf"
output "Apps" {
  value       = module.app-module
  description = "All outputs related to apps."
  sensitive   = true
}

output "Collection" {
  value = {
    production-us-east-1  = module.collection-module-production-us-east-1
    production-us-east-2  = module.collection-module-production-us-east-2
    development-us-west-1 = module.collection-module-development-us-west-1
  }
  description = "All outputs related to collection and sources."
  sensitive   = true
}
```

### Step 7: Deploy

```bash
terraform validate
terraform plan
terraform apply
```

### Step 8: Verify

1. Run `terraform plan` — must show **No changes**.
2. Go to **Manage Data > Collection > Collection** and confirm all collectors (one per account) show sources with a recent **Last Message Received** timestamp.
3. Go to **App Catalog > Installed Apps** and confirm all AWS Observability v3.0.0 apps are present.

---

## Troubleshooting

| Issue | Cause | Resolution |
|:--|:--|:--|
| Collector name conflict | A collector with the same name already exists (v2.x destroy did not complete) | Verify the v2.x destroy completed fully. If a partial collector remains, delete it manually from **Manage Data > Collection** and retry. |
| FER name conflict during app install | Old FERs with `AwsObservability*` names still exist | Delete the old FERs manually from **Manage Data > Logs > Field Extraction Rules** and retry apply. |
| Field already exists | Fields created by v2.x were not removed during destroy | Fields are global to the org and reusable. The v3.0.0 deployment will use the existing fields — no action needed if apply succeeds. |
| Credentials error during apply | AWS session expired during a long apply | Re-authenticate and retry: `terraform apply`. |
| Sources not showing data | IAM role or S3 bucket policies not yet propagated | Wait 5–10 minutes. The module includes a wait step for IAM propagation. |