---
id: deploy-with-terraform
title: Deploy with Terraform
sidebar_label: Deploy with Terraform
description: Learn how to deploy AWS Observability Solution using Terraform.
---


These instructions help you deploy our AWS Observability Solution using a Terraform script. 

To set up the AWS Observability solution using Terraform, complete the following steps:

* Step 1: [Set up the Terraform environment](#step-1-set-up-the-terraform-environment)
* Step 2: [Configure the Terraform script](#step-2-configure-the-terraform-script)
* Step 3: [Determine which AWS Account/Regions to Deploy](#step-3-determine-which-aws-accountregions-to-deploy) with a choice of 3 options
* Step 4: [Configure Providers in the main.tf file](#step-4-configure-providers-in-the-maintf-file)
* Step 5: [Override Default Parameter Values](#step-5-override-default-parameter-values)
* Step 6: [Deploy the AWS Observability Solution](#step-6-deploy-the-aws-observability-solution)

Additional parameter overrides are available in an appendix section for [Source](#override-source-parameters) and [App Content](#override-app-content-parameters).

:::note
If you have already set up the solution with CloudFormation in the past and want to move to Terraform, we recommend you follow the below instructions:

1. Start with an existing AWS account and region combination (preferably a non-production dev/test account), delete the AWS Observability CloudFormation stack associated with it, then on-board that account-region combination using Terraform scripts.
1. Once you confirm that the solution has been deployed successfully, you can then repeat the process for additional AWS accounts and regions.
1. By default, the **AWS Observability Apps** folder will be available in the personal library and will be shared with the Sumo org of the user that the Sumo Logic access keys belong to.
:::

## Before you start 

For this setup, complete the following:

1. Set up the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).
1. [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use AWS profiles.
1. To use multiple AWS accounts, [configure AWS account profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for each AWS account you want to deploy the AWS Observability solution. The [AWS account profile names](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) you create will be used in [Step 3: Determine which AWS Account/Regions to Deploy](#step-3-determine-which-aws-accountregions-to-deploy).
1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### About the Solution script

The AWS Observability solution script is organized into the following groups of files and folders:

* Main Configuration file: [main.auto.tfvars](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.auto.tfvars)
* The Resource Creation file [main.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.tf) internally invokes two modules: 
   * **app-module**: This module provides a mechanism to set up all the AWS Observability apps and associated content like Fields, Field Extraction Rules, Metric Rules, apps, monitors and the explore hierarchy in your Sumo Logic account.
   * **source-module**: This module sets up the hosted collector, sources (for logs and metrics) and associated tags to Sumo logic sources as required for the solution.

:::note
Using main.tf, only apps can be installed with the "sumo-module" module by keeping the "collection-module" module commented.
:::

System Files:

* [versions.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/versions.tf): Provides the Terraform block that specifies the required provider version and required Terraform version for this configuration. See [Lock and Upgrade Provider Versions](https://learn.hashicorp.com/tutorials/terraform/provider-versioning) for more information.
* [providers.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/providers.tf): Provides Terraform configurations to declare the providers they require to have Terraform install and use them. See [Providers Configuration Language](https://www.terraform.io/docs/language/providers/index.html) for more information.
* [variables.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/variables.tf): Provides parameters for a Terraform module, allowing aspects of the module to be customized without altering the module's own source code, and allowing modules to be shared between different configurations. See [Input Variables](https://www.terraform.io/docs/language/values/variables.html) for more information.
* [output.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/output.tf): Provides specific return values for a Terraform module. See [Output Values](https://www.terraform.io/docs/language/values/outputs.html) for more information.
* [field.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/field.tf): creates fields and FERs in the Sumo Logic field schema 
* [fields.sh](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/fields.sh): This script imports the existing fields and FERs (required by AWS Observability Solution) already present in your Sumo Logic account.
  
## Step 1: Set up the Terraform environment

Before you run the Terraform script, perform the following actions on a server machine of your choice:

1. Install [Terraform](https://www.terraform.io/) version [0.13.0](https://releases.hashicorp.com/terraform/) or later. To check the installed Terraform version, run the following command:
    ```bash
    $ terraform --version
    ```
1. Install the latest version of [curl](https://curl.haxx.se/download.html). To check the installed curl version, run the following command:
    ```bash
    curl --version
    ```
1. Install [Python](https://www.python.org/) version 3.7 or later.
1. Install the latest version of [jq](https://github.com/stedolan/jq/wiki/Installation) command-line JSON parser. This is required for running the `fields.sh` batch file. To check the installed jq version, run the following command:
    ```bash
    jq --version
    ```
1. Install Sumo Logic Python SDK using the following command. Click [here](https://pypi.org/project/sumologic-sdk/) to learn more.
    ```bash
    pip install sumologic-sdk
    ```

## Step 2: Configure the Terraform script

1. Clone the repository https://github.com/SumoLogic/sumologic-solution-templates:
    ```bash
    $ git clone https://github.com/SumoLogic/sumologic-solution-templates
    ```
1. Initialize the Terraform working directory by navigating to the directory [sumologic-solution-templates/aws-observability-terraform](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform) and running:
    ```bash
    $ terraform init
    ```
    This will install the required Terraform providers, including [Null](https://www.terraform.io/docs/providers/null/index.html), [Sumo Logic Terraform Provider](https://www.terraform.io/docs/providers/sumologic/index.html), [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs), [Time Provider](https://registry.terraform.io/providers/hashicorp/time/latest/docs), [Random Provider](https://registry.terraform.io/providers/hashicorp/random/latest/docs).
    :::note
    Note that templates located at [sumologic-solution-templates/aws-observability-terraform](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform) directory contain references to files from the [sumologic-solution-templates/aws-observability] (https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability) directory.
    :::
1. Configure the following mandatory parameters in the **main.auto.tfvars** file.
   * `sumologic_environment`: This input specifies the Sumo Logic deployment that you want to use. Refer to the [Sumo Logic Deployment](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) guide for a list of available deployments. Possible values include `au`, `ca`, `de`, `eu`, `jp`, `us2`, `in`, `fed`, or `us1`.
   * `sumologic_access_id`: This input specifies the Sumo Logic access ID that you want to use. For more information on how to obtain an access ID, refer to the [Access Keys](/docs/manage/security/access-keys) documentation.
   * `sumologic_access_key`: [Sumo Logic Access Key](/docs/manage/security/access-keys) is used for Sumo Logic API calls.
   * `sumologic_organization_id`: [Sumo Logic Organization ID](../../../get-started/account-settings-preferences.md) You can find your org on the Preferences page in the Sumo Logic UI. For more information, see [Preferences Page](../../../get-started/account-settings-preferences.md). Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources.
   * `aws_account_alias`: The Name/Alias for the AWS environment from which you are collecting data. This name will appear in the Sumo Logic Explorer View, metrics, and logs. Please leave this blank if you are going to deploy the solution in multiple AWS accounts. Do not include special characters in the alias.
    :::note
    See the [variables.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/variables.tf) file and README in that folder for configuration information with permissible values for these variables. 
    :::
1. As part of configuring the AWS Observability solution, we need to [create fields and FERs](resources.md) in Sumo Logic org. To import any fields and or FERs that are already present in the Sumo Logic org into our Terraform state, we need to run a script. To do so, navigate to the **sumologic-solution-templates/aws-observability-terraform** folder and do the following:
   * Set the following environment variables using the commands below:
    ```bash
    export SUMOLOGIC_ENV="YOUR_SUMOLOGIC_DEPLOYMENT"
    export SUMOLOGIC_ACCESSID="YOUR_SUMOLOGIC_ACCESS_ID"
    export SUMOLOGIC_ACCESSKEY="YOUR_SUMOLOGIC_ACCESS_KEY"
    ```
    Provide your Sumo Logic deployment for the SUMOLOGIC_ENV variable. For example: au, ca, de, eu, jp, us2, in, fed or us1. For more information on Sumo Logic deployments, see *Sumo Logic Endpoints and Firewall Security*. 
   * Run fields.sh using this command:
      ```bash
      $ sh fields.sh
      ```

:::important
Going forward, do not modify these fields outside of Terraform.
:::

## Step 3: Determine which AWS Account/Regions to Deploy

You have three options to configure the AWS Account/Region:

* [Option 1: Deploy to a single AWS account and region](#option-1-deploy-to-a-single-aws-account-and-region)
* [Option 2: Deploy to Multiple Regions within an AWS account](#option-2-deploy-to-multiple-regions-within-an-aws-account)
* [Option 3: Deploy to multiple AWS accounts and regions](#option-3-deploy-to-multiple-aws-accounts-and-regions)

This section details how to connect the [AWS account profile(s)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) you set up in your AWS account(s) in a **providers.tf** file, which will be used to authenticate with your AWS account(s).

### Option 1: Deploy to a single AWS account and region 

To deploy the AWS Observability Solution for one AWS account and region combination **based on an AWS account profile defined in the AWS CLI**, configure providers in the **providers.tf** file.

In the **providers.tf** file, create a provider for the AWS region you want to monitor AWS services for. This provider will be associated with a profile from the AWS CLI that is associated with an AWS account.

The Terraform script uses "us-east-1" and the active AWS CLI profile by default. If you want to use a different region or another AWS CLI profile, change the **providers.tf** file as shown in the below. Provide an alias that tells Terraform how to identify this account-region
combination.

**Task:** Example collection setup for the us-east-2 region and for the production AWS account profile.

```bash title="Collection Set Up"
# Region us-east-2, for AWS Account profile production
provider "aws" {
  profile = "production"
  region  = "us-east-2"
  alias   = "production-us-east-2"
}
```

### Option 2: Deploy to Multiple Regions within an AWS account

Use this option to install the AWS Observability Solution for multiple regions within a given AWS account. To do so, add providers for each AWS region in the **providers.tf** as shown below.

#### Provide alias for account-region
Given that we have multiple providers, we need to provide an alias that tells Terraform how to identify each account-region combination. 

1. Comment out the existing provider information in **providers.tf**.

    ```bash title="Comment out using #"
    #provider "aws" {
    #  region = "us-east-1"
    #
    # Below properties should be added when you would like to onboard more than one region and account
    # More Information regarding AWS Profile can be found at -
    #
    # Access configuration
    #
    # profile = <Provide a profile as setup in AWS CLI>
    #
    # Terraform alias
    #
    # alias = <Provide a terraform alias for the aws provider. For eg :- production-us-east-1>
    #}
    ```

    :::note
    Do not change or remove the provider **"sumologic"** section:

    ```bash
    provider "sumologic" {
    environment = var.sumologic_environment
    access_id   = var.sumologic_access_id
    access_key  = var.sumologic_access_key
    admin_mode  = var.sumologic_folder_installation_location == "Personal Folder" ? false : true
    }
    ```
    :::

    `admin_mode` with true value will install the app under **Admin Recommended** folder, and admin_mode with false value will install app in **Personal** folder

    `admin_mode` value is automatically set based on the variable "`sumologic_folder_installation_location`" which can be overridden at main.tf

2. Add a provider for each region, replacing the placeholder content that matches your AWS CLI account profile, AWS region of choice and an alias that tells Terraform how to identify this account-region combination.

    :::note
    The AWS CLI Account profile will be the same across all regions.
    :::

    ```bash title="Add provider per region"
    # AWS Account profile <AWS_PROFILE_NAME>, Region <REGION>, Alias <ALIAS>
    provider "aws" {
    profile = "<AWS_PROFILE_NAME>"
    region  = "<REGION>"
    alias   = "<ALIAS>"
    }
    ```

    **Example:** Example provider configuration for a production AWS account profile in us-east-1 and us-east-2 regions with the appropriate aliases.

    ```bash title="Example configuration"
    # AWS Account profile production, Region us-east-1, Alias production-us-east-1
    provider "aws" {
    profile = "production"
    region  = "us-east-1"
    alias   = "production-us-east-1"
    }
    # AWS Account profile production, Region us-east-2, Alias production-us-east-2
    provider "aws" {
    profile = "production"
    region  = "us-east-2"
    alias   = "production-us-east-2"
    }
    ```

#### Add output code to output.tf

To see the output messages showing you the deployment process, add output code in the **output.tf** file for each module you added in the later step ([Step 4](#step-4-configure-providers-in-the-maintf-file)) in the **main.tf**.

:::note
Do not change the **output "Apps"** section.

```bash title="Output Apps"
output "Apps" {
  value       = module.sumo-module
  description = "All outputs related to apps."
}
```
:::

1. Add this output code for each module added in the earlier step at the **main.tf** file, replacing the placeholder module name:

    ```bash title="Output code for each module"
    output "<ALIAS>" {
    value       = module.<ALIAS>
    description = "All outputs related to collection and sources."
    }
    ```

    **Example:** Example output configuration for modules with module names production-us-east-1 and production-us-east-2:

    ```bash title="Example out configuration"
    output "production-us-east-1" {
    value       = module.production-us-east-1
    description = "All outputs related to collection and sources."
    }

    output "production-us-east-2" {
    value       = module.production-us-east-2
    description = "All outputs related to collection and sources."
    }
    ```

### Option 3: Deploy to multiple AWS accounts and regions

Use this option to install the AWS Observability Solution for multiple accounts and regions.

Add providers for each AWS account/region combination and configure outputs as shown in the following sections.

#### Provide Alias each account-region
Given that we have multiple providers, we need to provide an alias that tells Terraform how to identify each account-region combination.

1. Comment out the existing provider information in **providers.tf**.

    ```bash title="Comment out the following using #"
    #provider "aws" {
    #  region = "us-east-1"
    #
    # Below properties should be added when you would like to onboard more than one region and account
    # More Information regarding AWS Profile can be found at -
    #
    # Access configuration
    #
    # profile = <Provide a profile as setup in AWS CLI>
    #
    # Terraform alias
    #
    # alias = <Provide a terraform alias for the aws provider. For eg :- production-us-east-1>
    #}
    ```

    :::note
    Do not change the **output "sumologic"** section.

    ```bash title="Output sumologic"
    provider "sumologic" {
    environment = var.sumologic_environment
    access_id   = var.sumologic_access_id
    access_key  = var.sumologic_access_key
    admin_mode  = var.sumologic_folder_installation_location == "Personal Folder" ? false : true
    }
    ```

    `admin_mode` with true value will install the app under **Admin Recommended** folder, and admin_mode with false value will install app in **Personal** folder

    `admin_mode` value is automatically set based on the variable "`sumologic_folder_installation_location`" which can be overridden at **main.tf**.

2. Add a provider code sample for each account-region combination, replacing the placeholder content for your AWS CLI account profile, AWS region of choice, and an alias that tells Terraform how to identify this account-region combination:

    :::note
    The AWS CLI Account profile has to be the same across all regions.
    :::

    ```bash title="Add provider for each account-region"
    # Region <REGION>, AWS Account profile <AWS_PROFILE_NAME>, Alias <ALIAS>
    provider "aws" {
    profile = "<AWS_PROFILE_NAME>"
    region  = "<REGION>"
    alias   = "<ALIAS>"
    }
    ```

    **Example:** Example provider configuration for the production AWS account profile in the us-east-1 and us-east-2 regions and a development AWS account profile in the  us-west-1 region with the appropriate aliases.

    ```bash title="Example out configuration"
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

#### Add collection of output code in output.tf
To see the output messages showing you the provisioning process, add a collection of output code in the output.tf file for each module you added in the later step ([Step 4](#step-4-configure-providers-in-the-maintf-file)) in the main.tf.

:::note
Do not change the output "Apps" section.

```bash title="Output Apps"
output "Apps" {
  value       = module.sumo-module
  description = "All outputs related to apps."
}
```
:::

1. Add this output code for each module added in the earlier step at the main.tf file, replacing the placeholder module name.

    ```bash title="Add Alias per module"
    output "<ALIAS>" {
    value       = module.<ALIAS>
    description = "All outputs related to collection and sources."
    }
    ```

    **Example:** Example output configuration for modules with module names production-us-east-1, production-us-east-2 and development-us-west-1.

    ```bash title="Example out configuration"
    output "production-us-east-1" {
    value       = module.production-us-east-1
    description = "All outputs related to collection and sources."
    }

    output "production-us-east-2" {
    value       = module.production-us-east-2
    description = "All outputs related to collection and sources."
    }

    output "development-us-west-1" {
    value       = module.development-us-west-1
    description = "All outputs related to collection and sources."
    }
    ```

## Step 4: Configure Providers in the main.tf file

Configure providers for collection using the Terraform source-module.

1. Comment out the existing module "collection-module" section present in the **main.tf**.

    Comment out the following code with #:

    ```bash
    #module "collection-module" {
    #  source = "./source-module"

    #  aws_account_alias         = var.aws_account_alias
    #  sumologic_organization_id  = var.sumologic_organization_id
    #  access_id                 = var.sumologic_access_id
    #  access_key                = var.sumologic_access_key
    #  environment               = var.sumologic_environment  
    #}
    ```

    :::note
    Do not change the module "**sumo-module**" section unless you want to override.

    ```bash
    module "sumo-module" {
    source                   = "./app-modules"
    access_id                = var.sumologic_access_id
    access_key               = var.sumologic_access_key
    environment              = var.sumologic_environment
    JSON_file_directory_path = dirname(path.cwd)
    folder_installation_location = var.sumologic_folder_installation_location
    folder_share_with_org    = var.sumologic_folder_share_with_org
    sumologic_organization_id = var.sumologic_organization_id
    }
    ```
    :::

1. Add this module code sample in the **main.tf** file for the **first region provider** configured in the **providers.tf** file, replacing the placeholder content with provider aliases.

    The `aws_account_alias` differs depending on [Single Account](#single-account) or [Multiple Accounts](#multiple-accounts). See the following examples.

    ```
    module "<ALIAS>" {
    source = "./source-module"
    providers = { aws = aws.<ALIAS> }

    aws_account_alias = <var.aws_account_alias OR "account alias">
    sumologic_organization_id = var.sumologic_organization_id
    access_id    = var.sumologic_access_id
    access_key   = var.sumologic_access_key
    environment  = var.sumologic_environment

    }
    ```

### Single Account
Example module configuration for single account and multiple region config:

Here we have a **production** AWS account profile in **us-east-1** and **us-east-2** regions with the provider aliases production-us-east-1 and production-us-east-2.

* Since this is a single account, we can use the global account alias which is defined in **var.aws_account_alias**.
* A hosted collector is created per AWS account. If you deploy the solution for multiple regions in the same AWS account, you should use the same collector that was created for the first region of the AWS account and for each subsequent region module as shown in the code.

```
module "production-us-east-1" {
  source = "./source-module"
  providers = { aws = aws.production-us-east-1 }

  aws_account_alias = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  access_id    = var.sumologic_access_id
  access_key   = var.sumologic_access_key
  environment  = var.sumologic_environment
}

module "production-us-east-2" {
  source = "./source-module"
  providers = { aws = aws.production-us-east-2 }

  aws_account_alias = var.aws_account_alias
  sumologic_organization_id = var.sumologic_organization_id
  access_id    = var.sumologic_access_id
  access_key   = var.sumologic_access_key
  environment  = var.sumologic_environment  

# Use the same collector created for the first region of the production account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id = module.production-us-east-1.sumologic_collector["collector"].id
  }
}
```

### Multiple Accounts

Example module configuration for configuring multiple accounts in multiple regions:

Here we have a **production** AWS account profile in **us-east-1** and **us-east-2** regions with the provider aliases production-us-east-1 and production-us-east-2 and a **development** AWS account profile in **us-west-1** with the provider alias development-us-west-1.

* In this case the AWS Account alias for each account/region module needs to be specified within the module via the parameter **aws_account_alias**. The variable **var.aws_account_alias** is not used in this case.
* A hosted collector is created per AWS account. If you deploy the solution for multiple regions in the same account, you should use the same collector that was created for the first region of the account for each subsequent region module as shown in the code.
* For each new AWS account, ensure you create a new hosted collector for first region and then reuse the same collector created within given AWS account for subsequent regions.

```
module "production-us-east-1" {
  source = "./source-module"
  providers = { aws = aws.production-us-east-1 }

  aws_account_alias = "production-us-east-1"
  sumologic_organization_id = var.sumologic_organization_id
  access_id    = var.sumologic_access_id
  access_key   = var.sumologic_access_key
  environment  = var.sumologic_environment
}

module "production-us-east-2" {
  source = "./source-module"
  providers = { aws = aws.production-us-east-2 }

  aws_account_alias = "production-us-east-1"
  sumologic_organization_id = var.sumologic_organization_id
  access_id    = var.sumologic_access_id
  access_key   = var.sumologic_access_key
  environment  = var.sumologic_environment

# Use the same collector created for the first region of the production account.
  sumologic_existing_collector_details = {
    create_collector = false
    collector_id = module.production-us-east-1.sumologic_collector["collector"].id
  }
}

module "development-us-west-1" {
  source = "./source-module"
  providers = { aws = aws.development-us-west-1}

  aws_account_alias = "development-us-west-1"
  sumologic_organization_id = var.sumologic_organization_id
  access_id    = var.sumologic_access_id
  access_key   = var.sumologic_access_key
  environment  = var.sumologic_environment
}
```

## Step 5: Override Default Parameter Values

By default, all other parameters are set up to automatically collect logs, metrics, install apps and monitors. If you need to override parameters, you can configure or override additional parameters in the [sumologic-solution-templates/aws-observability-terraform/main.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.tf) file for Collection and app parameters. To perform overrides, see [Override Collection Parameters](#override-source-parameters) and [Override Content Parameters](#override-app-content-parameters).

## Step 6: Deploy the AWS Observability Solution

Deploy the AWS Observability Solution using the Sumo Logic Terraform Script.

Navigate to the directory **sumologic-solution-templates/aws-observability-terraform** and execute the following commands:

:::note
Before you run these commands, make sure you have configured your AWS profiles on your system as mentioned in the [Before You Start](#before-you-start) section.
:::

```terminal
$ terraform validate
$ terraform plan
$ terraform apply
```

## Uninstalling the Solution

To uninstall the AWS Observability solution deployed using Terraform, navigate to the directory **sumologic-solution-templates/aws-observability-terraform** and execute the command:

```terminal
$ terraform destroy
```

This will destroy all [resources](resources.md) and configuration previously set up.

## Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform

To migrate CloudWatch Source to Kinesis Firehose Source using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-using-terraform).

## Appendix

### Override Source Parameters

Source Parameters define how collectors and their sources are set up in Sumo Logic. If needed, override the desired parameter in the module that you defined earlier for each AWS account and region in the **sumologic-solution-templates/aws-observability-terraform/main.tf** file. 

The following examples override the following:

* Example 1 overrides the `cloudtrail_source_details` parameter to collect CloudTrail logs from a user-provided s3 bucket. CloudTrail logs are already stored in the user-provided s3 bucket. The default parameter will always create new S3 buckets, forward CloudTrail logs to it and collect CloudTrail logs from the newly created s3 bucket.
* Example 2 overrides the `auto_enable_access_logs` variable to skip automatic access log enablement for an Application Load Balancer resource. By default, it is set to "Both", which automatically enables access logging for new and existing ALB resources.

**Default example:**

```bash
module "collection-module" {
 source = "./source-module"
 aws_account_alias         = var.aws_account_alias
 sumologic_organization_id = var.sumologic_organization_id
 access_id    = var.sumologic_access_id
 access_key   = var.sumologic_access_key
 environment  = var.sumologic_environment
}
```

**Override Example 1: Override the cloudtrail_source_details parameter**

Override the `cloudtrail_source_details` parameter to collect CloudTrail logs from a user-provided s3 bucket. CloudTrail logs in this case are already stored in the user-provided s3 bucket.

```bash
module "collection-module" {
 source = "./source-module"
 aws_account_alias         = var.aws_account_alias
 sumologic_organization_id = var.sumologic_organization_id
 access_id    = var.sumologic_access_id
 access_key   = var.sumologic_access_key
 environment  = var.sumologic_environment
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
}
```

**Override Example 2: Override the auto_enable_access_logs parameter**

Override the **auto_enable_access_logs** parameter (set to None) to automatically skip enable access logging for an Application Load Balancer.

```bash
module "collection-module" {
 source = "./source-module"
 aws_account_alias         = var.aws_account_alias
 sumologic_organization_id = var.sumologic_organization_id
 access_id    = var.sumologic_access_id
 access_key   = var.sumologic_access_key
 environment  = var.sumologic_environment
 auto_enable_access_logs = None
}
```

The following table provides a list of all source parameters and their default values. See the [sumologic-solution-templates/aws-observability-terraform/source-module/variables.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/source-module/variables.tf) file for complete code.

### Configure collection of CloudWatch metrics

:::note
To migrate CloudWatch Metrics Source to Kinesis Firehose Metrics Source using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-using-terraform).
:::

#### collect_cloudwatch_metrics

Select the kind of CloudWatch Metrics Source to create.

Options available are:

* "CloudWatch Metrics Source". Creates Sumo Logic AWS CloudWatch Metrics Sources.
* "Kinesis Firehose Metrics Source" (Recommended). Creates a Sumo Logic AWS Kinesis Firehose for Metrics Source. This new source has cost and performance benefits over the CloudWatch Metrics Source and is therefore recommended.
* "None". Skips the Installation of both the Sumo Logic Metric Sources.

**Default Value: **

```bash
"Kinesis Firehose Metrics Source"
```

**Default JSON:**

```bash
collect_cloudwatch_metric = "Kinesis Firehose Metrics Source"
```

#### cloudwatch_metrics_source_details

Provide details for the Sumo Logic CloudWatch Metrics source. If not provided, then defaults will be used.

* `limit_to_namespaces`. Enter a comma-delimited list of the namespaces which will be used for both AWS CloudWatch Metrics Source.

Supported namespaces are based on the type of CloudWatch Metrics Source you have selected above. See the relevant docs for the [Kinesis Firehose Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) and the [CloudWatch Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics) for details on which namespaces they support.

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
 "source_category": "aws/observability/cloudwatch/metrics",
 "source_name": "CloudWatch Metrics (Region)"
}
```

**Override Example JSON:**

The following override example collects only DynamoDB and Lambda namespaces with source_category set to `"aws/observability/cloudwatch/metrics/us-east-1"`:

```json
Cloudwatch_metrics_source_details = {
 "bucket_details": {
   "bucket_name": "",
   "create_bucket": true,
   "force_destroy_bucket": true
 },
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Cloudwatch metrics.",
 "fields": {},
 "limit_to_namespaces": [
   "AWS/DynamoDB",
   "AWS/Lambda"
  ],
 "source_category": "aws/observability/cloudwatch/metrics/us-east-1",
 "source_name": "CloudWatch Metrics us-east-1"
}
```

#### cloudwatch_metrics_source_url

Use this parameter if you are already collecting CloudWatch Metrics and want to use an existing Sumo Logic Collector Source. You need to provide the URL of the existing Sumo Logic CloudWatch Metrics Source. If the URL is for a AWS CloudWatch Metrics source, the "account" and "accountid" metadata fields will be added to the Source. If the URL is for the Kinesis Firehose for Metrics source, the "account" field will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```
""
```

**Override Example JSON:**

The following is a default example:

```json
cloudwatch_metrics_source_url=""
```


The following is a specific Source URL example:

```bash
collect_cloudwatch_metrics = "Kinesis Firehose Metrics Source"
cloudwatch_metrics_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9876"
```

#### Configure collection of Application Load Balancer Access Logs

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

```bash
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

Enable Application Load Balancer (ALB)  Access logging.

You have the following options:

* `New`. Automatically enables access logging for newly created ALB resources to collect logs for ALB resources. This does not affect ALB resources already collecting logs.
* `Existing`. Automatically enables access logging for existing ALB resources to collect logs for ALB resources.
* `Both`. Automatically enables access logging for new and existing ALB resources.
* `None`. Skips Automatic access Logging enable for ALB resources.

**Default value:**

```
"Both"
```

**Override Example JSON:**

Example JSON for newly created ALB resources only.

```json
auto_enable_access_logs = "New"
```

#### elb_log_source_url

Required if you are already collecting ALB logs. Provide the existing Sumo Logic ALB Source API URL. The account, accountid, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```
""
```

**Override Example JSON:**

The following is a default example:

```
elb_log_source_url=""
```

The following is a specific Source URL example:

```
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

```
true
```

**Override Example JSON:**

```
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

```bash
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

```
"Both"
```

**Override Example JSON:**

Example JSON for newly created ALB resources only.

```
auto_enable_classic_lb_access_logs = "New"
```

#### classic_lb_log_source_url

Required if you are already collecting Classic LB logs. Provide the existing Sumo Logic Classic LB Source API URL. The account, accountid, region and namespace fields will be added to the Source. For information on how to determine the URL, see [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration).

**Default value:**

```
""
```

**Examples:**

The following is a [default example](https://github.com/SumoLogic/sumologic-solution-templates/tree/npande_qtr_4/aws-observability-terraform/source-module#input_classic_lb_log_source_url):

```
classic_lb_log_source_url=""
```

The following is a specific Source URL example:

```
collect_classic_lb_logs = true
classic_lb_log_source_url="https://api.sumologic.com/api/v1/collectors/1234/sources/9879"
```

### Configure collection of CloudTrail logs

:::note
To migrate CloudWatch Logs Source to Kinesis Firehose Logs Source using Terraform, refer to [Migration Strategy using Terraform](/docs/observability/aws/deploy-use-aws-observability/migration-strategy-using-terraform).
:::

#### collect_cloudtrail_logs

Create a Sumo Logic CloudTrail Logs Source. You have the following options:

* `true`. Ingest CloudTrail logs into Sumo Logic. Creates a Sumo Logic CloudTrail Log Source that collects CloudTrail logs from an existing bucket or new bucket. If true, configure "cloudtrail_source_details" to ingest CloudTrail logs.
* `false`. You are already ingesting CloudTrail logs into Sumo Logic.

When enabling CloudTrail logs setting to `true`, you need to provide [cloudtrail_source_details](#cloudtrail_source_details) with configuration information.

**Default value:**

```
true
```

**Example JSON:**

```
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

**Default JSON:**

The following override example uses the bucket `"aws-observability-logs"` with path expression `"*AWSLogs/*/CloudTrail/*/*"` path expression:

```bash
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

```
""
```

**Example JSON:**

The following is a default example:

```
cloudtrail_source_url=""
```

The following is a specific Source URL example:

```
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

```
"Kinesis Firehose Log Source"
```

**Default JSON:**

```
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

```
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

```
""
```

**Default JSON:**

The following is a default example:

```
cloudwatch_logs_source_url=""
```

The following is a specific Source URL example:

```
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

```
"Both"
```

**Override Example JSON:**

```
auto_enable_logs_subscription="New"
```

### auto_enable_logs_subscription_options

`filter`. Enter regex for matching logGroups for AWS Lambda only. The regex will check the name. See [Configuring Parameters](/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination).

**Default value:**

```json
{
 "filter": "lambda"
}
```

**Default JSON:**

The following example includes all log groups that match `"lambda-cloudwatch-logs"`:

```
auto_enable_logs_subscription_options = {
 "filter": "lambda-cloudwatch-logs"
}
```

### collect_root_cause_data

Select the Sumo Logic Root Cause Explorer Source.

You have the following options:

* `Inventory Source`. Creates a Sumo Logic Inventory Source used by Root Cause Explorer.
* `Xray Source`. Creates a Sumo Logic AWS X-Ray Source that collects X-Ray Trace Metrics from your AWS account.
* `Both`. Install both Inventory and Xray sources.
* `None`. Skips installation of both sources.

**Default value:**

```
"both"
```

**Override Example JSON:**

```
collect_root_cause_data = "Inventory Source"
```

### inventory_source_details
Provide details for the Sumo Logic AWS Inventory source. If not provided, then defaults will be used.

**Default value:**

```json
{
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS inventory metadata.",
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
   "AWS/SNS",
   "AWS/AutoScaling"
 ],
 "source_category": "aws/observability/inventory",
 "source_name": "AWS Inventory (Region)"
}
```

**Override Example JSON:**

The following override example limits to DynamoDB and Lambda namespaces.

```
inventory_source_details = {
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS inventory metadata.",
 "fields": {},
 "limit_to_namespaces": [
   "AWS/DynamoDB",
   "AWS/Lambda"   
 ],
 "source_category": "aws/observability/inventory",
 "source_name": "AWS Inventory (Region)"
}
```

### xray_source_details

Provide details for the Sumo Logic AWS XRAY source. If not provided, then defaults will be used.

**Default value:**

```json
{
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Xray metrics.",
 "fields": {},
 "source_category": "aws/observability/xray",
 "source_name": "AWS Xray (Region)"
}
```

**Override Example JSON:**

The following override example calls out the source_name.

```
xray_source_details = {
 "description": "This source is created using Sumo Logic terraform AWS Observability module to collect AWS Xray metrics.",
 "fields": {},
 "source_category": "aws/observability/xray",
 "source_name": "Xray us-west-2"
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

**Default JSON:**

```
sumologic_existing_collector_details = {
 "collector_id": "",
 "create_collector": true
}
```

**Override Example JSON:**

```
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

```
# Following example is to create a collector with name and description as provided with collector_name and description parameters.
sumologic_collector_details = {
 "collector_name": "AWS Observability Prod",
 "description": "This collector is created using Sumo Logic terraform AWS Observability module.",
 "fields": {}
}
```

### existing_iam_details

Provide an existing AWS IAM role arn value which provides access to Amazon S3 Buckets, AWS CloudWatch Metrics API and Sumo Logic Inventory data. If kept empty, a new IAM role will be created with the required permissions.

For more details on permissions, check the IAM policy tmpl files at /source-module/templates folder.

**Default value:**

```json
{
 "create_iam_role": true,
 "iam_role_arn": ""
}
```

**Override Example JSON:**

```
existing_iam_details = {
 "create_iam_role": true,
 "iam_role_arn": ""
}
```

#### wait_for_seconds

Used to delay Sumo Logic source creation. The value is in seconds. This helps persisting IAM role in AWS system.

If the AWS IAM role is created outside of the module, the value can be decreased to 1 second.

**Default value:**

```
180
```

**Default JSON:**

```
wait_for_seconds = 180
```

## Override App Content Parameters

As needed, override the app content parameters to configure how the AWS Observability app dashboards and alerts are installed in your Sumo Logic account. Enter the overrides in the **sumologic-solution-templates/aws-observability-terraform/main.tf**
file. 

The following is an example of the default value and override for app parameters:

**Default Example:**

Parameters will take default values as defined under the default column.

This installs the following:

* Apps: AWS EC2, Host Metrics EC2, AWS Application Load Balancer, Amazon RDS, AWS API Gateway, AWS Lambda, Amazon DynamoDB, AWS ECS, Amazon ElastiCache, AWS NLB, Amazon SNS, and Amazon SQS.
  * Default location: "AWS Observability Apps" Personal folder in Sumo Logic
* Alerts for the AWS Observability Solution
  * Default location: "AWS Observability Monitors" folder of the Monitors folder

```
module "sumo-module" {
 source                   = "./app-modules"
 access_id                = var.sumologic_access_id
 access_key               = var.sumologic_access_key
 environment              = var.sumologic_environment
 json_file_directory_path = dirname(path.cwd)
 folder_installation_location = var.sumologic_folder_installation_location
 folder_share_with_org    = var.sumologic_folder_share_with_org
 sumologic_organization_id = var.sumologic_organization_id
}
```

**Override Example:**

For this example, overriding the name of App folder, name of Monitor folder, enabling alerts for ALB, EC2 and send notification as email.

```
module "sumo-module" {
 source                   = "./app-modules"
 access_id                = var.sumologic_access_id
 access_key               = var.sumologic_access_key
 environment              = var.sumologic_environment
 json_file_directory_path = dirname(path.cwd)

 folder_installation_location = var.sumologic_folder_installation_location
 folder_share_with_org    = var.sumologic_folder_share_with_org
 sumologic_organization_id = var.sumologic_organization_id
 apps_folder_name         = "AWS Observability Apps myCustom"
 monitors_folder_name     = "AWS Observability Monitors myCustom"
 apigateway_monitors_disabled  = false
 ec2metrics_monitors_disabled  = false
 email_notifications = [
   {
     connection_type       = "Email",
     recipients            = ["abc@example.com"],
     subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
     time_zone             = "PST",
     message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
     run_for_trigger_types = ["Critical", "ResolvedCritical"]
   }
 ]
}
```

**Override Example:**

For this example, overriding the default folder installation location to `"Admin Recommended Folder"` and disabling folder sharing.

```
module "sumo-module" {
 source                   = "./app-modules"
 access_id                = var.sumologic_access_id
 access_key               = var.sumologic_access_key
 environment              = var.sumologic_environment
 JSON_file_directory_path = dirname(path.cwd)
 folder_installation_location = "Admin Recommended Folder"
 folder_share_with_org    = false
 sumologic_organization_id = var.sumologic_organization_id
}
```

The following table provides a list of all source parameters and their default values. See the [sumologic-solution-templates/aws-observability-terraform/app-module/main.auto.tfvars](http://sumologic-solution-templates/aws-observability-terraform/app-module/main.auto.tfvars) file for complete code.

| Parameter | Description | Default |
|:--|:--|:--|
| `access_id` | Sumo Logic Access ID. See [Access Keys](/docs/manage/security/access-keys) for information. Ignore this setting if you entered it in Source Parameters.	| Ignore if already configured in **main.auto.tfvars** file. |
| `access_key` | Sumo Logic Access Key. See [Access Keys](/docs/manage/security/access-keys) for information. Ignore this setting if you entered it in Source Parameters. | Ignore if already configured in main.auto.tfvars file.
| `environment` | Enter au, ca, de, eu, jp, us2, in, fed, or us1. See Sumo Logic Endpoints and Firewall Security for information. Ignore this setting if you entered it in Source Parameters. | Ignore if already configured in main.auto.tfvars file. |
| `sumologic_organization_id` | You can find your org on the Preferences page in the Sumo Logic UI. For more information, see the Preferences Page topic. Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources." See Preferences Page. | Ignore if already configured in main.auto.tfvars file. |
| `apps_folder_name` | Provide a folder name where all the apps will be installed under your Personal folder. Default value is "AWS Observability Apps". | `"AWS Observability Apps"`  |
| `monitors_folder_name` | Provide a folder name where all the monitors will be installed under the Personal folder of the user whose access keys you have entered. Default value will be "AWS Observability Monitors". | `"AWS Observability Monitors"` |
| `folder_installation_location` | Indicates where to install the app folder. Enter "Personal Folder" for installing in the "Personal" folder and "Admin Recommended Folder" for installing in "Admin Recommended" folder. | `"Personal Folder"` |
| `folder_share_with_org` | Indicates if "AWS Observability App" folder should be shared with the entire organization. true to enable sharing; false to disable sharing. | `true` |
| `alb_monitors_disabled` | Indicates if the ALB Apps monitors should be enabled or disabled. | `true` |
| `apigateway_monitors_disabled` | Indicates if the API Gateway Apps monitors should be enabled or disabled. | `true` |
| `sns_monitors_disabled` | Indicates if the SNS Apps monitors should be enabled | `true` |
| `sqs_monitors_disabled` | Indicates if the SQS Apps monitors should be enabled | `true` |
| `dynamodb_monitors_disabled` | Indicates if the DynamoDB Apps monitors should be enabled or disabled. | `true` |
| `ec2metrics_monitors_disabled` | Indicates if the EC2 Metrics Apps monitors should be enabled or disabled. | `true` |
| `ecs_monitors_disabled` | Indicates if the ECS Apps monitors should be enabled or disabled. | `true` |
| `elasticache_monitors_disabled` | Indicates if the ElastiCache Apps monitors should be enabled or disabled. | `true` |
| `lambda_monitors_disabled` | Indicates if the Lambda Apps monitors should be enabled or disabled. | `true` |
| `nlb_monitors_disabled` | Indicates if the NLB Apps monitors should be enabled or disabled. | `true` |
| `rds_monitors_disabled` | Indicates if the RDS Apps monitors should be enabled or disabled. | `true` |
| `group_notifications` | Indicates if individual items that meet trigger conditions should be grouped. Defaults to `true`.	 | `true` |
| `email_notifications`	Email Notifications to be sent by the alert. | `[ ]` |
| `connection_notifications` | Connection Notifications to be sent by the alert. | `[ ]` |
| `parent_folder_id` | The folder ID is automatically generated. Do not enter a value for this parameter. This is the folder ID to install the apps into. A folder using the provided name will be added in "apps_folder_name". If the folder ID is empty, apps will be installed in the Personal folder. | Ignore this parameter. |

## Troubleshooting

This section provides information on how to troubleshoot failures while deploying our AWS Observability solution using Terraform.

### Python command not found
#### Error Message

```
python source-module/attach_fields_to_source.py
Python: command not found
```
#### Solution
Identify and replace `python` with `python3` in [source-module/update_sources.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/AWSO_FY23Q4_Release/aws-observability-terraform/source-module/update_sources.tf#L12).

### Module not found
#### Error Message

```
Local-exec provisioner error
Module Not Found Error: No Module named ‘sumologic’
```
#### Solution
Verify you configured [Sumo Logic provider](https://github.com/SumoLogic/sumologic-solution-templates/blob/AWSO_FY23Q4_Release/aws-observability-terraform/providers.tf#L1).

### Hierarchy named 'AWS Observability' already exist
#### Error Message
`"errors":[{"code":"hierarchy:duplicate","message":"hierarchy named 'AWS Observability' already exist"}]`
#### Solution
Delete existing hierarchy and a create new one:<br/>
1. Get Hierarchy-id list of existing hierarchies and keep it noted.<br/>
  ```sql
  curl -s -H 'Content-Type: application/json' --user <accessid>:<accesskey> -X GET https://<apiendpoint>/api/v1/entities/hierarchies
  ```
1. Delete the existing Hierarchy. Learn [more](https://help.sumologic.com/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for apiendpoint.<br/>
  ```sql
  curl -s -H 'Content-Type: application/json' --user <accessid>:<accesskey> -X DELETE https://<apiendpoint>/api/v1/entities/hierarchies/<hierarchyid>`
  ```

### Cannot import name 'SumoLogic' from 'sumologic'
#### Error Message

```
from sumologic import SumoLogic
Import Error: cannot import name 'SumoLogic' from 'sumologic'
(/usr/local/lib/python3.10/site-packages/sumologic/__init__.py)
```
#### Solution
The package is [sumologic-sdk](https://pypi.org/project/sumologic-sdk/) and install it for AWS observability solution using the following command:
  ```sql
  pip install sumologic-sdk
  ```

### Argument named *managed_apps* is not expected
#### Error Message

```
An argument named managed_apps is not expected here.
Error: Unsupported argument
on .terraform/modules/account.sumo_observability.app-modules/alb_app.tf line 13, in module "alb_module":
managed_apps = {
```
#### Solution
Refer to [this module in GitHub](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-integrations/tree/master/sumologic).

### Argument named *admin_mode* is not expected
#### Error Message

```
An argument named admin_mode is not expected here.
Error: Unsupported argument
on .terraform/modules/account.sumo_observability/provider.tf line 5, in provider "sumologic":
admin_mode = var.sumologic_folder_installation_location == "Personal folder" ? false:true
```
#### Solution
Sumologic provider [version 2.10.0](https://github.com/SumoLogic/terraform-provider-sumologic/blob/master/CHANGELOG.md#2100-september-22-2021) onwards supports `admin_mode` <br/>Refer to the [`admin_mode` module](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs#authentication).

### Invalid function argument
#### Error Message

```
Error: Invalid function argument
on.terraform/modules/sumo-module.overview_app.overview_module/sumologic/sumologic.tf line 67, in resource "sumologic_content" "SumoLogicApps":
67: config = file(each.value.content_json)
```
#### Solution
Verify app [JSON location](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability/json) and align your custom terraform script accordingly.

### Error creating Serverless Application Repository CloudFormation Stack

#### Error Message

While upgrading AWS Observability Solution (Terraform), upgrade failed with the following error.

`Error: error creating Serverless Application Repository CloudFormation Stack (arn:aws:cloudformation:us-east-1:XXXXXXXXX:stack/serverlessrepo-serverless-hello-world-test/7a6ef230-35a6-11zb-98ff-0ab512dce13f) change set: unexpected state 'FAILED', wanted target 'CREATE_COMPLETE'. last error: %!s()`

Resource `aws_serverlessapplicationrepository_cloudformation_stack` is not able to store values of `var.auto_enable_access_logs` (as specified in our code). On each subsequent terraform apply resource detects it as change and creates a new stack-set. When the AWS API is called with a new stack-set it fails abruptly which causes the whole solution to fail while upgrading.

#### Solution

:::info
For time being, consider the procedure listed below to rectify the error. This error has already [reported](https://github.com/hashicorp/terraform-provider-aws/issues/23874) to AWS.
:::

Navigate to the location where you have installed the AWS Observability Terraform solution and replace the existing code with the new code given below.

1. Go to `cd .terraform/modules/collection-module.classic_lb_module/aws/elasticloadbalancing/elb.tf`
2. Replace the code with the code give below.
  ```sql
  resource "aws_serverlessapplicationrepository_cloudformation_stack" 
    "auto_enable_access_logs" {
    for_each = toset(local.auto_enable_access_logs ? ["auto_enable_access_logs"] : [])

    name             = "Auto-Enable-Access-Logs-${var.auto_enable_access_logs_options.auto_enable_logging}-${random_string.aws_random.id}"
    application_id   = "arn:aws:serverlessrepo:us-east-1:956882708938:applications/sumologic-s3-logging-auto-enable"
    semantic_version = var.app_semantic_version
    capabilities     = data.aws_serverlessapplicationrepository_application.app.required_capabilities
    parameters = {
      BucketName                = local.bucket_name
      BucketPrefix              = var.auto_enable_access_logs_options.bucket_prefix
      AutoEnableLogging         = var.auto_enable_access_logs_options.auto_enable_logging
      AutoEnableResourceOptions = var.auto_enable_access_logs
      FilterExpression          = var.auto_enable_access_logs_options.filter
      RemoveOnDeleteStack       = var.auto_enable_access_logs_options.remove_on_delete_stack
    }
    lifecycle {
      ignore_changes = [
        parameters,tags
      ]
    }
  }
  ```
3. Go to `cd .terraform/modules/collection-module.elb_module/aws/elb/elb.tf`
4. Replace the code with the code provided below.
  ```sql
  resource "aws_serverlessapplicationrepository_cloudformation_stack" 
  "auto_enable_access_logs" {
    for_each = toset(local.auto_enable_access_logs ? ["auto_enable_access_logs"] : [])

    name             = "Auto-Enable-Access-Logs-Elb-${random_string.aws_random.id}"
    application_id   = "arn:aws:serverlessrepo:us-east-1:956882708938:applications/sumologic-s3-logging-auto-enable"
    semantic_version = "1.0.2"
    capabilities     = data.aws_serverlessapplicationrepository_application.app.required_capabilities
    parameters = {
      BucketName                = local.bucket_name
      BucketPrefix              = "elasticloadbalancing"
      AutoEnableLogging         = "ALB"
      AutoEnableResourceOptions = var.auto_enable_access_logs
      FilterExpression          = var.auto_enable_access_logs_options.filter
      RemoveOnDeleteStack       = var.auto_enable_access_logs_options.remove_on_delete_stack
    }
    lifecycle {
      ignore_changes = [
        parameters,tags
      ]
    }
  }
```
