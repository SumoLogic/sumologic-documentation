---
id: quickstart-aws
title: AWS Observability Quickstart
sidebar_label: AWS Observability Quickstart
description: Get started quickly with our AWS Observability integration.
---

This guide will walk you through setting up [Sumo Logic's AWS Observability integration](https://www.sumologic.com/application/aws-observability/)

:::note Prerequisites
You will need the [AWS CLI](https://aws.amazon.com/cli/) command installed and configured for your AWS account
:::

## Installation

Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys) and run the following command:

```
curl https://raw.githubcontent.com/sumologic/sumologic-solution-templates/aws-observability/install.sh | bash -- <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

![AWS Observability Installation](/img/observability/aws-observability-installation.png)

:::tip Multi-account and region
If you need to add support for multiple AWS accounts or multiple regions, refer to the Sumo Logic documentation for [CloudFormation](/docs/observability/aws-observability-solution/deploy-use-aws-observability/deploy-with-aws-cloudformation) or [Terraform](/observability/aws-observability-solution/deploy-use-aws-observability/deploy-with-terraform.md).
:::
