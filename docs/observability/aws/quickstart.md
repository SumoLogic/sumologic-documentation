---
id: quickstart
title: AWS Observability Quickstart
sidebar_label: AWS Observability Quickstart
description: Get up and running in minutes with our AWS Observability integration.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up [Sumo Logic's AWS Observability integration](https://www.sumologic.com/application/aws-observability/).

## Prerequisites

- You will need the [AWS CLI](https://aws.amazon.com/cli/) command installed and configured for your AWS account.
- Select/Change the enabled [AWS region](https://docs.aws.amazon.com/cli/latest/reference/configure/set.html) where you want to deploy the solution.

    <details><summary>Example: How to change your default AWS region to us-west-1?</summary>
    Run the following command with AWS region as us-west-1.
    <p></p>
    <code>aws configure set region us-west-1</code>
    </details>

## Installation

<Tabs
className="unique-tabs"
defaultValue="Windows"
values={[
{label: 'Windows', value: 'Windows'},
{label: 'Linux / Mac', value: 'Linux / Mac'}
]}>

<TabItem value="Windows">

Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys), replace `SUMO_ACCESS_ID` and `SUMO_ACCESS_KEY` with the generated values, and run the following command:

```
$uri="https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOWin.ps1";$path=".\DeployAWSOWin.ps1";(New-Object System.Net.WebClient).DownloadFile($uri, $path);
.\DeployAWSOWin.ps1 <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```
</TabItem>
<TabItem value="Linux / Mac">

Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys), replace `SUMO_ACCESS_ID` and `SUMO_ACCESS_KEY` with the generated values, and run the following command:

```
wget "https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOPosix.sh"

chmod +x DeployAWSOPosix.sh

./DeployAWSOPosix.sh <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>

```
</TabItem>
</Tabs>

:::tip Multi-account and region
If you need to add support for multiple AWS accounts or multiple regions, refer to the Sumo Logic documentation for [CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) or [Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform.md).
:::
