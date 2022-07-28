---
id: install-app-dashboards
title: Install the Apache Tomcat Monitors, App, and view the Dashboards
sidebar_label: Install the Monitors, App, and view the Dashboards
description: The Sumo Logic App for Apache Tomcat provides pre-configured Dashboards for Access, Catalina.out, and Garbage Collection logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has instructions for installing Sumo Logic Monitors for Apache Tomcat, the app and descriptions of each of the app dashboards.


## Installing Apache Tomcat Monitors

Sumo Logic has provided pre-packaged alerts available through [Sumo Logic monitors](/docs/alerts/monitors/index.md) to help you proactively determine if an Apache Tomcat webserver farm is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, see [Apache Tomcat Alerts](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat/Apache_Tomcat_Alerts).

To install these monitors, you must have the **Manage Monitors** role capability.

You can install monitors by importing a JSON file or using a Terraform script.

Use this dashboard to:mits to how many alerts can be enabled. For more information, see [Monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Rules) for details.


### Method 1: Importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/ApacheTomcat/ApacheTomcat.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/ApacheTomcat/ApacheTomcat.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters, and therefore will be applicable to all Apache Tomcat webserver farms, the data for which has been collected via the instructions in the previous sections.  

However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `webserver_farm=` with `<Your Custom Filter>`.

Custom filter examples:
1. For alerts applicable only to a specific webserver farm, your custom filter would be: `webserver_farm=dev-tomcat-01`
2. For alerts applicable to all webserver farms that start with tomcat-prod, your custom filter would be: `webserver_farm=tomcat-prod*`
3. For alerts applicable to a specific webserver farm, within a production environment, your custom filter would be: `webserver_farm=dev-tomcat-01 AND environment=prod`. This assumes you have set the optional environment tag while configuring collection.

1. Go to **Manage Data > Alerts > Monitors**.
2. Click **Add**.
3. Click **Import**.
4. On the** Import Content popup**, enter **Apache Tomcat** in the Name field, paste in the JSON into the popup, and click **Import**.
5. The monitors are created in a "Apache Tomcat" folder. The monitors are disabled by default. See the [Monitors](/docs/alerts/monitors/index.md) topic for information about enabling monitors and configuring notifications or connections.


### Method 2: Using a Terraform script


Step 1: Generate a Sumo Logic access key and ID

Generate an access key and access ID for a user that has the **Manage Monitors** role capability. For instructions see  [Access Keys](https://help.sumologic.com/Manage/Security/Access-Keys#Create_an_access_key_on_Preferences_page).


Step 2: Download and install Terraform

Download [Terraform 0.13](https://www.terraform.io/downloads.html) or later, and install it.


Step 3: Download the Sumo Logic Terraform package for Apache Tomcat monitors

The alerts package is available in the Sumo Logic github [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/ApacheTomcat). You can either download it using the git clone command or as a zip file.

Step 4: Alert Configuration  

After extracting the package , navigate to the  terraform-sumologic-sumo-logic-monitor/monitor_packages/ApacheTomcat/ directory.

Edit the ApacheTomcat.auto.tfvars file and add the Sumo Logic Access Key and Access ID from Step 1 and your Sumo Logic deployment. If you're not sure of your deployment, see [Sumo Logic Endpoints and Firewall Security](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).

```
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```

The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the `apachetomcat_data_source` variable. For example:

<table>
  <tr>
   <td>To configure alerts for:
   </td>
   <td>Set <code>apachetomcat_data_source</code> to something like:
   </td>
  </tr>
  <tr>
   <td>A specific webserver farm
   </td>
   <td><code>webserver_farm=tomcat.prod.01</code>
   </td>
  </tr>
  <tr>
   <td>All clusters in an environment
   </td>
   <td><code>environment=prod</code>
   </td>
  </tr>
  <tr>
   <td>Multiple webserver farms using a wildcard
   </td>
   <td><code>webserver_farm=tomcat-prod*</code>
   </td>
  </tr>
  <tr>
   <td>A specific webserver farms within a specific environment
   </td>
   <td><code>webserver_farm=tomcat-1</code> and <code>environment=prod</code>
<p>This assumes you have configured and applied Fields as described in Step 1: Configure Fields of the <em>Sumo Logic of the Collect Logs and Metrics for Apache Tomcat</em> topic.</p>
   </td>
  </tr>
</table>


All monitors are disabled by default on installation. To enable all of the monitors, set the monitors_disabled parameter to false.

By default, the monitors will be located in a "Apache Tomcat" folder on the **Monitors** page. To change the name of the folder, update the monitor folder name in the folder variable in the ApacheTomcat.auto.tfvars file.

If you want the alerts to send email or connection notifications, follow the instructions in the next section.

Step 5: Email and Connection Notification Configuration Examples

Edit the ApacheTomcat_notifications.auto.tfvars file to populate the connection_notifications and email_notifications sections. Examples are provided below.

In the variable definition below, replace `<CONNECTION_ID>` with the connection ID of the Webhook connection. You can obtain the Webhook connection ID by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

For information about overriding the payload for different connection types, see [Set Up Webhook Connections](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections).

```bash title="Pagerduty connection example"
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

```bash title="Email notifications example"
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

Step 6: Install Monitors

1. Navigate to the terraform-sumologic-sumo-logic-monitor/monitor_packages/ApacheTomcat/ directory and run terraform init. This will initialize Terraform and download the required components.
2. Run terraform plan to view the monitors that Terraform will create or modify.
3. Run terraform apply.

This section demonstrates how to install the Apache Tomcat App.


## Installing the Apache Tomcat App

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the[ Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library).

1. To install the app, complete the following fields.
1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
2. **Data Source.**
* Choose **Enter a Custom Data Filter**, and enter a custom filter for Apache Tomcat  webserver farm. Examples:
* For all Apache Tomcat webserver farms webserver_farm=*
* For a specific webserver farms: webserver_farm=tomcat.dev.01. 
* Clusters within a specific environment: `webserver_farm=tomcat-1 and environment=prod`
(This assumes you have set the optional environment tag while configuring collection)  
3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Apache Tomcat Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-with-template-variables.md).
:::

### Overview

The **Apache Tomcat - Overview** Dashboard provides a high-level view of the activity and health of Tomcat servers on your network. Dashboard panels display visual graphs and detailed information on visitor geographic locations, traffic volume and distribution, responses over time, as well as time comparisons for visitor locations and  CPU, Memory.

Use this dashboard to:
* Analyze CPU, Memory and disk utilization.
* Analyze http request about status code
* Gain insights into Network traffic for your Tomcat server.
* Gain insights into originated traffic location by region. This can help you allocate computer resources to different regions according to their needs.
* Gain insights into Client, Server Responses on Tomcat Server. This helps you identify errors in Tomcat Server.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Overview.png')} alt="test" />


#### Visitor Locations

The **Apache Tomcat - Visitor Locations** Dashboard provides a high-level view of Tomcat visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by  US region over time.

* **Worldwide.** Uses a geo lookup operation to display worldwide visitor locations by IP address on a map of the world, which allows you to see a count of hits per location for the last 24 hours.
* **Visits by Country Over Time.** Displays the number of visitors by country in a stacked column chart on a timeline for the last hour.
* **United States.** Uses a geo lookup operation to display US visitor locations by IP address on a map of the world, which allows you to see a count of hits per location for the last 24 hours.
* **Visits by US Sate Over Time.** Displays the number of US visitors by state in a stacked column chart on a timeline for the last hour.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Visitor-Locations.png')} alt="test" />


### Visitor Traffic Insight

The **Apache Tomcat - Visitor Traffic Insight** Dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

**Bytes Served.** Displays bytes served in a single chart on a timeline for the last 60 minutes.

**HTTP Methods.** Shows the number of method over time in a pie chart on a timeline for the last 60 minutes.

**Top 5 url.** Provides a list of the top 5 URL being accessed by your visitors in a bar chart for the 60 minutes.

**Media Types Served.** Displays a list of file types being served in a pie chart for the 60 minutes.

**Top 5 Referrers.** Shows a list of the top 5 referring websites by URL in a bar chart for the 60 minutes.

**Top 10 Search Terms from Popular Search Engines.** Displays a list of the top 10 search terms and their count from search engines such as Google, Bing, and Yahoo in an aggregation table for the past hour.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Visitor-Traffic-Insight.png')} alt="test" />


### Web Server Operations

The **Apache Tomcat - Web Server Operations** Dashboard provides a high-level view combined with detailed information on the top ten bots, geographic locations and data for clients with high error rates, server errors over time, and non 200 response code status codes. Dashboard panels also show information on server error logs, error log levels, error responses by server, and the top URIs responsible for 404 responses.

**Non 200 Response Status Codes.** Displays the number of non-200 response status codes in a bar chart for the past hour.

**Client Locations - 4xx Errors.** Uses a geo lookup operation to display the location of clients with 4xx errors by IP address on a map of the world, which allows you to see a count of hits per location for the last hour.

**Server Errors Over Time.** Provides information on the type and number of server errors in a column chart on a line chart for the past hour.

**Error Responses by Server.** Shows error responses and their distribution by server in a line chart for the past hour.

**Top 5 Clients Cause 4xx Errors.** Displays a list of the top 5 clients that have 4xx errors in a bar chart for the past hour.

**Top 5 URIs Causing 404 Responses.** Provides a list of the top 5 URIs with 404 response types in a pie chart for the past hour.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Web-Server-Operations.png')} alt="test" />


### Logs Timeline Analysis

The **Apache Tomcat - Logs Timeline Analysis** dashboard provides a high-level view of the activity and health of Apache Tomcat servers on your network. Dashboard panels display visual graphs and detailed information on traffic volume and distribution, responses over time, as well as time comparisons for visitor locations and server hits.

Use this dashboard to:
* To understand the traffic distribution across servers, provide insights for resource planning by analyzing data volume and bytes served.
* Gain insights into originated traffic location by region. This can help you allocate compute resources to different regions according to their needs.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Logs-Timeline-Analysis.png')} alt="test" />


### Outlier Analysis

The **Apache Tomcat - Outlier Analysis** dashboard provides a high-level view of Apache Tomcat server outlier metrics for bytes served, number of visitors, and server errors. You can select the time interval over which outliers are aggregated, then hover the cursor over the graph to display detailed information for that point in time.

Use this dashboard to:

* Detect outliers in your infrastructure with Sumo Logic’s machine learning algorithm.
* To identify outliers in incoming traffic and the number of errors encountered by your servers.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Outlier-Analysis.png')} alt="test" />



### Catalina Overview

The **Apache Tomcat - Catalina** dashboard provides information about events such as the startup and shutdown of the Apache Tomcat application server, the deployment of new applications, or the failure of one or more subsystems.

**Log Levels.** Displays log levels types (Info, Severe, and Warning) in a pie chart for the last 24 hours.

**Non-INFO Errors.** Shows the number and type of errors (Severe or Warning) in a stacked column chart on a timeline for the last 24 hours.

**Component Errors.** Provides information on errors by component in a pie chart for the last 24 hours.

**Errors by Component.** Displays Info level errors by component in a stacked column chart on a timeline for the last 24 hours.

**Top 10 Recent Exceptions.** Shows the top 10 most recent exceptions in an aggregation table with columns for time, log level, message, method, source file, and thrown for the last 24 hours.

**Exceptions.** Provides the number of exceptions in a column chart on a timeline for the last seven days.

**Average Server Startup Time.** Displays the average server startup time per second by day as a column chart on a timeline for the last seven days.

**Server State Events Over Time.** Shows server state events (shutdown or startup) in a stacked column chart on a timeline for the last seven days.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Catalina-Overview.png')} alt="test" />


### Garbage Collection

The **Apache Tomcat - Garbage Collector** dashboard provides information on the garbage collection of the Java Virtual Machine.

**Top 10 Host - High GC Time.** Displays the top 10 hosts with high garbage collection operation time as a bar chart for the last 12 hours.

**Top 10 Hosts - Low Average JVM Up-Time.** Shows the top 10 hosts by low average JVM up-time as a bar chart for the last 12 hours.

**Total GC Operation Time.** Provides the total garbage collection operation time by timeslices of 15 minutes in a column chart on a timeline for the last 12 hours.

**Total GC Operations.** Displays the total number of times Full-GC and Minor-GC collection processes are executed in timeslices of 15 minutes on in a stacked column chart on a timeline for the past 12 hours.

**Heap.** Shows the total heap memory utilization just before garbage collection was executed vs. total heap memory utilization after garbage collection was executed, in a line chart on a timeline for the last 12 hours.

**PS Young Gen**. PS Young Gen also refers to “New Space,” which is comprised of of Eden-Space and two Survivor-Spaces of identical size, usually called From and To. This panel shows Young Gen memory utilization just before garbage collection was executed vs. Young Gen memory utilization after garbage collection was executed. This part of the heap always gets garbage collected.

**Par Old Gen.** Par Old Gen is also referred as “Tenured Space”. This panel shows Old Gen memory utilization just before garbage collection was executed vs. Old Gen memory utilization after garbage collection was executed.

**PS Perm Gen.** PS Perm Gen is also referred as “Permanent Space”. This panel shows Perm Gen memory utilization just before garbage collection was executed vs. Perm Gen memory utilization after garbage collection was executed.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Garbage-Collection.png')} alt="test" />


### Threat intel

The **Apache Tomcat  - Threat Intel** dashboard provides an at-a-glance view of threats to Apache Tomcat servers on your network. Dashboard panels display the threat count over a selected time period, geographic locations where threats occurred, source breakdown, actors responsible for threats, severity, and a correlation of IP addresses, method, and status code of threats.

Use this dashboard to:
* To gain insights and understand threats in incoming traffic and discover potential IOCs. Incoming traffic requests are analyzed using the [Sumo - Crowdstrikes](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Threat_Intel_Quick_Analysis/03_Threat-Intel-FAQ) threat feed.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Threat-Intel.png')} alt="test" />



### Connectors

**Apache Tomcat  - Connector** dashboard provides analyze receive requests, pass them to the correct web application, and send back the results through the Connector as dynamically generated content.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Connectors.png')} alt="test" />


### Memory

Apache Tomcat  - Memory dashboard provides a memory of your Apache Tomcat instance. Use this dashboard to understand detail  Memory of your Apache Tomcat (s) deployed in your farm.  This dashboard also provides login activities

Use this dashboard to:
* Analyze Heap memory
* Analyze percent memory used

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Memory.png')} alt="test" />



### MemoryPool

Apache Tomcat  - MemoryPool dashboard provides a memory of your JMX Apache Tomcat instance. Use this dashboard to understand detail  Heap Memory of your JMX Apache Tomcat (s) deployed in your farm.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Tomcat-Memory-Pool.png')} alt="test" />
