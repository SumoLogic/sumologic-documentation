---
id: quickstart
title: AWS Observability Quickstart
sidebar_label: AWS Observability Quickstart
description: Get up and running in minutes with our AWS Observability integration.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This guide will walk you through setting up [Sumo Logic's AWS Observability integration](https://www.sumologic.com/application/aws-observability/)

## Prerequisites
You will need the [AWS CLI](https://aws.amazon.com/cli/) command installed and configured for your AWS account.


## Installation

Get your [Sumo Logic Access ID and Access Key](/docs/manage/security/access-keys) and run the following command:

<Tabs
className="unique-tabs"
defaultValue="Windows"
values={[
{label: 'Windows', value: 'Windows'},
{label: 'Linux / Mac', value: 'Linux / Mac'}
]}>

<TabItem value="Windows">

Copy the file available [here](https://github.com/SumoLogic/sumologic-solution-templates/blob/ad7b301522b2afb6abfb9cd388761f3ecf74d1db/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOWin.ps1). Save it as “DeployAWSOWin.ps1”. Run the command:

```
.\DeployAWSOWin.ps1 <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```


</TabItem>
<TabItem value="Linux / Mac">

Copy the file available [here](https://github.com/SumoLogic/sumologic-solution-templates/blob/ad7b301522b2afb6abfb9cd388761f3ecf74d1db/aws-observability/scripts/AWSOAutoSetupScript/DeployAWSOPosix.sh). Save it as “DeployAWSOPosix.sh”. Run the command:

```
sh DeployTemplate.sh <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY>
```

</TabItem>
</Tabs>

:::tip Multi-account and region
If you need to add support for multiple AWS accounts or multiple regions, refer to the Sumo Logic documentation for [CloudFormation](/docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation) or [Terraform](/docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform.md).
:::
