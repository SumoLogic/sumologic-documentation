---
id: network-load-balancer
title: AWS Network Load Balancer
description: The Sumo Logic app for AWS Network Load Balancer is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy, and to quickly identify errors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/networkLoadBalancer.png')} alt="Network Load Balancer icon" width="50"/>

AWS Network Load Balancer service is distributed in OSI Layer 4 (the network layer) traffic (TCP, UDP, TLS) and can handle over a million requests per second.

The Sumo Logic app for AWS Network Load Balancer is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy, and to quickly identify errors.

## Log and metric types  

The Sumo Logic app for AWS Network Load Balancer uses the following logs and metrics:
* [AWS Network Load Balancer CloudTrail Logs](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/cloudtrail-logs.html)
* [AWS Network Load Balancer CloudWatch Metrics](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html)

### Sample logs

<details>
<summary>Sample CloudTrail Log Message</summary>

```json
{
  "eventVersion": "1.11",
  "userIdentity": {
    "type": "AssumedRole",
    "principalId": "AROATIK2E7SUFL6GB4G44:1782467664281479421",
    "arn": "arn:aws:sts::224064240808:assumed-role/pdet-eks-irsa-prod-aws-lb-controller/1782467664281479421",
    "accountId": "224064240808",
    "accessKeyId": "ASIATIK2E7SUH6GUXFK4",
    "sessionContext": {
      "sessionIssuer": {
        "type": "Role",
        "principalId": "AROATIK2E7SUFL6GB4G44",
        "arn": "arn:aws:iam::224064240808:role/pdet-eks-irsa-prod-aws-lb-controller",
        "accountId": "224064240808",
        "userName": "pdet-eks-irsa-prod-aws-lb-controller"
      },
      "webIdFederationData": {
        "federatedProvider": "arn:aws:iam::224064240808:oidc-provider/oidc.eks.us-west-2.amazonaws.com/id/0499F131BE8B24AAE70BF8AD8EB16D3A",
        "attributes": {}
      },
      "attributes": {
        "creationDate": "2026-06-26T09:54:24Z",
        "mfaAuthenticated": "false"
      }
    }
  },
  "eventTime": "2026-06-26T09:54:25Z",
  "eventSource": "elasticloadbalancing.amazonaws.com",
  "eventName": "DescribeLoadBalancers",
  "awsRegion": "us-west-2",
  "sourceIPAddress": "44.241.82.204",
  "userAgent": "aws-sdk-go-v2/1.36.3 ua/2.1 os/linux lang/go#1.24.5 md/GOOS#linux md/GOARCH#amd64 api/elasticloadbalancingv2#1.45.0 elbv2.k8s.aws/v2.13.4 m/C,E",
  "requestParameters": {
    "loadBalancerArns": [
      "arn:aws:elasticloadbalancing:us-west-2:224064240808:loadbalancer/net/k8s-gloosyst-gatewayp-9e3a2f18b7/262e2df5d81d69e3"
    ]
  },
  "responseElements": null,
  "requestID": "b231b530-2877-467d-9a0b-eb9b0fed0f39",
  "eventID": "7800ac19-806e-434e-b2b0-aec11ad7d312",
  "readOnly": true,
  "eventType": "AwsApiCall",
  "apiVersion": "2015-12-01",
  "managementEvent": true,
  "recipientAccountId": "224064240808",
  "eventCategory": "Management",
  "tlsDetails": {
    "tlsVersion": "TLSv1.3",
    "cipherSuite": "TLS_AES_128_GCM_SHA256",
    "clientProvidedHostHeader": "elasticloadbalancing.us-west-2.amazonaws.com"
  }
}
```
</details>

### Sample queries

```sql title="Active Flows (Connections) by Load Balancer (Metric-based)"
account=* region=* LoadBalancer=* Namespace=aws/NetworkELB metric=ActiveFlowCount Statistic=Sum | sum by account, region, namespace, LoadBalancer
```

```sql title="Successful Events Details"
account=* region=* "\"eventsource\":\"elasticloadbalancing.amazonaws.com\"" "2015-12-01"
| json "userIdentity", "eventSource", "eventName", "awsRegion", "sourceIPAddress", "userAgent", "eventType", "recipientAccountId", "requestParameters", "responseElements", "requestID", "errorCode", "errorMessage", "apiVersion" as userIdentity, event_source, event_name, region, src_ip, user_agent, event_type, recipient_account_id, requestParameters, responseElements, request_id, error_code, error_message, api_version nodrop
| where event_source = "elasticloadbalancing.amazonaws.com" and api_version matches "2015-12-01"
| where namespace matches "aws/networkelb" or isEmpty(namespace)
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop
| parse field=arn ":assumed-role/*" as user nodrop
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop
| json field=requestParameters "name" as networkloadbalancer nodrop
| if (isBlank(accountid), recipient_account_id, accountid) as accountid
| where (tolowercase(networkloadbalancer) matches tolowercase("*")) or isBlank(networkloadbalancer)
| if (isEmpty(error_code), "Success", "Failure") as event_status
| where event_status= "Success"
| if (isEmpty(username), user, username) as user
| count as event_count by event_name
| sort by event_count, event_name asc
```

## Collecting logs and metrics for AWS Network Load Balancer

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect AWS Network Load Balancer CloudWatch metrics

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

   :::note
   Namespace for **AWS Network Load Balancer** service is **AWS/NetworkELB**.
   :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Collect AWS Network Load Balancer CloudTrail logs

#### Prerequisites

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
1. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
1. Confirm that logs are being delivered to the Amazon S3 bucket.

   :::note
   Namespace for **AWS Network Load Balancer** service is **AWS/NetworkELB**.
   :::

Follow the steps below to collect logs for AWS Network Load Balancer (NLB):
1. Configure a [CloudTrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. Add custom metadata [fields](/docs/manage/fields) with your logs:
   1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
   1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which logs are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and logs can be queried using the `account` field.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. After adding fields, check their status indicators:
      * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
      * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
         * You will have the option to automatically add or enable the field.
         * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Centralized AWS CloudTrail log collection

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name / alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudtrail/logs
```

#### Parse Expression

Enter a parse expression to create an `account` field that maps to the alias you set for each sub account. For example, if you used the `dev` alias for an AWS account with ID `528560886094` and the `prod` alias for an AWS account with ID `567680881046`, your parse expression would look like:

```sumo
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the AWS Network Load Balancer app

Now that you have set up a collection for **AWS Network Load Balancer**, install the Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name / alias to the AWS account.
- `accountid` AWS account id.
- `region` The region to which the resource name belongs to.
- `namespace` Namespace for AWS Network Load Balancer Service is AWS/NetworkELB.
- `networkloadbalancer` Network Load Balancer name.

#### Field Extraction Rule(s)

The FER **AwsObservabilityNLBCloudTrailLogsFER** to extract fields `region`, `namespace`, `accountid`, and `networkloadbalancer` will be created as a part of app installation.

#### Metric rule(s)

The Metric Rule **AwsObservabilityNLBMetricsRule** for the AWS/NetworkELB namespace will be created as a part of app installation.

import DoNotModify from '../../reuse/apps/do-not-modify-installed-content.md';

<DoNotModify/>

## Viewing AWS Network Load Balancer dashboards

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Overview

The **AWS Network Load Balancer - Overview** dashboard provides detailed insights into a view of network utilization and performance. The dashboard provides information about the errors, health, and traffic handled by the load balancer.

Use this dashboard to:
* Get an at-a-glance view of the number of errors and status of backend hosts.
* Identify load balancers with the most number of unhealthy hosts.
* Monitor trends around active connections, bytes processed, and reset packets to ensure load balancers are operating as expected.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/1.-AWS-Network-Load-Balancer-Overview.png' alt="AWS Network Load Balancer - Overview" style={{border: '1px solid gray'}} width="800" />


### Active and New Flows

The **AWS Network Load Balancer - Active and New Flows** dashboard provides detailed insights for new flows, and active flows for TCP, TLS, and UDP traffic. Use this dashboard to to monitor trends around active and new flows (connections) to make sure they line up with expectations, then use this information to scale up/scale down backend hosts.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/1.-AWS-Network-Load-Balancer-Active-and-New-Flows.png' alt="AWS Network Load Balancer - Active and New Flows" style={{border: '1px solid gray'}} width="800" />


### Host Health Status

The **AWS Network Load Balancer - Host Health Status** dashboard provides detailed insights into the number of healthy and unhealthy hosts.

Use this dashboard to:

* Get a quick overview of the number of healthy and unhealthy hosts.
* Monitor trends around the number of unhealthy hosts to spot potential service disruptions that could warrant deeper investigation.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/2.-AWS-Network-Load-Balancer-Host-Health-Status.png' alt="AWS Network Load Balancer - Host Health Status" style={{border: '1px solid gray'}} width="800" />

### Errors

The **AWS Network Load Balancer - Errors** dashboard provides detailed insights into the errors reported by the network load balancer. This dashboard shows information for the total number of TLS handshakes that failed during negotiation between a client and a TLS listener, and the total number of TLS handshakes that failed during negotiation between a TLS listener and a target.

Use this dashboard to:
* Monitor TLS handshake errors during negotiation between a client and a TLS listener, which could happen if clients are sending an incorrect cipher or are using incorrect protocols not matching the one specified in the security policy. It’s recommended to use the most recent AWS CLI client version.
* Monitor TLS handshake errors during negotiation between a TLS listener and a target. Possible causes for this error include a mismatch of ciphers or protocols.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/3.-AWS-Network-Load-Balancer-Errors.png' alt="AWS Network Load Balancer - Errors" style={{border: '1px solid gray'}} width="800" />


### Reset (RST) Packets

The **AWS Network Load Balancer - Reset (RST) Packets** dashboard provides detailed insights into the number reset (RST) packets received by the network load balancer. The dashboard shows the information for the total number of reset (RST) packets sent from a client to a target , the total number of reset (RST) packets generated by the load balancer, and the total number of reset (RST) packets sent from a target to a client.

Use this dashboard to monitor the number of RST packets. A high number of reset packets could indicate connections are getting dropped and could mean a disruption in service.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/4.-AWS-Network-Load-Balancer-Reset-RST-Packets.png' alt="AWS Network Load Balancer - Reset (RST) Packets" style={{border: '1px solid gray'}} width="800" />


### Processed Bytes

The **AWS Network Load Balancer - Processed Bytes** dashboard provides detailed insights into the amount of bytes processed by the load balancer for total, UDP, TCP and TLS traffic. Use this dashboard to monitor trends around processed bytes to make sure they line up with expectations and then use that information to scale up or scale down backend hosts.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/5.-AWS-Network-Load-Balancer-Processed-Bytes.png' alt="AWS Network Load Balancer - Processed Bytes" style={{border: '1px solid gray'}} width="800" />


### Consumed LCUs

The **AWS Network Load Balancer - Consumed LCUs** dashboard shows you the total number of load balancer capacity units (LCU) used by your load balancer by network protocol. Use this dashboard to optimize load balancer costs by monitoring trends around the number of load balancer capacity units (LCU) used by network protocol.

:::note
You pay for the number of LCUs that you use per hour.
:::

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/6.-AWS-Network-Load-Balancer-Consumed-LCUs.png' alt="AWS Network Load Balancer - Consumed LCUs" style={{border: '1px solid gray'}} width="800" />

### CloudTrail Audit

The **AWS Network Load Balancer - CloudTrail Audit** dashboard provides a comprehensive overview of AWS Network Load Balancer activities through CloudTrail audit logs. It visualizes successful and failed events globally, event trends, error details, and user activities, offering insights into load balancer performance, security, and usage patterns.

Use this dashboard to:
* Monitor the geographical distribution of successful and failed load balancer events, allowing for quick identification of regions with high activity or potential issues.
* Track the overall success rate of load balancer events and analyze trends over time, helping to identify any sudden changes or patterns in performance.
* Investigate specific error events, including their details, frequency, and associated users, enabling faster troubleshooting and resolution of issues.
* Identify the most common error types and the users experiencing highest failure rates, facilitating targeted improvements and user support.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSNetworkLoadBalancer/7.-AWS-Network-Load-Balancer-CloudTrail-Audit.png' alt="AWS Network Load Balancer - CloudTrail Audit" style={{border: '1px solid gray'}} width="800" />

## Create monitors for AWS Network Load Balancer app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AWS Network Load Balancer alerts

These alerts are available for the AWS Network Load Balancer app.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `AWS Network Load Balancer - Deletion Alert` | This alert fires when we detect greater than or equal to 2 network load balancers are deleted over a 5 minute time-period. | Count >= 2 | Count < 2 |
| `AWS Network Load Balancer - High TLS Negotiation Errors` | This alert fires when we detect that there are too many TLS Negotiation Errors (>=10%) within an interval of 5 minutes for a given network load balancer. | Percentage >= 10% | Percentage < 10% |
| `AWS Network Load Balancer - High Unhealthy Hosts` | This alert fires when we detect that there are too many unhealthy hosts (>=10%) within an interval of 5 minutes for a given network load balancer. | Percentage >= 10% | Percentage < 10% |
| `AWS Network Load Balancer - Targets Deregistered` | This alert fires when we detect greater than or equal to 1 target is de-registered over a 5 minute time-period. | Count >= 1 | Count < 1 |


## Upgrade/Downgrade the AWS Network Load Balancer app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the AWS Network Load Balancer app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
