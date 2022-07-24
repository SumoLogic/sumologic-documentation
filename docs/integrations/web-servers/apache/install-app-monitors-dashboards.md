---
id: install-app-monitors-dashboards
title: Install the Apache App, Monitors, and View the Dashboards
sidebar_label: Install the App, Monitors, and View the Dashboards
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page provides instructions for installing the Sumo Logic Monitors for Apache, the app and descriptions of each of the app dashboards. These instructions assume you have already set up collection as described in the [Collect Logs and Metrics for Apache](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/01-Collect-Logs-for-Apache) page.


## Install Monitors

Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you proactively monitor your Apache Web servers and farms. These monitors are built based on metrics and logs datasets and include pre-set thresholds based on industry best practices and recommendations.

For details about individual alerts, see [this page](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/Apache_Alerts).

To install these alerts, you need to have the Manage Monitors role capability. There are limits to how many alerts can be enabled. For more information, see [Monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Rules) for details.

You can install monitors by importing a JSON file or using a Terraform script.


#### Method 1: Install Monitors by importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/apache/apache.json) that describes the monitors.
2. In the json file, replace `$$apache_data_source` with a custom source filter like `webserver_farm=dev-apache` for setting up alerts for a specific web server farm. If you want to configure this for all your web server farms you can find and replace `$$apache_data_source` with blank `“”`.
3. Go to **Manage Data** > **Alerts** > **Monitors**.
4. Click **Add**.
5. Click **Import** and then copy paste the above JSON to import monitors. Name will be the folder name.

The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Apache folder under **Monitors** to configure them. See [this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors to send notifications to teams or connections. Please see the instructions detailed in Step 4 of this [document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


#### Method 2: Install the alerts using a Terraform script

**Step 1: Generate a Sumo Logic access key and ID**

Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Please identify which deployment your Sumo Logic account is in, using this[ link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).

**Step 2: [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later**

**Step 3: Download the Sumo Logic Terraform package for Apache alerts**

The alerts package is available in the Sumo Logic github [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/apache). You can either download it through the “git clone” command or as a zip file.

**Step 4: Alert Configuration**

After the package has been extracted, navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**apache**/

Edit the **apache.auto.tfvars** file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1 .
```
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```

The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific web server farm or environments, update the variable `apache_data_source`. Custom filter examples:

1. A specific web server farm `webserver_farm=apache.prod.01`
2. All web server farms in an environment `environment=prod`
1. For alerts applicable to all web server farms that start with apache-prod, your custom filter would be: `webserver_farm=apache-prod*`
2. For alerts applicable to a specific web server farm within a production environment, your custom filter would be:

`webserver_farm=apache-1` and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter **monitors_disabled** to **false** in **apache.auto.tfvars** file.

By default, the monitors are configured in a monitor **folder** called “**Apache**”, if you would like to change the name of the folder, update the monitor folder name in “**folder**” key at **apache.auto.tfvars** file.

If you would like the alerts to send email or connection notifications, configure these in the file **apache_notifications.auto.tfvars**. For configuration examples, refer to the next section.

**Step 5: Email and Connection Notification Configuration Examples**

Modify the file **apache_notifications.auto.tfvars** and populate connection_notifications and email_notifications as per below examples.


#### Pagerduty Connection Example

```bash
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


#### Email Notifications Example

```bash
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

1. Navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**apache**/ and run **terraform init.** This will initialize Terraform and will download the required components.
2. Run **terraform plan **to view the monitors which will be created/modified by Terraform.
3. Run **terraform apply**.

**Step 7: Post Installation**

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other users or services. This is detailed in Step 4 of [this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


10
There are limits to how many alerts can be enabled - please see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ).


## Install the Apache App

Now that you have set up logs and metric collections for Apache, you can install the Sumo Logic App for Apache to use the pre-configured Searches and [Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/Apache-App-Dashboards#dashboards).

To install the app, do the following:
1. Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
2. From the **App Catalog**, search for and select the app.
3. Select the version of the service you're using and click **Add to Library**.
4. To install the app, complete the following fields.
  * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
  * **Data Source.**  Choose **Enter a Custom Data Filter**, and enter a custom filter. Examples:
    * For all Apache web server farms: `webserver_system=apache webserver_farm=*`
    * For a specific web server farm: `webserver_system=apache webserver_farm=apache.dev.01`
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
5. Click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library).

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## View Your Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-with-template-variables.md).
:::


### Overview

The **Apache - Overview** Dashboard provides an at-a-glance view of the activity and health of the Apache web server farms, and servers by monitoring uptime, requests, response, traffic, visitor geographic locations, and critical error messages.

Use this dashboard to:

* Get an at-a-glance view of the state of all your Apache web servers
* Identify the top URLs causing errors
* Identify the top critical error messages

<img src={useBaseUrl('img/integrations/web-servers/Apache_Overview.png')} alt="test" />


### Error Log Analysis

The **Apache - Error Log Analysis** dashboard provides a high-level view of error log levels, clients causing errors, critical error messages and trends.

Use this dashboard to:

* Quickly identify critical errors affecting your Apache web servers
* Analyze types and patterns of log messages in your Apache web servers
* Identify clients causing the most errors
* Monitor trends in error logs and identify outliers

<img src={useBaseUrl('img/integrations/web-servers/Apache-Error-Log-Analysis.png')} alt="test" />

### Trends

The **Apache - Trends** dashboard provides trends around HTTP responses, server hits, visitor locations, traffic volume and distribution.

Use this dashboard to:
* Monitor trends and identify outliers

<img src={useBaseUrl('img/integrations/web-servers/Apache_Overview.png')} alt="test" />


### Outlier Analysis

The **Apache -  Outlier Analysis** dashboard helps you quickly identify outliers for key Apache metrics such bytes served, number of visitors, server errors, and client errors.

Use this dashboard to:
* Automatically detect outliers in the operations of your Apache web servers and take corrective actions if needed

<img src={useBaseUrl('img/integrations/web-servers/Apache-Trends.png')} alt="test" />

### Threat Analysis

The **Apache - Threat Intel** dashboard provides an at-a-glance view of incoming threats to your Apache servers based on known malicious IP addresses.

Dashboard panels show threat counts, geographic locations, actors, threat severity, URLS accessed.

Use this dashboard to:
* Identify threats from incoming traffic based on incoming client IP addresses and discover potential IOCs

<img src={useBaseUrl('img/integrations/web-servers/Apache_Threat_Analysis.png')} alt="test" />

### Visitor Locations

The **Apache - Visitor Locations** dashboard provides a high-level view of Apache visitor geographic locations both worldwide and in the United States.

Use this dashboard to:
* Get insights into geographic locations of your user base

<img src={useBaseUrl('img/integrations/web-servers/Apache_Panel_filter.png')} alt="test" />

### Visitor Access Types

The **Apache - Visitor Access Types** dashboard provides insights into visitor platform types, browsers, device types, and operating systems.

Use this dashboard to:
* Understand which platform and browsers are being used to access your applications

<img src={useBaseUrl('img/integrations/web-servers/Apache_Visitor_Access_Types.png')} alt="test" />


### Visitor Traffic Insight

The **Apache - Visitor Traffic Insight** dashboard provides summarized information on the top URLs, referrers, search terms, and media types served.

Use this dashboard to:
* To understand content types of content that are frequently requested by users.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Visitor_Traffic_Insight.png')} alt="test" />

### Web Server Operations

The **Apache - Web Server Operations** Dashboard provides an at-a-glance  view of the operations of your Apache web servers. Dashboard panels show information on bots, geographic locations, errors and URLs.

Use this dashboard to:
* Get insights into client locations, bots and response codes

<img src={useBaseUrl('img/integrations/web-servers/Apache_Web_Server_Operations.png')} alt="test" />

### Request State Analysis

The **Apache - Request State Analysis** dashboard shows trends around the state of incoming requests to your Apache web servers.

Use this dashboard to:
* Monitor the state of requests being handled by worker threads over time and take remedial actions to optimize your web servers if needed

<img src={useBaseUrl('img/integrations/web-servers/Apache-Request-State-Analysis.png')} alt="test" />


### Server Resource Utilization

The **Apache - Server Resource Utilization** dashboard shows the CPU resource utilization and load across threads and CPU of your Apache web servers.

Use this dashboard to:
* Monitor CPU utilization and load on your Apache web servers
* Monitor the number of worker and idle threads

<img src={useBaseUrl('img/integrations/web-servers/Apache-Server-Resource-Utilization.png')} alt="test" />


### Server Status

The **Apache - Server Status** dashboard shows information related to the state of your Apache server and includes information such as requests and bytes served and latency. information on the number of requests served, time taken to serve the request, and bytes served.

Use this dashboard to:
* Monitor server uptime
* Monitor web server performance

<img src={useBaseUrl('img/integrations/web-servers/Apache-Server-Status.png')} alt="test" />
