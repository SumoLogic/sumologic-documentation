---
id: threat-intel
title: AWS Threat Intel
description: The Threat Intel for AWS App correlates CrowdStrike threat intelligence data with your AWS log data, allowing for real-time security analytics to help detect threats in your environment and protect against cyber-attacks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/threat-intel-aws.png')} alt="Thumbnail icon" width="75"/>

The Threat Intel for AWS App correlates CrowdStrike threat intelligence data with your AWS log data, allowing for real-time security analytics to help detect threats in your environment and protect against cyber-attacks. The Threat Intel for AWS App scans your AWS CloudTrail, AWS ELB and AWS VPC Flow logs for threats based on IP address.

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professions accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.


## Collect Logs for the Threat Intel for AWS App

The Threat Intel for AWS App utilizes AWS logs and VPC Flow Logs.

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professional accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.


### Configure Collectors and Sources

If you are not already collecting your AWS logs, follow the instructions below to collect data from one or more of these data sources:
* [Collect AWS CloudTrail Logs](/docs/integrations/amazon-aws/cloudtrail#collecting-logs-for-the-aws-cloudtrail-app)
* [Collect AWS ELB Logs](/docs/integrations/amazon-aws/classic-load-balancer#collecting-logs-and-metrics)

VPC Flow Logs can be published to Amazon CloudWatch Logs and Amazon S3. Each method has advantages. Using an Amazon S3 source is more reliable, while using a CloudFormation template allows you to customize your logs by adding more information and filtering unwanted data. You can use either of the following methods to collect Amazon VPC Flow Logs:
* [Using an Amazon S3 source](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-using-an-aws-s3-source)
* [Using a CloudFormation template](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-from-cloudwatch-using-cloudformation)


## Installing the Threat Intel for AWS App

The Sumo Logic Threat Intel lookup database is only available with Sumo Logic Enterprise and Professions accounts, or during a 30-day trial period. The Threat Intel lookup database is not available for Sumo Logic Free accounts.

Now that you have set up collection, install the Sumo Logic App for Threat Intel for AWS to use the preconfigured searches and [Dashboards](/docs/integrations/amazon-aws/threat-intel#viewing-threat-intel-dashboards) that provide insight into your data.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Threat Intel Dashboards

All Dashboards include filters that you can use in Interactive Mode for further analysis of your Threat Intel data.


### Overview

High-level view of the threats identified by Threat Intel in your AWS CloudTrail, VPC Flow Logs, and ELB systems.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Threat-Intel-overview.png')} alt="AWS Threat Intel" />

* **Welcome to Threat Intel for AWS.** See an informational panel to help you get started with Threat Intel. You can close this panel once you’ve read the text and visited the FAQs.
* **Scanned Events Over Time.**  See the number of events scanned while looking for threats during the last 24 hours, broken down by source type.  
* **CloudTrail. **Count of threats detected in CloudTrail logs for the last 24 hours. Click this panel to drill down further on threats identified for CloudTrail and you’ll be taken to the Threat Intel - AWS CloudTrail dashboard.
* **VPC.** Count of threats detected in VPC Flow logs for the last 24 hours. Click this panel to drill down further on threats identified for VPC Flow Logs and you’ll be taken to the Threat Intel - AWS VPC dashboard.
* **ELB. **Count of threats detected in ELB logs for the last 24 hours. Count of threats detected in ELB for the last 24 hours. Click this panel to drill down further on threats identified for VPC and you’ll be taken to the Threat Intel - AWS ELB dashboard.
* **Threats over Time - CloudTrail**. Count of threats to CloudTrail over the last 24 hours timesliced by hour to give you a trend of threats identified over time.
* **Threats over Time - VPC.** Count of threats to VPC Flow logs over the last 24 hours timesliced by hour to give you a trend of threats identified over time
* **Threats over Time - ELB.** Count of threats to ELB over the last 24 hours timesliced by hour to give you a trend of threats identified over time.
* **Threat Outlier - CloudTrail.** See any time when the count of threats with a malicious confidence of High to CloudTrail goes outside the set threshold.
* **Threat Outlier - VPC.** See any time when the count of threats with a malicious confidence of High to VPC FLow Logs goes outside the set threshold.
* **Threat Outlier - ELB - Classic.** See any time when the count of threats with a malicious confidence of High to ELB goes outside the set threshold.


### AWS CloudTrail

Use this dashboard for details on potential threats and IOCs for AWS CloudTrail.

<img src={useBaseUrl('img/integrations/amazon-aws/ThreatIntelAWSCloudTrail.png')} alt="AWS Threat Intel" />

* **Threats by Geo Location.** View the geo location of threats by IP address that have been identified by Crowdstrike with a malicious confidence of High over the last 24 hours.
* **Threats Associated with CloudTrail Events.** Track events in CloudTrail by event time where the malicious confidence is High by source user, source IP address, event name, AWS region, result, malicious confidence, label name, threat malware families, threat last updated, and count for the last 24 hours.
* **Threats by Events and I.P.** Compare events where the malicious confidence is High by source IP address over the last 24 hours.
* **Threats Over Time by Result. **Compare successful versus access denied threats with a High malicious confidence for the last 24 hours, timesliced by hour.
* **Threats By Actor.** Compare High malicious confidence threats by actor over the last 24 hours.
* **Threats by Events and Result. **Compare events identified as threats with a High malicious confidence and see the number of successful versus access denied results for the last 24 hours.


### Amazon VPC Flow Logs

Use this dashboard for details on potential threats and IOCs for AWS VPC Flow Logs.

<img src={useBaseUrl('img/integrations/amazon-aws/ThreatIntelAWSVPCFlowLogs.png')} alt="AWS Threat Intel" />

* **Geo Location of Threats with Rejected Flow Logs.** View the location of the source IP address of threats identified as High malicious confidence and rejected VPC flow logs for the last 24 hours.
* **Geo Location of Threats with Accepted Flow Logs.** View the location of the source IP address of threats identified as High malicious confidence and accepted VPC flow logs for the last 24 hours
* **Threats Associated with Rejected Flow Logs.** View an aggregation table of High malicious confidence threats with rejected flow logs and compare the the interface ID, account ID, source, destination, protocol, malicious confidence, label name, threat malware families, threat last updated, and count.
* **Threats Associated with Accepted Flow Logs.** View an aggregation table of High malicious confidence threats with accepted flow logs and compare the the interface ID, account ID, source, destination, protocol, malicious confidence, label name, threat malware families, threat last updated, and count.
* **Top 10 Threat Sources by Action. **View a barchart of the top ten threat sources by source IP address, action and count over the last 24 hours.
* **Threat Breakdown.** View a bar chart of threats over the last 24 hours by count, actor, and action
* **Threats Over Time by Action.** View a trend over the last 24 hours of accepted and rejected threats.


### AWS Elastic Load Balancing

Use this dashboard for details on potential threats and IOCs for Elastic Load Balancing.

<img src={useBaseUrl('img/integrations/amazon-aws/ThreatIntelAWSELB.png')} alt="AWS Threat Intel" />

* **Threats by Geo Location. **View the latest threats identified the geo location of their by source IP address.
* **Threats Associated with Client IP. ** View an aggregation table of threats by client IP with a malicious confidence of High that contains the ELB server, ELB status code, full request, source IP,  source port, back end host, destination port, malicious confidence, label name, threat malware families, and threat last updated.
* **Client IP threats by ELB Server.** View threats by client IP with a malicious confidence of High by ELB Server.
* **Threats By Actor. **View a count of total threats with a malicious confidence of High for the last 24 hours, broken up by Actor.
* **Client IP Threats Over Time by ELB Server. **View a line chart of the threats by client IP address with high malicious confidence over the last 24 hours.
* **Threats Associated with Hostname.** View an aggregation table of threats by hostname with a malicious confidence of High that contains the ELB server, ELB status code, full request, host name,  source port, back end host, destination port, malicious confidence, label name, threat malware families, and threat last updated over the last 24 hours.
* **Threats Associated with URL (Request).** View threats by URL where the malicious confidence is high over the last 24 hours.
