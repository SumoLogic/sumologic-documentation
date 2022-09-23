---
id: service
title: Service Release Notes
sidebar_label: Service
description: Looking for more information about new features in the Sumo Logic Service? We'll post here about what's new and exciting with each release.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Service Release Notes for the current year are listed here. If you need to see previous Service Release Notes, check the [Archive](docs/releasenotes/archive).

---
## September 19, 2022 (Security)

Update - We've improved out Access Key UI to make it easy to spot Access Keys that haven't been used lately. Now the Access Keys management page displays the date and time an Access Key was last used to make a request to an API endpoint. For more information, see [Access Keys](docs/manage/security/access-keys.md) .

In a future update, Sumo Logic will, by default, automatically disable Access Keys that have not been used for 30 days. Your Sumo Logic admin will be able to configure the period of time before an unused key will be disabled.  

---
## September 15, 2022 (Apps)

Update - GitHub Advanced Security dashboards are now available for the Sumo Logic App for GitHub. These new dashbaords include Code Scanning Alerts, Pushes, Secret Scanning Alerts, Security and analyses and Repository Vulnerability alerts.

---
## September 12, 2022 (Alerts)

New - We’re happy to announce the release of Alert Grouping, which allows you to generate more than one alert from a given monitor by specifying a group condition on one or more fields. For example, rather than creating multiple monitors for each `service`, you could create one single monitor that notifies you when some metric (i.e., CPU utilization, error count) goes above the threshold for a given `service`. [Learn more](docs/alerts/monitors/alert-grouping.md).

New - Configurable Resolution Window for Logs allows more quickly resolve alerts when the underlying issues are fixed. You can configure how long a monitor will wait, before resolving the alert, when the underlying issues was corrected (earlier the monitor waited one complete window before resolving). [Learn more](docs/alerts/monitors#Configurable-Resolution-Window-for-Logs).

New - You can now access your monitor playbook as a template variable, `{{playbook}}`. You can reference this template variable to customize your notification payloads similar to any other template variable. [Learn more](docs/alerts/alert-variables.md).

---
## September 9, 2022 (Apps)

New - LambdaTest allows you to analyze your testing behavior and error trends. LambdaTest is a continuous quality testing cloud platform that helps developers and testers ship code faster. The [LambdaTest](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/LambdaTest) platform provides secure, scalable, and insightful test orchestration for customers at different points in their DevOps (CI/CD) lifecycle.

New - we’re happy to announce the release of the [Sumo Logic App for AWS Cost Explorer](docs/integrations/amazon-aws/cost-explorer.md), which allows you to visualize, understand, and manage your AWS costs and usage over time. 

With the Sumo Logic App for AWS Cost Explorer, you can use our out-of-the-box dashboards as well as filtering and grouping capabilities to dive deeper into your cost and usage data and generate custom insights. Gain a better understanding of your cost trends and see detailed information about the costs and usage associated with your top cost-accruing AWS accounts, regions, services, and operations.

Update - We are happy to announce the release of a new Explore Hierarchy for Database [Application Components](docs/observability/app-components.md), together with the support of related Database Entities in Entity Inspector. This functionality allows you to organize your data in a structured hierarchy and utilize the database dashboards available out-of-the-box from App Catalog. Currently, the following Database engines are supported by this feature:

* [Cassandra](docs/integrations/databases/cassandra.md)
* [Couchbase](docs/integrations/databases/couchbase.md)
* [Elasticsearch](docs/integrations/databases/elasticsearch.md)
* [MongoDB](docs/integrations/databases/mongodb.md)
* [MySQL](docs/integrations/databases/mysql.md)
* [PostgreSQL](docs/integrations/databases/postgresql.md)
* [Redis](docs/integrations/databases/redis.md)
* [SQL Server](docs/integrations/microsoft-azure/sql-server.md)
* [MariaDB](docs/integrations/databases/mariadb.md)
* [Memcached](docs/integrations/databases/memcached.md)
* [Oracle](docs/integrations/databases/oracle/index.md)
  
If you already use one of the above apps, you will need to reinstall it to benefit from the newly added functionality.

---
## September 8, 2022 (Traces)

New - we're happy to share extended coverage for [Real User Monitoring (RUM)](/docs/apm/rum), our solution that provides insight into your users' end-to-end browser experience interacting with your web apps. New RUM capabilities include:

* New dashboard panels for the following metrics:
   * XHR timing
   * longtask delays (browser freezes)
   * Core Web Vitals KPIs
   * Geolocation
* Single-page app support:
   * Monitoring of XHR calls and navigation/route changes
   * XHR performance and availability metrics
   * New specific Action names for XHR actions ("Click on [button] on [page]") and single-page app navigation/route change actions ("Route to [page]")
* New Explore tree levels for three new action types: document loads, XHR actions and route changes
* Browsers errors (e.g., unhandled errors/rejections, failed resources, console errors) are now captured automatically and populated in the `_index=sumologic_rum_errors` log index and dashboards
   * Browser errors ingest volume is now added to your Continuous tiers budgets and credits consumption.

This new functionality requires RUM script in version 4 or higher (`https://rum.sumologic.com/sumologic-rum-v4.js`). Please ensure you are using the correct version in your pages. For automatic updates, use `https://rum.sumologic.com/sumologic-rum.js`.

---
## August 30, 2022 (Metrics) 

We're delighted to announce the availability of these new operators: 

* [stddev](docs/metrics/metric-queries-alerts/operators.md#stddev)—Calculates the standard deviation of the metrics values that match the query.
* [in](docs/metrics/metric-queries-alerts/operators.md#in)—You can use this operator in a metrics query selector as shorthand for multiple OR conditions. 

---
## August 25, 2022 (Collection)

Update - We are pleased to announce that the following [Cloud-to-Cloud Integration Framework[docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework] sources are now available in Sumo Logic’s FedRAMP deployment: 

* [Crowdstrike](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source.md)
* [Crowdstrike FDR](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-source.md)
* [Duo](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source.md)
* [Sentinel One Mgmt API](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sentinelone-mgmt-api-source.md) 
* [Proofpoint Tap](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-tap-source.md)

---
## August 17, 2022 (Search)

Update - For Enterprise Suite customers, we’ve doubled the number of [Fields](/docs/manage/Fields) you can create. The per account Fields limit is now 400. The limit applies to Fields that you configure for sources or collectors and those you create using [Field Extraction Rules](/docs/manage/Field-Extractions).

---
## August 8, 2022 (Search)

The new UI for creating and managing [Scheduled Views](/docs/manage/Scheduled-Views) that we described [last week](#august-4-2022-search) is now released.

---
## August 5, 2022 (Apps)

New - We’re happy to announce the release of The Sumo Logic App for [Host Metrics (EC2)](docs/integrations/amazon-aws/ec2-cloudwatch-metrics.md). This App allows you to collect your EC2 instance metrics using Sumo Logic Installed Collector and display them using predefined search queries and Dashboards. The App provides Dashboards to analyze EC2 instance metrics for CPU, disk, memory, and network.

Update - We are glad to update that the Sumo Logic App for [MongoDB Atlas](/docs/integrations/databases/mongodb-atlas) now allows you to monitor database operations and performance KPIs and provides visibility into the security posture of your clusters.

---
## August 4, 2022 (Search)

Update - We’re preparing to release a new UI for creating and managing [Scheduled Views](/docs/manage/Scheduled-Views). The rollout will commence the week of August 8, 2022. The new interface is clean and compact—now you'll be able to configure a new Scheduled View in a right-hand pane that appears next to the list of existing Scheduled Views.


---
## August 3, 2022 (Observability)

New - We're thrilled to announce our new Observability feature, Reliability Management, a foundational capability that helps you define, monitor and manage your modern app stacks to Service Level Objectives (SLOs). Managing SLOs is key to ensuring that modern app stacks are performing reliably for end users. SLOs also help you focus on measuring what matters for their end user’s digital experiences. As a result, they can streamline Observability by minimizing the monitoring and alert chaos that exists in many organizations. Benefits include:

* Simple experience for Site Reliability Engineers (SREs) and developers to define and monitor even their most complex SLOs
* Full-featured SLOs that can model any SRE requirement and leverage logs, metrics, and tracing telemetry
* Automation through Terraform, allowing developers and SREs to templatize, operationalize and manage SLOs as code
* SLO data available as log messages enabling customers to extend existing dashboards to feature SLO data or build proprietary dashboard experiences

See our [Reliability Management](/docs/Observability/Reliability-Management-slo) docs for more information.

---
## August 3, 2022 (Traces)

Update - we've increased data retention for Trace queries from 7 days to 15 days, allowing for more time to search, filter, and diagnose recent issues. This 15-day extension comes at no additional cost. For more information, see [Viewing and Investigating Traces](/docs/apm/traces/Working-with-Tracing-data/View-and-investigate-traces).

---
## August 2, 2022 (Observability)

Update - We’re happy to announce the release of our **AWS Observability Solution v2.5.0**, which includes.

* Enhanced dashboards for [EC2 Host OS Metrics](docs/observability/aws/integrations/aws-ec2-metrics.md), including support for [Amazon EC2 CloudWatch](/docs/observability/aws/integrations/AWS-EC2-Metrics): now you can monitor your EC2 instances via CloudWatch and Installed Collector simultaneously and see results side-by-side.
* Support for [Amazon SNS](/docs/observability/aws/integrations/) - we’ve added out-of-the-box dashboards with the most important information about messages, events, and errors illustrating SNS health and reliability.
* Enhanced dashboards for supported Amazon services - the following services were updated and revamped DynamoDB, API Gateway, RDS, EC2 Metrics, ElastiCache, and All Load Balancers.
* New CLI-based onboarding flow: now, you can roll out a comprehensive AWS monitoring with just a single CLI command by providing your AWS and Sumo credentials.
* Streamlining of Root Cause Explorer drill-downs. While you can still find your AWS anomalies in the RCE screen from the new menu and Entities panel, we have removed RCE dedicated “Events of interests” dashboards from the top-level Dashboards drop-down menu.
* Simplified TerraForm onboarding process by importing Field Extraction Rules (FERs).
* Bug fixes.

---
## July 29, 2022 (Metrics)

New - Our `metricsfromtrace `and `rummetricsfromtrace` metrics have a new metadata tag, `deployment.environment`, which is automatically created from same tag (part of OpenTelemetry specification) present in tracing data. In case the tag is not present in spans, `deployment.environment` is set to default. This tag can be used to build custom dashboards by environments (i.e., prod, staging, test). Support for this field in Explore views and out-of-the-box dashboards is coming soon.

---
## July 28, 2022 (Security)

New - The [role capability](docs/manage/users-and-roles/roles/role-capabilities.md) we told you about [earlier](#july-18-2022-security) this month—**Download Search Results**—is now released. This capability, which grants the permission to download log search results, is enabled for all roles. Note that if you manage role capabilities using the Sumo Logic API or Terraform, you need to add the “downloadSearchResults” capability to the capabilities list for each role that should be able to download search results.

---
## July 22, 2022 (Apps)

New - The Sumo Logic App for [AWS EC2](docs/integrations/amazon-aws/ec2-cloudwatch-metrics.md) uses EC2 instance cloudwatch metrics & EC2 Cloudtrail events and displays them using predefined dashboards. The App provides dashboards with insights into KPIs related to CPU, disk, network, EBS, Health Status Check, and events from EC2 Cloudtrail.

Update - [Amazon Simple Notification Service](http://docs.aws.amazon.com/sns/latest/dg/welcome.html) (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

The Sumo Logic App for [Amazon SNS](/docs/integrations/amazon-aws) collects CloudTrail logs and CloudWatch metrics to provide insights into the operations and utilization of your SNS service. This includes tracking the most active topics, failures, errors, and geographical locations of SNS clients.

---
## July 21, 2022 (Metrics)

Update - When you query high cardinality metrics, the results can be hard to read and interpret. The Metrics Explorer now offers aggregation tips—recommendations for adding an aggregation clause to high cardinality metrics queries. You can easily add the suggested clause to your query, or ignore the suggestion, as desired. For more information, see [Metric Aggregation Tips](/docs/metrics/Metric-Queries-Alerts/).


---
## July 18, 2022 (Security)

Update - The week of July 25, 2022, we’ll be releasing a new [role capability](docs/manage/users-and-roles/roles/role-capabilities.md)—**Download Search Results**—that grants the permission to download log search results. This capability will be enabled for all roles. If you manage role capabilities using the Sumo Logic API or Terraform, when the new capability is released, you’ll need to add the “downloadSearchResults” capability to the capabilities list for each role that should be able to download search results.

---
## July 15, 2022 (Apps)

Update - The Sumo Logic [AWS Lambda](/docs/integrations/amazon-aws/Lambda) App uses the Lambda logs via CloudWatch, CloudWatch Metrics, and the CloudTrail Lambda Data Events to visualize the operational and performance trends in all the Lambda functions in your account. The preconfigured dashboards provide insights into executions, memory and duration usage by function versions or aliases, errors, billed duration, function callers, IAM users, and threat details. This app is updated from the AWS observability solution in the App Catalog. Updates include new Dashboards for Request, Error, Resource Usage, and Performance Analysis. Also, it includes a new Dashboard for analyzing Threat Intel.

New - The Sumo Logic App for [AWS Network Load Balancer](docs/integrations/amazon-aws/network-load-balancer.md) (that is a load balancer working on 4 layer of OSI model) is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy and to quickly identify errors.

---
## July 14, 2022 (Observability)

New - We’re pleased to announce our new in-product Kubernetes onboarding experience, which guides first-time users step by step through data collection setup (Orchestration, Infrastructure & App Data), the dashboard generation process, and alert monitors installation. To try it out, go to Sumo Logic > **App Catalog** > **Kubernetes** app > then follow the wizard steps. You can also refer to our new [Kubernetes Quickstart](/docs/observability/kubernetes/Quickstart) doc, which mirrors the in-product onboarding workflow.


---
## July 14, 2022 (Collection)

New - We’re pleased to announce the release of the [GCP Metrics Source](docs/send-data/hosted-collectors/google-source/gcp-metrics-source.md). The new source gives you visibility into Google Cloud Platform (GCP) infrastructure and managed services using an integrated Google Service account. You can collect metrics from 35 native GCP services, as well as from custom services running on GCP.

---
## July 13, 2022 (Manage)

Update - We have renamed our default partition from “Default Continuous Partition” to “sumologic_default”. Now you can directly query the data stored in the default partition, where all data is ingested unless explicitly routed into another partition. Any APIs that reference the default partition by its previous name, “Default Continuous Partition”, should be updated to refer to “sumologic_default” instead. For more information, see [Search the Default Partition](/docs/manage/partitions-and-data-tiers/run-search-against-partition#Search-the-default-partition).  

---
## July 8, 2022 (Apps)

Update - The Sumo Logic App for [AWS Observability Classic Load Balancer](/docs/integrations/amazon-aws/Classic-Load-Balancer) uses CW logs and metrics to give you visibility into the health of your Classic Load Balancer. Use the pre-configured dashboards to understand the latency, request and host status, threat intel, and HTTP backend codes by availability zone. This app is updated from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New), additional Dashboards to analyze Request and Process Bytes, and Dashboard to monitor Threat Intel.

Update - The Sumo Logic App for [Amazon ElastiCache](/docs/integrations/amazon-aws/Elasticache) provides visibility into key event and performance analytics that enable proactive diagnosis and response to system and environment issues. Use the preconfigured dashboards for at-a-glance analysis of event status trends, locations, successes, and failures, as well as system health and performance metrics. The dashboards also have additional performance insights for Redis clusters. This app is updated from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New) and new Dashboards for Redis performance details and Command Latency.

Update - The Sumo Logic App for [AWS Application Load Balancer](/docs/integrations/amazon-aws/Application-Load-Balancer) uses CW logs and metrics to give you visibility into the health of your Application Load Balancer and target groups. Use the preconfigured dashboards to understand the latency, request and host status, threat intel, and HTTP backend codes by availability zone and target group. This app is updated from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New) and new Dashboards for Response Analysis, Target Group Response Analysis, and Request and Processed Bytes.

---
## July 8, 2022 (Metrics)

New - Care to comment? Now you can. In the [Metrics Explorer,](/docs/metrics/metric-queries-alerts/metrics-explorer) in Advanced Mode you can add comments to a metrics query and comment out portions of the query by using comment formatting. Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries. For more information, see [Comments in Metric Queries](/docs/metrics/metric-queries-alerts/metrics-explorer).

Update - The [eval](/docs/metrics/metric-queries-alerts/operators#eval) metrics operator has been enhanced to support a `_granularity` option that provides the length, in milliseconds, of the bucket used for quantization, for use in metric queries.

---
## July 7, 2022 (Metrics)

Update - We’ve improved our zoom in feature for metric charts. Up until now, zooming into a metric chart simply increased the size of the chart. Now, for time series charts in which the query uses automatic quantization, when you zoom in the chart presents results based on more granular data: the bucket size across which results are quantized is reduced. For more information, see [Zoom in on a time series chart](/docs/metrics/metric-charts/interacting-metric-charts#Zoom-in-on-a-time-series-chart).



## 2022-07-08 (Observability)

New - We’re pleased to announce our new in-product Kubernetes onboarding experience, which guides first-time users step by step through data collection setup (Orchestration, Infrastructure & App Data), the dashboard generation process, and alert monitors installation. To try it out, go to Sumo Logic > **App Catalog** > **Kubernetes** app > then follow the wizard steps. You can also refer to our [Kubernetes Quickstart](/docs/observability/kubernetes/quickstart.md) doc, which mirrors the in-product onboarding workflow.

---

## 2022-07-08 (Metrics)

New - Care to comment? Now you can. In the Metrics Explorer, in Advanced Mode you can add comments to a metrics query and comment out portions of the query by using comment formatting. Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries. For more information, see Comments in Metric Queries.

Update - The eval metrics operator has been enhanced to support a _granularity option that provides the length, in milliseconds, of the bucket used for quantization, for use in metric queries.


---
## 2022-07-07 (Metrics)

UUpdate - We’ve improved our zoom in feature for metric charts. Up until now, zooming into a metric chart simply increased the size of the chart. Now, for time series charts in which the query uses automatic quantization, when you zoom in the chart presents results based on more granular data: the bucket size across which results are quantized is reduced. For more information, see [Zoom in on a time series chart](/docs/metrics/metric-charts/interacting-metric-charts#Zoom-in-on-a-time-series-chart).


---
## 2022-07-04 (Apps)

New - The Sumo Logic AWS API Gateway App provides insights into API Gateway tasks while accepting and processing concurrent API calls throughout your infrastructure, including traffic management, CORS support, authorization, access control, throttling, monitoring, and API version management. This App was already part of the AWS observability solution and will now be available as a standalone app in the App catalog.

Update - The Sumo App for Amazon DynamoDB uses logs and metrics to provide operational insights into your DynamoDB. The App includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and help you plan the capacity of your DynamoDB instances. This App updates from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New) and adding a new threat intel Dashboard to the App.

Update - The Sumo Logic Amazon RDS App dashboards provide visibility into your Amazon Relational Database Service (RDS) performance and operations. Preconfigured dashboards allow you to monitor critical metrics of your RDS cluster, including CPU, memory, storage, the network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. Audit activity dashboards help you monitor activities performed on your RDS infrastructure. This app updates from the AWS observability solution in the App Catalog. Updates include upgrading all the dashboards to Dashboards(New). New Audit activity dashboards help you monitor activities performed on your RDS infrastructure and RDS instance-specific dashboard support for - Aurora and MySQL and Performance Insights dashboards.

---
## 2022-07-04 (Alerts)

Update -  We’re continuing to make [alerts and monitors](/docs/alerts/monitors) more customizable to give you control over how often you are notified. You can now:

* **Visually indicate Alerting Query**: For Metrics monitors with multiple query rows, we now visually indicate the alerting query row with a notification bell icon.
* **Improved JSON Validations for Connection Payloads**: We're enforcing stricter JSON validation during creation and updating of Connections to prevent errors that could cause notification failures in the future. There are two major validations that we have started enforcing:
    * If there is a trailing comma (`,`) after the last `"key": "value"` in the JSON Payload structure, we will error out.
    * If there are multiple keys with the same name at the same level within a JSON payload, we will throw an error.
* **Monitor Alerts/Recovery Condition changes**: We no longer support Log Monitors with an Alert threshold condition of “`less than 0`” or “`greater or equal to 0`” . This is because Log queries always result in `0` (when there is no data) or more (when there is data) rows, and monitors that were configured with these conditions were not firing alerts.


<img src={useBaseUrl('img/release-notes/service/metrics-monitor-query-row.png')} alt="metrics-monitor-query-row"/>


---
## 2022-07-04 (Apps)

Update - Sumo Logic and AWS are excited to announce an update to [Sumo Logic Integrations for AWS Organizations](https://aws.amazon.com/quickstart/architecture/sumo-logic-for-aws-organizations/). This solution allows joint customers of AWS and Sumo Logic to automate the integration of [AWS Security Reference Architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/architecture.html)-compliant organizations with [Sumo Logic Cloud SIEM powered by AWS](https://aws.amazon.com/marketplace/pp/prodview-o622lpl6biu6s).

Our updates support Security Reference Architecture (SRA)-compliant set up of:

* AWS Security Hub
* Centralized logging of AWS Network Firewall and AWS WAF
* AWS Firewall Manager

New - We are happy to announce the release of [AWS Observability Installation Automation](docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation). This release enables a simplified method of deploying AWS Observability using default parameters with just one quick command requiring only Sumo Access Id and Key. This method features POSIX and PowerShell scripts to trigger the Cloud Formation template for creating a stack to enable complete visibility into your AWS account infrastructure's health and reliability.

---
## June 23, 2022 (Alerts)

Update -  We’ve made [alerts and monitors](/docs/alerts/monitors) more customizable to give you control over how often you are notified. You can now:



* Customize the alert name to differentiate between multiple alerts created from the same monitor.   
* Choose recovery based on “Single Data point” meeting the recovery threshold or “all data points” meeting the threshold before the alert is resolved.

---
## June 21, 2022 (Traces)

Update - Traces can now show aggregated trace duration [critical path contribution (CPC) breakdown chart](/docs/apm/traces/Working-with-Tracing-data/View-and-investigate-traces#trace-duration-breakdown-chart) summarized for all traces from the Traces query result set.

Use this chart to:



* Quickly understand intermittent duration spikes or slowdowns
* Immediately spot offending service by comparing CPC contribution by service


---
## June 15, 2022 (Apps)

New - [Gigamon ThreatINSIGHT](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Gigamon_ThreatINSIGHT) allows you to stay a step ahead by giving your security teams more: time, data, and insight into attacker behavior. The Gigamon ThreatINSIGHT App for Sumo Logic provides dashboards and visualizes data from ThreatInsight MetaStream files, which helps in identifying potential threats enabling rapid, informed response.

New - The [Gigamon HAWK](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Gigamon_HAWK) app for Sumo Logic provides deep observability by collecting application context from the network. Its rich metadata attributes extraction offers a holistic picture of what’s happening in the network.

New - The [Lucidum](https://github.com/SumoLogic/sumologic-public-partner-apps/tree/master/Lucidum) app for Sumo Logic eliminates blind spots across cloud, security, and IT operations. It gives information about assets, data sources, services, locations, risk factors, and ports.

---
## June 14, 2022 (Metrics)

Update - We’re happy to announce a new and improved [Time Series tab](/docs/metrics/metric-queries-alerts/metrics-explorer#What's_in_the_Time_Series_Table.3F) (previously known as the Preview Table) in the Metrics Explorer. The redesigned table is more compact and easier to read, and you can control which dimensions and data appear in the table using the checkboxes in the pane to the left of the table. When you mouse over a cell in the Time Series table, you can click a three-dot icon to display a context menu that allows you to add dimensions to the query, copy dimensions and values, copy the entire time series, and more. The context menu is supported in both basic and advanced mode. You can export query results in whole or in part to a .csv file.


---
## June 10, 2022 (Collection)

New - Our [Cloud-to-Cloud Integration Framework](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework) has two new Sources, [Netskope WebTx](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/Netskope-WebTx): The Netskope WebTx API integration ingests Web Transaction logs from Netskope Event Steam and [Box](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework): The Box API integration ingests events from the Get Events API. It securely stores the required authentication, scheduling, and state tracking information.

---
## June 9, 2022 (Traces)

Beta - Setting up Tracing instrumentation for **Java, Python and NodeJS** applications deployed in Kubernetes just got easier. In a few simple steps with the OpenTelemetry-Operator your application is automatically instrumented and your Traces are sent to Sumo Logic. [Auto instrumentation](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes.md) for Java, Python and NodeJS applications deployed in Kubernetes is now in Beta.

---
## June 8, 2022 (Apps)

New - We pleased to announce the availability of the [Carbon Black Cloud](docs/integrations/security-threat-detection/carbon-black-cloud.md) App. This app analyzes alert and event data from VMware's Endpoint Standard and Enterprise EDR products and provides comprehensive visibility into the security posture of your endpoints, enabling you to determine the effects of breaches in your environment. The app provides visibility into key endpoint security data with preconfigured dashboards for alerts, threats intelligence, feeds, sensors, alerts, users, hosts, processes, IOCs, devices and network status.


---
## June 7, 2022 (Manage)

New - Want to upgrade or change your [Cloud Flex Credits Essentials](docs/manage/manage-subscription/cloud-flex-credits-accounts.md) plan? Good news: now you can do it yourself. If you’re a Sumo Logic admin, you can use the **Manage Plan** page to change your plan period from monthly to annual, or from annual to monthly. You can also increase or decrease your account ingest levels and retention settings to meet your evolving requirements. For more information, see [Update an CloudFlex Credits Account](docs/manage/manage-subscription/upgrade-cloud-flex-credits-account.md).

---
## June 2, 2022 (Traces)

New - We are excited to announce support for Span Links is now available in Tracing. You can navigate between spans using hyperlinks in the metadata tab as well as search for spans in the trace query and span analytics areas. Span Links are part of [OpenTelemetry specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#links-between-spans) and should be added on the instrumentation side. Links can point to Spans inside a single Trace or across different traces and can represent, for example, batch operations where a span is initiated by multiple initiating spans. For more information, see [View and Investigate Traces.](/docs/apm/traces/Working-with-Tracing-data/View-and-investigate-traces)


---
## May 27, 2022 (Metrics)

Update - We’re making some architectural changes to the Sumo Logic Metrics Engine to support on-going functionality and scalability improvements. The changes may have some impact on query language semantics for queries that use aggregation or reducer operators.

For aggregation queries, the changes are limited to the metadata used to label the metric dimension in the Preview Table in the Metrics Explorer, and in the chart legend. For queries with reducer functions–`eval`, `filter`, `topk`, `bottomk`–there may be a slight difference in how we quantize the metric data. The engine updates will be rolled out starting on **June 13th, 2022**. For information how the updates might affect existing metrics queries, and how you can update existing queries to avoid any impact, see ​​[Metrics Engine Updates](/docs/metrics/Metric-Queries-Alerts).  

---
## May 23, 2022 (Traces)

New - We're happy to announce that you can now instrument Lambda layers for Java in [container-based Lambda functions](docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda-java.md) and then see these Traces in Sumo Logic.

---
## May 20, 2022 (Alerts)

Updated - We’re pleased to announce the availability of permissions for Monitors folders. This feature enables folder-level control of who can view, update, create, delete, and manage Monitors. For more information, see [Grant permissions to Monitors](/docs/alerts/monitors#Grant_permissions_to_Monitors_folders) folders.

This feature is not enabled by default. Contact Sumo Logic Support to have it enabled.

---
## May 16, 2022 (Apps)

Update - We've improved your Sumo Logic app installation process and added guidance to make it easier to find the sources you need and get started faster with all the dashboards and pre-built queries we have waiting for you.

---
## May 11, 2022 (Alerts)

New - The new default payloads are now available for the following connections using [new variables](docs/manage/connections-and-integrations/webhook-connections/set-up-webhook-connections.md).



* AWS Lambda  
* Azure Functions  
* Cloud SOAR  
* Datadog  
* HipChat  
* Jira  
* Microsoft Teams  
* New Relic  
* PagerDuty  
* ServiceNow  
* ServiceNow (Legacy)  
* Slack  
* Webhook

---
## May 10, 2022 (Apps)

New - We are excited to announce the Sumo Logic [1Password](docs/integrations/1password.md) App release. You can now monitor your 1Password account’s sign-in and item usage events. The dashboards help in providing insights into failed authentications, successful authentication, event breakdown by client applications, type, category, users, geolocation of events, outliers, and threat analysis of sign-in events. This app also helps you secure your 1Password vault access by providing insights into user actions and threat intel analysis on clients accessing items in shared vaults.

---
## April 28, 2022 (Security)

Update - The default [web session timeout](docs/manage/security/set-max-web-session-timeout.md) for new users has been increased from 15 minutes to 6 hours. If your currently configured session timeout is set to less than 6 hours, new users will receive the value set within the policy as the default.  

Update - We Increased the timeout for new user account verification from 12 hours to 72 hours to allow for weekends and to give new users more time to see and take action on the new user welcome email.

---
## April 26, 2022 (Collection)

New - Our [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework) has a new Source. The [Dropbox Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source.md) provides a secure endpoint to receive team events from the [Get Events API](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events).

Update - The [Tenable Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source.md) now supports collecting [audit logs](https://developer.tenable.com/reference/audit-log-events) from the Audit Log API and [assets](https://developer.tenable.com/reference/exports-assets-request-export) from the Asset Export API. We've also added the ability to define Processing Rules.

---
## April 26, 2022 (Traces)

New - You can now add the results of Spans queries directly to Dashboards from the [Spans analytics](/docs/apm/traces/working-with-tracing-data/spans#Add-to-Dashboard) window. You'll use the same easy query builder to [modify your panels](docs/dashboards-new/panels/modify-chart.md) later. You can still use [Log Search](docs/apm/traces/working-with-tracing-data/search-query-language-support-for-traces.md) to add span results to Dashboards by running queries in the `_trace_spans` index. The same limitations of Log Search still apply, your query scan volume should not exceed 200x of your tracing ingest.

---
## April 17, 2022 (Apps)

Update - We’ve released an update to the [Amazon S3 app](docs/send-data/hosted-collectors/amazon-aws/amazon-s3-audit-source.md). The key improvement is a new **Threat Intel** dashboard that provides high-level views of threats across your S3 buckets and objects. We also added a new “S3_Bucket” filter to each of the dashboards, so you can slice and dice data by S3 bucket name.

---
## April 7, 2022 (Alerts)

New - System events for Alerts are now logged to the Sumo Logic Audit Event Index. You can use the alert system events to analyze your monitoring posture overall and answer questions like these, and more:



* How many alerts are created and resolved per day?
* Which monitors fire the most alerts?
* How long does it typically take to resolve alerts?

You can search for system events for Alerts by scoping your search like this:


```
_index=sumologic_system_events _sourceCategory=alerts
```


---
## April 6, 2022 (Monitors)

Update - The [alert history](/docs/alerts/monitors#Monitor_History) of a Monitor is now quickly accessible on a new tab of the details pane.


---
## April 5, 2022 (Collection)

New - We're excited to announce a new milestone in innovation for Sumo Logic Observability with the [Sumo Logic OpenTelemetry Distro Collector](https://github.com/SumoLogic/sumologic-otel-collector) (OT Distro).

The OT Distro Collector is designed to simplify and democratize the collection of logs, metrics, traces, and metadata from modern cloud applications. With this announcement, Sumo Logic further embraces open source and establishes OpenTelemetry as its future standard to collect all machine data, breaking from the legacy model of using proprietary agents to gather critical application and infrastructure telemetry.

---
## April 4, 2022 (Apps)

Update - We’ve updated two Sumo Logic apps for Palo Alto Networks to support PAN-OS 10:



* [PCI Compliance for Palo Alto Networks 10](docs/integrations/pci-compliance/palo-alto-networks-10.md)
* [Palo Alto Firewall 10 - Cloud Security Monitoring and Analytics](docs/integrations/cloud-security-monitoring-analytics/palo-alto-firewall-10.md)

---
## March 30, 2022 (AWS Observability Solution)

Update - The AWS Observability Solution 2.4.0 release includes a new [AWS Service - Classic Elastic Load Balancer](/docs/observability/aws/integrations/aws-classic-load-balancer) (ELB), install location selection, and sharing options with the Sumo Logic organization during installation. This update also includes updated dashboards for AWS Classic ELB Service, a new AWS ECS - Events dashboard for AWS CloudTrail, enhanced Lambda dashboard for Lambda cold start duration, and updated FERs. [Update](docs/observability/aws/deploy-use-aws-observability/update-aws-observability-stack.md) to the latest version to take advantage of these features. See the [Changelog](docs/observability/aws/deploy-use-aws-observability/changelog.md) for additional details.

---
## March 29, 2022 (Collection)

New - Our [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/) has a new Source. The [SailPoint Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source.md) provides a secure endpoint to receive Events and User Inventory data from the [IdentityNow V3 API](https://developer.sailpoint.com/apis/v3/).

---
## March 28, 2022 (Apps)

New - We are delighted to announce the release of the [Sumo Logic Amazon Route 53 Resolver Security app](docs/integrations/amazon-aws/route-53-resolver-security.md). Use this app to monitor and analyze the DNS queries and Resolver Firewall logs for your Amazon Route 53 deployment. The preconfigured dashboards provide insight into a variety of DNS activities in your environment.

---
## March 25, 2022 (Collection)

Update - The [AWS Kinesis Firehose for Logs Source](docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source.md) now has the option to collect undelivered logs from the backup directory.

Update - The [Azure Event Hubs Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source.md) now supports Processing Rules and timestamp configuration options for logs.

---
## March 17, 2022 (Apps)

New - We are excited to announce the release of the Sumo Logic [PagerDuty V3](/docs/integrations/saas-cloud/PagerDuty-v3) App. The PagerDuty V3 app collects incident messages from your PagerDuty account via a webhook, and displays incident data in pre-configured Dashboards that allow you to monitor and analyze the activity of your PagerDuty account and Services. The Sumo Logic App for PagerDuty V3 uses Webhooks V3, to provide enhanced context for alert object models.

---
## March 15, 2022 (Traces)

We are proud to announce general availability of extended trace filtering capabilities. This allows you to search for traces by any existing and new metadata, including your custom ones without a need to add this to the configuration or knowing this upfront, before you start ingesting data. Just add any metadata tag to your spans and, as long as its cardinality within a trace is not too high, you will be able to filter by it right away in your Traces UI. See [View and Investigate Traces](/docs/apm/traces/Working-with-Tracing-data/View-and-investigate-traces) for more information.

---
## March 8, 2022 (Collection)

Our [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework) has the following new Sources:



* [Microsoft Azure AD Inventory Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-azure-ad-inventory-source.md)
* [MS Graph Azure AD Reporting Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-azure-ad-reporting-source.md)
* [MS Graph Identity Protection Source](docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-identity-protection-source.md)

---
## March 1, 2022 (Alerts)

New - If you are using [Sumo Logic Cloud SOAR](https://www.sumologic.com/solutions/cloud-soar/), you can now integrate Monitors and Scheduled Searches with Cloud SOAR via a new [webhook connection](docs/manage/connections-and-integrations/webhook-connections/cloud-soar.md). This new capability allows you to send Alerts to Cloud SOAR to further process and operate on these incidents. The result is a rich and connected experience between your data residing in Sumo Logic and the security response capabilities within Cloud SOAR.

---
## February 24, 2022 (Search)

New - The [Search Query Language](/docs/Search/Search-Query-Language) has a new operator, [dedup](/docs/Search/Search-Query-Language/operators#dedup) allows you to:



* Remove duplicate events containing an identical combination of values for the fields.
* Specify the number of duplicate events to keep for each value of a single field.
* Choose a combination of duplicate values among several fields.

---
## February 18, 2022 (Security)

Update - We’ve eased the process of offboarding Sumo Logic users. Now, when you delete a user’s Sumo Logic account, you can transfer the user’s [Monitors](/docs/alerts/monitors) to another user, along with folders, searches, scheduled searches, scheduled views, monitors, and dashboards. For more information, see [Delete a User](docs/manage/users-and-roles/users/delete-user.md).

---
## February 18, 2022 (Monitors)

Update - The [Monitors page](/docs/alerts/monitors#Monitors_page) has a new shortcut to quickly view triggered alerts from a Monitor. Hover your cursor over the Status column of a Monitor and click the icon to open [Alert List](/docs/alerts/monitors/Alert-Response#Alert-List).


---
## February 12, 2022 (Apps)

New - We are delighted to announce the release of the Sumo Logic [Couchbase](/docs/integrations/databases/Couchbase) App. The Couchbase app is a unified logs and metrics app that helps you monitor the availability, performance, and resource utilization of Couchbase database clusters. The preconfigured dashboards provide insight into the health of clusters, the status of the buckets, I/O of reading/writing, errors, events of Couchbase servers that help you understand your clusters.

---
## February 11, 2022 (Manage)

Update - We’ve made an improvement to the [Sumo Logic Organizations](/docs/manage/Manage-Subscription/Create-Manage-Orgs) (Sumo Orgs) feature, which allows you to create, provision, and manage multiple "child" orgs from a "parent" org. Now, when you provision a child org, you can allocate credits for [trace](/docs/apm/traces) ingestion, as well as log and metric ingestion.

---
## February 10, 2022 (Traces)

New - Number of [spans](/docs/apm/traces/working-with-tracing-data/spans.md) per Trace has been increased by 10 times to 10000 spans per trace to better support monitoring for long running and complex transactions. Please note that new spans can increase credits consumption.

Update - Traces logs and data includes a new `duration` field that holds the difference between `endTimestamp` and `startTimestamp` in nanoseconds.

---
## February 8, 2022 (Traces)

New - Announcing general availability of dashboard support for Trace Spans data index. You can now pin results of your queries on spans data directly to the Dashboard. You can add the query through the Log Search screen when running queries in `_trace_spans` index as long as your read volume does not exceed 200x of your tracing ingest ([more info](docs/apm/traces/working-with-tracing-data/search-query-language-support-for-traces.md)). Support for doing this directly from the Spans analytics window is coming soon.

---
## February 4, 2022 (Apps)

New - The Sumo Logic app for [Sauce Labs](https://docs.saucelabs.com/basics/integrations/sumo/)  integrates your Sauce Labs test data with the Sumo Logic Analytics Platform to easily aggregate, visualize, and monitor all of your test data. Connect Sauce Labs data with other data sources for a comprehensive view of your development pipeline.

---
## January 26, 2022 (Software Development Optimization)

New - The SDO App now provides a [Software Development Optimization - Development & Delivery Times](docs/sdo/view-sdo-dashboards.md) dashboard to help you monitor development lead times and delivery lead times across the three main phases of development and delivery: Active Development, Review and Merge, and Deployment. Each section shows the phases broken down by team, service, and environment.


---
## January 19, 2022 (Traces)

New - Traces now include [Span Events](/docs/apm/traces/Working-with-Tracing-data/View-and-investigate-traces#Span_Events) that describe and contextualize the work being done in a Span by tracing and displaying that data in Trace Views. These events are optional time-stamped strings made up of a timestamp, name, and (optional) key-value pair attributes. Select a marker in the timeline or a span to review the Span Event data.


---
## January 18, 2022 (Apps)

New - We are delighted to announce the release of the Sumo Logic [MariaDB](/docs/integrations/databases/MariaDB) app. The MariaDB app is a unified logs and metrics app that helps you monitor the availability, performance, and resource utilization of MariaDB database clusters. Preconfigured dashboards and searches provide insight into the health of your database clusters, performance metrics, resource metrics, schema metrics, replication, error logs, slow queries, Innodb operations, failed logins, and error logs.

New - We are excited to release the Sumo Logic [Nginx](/docs/integrations/web-servers/Nginx) app. The Nginx app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Nginx web servers. Preconfigured dashboards and searches provide insight into connections, requests, visitor locations, visitor access types, traffic patterns, errors, web server operations, and access from known malicious sources.

New - We are delighted to release the Sumo Logic [IIS 10](docs/integrations/web-servers/iis-10.md) app. The IIS 10 app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your IIS web servers. Preconfigured dashboards and searches provide insight into application pools, ASP.NET applications, requests, latency, visitor locations, visitor access types, traffic patterns, errors, web server operations, and access from known malicious sources.

Update - We are excited to release the additional Logs and Metrics dashboards added for the Sumo Logic [Oracle](/docs/integrations/databases/Oracle) app. The Oracle app is a unified logs and metrics app that helps you monitor the availability, performance, and resource utilization of Oracle database clusters. Preconfigured dashboards and searches provide insight into the health of your database clusters, parallel executions, resource utilization, response time, tablespaces, throughput, wait for class/events, listeners, audit logs, and security.

Update - We are pleased to announce the availability of additional Logs and Metrics dashboards added for the Sumo Logic [Nginx Ingress](/docs/integrations/web-servers/Nginx-Ingress) app. The Nginx Ingress app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Nginx Ingress web servers. Preconfigured dashboards and searches provide insight into connections, requests, ingress controller metrics, visitor locations, visitor access types, traffic patterns, errors, web server operations, and access from known malicious sources.

Update - We are delighted to release the additional Logs and Metrics dashboards added for the Sumo Logic [Squid Proxy](/docs/integrations/web-servers/Squid-Proxy) app. The Squid Proxy app is a unified logs and metrics app that helps you monitor activity in Squid Proxy. The preconfigured dashboards provide insight into served and denied requests; performance metrics; IP domain DNS statistics; traffic details; HTTP response codes; URLs experiencing redirects, client errors, and server errors; and quality of service data that helps you understand your users’ experience.

---
## January 4, 2022 (Dashboard)

New - You now have the ability to configure how often a [dashboard is refreshed](/docs/dashboards-new/) by clicking the dropdown arrow next to the refresh icon.
