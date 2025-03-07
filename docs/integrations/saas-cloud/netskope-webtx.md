---
id: netskope-webtx
title: Netskope WebTx
sidebar_label: Netskope WebTx
description: The Sumo Logic app for Netskope WebTx collects transaction events from the Netskope platform to enhance visibility into your web transactions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="Netskope-WebTx-icon" width="50" />

Netskope WebTx solution provides visibility and insights into web transactions, helping you to monitor, analyze, and secure web traffic. Integrating Netskope WebTx with Sumo Logic helps you to monitor and analyze web traffic through Netskope's security cloud services in real-time or over a specified period. By aggregating data on transactions, user behavior, operating systems, locations, and more, this app offers insights to detect security threats, manage traffic, optimize response times, and ensure compliance. With customizable dashboards and reports, it supports you in maintaining a strong security posture while using cloud applications and services.

:::info
This app includes [built-in monitors](#netskope-webtx-alerts). For details on creating custom monitors, refer to the [Create monitors for Netskope WebTx app](#create-monitors-for-the-netskope-webtx-app).
:::

## Log types

This app uses Sumo Logic’s [Netskope WebTx Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/netskope-webtx-source/) to collect the web transaction logs from the Netskope platform.

## Sample log message

<details>
<summary>Web Transaction Log</summary>

```json
{
    "bytes": "1474",
    "c-ip": "192.168.1.6",
    "cs-bytes": "1136",
    "cs-content-type": "text/plain;charset=UTF-8",
    "cs-dns": "signaler-pa.clients6.google.com",
    "cs-host": "signaler-pa.clients6.google.com",
    "cs-method": "POST",
    "cs-referer": "https://www.ncl.com/",
    "cs-uri": "/events/1/64b95318bc?a=1103118551&sa=1&v=1.281.0&t=Unnamed Transaction&rst=376533671&ck=0&s=0&ref=https://www.ncl.com/cruises-to/new-york-cruises&ptid=0972ab0a5c351b07",
    "cs-uri-port": "443",
    "cs-uri-query": "a=1103118551&sa=1&v=1.281.0&t=Unnamed Transaction&rst=376533671&ck=0&s=0&ref=https://www.ncl.com/cruises-to/new-york-cruises&ptid=0972ab0a5c351b07",
    "cs-uri-scheme": "https",
    "cs-user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "cs-username": "pal@sumo.net",
    "date": "2025-02-27",
    "s-ip": "162.247.243.29",
    "sc-bytes": "338",
    "sc-content-type": "image/gif",
    "sc-status": "403",
    "time": "09:47:53",
    "time-taken": "53",
    "x-c-browser": "Chrome",
    "x-c-browser-version": "133.0.0.0",
    "x-c-country": "US",
    "x-c-device": "Windows",
    "x-c-latitude": "40.632700",
    "x-c-location": "New York",
    "x-c-longitude": "-73.633300",
    "x-c-os": "Windows 11",
    "x-c-region": "Punjab",
    "x-c-zipcode": "10028",
    "x-category": "Consumer",
    "x-category-id": "49",
    "x-cs-access-method": "Client",
    "x-cs-app": "GitHub Copilot",
    "x-cs-page-id": "0",
    "x-cs-session-id": "6223366443364137208",
    "x-cs-site": "nr-data",
    "x-cs-sni": "bam.nr-data.net",
    "x-cs-timestamp": "1740642036",
    "x-cs-traffic-type": "CloudApp",
    "x-cs-userip": "192.168.1.6",
    "x-other-category": "Travel, Content Server, Grouping of ALL Categories for DLP, PVF-IPXA-603-Allowed-Cat",
    "x-other-category-id": "572, 547, 10010, 10075",
    "x-request-id": "3049686222030447872",
    "x-s-country": "US",
    "x-s-latitude": "38.894000",
    "x-s-location": "San Francisco",
    "x-s-longitude": "-77.036500",
    "x-s-region": "California",
    "x-s-zipcode": "N/A",
    "x-transaction-id": "5662552034615210073",
    "x-type": "http_transaction"
}
```
</details>

## Sample queries

```sql title="Total Transactions"
_sourceCategory="Labs/NetskopeWebTx"
| json "sc-bytes","cs-bytes", "cs-uri", "x-c-country","x-s-country", "x-cs-app", "cs-content-type", "x-cs-traffic-type", "sc-status", "cs-method", "cs-dns", "cs-host", "x-s-longitude", "x-s-latitude", "x-category-id", "x-category", "x-c-latitude", "x-c-longitude", "x-c-region", "x-cs-access-method", "x-c-device", "x-type", "x-c-os", "time-taken", "x-transaction-id","cs-username" as sc_bytes,cs_bytes, cs_uri, x_c_country,x_s_country, x_cs_app, cs_content_type, x_cs_traffic_type, sc_status, cs_method, cs_dns, cs_host, x_s_longitude, x_s_latitude, x_category_id, x_category, x_c_latitude, x_c_longitude, x_c_region, x_cs_access_method, x_c_device, x_type, x_c_os, time_taken, x_transaction_id, cs_username nodrop

///global filters
| where isNull(x_category) or x_category matches "{{x_category}}"
| where isNull(x_cs_app) or x_cs_app matches "{{x_cs_app}}"
| where isNull(cs_content_type) or cs_content_type matches "{{cs_content_type}}"
| where isNull(x_cs_traffic_type) or x_cs_traffic_type matches "{{x_cs_traffic_type}}"
| where isNull(sc_status) or sc_status matches "{{sc_status}}"
| where isNull(cs_method) or cs_method matches "{{cs_method}}"
| where isNull(cs_dns) or cs_dns matches "{{cs_dns}}"
| where isNull(x_c_os) or x_c_os matches "{{x_c_os}}"
| where isNull(x_type) or x_type matches "{{x_type}}"
| where isNull(cs_username) or cs_username matches "{{cs_username}}"

// panel specific
| count by x_transaction_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Netskope WebTx](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/netskope-webtx-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Netskope WebTx app is properly integrated and configured to collect and analyze your Netskope WebTx data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Netskope WebTx dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Netskope WebTx - Overview** dashboard provides insights into web transaction data, helping you monitor, analyze, and secure your web traffic. It includes key metrics like total web transactions, average transaction time, and network performance. The dashboard highlights the most active users, breaks down transactions by operating system, and shows regional patterns through geographic distributions. It also categorizes transactions by log type and status, monitors top domains and hosts, and tracks popular transaction methods. With recent transaction data, the dashboard is a valuable tool for both operational management and strategic planning.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Netskope+WebTx/Netskope+WebTx+-+Overview.png' alt="Netskope-WebTx-Overview" />

### Security Overview

The **Netskope WebTx - Security Overview** dashboard provides a strategic view of web transaction security for network administrators and security teams. It aggregates key security metrics to identify high-risk activities, such as transactions with embargoed locations, unauthorized access attempts, and unusual request latency. The dashboard also monitors access patterns to cloud storage from risky countries, potential data exfiltration, and trends in data uploads and downloads, helping safeguard against data breaches and improve compliance and security strategies.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Netskope+WebTx/Netskope+WebTx+-+Security+Overview.png' alt="Netskope-WebTx-Security-Overview" />

## Create monitors for the Netskope WebTx app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Netskope WebTx alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Netskope WebTx - Embargoed Geo Locations of Clients Performing Web Transactions` | This alert is triggered when access from client IP addresses geolocated in embargoed or sanctioned regions is detected and logged, ensuring compliance with regulations and corporate policies. | Critical | Count > 1 |
| `Netskope WebTx - Embargoed Geo Locations of Servers of Web Transactions` | This alert is triggered when access from server IP addresses geolocated in embargoed or sanctioned regions is detected and logged, ensuring compliance with regulations and corporate policies. | Critical | Count > 1|
| `Netskope WebTx - Large Data Download Events` | This alert is triggered when abnormally large transactions are downloaded, helping detect potential data exfiltration or abuse of cloud storage services. | Critical | Count > 1|
| `Netskope WebTx - Latency in Web Requests` | This alert is triggered when unusual high latency on the response times (time-taken) of web requests is detected. This indicates server overload, network problems, or a DDoS attack. | Critical | Count > 1|
| `Netskope WebTx - Suspicious Login from Unusual Location` | This alert is triggered when unauthorized user access or account compromise are detected. Logins from geographic locations that deviate from the usual user patterns are flagged. | Critical | Count > 1|
| `Netskope WebTx - Unauthorized Access Attempts` | This alert is triggered when failed login attempts or resource access are detected. This highlights potential breaches using status codes like "401 Unauthorized" and unusual frequent attempts from a single IP. | Critical | Count > 2|

## Upgrading/Downgrading the Netskope WebTx app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Netskope WebTx app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
