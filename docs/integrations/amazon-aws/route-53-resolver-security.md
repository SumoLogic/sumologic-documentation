---
id: route-53-resolver-security
title: Amazon Route53 Resolver Security
description: AUse the Amazon Route 53 app to monitor and visualize DNS activity in your AWS infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/route53.png')} alt="Thumbnail icon" width="50"/>

Amazon Route 53 Resolver is a highly available cloud-based DNS service from Amazon. The Sumo Logic Route 53 Resolver Security app enables you to monitor both Query Logs, and if in use, the DNS Firewall logs.

Query logging enables visibility to inbound and outbound DNS queries to the Resolver endpoint. Integrating the logs with Sumo Logic provides insights such as queries by location or instance id.

With [Route 53 Resolver DNS Firewall](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html), you can filter and regulate outbound DNS traffic for your virtual private cloud (VPC). To do this, you create reusable collections of filtering rules in DNS Firewall rule groups, associate the rule groups to your VPC. By integrating these DNS Firewall logs with Sumo Logic you can monitor VPC activity for misconfigurations and suspicious traffic.

DNS Firewall is a feature of Route 53 Resolver and doesn't require any additional Resolver setup to use.

## Log Types
The Amazon Route 53 Resolver Security app uses:
* [Route 53 Resolver query log](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs-example-json.html)
* [DNS Resolver Firewall Log](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/firewall-resolver-query-logs-configuring.html)

If you aren't using DNS Resolver Firewall, the Amazon Route 53 Resolver Security app can still provide security insights from your [resolver query logs](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs-example-json.html), but data specific to the DNS Resolver Firewall data will not populate in the corresponding panels.

## Collect Logs for the Amazon Route 53 Resolver Security App

This topic has instructions for collecting logs for the Amazon Route 53 Resolver Security app.


### Before you start

If you want to set up Route 53 Resolver DNS Firewall, see the Amazon Developer Guide for [instructions](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/firewall-resolver-query-logs-configuring.html).  


### Set up collection

1. Create an [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source). Make a note of the **HTTP Source Address** for the source. You'll need it for the Cloudformation template below.
2. Set up CloudWatch to stream logs to Kinesis Data Firehose using the [Cloudformation Template](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source#CloudFormation_Template)
3. In this step, enable DNS query logging, as described in [Managing Resolver query logging configurations](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logging-configurations-managing.html) in AWS help.
   * When you select the type of AWS resource to which you want Resolver to send query logs, choose **Kinesis Data Firehose delivery stream** as the Destination for the Query Logs.
   * Click **Browse streams** and select the Kinesis Data Firehose delivery stream that was created by the Sumo Logic CloudFormation template. It should start with ​​`Kinesis-Logs-<random-string>`.
   * Click **Add VPC** in the **VPCs to log queries for** section.
4. Complete your configuration by clicking **Configure query logging** at the bottom of the page.
5. Your new configuration will now be listed.


### Sample log message

[Route 53 Resolver query log example](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs-example-json.html)


## Installing the Amazon Route 53 Resolver Security App

Locate and install the app from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. In the App Catalog, search for and select the app.
4. Click **Add to Library**.
3. To install the app, complete the following fields.   				 
    1. **App Name**. You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source**. Select either of these options for the data source. 
        * Choose **Source Category,** and select a source category from the list. 
        * Choose **Enter a Custom Data Filter,** and enter a custom source category beginning with an underscore. Example: (`__sourceCategory=MyCategory_`). 
    3. **Advanced**. Select the Location in Library (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Amazon Route 53 Resolver Security Dashboards

### Query Logging Overview

The Query Logging Overview Dashboard provides insights into DNS activities such as DNS queries by location, VPC and instance ID. Additional security information is provided, including blocked and alerted DNS queries from the Route 53 DNS Resolver Firewall, and Threat Intel matches from Sumo Logic's CrowdStrike integration.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Route-53-Resolver-Security-Query-Logging-Overview.png')} alt="Amazon Route 53 Resolver Security Dashboards" />

Use this dashboard to:

* Identify unusual or changes in DNS activity.
* Identify possible malicious or anomalous behavior by reviewing high entropy domains, most and least queried domains.
* Analyze DNS requests violating your Route 53 DNS Resolver Firewall policies.
* Review Threat Intel matches.


Panels include:
* IPv4 Resolution by Geo Location
* Top 10 Queried Domains
* Least 10 Queried Domains
* DNS Queries Over 24H by Type and VPC-ID
* DNS Queries by Instance ID and Source Address
* Top 50 Highest Entropy Domains
* Total Hits from Threat Intel Source
* Threats Over Time
* Threat Outlier
* Anomalies within Alerted DNS Queries
* Anomalies within Blocked DNS Queries
* Alerted DNS Queries by Instance ID Over Time
* Top 10 Alerted Domains
* Top 10 Blocked Domains
* Blocked DNS Queries by Instance ID Over Time


### Resolver DNS Firewall

The Resolver DNS Firewall Dashboard provides monitoring and insights into DNS Firewall activity.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Route-53-Resolver-Security-Resolver-DNS-Firewall.png')} alt="Amazon Route 53 Resolver Security Dashboards" />

Use this Dashboard to:
* Analyze Blocked and Alerted DNS Queries by Domain, Instance ID, Rule Group ID, Domain List ID
* Help identify possible DNS exfiltration attempts
* Identify communications to known bad domains


Panels include:
* Alerted Queries IPv4 Resolution by GeoLocation
* Alerted DNS Queries by Rule Group ID & Domain List ID
* Alerted Queries by Instance ID and Source Address
* Anomalies within Alerted DNS Queries
* Alerted DNS Queries by Instance ID Over Time
* Top 10 Alerted Domains
* Blocked DNS Queries by Rule Group ID & Domain List ID
* Blocked Queries by Instance ID and Source Address
* Anomalies within Blocked DNS Queries
* Blocked DNS Queries by Instance ID Over Time
* Top 10 Blocked Domains


### Security Detail

Security Detail Dashboard provides insights into DNS activities such as number of DNS requests and data throughput by VPC and instance ID. The Dashboard also provides a detailed drill down per request, displaying information such as the request, request type, ASN Number and ASN Org Name and DNS Resolver Firewall Actions.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Route-53-Resolver-Security-Security-Details.png')} alt="Amazon Route 53 Resolver Security Dashboards" />

Use this Dashboard to identify:
* Possible data exfiltration over DNS
* Communication to possible DGA Domains
* Beaconing behavior
* Potential Network Footprinting/Discovery Activity
* Communication to known Malicious Domains using Threat Intelligence


Panels include:
* DNS Queries Over 24H by Type and VPC-ID
* DNS Queries by Instance ID and Source Address
* Bytes Sent Over DNS Requests by Instance ID
* Bytes Sent Over DNS Requests by VPC
* Top 50 Highest Entropy Domains
* Top 50 Domains by Query Length and InstanceID
* DNS Queries by Instance ID and Source Address
* Resolver Query Logs Detail
* Reverse DNS Query to Non-Existent Domain by Query Name & Instance ID
* Reverse DNS Query to Non-Existent Domain by Query Name
* Reverse DNS Query to Non-Existent Domain by Instance ID
* Successful Reverse DNS Query by Query Name & Instance ID
* Successful Reverse DNS Query by nstance ID
* Successful Reverse DNS Query by Query Name
* Total Hits from Threat Intel Source
* Threats Over Time
* Threat Outlier


### Threat Intel

The Threat Intel Dashboard provides details of AWS DNS Resolver Queries that matches the built-in CrowdStrike threat intelligence data with known malicious IP addresses and Domains, allowing for real-time security analytics to help detect threats in your environment and protect against cyber attacks.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Route-53-Resolver-Security-Threat-Intel.png')} alt="Amazon Route 53 Resolver Security Dashboards" />

Panels include:
* Threat Count
* Threat by Malicious Confidence
* Threat by Actor
* Threats by Instance ID
* Threats Over Time
* Threats Over Time by Instance ID
* Threat Table
* Malicious URIs
* Malicious IPs
