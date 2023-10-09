---
id: guardduty-benchmark
title: Amazon GuardDuty Benchmark
description: The Sumo Logic Amazon GuardDuty Benchmark App integrates Global Intelligence Service (GIS) with Amazon GuardDuty for continuous machine learning and statistical baselines for KPIs (key performance indicators) and KRIs (key risk indicators).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/guardduty-benchmark.png')} alt="Thumbnail icon" width="50"/>

:::sumo Availability
For Trial and Enterprise account plans.
:::

[Amazon GuardDuty](https://aws.amazon.com/guardduty/) is an intelligence threat detection service that provides accurate, continuous monitoring to protect AWS accounts and workloads. This page explains the log collection process, and provides instructions for configuring log collection and installing the Amazon GuardDuty Benchmark App.

The Sumo Logic **Amazon GuardDuty Benchmark App** integrates **Global Intelligence Service (GIS)** with Amazon GuardDuty for continuous machine learning and statistical baselines for KPIs (key performance indicators) and KRIs (key risk indicators). These baselines enable you to optimize security configuration and threat detection on all your AWS accounts.  

Global Intelligence baselines are computed by aggregating data for a given customer across all source categories defined for Amazon GuardDuty. As result, to enable meaningful comparisons, the app must be provided with all the source categories in your Sumo Logic account that are associated with Amazon GuardDuty. Follow the instructions on the [Custom Data Filters](/docs/get-started/apps-integrations#custom-data-filters) page to set up your app with custom data filters, specifying multiple source categories for Amazon GuardDuty.

The App includes pre-configured dashboards and searches with visual displays for global threat baselines and real-time threat detection across your AWS environment, including threat sources and targets by geographic locations.

## Log Types

The Sumo Logic App for GuardDuty requires the Amazon GuardDuty findings to be sent through the Amazon CloudWatch Events. For more details, see [GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html).


## Configuring Log Collection and Deploying the App

:::note
If you have already Amazon GuardDuty data flowing into Sumo Logic, you can skip the steps in this section and [install the Amazon GuardDuty Benchmark App](#installing-the-amazon-guardduty-benchmark-app) from the Sumo Logic App Catalog.
:::

:::note
These tasks require the Manage Collectors and Manage Access Keys [role capabilities](/docs/manage/users-roles/roles/role-capabilities).
:::

Sumo Logic provides a SAM application based on [AWS Serverless Application Model (SAM) specification](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html), and is published in the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/). This SAM deployment:
1. Creates a Lambda function and its associated components.
2. Creates collector, and HTTP Source at Sumo Logic.
3. Installs the Sumo Logic GuardDuty Benchmark App.

After completing this process, logs are ingested into Sumo Logic in the following way:

1. Amazon GuardDuty sends notifications based on CloudWatch events when new findings, or new occurrences of existing findings, are generated.
2. A CloudWatch events rule enables CloudWatch to send events for the GuardDuty findings to the Sumo CloudWatchEventFunction Lambda function.
3. The Lambda function sends the events to an HTTP source on a Sumo Logic hosted collector.<br/><img src={useBaseUrl('img/integrations/amazon-aws/AGD_BM_Collection_Overview.png')} alt="flow" />

This section shows you how to generate an access key and access ID for log collection, and then how to deploy the Amazon GuardDuty Benchmark App.


### Step 1: Generate an Access Key and Access ID

In this step, you need to generate access key and access ID from the Sumo Logic console.

To generate an access key and access ID, do the following:
1. Follow the instructions as described in this [Sumo Logic Access Key](/docs/manage/security/access-keys#Create_an_access_key)) document.
2. Copy down both the values as you’ll need them to deploy the Sumo Logic GuardDuty Benchmark SAM App.


### Step 2: Deploy the Sumo Logic GuardDuty Benchmark SAM App

In this step, you deploy the SAM application, which creates the AWS resources described in the [process overview](#Process_overview).

To deploy the Sumo Logic GuardDuty Benchmark SAM App, do the following:

1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-guardduty-benchmark** and click the app link when it appears.<br/><img src={useBaseUrl('img/integrations/amazon-aws/AGD_BM_Deploy_Benchmark_App_dialog.png')} alt="flow" />
3. When the page for the Sumo app appears, click **Deploy**.<br/><img src={useBaseUrl('img/integrations/amazon-aws/AGD_BM_Deploy_App_dialog.png')} alt="flow" />
4. In **Configure application parameters** panel, enter the following parameters:
    * Access ID (Required): Sumo Logic Access ID generated from Step 1.
    * Access Key (Required): Sumo Logic Access Key generated from Step 1.
    * Deployment Name(Required): Deployment name (environment name in lower case as per [docs](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security)).
    * Collector Name: Enter the name of the Hosted Collector which will be created in Sumo Logic.
    * Source Name: Enter the name of the HTTP Source which will be created within the collector.
    * Source Category Name: Enter the name of the Source Category which will be used for writing search queries.
5. Click **Deploy**.
6. When the deployment is successful, click **View CloudFormation Stack**.
7. In the Outputs section, copy the app folder name to search your personal folder in the Sumo Logic console.




### Sample Log Message

<details><summary>Click to expand</summary>

```json
{
   "schemaVersion":"2.0",
   "accountId":"012345678910",
   "region":"us-east-1",
   "partition":"aws",
   "id":"38af75470eced5f1c6e4ee9895961baa",
   "arn":"arn:aws:guardduty:us-east-1:012345678910:detector/aaaf7420746be13be119afd94e417684/finding/38af75470eced5f1c6e4ee9895961baa",
   "type":"Recon:EC2/PortProbeUnprotectedPort",
   "resource":{
      "resourceType":"Instance",
      "instanceDetails":{
         "imageId":"ami-06db9a11",
         "instanceId":"i-0d6c314027f74dc82",
         "instanceType":"m4.xlarge",
         "launchTime":1481719450000,
         "platform":null,
         "productCodes":[
         ],
         "iamInstanceProfile":{
            "arn":"arn:aws:iam::012345678910:instance-profile/nodes.k8s.travellogic.info",
            "id":"AIPAJQDPNZCGEVVUZ4FEW"
         },
         "networkInterfaces":[
            {
               "ipv6Addresses":[
               ],
               "privateDnsName":"ip-172-20-45-123.ec2.internal",
               "privateIpAddress":"172.20.45.123",
               "privateIpAddresses":[
                  {
                     "privateDnsName":"ip-172-20-45-123.ec2.internal",
                     "privateIpAddress":"172.20.45.123"
                  }
               ],
               "subnetId":"subnet-1637825f",
               "vpcId":"vpc-c9c4f0ae",
               "securityGroups":[
                  {
                     "groupName":"nodes.k8s.travellogic.info",
                     "groupId":"sg-67e3bb1d"
                  }
               ],
               "publicDnsName":"ec2-54-89-171-133.compute-1.amazonaws.com",
               "publicIp":"54.89.171.133"
            }
         ],
         "tags":[
            {
               "key":"KubernetesCluster",
               "value":"k8s.travellogic.info"
            },
            {
               "key":"Name",
               "value":"nodes.k8s.travellogic.info"
            },
            {
               "key":"k8s.io/role/node",
               "value":"1"
            },
            {
               "key":"aws:autoscaling:groupName",
               "value":"nodes.k8s.travellogic.info"
            }
         ],
         "instanceState":"running",
         "availabilityZone":"us-east-1a"
      }
   },
   "service":{
      "serviceName":"guardduty",
      "detectorId":"aaaf7420746be13be119afd94e417684",
      "action":{
         "actionType":"NETWORK_CONNECTION",
         "networkConnectionAction":{
            "connectionDirection":"INBOUND",
            "remoteIpDetails":{
               "ipAddressV4":"180.70.170.34",
               "organization":{
                  "asn":9318,
                  "asnOrg":"SK Broadband Co Ltd",
                  "isp":"SK Broadband",
                  "org":"SK Broadband"
               },
               "country":{
                  "countryCode":"KR",
                  "countryName":"South Korea"
               },
               "city":{
                  "cityName":"Uijeongbu-si"
               },
               "geoLocation":{
                  "lat":37.7415,
                  "lon":127.0474
               }
            },
            "remotePortDetails":{
               "port":59740,
               "portName":"Unknown"
            },
            "localPortDetails":{
               "port":22,
               "portName":"SSH"
            },
            "protocol":"TCP",
            "blocked":false
         }
      },
      "resourceRole":"TARGET",
      "additionalInfo":{
         "additionalPorts":[
            22
         ]
      },
      "eventFirstSeen":"2017-11-01T21:31:05.542+0000",
      "eventLastSeen":"2017-11-01T21:31:05.542+0000",
      "archived":false,
      "count":743
   },
   "severity":2,
   "createdAt":"2017-11-01T21:31:05.542+0000",
   "updatedAt":"2017-11-01T21:31:05.542+0000",
   "title":"Unprotected port in EC2 Instance i-0d6c314027f74dc82 is being probed.",
   "description":"EC2 Instance i-0d6c314027f74dc82 has an unprotected port 22 which is being probed by a known malicious host with IP address 180.70.170.34."
}
```

</details>

### Sample Query

The following query is from the **Threats by Region** panel of the **Amazon GuardDuty - Threat Details** dashboard:

```sql
_sourceCategory=*guardduty*
| json field=_raw "accountId", "region", "partition", "id", "arn", "type","service.serviceName","service.detectorId","service.action","severity","title","description" nodrop
| parse field=type "*:*/*" as ThreatPurpose,ResourceType,ThreatName
| json field=%service.action "networkConnectionAction.localPortDetails.port" as localPort nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.ipAddressV4" as ip nodrop
| parse "\"vpcId\":\"*\"" as vpcId, "\"subnetId\":\"*\"" as subnetId,"\"groupId\":\"*\"" as securityGroupId,"\"tags\":[*]" as tags,"\"groupName\":\"*\"" as securityGroupName nodrop
| if(severity=0, "Info",if(severity=2, "Low", if(severity=5, "Medium", if(severity=8, "High",if(severity=9.5, "Critical",severity))))) as severity
| timeslice 15m
| count by _timeslice, region
| transpose row _timeslice column region
```

## Viewing the Amazon GuardDuty Benchmark Dashboards  

Amazon GuardDuty is an intelligence threat detection service that provides accurate, continuous monitoring to protect AWS accounts and workloads. The Sumo Logic Amazon GuardDuty Benchmark App integrates Sumo Logic Global Intelligence Service (GIS) with Amazon GuardDuty for statistical baselines for KRIs (key risk indicators). These baselines enable you to optimize security configuration and threat detection on all your AWS accounts. The App includes preconfigured dashboards for global threat baselines and threat detection across your AWS environment.

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### 1. Amazon GuardDuty Global Baseline

The **Amazon GuardDuty Global Baseline** dashboard displays a collection of stats averaged over Amazon GuardDuty findings for all Sumo Logic customers over the prior 7 days.

Use this dashboard to:
* Determine if you are being attacked from a particular region or actor around the globe.
* Assess rare threats found by Amazon GuardDuty in your AWS environment.
* Analyze threat shares targeted resource and severity.

<img src={useBaseUrl('img/integrations/amazon-aws/GDB_Global_Baseline.png')} alt="Amazon GuardDuty Benchmark" />


### 2. My Company's Amazon GuardDuty Threats

The **My Company's Amazon GuardDuty Threats** dashboard shows a company's stats for Amazon GuardDuty findings over the specified time interval. This provides detailed and summary for your company's threat mix, threat maps, threat shares, and threat resources.

Use this dashboard to:
* Determine the number of threats in your AWS account.
* Determine the geographic origins of threats to your AWS account.
* Analyze threats by resource type, severity, account ID, and AWS Security Group.

<img src={useBaseUrl('img/integrations/amazon-aws/GDB_My_Company_Amazon_GuardDuty_Threats.png')} alt="Amazon GuardDuty Benchmark" />


### 3. My Company v. Global Baseline: All Threats

The **My Company v. Global Baseline: All Threats** dashboard compares your company's threat profile, based on Amazon GuardDuty findings, with the average threat profile of Sumo Logic customers.  

<img src={useBaseUrl('img/integrations/amazon-aws/GDB_My_Company_v_Global_Baseline_All_Threats.png')} alt="Amazon GuardDuty Benchmark" />

Use this dashboard to:
* Understand how you company differs from other Sumo Logic customers with respect to GuardDuty security findings.
* View overall threat posture on a 0 (high risk) to 100 (low risk) scale based on scoring your company's threat, their rarity, and severity.
* Create an action plan for GuardDuty findings prioritized on their potential to improve GuardDuty posture.
* Assess trends in GuardDuty posture scores and the reason for changes in security posture over time.
* Compare the severity mix of your company versus Sumo Logic customers.


### 4. My Company v. Global Baseline: Rare Threats

The** My Company v. Global Baseline: Rare Threats** dashboard compares your company against Sumo Logic customers with respect to rare threats, defined as threats that account for less than 0.2% of total GuardDuty findings.

<img src={useBaseUrl('img/integrations/amazon-aws/GDB_My_Company_v_Global_Baseline_Rare_Threats.png')} alt="Amazon GuardDuty Benchmark" />

Use this dashboard to:
* Understand how you company differs from other Sumo Logic customers with respect to rare GuardDuty security findings.
* View the total number of rare threats in your environment.
* Create an action plan for rare GuardDuty findings prioritized on their potential to improve GuardDuty posture.
* Assess trends in rare GuardDuty findings.


### 5. My Company's Threats: Timeline

The **My Company's Threats: Timeline** dashboard provides a high-level view of threats in your AWS environment over time. Panels show threats over time, broken down by region, as well as a one day comparison.

<img src={useBaseUrl('img/integrations/amazon-aws/GDB_My_Company_Threats_Timeline.png')} alt="Amazon GuardDuty Benchmark" />

Use this dashboard to:
* Review threat activity in your account over a specified time.  
* Analyze threats to your account by region.  
