---
id: waf
title: AWS WAF
description: The Sumo Logic App for AWS Web Application Firewall (WAF) analyzes traffic flowing through AWS WAF and automatically detects threats via Sumo Logic Threat Intel.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/waf.png')} alt="Thumbnail icon" width="50"/>

AWS Web Application Firewall (WAF) is a web application firewall that helps protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources.

The Sumo Logic App for AWS WAF analyzes traffic flowing through AWS WAF and automatically detects threats using Sumo Logic Threat Intel. The App provides pre-configured dashboards and searches that allow you to monitor threat and traffic details by client IP,  allowed and blocked traffic, malicious IPs, threat actors, location, rules configured, trends and more.


## Sample Log Message

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


## Sample Query  

```sql title="Client IP Threat Info"
_sourceCategory=AWS/WAF {{client_ip}}
| parse "\"httpMethod\":\"*\"," as httpMethod,"\"httpVersion\":\"*\"," as httpVersion,"\"uri\":\"*\"," as uri, "{\"clientIp\":\"*\",\"country\":\"*\"" as clientIp,country, "\"action\":\"*\"" as action, "\"matchingNonTerminatingRules\":[*]" as matchingNonTerminatingRules, "\"rateBasedRuleList\":[*]" as rateBasedRuleList, "\"ruleGroupList\":[*]" as ruleGroupList, "\"httpSourceId\":\"*\"" as httpSourceId, "\"httpSourceName\":\"*\"" as httpSourceName, "\"terminatingRuleType\":\"*\"" as terminatingRuleType, "\"terminatingRuleId\":\"*\"" as terminatingRuleId, "\"webaclId\":\"*\"" as webaclId nodrop
| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=clientip
```



## Collecting Logs for the AWS WAF App

Our new app install flow is now in Beta. It is only enabled for certain customers while we gather Beta customer feedback. If you can see the Add Integration button, follow the "Before you begin" section in the "Collect Logs" help page and then use the in-product instructions in Sumo Logic to set up the app.


### Before you begin

In this step you set up AWS WAF to send log data to an S3 bucket using an Kinesis Data Firehose. In the next step, you'll configure Sumo to collect logs from the bucket.

1. Enable WAF logging to a Kinesis Stream, as described in AWS help.
2. Configure an Amazon S3 bucket as the destination of the Kinesis Stream, as described in [Amazon Kinesis Data Firehose Data Delivery](https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html) in AWS help.
3. Confirm that logs are being delivered to the S3 bucket.
4. [Grant Sumo Logic Access to the Amazon S3 Bucket](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product.md).


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
    * **Enable Timestamp Parsing**. Select the checkbox.
    * **Time Zone**. Click **Ignore time zone** **from log file and instead use**, and select "UTC" from the list of time zones.
    * **Timestamp Format**. Click **Automatically detect the format**.
    * **Enable Multiline Processing**. Click the checkbox, and select **Infer Boundaries**.
3. Click **Save**.



## Installing the AWS WAF App

Now that you have set up collection for AWS WAF, install the Sumo Logic App for AWS AWS to use the pre-configured searches and dashboards.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    * **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing AWS WAF Dashboards

### AWS WAF Overview

See an overview of threats detected and traffic passing through AWS WAF.

<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-overview.png')} alt="AWS WAF" />


### AWS WAF Threat Intelligence

See details of threats allowed and blocked by AWS WAF.

<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-threat-intelligence.png')} alt="AWS WAF" />



### AWS WAF Traffic

See details of allowed and blocked AWS WAF traffic by location, rules and outliers.

<img src={useBaseUrl('img/integrations/amazon-aws/aws-waf-traffic.png')} alt="AWS WAF" />
