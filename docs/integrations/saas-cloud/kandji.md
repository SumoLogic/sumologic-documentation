---
id: kandji
title: Kandji
sidebar_label: Kandji
description: The Kandji app for Sumo Logic provides comprehensive visibility into the security and management of Apple devices.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/kandji-logo.png')} alt="icon" width="50"/>

The Sumo Logic app for Kandji provides comprehensive visibility into the security and management of Apple devices within an organization. This app enables security teams to monitor threats, detect vulnerabilities, and track device health in real time. By analyzing the threat counts, device enrollment trends, activity types, and geographic distribution, this app helps you to identify risks and respond to potential security incidents swiftly.

The app also supports compliance tracking by providing insights into device configurations and status, allowing teams to ensure devices are secure and up-to-date. With its data-driven insights, the Sumo Logic App for Kandji is a powerful tool for maintaining a secure Apple device environment and strengthening organizational security posture.

:::info
This app includes [built-in monitors](#kandji-monitors). For details on creating custom monitors, refer to [Create monitors for Kandji app](#create-monitors-for-kandji-app).
:::

## Log types

This app uses Sumo Logic’s Kandji Source to collect threat events and device events from the Kandji platform.

## Sample log messages

<details>
    <summary>Threat Details Log</summary>

    ```json 
    {
    "count": 24,
    "next": null,
    "previous": null,
    "malware_count": 24,
    "pup_count": 0,
    "results": [
        {
        "threat_name": "malware_5",
        "classification": "MALWARE",
        "status": "QUARANTINED",
        "process_name": "chmod",
        "process_owner": "root",
        "device_name": "accuhive MacBook Air",
        "device_id": "df1badd0-1dc9-448b-9b2a-c614a844c69e",
        "detection_date": "2023-04-21T17:23:13.883134",
        "date_of_quarantine": "2023-04-21T17:23:15.071621",
        "date_of_release": "",
        "released_by": "",
        "release_note": "",
        "file_path": "/Users/Shared/malware/malware_5",
        "file_hash": "2ab79665b07b3be11dd1d4f2d0bafa886a4b393b28ffedb2a02f62efd0061858",
        "bundle_path": "",
        "device_serial_number": "FVFGHGK7Q6L7",
        "blueprint_id": "396cdae2-147e-4e61-8a27-2f6b6963da4f",
        "blueprint_name": "Threat",
        "library_item_name": "Avert",
        "library_item_id": "d0afe50a-1102-4568-86ed-44863b757c85",
        "pup_posture": "protect",
        "malware_posture": "protect"
        },
    ]
    }
    ```
</details>

<details>
    <summary>List Devices Log</summary>

    ```json
    {
        "device_id": "03f81208-2b6a-4a77-81f5-cf1633bcfb95",
        "device_name": "accuhive's MacBook Air",
        "model": "MacBook Air (M1, 2020)",
        "serial_number": "FVHHFKF7Q6L4",
        "platform": "Mac",
        "os_version": "14.4.1",
        "supplemental_build_version": "23E224",
        "supplemental_os_version_extra": "",
        "last_check_in": "2024-07-23T14:11:37.150080Z",
        "user": {
        "email": "accuhive.admin@kandji.io",
        "name": "acchuive admin",
        "id": "5344c996-8823-4b37-8d6e-8515fc7c3a0a",
        "is_archived": false
        },
        "asset_tag": "sending_tag_to_now",
        "blueprint_id": "ab102b9d-8e9c-420d-a498-f2a1123091c7",
        "mdm_enabled": true,
        "agent_installed": true,
        "is_missing": false,
        "is_removed": false,
        "agent_version": "4.5.9 (5160)",
        "first_enrollment": "2024-01-26 16:15:36.087016+00:00",
        "last_enrollment": "2024-05-13 20:09:27.374451+00:00",
        "blueprint_name": "main hive",
        "lost_mode_status": "",
        "tags": [
        "accuhive_02"
        ]
    }
    ```
</details>

<details>
    <summary>Device Activities Log</summary>

    ```json
    {
    "device_id": "9d6eda80-6058-40bb-94f0-3c7ba4a63eb6",
    "activity": {
        "count": 46,
        "next": null,
        "previous": null,
        "results": [
        {
            "id": 6361,
            "created_at": "2021-04-19T18:09:06.865152Z",
            "action_type": "enrollment",
            "details": {
            "blueprint_name": "NewEnrollment",
            "enrollment_type": "DEP"
            },
            "computer": {
            "id": "9d6eda80-6058-40bb-94f0-3c7ba4a63eb6",
            "name": "iPad",
            "is_removed": false
            },
            "blueprint": {
            "id": "8c7e0b97-54e4-4ea0-8cf9-184ddb47de4b",
            "name": "NewEnrollment",
            "is_removed": false
            },
            "user": null
        }
    ]
    }
    }
    ```
</details>

<details>
    <summary>Device Details Log</summary>

    ```json
    {
        "general": {
            "device_id": "03f81208-2b6a-4a77-81f5-cf1633bcfb95",
            "device_name": "testuser’s MacBook Air",
            "last_enrollment": "2024-05-13 20:09:27.374451+00:00",
            "first_enrollment": "2024-01-26 16:15:36.087016+00:00",
            "model": "MacBook Air (M1, 2020)",
            "platform": "Mac",
            "os_version": "14.4.1",
            "supplemental_build_version": "23E224",
            "supplemental_os_version_extra": "",
            "system_version": "14.4.1 (23E224)",
            "boot_volume": "Macintosh HD",
            "time_since_boot": "1 month ago",
            "last_user": "root",
            "asset_tag": "sending_tag_to_now",
            "assigned_user": {
                "email": "accuhive.admin@kandji.io",
                "name": "acchuhive admin",
                "id": "5344c996-8823-4b37-8d6e-8515fc7c3a0a",
                "is_archived": false
            },
            "blueprint_name": "_test_something",
            "blueprint_uuid": "ab102b9d-8e9c-420d-a498-f2a1123091c7"
        },
        "mdm": {
            "mdm_enabled": "True",
            "supervised": "True",
            "install_date": "2024-05-13 20:09:27.213607+00:00",
            "last_check_in": "2024-07-23 12:43:15.675470+00:00",
            "mdm_enabled_user": [
                "testuser"
            ]
        },
        "activation_lock": {
            "bypass_code_failed": false,
            "user_activation_lock_enabled": false,
            "device_activation_lock_enabled": false,
            "activation_lock_allowed_while_supervised": false,
            "activation_lock_supported": true
        },
        "filevault": {
            "filevault_enabled": false,
            "filevault_recoverykey_type": "",
            "filevault_prk_escrowed": false,
            "filevault_next_rotation": "",
            "filevault_regen_required": false
        },
        "lost_mode": {},
        "automated_device_enrollment": {},
        "kandji_agent": {
            "agent_installed": "True",
            "install_date": "2024-06-17 11:32:35+00:00",
            "last_check_in": "2024-07-23T14:26:49.166267Z",
            "agent_version": "4.5.9 (5160)"
        },
        "hardware_overview": {
            "model_name": "MacBook Air",
            "model_identifier": "MacBookAir10,1",
            "processor_name": "Apple M1",
            "processor_speed": "",
            "number_of_processors": "8",
            "total_number_of_cores": "8",
            "memory": "8 GB LPDDR4",
            "udid": "3c976d96-08a0-5014-89e4-66259ab79fe6",
            "serial_number": "FVHHFKF7Q6L4"
        },
        "volumes": [
            {
                "name": "Macintosh HD",
                "format": "APFS",
                "percent_used": "19%",
                "identifier": "disk3s3s1",
                "capacity": "228.27 GB",
                "available": "182.66 GB",
                "encrypted": "No"
            }
        ],
        "network": {
            "local_hostname": "testusers-MacBook-Air",
            "mac_address": "fc:e2:6c:27:1b:e4",
            "ip_address": "192.168.1.76",
            "public_ip": ""
        },
        "recovery_information": {
            "recovery_lock_enabled": true,
            "firmware_password_exist": false,
            "firmware_password_pending": false,
            "password_rotation_scheduled": "2024-09-10T11:48:00.610908Z",
            "password_has_been_set": true
        },
        "users": {
            "regular_users": [
                {
                    "username": "testuser",
                    "uid": "501",
                    "path": "/Users/testuser",
                    "admin": "Yes",
                    "name": ""
                }
            ],
            "system_users": [
                {
                    "username": "_lp",
                    "uid": "26",
                    "path": "/var/spool/cups",
                    "admin": "No"
                }
            ]
        },
        "installed_profiles": [
            {
                "name": "MDM Profile",
                "uuid": "35fec4f0-88f4-41c5-b3c1-e6da3f0f592d",
                "verified": "verified",
                "identifier": "com.kandji.profile.mdmprofile",
                "organization": "Kandji, Inc.",
                "payload_types": [
                    "com.apple.mdm",
                    "com.apple.security.scep"
                ],
                "install_date": "2024-05-13 20:09:23 +0000"
            }
        ],
        "apple_business_manager": {},
        "security_information": {
            "remote_desktop_enabled": true
        },
        "cellular": {},
        "tags": [
            "accuhive_02"
        ]
    }
    ```
</details>

## Sample queries

```sql title="Device Activities by Action Type"
_sourceCategory="Labs/kandji" details
|json "device_id","action_type","details.command_type","computer.name","created_at" as device_id, action_type, command_type, device_name ,created_at nodrop

// Global Filter 
| where device_name matches "{{device_name}}"
| where action_type matches "{{action_type}}"

| count by device_,created_at,action_type
| count as frequency by action_type
| sort by frequency,action_type
```

## Set up collection

To set up the [Kandji Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/kandji-source) for the Kandji app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Kandji Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Kandji app is properly integrated and configured to collect and analyze your Kandji data.

## Installing the Kandji app​

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Kandji dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Threats Overview

The **Kandji - Threats Overview** dashboard offers security analysts comprehensive visibility into endpoint security threats across managed devices. This dashboard highlights key metrics, such as the total threats detected, breakdowns of malware versus potentially unwanted programs (PUPs), and counts of quarantined and resolved threats. Analysts can monitor threats by posture (detect vs. protect) and track the status of each threat (for example, quarantined or resolved).

Additionally, the dashboard presents a detailed view of the top threat owners, processes involved in various threats, and threat resolution patterns. This allows security teams to identify trends and prioritize their response action. Other panels display threat distribution by blueprints, library items, and devices, along with trend graphs for threat occurrences over time. Lists of recent threats, threat sources by file path, and affected devices provide granular insights, supporting proactive threat hunting and remediation planning. This tool empowers security teams to monitor, analyze, and respond to endpoint threats within their organization. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Kandji/Kandji-Threats-Overview.png' alt="Kandji-Threats-Overview" />

### Device Activities

The **Kandji - Device Activities** dashboard provides security analysts insights into device actions and commands within their managed fleet. Key metrics include the count of newly enrolled devices, top command types executed, and device activities categorized by action type. This allows the analysts to monitor and verify the activity of the devices for essential configurations and commands.

The dashboard also shows the top active devices by frequency of actions, offering a view into which devices have the highest interaction rates. A time-series panel for devices enrolled over time helps track enrollment trends, while the detailed *Recently Enrolled Devices* table offers an audit trail for each device, including enrollment timestamps and action types. This comprehensive view enables security teams to detect anomalies, troubleshoot issues, and ensure compliance across the fleet.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Kandji/Kandji-Device-Activities.png' alt="Kandji-Device-Activities" />

### Devices Overview

The **Kandji - Devices Overview** dashboard provides security analysts comprehensive snapshot of the managed device landscape. Below are some of the key metrics that are included in this dashboard:

- **Total Devices**. Provides the count of all devices under management.
- **Total Removed Devices**. Devices that have been deactivated or removed from the managed inventory.
- **Total Missing Devices**. Devices that are currently unreachable or unresponsive.
- **Devices with Not Installed Agent**. Indicates the devices where the Kandji agent is missing, highlighting potential gaps in security coverage.
- **MDM Disabled Devices and Recovery Locked Disabled Devices**. Show the count of devices with disabled MDM or recovery lock, helping you to identify potential risks for device management and data security.
- **Devices by Blueprints**. Displays the frequency of devices by assigned blueprint.
- **Recently Checked-in Devices**. Provides a detailed log of recent device activity, including last check-in time, device platform, OS version, and blueprint assigned.

Additionally, this dashboard also includes Device Distribution by Platform (for example, Mac, iPhone) and Device OS Versions, allowing analysts to quickly assess the mix of operating systems in use. Interactive visualizations, such as Geo-Location of Devices and Devices from Risky Geo-Locations, give a geographical perspective on the device fleet and help identify devices that are located in high-risk regions. This dashboard is a valuable tool for monitoring device status, ensuring compliance with security policies and quickly identifying potential risks across the device fleet.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Kandji/Kandji-Devices-Overview.png' alt="Kandji-Devices-Overview" />


## Create monitors for Kandji app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Kandji monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Devices from Risky Locations` | This alert triggers when a device accesses your network or application from a location identified as high-risk. This helps you monitor potentially unauthorized access attempts from unusual or restricted geographic locations, enhancing your ability to identify suspicious activity. | Critical | Count > 0 | 
| `High Malware Count on a Single Device` | This alert activates when a single device has multiple malware detections within a specific timeframe. It allows you to quickly identify devices with a high concentration of malware activity, enabling swift action to contain and remediate potential infections. | Critical | Count > 10 |
| `Malicious Process Alert` | This alert is triggered when a known malicious process is detected running on a device. It helps you monitor and stop potentially harmful processes that could compromise device security and network integrity. | Critical | Count > 0|
| `Malware Spread Across Devices` | This alert is triggered when malware is detected on multiple devices within a short period, indicating a possible outbreak or spread of malware across the network. It enables early detection and containment to prevent further infections. | Critical | Count > 1 |

## Upgrading the Kandji app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Kandji app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>