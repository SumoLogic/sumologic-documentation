---
id: guardduty
title: Amazon GuardDuty
description: The Amazon GuardDuty Sumo Logic app provides insights into the activities in your AWS account based on the findings from Amazon GuardDuty, detect unexpected and potentially malicious activities in your AWS account by providing details on threats by severity, VPC, IP, account ID, region, and resource type.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/guardduty.png')} alt="Thumbnail icon" width="50"/>

Amazon GuardDuty is a continuous security monitoring service that analyzes and processes VPC Flow Logs and AWS CloudTrail event logs. The Sumo Logic App for Amazon GuardDuty provides insights into the activities in your AWS account based on the findings from Amazon GuardDuty. The App includes preconfigured dashboards that allow you to detect unexpected and potentially malicious activities in your AWS account by providing details on threats by severity, VPC, IP, account ID, region, and resource type.

## Log types

The Sumo Logic App for GuardDuty requires the Amazon GuardDuty findings to be sent through the Amazon CloudWatch Events. For more details on GuardDuty findings, see [here](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html).

### Sample log messages

<details>
<summary>Click to expand</summary>

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

### Sample queries

<details>
<summary>Click to expand</summary>

```sql title="Threat details"
_sourceCategory=aws/guardduty
| json field=_raw "accountId", "region", "partition", "id", "arn", "type","service.serviceName","service.detectorId","service.action","severity","title","description" nodrop
| json field=_raw "resource.resourceType" as resourceType nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.ipAddressV4" as ip nodrop
| json field=%service.action "networkConnectionAction.localPortDetails.port" as localPort nodrop
| parse "\"vpcId\": \"*\"" as vpcId, "\"subnetId\": \"*\"" as subnetId,"\"groupId\": \"*\"" as securityGroupId,"\"tags\": [*]" as tags,"\"groupName\": \"*\"" as securityGroupName nodrop
| json field=_raw "resource.instanceDetails.instanceId" as instanceid nodrop
| if(severity=2, "Low", if(severity=5, "Medium", if(severity=8, "High",severity))) as severity
| if(!isNull(instanceid),concat ("https://",region,".console.aws.amazon.com/ec2/v2/home?region=",region,"#Instances:search=",instanceid),"") as link
| json field=%service.action "networkConnectionAction.remoteIpDetails.geoLocation.lon" as longitude nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.geoLocation.lat" as latitude nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.organization.asnOrg" as asnOrg nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.organization.org" as organization nodrop
| json field=%service.action "networkConnectionAction.remoteIpDetails.organization.isp" as isp nodrop
| count as count by title, accountId, resourceType, organization, isp, ip, link
| sort count
```

</details>

## Collecting logs for the Amazon GuardDuty app

You can collect the Amazon GuardDuty logs using two methods: 

- [Method 1: Collecting Amazon GuardDuty logs using EventBridge](#method-1-collecting-amazon-guardduty-logs-using-eventbridge)
- [Method 2: Collecting Amazon GuardDuty logs using Sumo Logic HTTP endpoint](#method-2-collecting-amazon-guardduty-logs-using-sumo-logic-http-endpoint)

### Method 1: Collecting Amazon GuardDuty logs using EventBridge

This method leverages AWS EventBridge to streamline the logging process by sending data directly to Sumo Logic via an HTTP endpoint. By eliminating intermediary services such as Lambda, it offers a more straightforward and cost-effective solution.

#### Step 1: Create an HTTP source in Sumo Logic

To create an HTTP source in Sumo Logic, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).

#### Step 2: Configure EventBridge API destination

Follow the steps below to configure the EventBridge API destination:
1. Sign in to your [Amazon EventBridge Console](https://us-east-1.console.aws.amazon.com/events/home?region=us-east-1#/).
1. In the navigation bar, click **API destinations**.
1. Click **Create destination**.
1. Enter a name for the API Destination.
1. Provide the HTTP Source URL from Sumo Logic.
1. Click **Create a new connection** to create a connection for the API destination.
  1. Provide a connection name.
  1. Keep the API Type as **Public**.
  1. Select **Basic (Username/Password)** in the **Authorization type**.
  1. Add any value of your choice for **Username** and **Password**.

#### Step 3: Create the EventBridge rule

Follow the steps below to create the EventBridge rule:
1. Sign in to your [Amazon EventBridge Console](https://us-east-1.console.aws.amazon.com/events/home?region=us-east-1#/).
1. In the navigation bar, click **Rules**.
1. Set the event source to **AWS services** and then select **Security Hub** as the AWS service.
1. Select **All Events** in Event Type.
1. Under **Select targets**, choose **EventBridge API destination**.
1. Select the API Destination created in Step 2.
1. Select **Create a new role for this specific resource** in the **Execution role**.
1. Click **Create** to activate the rule.

### Method 2: Collecting Amazon GuardDuty logs using Sumo Logic HTTP endpoint

This method uses an AWS Lambda function to process, store, and forward logs to Sumo Logic. While it offers a robust solution, it introduces additional AWS resources, such as Lambda, which can increase both cost and complexity.

- Amazon GuardDuty sends notifications based on CloudWatch events when new findings, or new occurrences of existing findings, are generated.
- A CloudWatch events rule enables CloudWatch to send events for the GuardDuty findings to the Sumo `CloudWatchEventFunction` Lambda function.
- The Lambda function sends the events to an HTTP source on a Sumo Logic hosted collector.

This configuration is defined in a [AWS Serverless Application Model (SAM) specification](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html) published in the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/). You do not need to manually create the necessary AWS resources. You simply deploy the configuration, as described in Step 2 below.

#### Step 1: Configure an HTTP source

1. In Sumo Logic, configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. In Sumo Logic, configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). When you configure the source:
    * Select **Forward to SIEM** if you have [Cloud SIEM](/docs/cse) installed and you want to forward log data to Cloud SIEM. If you select **Forward to SIEM**, also click the **+Add** link and add a field whose name is `_parser` with value */Parsers/System/AWS/GuardDuty*.
    * In the **Advanced Options for Logs** section of the page:
       * Specify **Format** as `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
       * Specify **Timestamp locator** as `.*"updatedAt":"(.*)".*`

When you configure the HTTP Source, make a note of the HTTP Source Address URL. You will need it in the next step.  

#### Step 2: Deploy Sumo Logic GuardDuty events processor

In this step, you deploy the events processor. This will create the AWS resources described in [Collection overview](#collecting-logs-for-the-amazon-guardduty-app).

1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for “sumologic-guardduty-events-processor”.
3. When the page for the Sumo app appears, click **Deploy**.
4. In **Configure application parameters** panel, paste the URL for the HTTP source you created above.
5. Click **Deploy**.


#### Configure optional environment variables

1. Go to the AWS Lambda console.
2. Search for the `"aws-serverless-repository-CloudWatchEventFunction-<_suffix_>"` function and click it.
3. Scroll down to the **Environment variables** section. You can set any of the following optional variables:
    * `ENCODING` (optional). Encoding to use when decoding CloudWatch log events. Default is utf-8.
    * `SOURCE_CATEGORY_OVERRIDE` (optional). Override `_sourceCategory` value configured for the HTTP source.
    * `SOURCE_HOST_OVERRIDE` (optional). Override `_sourceHost` value configured `for` the HTTP source.
    * `SOURCE_NAME_OVERRIDE` (optional). Override `_sourceName` value configured for the HTTP source.


## Installing the Amazon GuardDuty App

Now that you have set up collection for Amazon GuardDuty, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallV2 from '../../reuse/apps/app-install-v2.md';

<AppInstallV2/>

## Viewing Amazon GuardDuty dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

See the overview of GuardDuty threats including the severity, threat purpose, resource type, threat name, account ID, and region.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_GuardDuty-Overview2.png')} alt="Amazon GuardDuty dashboards" />

**GuardDuty Threat Map**. See the count of threats on a world map in the last 24 hours.

**High Severity Threats Table**. See the details of high severity threats in the last 24 hours including the time, account ID, region, resource type, description, and link, displayed in a table.

**Severity Trend.** See the trend of the various severity levels in the last 24 hours on an area chart.

**Threats by ThreatPurpose, ResourceType, ThreatName**. See the details of threats in the last 24 hours including the threat purpose, resource type, threat name, and count displayed in a table.

**Threats by IP**. See the count of threats by IP addresses in the last 24 hours on a pie chart.

**Severity and AccountID**. See the count of severity levels in the last 24 hours by Account ID on a bar chart.

**Severity and Region**. See the count of severity levels in the last 24 hours by region on a bar chart.

**Severity and ResourceType**. See the count of severity levels in the last 24 hours by resource type on a bar chart.

### CloudTrail Details

See the details of GuardDuty CloudTrail threats including the count, title, the trend, and action type.

<img src={useBaseUrl('img/integrations/amazon-aws/CloudTrailDetails.png')} alt="Amazon GuardDuty dashboards" />

**CloudTrail Threats.** See the count of CloudTrail threats in the last 24 hours.

**CloudTrail Threats by Title Trend**. See the count of CloudTrail threats by title in the last 24 hours on a pie chart.

**CloudTrail Threats by Title Trend**. See the trend of CloudTrail threats by title in the last 24 hours on a column chart.

**CloudTrail Threats by Title Trend**. See the details of CloudTrail threats by title in the last 24 hours including the threat purpose, resource type, threat name, accesskey ID, username, and count, displayed in a table.

**CloudTrail Threats by Title, ActionType**. See the details of CloudTrail threats in the last 24 hours including the account ID, region, title, accesskey ID, principal ID,  action type, severity, and count, displayed in a table.

### Details

See the GuardDuty threat details including the count, account-region trend, threat purpose, severity, resource type, and security group.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-GD-Details.png')} alt="Amazon GuardDuty dashboards" />

**Outliers - All Threats**. See the outliers in all threats in the last 24 hours on a line chart.

**Threat Count by Account-Region Trend**. See the trend of the count of threats by account-region in the last 24 hours on a column chart.

**Threat Details Summary Table.** See the details of threats in the last 24 hours including the title, account ID, resourcetype, organization, ISP, IP, link, and count, displayed in a table.

**Threats by ThreatPurpose, Severity**. See the count of threats in the last 24 hours by the severity and purpose on a bar chart.

**Threats by ResourceType**. See the count and percentage of threats in the last 24 hours by resource type on a pie chart.

**Severity by LocalPort**. See the count of severity by local port in the last 24 hours on a bar chart.

**Threats by SecurityGroup**. See the count and percentage of threats in the last 24 hours by security group on a pie chart.

### VPCs, Subnets, Security Group Details

See the details of GuardDuty threats by VPC, security group, and subnet ID.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCsSubnetsSecurityGroupDetails.png')} alt="Amazon GuardDuty dashboards" />

**Threat Type by VPC**. See the count of threat type by VPC in the last 24 hours displayed on a bar chart.

**Threats by SecurityGroup**. See the count of threats by security group in the last 24 hours displayed on a pie chart.

**Severity Count by SubnetID**. See the count of severity in the last 24 hours by Subnet ID on a bar chart.

**VPC, Subnet, and Security Group Threat Table.**  See the details of severity in the last 24 hours including the account ID, severity, region, VPC ID, Subnet ID,  security group name and ID,  threat purpose, resource type, threat name, and count, displayed in a table.
