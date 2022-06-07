---
id: how-to-setup-and-deploy
---

# How do you set up and deploy?

See the following frequently asked questions (FAQs), and see [Deploy AWS Observability](/docs/observability/aws-observability-solution/deploy-use-aws-observability) for requirements
and instructions. 

## How do you set up AWS services for monitoring?

You set up your AWS services using a AWS CloudFormation template (CFN) that is run in your AWS account. When run, resources are generated in Sumo Logic to collect logs and metrics. See [Before You Deploy](../deploy-use-aws-observability/before-you-deploy.md) for prerequisites, requirements, and instructions to use the CFN.

## Can I deploy with CloudFormation?

Yes, you can deploy with CloudFormation template. See [Deploy with CloudFormation](../deploy-use-aws-observability/deploy-with-terraform.md) for information. 

If you have already set up the solution with Terraform and want to move
to CloudFormation, we recommend that you:

* Start with an existing AWS account and region combination (preferably a non-production dev/test account), delete the AWS Observability Terraform stack associated with it, then on-board that account-region combination using CloudFormation template.

* Once you confirm that the solution has been deployed successfully, you can then repeat the process for additional AWS accounts and region.

## Can I deploy with Terraform?

Yes, you can deploy using a Terraform script. See [Deploy with Terraform](../deploy-use-aws-observability/deploy-with-terraform.md) for detailed instructions, options, and a GitHub repository of files to use in your deployment script.

If you have already set up the solution with CloudFormation in the past
and want to move to Terraform, we recommend that you:

* Start with an existing AWS account and region combination (preferably a non-production dev/test account), delete the AWS Observability CloudFormation stack associated with it, then on-board that account-region combination using Terraform scripts.

* Once you confirm that the solution has been deployed successfully, you can then repeat the process for additional AWS accounts and region.

## What resources are generated during set up? 

See [Resources](../deploy-use-aws-observability/aws-observability-resources.md) in AWS Observability Solution for a complete list of resources the CloudFormation (CFN) template and Terraform Script creates at deployment, in AWS, and in Sumo Logic. 

## Why are Field Extraction Rules and Metrics Rules created as part of the installation scripts? 

Field Extraction Rules (FER) and Metric rules are created by the
CloudFormation template and Terraform Script to ensure that data is
enriched with AWS account information (accountid, account alias, region,
namespace and entity).

If you have existing AWS sources with FERs, and you choose to reference
an existing source in the CloudFormation or Terraform installation, your
FERs will not be changed in any way unless the names are the same.
Multiple FERs can co-exist on the same source or metadata.

As of our current release, FERs are not imported using Terraform. You
must rename any existing FERs. The Terraform script will create new FERs
and maintain the state in Terraform.

Renaming an existing FER has no effect on FER usage.

See [AWS Observability Resources](../deploy-use-aws-observability/aws-observability-resources.md)
for the list of Field Extraction Rules in the resources.

## How do you keep track of changes and make feature updates?

Sumo Logic provides updates to the AWS Observability solution via CloudFormation and Terraform. See the [changelog](../deploy-use-aws-observability/aws-observability-change-log.md) to review all the changes and pointers to the CloudFormation templates associated with each version. AWS provides the ability to update a CloudFormation stack. To learn more about how to update your stack, see [Update the AWS Observability Stack](../deploy-use-aws-observability/update-aws-observability-stack.md).

## Can I use an Installed Collector instead of relying on Cloudwatch for EC2 Host Metrics?

Yes, Sumo Logic’s Installed Collectors are used on EC2 hosts. Sumo Logic does rely on Cloudwatch (not the installed collectors) for other AWS Services including RDS, API Gateway, DynamoDB, Lambda, Application ELB, Elasticache, Network Loadbalancer, and ECS. See [*Configure Host Metrics sources*](../deploy-use-aws-observability/before-you-deploy.md) for more details.

## Can I use CloudWatch to collect EC2 metrics instead of using an Installed Collector?

We recommend that you use the Sumo logic Installed Collector to collect 
host metrics for cost reasons. However, you can also choose to collect
EC2 metrics via CloudWatch if you choose to do so. Simply add the
AWS/EC2 namespace when selecting the list of namespaces in either
CloudFormation or Terraform.

The OOTB dashboards are designed to only operate on EC2 host metrics
from installed collectors and will not work with CloudWatch metrics
however, Root Cause Explorer will also work on EC2 Metrics from
CloudWatch if you do not want to use installed collectors.

## Will new Lambdas or services get automatically added to the AWS Observability explore tab? 

New Lambda functions and new Application ELBs will automatically be
added if you have selected the auto-subscribe options during the
CloudFormation stack deployment. 

## What type of tagging is used for AWS resources? 
Resources are tagged in Sumo Logic. We do not tag resources in AWS.

## Will existing EC2 tags automatically be ingested?

All tags are collected by the AWS Cloud Watch Metrics source. For EC2,
metadata sources need to be added for that account and will be mapped to
Host metrics. Custom EC2 tags will be available through the metadata
source.

## Are instance metrics collected from CloudWatch metrics or as Host metrics?

EC2 dashboards are based on Host Metrics. 

Root Cause Explorer supports both EC2 and Host Metrics:

* Host Metrics: The namespace appears as "Host' in the namespace drop-down.
* EC2: Through CloudWatch, it appears as "AWS/EC2".

Host Metrics use a different format than CloudWatch. They can also refer
to non-AWS in general, which is why Sumo Logic refers to them
generically as Host Metrics.

## Why are all entities or functions not available in Sumo Logic?

AWS Observability integrates with Explore by populating metadata and
only shows entities with metrics coming in. If you do not see expected
entities, make sure configurations are correct to collect and receive
metrics including the [CloudWatch Namespace](/docs/observability/aws-observability-solution/deploy-use-aws-observability/deploy-with-aws-cloudformation)
for CloudFormation Template. You can configure metadata through
deployment configuration or manually.

For example, metrics for Lambda functions must be coming in for those
entities to show in the Explore view. If you do not see Lambda
functions, verify the Cloud Formation stack is correctly configured
including the AWS/Lambda namespace to collect metrics. For information,
see 

## Can load balancers be filtered as part of CloudFormation template setup? 

At this time, you cannot filter load balancers, such as sending specific ALBs to the AWS Observability solution.
