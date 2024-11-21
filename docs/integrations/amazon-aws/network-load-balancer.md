---
id: network-load-balancer
title: AWS Network Load Balancer
description: The Sumo Logic app for AWS Network Load Balancer is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy, and to quickly identify errors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/networkLoadBalancer.png')} alt="Thumbnail icon" width="50"/>

AWS Network Load Balancer service is distributed in OSI Layer 4 (the network layer) traffic (TCP, UDP, TLS) and can handle over a million requests per second.

The Sumo Logic app for AWS Network Load Balancer is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy, and to quickly identify errors.

## Metric types  

The AWS Network Load Balancer app uses AWS Network Load Balancer metrics.

### Sample queries

```sql title="Active Flows (Connections) by Load Balancer (Metric-based)"
account=* region=* LoadBalancer=* Namespace=aws/NetworkELB metric=ActiveFlowCount Statistic=Sum | sum by account, region, namespace, LoadBalancer
```

## Collecting Metrics for AWS Network Load Balancer app

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

Namespace for **Amazon Network Load Balancer** Service is **AWS/NetworkELB.**

* **Metadata**: Add an **account** field to the source and assign it a value which is a friendly name / alias to your AWS account from which you are collecting metrics. Metrics can be queried via the “account field”.


### Field in Field Schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the “**networkloadbalancer**” field. 
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).

### Field Extraction Rule(s)

Create Field Extraction Rule for AWS Network Load Balancer Access Logs. Learn how to create Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

#### Create/Update Field Extraction Rule(s) for Classic Load Balancer CloudTrail logs
```sql
Rule Name: AwsObservabilityNLBCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventSource eventName "elasticloadbalancing.amazonaws.com" "2015-12-01"
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "recipientAccountId", "requestParameters.name", "requestParameters.type", "requestParameters.loadBalancerArn", "apiVersion" as event_source, region, accountid, networkloadbalancer, loadbalancertype, loadbalancerarn, api_version nodrop 
|"" as namespace
| where event_source = "elasticloadbalancing.amazonaws.com" and api_version matches "2015-12-01" 
| parse field=loadbalancerarn ":loadbalancer/*/*/*" as balancertype, networkloadbalancer, f1 nodrop
| if(loadbalancertype matches "network", "aws/nlb", if(balancertype matches "net", "aws/nlb", namespace)) as namespace
| if(loadbalancertype matches "application", "aws/applicationelb", if(balancertype matches "app", "aws/applicationelb", namespace)) as namespace
| where namespace="aws/nlb" or isEmpty(namespace)
| toLowerCase(networkloadbalancer) as networkloadbalancer  
| fields region, namespace, networkloadbalancer, accountid
```

### Metric Rules

Create the following Metric Rule for the AWS/NetworkELB namespace if not already created. Learn how to create a Metrics Rule [here](/docs/metrics/metric-rules-editor#create-a-metrics-rule).

```sql title="Rule 1*"
Rule name: AwsObservabilityNLBMetricsAddonEntityRule
Metric match expression: Namespace=AWS/NetworkELB LoadBalancer=*
Variable name: networkloadbalancer
Tag sequence: $LoadBalancer._1
Save it
```

## Installing the AWS Network Load Balancer app

This section has instructions for installing the Sumo Logic app for **AWS Network Load Balancer** and descriptions of each of the app dashboards along with associated use cases.

Now that you have set up a collection for **AWS Network Load Balancer**, install the Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing AWS Network Load Balancer Dashboards

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Overview

**The AWS Network Load Balancer - Overview** dashboard provides detailed insights into a view of network utilization and performance. The dashboard provides information about the errors, health, and traffic handled by the load balancer.

Use this dashboard to:
* Get an at-a-glance view of the number of errors and status of backend hosts.
* Identify load balancers with the most number of unhealthy hosts.
* Monitor trends around active connections, bytes processed, and reset packets to ensure load balancers are operating as expected.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-Overview.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>


### Active and New Flows

**The AWS Network Load Balancer - Active and New Flows** dashboard provides detailed insights for new flows, and active flows for TCP, TLS, and UDP traffic.

Use this dashboard to:
* Monitor trends around active and new flows (connections) to make sure they line up with expectations and then use that information to scale up/scale down backend hosts.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-Flows.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>


### Host Health Status


**The AWS Network Load Balancer - Host Health Status** dashboard provides detailed insights into the number of healthy and unhealthy hosts.

Use this dashboard to:

* Get a quick overview of the number of healthy and unhealthy hosts.
* Monitor trends around the number of unhealthy hosts to spot potential service disruptions that could warrant deeper investigation.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-health.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>



### Errors

**The AWS Network Load Balancer - Errors** dashboard provides detailed insights into the errors reported by the network load balancer. This dashboard shows information for the total number of TLS handshakes that failed during negotiation between a client and a TLS listener, and the total number of TLS handshakes that failed during negotiation between a TLS listener and a target.

Use this dashboard to:
* Monitor TLS handshake errors during negotiation between a client and a TLS listener, which could happen if clients are sending an incorrect cipher or are using incorrect protocols not matching the one specified in the security policy. It’s recommended to use the most recent AWS CLI client version.
* Monitor TLS handshake errors during negotiation between a TLS listener and a target. Possible causes for this error include a mismatch of ciphers or protocols.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-errors.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>



### Reset (RST) Packets


**The AWS Network Load Balancer - Reset (RST) Packets** dashboard provides detailed insights into the number reset (RST) packets received by the network load balancer. The dashboard shows the information for the total number of reset (RST) packets sent from a client to a target , the total number of reset (RST) packets generated by the load balancer, and the total number of reset (RST) packets sent from a target to a client.

Use this dashboard to:
* To monitor the number of RST packets. A high number of reset packets could indicate connections are getting dropped and could mean a disruption in service.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-rst.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>


### Processed Bytes

**The AWS Network Load Balancer - Processed Bytes** dashboard provides detailed insights into the amount of bytes processed by the load balancer for total, UDP, TCP and TLS traffic.

Use this dashboard to:
* Monitor trends around processed bytes to make sure they line up with expectations and then use that information to scale up or scale down backend hosts.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-bytes.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>


### Consumed LCUs

The **AWS Network Load Balancer - Consumed LCUs** dashboard shows you the total number of load balancer capacity units (LCU) used by your load balancer by network protocol.

You pay for the number of LCUs that you use per hour.

Use this dashboard to:
* Optimize load balancer costs by monitoring trends around the number of load balancer capacity units (LCU) used by network protocol.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-NLB-LCUs.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>

### CloudTrail Audit

The **AWS Network Load Balancer - CloudTrail Audit** dashboard provides a comprehensive overview of AWS Network Load Balancer activities through CloudTrail audit logs. It visualizes successful and failed events globally, event trends, error details, and user activities, offering insights into load balancer performance, security, and usage patterns.

Use this dashboard to:
* Monitor the geographical distribution of successful and failed load balancer events, allowing for quick identification of regions with high activity or potential issues.
* Track the overall success rate of load balancer events and analyze trends over time, helping to identify any sudden changes or patterns in performance.
* Investigate specific error events, including their details, frequency, and associated users, enabling faster troubleshooting and resolution of issues.
* Identify the most common error types and the users experiencing the highest failure rates, facilitating targeted improvements and user support.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Network-Load-Balancer-CloudTrail-Audit.png')} alt="AWS Network Load Balancer dashboards" style={{border: '1px solid gray'}} width="800"/>
