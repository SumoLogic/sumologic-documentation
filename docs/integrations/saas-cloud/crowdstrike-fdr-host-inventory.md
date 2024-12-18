---
id: crowdstrike-fdr-host-inventory
title: CrowdStrike FDR Host Inventory
sidebar_label: CrowdStrike FDR Host Inventory
description: Monitor and analyze the CrowdStrike-FDR Host Inventory data to detect potential security threats related to user activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The Sumo Logic app for CrowdStrike - FDR Host Inventory offers deep visibility into your organization's host inventory managed by CrowdStrike Falcon. This app enables you to monitor critical aspects of your infrastructure, including device status, operating systems, and manufacturers. The app also provides you with insights into the geographical distribution of devices and highlights potential risks by identifying abnormal device statuses. With detailed logs on software details, network configurations, and policy applications, this app helps you to maintain an up-to-date and secure host inventory, ensuring a robust security posture across your environment.

:::info
This app includes [built-in monitors](#crowdstrike-fdr-host-inventory-alerts). For details on creating custom monitors, refer to [Create monitors for CrowdStrike FDR Host Inventory app](#create-monitors-for-crowdstrike-fdr-host-inventory-app).
:::

## Log types

This app uses Sumo Logic’s CrowdStrike-FDR Host Inventory Source to collect [inventory logs](https://falcon.crowdstrike.com/login/?next=%2Fdocumentation%2F84%2Fhost-and-host-group-management-apis#managing-hosts) from CrowdStrike-FDR Host Inventory.

### Sample log message

<details>
<summary>Host Inventory Log</summary>

```json
{
            "device_id": "abcd1234wxyz56",
            "cid": "0123456789ABCDEFGHIJKLMNOPQRSTUV",
            "agent_load_flags": "1",
            "agent_local_time": "2017-09-15T06:13:15.223Z",
            "agent_version": "3.5.5606.0",
            "bios_manufacturer": "Phoenix Technologies LTD",
            "bios_version": "6.00",
            "config_id_base": "65994753",
            "config_id_build": "5606",
            "config_id_platform": "3",
            "external_ip": "24.16.20.181",
            "mac_address": "00-50-56-8c-17-81",
            "hostname": "example_host",
            "first_seen": "2017-07-19T02:08:24Z",
            "last_seen": "2017-09-25T23:45:55Z",
            "local_ip": "192.0.2.100",
            "machine_domain": "example.com",
            "major_version": "6",
            "minor_version": "1",
            "os_version": "Windows 7",
            "os_build": "19H1323",
            "platform_id": "0",
            "platform_name": "Windows",
            "policies": [
                {
                    "policy_type": "prevention",
                    "policy_id": "aaabbbdddcccddd",
                    "applied": true,
                    "settings_hash": "ed4a7460",
                    "assigned_date": "2017-09-14T13:03:33.038805882Z",
                    "applied_date": "2017-09-14T13:03:45.823683755Z"
                }
            ],
            "device_policies": {
                "prevention": {
                    "policy_type": "prevention",
                    "policy_id": "aaabbbdddcccddd",
                    "applied": true,
                    "settings_hash": "ed4a7460",
                    "assigned_date": "2017-09-14T13:03:33.038805882Z",
                    "applied_date": "2017-09-14T13:03:45.823683755Z"
                },
                "sensor_update": {
                    "policy_type": "sensor-update",
                    "policy_id": "aaabbbdddcccddd",
                    "applied": true,
                    "settings_hash": "65994753|3|2|automatic",
                    "assigned_date": "2017-09-14T05:15:40.878196578Z",
                    "applied_date": "2017-09-14T05:16:20.847887649Z"
                }
            },
            "product_type": "1",
            "product_type_desc": "Workstation",
            "site_name": "Default-First-Site-Name",
            "status": "normal",
            "system_manufacturer": "VMware, Inc.",
            "system_product_name": "VMware Virtual Platform",
            "modified_timestamp": "2017-09-25T23:46:06Z",
            "meta": {
                "version": "49662"
            },
    		"kernel_version": "6.1.7601.17592"       
 }

```
</details>

### Sample queries

```sql title="Devices by Platform"
_sourceCategory="crowdStrikeFDRHostInventory"
| json "status", "platform_name", "os_version", "system_manufacturer", "provision_status", "device_id" as status, platform_name, version, manufacturer, provision_status, device_id nodrop
// global filters
| where manufacturer matches "{{system_manufacturer}}"
| where platform_name matches "{{platform_name}}"
| where version matches "{{os_version}}"
| where status matches "{{status}}"
| where provision_status matches "{{provision_status}}"
| count by platform_name, device_id
| count as frequency by platform_name
| sort by frequency, platform_name

```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for CrowdStrike FDR Host Inventory](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-host-inventory-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your CrowdStrike FDR Host Inventory app is properly integrated and configured to collect and analyze your CrowdStrike FDR Host Inventory data.
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

## Viewing CrowdStrike FDR Host Inventory dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **CrowdStrike - FDR Host Inventory Overview** dashboard offers a comprehensive view of the devices monitored by CrowdStrike Falcon Data Replicator (FDR) to enhance the environment’s security posture. It provides key insights into the total number of devices categorized by platform, status, and manufacturer. This dashboard also highlights the geographical distribution of devices and risky devices. Additionally, it provides critical information on device operating systems, latest-seen devices, software details, network configurations, and policy details.<br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/CrowdStrike-FDR-Host-Inventory/CrowdStrike-FDR-Host-Inventory-Overview.png')} alt="CrowdStrike - FDR Host Inventory Overview" />

## Create monitors for CrowdStrike FDR Host Inventory app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### CrowdStrike FDR Host Inventory alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Device Prevention Policy Not Applied` | This alert is fired when the user has not applied the device prevention policy. CrowdStrike prevention policies are rules that determine how the CrowdStrike agent detects and prevents malware on endpoints. They are organized by operating system in the CrowdStrike console, and each operating system has its own set of policies. | Critical | Count > 0 | 
| `Device Sensor Update Policy Not Applied` | This alert is fired when the user has not applied the device sensor update policy. CrowdStrike's Device Sensor Update Policy allows customers to choose which parts of their fleet should install the latest sensor release, or an older version. This policy is part of the Falcon platform's protection mechanisms, which use AI and machine learning to identify and address advanced threats. | Critical | Count > 0|

## Upgrade/Downgrade the CrowdStrike FDR Host Inventory app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CrowdStrike FDR Host Inventory app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
