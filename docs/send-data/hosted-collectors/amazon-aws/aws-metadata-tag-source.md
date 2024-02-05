---
id: aws-metadata-tag-source
title: AWS Metadata (Tag) Source
sidebar_label: AWS Metadata (Tag)
description: A Sumo Logic AWS Metadata Source allows you to collect Tags from EC2 instances running on AWS.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/aws-metadata-tag.png')} alt="icon" width="40"/>

A Sumo Logic AWS Metadata Source allows you to collect tags from EC2 instances running on AWS. Tags are returned in your search results and can be referenced in queries. For information about assigning tags to EC2 instances, see [Tagging Your Amazon EC2 Resources](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) in AWS help. Only one AWS Metadata Source is required to collect tags from multiple hosts.

:::note
Collecting AWS Metadata requires [Collector](/docs/send-data/installed-collectors/sources) version 19.162+.
:::

## Metrics

Tags are automatically applied to:

* Metrics ingested by [host metric sources](/docs/send-data/installed-collectors/sources/host-metrics-source.md) on Installed Collectors.
* Graphite and Carbon 2.0 metrics ingested by [streaming metric sources](/docs/send-data/installed-collectors/sources/streaming-metrics-source.md) on Installed Collectors.

You can also apply AWS tags to Graphite and Carbon 2.0 metrics ingested by an HTTP source. To enable tagging of metrics from an HTTP source, you must specify the `InstanceID` and `Region` tags in the header using `X-Sumo-Dimensions` or `X-Sumo-Metadata` as well as to the metric itself. For reference see [Supported HTTP Headers](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-metrics).

## Logs

A Sumo Logic AWS Metadata Source collects custom tags from EC2 instances running on AWS. An Installed Collector automatically pulls [AWS instance identity documents](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-identity-documents.html) (IMDSv2) from instances to get their accountID, availabilityZone, instanceId,
instanceType, and region.

Logs ingested by Installed Collectors on EC2 instances will be tagged as long as the tag, including instance information tags, exists in the organization's Fields table. See how to define fields in the manage fields section. EC2 resource tags take precedence over EC2 instance information. Only one AWS Metadata Source is required to collect tags from multiple hosts.

Tags are returned in your search results and can be referenced in queries. For information about assigning tags to EC2 instances, see [Tagging Your Amazon EC2 Resources](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) in AWS help.

## Set up an AWS Metadata Source

1. Grant permission for Sumo Logic to describe EC2 instances. See [Grant Access to an AWS Product](grant-access-aws-product.md) for details.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Next to a Hosted Collector, click **Add Source**.
1. Select **AWS Metadata**.
1. Configure the following:

   * **Name**. Enter a name to display for the new Source.
   * **Description**. Optional description.
   * **Regions**. Select one or more Amazon regions.
   * **Tag Filters.** Leave this field blank to collect all tags configured for the EC2 instance. To collect a subset of tags, follow the instructions in [Define EC2 tag filters](#define-ec2-tag-filters). Review the above [Metrics](#metrics) and [Logs](#logs) sections for important information.
   * **AWS Access.** Choose between two **Access Method** options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in step 1, see [Grant Sumo Logic access to an AWS Product](grant-access-aws-product.md).

     * For **Role-based access** enter the Role ARN that was provided by AWS after creating the role. 

        ![Role based access input roleARN.png](/img/send-data/Role-based-access-input-roleARN.png)
     * For **Key access** enter the **Access Key ID** and **Secret Access Key.** See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.

1. Click **Save**.

After creating an AWS Metadata Source, it may take up to 10 minutes for EC2 tags to appear in search results.

### Define EC2 tag filters 

Define your filter to match against your tag. For instance, in a key value pair define the filter to match against the key, not the value. If you do not define tag filters, all tags configured for your EC2 instances will be collected.

:::important
We recommend filtering tags whose values change more than once every 10 minutes. We do not support metadata tags whose values change frequently per time series. In the case of metrics, the metrics source may be blocked until the volatile metadata issue is resolved.
:::

If you want to collect a subset of tags, you can enter a comma-separated list of one or more of the following types of filters:

* One or more specific tag names, for example, “Cluster, Deployment, Name”
* A wildcard filter, for example, “dev-\*”
* An exclusion (denylist) filter, which begins with an exclamation mark, for example, ”!master-container” or “!prod-\*”

For example, assume that the tags configured for your EC2 instances are:

* Cluster
* Deployment
* DeployStatus
* Name

The table below shows the results of several example tag filters 

| This tag filter value | Results in collection of these tags |
|:--|:--|
| `!DeployStatus` | Cluster<br/>Deployment<br/>Name |
| `!Dep*` | Cluster<br/>Name |
| `Deploy*`<br/>`!DeployStatus`<br/>`Cluster` | Cluster<br/>Deployment |
