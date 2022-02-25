---
id: quickstart-aws
---

# AWS Observability

This guide will walk you through setting up [Sumo Logic's AWS Observability integration](https://www.sumologic.com/application/aws-observability/)

:::note Prerequisites
You will need the [AWS CLI](https://aws.amazon.com/cli/) command installed and configured for your AWS account
:::

## Installation

Get your [Sumo Logic Access ID and Access Key](https://help.sumologic.com/Manage/Security/Access-Keys) and run the following command:

```
curl https://raw.githubcontent.com/sumologic/sumologic-solution-templates/aws-observability/install.sh | bash -- <SUMO_ACCESS_ID> <SUMO_ACCESS_KEY> 
```

![AWS Observability Installation](/img/aws-observability-installation.png)

:::tip Multi-account and region
If you need to add support for multiple AWS accounts or multiple regions, refer to the Sumo Logic documentation for [CloudFormation](https://help.sumologic.com/Observability_Solution/AWS_Observability_Solution/01_Deploy_and_Use_AWS_Observability/05_Deploy_AWS_Observability/Deploy_with_CloudFormation#Option_3:_Deploy_to_multiple_AWS_accounts_and_regions) or [Terraform](https://help.sumologic.com/Observability_Solution/AWS_Observability_Solution/01_Deploy_and_Use_AWS_Observability/05_Deploy_AWS_Observability/Deploy_with_Terraform#Option_3:_Deploy_to_multiple_AWS_accounts_and_regions).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
