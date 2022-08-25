---
id: service
title: Service Release Notes
sidebar_label: Service
---

Service Release Notes for the current year are listed here. If you need to see previous Service Release Notes, check the [Archive](https://help.sumologic.com/Release_Archive/Service_Release_Notes_Archive).


## 2022-07-08 (Observability)

New - We’re pleased to announce our new in-product Kubernetes onboarding experience, which guides first-time users step by step through data collection setup (Orchestration, Infrastructure & App Data), the dashboard generation process, and alert monitors installation. To try it out, go to Sumo Logic > **App Catalog** > **Kubernetes** app > then follow the wizard steps. You can also refer to our [Kubernetes Quickstart](/docs/observability/kubernetes-solution/quickstart.md) doc, which mirrors the in-product onboarding workflow.

---

## 2022-07-08 (Metrics)

New - Care to comment? Now you can. In the Metrics Explorer, in Advanced Mode you can add comments to a metrics query and comment out portions of the query by using comment formatting. Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries. For more information, see Comments in Metric Queries.

Update - The eval metrics operator has been enhanced to support a _granularity option that provides the length, in milliseconds, of the bucket used for quantization, for use in metric queries.


---
## 2022-07-02 (Metrics)

Update - We’ve improved our zoom in feature for metric charts. Up until now, zooming into a metric chart simply increased the size of the chart. Now, for time series charts in which the query uses automatic quantization, when you zoom in the chart presents results based on more granular data: the bucket size across which results are quantized is reduced. For more information, see Zoom in on a time series chart.


---
## 2022-07-04 (Apps)

New - The Sumo Logic AWS API Gateway App provides insights into API Gateway tasks while accepting and processing concurrent API calls throughout your infrastructure, including traffic management, CORS support, authorization, access control, throttling, monitoring, and API version management. This App was already part of the AWS observability solution and will now be available as a standalone app in the App catalog.

Update - The Sumo App for Amazon DynamoDB uses logs and metrics to provide operational insights into your DynamoDB. The App includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and help you plan the capacity of your DynamoDB instances. This App updates from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New) and adding a new threat intel Dashboard to the App.

Update - The Sumo Logic Amazon RDS App dashboards provide visibility into your Amazon Relational Database Service (RDS) performance and operations. Preconfigured dashboards allow you to monitor critical metrics of your RDS cluster, including CPU, memory, storage, the network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. Audit activity dashboards help you monitor activities performed on your RDS infrastructure. This app updates from the AWS observability solution in the App Catalog. Updates include upgrading all the dashboards to Dashboards(New). New Audit activity dashboards help you monitor activities performed on your RDS infrastructure and RDS instance-specific dashboard support for - Aurora and MySQL and Performance Insights dashboards.

---
## 2022-07-04 (Alerts)

Update -  We’re continuing to make [alerts and monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) more customizable to give you control over how often you are notified. You can now:

* **Visually indicate Alerting Query**: For Metrics monitors with multiple query rows, we now visually indicate the alerting query row with a notification bell icon.
* **Improved JSON Validations for Connection Payloads**: We're enforcing stricter JSON validation during creation and updating of Connections to prevent errors that could cause notification failures in the future. There are two major validations that we have started enforcing:
    * If there is a trailing comma (`,`) after the last `"key": "value"` in the JSON Payload structure, we will error out.
    * If there are multiple keys with the same name at the same level within a JSON payload, we will throw an error.
* **Monitor Alerts/Recovery Condition changes**: We no longer support Log Monitors with an Alert threshold condition of “`less than 0`” or “`greater or equal to 0`” . This is because Log queries always result in `0` (when there is no data) or more (when there is data) rows, and monitors that were configured with these conditions were not firing alerts.