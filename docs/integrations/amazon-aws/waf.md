---
id: waf
title: AWS WAF
description: The Sumo Logic app for AWS Web Application Firewall (WAF) analyzes traffic flowing through AWS WAF and automatically detects threats via Sumo Logic Threat Intel.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/waf.png')} alt="Thumbnail icon" width="50"/>

AWS Web Application Firewall (WAF) is a web application firewall that helps protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources.

The Sumo Logic app for AWS WAF analyzes traffic flowing through AWS WAF and automatically detects threats using Sumo Logic Threat Intel. The app provides pre-configured dashboards and searches that allow you to monitor threat and traffic details by client IP,  allowed and blocked traffic, malicious IPs, threat actors, location, rules configured, trends and more.


## Sample log messages

```json
{
  "webaclId": "360cb717-5a9f-4f2f-ac64-09ab912af591",
  "terminatingRuleId": "1809ecc9-81fd-4dff-99e7-a27421213155",
  "terminatingRuleType": "REGULAR",
  "action": "BLOCK",
  "httpSourceName": "CF",
  "httpSourceId": "i-123",
  "ruleGroupList": [],
  "rateBasedRuleList": [],
  "matchingNonTerminatingRules": [],
  "httpRequest": {
    "clientIp": "125.5.11.56",
    "country": "US",
    "headers": [
      {
        "name": "Host",
        "value": "127.0.0.1:1989"
      },
      {
        "name": "User-Agent",
        "value": "curl/7.53.1"
      },
      {
        "name": "Accept",
        "value": "*/*"
      }
    ],
    "uri": "/Lists/b/ref=sva_videos_2?ie=UTF   ",
    "args": "name=10; DROP TABLE members",
    "httpVersion": "HTTP/1.1",
    "httpMethod": "GET",
    "requestId": "distribution_id"
  },
  "formatVersion": 1,
  "timestamp": 1535493873231
}
```

## Sample queries  

```sql title="Client IP Threat Info"
_sourceCategory=AWS/WAF {{client_ip}}
| parse "\"httpMethod\":\"*\"," as httpMethod,"\"httpVersion\":\"*\"," as httpVersion,"\"uri\":\"*\"," as uri, "{\"clientIp\":\"*\",\"country\":\"*\"" as clientIp,country, "\"action\":\"*\"" as action, "\"matchingNonTerminatingRules\":[*]" as matchingNonTerminatingRules, "\"rateBasedRuleList\":[*]" as rateBasedRuleList, "\"ruleGroupList\":[*]" as ruleGroupList, "\"httpSourceId\":\"*\"" as httpSourceId, "\"httpSourceName\":\"*\"" as httpSourceName, "\"terminatingRuleType\":\"*\"" as terminatingRuleType, "\"terminatingRuleId\":\"*\"" as terminatingRuleId, "\"webaclId\":\"*\"" as webaclId nodrop
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=clientip
```

## Collecting Logs for the AWS WAF app

Follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.

### Before you begin

In this step you set up AWS WAF to send log data to an S3 bucket using an Kinesis Data Firehose. In the next step, you'll configure Sumo to collect logs from the bucket.

1. Enable WAF logging to a Kinesis Stream, as described in AWS help.
2. Configure an Amazon S3 bucket as the destination of the Kinesis Stream, as described in [Amazon Kinesis Data Firehose Data Delivery](https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html) in AWS help.
3. Confirm that logs are being delivered to the S3 bucket.
4. [Grant Sumo Logic Access to the Amazon S3 Bucket](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).


### Configure a Sumo collector and source to receive AWS WAF logs

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. To your Hosted Collector, add an [Amazon S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your S3 bucket.
    * **Bucket Name**. Enter the exact name of your S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions).) The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter a source category. For example, AWS/WAF.
    * **Access Method**. Select the appropriate AWS access control mechanism.
    * **Scan Interval**. Use the default of Automatic, or select a scan interval from the pulldown.
    * **Enable Timestamp Parsing**. Select the **Extract timestamp information from log file entries** check box.
    * **Time Zone**. Select **Ignore time zone from the log file and instead use**, and select **UTC** from the dropdown.
    * **Timestamp Format.** Select **Automatically detect the format**.
    * **Enable Multiline Processing**. Select the **Detect messages spanning multiple lines** check box, and select **Infer Boundaries**.
3. Click **Save**.

## Installing the AWS WAF app

Now that you have set up collection for AWS WAF, install the Sumo Logic app for AWS AWS to use the pre-configured searches and dashboards.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing AWS WAF dashboards

### AWS WAF Overview

See an overview of threats detected and traffic passing through AWS WAF.
<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-overview.png')} alt="AWS WAF" />

### AWS WAF Threat Intelligence

See details of threats allowed and blocked by AWS WAF.
<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-threat-intelligence.png')} alt="AWS WAF" />

### AWS WAF Traffic

See details of allowed and blocked AWS WAF traffic by location, rules and outliers.
<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-traffic.png')} alt="AWS WAF" />
