---
id: cloudflare
title: cloudflare
sidebar_label: Cloudflare
description: The Cloudflare App provides a set of dashboards to make analyzing Cloudflare logs easy, and help you understand events and trends from your websites and applications on the Cloudflare network.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/cloudflare.png')} alt="Thumbnail icon" width="50"/>

This application has been developed and is supported by Cloudflare. In case of technical questions, please review the technical [documentation](https://developers.cloudflare.com/logs/) for Cloudflare logs or email [analytics@cloudflare.com](mailto:analytics@cloudflare.com).

The Cloudflare App provides a set of dashboards that make analyzing Cloudflare logs easy, helping you to understand events and trends from your websites and applications on the Cloudflare network. Logs are gathered from all 160+ Cloudflare data centers in near real-time and can be combined with other data sources, such as your origin data, to provide unique insights and help you improve the performance and security of your websites and applications.


## Log Types

The Cloudflare App uses HTTP request logs in JSON format gathered from all of the 160+ Cloudflare data centers. By default, timestamps are returned as Unix nanosecond integers. We recommend using the RFC 3339 format for sending logs to Sumo Logic. For a description of the fields available in the logs see link [here](https://developers.cloudflare.com/logs/logpull-api/#fields).


### Sample Log Message

```json
{
"ClientIP": "89.163.242.206",
"ClientRequestHost": "www.theburritobot.com",
"ClientRequestMethod": "GET",
"ClientRequestURI": "/static/img/testimonial-hipster.png",
"EdgeEndTimestamp": 2018-12-15T02:20:57Z,
"EdgeResponseBytes": 69045,
"EdgeResponseStatus": 200,
"EdgeStartTimestamp": 2018-12-15T02:20:57Z,
"RayID": "3a6050bcbe121a87"
}
```

### Sample Query

The following log query is from the ‘Total Number of Requests’ panel in the ‘Cloudflare - Snapshot’ dashboard.

```sql
ClientCountry*
| json "EdgePathingSrc", "EdgePathingOp","EdgePathingStatus", "ClientCountry",
"ClientIP", "ClientDeviceType", "ClientRequestHost", "ClientRequestUserAgent",
"ClientRequestURI", "OriginResponseStatus", "EdgeResponseStatus", "OriginIP",
"ClientIPClass" as edge_pathing_src, edge_pathing_op, edge_pathing_status, client_country,
client_ip, client_device_type, client_request_host, client_request_user_agent,
client_request_uri, origin_response_status, edge_response_status, origin_ip, client_ip_class
| count
```

## Collecting Logs for Cloudflare

This section shows you how to set up a Hosted Collector and specify a Sumo Logic Source.

To send Cloudflare logs to Sumo Logic directly, you can follow the steps outlined below, or follow the guide in the Cloudflare documentation ([Enable Logpush to Sumo Logic](https://developers.cloudflare.com/logs/get-started/enable-destinations/sumo-logic/)).

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API. Cloudflare can send logs to a Hosted Collector with HTTP Logs and Metrics as the source. Once you have set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

Ensure Log Share permissions are enabled in Cloudflare before attempting to read or configure a Logpush job. For more information, refer to the [Roles](https://developers.cloudflare.com/fundamentals/account-and-billing/members/roles/#roles) section in  Cloudflare documentation.

### Configure a Hosted Collector

1. Follow the instructions to [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector) in Sumo Logic to start collecting logs.
2. Follow the instructions to [Configure an HTTP Logs & Metrics Source](https://help-opensource.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/).
3. Optional: To forward logs to Cloud SIEM Enterprise, click **+Add Field** with the key `_parser` and value `/Parsers/System/Cloudflare/Cloudflare Logpush`
4. Click **Advanced**, if the settings are not already shown.
5. For Timestamp Format, select **Specify a format** and enter the following:
   * **Format:** `yyyy-MM-dd'T'HH:mm:ss'Z'`
   * **Timestamp Locator:** `\"EdgeStartTimestamp\"\s*:\s*\"(.*)\"`
6. Click **Test**. A Test Timestamp Parsing dialog appears.
7. Enter a sample log message in the Test Timestamp Parsing dialog, such as the following, and then click **Test**: **"EdgeStartTimestamp":"2022-12-19T23:38:10Z"**. A dialog confirming that your timestamp format matched should appear.
8. Click **Done** and then click **Save** to save the timestamp parsing to the source.

### Configure Logpush to Sumo Logic via the Cloudflare Dashboard

To enable the Cloudflare Logpush service:
1. Log in to the Cloudflare dashboard.
2. Select the Enterprise account or domain you want to use with Logpush.
3. Go to Analytics & Logs > Logs.
4. Click Add Logpush job. A modal window opens where you will need to complete several steps.
5. Select the dataset you want to push to a storage service.
6. Select the data fields to include in your logs. Add or remove fields later by modifying your settings in Logs > Logpush.
7. Select Sumo Logic.
8. Enter or select the HTTP Source Address. Note that the same collector can be used for multiple Logpush jobs, but each job must have a dedicated source.
9. Click Validate access.
10. Enter the Ownership token (included in a file or log Cloudflare sends to your provider) and click Prove ownership. To find the ownership token, click the Open button in the Overview tab of the ownership challenge file.
11. Click Save and Start Pushing to finish enabling Logpush.

Once connected, Cloudflare lists Sumo Logic as a connected service under Logs > Logpush. Edit or remove connected services from here.


## Installing the Cloudflare App

This section has instructions for installing the Cloudflare App for Sumo Logic.

Now that you've set up log and metric collection, you can install the Cloudflare App, and use its pre-configured searches and dashboards.

{@import ../../reuse/apps/app-install.md}

## Viewing the Cloudflare Dashboards

**All dashboard have a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Snapshot

**Cloudflare - Snapshot Dashboard** provides an at-a-glance overview of the most important metrics from your websites and applications on the Cloudflare network. You can use dashboard filters to further slice and dice the information for granular analysis of events and trends.

Use this dashboard to:
* Monitor the most important web traffic metrics of your websites and applications on the Cloudflare network.
* View what countries and IPs your traffic is coming from and analyze the breakdown between mobile and desktop traffic, protocol, methods, and content types.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Snapshot.png')} alt="Cloudflare dashboards" />



### Reliability

**Cloudflare - Reliability Dashboard** provides insights on the availability of your websites and applications. Metrics include origin response error ratio, origin response status over time, percentage of 3xx/4xx/5xx errors over time, and more.

Use this dashboard to:

* Investigate errors on your websites and applications by viewing edge and origin response status codes.
* Further analyze errors based on status codes by countries, client IPs, hostnames, and other metrics.
<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare_-_Reliability.png')} alt="Cloudflare dashboards" />



### Security (Overview)

**Cloudflare - Security (Overview) Dashboard** provides insights on threats to your websites and applications, including number of threats stopped, threats over time, top threat countries, and more.

Use this dashboard to:
* Monitor the most important security and threat metrics for your websites and applications.
* Fine tune and configure your IP firewall.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Security-Overview.png')} alt="Cloudflare dashboards" />


### Security (WAF)

**Cloudflare - Security (WAF) Dashboard** provides insights on threat identification and mitigation by our Web Application Firewall (WAF), including events like SQL injections, XSS, and more.

Use this dashboard to:
* Understand attacks and WAF rules triggered to reveal vulnerabilities and false positives.
* Fine tune the WAF to target obvious threats and prevent false positives.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Security_WAF.png')} alt="Cloudflare dashboards" />


### Security (Rate Limiting)

**Cloudflare - Security (Rate Limiting) Dashboard** provides insights on rate limiting protection against denial-of-service attacks, brute-force login attempts, and other types of abusive behavior targeted at your websites and applications.

Use this dashboard to:
* Investigate attacks by looking at rate limiting over time, top rate limit actions, top rate limit countries, top banned URIs, and top banned client IPs.
* Define thresholds or block client IP addresses to protect your website or application from malicious traffic.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare_Security-RateLimiting.png')} alt="Cloudflare dashboards" />


### Security (Bot Management)

**Cloudflare - Security (Bot Management) Dashboard** reliably detects and mitigates bad bots to prevent credential stuffing, spam registration, content scraping, click fraud, inventory hoarding, and other malicious activities.

To get bot requests identified correctly, use only one Filter Based Firewall rule with action "Challenge (Captcha)". For more information, see the [Cloudflare documentation](https://www.cloudflare.com/apps/developer/docs/getting-started).

Use this dashboard to:
* Investigate bot activity on your website to prevent content scraping, checkout fraud, spam registration and other malicious activities.
* Use insight to tune Cloudflare to prevent bots from excessive usage and abuse across websites, applications, and API endpoints.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare_Security_Bot_Management.png')} alt="Cloudflare dashboards" />

### Performance (Requests, Bandwidth, Cache)

**Cloudflare - Performance (Requests, Bandwidth, Cache) Dashboard** identifies and addresses performance issues and caching misconfigurations. Metrics include total vs. cached bandwidth, saved bandwidth, total requests, cache ratio, top uncached requests, and more.

Use this dashboard to:
* Monitor caching behavior and identify misconfigurations.
* Improve configuration and caching ratio.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Performance_Requests.png')} alt="Cloudflare dashboards" />

### Performance (Hostname, Content Type, Request Methods, Connection Type)

**Cloudflare - Performance (Hostname, Content Type, Request Methods, Connection Type) Dashboard** provides insights into your most popular hostnames, most requested content types, breakdown of request methods, and connection type.

Use this dashboard to:
* Review the most requested content types, popular hostnames, and top triggered methods and TLS protocols.
* Compare these metrics over time and in requests per second.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Performance_Hostname.png')} alt="Cloudflare dashboards" />


### Performance (Static vs. Dynamic Content)

**Cloudflare - Performance (Static vs. Dynamic Content) Dashboard** provides insights into the performance of your static and dynamic content, including slowest URLs.

Use this dashboard to:
* Compare your static and dynamic content performance.
* Investigate the cause of slow requested URLs in order to improve performance.

<img src={useBaseUrl('img/integrations/saas-cloud/Cloudflare-Performance_Static.png')} alt="Cloudflare dashboards" />
