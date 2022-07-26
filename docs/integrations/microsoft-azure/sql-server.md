---
id: sql-server
title: Sumo Logic App for Microsoft SQL Server
sidebar_label: Microsoft SQL Server
description: Microsoft SQL Server
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/sql.png')} alt="thumbnail icon" width="75"/>

The Sumo Logic App for Microsoft SQL Server is an unified logs and metrics app that provides insight into your SQL server performance metrics and errors. The App consists of predefined Dashboards, providing visibility into your environment for real-time or historical analysis on backup, latency, performance counter, restore, mirroring, database monitoring, general health and operations of your system.

This App has been tested with following SQL Server versions:
* Microsoft SQL Server 2012


## Collecting Logs and Metrics for the Microsoft SQL Server App
This page provides instructions for configuring a local file source to collect SQL Server ERRORLOG data, and a script source to collect SQL Server performance metrics. A sample log message is also provided.


### Collect Microsoft SQL Server Logs and Metrics for Kubernetes environments
-


### Collect Microsoft SQL Server Logs and Metrics for Non-Kubernetes environments
-


## Installing the Microsoft SQL Server Monitors, App, and view the Dashboards
This page provides instructions for installing the Microsoft SQL Server App, as well as examples of each of the App dashboards. These instructions assume you have already set up collection as described in the [Collect Logs and Metrics for the Microsoft SQL Server](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Microsoft_SQL_Server/01Collect-Logs-for-the-Microsoft-SQL-Server-App) App page.


### Pre-Packaged Alerts

Sumo Logic has provided out of the box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you monitor your SQL Server clusters. These alerts are built based on metrics and logs datasets and include preset thresholds based on industry best practices and recommendations.

For details on the individual alerts,  please see [this page](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Microsoft_SQL_Server/Microsoft_SQL_Server_Alerts).


#### Installing Monitors
2




* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing a JSON file or a Terraform script.
* Note: There are limits to how many alerts can be enabled - please see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ) for details.


##### Method 1: Install the monitors by importing a JSON file:
3




1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/SQLServer/SQLServer.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/SQLServer/SQLServer.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all SQL Server clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `db_system=sqlserver` with `<Your Custom Filter>`.

Custom filter examples:



1. For alerts applicable only to a specific cluster, your custom filter would be:  ‘`db_cluster=sqlserver-prod.01`‘
2. For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be: `db_cluster=sql-prod*`
3. **For alerts applicable to a specific cluster within a production environment, your custom filter would be: `db_cluster=sql-1 `AND `environment=prod `(This assumes you have set the optional environment tag while configuring collection)
1. Go to Manage Data > Alerts > Monitors.
2. Click **Add**:



1. Click Import and then copy paste the above JSON to import monitors.



The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the MySQL folder under **Monitors** to configure them. See [this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors to send notifications to teams or connections. Please see the instructions detailed in Step 4 of this [document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


##### Method 2: Install the alerts using a Terraform script
7


**Step 1: Generate a Sumo Logic access key and ID**

Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Please identify which deployment your Sumo Logic account is in, using this [ link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).

**Step 2: [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later **

**Step 3: Download the Sumo Logic Terraform package for SQL Server alerts**

The alerts package is available in the Sumo Logic github [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/SQLServer). You can either download it through the “git clone” command or as a zip file.

**Step 4: Alert Configuration **

After the package has been extracted, navigate to the package directory **terraform-sumologic-sumo-logic-monitor/monitor_packages/SQLServer/**

Edit the **SQLServer.auto.tfvars** file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1 .


```
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```


The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable **’sqlserver_data_source’**. Custom filter examples:

1. A specific cluster `db_cluster=sqlserver.prod.01`
2. All clusters in an environment `environment=prod`
1. For alerts applicable to all clusters that start with sqlserver-prod, your custom filter would be: `db_cluster=sqlserver-prod*`
2. For alerts applicable to a specific cluster within a production environment, your custom filter would be:

`db_cluster=sqlserver-1` and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter **monitors_disabled** to **false** in this file.

By default, the monitors are configured in a monitor **folder** called “**SQLServer**”, if you would like to change the name of the folder, update the monitor folder name in “folder” key at `SQLServer.auto.tfvars` file.

If you would like the alerts to send email or connection notifications, configure these in the file `SQLServer_notifications.auto.tfvars`. For configuration examples, refer to the next section.

**Step 5: Email and Connection Notification Configuration Examples**

Modify the file **SQLServer_notifications.auto.tfvars** and populate connection_notifications and email_notifications as per below examples.

```sql title="Pagerduty Connection Example"
connection_notifications = [
    {
      connection_type       = "PagerDuty",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "{\"service_key\": \"your_pagerduty_api_integration_key\",\"event_type\": \"trigger\",\"description\": \"Alert: Triggered {{TriggerType}} for Monitor {{Name}}\",\"client\": \"Sumo Logic\",\"client_url\": \"{{QueryUrl}}\"}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    },
    {
      connection_type       = "Webhook",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```


Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

For overriding payload for different connection types, refer to this [document](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections).


```sql title="Email Notifications Example"
email_notifications = [
    {
      connection_type       = "Email",
      recipients            = ["abc@example.com"],
      subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
      time_zone             = "PST",
      message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```


**Step 6: Install the Alerts**



1. Navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**SQLServer**/ and run **terraform init. **This will initialize Terraform and will download the required components.
2. Run **terraform plan **to view the monitors which will be created/modified by Terraform.
3. Run **terraform apply**.

**Step 7: Post Installation**

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other users or services. This is detailed in Step 4 of [this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


10
There are limits to how many alerts can be enabled - please see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ).


### Install the Sumo Logic App


This section demonstrates how to install the SQL Server App.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


12
Version selection is applicable only to a few apps currently. For more information, see the[ Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**
        * Choose **Enter a Custom Data Filter**, and enter a custom SQL Server cluster filter. Examples:
            1. For all SQL Server clusters \
`db_cluster=*`
            2. For a specific cluster: \
`db_cluster=sqlserver.dev.01`
            3. Clusters within a specific environment: \
`db_cluster=sqlserver.dev.01 and environment=prod \
`(This assumes you have set the optional environment tag while configuring collection)
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


### Dashboard Filter with Template Variables  
13


Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the[ Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


14
You can use template variables to drill down and examine the data on a granular level.


### Dashboards

### SQL Server - Overview
The **SQL Server - Overview** dashboard provides a snapshot overview of your SQL Server instance. Use this dashboard to understand CPU, Memory, and Disk utilization of your SQL Server (s) deployed in your cluster.  This dashboard also provides login activities and methods by users.

**Use this dashboard to**:
* Analyze CPU, Memory and disk utilization.
* Examine Login activities, failures, and failure reasons.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />

### SQL Server - General Health

The **SQL Server - General Health** dashboard gives you the overall health of SQL Server.  Use this dashboard to analyze server events including stopped/up servers, and corresponding down/uptime, monitor disk space percentage utilization, wait time trend, app-domain issues by SQL server.

Use this dashboard to:
* Analyze server events including stopped/up servers, and corresponding down/uptime.
* Monitor server events trends including SQL Server wait time.
* Get insight into app-domain and percentage disk utilization issues by SQL Server.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />

### SQL Server - I/O

The **SQL Server - I/O** dashboard provides read and write bytes throughput by SQL Server.

Use this dashboard to:
* Analyze performance of SQL server by monitoring read and write bytes throughput of your SQL server instance.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />

### SQL Server - Latency
22


The **SQL Server - Latency** dashboard provides read and write latency trend by SQL Server.

Use this dashboard to:
* Analyze performance of SQL server by monitoring read and write latency of your SQL server instance.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />


### SQL Server - Operations
24


The **SQL Server - Operations** displays recent server configuration changes, number & type of configuration updates, error and warnings, high severity error, and warning trends.

Use this dashboard to:
* Get insights into configuration changes and updates to SQL server instance.
* Monitor any errors and warnings.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />


### SQL Server - Performance Counters
26


The **SQL Server - Performance Counters** dashboard shows performance counters related to database activities, SQL statistics, and buffer cache.

Use this dashboard to:
* Get insights into database activities such as errors/sec, lock timeouts/sec, and wait/sec, deadlocks/sec, and write transactions/sec.
* Monitor important SQL statistics such as login/sec, logout/sec, sql compilations/sec, processes blocked and batch requests/sec.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />

### SQL Server - Replication

The **SQL Server - Replication** dashboard provides insights into SQL Server replication performance. Use this dashboard to monitor bytes sent and received from replica instance, transaction delays, and mirrored white transaction/sec.

Use this dashboard to:
* Get insights into bytes sent to and received from replica instance.
* Analyze transaction delays, and mirrored white transaction/sec.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />


### SQL Server - Backup Restore Mirroring

The **SQL Server - Backup Restore Mirroring** provides information about :

* Transaction log backup events
* Database backup events
* Restore activities
* Backup failures and reasons
* Mirroring errors

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Microsoft_SQL_Server dashboards" />


## Microsoft SQL Server Alerts
See the alerts provided by the Sumo Logic Microsoft SQL Server App.
