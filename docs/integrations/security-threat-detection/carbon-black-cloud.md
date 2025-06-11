---
id: carbon-black-cloud
title: Carbon Black Cloud
sidebar_label: Carbon Black Cloud
description: The Carbon Black Cloud app analyzes alert and event data from the Endpoint Standard and Enterprise EDR products. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="thumbnail icon" width="75"/>

The Carbon Black Cloud app analyzes alert and event data from Endpoint Standard and Enterprise EDR products and provides comprehensive visibility into the security posture of your endpoints, enabling you to determine the effects of breaches in your environment. The app provides visibility into key endpoint security data with pre-configured dashboards for alerts, threats intelligence, feeds, sensors, alerts, users, hosts, processes, IOCs, devices and network status.

## Log types

The Carbon Black Cloud app uses the following Carbon Black Cloud log types:
* Alert Data
* Event Data

### Sample log messages

For sample log messages, see [Data Samples](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/data-forwarder-data/#data-samples) section in VMware help.

### Sample queries  

#### Endpoint Standard

```sql title="Alerts"
_sourceCategory=CBCloud
| json field=_raw "id", "alert_url" , "severity", "device_name","device_username", "device_target_value", "threat_id", "device_os", "type", "sensor_action", "process_name", "reason", "backend_timestamp","ttps" as alert_id, alert_url ,severity ,device_name, user,target_priority, incident_id, device_os, type, sensor_action, process_name, reason, backend_timestamp,ttps nodrop 
| where type ="CB_ANALYTICS"
| where !(ttps matches "[]") AND !isNull(ttps)
| extract field=ttps "\"(?<indicators>.*?)\"(,|\])" multi nodrop
| count by alert_id
| count
```

```sql title="Events"
_sourceCategory = CBCloud
| json field=_raw "event_origin", "event_id", "event_description", "alert_id", "process_cmdline" as event_origin, event_id, event_description, alert_id, process_cmdline
| where event_origin="NGAV"
| count by  event_origin, event_id, event_description, alert_id, process_cmdline
```

#### Enterprise EDR

```sql title="Events"
_sourceCategory = CBCloud
| json field=_raw "event_origin",  "process_guid", "process_cmdline", "parent_cmdline", "process_username" as event_origin, process_guid, process_cmdline, parent_cmdline, process_username nodrop
| where event_origin="EDR"
| count by  event_origin, process_guid, process_cmdline, parent_cmdline, process_username
```

```sql title="Alerts"
_sourceCategory=CBCloud WATCHLIST
| json field=_raw "id", "alert_url" , "severity", "device_name","device_username", "device_target_value", "threat_id", "device_os", "type", "sensor_action", "process_name", "reason", "backend_timestamp","ioc_id" as alert_id, alert_url ,severity ,device_name, user,target_priority, incident_id, device_os, type, sensor_action, process_name, reason, backend_timestamp,ioc_id nodrop //s3
| where type ="WATCHLIST"
| count by alert_id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Carbon Black Cloud](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-cloud-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Carbon Black Cloud app is properly integrated and configured to collect and analyze your Carbon Black Cloud data.
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

## Viewing Carbon Black Cloud dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Carbon Black Cloud - Overview** dashboard provides a high-level view of the state of your network infrastructure and systems. The panels highlight detected threats, hosts, top feeds and IOC’s, top processes, top watchlists, and alert trends.

Use this dashboard to:
* Monitor potential threats.
* Determine the top processes and threat indicators.
* Track alerts.
* Monitor hosts, users, watchlists and feeds.

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Overview.png')} alt="Carbon_Black_Cloud dashboards" />

### Endpoint Standard - Overview

The **Carbon Black Cloud - Endpoint Standard - Overview** dashboard gives a quick overview of the Alerts, devices and TTPs.

Use this dashboard to:
* See a count of items of interest (Devices, Alerts, TTPs, etc.)
* An overview of top users, processes, and devices

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Endpoint-Standard-Overview.png')} alt="Carbon_Black_Cloud dashboards" />


### Endpoint Standard - Alert Summary

The **Carbon Black Cloud - Endpoint Standard - Alert Summary** gives you summary of alerts in table format, and provides enriched data by correlating alerts with events metadata.

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Endpoint-Standard-Alert-Summary.png')} alt="Carbon_Black_Cloud dashboards" />

### Endpoint Standard - Alerts

The **Carbon Black Cloud - Endpoint Standard - Alerts** dashboard provides insight into the Alert trends over time.

Use this dashboard to:
* See Alert trends over time by severity and category
* Top Alerted processes
* Alerts by OS

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Endpoint-Standard-Alerts.png')} alt="Carbon_Black_Cloud dashboards" />

### Endpoint Standard - Device

The **Carbon Black Cloud - Endpoint Standard - Device** dashboard gives an overview of the top alerting devices with breakdowns by OS and process.

Use this dashboard to:
* See top devices by Alerts
* See Alerts by device over time
* See a breakdown of devices by OS and Process counts

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Endpoint-Standard-Device.png')} alt="Carbon_Black_Cloud dashboards" />

### Endpoint Standard - TTPs

The **Carbon Black Cloud - Endpoint Standard - TTPs** dashboard provides a high level overview of the TTPs with breakdowns by TTP, Severity, Device, Process, and Threat Actors.

Use this dashboard to:
* See which TTPs are the most prevalent
* Identify any spikes in malicious activity
* Help tune new policies and reduce false positives

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Endpoint-Standard-TTPs.png')} alt="Carbon_Black_Cloud dashboards" />

### Enterprise EDR - Overview

The **Carbon Black Cloud - Enterprise EDR - Overview** dashboard gives a quick overview of the Alerts, devices and IOCs.

Use this dashboard to:
* See a count of items of interest (Devices, Alerts, IOCs, etc.)
* An overview of top users, processes, and devices

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Enterprise-EDR-Overview.png')} alt="Carbon_Black_Cloud dashboards" />

### Enterprise EDR - Alert Summary

The **Carbon Black - EDR - Alert Summary** dashboard provides detailed information on the alerts in your environment, including alerts by mode, OS, report, and groups. The panels also show alert trends, recent alerts, and top users.

Use this dashboard to:
* Monitor alert activity and identify spikes.
* Monitor alerts triggered after a critical issue.
* Track users who trigger a high number of alerts.

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Enterprise-EDR-Alert-Summary.png')} alt="Carbon_Black_Cloud dashboards" />

### Enterprise EDR - Alerts

The **Carbon Black Cloud - Enterprise EDR - Alerts** dashboard provides insight into the Alert trends over time.

Use this dashboard to:
* See Alert trends over time by severity and category
* Top Alerted processes
* Alerts by OS

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Enterprise-EDR-Alerts.png')} alt="Carbon_Black_Cloud dashboards" />

### Enterprise EDR - Device

The **Carbon Black Cloud - Enterprise EDR - Device** dashboard gives an overview of the top alerting devices with breakdowns by OS and process.

Use this dashboard to:
* See top devices by Alerts
* See Alerts by device over time
* See a breakdown of devices by OS and Process counts

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Enterprise-EDR-Device.png')} alt="Carbon_Black_Cloud dashboards" />

### Enterprise EDR - IOCs

The **Carbon Black Cloud - Enterprise EDR - IOCs** dashboard provides a high level overview of the IOCs with breakdowns by IOC, Severity, Device, Process, and Threat Actors.

Use this dashboard to:
* See which indicators are the most prevalent
* Identify any spikes in malicious activity
* Help tune new policies and reduce false positives

<img src={useBaseUrl('img/integrations/security-threat-detection/Carbon-Black-Cloud-Enterprise-EDR-IOCs.png')} alt="Carbon_Black_Cloud dashboards" />

## Upgrade/Downgrade the Carbon Black Cloud app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Carbon Black Cloud app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>