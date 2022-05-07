---
id: sumo-faqs
---

# Sumo Logic FAQs

See the following FAQS on Sumo Logic.

## What is the optimal log format to use with Sumo Logic?

When you have full control over your logging format we recommend human
readable key-value pairs whenever possible. JSON and XML are also
acceptable, though XML is harder to read and parse than JSON. 

Whatever you use follow these rules:

* Use key-value pairs in a regular, defined format such as `key=value,` so they're easy to [parse](/docs/search/search-query-language/parse-operators).
* Start logs with a regular, well-defined timestamp, ideally including a time zone. See [timestamp considerations and supported formats](../send-data/sources/reference-information-sources/time-reference.md) for details.
* Start logs with a regular format to make automatically detecting message boundaries easier. See [collecting multiline logs] (../../03Send-Data/Sources/04Reference-Information-for-Sources/Collecting-Multiline-Logs.md) for details.

For example, from our own production logs, we use the following:

```
2012-08-16 13:39:36,979 [metrics] INFO com.sumologic.util.Reporter - com.sumologic.util.scala.Aggregator.Buffer[/usr/sumo/stream-19.5-3/logs/stream.log]-Size-Meter (bytes/s) count=78847, fifteenMinuteRate=0.26, fiveMinuteRate=0.11, oneMinuteRate=0.00, meanRate=1.06
```

This is a key-value pair log, which is easy to parse and easy to read in Sumo.

## What Types of Logs Can I Collect?

The following table lists data types and some of the popular sources
that produce logs, which can be collected by Sumo Logic. This list is a
sample only to provide a general idea of the possible sources of log
data; it is not complete.

| Data Type | Popular Log Sources |
| -- | -- |
| Custom App Code | <ul><li>Java</li><li>[Log4J] (/03Send-Data/Collect-from-Other-Data-Sources/Sumo-Logic-Open-Source-Projects)</li><li>Log4J 2</li><li>Microsoft .NET</li><li>Rails</li></ul> |
| Open Source | <ul><li>Apache</li><li>[Apache Tomcat] (/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat)</li><li>Hadoop</li><li>Lucene</li></ul> |
| Middleware | <ul><li>JBoss</li><li>Oracle WebLogic</li><li>webMethods</li><li>WebSphere</li></ul> |
| Databases	 | <ul><li>IBM DB2</li><li>[MySQL] (/07Sumo-Logic-Apps/12Databases/MySQL)</li><li>[Microsoft SQL Server] (/07Sumo-Logic-Apps/04Microsoft-and-Azure/Microsoft_SQL_Server/01Collect-Logs-for-the-Microsoft-SQL-Server-App)</li><li>Oracle</li></ul> |
| Server / OS | <ul><li>HP UX</li><li>[Linux] (/07Sumo-Logic-Apps/14Hosts_and_Operating_Systems/Linux)</li><li>Mac</li><li>Red Hat</li><li>Ubuntu</li><li>Windows</li></ul> |
| Virtual | <ul><li>Citrix</li><li>Microsoft Hyper-V</li><li>VMware</li></ul> |
| Network | <ul><li>[Cisco ASA] (/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Cisco_ASA)</li><li>[Palo Alto Networks] (/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Palo_Alto_Networks_6)</li><li>McAfee</li><li>Symantec</li></ul> |
| Content Delivery | <ul><li>[Akamai] (/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Akamai_Cloud_Monitor)</li><li>[Amazon CloudFront] (/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_CloudFront)</li><li>[Fastly] (/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Fastly)</li><li>Limelight Networks</li></ul> |
| IaaS / PaaS | <ul><li>Amazon</li><li>[Heroku](../manage/connections-and-integrations/sumo-logic-heroku.md)</li><li>Windows</li><li>[Google Audit] (/03Send-Data/Sources/02Sources-for-Hosted-Collectors/G-Suite-Apps-Audit-Source)</li><li>[Google Cloud Platform (GCP)] (/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Google-Cloud-Platform-Source)</li></ul> |
| SaaS | <ul><li>[Box] (/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Box)</li><li>[ServiceNow](../manage/connections-and-integrations/servicenow/set-up-servicenow-connections.md)</li><li>[Salesforce] (/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Salesforce)</li><li>[Microsoft Office 365] (/07Sumo-Logic-Apps/04Microsoft-and-Azure/Microsoft_Office_365)</li></ul> |
| Security | <ul><li>Cisco</li><li>McAfee</li><li>Symantec</li><li>Qualys</li></ul> |

## Where is My Data Stored?

Where your data is stored depends on the geographical location the
Account Owner selected when establishing your Sumo Logic account. 

* Australia. Your data is stored in the AWS ap-southeast-2 (Sydney) region.
* Canada. Your data is stored in the AWS ca-central-1 (Central) region.
* Europe - Ireland. Your data is stored in the AWS eu-west-1 (Ireland) region.
* Europe - Frankfurt. Your data is stored in the AWS eu-central-1 (Frankfurt) region.
* India - Mumbai. Your data is stored in the AWS ap-south-1 (Mumbai) region.
* Japan. Your data is stored in the AWS ap-northeast-1 (Tokyo) region.
* North America. Your data is stored in the AWS us-east-1 (Northern Virginia) or us-west-2 (Oregon) region.

Your data is stored only in your region. 

For more information, see [AWS Regions and Endpoints.](http://docs.aws.amazon.com/general/latest/gr/rande.html)

Also see our [Privacy Statement](https://www.sumologic.com/privacy-statement/).