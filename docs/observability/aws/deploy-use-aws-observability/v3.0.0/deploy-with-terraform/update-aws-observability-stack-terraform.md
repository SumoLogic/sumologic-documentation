---
id: update-aws-observability-stack-terraform
title: Update the AWS Observability Stack with Terraform
sidebar_label: Update Observability Stack
description: Learn how to update the AWS Observability stack using Terraform.
---

The Sumo Logic AWS Observability Terraform Solution reside in GitHub and updates will be posted on the [Changelog](/docs/observability/aws/deploy-use-aws-observability/changelog/).

To update the deployed solution, choose one of the following methods depending on how you originally installed the solution.

## Option A: Update as a Terraform module (from [registry](https://registry.terraform.io/modules/SumoLogic/aws-observability/sumologic/latest))

If you installed the solution using the Terraform registry module, update the latest module version in your `main.tf` from registry page:

**`main.tf`**

```hcl
provider "aws" {
  region = "us-east-1"
}

module "aws_observability" {
  source                    = "SumoLogic/aws-observability/sumologic"
  version                   = "<LATEST_VERSION>"
  sumologic_environment     = "us1"
  sumologic_access_id       = "<YOUR SUMO ACCESS ID>"
  sumologic_access_key      = "<YOUR SUMO ACCESS KEY>"
  sumologic_organization_id = "<YOUR SUMO ORG ID>"
  aws_account_alias         = "<YOUR AWS ACCOUNT ALIAS>"
}
```

:::note
Set the `version` field to the latest release version of the `aws_observability` module. Check the [SumoLogic/terraform-sumologic-aws-observability releases](https://github.com/SumoLogic/terraform-sumologic-aws-observability/releases) for the current latest version.
:::

Run the Terraform commands to update:

```bash
terraform init -upgrade
terraform validate
terraform plan
terraform apply
```

## Option B: Update from the repository

If you installed the solution by cloning the repository, navigate to your working directory and pull the latest changes:

```bash
cd <your-terraform-aws-observability-directory>
git pull
```

:::note
Starting with v3.0.0, the AWS Observability Terraform module has moved to a new repository:
- **Old (v2.x):** `github.com/SumoLogic/sumologic-solution-templates` (path: `aws-observability-terraform/`)
- **New (v3.0.0):** `github.com/SumoLogic/terraform-sumologic-aws-observability`
:::

Review the changelog and configure any new parameters as needed. See [Deploy with Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-terraform/) for how to configure parameters and override default values.

Run the Terraform commands to update the solution:

```bash
terraform init -upgrade
terraform validate
terraform plan
terraform apply
```

## Verify the update

After the update completes:

1. Run `terraform plan` and confirm there are no unexpected pending changes.
    ```bash
    terraform plan
    ```

    Output
    ```text
    Plan: 0 to add, 15 to change, 0 to destroy.
    ```
1. Go to **Manage Data > Collection > Collection** in Sumo Logic and confirm all sources show a recent **Last Message Received** timestamp.
1. Go to **App Catalog > Installed Apps** and confirm all AWS Observability apps reflect the updated version.
