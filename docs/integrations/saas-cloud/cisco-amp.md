---
id: cisco-amp
title: Cisco AMP
sidebar_label: Cisco AMP
description: The Sumo Logic app for Cisco AMP helps you to gain real-time monitoring and analysis of cybersecurity incidents in the Cisco AMP platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cisco-amp.png')} alt="thumbnail icon" width="85"/>

The Sumo Logic app for Cisco AMP provides security analysts with essential tools to enhance threat detection, conduct thorough investigations, and strengthen cybersecurity defenses. It offers security analysts with a powerful platform for real-time monitoring and analysis of cybersecurity incidents. Analysts can evaluate event severity, identify types of incidents, assess host activities, and analyze file types involved in breaches. 

Additionally, the app highlights the top hosts, users, tactics, and techniques, helping analysts recognize trends and potential risks. With this app, they can examine detection types, review recent malicious files, investigate compromised endpoints, and monitor suspicious processes to respond swiftly to security incidents. The app's geolocation features further enhance analysis by mapping the origins of cybersecurity events and emphasizing activities from restricted areas.

:::info
This app includes [built-in monitors](#cisco-amp-monitors). For details on creating custom monitors, refer to the [Create monitors for Cisco AMP app](#create-monitors-for-cisco-amp-app).
:::

## Log types

This app uses Sumo Logic’s [Cisco AMP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-amp-source/) to collect the event logs from the Cisco platform.

### Sample log message

<details>
<summary>Event Log</summary>

```json
{
  "version": "v1.2.0",
  "metadata": {
    "links": {
      "self": "https://api.amp.cisco.com/v1/events?limit=2",
      "next": "https://api.amp.cisco.com/v1/events?limit=2&offset=2"
    },
    "results": {
      "total": 1165,
      "current_item_count": 2,
      "index": 0,
      "items_per_page": 2
    }
  },
  "data": [
    {
      "id": 6180351977805840000,
      "timestamp": 1647602406,
      "timestamp_nanoseconds": 548000000,
      "date": "2022-03-18T11:20:06+00:00",
      "event_type": "Threat Detected",
      "event_type_id": 1090519054,
      "detection": "W32.GenericKD:ZVETJ.18gs.1201",
      "detection_id": "6180351977805840385",
      "connector_guid": "538738f5-3a14-4449-933b-86142553de06",
      "group_guids": [
        "e766a0e9-96da-41b9-b1e8-87dd010d6b68"
      ],
      "severity": "Medium",
      "computer": {
        "connector_guid": "538738f5-3a14-4449-933b-86142553de06",
        "hostname": "Demo_Upatre",
        "external_ip": "xxx.xxx.xxx.xxx",
        "user": "A@TEMPLATE-W7X86",
        "active": true,
        "network_addresses": [
          {
            "ip": "xxx.xxx.xxx.xxx",
            "mac": "xx:xx:xx:xx:xx:xx"
          }
        ],
        "links": {
          "computer": "https://api.amp.cisco.com/v1/computers/538738f5-3a14-4449-933b-86142553de06",
          "trajectory": "https://api.amp.cisco.com/v1/computers/538738f5-3a14-4449-933b-86142553de06/trajectory",
          "group": "https://api.amp.cisco.com/v1/groups/b077d6bc-bbdf-42f7-8838-a06053fbd98a"
        }
      },
      "file": {
        "disposition": "Malicious",
        "file_name": "wsymqyv90.exe",
        "file_path": "\\\\?\\C:\\Users\\Administrator\\AppData\\Local\\Temp\\OUTLOOK_TEMP\\wsymqyv90.exe",
        "identity": {
          "sha256": "b630e72639cc7340620adb0cfc26332ec52fe8867b769695f2d25718d68b1b40",
          "sha1": "70aef829bec17195e6c8ec0e6cba0ed39f97ba48",
          "md5": "e2f5dcd966e26d54329e8d79c7201652"
        },
        "parent": {
          "process_id": 4040,
          "disposition": "Clean",
          "file_name": "iexplore.exe",
          "identity": {
            "sha256": "b4e5c2775de098946b4e11aba138b89d42b88c1dbd4d5ec879ef6919bf018132",
            "sha1": "8de30174cebc8732f1ba961e7d93fe5549495a80",
            "md5": "b3581f426dc500a51091cdd5bacf0454"
          }
        }
      },
      "tactics": [
        "TA0042"
      ],
      "techniques": [
        "T1204.003"
      ]
    }
  ]
}
```
</details>

### Sample queries

```sql title="Total Events"
_sourceCategory="Labs/cisco-amp-app"
| json "id", "connector_guid", "severity", "event_type", "computer.active", "file.disposition", "detection_id", "detection", "computer.hostname", "computer.user", "tactics[*]", "techniques[*]", "computer.external_ip", "file.file_name", "file.file_path", "file.parent.file_name", "file.identity.sha256", "file.identity.sha1", "file.identity.md5", "file.parent.identity.sha256", "date", "computer.network_addresses[*]", "file.parent.process_id", "file.parent.disposition", "computer.links.trajectory", "computer.links.computer", "computer.links.group" as id, connector_guid, severity, event_type, status, file_type, detection_id, detection, hostname, user, tactics, techniques, external_ip, file_name, file_path, parent_file_name, sha2565, sha1, md5, parent_sha256, date, computer_network_addresses, process_id, parent_file_type, trajectory_link, computer_link, group_link nodrop

// global filters
| where severity matches "{{severity}}"
| where event_type matches "{{event_type}}"
| where status matches "{{host_status}}"
| extract field=tactics "\"?(?<tactics>[\w\s\-&.,]*)\"?[,\n\]]" multi
| extract field=techniques "\"?(?<techniques>[\w\s\-&.,]*)\"?[,\n\]]" multi
| where tactics matches "{{tactics}}"
| where techniques matches "{{techniques}}"

| count by id, connector_guid
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Cisco AMP App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-amp-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Cisco AMP app is properly integrated and configured to collect and analyze your Cisco AMP data.
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

## Viewing Cisco AMP dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Cisco AMP - Overview** dashboard is a comprehensive tool that provides security analysts with a high-level summary of key cybersecurity metrics. It tracks total security events, newly detected threats, and recent endpoint activities, offering real-time visibility into the organization's threat landscape. By categorizing threats according to severity levels and types, the dashboard helps analysts quickly identify and prioritize response actions. It also highlights key information on top threat actors and prevalent attack techniques, enhancing threat intelligence and supporting robust incident response strategies. Continuous monitoring of threat trends and endpoint activities empowers analysts to proactively mitigate risks, ensuring a resilient cybersecurity defense posture and effective threat management. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Cisco-AMP/Cisco+AMP+-+Overview+(2).png')} alt="Cisco AMP Overview" style={{border: '1px solid gray'}} width="800" />
 
## Create monitors for Cisco AMP app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Cisco AMP monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Cisco AMP - Events from Embargoed Geo Locations` | This alert identifies and flags events originating from embargoed geographic locations within the Cisco AMP environment. By promptly detecting and responding to activities from restricted regions, security analysts can proactively mitigate potential threats and prevent unauthorized access or breaches. | Critical | Count > 0 | 
| `Cisco AMP - High Severity Events` | This alert highlights security incidents with critical severity levels within the Cisco AMP ecosystem. By prioritizing these high-risk events, security personnel can quickly respond, investigate, and implement necessary actions to effectively mitigate risks before they escalate. | Critical | Count > 0|
| `Cisco AMP - Events with Malicious File` | This alert tracks events related to malicious files within the Cisco AMP system. By promptly alerting analysts to activities involving malicious files, it enables quick identification, isolation, and remediation of threats, helping safeguard the organization's networks and endpoints from potential cybersecurity breaches. | Critical | Count > 0|

## Upgrade/Downgrade the Cisco AMP app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Cisco AMP app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
