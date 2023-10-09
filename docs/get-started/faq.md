---
id: faq
title: Sumo Logic FAQ
sidebar_label: FAQ
---


Frequently asked questions about Sumo Logic.

## What is the optimal log format to use with Sumo Logic?

When you have full control over your logging format we recommend human readable key-value pairs whenever possible. JSON and XML are also acceptable, though XML is harder to read and parse than JSON. 

Whatever you use follow these rules:

* Use key-value pairs in a regular, defined format such as `key=value,` so they're easy to [parse](/docs/search/search-query-language/parse-operators).
* Start logs with a regular, well-defined timestamp, ideally including a time zone. See [timestamp considerations and supported formats](/docs/send-data/reference-information/time-reference.md) for details.
* Start logs with a regular format to make automatically detecting message boundaries easier. See [collecting multiline logs](/docs/send-data/installed-collectors/sources/define-boundary-regex-multiline-messages.md) for details.

For example, from our own production logs, we use the following:

```json
2012-08-16 13:39:36,979 [metrics] INFO com.sumologic.util.Reporter - com.sumologic.util.scala.Aggregator.Buffer[/usr/sumo/stream-19.5-3/logs/stream.log]-Size-Meter (bytes/s) count=78847, fifteenMinuteRate=0.26, fiveMinuteRate=0.11, oneMinuteRate=0.00, meanRate=1.06
```

This is a key-value pair log, which is easy to parse and easy to read in Sumo.

## What Types of Logs Can I Collect?

The following table lists data types and some of the popular sources that produce logs, which can be collected by Sumo Logic. This list is a sample only to provide a general idea of the possible sources of log data; it is not complete.

| Data Type | Popular Log Sources |
| :-- | :-- |
| Custom App Code | <ul><li>Java</li><li>[Log4J](/docs/send-data/collect-from-other-data-sources/sumo-logic-open-source-projects.md)</li><li>Log4J 2</li><li>Microsoft .NET</li><li>Rails</li></ul> |
| Open Source | <ul><li>Apache</li><li>[Apache Tomcat](/docs/integrations/web-servers/apache-tomcat)</li><li>Hadoop</li><li>Lucene</li></ul> |
| Middleware | <ul><li>JBoss</li><li>Oracle WebLogic</li><li>webMethods</li><li>WebSphere</li></ul> |
| Databases	 | <ul><li>IBM DB2</li><li>[MySQL](/docs/integrations/databases/mysql)</li><li>[Microsoft SQL Server](/docs/integrations/microsoft-azure/sql-server#Collecting-Logs-for-the-Microsoft-SQL-Server-App)</li><li>Oracle</li></ul> |
| Server / OS | <ul><li>HP UX</li><li>[Linux](/docs/integrations/hosts-operating-systems/linux)</li><li>Mac</li><li>Red Hat</li><li>Ubuntu</li><li>Windows</li></ul> |
| Virtual | <ul><li>Citrix</li><li>Microsoft Hyper-V</li><li>VMware</li></ul> |
| Network | <ul><li>[Cisco ASA](/docs/integrations/security-threat-detection/cisco-asa)</li><li>[Palo Alto Networks](/docs/integrations/security-threat-detection/palo-alto-networks-6)</li><li>McAfee</li><li>Symantec</li></ul> |
| Content Delivery | <ul><li>[Akamai](/docs/integrations/saas-cloud/akamai-cloud-monitor)</li><li>[Amazon CloudFront](/docs/integrations/amazon-aws/cloudfront)</li><li>[Fastly](/docs/integrations/saas-cloud/fastly)</li><li>Limelight Networks</li></ul> |
| IaaS / PaaS | <ul><li>Amazon</li><li>[Heroku](/docs/manage/connections-integrations/heroku.md)</li><li>Windows</li><li>[Google Audit](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/google-workspace-apps-audit/)</li><li>[Google Cloud Platform (GCP)](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source.md)</li></ul> |
| SaaS | <ul><li>[Box](/docs/integrations/saas-cloud/box)</li><li>[ServiceNow](/docs/alerts/webhook-connections/servicenow/set-up-connections.md)</li><li>[Salesforce](/docs/integrations/saas-cloud/salesforce)</li><li>[Microsoft Office 365](/docs/integrations/microsoft-azure/office-365)</li></ul> |
| Security | <ul><li>Cisco</li><li>McAfee</li><li>Symantec</li><li>Qualys</li></ul> |

## Where is My Data Stored?

Where your data is stored depends on the geographical location the
Account Owner selected when establishing your Sumo Logic account. 

* Australia. Your data is stored in the AWS ap-southeast-2 (Sydney) region.
* Canada. Your data is stored in the AWS ca-central-1 (Central) region.
* Europe. Ireland. Your data is stored in the AWS eu-west-1 (Ireland) region.
* Europe. Frankfurt. Your data is stored in the AWS eu-central-1 (Frankfurt) region.
* India. Mumbai. Your data is stored in the AWS ap-south-1 (Mumbai) region.
* Japan. Your data is stored in the AWS ap-northeast-1 (Tokyo) region.
* North America. Your data is stored in the AWS us-east-1 (Northern Virginia) or us-west-2 (Oregon) region.
* Federal. Your data is stored in the AWS us-east-1 (Northern Virginia) region.

Your data is stored only in your region. 

For more information, see [AWS Regions and Endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html) and our [Privacy Statement](https://www.sumologic.com/privacy-statement/).
