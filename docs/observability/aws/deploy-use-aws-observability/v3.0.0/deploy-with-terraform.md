---
id: deploy-with-terraform
title: Deploy with Terraform
sidebar_label: Deploy with Terraform
description: The Sumo Logic AWS Observability Solution can be deployed using Terraform for single or multi-account and multi-region AWS environments.
---

These instructions help you deploy the AWS Observability Solution using Terraform. For more information about how to use Terraform in your Sumo Logic environment, see [Use Terraform with Sumo Logic](/docs/api/about-apis/terraform-with-sumo-logic).

To set up the AWS Observability Solution using Terraform, complete the following steps.

Additional parameter overrides are available in an appendix section for [Source](#override-source-parameters) and [App Content](#override-app-content-parameters).

## Prerequisites

:::info
If you are already collecting AWS metrics, logs, and/or events, we recommend that you override the default settings. Overriding the configuration sources prevents them from being re-created in the AWS infrastructure or Sumo Logic.
:::

:::note

<details>
<summary>
If you've previously set up our AWS Observability Solution with CloudFormation and want to move to Terraform, we recommend following these instructions (click to expand).
</summary>

1. Start with an existing AWS account and region combination (preferably a non-production dev/test account), delete the AWS Observability CloudFormation stack associated with it, then onboard the account-region combination using Terraform with the same aws_account_alias to ensure the Sumo Logic collector retains a consistent naming convention and the Explorer hierarchy remains aligned.
1. Once you confirm that the solution has been deployed successfully, verify that the apps are installed, the **Installed Apps** folder is available in the Library, and the apps are shared with the user's Sumo Logic organization.
1. Ensure that all configured sources are successfully ingesting logs.
1. You can then repeat the process for additional AWS accounts and regions.

</details>

:::

:::note
The [Global Intelligence for AWS CloudTrail DevOps](/docs/integrations/amazon-aws/global-intelligence-cloudtrail-devops/) app is planned for deprecation in the near future and has therefore been removed from the AWS Observability Solution. With this removal, the app will no longer be backed up or maintained during future solution upgrades.
:::


For this setup, complete the following:

1. Set up the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).
1. [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use AWS profiles.
1. To use multiple AWS accounts, [configure AWS account profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for each AWS account you want to deploy the AWS Observability Solution. The [AWS account profile names](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) you create will be used in [Step 3: Determine which AWS Account/Regions to Deploy](#step-3-determine-which-aws-accountregions-to-deploy).
1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## AWS Observability Solution

The AWS Observability Solution is organized into the following groups of files and folders. The Resource Creation file [main.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/main.tf) invokes two modules:
   * **app-module**: This module installs all the AWS Observability apps into the **Installed Apps** catalog, sets up the Explorer hierarchy, and deploys monitors, Field Extraction Rules (FER), and fields in your Sumo Logic account.
   * **collection-module**: This module sets up the hosted collector, sources (for logs and metrics) and associated tags to Sumo Logic sources as required for the solution.

:::note
Using main.tf, only apps can be installed with the "app-module" module by keeping the "collection-module" module commented.
:::

System files:

* [versions.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/versions.tf): Provides the Terraform block that specifies the required provider version and required Terraform version for this configuration. See [Lock and upgrade provider versions](https://learn.hashicorp.com/tutorials/terraform/provider-versioning) for more information.
* [providers.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/providers.tf): Provides Terraform configurations to declare the providers they require to have Terraform install and use them. See [Providers](https://www.terraform.io/docs/language/providers/index.html) for more information.
* [variables.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/variables.tf): Provides parameters for a Terraform module, allowing aspects of the module to be customized without altering the module's own source code, and allowing modules to be shared between different configurations. See [Use input variables to add module arguments](https://www.terraform.io/docs/language/values/variables.html) for more information.
* [outputs.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/outputs.tf): Provides specific return values for a Terraform module. See [Use outputs to expose module data](https://www.terraform.io/docs/language/values/outputs.html) for more information.
  
## Step 1: Set up the Terraform environment

Before you run the Terraform, perform the following actions on a server machine of your choice:

1. Install [Terraform](https://www.terraform.io/) version [1.6.0](https://releases.hashicorp.com/terraform/) or later. To check the installed Terraform version, run the following command:
    ```bash
    terraform --version
    ```
1. Install the latest version of [curl](https://curl.haxx.se/download.html). To check the installed curl version, run the following command:
    ```bash
    curl --version
    ```
1. Install [Python](https://www.python.org/) version 3.11 or later.
1. Install the latest version of [jq](https://github.com/stedolan/jq/wiki/Installation) command-line JSON parser. This is required for running the `fields.sh` batch file. To check the installed jq version, run the following command:
    ```bash
    jq --version
    ```
1. Install [Sumo Logic Python SDK](https://pypi.org/project/sumologic-sdk/) using the following command:
    ```bash
    pip install sumologic-sdk
    ```

## Step 2: Configure the Terraform

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

1. Clone the repository and navigate to it:
    ```bash
    git clone https://github.com/SumoLogic/terraform-sumologic-aws-observability
    cd terraform-sumologic-aws-observability
    ```
1. Initialize the Terraform working directory. This installs the required Terraform providers, including [Null](https://www.terraform.io/docs/providers/null/index.html), [Sumo Logic](https://www.terraform.io/docs/providers/sumologic/index.html), [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs), [Time](https://registry.terraform.io/providers/hashicorp/time/latest/docs), and [Random](https://registry.terraform.io/providers/hashicorp/random/latest/docs):
    ```bash
    terraform init
    ```
1. Configure the following mandatory parameters in the **main.auto.tfvars** file.
   * `sumologic_environment`: This input specifies the Sumo Logic deployment that you want to use. Refer to [Sumo Logic endpoints by deployment and firewall security](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for a list of available deployments. Possible values include `au`, `ca`, `ch`, `de`, `eu`, `jp`, `fed`, `kr`, `us1`, or `us2`.
   * `sumologic_access_id`: This input specifies the Sumo Logic access ID that you want to use. For more information on how to obtain an access ID, refer to the [Access Keys](/docs/manage/security/access-keys) documentation.
   * `sumologic_access_key`: [Sumo Logic Access Key](/docs/manage/security/access-keys) is used for Sumo Logic API calls.
   * `sumologic_organization_id`: Sumo Logic Organization ID. You can find your organization ID on the [Preferences](/docs/get-started/account-settings-preferences/#my-profile) page in the Sumo Logic UI. Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources.
   * `aws_account_alias`: The name/alias for the AWS environment from which you are collecting data. This name will appear in the metrics and logs. Leave this blank if you are going to deploy the solution in multiple AWS accounts. Do not include special characters in the alias.
    :::note
    See the [variables.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/variables.tf) file and [README](https://github.com/SumoLogic/terraform-sumologic-aws-observability/tree/master#readme) in that folder for configuration information with permissible values for these variables. 
    :::
1. Configure the AWS region in **providers.tf**:
    ```hcl
    provider "aws" {
      region = "us-east-1"
    }
    ```

## Step 3: Determine which AWS Account/Regions to Deploy

You have three options to configure the AWS Account/Region:

* [Option 1: Deploy to a single AWS account and region](#option-1-deploy-to-a-single-aws-account-and-region)
* [Option 2: Deploy to multiple regions within an AWS account](#option-2-deploy-to-multiple-regions-within-an-aws-account)
* [Option 3: Deploy to multiple AWS accounts and regions](#option-3-deploy-to-multiple-aws-accounts-and-regions)

This section details how to connect the [AWS account profile(s)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) you set up in your AWS account(s) in a **providers.tf** file, which will be used to authenticate with your AWS account(s).

### Option 1: Deploy to a single AWS account and region

To deploy the AWS Observability Solution for one AWS account and region combination, configure the provider in **providers.tf**, the collection module in **main.tf**, and the output in **outputs.tf**.

#### Configure providers in providers.tf

The Terraform uses "us-east-1" and the active AWS CLI profile by default. If you want to use a different region or another AWS CLI profile, update the `provider "aws"` block. Provide an `alias` that Terraform uses to identify this account-region combination.

**Example:** Configuration for the us-east-2 region using the production AWS account profile.

```hcl title="providers.tf"
provider "sumologic" {
  access_id   = var.sumologic_access_id
  access_key  = var.sumologic_access_key
  base_url    = var.sumologic_environment_base_url
  environment = (var.sumologic_environment_base_url == null || var.sumologic_environment_base_url == "") ? var.sumologic_environment : null
}

provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}
```

#### Configure collection module in main.tf

Add a collection module that references the provider alias you configured above:

```hcl title="main.tf"
module "collection-module" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}
```

#### Configure outputs in outputs.tf

```hcl title="outputs.tf"
output "Apps" {
  value       = module.app-module
  description = "All outputs related to apps."
  sensitive   = true
}

output "Collection" {
  value = {
    us-east-2 = module.collection-module
  }
  description = "All outputs related to collection and sources."
  sensitive   = true
}
```

### Option 2: Deploy to multiple regions within an AWS account

Use this option to install the AWS Observability Solution for multiple regions within a given AWS account. To do so, add providers for each AWS region in **providers.tf** and add a collection module for each region in **main.tf**.

#### Configure providers in providers.tf

Add a `provider "aws"` block for each region. Each provider requires a unique `alias` that Terraform uses to identify the account-region combination.

:::note
Do not change or remove the `provider "sumologic"` section:

```hcl
provider "sumologic" {
  access_id   = var.sumologic_access_id
  access_key  = var.sumologic_access_key
  base_url    = var.sumologic_environment_base_url
  environment = (var.sumologic_environment_base_url == null || var.sumologic_environment_base_url == "") ? var.sumologic_environment : null
}
```
:::

Add a provider for each region, replacing the placeholder content with your AWS CLI account profile, region, and alias:

:::note
The AWS CLI Account profile will be the same across all regions.
:::

```hcl title="Add provider per region"
# AWS Account profile <AWS_PROFILE_NAME>, Region <REGION>, Alias <ALIAS>
provider "aws" {
  profile = "<AWS_PROFILE_NAME>"
  region  = "<REGION>"
  alias   = "<ALIAS>"
}
```

**Example:** Provider configuration for a production AWS account profile in us-east-1 and us-east-2 regions:

```hcl title="Example configuration"
# AWS Account profile production, Region us-east-1
provider "aws" {
  profile = "production"
  region  = "us-east-1"
  alias   = "production-us-east-1"
}
# AWS Account profile production, Region us-east-2
provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}
```

#### Configure collection modules in main.tf

Add a collection module block for each region pointing to `./modules/collections`. Pass the corresponding aliased AWS provider and the `sumologic` provider.

* Since this is a single account, you can use the global `var.aws_account_alias`.
* A hosted collector is created per AWS account. For subsequent regions in the same account, reuse the collector created for the first region.

```hcl title="Example main.tf for single account, multiple regions"
module "collection-module-us-east-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = var.aws_account_alias
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

  aws_account_alias         = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Use the same collector created for the first region of the production account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-us-east-1.sumologic_collector["collector"].id
  }
}
```

#### Configure outputs in outputs.tf

Update the `Collection` output to include all collection modules:

:::note
Do not change the **output "Apps"** section.

```hcl title="Output Apps"
output "Apps" {
  value       = module.app-module
  description = "All outputs related to apps."
  sensitive   = true
}
```
:::

```hcl title="Example outputs.tf"
output "Collection" {
  value = {
    us-east-1 = module.collection-module-us-east-1
    us-east-2 = module.collection-module-us-east-2
  }
  description = "All outputs related to collection and sources."
  sensitive   = true
}
```

### Option 3: Deploy to multiple AWS accounts and regions

Use this option to install the AWS Observability Solution for multiple accounts and regions.

Add providers for each AWS account/region combination, configure collection modules, and update outputs as shown in the following sections.

#### Configure providers in providers.tf

Add a `provider "aws"` block for each account-region combination. Each provider requires a unique `alias`, the AWS CLI `profile` for that account, and the target `region`.

:::note
Do not change or remove the `provider "sumologic"` section:

```hcl
provider "sumologic" {
  access_id   = var.sumologic_access_id
  access_key  = var.sumologic_access_key
  base_url    = var.sumologic_environment_base_url
  environment = (var.sumologic_environment_base_url == null || var.sumologic_environment_base_url == "") ? var.sumologic_environment : null
}
```
:::

```hcl title="Add provider for each account-region"
# Region <REGION>, AWS Account profile <AWS_PROFILE_NAME>, Alias <ALIAS>
provider "aws" {
  profile = "<AWS_PROFILE_NAME>"
  region  = "<REGION>"
  alias   = "<ALIAS>"
}
```

**Example:** Provider configuration for the production AWS account profile in us-east-1 and us-east-2 regions, and a development AWS account profile in us-west-1:

```hcl title="Example configuration"
# Region us-east-1, AWS Account profile production
provider "aws" {
  profile = "production"
  region  = "us-east-1"
  alias   = "production-us-east-1"
}
# Region us-east-2, AWS Account profile production
provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}
# Region us-west-1, AWS Account profile development
provider "aws" {
  profile = "development"
  region  = "us-west-1"
  alias   = "development-us-west-1"
}
```

#### Configure collection modules in main.tf

Add a collection module block for each account-region combination. Each module points to `./modules/collections` and receives the corresponding aliased AWS provider.

* The `aws_account_alias` for each module needs to be specified per account (not using `var.aws_account_alias`).
* A hosted collector is created per AWS account. For subsequent regions within the same account, reuse the collector from the first region.
* For each new AWS account, create a new hosted collector for the first region, then reuse it for subsequent regions in that account.

```hcl title="Example main.tf for multiple accounts and regions"
module "collection-module-production-us-east-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-1
    sumologic = sumologic
  }

  aws_account_alias         = "production"
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"
}

module "collection-module-production-us-east-2" {
  source = "./modules/collections"

  providers = {
    aws       = aws.production-us-east-2
    sumologic = sumologic
  }

  aws_account_alias         = "production"
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "production"

  # Use the same collector created for the first region of the production account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id     = module.collection-module-production-us-east-1.sumologic_collector["collector"].id
  }
}

module "collection-module-development-us-west-1" {
  source = "./modules/collections"

  providers = {
    aws       = aws.development-us-west-1
    sumologic = sumologic
  }

  aws_account_alias         = "development"
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags
  aws_cli_profile           = "development"
}
```

#### Configure outputs in outputs.tf

Update the `Collection` output to include all collection modules:

:::note
Do not change the **output "Apps"** section.

```hcl title="Output Apps"
output "Apps" {
  value       = module.app-module
  description = "All outputs related to apps."
  sensitive   = true
}
```
:::

```hcl title="Example outputs.tf"
output "Collection" {
  value = {
    production-us-east-1    = module.collection-module-production-us-east-1
    production-us-east-2    = module.collection-module-production-us-east-2
    development-us-west-1   = module.collection-module-development-us-west-1
  }
  description = "All outputs related to collection and sources."
  sensitive   = true
}
```

## Step 4: Configure the app module in main.tf

The app module installs AWS Observability apps into the **Installed Apps** catalog and sets up the Explorer hierarchy in your Sumo Logic account. It also deploys monitors, Field Extraction Rules (FER), and fields required for AWS Observability. It should be configured once per Sumo Logic organization.

:::note
Do not change the **module "app-module"** section unless you want to override app parameters. See [Override app content parameters](#override-app-content-parameters) for available overrides.
:::

```hcl
module "app-module" {
  source                         = "./modules/apps"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}
```

## Step 5: Override default parameter values

By default, all parameters are set up to automatically collect logs, metrics, install apps, and monitors. If you need to override parameters, you have two options:

* **Simple URL overrides** (for existing sources). If you are already collecting data in Sumo Logic and want to reuse existing sources, set the corresponding `_source_url` variables (for example, `cloudwatch_metrics_source_url`, `cloudtrail_source_url`) in the **main.auto.tfvars** file.
* **Detailed source configuration overrides**. To override source details (such as bucket names, path expressions, or log format settings), add the override parameters directly to the `module "collection-module"` block in the [terraform-sumologic-aws-observability/main.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/main.tf) file.

To perform overrides, see [Override collection parameters](#override-source-parameters) and [Override app content parameters](#override-app-content-parameters).

## Step 6: Deploy the AWS Observability Solution

Deploy the AWS Observability Solution using the Sumo Logic Terraform.

Navigate to the directory **terraform-sumologic-aws-observability** and execute the following commands.

:::note
Before you run these commands, make sure you have configured your AWS profiles on your system as mentioned in the [Prerequisites](#prerequisites).
:::

```terminal
terraform validate
terraform plan
terraform apply
```

## Uninstalling the Solution

To uninstall the AWS Observability Solution deployed using Terraform, navigate to the directory **terraform-sumologic-aws-observability** and execute the command:

```terminal
terraform destroy
```

This will destroy all [resources](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/resources/) and configuration previously set up.

## Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform

To migrate CloudWatch Source to Kinesis Firehose Source using Terraform, refer to [Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/migration-strategy-using-terraform).

## Appendix

### Override collection parameters

:::info
If you are already collecting AWS metrics, logs, and/or events, we recommend that you override the default settings. Overriding the configuration sources prevents them from being re-created in the AWS infrastructure or Sumo Logic.
:::

Source parameters define how collectors and their sources are set up in Sumo Logic. If needed, override the desired parameter in the module that you defined earlier for each AWS account and region in the **terraform-sumologic-aws-observability/main.tf** file. 

The following examples demonstrate parameter overrides:

* Example 1 overrides the `cloudtrail_source_details` parameter to collect CloudTrail logs from a user-provided s3 bucket. CloudTrail logs are already stored in the user-provided s3 bucket. The default parameter will always create new S3 buckets, forward CloudTrail logs to it, and collect CloudTrail logs from the newly created s3 bucket.
* Example 2 overrides the `auto_enable_access_logs` variable to skip automatic access log enablement for an Application Load Balancer resource. By default, it is set to "Both", which automatically enables access logging for new and existing ALB resources.

**Default example:**

```hcl
module "collection-module" {
  source = "./modules/collections"

  providers = {
    aws       = aws
    sumologic = sumologic
  }

  aws_account_alias         = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags

  cloudwatch_metrics_source_url = var.cloudwatch_metrics_source_url
  cloudwatch_logs_source_url    = var.cloudwatch_logs_source_url
  cloudtrail_source_url         = var.cloudtrail_source_url
  elb_log_source_url            = var.elb_log_source_url
  classic_lb_log_source_url     = var.classic_lb_log_source_url
}
```

**Override example 1: Override the cloudtrail_source_details parameter**

Override the `cloudtrail_source_details` parameter to collect CloudTrail logs from a user-provided s3 bucket. CloudTrail logs in this case are already stored in the user-provided s3 bucket.

```hcl
module "collection-module" {
  source = "./modules/collections"

  providers = {
    aws       = aws
    sumologic = sumologic
  }

  aws_account_alias         = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags = {
    env    = "prod"
    author = "sumologic"
  }

  cloudwatch_metrics_source_url = var.cloudwatch_metrics_source_url
  cloudwatch_logs_source_url    = var.cloudwatch_logs_source_url
  cloudtrail_source_url         = var.cloudtrail_source_url
  elb_log_source_url            = var.elb_log_source_url
  classic_lb_log_source_url     = var.classic_lb_log_source_url

  # Enable Collection of CloudTrail logs
  collect_cloudtrail_logs   = true
  # Collect CloudTrail logs from user-provided S3 bucket
  cloudtrail_source_details = {
    source_name     = "CloudTrail Logs us-east-1"
    source_category = "aws/observability/cloudtrail/logs"
    description     = "This source is created using Sumo Logic terraform AWS Observability module to collect AWS cloudtrail logs."
    bucket_details = {
      create_bucket        = false
      bucket_name          = "aws-observability-logs"
      path_expression      = "AWSLogs/*/CloudTrail/*/*"
      force_destroy_bucket = false
    }
    fields = {}
  }
}
```
:::note
`aws_resource_tags` is a map of tags that will be applied to all AWS resources provisioned through the AWS Observability Solution, except for SAM nested sources, which are not tagged.
:::

**Override example 2: Override the auto_enable_access_logs parameter**

Override the **auto_enable_access_logs** parameter (set to None) to automatically skip enable access logging for an Application Load Balancer.

```hcl
module "collection-module" {
  source = "./modules/collections"

  providers = {
    aws       = aws
    sumologic = sumologic
  }

  aws_account_alias         = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  sumologic_access_id       = var.sumologic_access_id
  sumologic_access_key      = var.sumologic_access_key
  sumologic_environment     = var.sumologic_environment
  aws_resource_tags         = var.aws_resource_tags

  cloudwatch_metrics_source_url = var.cloudwatch_metrics_source_url
  cloudwatch_logs_source_url    = var.cloudwatch_logs_source_url
  cloudtrail_source_url         = var.cloudtrail_source_url
  elb_log_source_url            = var.elb_log_source_url
  classic_lb_log_source_url     = var.classic_lb_log_source_url

  auto_enable_access_logs = "None"
}
```

The following table provides a list of all source parameters and their default values. See the [terraform-sumologic-aws-observability/modules/collections/variables.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/modules/collections/variables.tf) file for complete code.

### Configure collection of CloudWatch metrics

:::note
To migrate from legacy CloudWatch Metrics Source to Kinesis Firehose Metrics Source using Terraform, refer to [Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/migration-strategy-using-terraform).
:::

#### collect_cloudwatch_metrics

Select the kind of CloudWatch Metrics Source to create.

Options available are:

* "CloudWatch Metrics Source". Creates Sumo Logic AWS CloudWatch Metrics Sources.
* "Kinesis Firehose Metrics Source" (Recommended). Creates a Sumo Logic AWS Kinesis Firehose for Metrics Source. This new source has cost and performance benefits over the CloudWatch Metrics Source and is therefore recommended.
* "None". Skips the Installation of both the Sumo Logic Metric Sources.

**Default Value:**

```hcl
"Kinesis Firehose Metrics Source"
```

**Default value:**

```hcl
collect_cloudwatch_metrics = "Kinesis Firehose Metrics Source"
```

#### cloudwatch_metrics_source_details

Provide details for the Sumo Logic CloudWatch Metrics source. If not provided, then defaults will be used.

* `limit_to_namespaces`. Enter a comma-delimited list of the namespaces which will be used for both AWS CloudWatch Metrics Source. You can provide both AWS and custom namespaces.

Supported namespaces are based on the type of CloudWatch Metrics Source you have selected above. See [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) and [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics) for details on which namespaces they support.

**Default value:**

```json
{
 "bucket_details": {
   "bucket_name": "aws-observability-random-id",
   "create_bucket": true,
   "force_destroy_bucket": true
 },
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Cloudwatch metrics.",
 "fields": {},
 "limit_to_namespaces": [
   "AWS/ApplicationELB",
   "AWS/ApiGateway",
   "AWS/DynamoDB",
   "AWS/Lambda",
   "AWS/RDS",
   "AWS/ECS",
   "AWS/ElastiCache",
   "AWS/ELB",
   "AWS/NetworkELB",
   "AWS/SQS",
   "AWS/SNS"
 ], 
 "tag_filters": [],
 "source_category": "aws/observability/cloudwatch/metrics",
 "source_name": "CloudWatch Metrics (Region)"
}
```

**Override Example JSON:**

The following override example collects only DynamoDB and Lambda namespaces with source_category set to `"aws/observability/cloudwatch/metrics/us-east-1"`:

```json title="cloudwatch_metrics_source_details"
cloudwatch_metrics_source_details = {
 "bucket_details": {
   "bucket_name": "",
   "create_bucket": true,
   "force_destroy_bucket": true
 },
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Cloudwatch metrics.",
 "fields": {},
 "limit_to_namespaces": [
   "AWS/DynamoDB",
   "AWS/Lambda",
   "CWAgent"
  ], 
 "tag_filters": [{
      "type":"TagFilters",
      "namespace" : "AWS/DynamoDB",
      "tags": ["env=prod;dev"]
    },{
      "type": "TagFilters",
      "namespace": "AWS/Lambda",
      "tags": ["env=prod"]
 }],
 "source_category": "aws/observability/cloudwatch/metrics/us-east-1",
 "source_name": "CloudWatch Metrics us-east-1"
}
```

:::note
All namespaces specified in `tag_filters` must be included in `limit_to_namespaces`. Filters are not supported for custom metrics.
:::

#### cloudwatch_metrics_source_url

Use this parameter if you are already collecting CloudWatch Metrics and want to use an existing Sumo Logic Collector Source. You need to provide the URL of the existing Sumo Logic CloudWatch Metrics Source. If the URL is for a AWS CloudWatch Metrics source, the "account" and "accountid" metadata fields will be added to the Source. If the URL is for the Kinesis Firehose for Metrics source, the "account" field will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```hcl
""
```

**Override Example JSON:**

The following is a default example:

```json
cloudwatch_metrics_source_url=""
```


The following is a specific Source URL example:

```hcl
collect_cloudwatch_metrics = "Kinesis Firehose Metrics Source"
cloudwatch_metrics_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9876"
```

### Configure collection of Application Load Balancer Access Logs

Amazon Elastic load balancers have various [load balancers](https://aws.amazon.com/elasticloadbalancing/?whats-new-cards-elb.sort-by=item.additionalFields.postDateTime&whats-new-cards-elb.sort-order=desc). AWS Observability supports access log collection for Application Load Balancers only.

#### collect_elb_logs

You have the following options:

* `true`. Ingest Load Balancer logs into Sumo Logic. Creates a Sumo Logic Log Source that collects application load balancer logs from an existing bucket or a new bucket. If true, configure `"elb_source_details"` to ingest load balancer logs.
* `false`. You are already ingesting load balancer logs into Sumo Logic.

When enabling ALB logs (setting to `true`), you need to provide [elb_source_details](#elb_source_details) with configuration information including the bucket name and path expression.

**Default value:**

```json
"true"
```

**Override Example JSON:**

```json
collect_elb_logs = true
```

#### elb_source_details

Provide details for the Sumo Logic ELB source. If not provided, then defaults will be used.

To enable collection of application load balancer logs, set [collect_elb_logs](#collect_elb_logs) to `true` and provide configuration information for the bucket. Use the default value code and replace default values.

* If `create_bucket` is `false`, provide a name of an existing S3 bucket where you would like to store loadbalancer logs If this is empty, a new bucket will be created in the region.
* If `create_bucket` is `true`, the script creates a bucket, the name of the bucket has to be unique; this is achieved internally by generating a random-id and then post-fixing it to the "aws-observability-" string.
* `path_expression`. This is required in case the above existing bucket is already configured to receive ALB access logs. If this is blank, Sumo Logic will store logs in the path expression: `*AWSLogs/*/elasticloadbalancing/*/*`

**Default value:**

```json
{
 "source_name": "Elb Logs (Region)",
 "source_category": "aws/observability/alb/logs",
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS ELB logs.",
 "bucket_details": {
   "bucket_name": "aws-observability-random-id",
   "create_bucket": true,
   "force_destroy_bucket": true,
   "path_expression": "*AWSLogs/<ACCOUNT-ID>/elasticloadbalancing/<REGION-NAME>/*"
 },
 "fields": {}
}
```

**Override Example JSON:**

The following override example uses the bucket `"example-loadbalancer-logs"` with path expression `"*AWSLogs/*/elasticloadbalancing/*/*"`:

```hcl
# Enable Collection of ALB Access logs source
collect_elb_logs   = true
# Collect ALB Access logs, from user provided s3 bucket
# Don't create a s3 bucket, use bucket details provided by the user. Don't force destroy bucket
elb_source_details = {
 source_name     = "Elb Logs us-east-1"
 source_category = "aws/observability/alb/logs"
 description     = "This source is created using the Sumo Logic terraform AWS Observability module to collect AWS ELB logs."
 bucket_details = {
     create_bucket        = false
     bucket_name          = "example-loadbalancer-logs"
     path_expression      = "*AWSLogs/*/elasticloadbalancing/*/*"
     force_destroy_bucket = false
 }
 fields = {}
}
```

#### auto_enable_access_logs

Enable Application Load Balancer (ALB) Access logging.

You have the following options:

* `New`. Automatically enables access logging for newly created ALB resources to collect logs for ALB resources. This does not affect ALB resources already collecting logs.
* `Existing`. Automatically enables access logging for existing ALB resources to collect logs for ALB resources.
* `Both`. Automatically enables access logging for new and existing ALB resources.
* `None`. Skips Automatic access Logging enable for ALB resources.

**Default value:**

```hcl
"Both"
```

**Override Example JSON:**

Example JSON for newly created ALB resources only.

```json
auto_enable_access_logs = "New"
```

 :::note
 CloudTrail must be enabled for EventBridge to capture `CreateLoadBalancer` events, since these events are recorded and delivered through CloudTrail.
 :::

#### elb_log_source_url

Required if you are already collecting ALB logs. Provide the existing Sumo Logic ALB Source API URL. The account, accountid, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```hcl
""
```

**Override Example JSON:**

The following is a default example:

```hcl
elb_log_source_url=""
```

The following is a specific Source URL example:

```hcl
collect_elb_logs = true
elb_log_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9879"
```

### Configure collection of Classic Load Balancer Access Logs

Amazon Elastic load balancers have various [load balancers](https://aws.amazon.com/elasticloadbalancing/?whats-new-cards-elb.sort-by=item.additionalFields.postDateTime&whats-new-cards-elb.sort-order=desc). AWS Observability supports access log collection for Classic Load Balancers (CLB) only.

#### collect_classic_lb_logs

You have the following options:

`true`. Ingest Load Balancer logs into Sumo Logic. Creates a Sumo Logic Log Source that collects application load balancer  logs from an existing bucket or a new bucket.

If true, configure "classic_lb_source_details" to ingest load balancer logs.

`false`. You are already ingesting load balancer logs into Sumo Logic.

When enabling CLB logs (setting to `true`), you need to provide `classic_lb_source_details` with configuration information, including the bucket name and path expression.

**Default value:**

```hcl
true
```

**Override Example JSON:**

```hcl
collect_classic_lb_logs = true
```

#### classic_lb_source_details

Provide details for the Sumo Logic CLB source. If not provided, then defaults will be used.

To enable collection of classic load balancer logs, set `collect_classic_lb_logs` to `true` and provide configuration information for the bucket. Use the default value code and replace default values.

* If create_bucket is `false`, provide a name of an existing S3 bucket where you would like to store load balancer logs. If this is empty, a new bucket will be created in the region.
* If create_bucket is `true`, the script creates a bucket, the name of the bucket has to be unique; this is achieved internally by generating a random-id and then post-fixing it to the "aws-observability-" string.
* `path_expression`. This is required in case the above existing bucket is already configured to receive CLB access logs. If this is blank, Sumo Logic will store logs in the path expression: `*classicloadbalancing/AWSLogs/*/elasticloadbalancing/*/*`.

**Default value:**

```json
{
 "source_name": "Classic lb Logs (Region)",
 "source_category": "aws/observability/clb/logs",
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Classic LoadBalancer logs.",
 "bucket_details": {
   "bucket_name": "aws-observability-random-id",
   "create_bucket": true,
   "force_destroy_bucket": true,
   "path_expression": "*classicloadbalancing/AWSLogs/<ACCOUNT-ID>/elasticloadbalancing/<REGION-NAME>/*"
 },
 "fields": {}
}
```

**Override Example JSON:**

The following override example uses the bucket `"example-loadbalancer-logs"` with path expression `"*AWSLogs/*/elasticloadbalancing/*/*"`:

```hcl
# Enable Collection of CLB Access logs source
collect_classic_lb_logs   = true
# Collect CLB Access logs, from user provided s3 bucket
# Don't create a s3 bucket, use bucket details provided by the user. Don't force destroy bucket
classic_lb_source_details = {
 source_name     = "Classic lb Logs us-east-1"
 source_category = "aws/observability/clb/logs"
 description     = "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Classic LoadBalancer logs."
 bucket_details = {
     create_bucket        = false
     bucket_name          = "example-loadbalancer-logs"
     path_expression      = "*AWSLogs/*/elasticloadbalancing/*/*"
     force_destroy_bucket = false
 }
 fields = {}
}
```

#### auto_enable_classic_lb_access_logs

Enable Classic Load Balancer (CLB) Access logging.

You have the following options:

* `New`. Automatically enables access logging for newly created CLB resources to collect logs for CLB resources. This does not affect CLB resources already collecting logs.
* `Existing`. Automatically enables access logging for existing CLB resources to collect logs for CLB resources.
* `Both`. Automatically enables access logging for new and existing CLB resources.
* `None`. Skips Automatic access Logging enable for CLB resources.

**Default value:**

```hcl
"Both"
```

**Override Example JSON:**

Example JSON for newly created ALB resources only.

```hcl
auto_enable_classic_lb_access_logs = "New"
```

 :::note
 CloudTrail must be enabled for EventBridge to capture `CreateLoadBalancer` events, since these events are recorded and delivered through CloudTrail.
 :::


#### classic_lb_log_source_url

Required if you are already collecting Classic LB logs. Provide the existing Sumo Logic Classic LB Source API URL. The account, accountid, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```hcl
""
```

**Examples:**

The following is a default example:

```hcl
classic_lb_log_source_url=""
```

The following is a specific Source URL example:

```hcl
collect_classic_lb_logs = true
classic_lb_log_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9879"
```

### Configure collection of CloudTrail logs

:::note
To migrate CloudWatch Logs Source to Kinesis Firehose Logs Source using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/migration-strategy-using-terraform).
:::

#### collect_cloudtrail_logs

Create a Sumo Logic CloudTrail Logs Source. You have the following options:

* `true`. Ingest CloudTrail logs into Sumo Logic. Creates a Sumo Logic CloudTrail Log Source that collects CloudTrail logs from an existing bucket or new bucket. If true, configure "cloudtrail_source_details" to ingest CloudTrail logs.
* `false`. You are already ingesting CloudTrail logs into Sumo Logic.

When enabling CloudTrail logs setting to `true`, you need to provide [cloudtrail_source_details](#cloudtrail_source_details) with configuration information.

**Default value:**

```hcl
true
```

**Example JSON:**

```hcl
collect_cloudtrail_logs = true
```

#### cloudtrail_source_details

Provide details for the Sumo Logic CloudTrail source. If not provided, then defaults will be used.

To enable, set [collect_cloudtrail_logs](#collect_cloudtrail_logs) to `true` and provide configuration information for the bucket. Use the default value code and replace default values.

* If `create_bucket` is false, provide a name of an existing S3 bucket where you would like to store CloudTrail logs. If this is empty, a new bucket will be created in the region.
* If `create_bucket` is true, the script creates a bucket, the name of the bucket has to be unique; this is achieved internally by generating a random-id and then post-fixing it to the `"aws-observability-"` string.
* `path_expression`. This is required in case the above existing bucket is already configured to receive CloudTrail logs. If this is blank, Sumo Logic will store logs in the path expression `AWSLogs/*/CloudTrail/*/*`.

**Default value:**

```json
{
 "bucket_details": {
   "bucket_name": "aws-observability-<random-id>",
   "create_bucket": true,
   "force_destroy_bucket": true,
   "path_expression": "AWSLogs/<ACCOUNT-ID>/CloudTrail/<REGION-NAME>/*"
 },
}
```

**Override Example:**

The following override example uses the bucket `"aws-observability-logs"` with path expression `"*AWSLogs/*/CloudTrail/*/*"` path expression:

```hcl
# Enable Collection of CloudTrail logs
collect_cloudtrail_logs   = true
# Collect CloudTrail logs, from user provided s3 bucket
# Don't create a s3 bucket, use bucket details provided by the user. Don't force destroy bucket
cloudtrail_source_details = {
 source_name     = "CloudTrail Logs us-east-1"
 source_category = "aws/observability/cloudtrail/logs"
 description     = "This source is created using Sumo Logic terraform AWS Observability module to collect AWS cloudtrail logs."
 bucket_details = {
     create_bucket        = false
     bucket_name          = "aws-observability-logs"
     path_expression      = "AWSLogs/*/CloudTrail/*/*"
     force_destroy_bucket = false
 }
 fields = {}
}
```

#### cloudtrail_source_url

Required if you are already collecting CloudTrail logs. Provide the existing Sumo Logic CloudTrail Source API URL. The account field will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```hcl
""
```

**Example JSON:**

The following is a default example:

```hcl
cloudtrail_source_url=""
```

The following is a specific Source URL example:

```hcl
collect_cloudtrail_logs = true
cloudtrail_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9877"
```

### Configure collection of CloudWatch logs

#### collect_cloudwatch_logs

Select the type of Sumo Logic CloudWatch Logs Sources to create. You have the following options:

* "Lambda Log Forwarder". Creates a Sumo Logic CloudWatch Log Source that collects CloudWatch logs via a Lambda function.
* "Kinesis Firehose Log Source". Creates a Sumo Logic Kinesis Firehose Log Source to collect CloudWatch logs.
* "None". Skips installation of both sources.

**Default value:**

```hcl
"Kinesis Firehose Log Source"
```

**Default value:**

```hcl
collect_cloudwatch_logs = "Kinesis Firehose Log Source"
```

#### cloudwatch_logs_source_details

Provide details for the Sumo Logic CloudWatch Logs source. If not provided, then defaults will be used.

For bucket_details (used with Kinesis Firehose Logs Source):

* If `create_bucket` is `false`, provide a name of an existing S3 bucket where you would like to store cw logs. If this is empty, a new bucket will be created.
* If `create_bucket` is `true`, the script creates a bucket, the name of the bucket has to be unique; this is achieved internally by generating a random-id and then post-fixing it to the "aws-observability-" string.

For `lambda_log_forwarder_config` (used with Lambda Log Forwarder):

* Provide your `email_id` to receive alerts. You will receive a confirmation email after the deployment is complete. Follow the instructions in this email to validate the address.
* `IncludeLogGroupInfo`. Set to `true` to include loggroup/logstream values in logs. For AWS Lambda Logs IncludeLogGroupInfo must be set to `true`.
* `logformat`. For Lambda, the value should be set to "Others".
* `log_stream_prefix`. Enter a comma-separated list of logStream name prefixes to filter by logStream. Please note this is separate from a logGroup. This is used to only send certain logStreams within a CloudWatch logGroup(s). LogGroup(s) still need to be subscribed to the created Lambda function.
* `workers`. Number of lambda function invocations for CloudWatch logs source Dead Letter Queue processing.

**Default value:**

```json
{
 "bucket_details": {
   "bucket_name": "aws-observability-random-id",
   "create_bucket": true,
   "force_destroy_bucket": true
 },
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Cloudwatch Logs.",
 "fields": {},
 "lambda_log_forwarder_config": {
   "email_id": "",
   "include_log_group_info": true,
   "log_format": "Others",
   "log_stream_prefix": [],
   "workers": 4
 },
 "source_category": "aws/observability/cloudwatch/logs",
 "source_name": "CloudWatch Logs (Region)"
}
```

**Override Example JSON:**

The following override example sets the `aws-observability-cw-logs` bucket name and the email-id to `bob@company.com`:

```hcl
cloudwatch_logs_source_details = {
 "bucket_details": {
   "bucket_name": "aws-observability-cw-logs",
   "create_bucket": true,
   "force_destroy_bucket": true
 },
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Cloudwatch Logs.",
 "fields": {},
 "lambda_log_forwarder_config": {
   "email_id": "bob@company.com",
   "include_log_group_info": true,
   "log_format": "Others",
   "log_stream_prefix": [],
   "workers": 4
 },
 "source_category": "aws/observability/cloudwatch/logs",
 "source_name": "CloudWatch Logs (Region)"
}
```

#### cloudwatch_logs_source_url

Required if you are already collecting AWS Lambda CloudWatch logs. Provide the existing Sumo Logic AWS Lambda CloudWatch Source API URL. The account, accountid, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```hcl
""
```

**Default value:**

The following is a default example:

```hcl
cloudwatch_logs_source_url=""
```

The following is a specific Source URL example:

```hcl
collect_cloudwatch_logs = "Kinesis Firehose Log Source"
cloudwatch_logs_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9878"
```

### auto_enable_logs_subscription

Subscribe log groups to Sumo Logic Lambda Forwarder. You have the following options:

* `New`. Automatically subscribes new log groups to send logs to Sumo Logic.
* `Existing`. Automatically subscribes existing log groups to send logs to Sumo Logic.
* `Both`. Automatically subscribes new and existing log groups.
* `None`. Skips Automatic subscription.

**Default value:**

```hcl
"Both"
```

**Override Example JSON:**

```hcl
auto_enable_logs_subscription="New"
```

 :::note
 CloudTrail must be enabled for EventBridge to capture `CreateLogGroup` events, since these events are recorded and delivered through CloudTrail.
 :::

### auto_enable_logs_subscription_options

* `filter`. Enter regex for matching logGroups for AWS Lambda only. The regex will check the name. See [Configuring parameters](/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination/#configuringparameters).
* `tags_filter`. Enter comma separated key value pairs for filtering logGroups using tags. Ex KeyName1=string,KeyName2=string. This is optional leave it blank if tag based filtering is not needed. See [Configuring parameters](/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination/#configuringparameters).

**Default value:**

```json
{
 "filter": "apigateway|lambda|rds",
 "tags_filter": ""
}
```

**Override Example JSON:**

The following example includes all log groups that match `"lambda-cloudwatch-logs"`:

```hcl
auto_enable_logs_subscription_options = {
 "filter": "lambda-cloudwatch-logs"
 "tags_filter": "Environment=Production,Application=MyApp"
}
```

### sumologic_existing_collector_details

Provide an existing Sumo Logic Collector ID. See [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

If provided, all the provided sources will be created within the collector. If kept empty, a new Collector will be created and all provided sources will be created within that collector.

**Default value:**

```json
{
 "collector_id": "",
 "create_collector": true
}
```

**Default value:**

```hcl
sumologic_existing_collector_details = {
 "collector_id": "",
 "create_collector": true
}
```

**Override Example JSON:**

```hcl
# Use the same collector created for module production-us-east-1 for the new source module.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id = module.production-us-east-1.sumologic_collector["collector"].id
  }
```

### sumologic_collector_details

Provide details for the Sumo Logic collector. If not provided, then defaults will be used.

The Collector will be created if any new source is created and sumologic_existing_collector_id is empty.

**Default value:**

```json
{
 "collector_name": "AWS Observability (AWS Account Alias) (Account ID)",
 "description": "This collector is created using Sumo Logic terraform AWS Observability module.",
 "fields": {}
}
```

**Override Example JSON:**

The following override example creates a collector with the name "AWS Observability Prod".

```hcl
# Following example is to create a collector with name and description as provided with collector_name and description parameters.
sumologic_collector_details = {
 "collector_name": "AWS Observability Prod",
 "description": "This collector is created using Sumo Logic terraform AWS Observability module.",
 "fields": {}
}
```

### existing_iam_details

Provide an existing AWS IAM role arn value which provides access to Amazon S3 Buckets, AWS CloudWatch Metrics API and Sumo Logic Inventory data. If kept empty, a new IAM role will be created with the required permissions.

For more details on permissions, check the IAM policy tmpl files at /modules/collections/templates folder.

**Default value:**

```json
{
 "create_iam_role": true,
 "iam_role_arn": ""
}
```

**Override Example JSON:**

```hcl
existing_iam_details = {
 "create_iam_role": true,
 "iam_role_arn": ""
}
```

#### wait_for_seconds

Used to delay Sumo Logic source creation. The value is in seconds. This helps persisting IAM role in AWS system.

If the AWS IAM role is created outside of the module, the value can be decreased to 1 second.

**Default value:**

```hcl
180
```

**Default value:**

```hcl
wait_for_seconds = 180
```

### Override app content parameters

In v3.0.0, AWS Observability apps are installed directly into the **Installed Apps** catalog in Sumo Logic using the `sumologic_app` Terraform resource. 
:::note
In v3.0.0, All AWSO apps are now part of Next-Gen Apps in Sumo Logic. As a result, the Personal, Admin Recommended, and Monitors folders have been removed, and per-app monitor enable/disable configuration is no longer available.
:::
The following apps are installed by default:

* Amazon Overview
* Amazon ECS (Without Container Insights and Traces)
* Amazon ECS (With Container Insights and Traces)
* Amazon ElastiCache
* Amazon RDS
* Amazon SNS
* Amazon SQS
* AWS API Gateway
* AWS Application Load Balancer
* AWS Classic Load Balancer
* AWS DynamoDB
* AWS EC2
* AWS Lambda
* AWS Network Load Balancer
* Host Metrics (EC2)

**Default Example:**

```hcl
module "app-module" {
  source                         = "./modules/apps"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url
}
```

**Override Example: Install additional apps**

Use `installation_apps_list` to install apps beyond the defaults. Each entry requires a `uuid`, `name`, `version` (`"latest"` or semantic version such as `"1.0.0"`), and an optional `parameters` map.

For a full list of available apps and their UUIDs, see [local.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/modules/apps/local.tf).

```hcl
module "app-module" {
  source                         = "./modules/apps"
  sumologic_access_id            = var.sumologic_access_id
  sumologic_access_key           = var.sumologic_access_key
  sumologic_environment          = var.sumologic_environment
  sumologic_environment_base_url = var.sumologic_environment_base_url

  installation_apps_list = [
    {
      uuid       = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      name       = "My Custom App"
      version    = "latest"
      parameters = {}
    }
  ]
}
```

The following table lists all available app module parameters. See the [terraform-sumologic-aws-observability/modules/apps/variables.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/modules/apps/variables.tf) file for complete code.

| Parameter | Description | Default |
|:--|:--|:--|
| `sumologic_access_id` | Sumo Logic Access ID. See [Access Keys](/docs/manage/security/access-keys) for information. | Configured in **main.auto.tfvars**. |
| `sumologic_access_key` | Sumo Logic Access Key. See [Access Keys](/docs/manage/security/access-keys) for information. | Configured in **main.auto.tfvars**. |
| `sumologic_environment` | Sumo Logic deployment. See [Sumo Logic endpoints by deployment and firewall security](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for valid values. | Configured in **main.auto.tfvars**. |
| `sumologic_environment_base_url` | Base URL for custom Sumo Logic environments (for example, `https://api.ch.sumologic.com/api/`). If provided, takes precedence over `sumologic_environment`. Leave empty for standard deployments. | `null` |
| `installation_apps_list` | List of additional Sumo Logic apps to install beyond the defaults. Each entry requires `uuid`, `name`, `version` (`"latest"` or `"x.y.z"`), and optional `parameters` map. | `[]` |

## Troubleshooting

This section provides information on how to troubleshoot failures while deploying our AWS Observability Solution using Terraform.

### Python command not found
#### Error Message

```text
python modules/collections/attach_fields_to_source.py
Python: command not found
```
#### Solution
Identify and replace `python` with `python3` in [modules/collections/update_sources.tf](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/modules/collections/update_sources.tf#L12).

### Module not found
#### Error Message

```text
Local-exec provisioner error
Module Not Found Error: No Module named ‘sumologic’
```
#### Solution
Verify you configured [Sumo Logic provider](https://github.com/SumoLogic/terraform-sumologic-aws-observability/blob/master/providers.tf#L1).

### Field or FER already exists
#### Error Message

```text
"errors":[{"code":"field:already_exists","message":"Field with the given name already exists"}]

"errors":[{"code":"fer:invalid_extraction_rule","message":"Invalid Field Extraction Rule","meta":{"reason":"A field extraction rule with name 'AwsObservabilityApiGatewayCloudTrailLogsFER' already exists"}}]
```
#### Solution
Refer to step 4 in this [section](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-terraform/#step-2-configure-the-terraform-script).

### waiting for S3 Bucket Policy (bucket-name) delete
#### Error Message

```text
Error: waiting for S3 Bucket Policy (bucket-name) delete: found resource
```
#### Solution
Run `terraform destroy` again.

### Field with the given id can't be deleted because it is in use
#### Error Message
`"errors":[{"code":"field:cant_be_deleted","message":"Field with the given id can't be deleted because it is in use","meta":{"reason":"Field is used in the Field Extraction Rule"}}]`
#### Solution
Run `terraform destroy` again.


### Hierarchy named 'AWS Observability' already exists
#### Error Message
`"errors":[{"code":"hierarchy:duplicate","message":"hierarchy named 'AWS Observability' already exist"}]`
#### Solution
Delete the existing hierarchy and create a new one:

1. Get a list of existing hierarchies and note the hierarchy ID. For more information, see [Sumo Logic endpoints by deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
   ```bash
   curl -s -H 'Content-Type: application/json' --user <accessid>:<accesskey> -X GET https://<apiendpoint>/api/v1/entities/hierarchies
   ```
1. Delete the existing hierarchy. For more information, see [Sumo Logic endpoints by deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
   ```bash
   curl -s -H 'Content-Type: application/json' --user <accessid>:<accesskey> -X DELETE https://<apiendpoint>/api/v1/entities/hierarchies/<hierarchyid>
   ```

### Cannot import name 'SumoLogic' from 'sumologic'
#### Error Message

```text
from sumologic import SumoLogic
Import Error: cannot import name 'SumoLogic' from 'sumologic'
(/usr/local/lib/python3.10/site-packages/sumologic/__init__.py)
```
#### Solution
The package is [sumologic-sdk](https://pypi.org/project/sumologic-sdk/) and install it for AWS observability solution using the following command:
  ```bash
  pip install sumologic-sdk
  ```
### Invalid IAM role OR AccessDenied
#### Error Message

```text
Invalid IAM role OR AccessDenied
```
#### Solution

- Refer to [Edit, deactivate/activate, rotate, or delete access keys](/docs/manage/security/access-keys/#edit-deactivateactivate-rotate-or-delete-access-keys) for access keys activation.
- Refer to [Prerequisites](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/before-you-deploy/#prerequisites) for permissions related issues.


### Subscription filters are not applied to newly created log groups
#### Error Message
```text
This error can occur when cloudtrail is not enabled for EventBridge to capture `CreateLogGroup` events
```
#### Solution
CloudTrail must be enabled for EventBridge to capture `CreateLogGroup` events, since these events are recorded and delivered through CloudTrail.

### Access logs are not enabled for the Load Balancer
#### Error Message
```text
This error can occur when cloudtrail is not enabled for EventBridge to capture `CreateLoadBalancer` events
```
#### Solution
CloudTrail must be enabled for EventBridge to capture `CreateLoadBalancer` events, since these events are recorded and delivered through CloudTrail.

### Argument named *managed_apps* is not expected
#### Error Message

```text
An argument named managed_apps is not expected here.
Error: Unsupported argument
on .terraform/modules/account.sumo_observability.app-modules/alb_app.tf line 13, in module "alb_module":
managed_apps = {
```
#### Solution
Refer to [this module in GitHub](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-integrations/tree/master/sumologic).

### Argument named *admin_mode* is not expected
#### Error Message

```text
An argument named admin_mode is not expected here.
Error: Unsupported argument
on .terraform/modules/account.sumo_observability/provider.tf line 5, in provider "sumologic":
admin_mode = var.sumologic_folder_installation_location == "Personal folder" ? false:true
```
#### Solution
Sumologic provider [version 3.3.0](https://github.com/SumoLogic/terraform-provider-sumologic/blob/master/CHANGELOG.md#330-aug-11-2026) onwards supports `admin_mode`. Refer to the [`admin_mode` module](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs#authentication).

### Invalid function argument
#### Error Message

```text
Error: Invalid function argument
on.terraform/modules/sumo-module.overview_app.overview_module/sumologic/sumologic.tf line 67, in resource "sumologic_content" "SumoLogicApps":
67: config = file(each.value.content_json)
```
#### Solution
Verify app [JSON location](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability/json) and align your custom Terraform accordingly.