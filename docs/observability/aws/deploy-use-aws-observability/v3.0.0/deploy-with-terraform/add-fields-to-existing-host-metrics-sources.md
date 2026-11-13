---
id: add-fields-to-existing-host-metrics-sources
title: Add Fields to Existing Host Metrics Sources with Terraform
sidebar_label: Add Fields to Host Metrics Sources
description: Learn how to use the AWS Observability Terraform module to add the account, accountid, and Namespace fields to existing Host Metrics Sources.
---

The AWS Observability Solution uses EC2 host metrics collected by the Sumo Logic Host Metrics Source, which is part of the Sumo Logic Installed Collector.

To make EC2 hosts part of the AWS Observability hierarchy, the host metrics sent to Sumo Logic must be tagged with the following fields so they appear in the AWS Observability Solution dashboards.

| Field Name | Description | Availability in Host Metrics |
|:--|:--|:--|
| `account` | An alias for your AWS account, for example, production, development, or stage. It is the value of `aws_account_alias`. | No |
| `accountid` | The ID of the AWS account. It is set automatically. | No |
| `Namespace` | The name of the AWS service. The value is `AWS/EC2`. | No |

Adding these fields to each Host Metrics Source by hand can be tedious when you have many of them. The Terraform module can do this for you. It finds the EC2 instances in your AWS account and region, finds the existing Host Metrics Sources that report for those instances, and adds the fields to those sources.

This is the Terraform equivalent of the [CloudFormation template](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-aws-cloudformation/add-fields-to-existing-host-metrics-sources/). The module does not create any collector or source. It only updates sources that already exist.

## How it works

When you enable the option, the module does the following in the AWS account and region of the `aws` provider:

1. Lists the running EC2 instances.
1. Runs a Sumo Logic metrics query for the last hour to find the Host Metrics Sources that report for those instances. For each batch of 10 instances, the query is `_contentType=HostMetrics (InstanceId=<id> or ...) | count by _sourceId, _collectorId`.
1. Adds the `account`, `accountid`, and `Namespace` fields to each source it finds. Other fields on the source are not changed.

When you run `terraform destroy`, the module removes the same three fields from those sources.

## Prerequisites

* Host Metrics Sources must already exist on an Installed Collector running on your EC2 instances.
* The sources must have sent host metrics for those instances in the last hour. The module finds only sources that recently sent data.
* The machine running Terraform needs Python 3 with the `sumologic-sdk` package installed (`pip3 install sumologic-sdk`). This is the same package the other existing-source options use.
* The AWS credentials used by the `aws` provider must allow `ec2:DescribeInstances`.
* A Sumo Logic access ID and key that can read and update sources, and run metrics queries. For more information, see [Access Keys](/docs/manage/security/access-keys).

## Add fields to Host Metrics Sources

The option is off by default. To turn it on, set `add_fields_to_host_metrics_sources` to `true`.

1. If you have not already, [set up the Terraform environment and configure the module](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-terraform/#step-1-set-up-the-terraform-environment).
1. In your `main.auto.tfvars` file, set the account alias to the same alias you used when you installed the AWS Observability solution for this account:

   ```hcl
   aws_account_alias = "<AWS_ACCOUNT_ALIAS>"
   ```

1. In the `module "collection-module"` block of your `main.tf` file, enable the option:

   ```hcl
   module "collection-module" {
     source = "./modules/collections"

     # ...existing parameters...

     add_fields_to_host_metrics_sources = true
   }
   ```

   If you deploy the module from the registry, add the same line to your `module` block.
1. Run `terraform init` and `terraform apply`.

:::note
The module looks up instances in the region of the `aws` provider configured for that module. To cover instances in several regions or accounts, use one module block for each region or account, each with its own `aws` provider. See [Deploy to multiple accounts and regions](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-terraform/#option-3-deploy-to-multiple-aws-accounts-and-regions).
:::

### Use the option on its own

By default, the collection module also creates the CloudTrail, ALB, Classic Load Balancer, CloudWatch metrics, and CloudWatch logs sources. If you only want to add fields to existing Host Metrics Sources, turn those sources off in the same module block:

```hcl
module "collection-module" {
  source = "./modules/collections"

  # ...providers, aws_account_alias, and Sumo Logic access parameters...

  collect_cloudtrail_logs    = false
  collect_elb_logs           = false
  collect_classic_lb_logs    = false
  collect_cloudwatch_metrics = "None"
  collect_cloudwatch_logs    = "None"

  add_fields_to_host_metrics_sources = true
}
```

## Parameters

### add_fields_to_host_metrics_sources

Set to `true` to add the `account`, `accountid`, and `Namespace` fields to the existing Host Metrics Sources of the EC2 instances in this AWS account and region. The fields are removed again on `terraform destroy`.

**Default value:**

```hcl
false
```

**Example:**

```hcl
add_fields_to_host_metrics_sources = true
```

### host_metrics_fields_version

The module adds the fields when the resource is created. Instances and sources added later are not picked up automatically. To add the fields to them, change this value. This causes Terraform to run the update again with the current list of instances.

**Default value:**

```hcl
"1"
```

**Example:**

```hcl
add_fields_to_host_metrics_sources = true
host_metrics_fields_version        = "2"
```

## Update or remove the fields

* **Add fields to new sources or instances.** Change `host_metrics_fields_version` (for example, from `"1"` to `"2"`) and run `terraform apply`.
* **Remove the fields.** Run `terraform destroy`. The module removes only the `account`, `accountid`, and `Namespace` fields from the sources it updated. Other fields are left as they are.

:::note
When the fields are removed, the module uses the list of EC2 instances stored when the fields were last added. If you added instances since then, change `host_metrics_fields_version` and apply before you remove the fields.
:::

## Troubleshooting

* **The apply succeeds but the fields are not added.** No Host Metrics Source sent data for your running instances in the last hour. Check that the Installed Collector is running and the source is receiving data, then change `host_metrics_fields_version` and run `terraform apply` again. To check, run the metrics query `_contentType=HostMetrics InstanceId=<instance-id>` in Sumo Logic.
* **`ModuleNotFoundError: No module named 'sumologic'`.** Install the Python package with `pip3 install sumologic-sdk` on the machine running Terraform.
* **Terraform does not show the script output.** Terraform hides the output of the script because the configuration contains a sensitive value. Open the source in Sumo Logic, under **Manage Data** > **Collection** > **Collection**, to confirm that the fields were added.
