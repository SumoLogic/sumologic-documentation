---
id: crowdstrike-spotlight
title: CrowdStrike Spotlight
sidebar_label: CrowdStrike Spotlight
description: The CrowdStrike Spotlight app for Sumo Logic provides real-time visibility into vulnerabilities across your organization's assets to the security teams.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The Sumo Logic app for CrowdStrike Spotlight offers real-time visibility into vulnerabilities across your organization's assets to the security teams. By integrating with CrowdStrike's powerful endpoint protection platform, the app helps security analysts monitor, detect, and prioritize vulnerabilities based on severity, operating system, internet exposure, and remediation status.

This app provides enhanced threat intelligence through geolocation mapping of vulnerabilities, quick identification of top affected hosts, and insights into asset criticality. The app also tracks vulnerability remediation efforts, providing a clear view of progress and unresolved issues. With customizable dashboards and detailed logs, security teams can streamline their vulnerability management, ensuring they address critical threats promptly and minimize exposure to attacks. This integration ultimately strengthens an organization's overall security posture by enabling faster, data-driven decision-making in response to emerging vulnerabilities.

:::info
This app includes [built-in monitors](#crowdstrike-spotlight-monitors). For details on creating custom monitors, refer to [Create monitors for CrowdStrike Spotlight app](#create-monitors-for-crowdstrike-spotlight-app).
:::

## Log types

This app uses Sumo Logic’s CrowdStrike Spotlight Source to collect [Vulnerability Logs](https://falcon.crowdstrike.com/documentation/98/spotlight-apis) from the CrowdStrike Spotlight platform.

## Sample log messages

<details>
<summary>Vulnerability Log</summary>

```json
{
    "id": "d5bde2e631d14103970a27924943a07c_9e90a7c915043320bbfc1534f438a60c",
    "cid": "2ae7654232b94d7c99305e5bc5484ed1",
    "aid": "d5bde2e631d14103970a27924943a07c",
    "created_timestamp": "2022-03-08T19:56:57Z",
    "updated_timestamp": "2023-03-10T21:03:22Z",
    "status": "open",
    "apps": [
        {
            "product_name_version": "Graphics Driver",
            "sub_status": "open",
            "remediation": {
                "ids": [
                    "7f1f18c7a5d9327ca8552f297df0a282"
                ]
            },
            "evaluation_logic": {
                "id": "94ad31682a3e3ee591bdce200865e1c7",
                "cid": "2ae7654232b94d7c99305e5bc5484ed1",
                "aid": "d5bde2e631d14103970a27924943a07c",
                "created_timestamp": "2022-03-21T22:41:01Z",
                "updated_timestamp": "2023-02-16T14:37:06Z",
                "logic": [
                    {
                        "id": 9532225801875003295,
                        "title": "Check if Windows 10 is installed",
                        "type": "inventory",
                        "negate": false,
                        "existence_check": "at_least_one_exists",
                        "comparison_check": "all",
                        "determined_by_comparison": true,
                        "comparisons": {
                            "state_operator": "AND",
                            "state_comparisons": [
                                {
                                    "entity_operator": "AND",
                                    "entity_comparisons": [
                                        {
                                            "actual_value_field": "value",
                                            "expected_value": "^[a-zA-Z0-9\\(\\)\\s]*[Ww][Ii][Nn][Dd][Oo][Ww][Ss] 10[a-zA-Z0-9\\(\\)\\s]*$",
                                            "operation": "pattern match",
                                            "value_datatype": "string"
                                        }
                                    ]
                                }
                            ]
                        },
                        "items": [
                            {
                                "comparison_result": "true",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion",
                                "name": "ProductName",
                                "type": "reg_sz",
                                "value": [
                                    "Windows 10 Pro"
                                ],
                                "windows_view": "64_bit"
                            }
                        ]
                    },
                    {
                        "id": 16288502251398203820,
                        "title": "Check for the presence of referenced files igdumdim32.dll and igdumdim64.dll",
                        "type": "inventory",
                        "negate": false,
                        "existence_check": "at_least_one_exists",
                        "comparison_check": "",
                        "determined_by_comparison": false,
                        "items": [
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0000",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0001",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0002",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0003",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0000",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0001",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0002",
                                "name": "UserModeDriverNameWow",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0000",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0001",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0002",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2985-931D-11EB-8974-806E6F6E6963}\\0003",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0000",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0001",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "not evaluated",
                                "hive": "HKEY_LOCAL_MACHINE",
                                "item_type": "registry_item",
                                "key": "SYSTEM\\ControlSet001\\Control\\Video\\{C2BB2986-931D-11EB-8974-806E6F6E6963}\\0002",
                                "name": "UserModeDriverName",
                                "type": "reg_none",
                                "value": [
                                    ""
                                ],
                                "windows_view": "64_bit"
                            }
                        ]
                    },
                    {
                        "id": 16392073654140156915,
                        "title": "Check if the version of igdkmd32.sys or igdkmd64.sys is less than 10.18.x.5057",
                        "type": "vulnerability",
                        "negate": false,
                        "existence_check": "at_least_one_exists",
                        "comparison_check": "at least one",
                        "determined_by_comparison": true,
                        "comparisons": {
                            "state_operator": "AND",
                            "state_comparisons": [
                                {
                                    "entity_operator": "AND",
                                    "entity_comparisons": [
                                        {
                                            "actual_value_field": "product_version",
                                            "expected_value": "^10.18.\\d+.([0-4]?\\d?\\d?\\d?|504\\d|505[0-6])$",
                                            "operation": "pattern match",
                                            "value_datatype": "string"
                                        }
                                    ]
                                }
                            ]
                        },
                        "items": [
                            {
                                "comparison_result": "true",
                                "filename": "igdumdim64.dll",
                                "filepath": "C:\\Windows\\System32\\DriverStore\\FileRepository\\igdlh64.inf_amd64_5f8dc4eab6fcd2f0\\igdumdim64.dll",
                                "item_type": "file_item",
                                "product_name": "Intel HD Graphics Drivers for Windows 8(R)",
                                "product_version": "10.18.10.4252",
                                "version": "10.18.10.4252",
                                "windows_view": "64_bit"
                            },
                            {
                                "comparison_result": "true",
                                "filename": "igdumdim32.dll",
                                "filepath": "C:\\Windows\\System32\\DriverStore\\FileRepository\\igdlh64.inf_amd64_5f8dc4eab6fcd2f0\\igdumdim32.dll",
                                "item_type": "file_item",
                                "product_name": "Intel HD Graphics Drivers for Windows 8(R)",
                                "product_version": "10.18.10.4252",
                                "version": "10.18.10.4252",
                                "windows_view": "64_bit"
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "suppression_info": {
        "is_suppressed": false
    },
    "host_info": {
        "hostname": "W530",
        "local_ip": "192.168.0.110",
        "machine_domain": "",
        "os_version": "Windows 10",
        "ou": "",
        "site_name": "",
        "system_manufacturer": "LENOVO",
        "tags": [],
        "platform": "Windows",
        "os_build": "19045",
        "product_type_desc": "Workstation",
        "host_last_seen_timestamp": "2023-06-07T00:00:00Z"
    },
    "remediation": {
        "entities": [
            {
                "id": "7f1f18c7a5d9327ca8552f297df0a282",
                "reference": "cpe:/a:intel:graphics_driver::::",
                "title": "Update Intel Graphics Driver",
                "action": "Update Intel Graphics Driver to the latest available version",
                "link": "",
                "vendor_url": ""
            }
        ]
    },
    "cve": {
        "id": "CVE-2018-12209",
        "base_score": 3.3,
        "severity": "LOW",
        "exploit_status": 0,
        "exprt_rating": "LOW",
        "remediation_level": "O",
        "cisa_info": {
            "is_cisa_kev": false
        },
        "spotlight_published_date": "2021-05-10T17:08:00Z",
        "description": "Insufficient access control in User Mode Driver in Intel(R) Graphics Driver for Windows* before versions 10.18.x.5059 (aka 15.33.x.5059), 10.18.x.5057 (aka 15.36.x.5057), 20.19.x.5063 (aka 15.40.x.5063) 21.20.x.5064 (aka 15.45.x.5064) and 24.20.100.6373 potentially enables an unprivileged user to read device configuration information via local access.\n",
        "published_date": "2019-03-14T20:29:00Z",
        "vendor_advisory": [
            "https://www.intel.com/content/www/us/en/security-center/advisory/INTEL-SA-00189.html"
        ],
        "references": [
            "https://support.lenovo.com/us/en/product_security/LEN-25084"
        ],
        "exploitability_score": 1.8,
        "impact_score": 1.4,
        "vector": "CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N"
    }
}
```
</details>

## Sample queries

```sql title="Recent Access Activities"
_sourceCategory="Labs/CrowdstrikeSpotlight"
| json "status", "cve.severity", "id", "host_info.hostname", "suppression_info.is_suppressed", "host_info.internet_exposure", "host_info.platform", "host_info.os_version", "confidence", "cve.remediation_level", "host_info.asset_criticality", "host_info.local_ip", "remediation.entities[0].action", "host_info.system_manufacturer", "host_info.host_last_seen_timestamp", "created_timestamp", "updated_timestamp", "cve.id", "cve.base_score", "cve.exploitability_score" as status, severity, id, hostname, is_suppressed, internet_exposure, os_type, os_version, confidence, remediation_level, asset_criticality, local_ip, remediation_action, system_manufacturer, host_last_seen_timestamp, vuln_created_timestamp, vuln_updated_timestamp, cve_id, base_score, exploitability_score nodrop

// global filters
| where status matches "{{status}}"
| where severity matches "{{severity}}"
| where os_type matches "{{os_type}}"

| first(status) as status group by id
| where status matches ("*open")
| count by id
| count

```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for CrowdStrike Spotlight](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-spotlight-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your CrowdStrike Spotlight app is properly integrated and configured to collect and analyze your CrowdStrike Spotlight data.
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

## Viewing the CrowdStrike Spotlight dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **CrowdStrike Spotlight - Overview** dashboard provides security analysts with a comprehensive view of vulnerabilities across the organization's assets. Key panels display active vulnerabilities, closed vulnerabilities, and affected hosts, allowing for quick identification of critical security issues. 

The dashboard categorizes vulnerabilities by severity (Critical, High, Medium, and Low), operating system type (Windows and Linux), and internet exposure, helping analysts prioritize threats based on risk factors. Geolocation data highlights the location of the most severe vulnerabilities aiding in threat localization. The panel showing vulnerabilities by remediation level tracks the organization's progress in resolving these issues. 

Analysts can also monitor top affected hosts, asset criticality, and vulnerabilities over time to spot trends and potential areas of concern. Additional detailed views provide information on vulnerability remediation actions, pending patches, and asset details, helping teams focus on closing security gaps promptly and efficiently. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/CrowdStrike-Spotlight/CrowdStrike-Spotlight-Overview.png' alt="CrowdStrike-Spotlight-Overview" />

## Create monitors for CrowdStrike Spotlight app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### CrowdStrike Spotlight monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Critical Vulnerabilities Detected` | This alert is triggered when critical security vulnerabilities are identified in your systems. These vulnerabilities are classified as high-risk and could be exploited by attackers to gain unauthorized access or cause significant damage. Immediate remediation is advised. | Critical | Count > 0 | 
| `Unpatched Vulnerabilities` | This alert signals the presence of known vulnerabilities that remain unpatched. These unpatched vulnerabilities could potentially be leveraged by attackers and should be addressed through prompt patching or other mitigation strategies. | Critical | Count > 1|
| `Publicly Exposed Vulnerable Assets` | This alert is triggered when assets with known vulnerabilities are exposed to the public internet. These publicly exposed assets are more vulnerable to exploitation, posing a significant risk if left unaddressed. | Critical | Count > 0|
| `Exploit Status Change` | This alert notifies you when there is a change in the exploitability status of a known vulnerability. A status change indicates that a vulnerability has either become more or less susceptible to exploitation, which may require immediate action depending on the new status. | Critical | Count > 5|
| `Vulnerabilities Detected from Risky Locations` | This alert is activated when vulnerabilities are detected from high-risk geographical locations or IP addresses. This could indicate potential malicious activity, as risky locations often correlate with areas known for cybercrime. | Critical | Count > 0|

## Upgrading the CrowdStrike Spotlight app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CrowdStrike Spotlight app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>