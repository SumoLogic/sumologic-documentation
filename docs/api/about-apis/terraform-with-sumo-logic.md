---
id: terraform-with-sumo-logic
title: Use Terraform with Sumo Logic
sidebar_label: Terraform with Sumo Logic
description: Learn how to use Terraform with Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/api/terraform-icon.png')} alt="Thumbnail icon" width="50"/>

## What is Terraform?

Terraform is an "Infrastructure-as-code" tool, developed by [Hashicorp](https://developer.hashicorp.com/terraform/intro). Terraform scripts are used to define both cloud and on-prem resources in human-readable configuration files. Using Terraform scripts makes it easier for system administrators to provision and manage infrastructure and system resources consistently and reliably. The Terraform community, including Sumo Logic, supports Terraform through providers and APIs allowing applications to install and manage different types of resources and services from different vendors in one workflow.

The core Terraform workflow consists of three stages:

Write: defining resources, which may be across multiple cloud providers and services. For example, you might create a configuration to deploy an AWS instance to support AWS Observability for a customer.

Plan: creating an execution plan describing the infrastructure it will create, update, or destroy based on the existing infrastructure and your configuration.

Apply: Once the plan is approved, Terraform performs the proposed operations in the correct order, respecting any resource dependencies.

<img src={useBaseUrl('img/api/terraform-diagram.png')} alt="Terraform diagram" style={{border: '1px solid gray'}} width="700" /> 

## Understanding the Terraform format

Terraform scripts are text files, typically with a ".tf" extension, that use names and values in a hierarchal format, defined by curly braces "{ }". Terraform scripts can be edited with any text editor and although they are intended to be run automatically by a computer system, the script elements are generally human readable, and not difficult to parse and understand. 

Let's look at some examples:

Terraform Providers
A provider is a Terraform module or plugin developed by a vendor which defines which vendor resources are available for Terraform to create and manage. Sumo Logic has an established Terraform provider plugin, as does AWS and other major cloud vendors. The Terraform script section defining the provider for resources defined by other parts of the script might look like this:

```
provider "aws" {
 profile = "default"
 region = "us-west-2"
}
```

This script represents the general Terraform syntax: a keyword defining the block section ("provider" in this case), the name of the provider ("aws") and a series of one or more name/value pairs (or named sub-blocks) one per line with a equal sign, demarcated by curly braces.

Terraform scripts can define a block at the beginning of a script that outlines which providers are required for a particular script to function. For instance, to require the Sumo Logic provider (and set the necessary version), you can use the following:

```
terraform {
 required_providers {
 sumologic = {
 source = "sumologic/sumologic"
 version = ">= 0.13"
 }
 }
}
```

### Terraform resources

A resource is an infrastructure element that can be defined and created from the available resources produced by the provider. A resource definition will look similar in form to the provider definition:

```
resource "aws_s3_bucket" "training" {
 bucket = "sumo-training-2025"
 acl = "private"
}
```

Resources will have a resource type (defined by the provider, "aws_s3_bucket" in this case), our name for the resource in Terraform ("training"), then a block of name/value pairs or sub-blocks, with available property values defined by the provider for that resource. You will need to check the documentation for each individual provider to see the resource types and configuration values available to reference in Terraform scripts.

Resource definitions can refer to other resources using a variable "dot" syntax. For instance, here's an associated website configuration resource that is tied to our AWS S3 bucket from the previous example:

```
resource "aws_s3_bucket_website_configuration" "training" {
 bucket = aws_s3_bucket.training.bucket
 index_document {
 suffix = "index.html"
 }
}
```

Note that instead of needing to repeat the same bucket name, we can reference the bucket name from the earlier resource by using [resource type].[resource name].bucket. In this way the system knows to check and use the defined name from the previous resource each time (and we only have to edit it in one place if the bucket name changes).

Note also that it's okay to use the same name for multiple resources ("training" in this case) if the resource types are different. However, make sure you have different unique names for each instance of the same provider resource type.

Here's another sample script that defines an example of the "sumologic_role" resource:

```
terraform {
 required_providers {
 sumologic = {
 source = "sumologic/sumologic"
 }
 }
 required_version = ">= 0.13"
}
```

```
resource "sumologic_role" "cseAnalyst" {
 name = "CSE Analyst"
 description = "This role is used for Analysts in Cloud SIEM Enterprise"
 capabilities = [
 "cseManageRules", "cseViewCustomInsightStatuses", "cseCommentOnInsights", "cseManageInsightAssignee", "viewCse", "cseViewEntityCriticality", "cseViewEnrichments", "cseViewTagSchemas", "cseViewMatchLists", "cseManageCustomInsightStatuses", "cseManageEntityCriticality", "cseManageInsightTags","cseCreateInsights", "cseViewEntityConfiguration", "cseViewEntityGroups", "cseViewCustomEntityType", "cseManageInsightStatus", "cseManageMatchLists", "cseViewThreatIntelligence", "cseViewCustomInsights", "cseViewFileAnalysis", "cseViewMappings", "cseViewSuppressedEntities", "cseManageFavoriteFields","viewCollectors","cseViewNetworkBlocks", "cseInvokeInsights","cseViewRules","cseViewAutomations","cseViewEntity"
 ]
}
```

A data resource is a special kind of resource, defined by a "data" block. A data resource can read from another given resource to calculate and export values in a new named data structure. For instance, the sample script below uses data resources to enable policies in the Sumo Logic environment through a separate HTTP client resource that connects to the Sumo Logic API:

```
terraform {
 required_providers {
 sumologic = {
 source = "sumologic/sumologic"
 version = ">= 0.13"
 }
 http-client = {
 source = "dmachard/http-client"
 version = "0.0.3"
 }
 }
}

variable "sumologic_access_id" {
 type = string
}

variable "sumologic_access_key" {
 type = string
}

variable "sumologic_deployment" {
 type = string
}

provider "sumologic" {
 access_id = var.sumologic_access_id
 access_key = var.sumologic_access_key
 environment = var.sumologic_deployment
}

data "httpclient_request" "enable_audit_policy" {
 provider = http-client
 username = "${var.sumologic_access_id}"
 password = "${var.sumologic_access_key}"
 url = "${var.sumologic_deployment}v1/policies/audit" 
 request_method = "PUT"
 request_headers = {
 Content-Type: "application/json",
 }
 request_body = jsonencode({
 "enabled": true
 })
}

data "httpclient_request" "enable_searchaudit_policy" {
 provider = http-client
 username = "${var.sumologic_access_id}"
 password = "${var.sumologic_access_key}"
 url = "${var.sumologic_deployment}v1/policies/searchAudit" 
 request_method = "PUT"
 request_headers = {
 Content-Type: "application/json",
 }
 request_body = jsonencode({
 "enabled": true
 })
}
```

### Terraform state files

After running Terraform, there is another file type you should be aware of. A state file is a configuration file generated by a Terraform installation that stores the current state of your managed infrastructure and configuration. This state is typically stored in a local file in your terraform working directory named `terraform.tfstate`.

The state file is used by Terraform to track the current infrastructure state in order to properly process updates or deletes. The state file should be kept safe and secure (since it may contain sensitive data such as access keys and secrets) and is not meant to be edited directly, even though it is a simple human-readable JSON text file. An example state file might look like the screenshot below:

<img src={useBaseUrl('img/api/terraform-state-file.png')} alt="Terraform state file" style={{border: '1px solid gray'}} width="600" /> 

## Using Sumo Logic's AWS Terraform template

Since setting up AWS Observability is a common use case, Sumo Logic has already established Terraform templates containing the basic script items needed to setup an AWS installation with the proper AWS and Sumo Logic resources and components.

The solution template files [can be found here](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform), in the Sumo Logic solution templates Github repository. To implement this solution, copy or clone the files in the repository to your server or local machine. For instance, from the command line, you can use the following command to clone the repository:

`git clone https://github.com/SumoLogic/sumologic-solution-templates`

In order to use this solution template, you should already have:
* A Sumo Logic account.
* An AWS account.
* A Sumo Logic Access ID and Access Key.

In preparation, you will want to complete the following steps on your server or local machine:
1. [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) (version 1.6 or later)
1. [Install Python](https://www.python.org/downloads/) (version 3.11 or later)
1. [Install the latest version](https://github.com/jqlang/jq/wiki/Installation) of the "jq" JSON parser, necessary to run the .sh batch files in the template.
1. [Install the Sumo Logic Python SDK](https://pypi.org/project/sumologic-sdk/).
1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Next, navigate to the `sumologic-solution-templates` folder where you cloned the repository, and go to the `aws-observability-terraform` subdirectory. Set this directory to be the Terraform working directory by executing the following command: `terraform init`

Using the solution template starts with [the main.auto.tfvars file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.auto.tfvars) which contain variable settings for your Sumo Logic organization, access ID and key, and other configuration information that will be referenced by the other template files. Open this file and fill in each field with the requested information.

<img src={useBaseUrl('img/api/tfvars-file.png')} alt="tfvars file" style={{border: '1px solid gray'}} width="800" />

Check the [Sumo Logic deployment guide](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if you need help finding the proper deployment value to use.

As part of the AWS Observability solution, we'll want to create and use the proper fields and FERs in Sumo Logic (see [here](/docs/observability/aws/deploy-use-aws-observability/resources/) for more details). Make sure you are in the `aws-observability-terraform` sub-directory, and run the following CLI commands (with the appropriate information included):

```
export SUMOLOGIC_ENV="YOUR_SUMOLOGIC_DEPLOYMENT"
export SUMOLOGIC_ACCESSID="YOUR_SUMOLOGIC_ACCESS_ID"
export SUMOLOGIC_ACCESSKEY="YOUR_SUMOLOGIC_ACCESS_KEY"
```

Then run the `fields.sh` script with the following command: `sh fields.sh`

Next, let's look at the [providers.tf file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/providers.tf), which connects Terraform to the Sumo Logic and AWS provider plugins.

<img src={useBaseUrl('img/api/providers-tf-file.png')} alt="providers.tf file" style={{border: '1px solid gray'}} width="800" /> 

The Sumo Logic provider is already configured, as we can simply reference the environment and access key settings from the `tfvars` file configured earlier. For the AWS provider, change the region setting (if needed). Then, uncomment the `profile` and `alias` fields (lines 16 and 20, by deleting the `#`) and fill in the values using your AWS profile name (from the AWS CLI) and a custom alias to identify this provider.

:::note
This installation is assuming you are using a single AWS account in a single region. If you need to configure multiple AWS accounts and/or multiple regions, see [Option 2: Deploy to Multiple Regions within an AWS account](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/#option-2-deploy-to-multiple-regions-within-an-aws-account) for additional information on configuring the `providers.tf` file.
:::

Lastly, let's look at the [main.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.tf) file.

<img src={useBaseUrl('img/api/main-tf-file.png')} alt="main.tf file" style={{border: '1px solid gray'}} width="800" /> 

The top `sumo-module` section can usually be left alone unless there are [settings that need to be overridden](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/#appendix) for your install.

The bottom `collection-module` section is given as a template, but you will usually want to comment out this section (add `#` in front of every line) and create your own module definition using the AWS alias(es) defined in the `provider.tf` file earlier.

An example:

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

Substitute in the appropriate aliases for the ALIAS fields above. Note that if you are deploying for multiple regions and/or multiple AWS accounts, you'll need one new module section for each region defined in provider.tf. (See [more examples](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/#step-4-configure-providers-in-the-maintf-file) for multi-region/multi-account circumstances)

We're finished. Let's deploy.

Once the above files are configured, you can run Terraform against your scripts by executing the following CLI commands in sequence:

```
terraform validate
terraform plan
terraform apply
```

Terraform will report back during these processes if there are any issues with the text of the terraform files that needs troubleshooting.