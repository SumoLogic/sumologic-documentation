---
id: extrahop-revealx-360
title: Extrahop RevealX 360
sidebar_label: Extrahop RevealX 360
description: The Extrahop RevealX 360 app for Sumo Logic provides security analysts with critical visibility into your Extrahop RevealX 360 environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/extrahop-revealx-360-icon.png')} alt="extrahop-revealx-360-icon" width="100"/>

The Extrahop RevealX 360 app offers powerful network detection and response capabilities, providing organisations with in-depth visibility into security threats throughout their environment. By centralizing detection data such as total detections, average risk scores, MITRE attack techniques, and destination device activity, this app allows security teams to quickly identify, prioritize, and investigate suspicious activities.

By leveraging real-time metrics and contextual threat information, the app highlights patterns of malicious behavior, high-risk destinations, and devices originating from embargoed locations. This insight helps teams monitor evolving risks, identify vulnerable assets, and understand the tactics and techniques targeting their networks.

With its comprehensive detection summaries, geographical breakdowns, and detailed device-level insights, the Extrahop RevealX 360 app empowers organizations to respond effectively to emerging threats. By maintaining a clear view of their security posture, teams can act swiftly, reduce dwell time, and strengthen defenses to protect critical systems and data.

:::info
This app includes [built-in monitors](#extrahop-revealx-360-alerts). For details on creating custom monitors, refer to [Create monitors for Extrahop RevealX 360 app](#create-monitors-for-extrahop-revealx-360-app).
:::

## Log types

The Sumo Logic app for Extrahop RevealX 360 ingests [detection events](https://docs.extrahop.com/current/detections-create-notification-rule/) via a webhook.

## Sample log messages

```json title="Detection log"
{
    "mitre_techniques": [
        {
            "id": "T1021",
            "name": "Remote Services"
        },
        {
            "id": "T1078",
            "name": "Valid Accounts"
        },
        {
            "id": "T1570",
            "name": "Lateral Tool Transfer"
        }
    ],
    "recommended": true,
    "time": 1755070340426,
    "dst": {
        "type": "device",
        "ipaddr": null,
        "hostname": null,
        "role": "victim",
        "endpoint": "server",
        "username": null,
        "device": {
            "oid": 17550703405,
            "macaddr": "0E:C9:8B:2C:62:F3",
            "name": "pc2.i.rx.tours",
            "ipaddrs": [
                "109.248.151.179"
            ]
        }
    },
    "id": 17550703402,
    "url": "https://envio1206.duckdns.org/extrahop/#/detections/detail/17550703402/?from=1755070340&until=1755070340&interval_type=DT",
    "risk_score": 65,
    "recommended_factors": [
        "top_offender"
    ],
    "additional_participants": [],
    "categories_ids": [
        "sec",
        "sec.lateral",
        "sec.attack"
    ],
    "properties": {},
    "type": "New SMB Executable File Transfer Activity",
    "description": "pc2.i.rx.tours received an executable file. This is the first time in several weeks ExtraHop observed this activity. Check unexpected files for malware.\nExample of a suspicious transferred file path. View more in investigation steps\n\nADMIN$\\xxFDMxx.exe\n",
    "src": {
        "type": "device",
        "ipaddr": "109.248.151.179",
        "hostname": null,
        "role": "offender",
        "endpoint": "client",
        "username": null,
        "device": {
            "oid": 17550703400,
            "macaddr": "0E:86:1F:88:60:E9",
            "name": "pc3.i.rx.tours"
        }
    },
    "title": "New SMB Executable File Transfer Activity"
}
```

## Sample queries

```sql title="Total Detections"
_sourceCategory=Labs/extraHop
| json "id", "time", "url", "src.username", "risk_score", "mitre_techniques[*].name", "dst.device.name", "dst.device.macaddr", "dst.device.ipaddrs.[*]", "dst.ipaddr", "type", "title", "description", "recommended_factors", "categories_ids", "dst.hostname", "dst.role" as id, time, url, src_username, risk_score, mitre_techniques, dst_device_name, dst_device_mac_address, dst_device_ip_list, dst_device_ip_2, type, title, description, recommended_factors, categories_ids, dst_hostname, dst_role nodrop

| extract field=mitre_techniques "\"?(?<techniques>[\w\s\-&.,]*)\"?[,\n\]]" multi nodrop
| extract field=dst_device_ip_list "\"?(?<dst_device_ip_1>[\w\s\-&.,]*)\"?[,\n\]]" nodrop
| if (isBlank(dst_device_ip_1), dst_device_ip_2, dst_device_ip_1) as dst_device_ip

| where techniques matches "*"

| count by id, time, url, src_username
| count
```

## Setup 

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Extrahop RevealX 360 events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/extrahop-revealx` - for the Extrahop RevealX 360 integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Extrahop RevealX 360 to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Extrahop RevealX 360 account.

To configure the Extrahop RevealX 360 webhook, refer to the [Extrahop RevealX 360 Documentation](https://docs.extrahop.com/current/detections-create-notification-rule/).

### Installing the Extrahop RevealX 360 app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Extrahop RevealX 360 dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Security

The **ExtraHop RevealX 360 - Security** dashboard provides a comprehensive overview of network detection activities and the overall security posture of your environment. It offers insights into total detections, average risk scores, and the distribution of techniques over time, allowing teams to quickly identify unusual patterns and potential areas of concern. 

This dashboard helps security teams monitor detection trends, track changes in risk levels, and gain insights into the most frequently observed MITRE techniques, top destination devices, and key targets on the network. It also highlights detections linked to high-risk or embargoed geolocations, offering valuable context for prioritizing investigations. 

By consolidating these insights into a unified view, the dashboard enhances threat detection, supports more informed response actions, and strengthens defenses against evolving network-based attacks.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Extrahop+RevealX+360/Extrahop-RevealX-360-Security.png' alt="Extrahop-RevealX-360-Security" style={{border:'1px solid gray'}} />

## Create monitors for Extrahop RevealX 360 app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Extrahop RevealX 360 alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Extrahop RevealX 360 - Destination Devices from Embargoed Geo Locations` | This alert is fired when events originating from embargoed locations are detected, ensuring adherence to security restrictions and protocols. | Critical | Count > 0 | 
| `Extrahop RevealX 360 - Critical Detections` | This alert is fired when detections are identified with a risk score greater than 70, signaling high-severity threats that require immediate investigation and remediation. | Critical | Count > 0 |

## Upgrade/Downgrade the Extrahop RevealX 360 app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Extrahop RevealX 360 app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>