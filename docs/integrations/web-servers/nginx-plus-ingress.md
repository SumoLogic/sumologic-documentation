---
id: nginx-plus-ingress
title: Nginx Plus Ingress Controller for Kubernetes
sidebar_label: Nginx Plus Ingress
description: This page provides information on Nginx Plus Ingress Controller which provides enterprise‑grade delivery services for Kubernetes applications, with benefits for users of both Nginx Open Source and Nginx Plus.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Nginx Plus Ingress Controller for Kubernetes provides enterprise‑grade delivery services for Kubernetes applications, with benefits for users of both Nginx Open Source and Nginx Plus.

:::note
This app supports Logs for Nginx Plus and Metrics for Nginx Plus Ingress Controller.
:::

The Nginx Plus Ingress app is a unified logs and metrics app that helps you monitor the availability, performance, health and resource utilization of your Nginx Plus Ingress web servers. Preconfigured dashboards and searches provide insight into server status, location zones, server zones, upstreams, resolvers, visitor locations, visitor access types, traffic patterns, errors, web server operations and access from known malicious sources.

## Log and Metrics Types

The Sumo Logic App for Nginx Plus Ingress assumes the NCSA extended/combined log file format for Access logs and the default Nginx error log file format for error logs.

All Dashboards (except the Error logs Analysis dashboard) assume the Access log format. The Error logs Analysis Dashboard assumes both Access and Error log formats, so as to correlate information between the two. For more details on Nginx logs, see [here](http://nginx.org/en/docs/http/ngx_http_log_module.html).

The Sumo Logic App for Nginx Plus Ingress assumes Prometheus format Metrics for Requests, Connections, and Ingress controller. For more details on Nginx Plus Ingress Metrics, see [here](https://docs.nginx.com/nginx-ingress-controller/logging-and-monitoring/prometheus/)


### Sample Log Messages

```bash title="Access Log Example"
{"timestamp":1621602688004,"log":"146.158.30.43 - - [21/May/2021:13:11:25 +0000] \"GET /nxp/demo-index.html HTTP/1.1\" 200 5099 \"https://example.com/\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36\" \"-\"","stream":"stdout","time":"2021-05-21T13:11:25.355302489Z"}
```

```bash title="Error Log Example"
{"timestamp":1619792989032,"log":"2021/04/29 13:26:05 [error] 190#190: *8248713 open() \"/usr/share/nginx/html/favicon.ico\" failed (2: No such file or directory), client: 10.244.0.132, server: , request: \"GET /favicon.ico HTTP/1.1\", host: \"example.com\", referrer: \"https://example.com/dashboard.html\"","stream":"stderr","time":"2021-04-29T13:26:05.074748065Z"}
```

### Sample Queries

This sample Query is from the **Visitor Locations **panel of the **Nginx Plus Ingress - Overview** dashboard.

```
Cluster={{Cluster}} Namespace={{Namespace}} Deployment={{Deployment}} Pod={{Pod}} _sourceCategory = *ingress*
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as nginx_log_message
| parse regex field=nginx_log_message "(?<Client_Ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex field=nginx_log_message "(?<Method>[A-Z]+)\s(?<URL>\S+)\sHTTP/[\d\.]+\"\s(?<Status_Code>\d+)\s(?<Size>[\d-]+)\s\"(?<Referrer>.*?)\"\s\"(?<User_Agent>.+?)\".*"
| where _sourceHost matches "{{Server}}" and Client_Ip matches "{{Client_Ip}}" and Method matches "{{Method}}" and URL matches "{{URL}}" and Status_Code matches "{{Status_Code}}"
| count by Client_Ip
| lookup latitude, longitude, country_code, country_name, region, city, postal_code from geo://location on ip = Client_Ip
| count by latitude, longitude, country_code, country_name, region, city, postal_code
| sort _count
```


## Collecting Logs and Metrics for Nginx Plus Ingress

This section provides instructions for configuring log and metric collection for the Sumo Logic App for Nginx Plus Ingress. This includes the following tasks:

In a Kubernetes environment, we use our Sumo Logic Kubernetes collection. You can learn more about this [here](/docs/observability/kubernetes/collection-setup).

1. **Enable Logging in Nginx Plus Ingress**: Logging is enabled by default to standard output “**stdout**” and standard error “**stderr**”. If you need additional logging - all nginx logs must be redirected to **stdout** and **stderr**.
2. **Enable Metrics in Nginx Plus Ingress**: Before you configure Sumo Logic to ingest metrics, you must enable the Prometheus metrics in the Nginx Ingress controller and annotate the Nginx pods, so Prometheus can find the Nginx metrics.
   * For instructions on Nginx, refer to [this Nginx documentation](https://docs.nginx.com/nginx-ingress-controller/logging-and-monitoring/prometheus/)
3. **Deployment of Sumologic Kubernetes Collection**: Ensure you have deployed the [Sumologic-Kubernetes-Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection), to send the logs and metrics to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [visit here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/installation.md). Once deployed, logs will automatically be picked up and sent by default. Prometheus will scrape the Nginx pods, based on the annotations set in Step 2, for the metrics. Logs and Metrics will automatically be sent to the respective [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) instances, which consistently tag your logs and metrics, then forward them to your Sumo Logic org.

### Field Extraction Rules

Field Extraction Rules (FERs) tell Sumo Logic which fields to parse out automatically. For instructions, see [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule).

Nginx assumes the NCSA extended/combined log file format for Access logs and the default Nginx Plus error log file format for error logs.

Both the parse expressions can be used for logs collected from Nginx Plus Server running on Local or container-based systems.

**FER for Access Logs**

If you're using the default Nginx Plus Ingress log format use the following Parse Expression:

```
| json field=_raw "log" as nginx_log_message nodrop
| if (isEmpty(nginx_log_message), _raw, nginx_log_message) as nginx_log_message
| parse regex field=nginx_log_message
"(?<Client_Ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex field=nginx_log_message "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP/[\d\.]+\"\s(?<status_code>\d+)\s(?<size>[\d-]+)\s\"(?<referrer>.*?)\"\s\"(?<user_agent>.+?)\"\s(?<request_length>\S+)\s(?<request_time>\S+)\s\[(?<proxy_upstream_name>[^\]]+)\]\s(?<upstream_addr>\S+)\s(?<upstream_response_length>\S+)\s(?<upstream_response_time>\S+)\s(?<upstream_status>\S+)"
```

If you aren’t using the default log format, use the below Parse Expression and edit/add fields as needed:

```
| json field=_raw "log" as nginx_log_message nodrop
| if (isEmpty(nginx_log_message), _raw, nginx_log_message) as nginx_log_message
| parse regex field=nginx_log_message "(?<Client_Ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex field=nginx_log_message "(?<Method>[A-Z]+)\s(?<URL>\S+)\sHTTP/[\d\.]+\
"\s(?<Status_Code>\d+)\s(?<Size>[\d-]+)\s\"(?<Referrer>.*?)\"\s\"(?<User_Agent>.+?)\".*"
```

**FER for Error Logs**

Use the following Parse Expression:

```
| json field=_raw "log" as nginx_log_message nodrop
| if (isEmpty(nginx_log_message), _raw, nginx_log_message) as nginx_log_message
| parse regex field=nginx_log_message "\s\[(?<Log_Level>\S+)\]\s\d+#\d+:\s(?:\*\d+\s|)(?<Message>[A-Za-z][^,]+)(?:,|$)"
| parse field=nginx_log_message "client: *, server: *, request: \"* * HTTP/1.1\", host:
\"*\"" as Client_Ip, Server, Method, URL, Host nodrop
```

## Installing Nginx Plus Ingress Monitors

To install these alerts, you need to have the[ Manage Monitors](/docs/manage/users-roles/roles/role-capabilities) role capability.

Alerts can be installed by either importing them via a JSON or via a Terraform script.


### Method A: Importing a JSON file

1. Download the[ JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/nginx-plus-ingress/nginxplusingress.json) describing all the monitors.
2. Replace **$$logs_data_source** with logs data source.
    * For example, _sourceCategory=Labs/NginxIngress/Logs
3. Go to Manage Data > Alerts > Monitors.
4. Click **Add**.
1. Click **Import** to import monitors from the JSON above.

The monitors are disabled by default. Once you have installed the alerts via this method, navigate to the **Nginx** **Ingress** folder under **Monitors** to configure them. Refer[ document](/docs/alerts/monitors#add-a-monitor) to enable monitors, to configure each monitor, to send notifications to teams or connections.


### Method B: Using a Terraform script

1. Generate a Sumo Logic [access key](/docs/manage/security/access-keys#create-an-access-keyon-preferences-page) and access ID for a user that has the[ Manage Monitors](/docs/manage/users-roles/roles/role-capabilities) role capability in Sumo Logic using these instructions. Please identify your Sumo Logic[ deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
2. [Download and install Terraform 0.13](https://www.terraform.io/downloads.html)** or later.
3. Download the Sumo Logic Terraform package for Nginx Ingress alerts: The alerts package is available in the Sumo Logic github[ repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/nginx-plus-ingress). You can either download it via the “git clone” command or as a zip file.
4. Alert Configuration: After the package has been extracted, navigate to the package directory **terraform-sumologic-sumo-logic-monitor/monitor_packages/nginx-plus-ingress/**. Edit the **nginxplusingress.auto.tfvars** file as per below instructions:
   1. Add the Sumo Logic Access Key, Access Id, Deployment from Step 1.
   ```sql
   access_id   = "<YOUR SUMO ACCESS ID>"
   access_key  = "<YOUR SUMO ACCESS KEY>"
   environment = "<DEPLOYMENT>"
   ```
   2. Add `Logs_data_source` as the Sumo Logic data source for logs.
   3. All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter **monitors_disabled** to **false**.
   4. All monitors are configured in a monitor folder called “**Nginx Plus Ingress**”, if you would like to change the name of the folder, update the parameter **folder**.
5. Email and Connection Notification Configuration Examples: Modify the file **nginxplusingress.auto.tfvars** and populate `connection_notifications` and `email_notifications` as per below examples.

```bash title="Pagerduty Connection Example"
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

Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved via calling the[ Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

For overriding payload for different connection types, refer to this[ document](/docs/alerts/webhook-connections/set-up-webhook-connections).

```bash title="Email Notifications Example:"
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
}
```

6. Install the Alerts:
   1. Navigate to the package directory **terraform-sumologic-sumo-logic-monitor/monitor_packages/nginx-plus-ingress/** and run **terraform init. **This will initialize Terraform and will download the required components.
   2. Run `terraform plan` to view the monitors resources which will be created/modified by Terraform.
   3. Run `terraform apply`.
7. Post Installation steps: If you haven’t enabled alerts and/or configured notifications via the terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. This is detailed in [Step 4](/docs/alerts/monitors#add-a-monitor).

There are limits to how many alerts can be enabled - please see the[ Alerts FAQ](/docs/alerts/monitors/monitor-faq.md).


## Installing the Nginx Plus Ingress App

{@import ../../reuse/app-install.md}

## Viewing Nginx Plus Ingress Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

The **Nginx Plus Ingress - Overview** dashboard provides an at-a-glance view of the nginx plus server access locations, error logs along with connection metrics.

Use this dashboard to:
* Gain insights into originated traffic location by region. This can help you allocate computer resources to different regions according to their needs.
* Gain insights into your Nginx health using Critical Errors and Status of Nginx Server.
* Get insights into Active and dropped connection.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Overview.png')} alt="Nginx Plus Ingress" />


### Error Logs Analysis

The **Nginx Plus Ingress - Error Logs Analysis** dashboard provides a high-level view of log level breakdowns, comparisons, and trends. The panels also show the geographic locations of clients and clients with critical messages, new connections and outliers, client requests, request trends, and request outliers.

Use this dashboard to:
* Track requests from clients. A request is a message asking for a resource, such as a page or an image.
* To track and view client geographic locations generating errors.
* Track critical alerts and emergency error alerts.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Error-Logs-Analysis.png')} alt="Nginx Plus Ingress" />

### Logs Timeline Analysis

The **Nginx Plus Ingress - Logs Timeline Analysis** dashboard provides a high-level view of the activity and health of Nginx servers on your network. Dashboard panels display visual graphs and detailed information on traffic volume and distribution, responses over time, as well as time comparisons for visitor locations and server hits.

Use this dashboard to:
* To understand the traffic distribution across servers, provide insights for resource planning by analyzing data volume and bytes served.
* Gain insights into originated traffic location by region. This can help you allocate compute resources to different regions according to their needs.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Logs-Timeline-Analysis.png')} alt="Nginx Plus Ingress" />


### Outlier Analysis

The **Nginx Plus Ingress - Outlier Analysis** dashboard provides a high-level view of Nginx server outlier metrics for bytes served, number of visitors, and server errors. You can select the time interval over which outliers are aggregated, then hover the cursor over the graph to display detailed information for that point in time.

Use this dashboard to:
* Detect outliers in your infrastructure with Sumo Logic’s machine learning algorithm.
* To identify outliers in incoming traffic and the number of errors encountered by your servers.

You can use schedule searches to send alerts to yourself whenever there is an outlier detected by Sumo Logic.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Outlier-Analysis.png')} alt="Nginx Plus Ingress" />

### Threat Intel

The **Nginx Plus Ingress - Threat Inte**l dashboard provides an at-a-glance view of threats to Nginx servers on your network. Dashboard panels display the threat count over a selected time period, geographic locations where threats occurred, source breakdown, actors responsible for threats, severity, and a correlation of IP addresses, method, and status code of threats.

Use this dashboard to:
* To gain insights and understand threats in incoming traffic and discover potential IOCs. Incoming traffic requests are analyzed using the[ Sumo - Crowdstrikes](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ) threat feed.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Threat-Intel.png')} alt="Nginx Plus Ingress" />

### Web Server Operations

The **Nginx Plus Ingress - Web Server Operations** dashboard provides a high-level view combined with detailed information on the top ten bots, geographic locations, and data for clients with high error rates, server errors over time, and non 200 response code status codes. Dashboard panels also show information on server error logs, error log levels, error responses by a server, and the top URIs responsible for 404 responses.

Use this dashboard to:
* Gain insights into Client, Server Responses on Nginx Server. This helps you identify errors in Nginx Server.
* To identify geo locations of all Client errors. This helps you identify client location causing errors and helps you to block client IPs.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Web-Server-Operations.png')} alt="Nginx Plus Ingress" />

### Visitor Access Types

The **Nginx Plus Ingress - Visitor Access Types** dashboard provides insights into visitor platform types, browsers, and operating systems, as well as the most popular mobile devices, PC and Mac versions used.

Use this dashboard to:
* Understand which platform and browsers are used to gain access to your infrastructure.
These insights can be useful for planning in which browsers, platforms, and operating systems (OS) should be supported by different software services.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Visitor-Access-Types.png')} alt="Nginx Plus Ingress" />


### Visitor Locations

The **Nginx Plus Ingress - Visitor Locations** dashboard provides a high-level view of Nginx visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by  US region over time.

Use this dashboard to:
* Gain insights into geographic locations of your user base.  This is useful for resource planning in different regions across the globe.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Visitor-Locations.png')} alt="Nginx Plus Ingress" />


### Visitor Traffic Insight

The **Nginx Plus Ingress - Visitor Traffic Insight** dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

Use this dashboard to:
* To understand the type of content that is frequently requested by users.
* It helps in allocating IT resources according to the content types.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Visitor-Traffic-Insight.png')} alt="Nginx Plus Ingress" />

### Ingress Controller Metrics

The **Nginx Plus Ingress - Ingress Controller Metrics** dashboard provides you insight on the status, reloads, failure of kubernetes Nginx Plus ingress controller.

Use this dashboard to:
* Gain information about Nginx ingress Controller status and reloads. This helps you understand the availability of Nginx Ingress controllers.
* Gain information about Nginx reload time and any reload errors.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Ingress-Controller-Metrics.png')} alt="Nginx Plus Ingress" />


### HTTP Location Zones

The **Nginx Plus Ingress - HTTP Location Zones** metrics dashboard provides detailed statistics on the frontend performance, showing traffic speed, responses/requests count and various error responses.

Use this dashboard to:
* Gain information about Location http zones traffic: received and sent; speed, requires/responses amount, discarded traffic.
* Gain information about Location http zones error responses: percentage of responses by server, percentage of each type of error responses.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-HTTP-Location-Zones.png')} alt="Nginx Plus Ingress" />

### HTTP Server Zones

The **Nginx Plus Ingress - HTTP Server Zones** metrics dashboard provides detailed statistics on the frontend performance, showing traffic speed, responses/requests count and various error responses.

Use this dashboard to:
* Gain information about Server http zones traffic: received and sent; speed, requires/responses amount, discarded traffic.
* Gain information about Server http zones error responses: percentage of responses by server, percentage of each type of error responses.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-HTTP-Server-Zones.png')} alt="Nginx Plus Ingress" />

### HTTP Upstreams

The **Nginx Plus Ingress - HTTP Upstreams** metrics dashboard provides information about each upstream group for HTTP and HTTPS traffic, showing number of HTTP upstreams, servers, back-up servers, error responses and health monitoring.

Use this dashboard to:
* Gain information about HTTP upstreams, servers and back-up servers.
* Gain information about HTTP upstreams traffic: received and sent; speed, requires/responses amount, downtime and response time.
* Gain information about HTTP upstreams error responses: percentage of responses by server, percentage of each type of error responses.
* Gain information about HTTP upstreams health monitoring.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-HTTP-Upstreams.png')} alt="Nginx Plus Ingress" />

### Resolvers

The **Nginx Plus Ingress - Resolvers** metrics dashboard provides DNS server statistics of requests and responses per each DNS status zone.

Use this dashboard to:
* Gain information about the total number of zones, responses and requests speed.
* Gain information about error responses by each type of error.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-Resolvers.png')} alt="Nginx Plus Ingress" />


### Nginx Plus Ingress- TCP/UDP Upstreams

The **Nginx Plus Ingress - TCP/UDP Upstreams** metrics dashboard provides information about each upstream group for TCP and UDP traffic, showing number of TCP and UDP upstreams, servers, back-up servers, error responses and health monitoring.

Use this dashboard to:
* Gain information about TCP and UDP upstreams, servers and back-up servers.
* Gain information about TCP and UDP upstreams traffic: received and sent; speed, requests/responses amount, downtime and response time.
* Gain information about TCP and UDP upstreams error responses: percentage of responses by server, percentage of each type of error responses.
* Gain information about TCP and UDP upstreams health monitoring.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-TCP-UDP-Upstreams.png')} alt="Nginx Plus Ingress" />

### TCP/UDP Zones

The **Nginx Plus Ingress - TCP/UDP Zones** metrics dashboard provides TCP and UDP status zones with charts for connection limiting.

Use this dashboard to:
* Gain information about TCP and UDP traffic: received and sent; speed, requires/responses amount, discarded traffic.
* Gain information about TCP and UDP error responses: percentage of responses by server, percentage of each type of error responses.

<img src={useBaseUrl('img/integrations/web-servers/Nginx-Plus-Ingress-TCP-UDP-Zones.png')} alt="Nginx Plus Ingress" />

## Nginx Plus Ingress Alerts

Sumo Logic has provided out-of-the-box alerts available via [Sumo Logic monitors](/docs/alerts/monitors) to help you quickly determine if the Nginx server is available and performing as expected. These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

**Sumo Logic provides the following out-of-the-box alerts**:

<table>
  <tr>
   <td><strong>Alert Name</strong>
   </td>
   <td><strong>Alert Description</strong>
   </td>
   <td><strong>Alert Condition</strong>
   </td>
   <td><strong>Recover Condition</strong>
   </td>
  </tr>
  <tr>
   <td>Nginx Plus Ingress - Dropped Connections
   </td>
   <td>This alert fires when we detect dropped connections for a given Nginx Plus server.
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61;0
   </td>
  </tr>
  <tr>
   <td>Nginx Plus Ingress - Critical Error Messages
   </td>
   <td>This alert fires when we detect critical error messages for a given Nginx Plus server.
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61;0
   </td>
  </tr>
  <tr>
   <td>Nginx Plus Ingress - Access from Highly Malicious Sources
   </td>
   <td>This alert fires when an Nginx is accessed from highly malicious IP addresses.
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61;0
   </td>
  </tr>
  <tr>
   <td>Nginx Plus Ingress - High Client (HTTP 4xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 4xx.
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61;0
   </td>
  </tr>
  <tr>
   <td>Nginx Plus Ingress - High Server (HTTP 5xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 5xx.
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61;0
   </td>
  </tr>
</table>
