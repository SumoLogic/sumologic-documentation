---
id: global-intelligence-guardduty
title: Global Intelligence for Amazon GuardDuty
sidebar_label: Amazon GuardDuty - Global Intelligence
description: Global Intelligence for Amazon GuardDuty
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/gi-guardduty.png')} alt="Thumbnail icon" width="50"/>

[Amazon GuardDuty](https://aws.amazon.com/guardduty/) is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads. The Sumo Logic App for Global Intelligence for Amazon GuardDuty analyzes GuardDuty threats from the Sumo Logic population to create baselines of threats. These baselines enable you to optimize security posture and remediation based on how unusual your GuardDuty findings are compared to Sumo Logic customers. The App includes pre-configured dashboards and searches with visual displays for global threat baselines and real-time threat detection across your AWS environment.

This application name is abbreviated to **GI GuardDuty** in our documentation and the application pages.

The App includes pre-configured dashboards and searches with visual displays for global threat baselines and real-time threat detection across your AWS environment, including threat sources and targets by geographic locations.

:::caution
* Global Intelligence baselines are computed by aggregating data for a given customer across all their source categories defined for Amazon GuardDuty. As result, to enable meaningful comparisons, the app must be provided with all the source categories in your Sumo Logic account that are associated with Amazon GuardDuty. Follow the instructions on the [Custom Data Filters](/docs/get-started/apps-integrations#custom-data-filters) page to set up your app with custom data filters, specifying multiple source categories for Amazon GuardDuty.  
* Threat score trends are not meaningful beyond the most recent 24 hours. This is because Global Intelligence baselines are the daily average over the most recent 7 days. As a result, the time range in the panels should not be changed beyond the most recent 24 hours.  
* The `infer` operator is not intended for use outside of Sumo Logic Global Intelligence apps.
:::


## Prerequisites

This feature is available in the following account plans.

| Account Type | Account Level
| :---- | :----
|  Cloud Flex  |  Trial, Enterprise
| Cloud Flex Credits | Trial, Enterprise Suite, Enterprise Security


## Log Types

The Sumo Logic App for GI GuardDuty requires the Amazon GuardDuty findings to be sent through the Amazon CloudWatch Events. For more details on [GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html).

### Sample Log message

```json
{
	"schemaVersion":"2.0",
	"accountId":"656575676767",
	"region":"us-east-1",
	"partition":"aws",
	"id":"1cb6b9059fa3c8cbb682a9a2501bfb13",
	"arn":"arn:aws:guardduty:us-east-1:656575676767:detector/46554yhtu78yuhh5676777787hy06767/finding/1cb6b9059fa3c8cbb682a9a2501bfb13",
	"type":"Trojan:EC2/BlackholeTraffic",
	"resource":{
		"resourceType":"Instance",
		"instanceDetails":{
			"instanceId":"i-99999999",
			"instanceType":"m3.xlarge",
			"launchTime":"2016-08-02T02:05:06Z",
			"platform":null,
			"productCodes":[
				{
					"productCodeId":"GeneratedFindingProductCodeId",
					"productCodeType":"GeneratedFindingProductCodeType"
				}
			],
			"iamInstanceProfile":{
				"arn":"GeneratedFindingInstanceProfileArn",
				"id":"GeneratedFindingInstanceProfileId"
			},
			"networkInterfaces":[
				{
					"networkInterfaceId":"eni-bfcffe88",
					"privateIpAddresses":[
						{
							"privateDnsName":"GeneratedFindingPrivateName",
							"privateIpAddress":"10.0.0.1"
						}
					],
					"subnetId":"GeneratedFindingSubnetId",
					"vpcId":"GeneratedFindingVPCId",
					"privateDnsName":"GeneratedFindingPrivateDnsName",
					"securityGroups":[
						{
							"groupName":"GeneratedFindingSecurityGroupName",
							"groupId":"GeneratedFindingSecurityId"
						}
					],
					"publicIp":"198.51.100.0",
					"ipv6Addresses":[

					],
					"publicDnsName":"GeneratedFindingPublicDNSName",
					"privateIpAddress":"10.0.0.1"
				}
			],
			"tags":[
				{
					"value":"GeneratedFindingInstaceValue1",
					"key":"GeneratedFindingInstaceTag1"
				},
				{
					"value":"GeneratedFindingInstaceTagValue2",
					"key":"GeneratedFindingInstaceTag2"
				}
			]
		}
	}
}
```


### Sample Query

The following query is from the threat score trend line in the **GI GuardDuty: Your Company v. Global Baseline** dashboard.

```sql
_sourceCategory=GIS/test/guardduty
| json "accountId", "arn", "type","service.detectorId","service.action","severity","title","description","region" nodrop
| json "type", "severity"
| parse field=type "*:*/*" as threatpurpose, resource, threatname
| toInt(severity) as severity
| count by resource, threatname, severity
| infer _category=guardduty _model=trendline n=7
| (100.0 - (round(score * 10000) / 100)) as score
// Convert to time chart
| _timestamp as _timeslice
| fields - _timestamp
| max(score) as score by _timeslice
| sort by _timeslice asc
```


## Configuring Log Collection and Deploy the GI GuardDuty App

This section explains the log collection process and provides instructions for configuring log collection and installing the GI GuardDuty App.

If you have already Amazon GuardDuty data flowing into Sumo Logic, you can skip these steps and install the App from the Sumo Logic App Catalog.

### Process overview

Sumo Logic provides a SAM application based on [AWS Serverless Application Model (SAM) specification](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html), and is published in the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/). This SAM deployment:
1. Creates a Lambda function and its associated components.
2. Creates collector, and HTTP Source at Sumo Logic.
3. Installs the Sumo Logic GI GuardDuty App.

After completing this process, logs are ingested into Sumo Logic in the following way:
1. Amazon GuardDuty sends notifications based on CloudWatch events when new findings, or new occurrences of existing findings, are generated.
2. A CloudWatch events rule enables CloudWatch to send events for the GuardDuty findings to the Sumo CloudWatchEventFunction Lambda function.
3. The Lambda function sends the events to an HTTP source on a Sumo Logic hosted collector.


This section shows you how to generate an access key and access ID for log collection, and then how to deploy the Amazon GuardDuty Benchmark App.

These tasks require the Manage Collectors and Manage Access Keys [role capabilities](/docs/manage/users-roles/roles/role-capabilities).


#### Step 1: Generate an Access Key and Access ID

In this step, you need to generate access key and access ID from the Sumo Logic console. To generate an access key and access ID, do the following:

1. Follow the instructions as described in this [Sumo Logic Access Key](/docs/manage/security/access-keys#Create_an_access_key)) document.
2. Copy down both the values as you’ll need them to deploy the Sumo Logic GuardDuty Benchmark SAM App.


#### Step 2: Deploy the Sumo Logic GI GuardDuty SAM App

In this step, you deploy the SAM application, which creates the AWS resources described in the [process overview](#Process-overview).

To deploy the Sumo Logic GuardDuty Benchmark SAM App, do the following:

1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-guardduty-benchmark** and click the app link when it appears.
3. When the page for the Sumo app appears, click **Deploy**.
4. In **Configure application parameters** panel, enter the following parameters:
    * Access ID(Required): Sumo Logic Access ID generated from Step 1.
    * Access Key(Required): Sumo Logic Access Key generated from Step 1.
    * Deployment Name(Required): Deployment name (environment name in lower case as per [docs](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security)).
    * Collector Name: Enter the name of the Hosted Collector which will be created in Sumo Logic.
    * Source Name: Enter the name of the HTTP Source which will be created within the collector.
    * Source Category Name: Enter the name of the Source Category which will be used for writing search queries.
5. Click **Deploy**.
6. When the deployment is successful, click **View CloudFormation Stack**.
7. In the Outputs section, copy the app folder name to search your personal folder in the Sumo Logic console.


## Viewing the GI GuardDuty App Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### 01. Global Baseline

**GI GuardDuty - 01. Global Baseline** dashboard provides a high-level baseline of threats across Sumo Logic customers. Panels display graphs for threat and severity distribution, targeted resources, and relative rarity.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Global_Baseline.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Determine if you are being attacked by a particular region or actor around the globe.
* Assess rare threats found by Amazon GuardDuty in your AWS environment.
* Analyze threat shares targeted resources and severity.


### 02. Your Company v. Global Baseline

**GI GuardDuty - 02. Your Company v. Global Baseline **dashboard compares your AWS environment against all Sumo Logic customers. The threat score (0=LOW RISK, 100=HIGH RISK) is a composite view of risk associated with GuardDuty findings and is impacted by severity, number of findings, deviation from global baseline and rarity of threats within Sumo Logic customers. In addition to the latest score, the trend line panel shows the 7 day trend of the threat score. My Prioritized Action Plan lists the change management actions in order of impact on GuardDuty security posture.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Your_Company_v_Baseline.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Understand top level threat score and trends.
* How your company’s GuardDuty findings compare to Sumo Logic customers.
* How your company’s findings severity compares to Sumo Logic customers.
* Understand which threats to remediate prioritized based on the greatest impact to threat score.
* Review a prioritized action plan for your company.


### 03. Findings Analysis

**GI GuardDuty - 03. Findings Analysis** dashboard provides a high-level view of threats to your AWS environment. Panels display information on threats by threat purpose, geography, impacted resource type, account, severity and trends.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Findings_Analysis.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Understand the mix of threats in your environment.
* Identify the source and target of threats in your environment.
* Review your company's threats by severity and resource type.
* Review your company's threats by account, security group, EC2 instances, and threat trends.
