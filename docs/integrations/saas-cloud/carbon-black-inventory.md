---
id: carbon-black-inventory
title: Carbon Black Inventory
sidebar_label: Carbon Black Inventory
description: The Sumo Logic app for Carbon Black Inventory enables security analysts identify risks and configuration gaps to improve endpoint hygiene, faster response, and stronger overall security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="Carbon Black Inventory icon" width="90" />

The Sumo Logic app for Carbon Black Inventory offers comprehensive visibility into endpoint assets and their security posture across your environment. By consolidating key device data, including total device counts, compliance status, antivirus and sensor health, and vulnerability levels, the app enables security teams to quickly identify at-risk endpoints and configuration gaps.

Dedicated panels highlight quarantined devices, non-compliant endpoints, systems with passive or outdated sensors, and devices lacking recent antivirus scans, allowing you to efficiently monitor operational hygiene and security coverage. Visualizations by operating system, vulnerability severity, and geographic location provide valuable context for prioritizing patching and remediation.

By surfacing high-priority issues, such as stale endpoints, disabled firewalls, or devices located in embargoed regions, alongside a complete inventory summary, the Sumo Logic app for Carbon Black Inventory helps you maintain strong endpoint hygiene, reduce risk exposure, and support compliance initiatives. This unified view empowers teams to respond faster, improve device management, and strengthen security across the IT environment.

:::info
This app includes [built-in monitors](#carbon-black-inventory-alerts). For details on creating custom monitors, refer to [Create monitors for Carbon Black Inventory app](#create-monitors-for-the-carbon-black-inventory-app).
:::

## Log types

This app uses Sumo Logic’s [Carbon Black Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source/) to collect device logs from the Carbon Black Inventory platform.

## Sample log message

<details>
<summary>Device Log</summary>

```json
{
    "id": 2008,
    "name": "Device-NotReporting",
    "os": "WINDOWS",
    "os_version": "Windows 7",
    "last_external_ip_address": "2.58.14.95",
    "quarantined": false,
    "compliance_status": "COMPLIANT",
    "host_based_firewall_status": "ENABLED",
    "av_status": [
        "AV_ACTIVE"
    ],
    "sensor_pending_update": false,
    "sensor_out_of_date": false,
    "passive_mode": false,
    "sensor_states": [
        "LIVE_RESPONSE_NOT_RUNNING"
    ],
    "av_last_scan_time": "2025-09-25T19:11:38.742Z",
    "vulnerability_score": 2.5,
    "vulnerability_severity": "LOW",
    "last_contact_time": "2025-09-25T19:11:38.742Z",
    "last_reported_time": "2025-09-25T19:11:38.742Z",
    "registered_time": "2025-09-25T19:11:38.742Z"
}
```
</details>

## Sample queries

```sql title="Total Devices"
_sourceCategory="Labs/CarbonBlackInventory"
| json "id", "quarantined", "compliance_status", "host_based_firewall_status", "av_status", "sensor_pending_update", "os", "vulnerability_severity", "last_external_ip_address", "sensor_states", "passive_mode", "name", "sensor_out_of_date", "last_reported_time", "last_contact_time", "registered_time", "vulnerability_score", "os_version", "av_last_scan_time" as id, quarantined, compliance_status, host_based_firewall_status, av_status_list, sensor_pending_update, os, vulnerability_severity, last_external_ip_address, sensor_states_list, passive_mode, name, sensor_out_of_date, last_reported_time, last_contact_time, registered_time, vulnerability_score, os_version, av_last_scan_time nodrop

| where os matches "*"
| where vulnerability_severity matches "*"

| count by id 
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Carbon Black Inventory](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Carbon Black Inventory app is properly integrated and configured to collect and analyze your Carbon Black Inventory data.
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

## Viewing the Carbon Black Inventory dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Carbon Black Inventory – Overview** dashboard offers a comprehensive snapshot of endpoint assets and their security posture. It highlights key metrics such as total device count, quarantined systems, compliance issues, and devices with outdated scans or disabled protections. The dashboard also provides visibility into inactive or outdated sensors, non-reporting endpoints, and pending sensor updates, along with breakdowns by operating system, vulnerability severity, and geographic location. By consolidating these insights into a unified view, it enables security teams to quickly identify at-risk devices, maintain compliance, and prioritize remediation efforts to improve endpoint hygiene and reduce organizational risk.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/carbon-black-inventory/Carbon+Black+Inventory+-+Overview.png' alt="Carbon-Black-Inventory-Overview-Dashboard" />

## Create monitors for the Carbon Black Inventory app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Carbon Black Inventory alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Carbon Black Inventory – Devices from Embargoed Locations` | This alert is triggered when one or more endpoints report external IP addresses associated with embargoed or restricted geographies. This helps ensure compliance with corporate and regulatory security requirements. | Critical | Count > 0 |
| `Carbon Black Inventory – Firewall Disabled Devices` | This alert is triggered when an endpoint's host-based firewall protection is disabled, increasing exposure to network-based attacks and lateral movement. | Critical | Count > 0|
| `Carbon Black Inventory – Endpoints Not Reporting` | This alert is triggered when a device has not communicated with Carbon Black for more than 7 days, potentially indicating an unmanaged, offline, or compromised endpoint. | Critical | Count > 0|
| `Carbon Black Inventory – Outdated or Inactive Sensors` | This alert is triggered when endpoints are running outdated sensors or have inactive sensor states, which may reduce visibility and impair policy enforcement. | Critical | Count > 0|
| `Carbon Black Inventory – High Vulnerability Devices` | This alert is triggered when endpoints report high or critical vulnerability scores, highlighting an elevated risk of exploitation and the need for prioritized patching. | Critical | Count > 0|

## Upgrading/Downgrading the Carbon Black Inventory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Carbon Black Inventory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
