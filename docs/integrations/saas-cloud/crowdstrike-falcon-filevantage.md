---
id: crowdstrike-falcon-filevantage
title: CrowdStrike Falcon FileVantage
sidebar_label: CrowdStrike Falcon FileVantage
description: Analyze CrowdStrike Falcon FileVantage data to identify unauthorized file changes, policy violations, and unusual activity indicating potential threats or compliance breaches.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The Sumo Logic app for CrowdStrike Falcon FileVantage enables security analysts to monitor and analyze file integrity across your environment. Leveraging the CrowdStrike Falcon FileVantage data helps detect unauthorized or high-risk file changes, policy violations, and suspicious activity that may indicate potential threats or compliance breaches.

Key features of the CrowdStrike Falcon FileVantage app include:

- **File integrity monitoring**. Obtain a comprehensive overview of file changes, organized by severity and type, including write, delete, rename, and permission changes. Additionally, you can gain insights into file changes based on the operating system version and view detailed information, such as rule violations and suppressed changes.
- **Host based monitoring**. Monitor the hosts, users, and processes involved in the file modifications to identify anomalies.
- **Policy violation detection**. Identify high-risk file activities and policy violations, focusing on severity, suspicious file creations, and deletions. Analyzing trends over time helps detect spikes in malicious activity.

Use cases for the CrowdStrike Falcon FileVantage app include:

- **Security monitoring**. Detect unauthorized or unusual file activities in real time, such as critical file deletions or configuration changes.
- **Compliance**: Monitor adherence to file integrity policies and flag violations that might impact compliance with regulatory requirements.
- **Threat investigation**. Investigate suspicious file modifications to uncover potential breaches or insider threats.
- **Host Activity Analysis**. Analyze file changes at the host level to identify risky behaviors or compromised endpoints.

The Sumo Logic app for CrowdStrike Falcon FileVantage is an essential tool for security teams. It provides the visibility and intelligence needed to detect and respond to file-related threats, ensuring data integrity and compliance across the organization.

:::info
This app includes [built-in monitors](#crowdstrike-falcon-filevantage-monitors). For details on creating custom monitors, refer to [Create monitors for CrowdStrike Falcon FileVantage app](#create-monitors-for-crowdstrike-falcon-filevantage-app).
:::

## Log types

This App uses Sumo Logic’s [CrowdStrike FileVantage Source](https://help.sumologic.com/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-filevantage-source/) to collect the FileVantage logs from CrowdStrike.

### Sample log message

<details>
<summary>Event Log</summary>

```json
{
    "id": "d456mnopq4567rstuvwx8901yzab5678fghij",
    "cid": "e567rstuvwx8901yzab5678fghijklmopqrs",
    "aid": "f678yzab5678fghijklmnoqrstuvwxyza345",
    "platform_name": "Windows",
    "ingestion_timestamp": "2024-11-27T10:05:50Z",
    "entity_type": "FOLDER",
    "entity_path": "D:\\Projects\\NewProject\\",
    "is_from_different_mount_namespace": false,
    "action_type": "CREATE",
    "action_timestamp": "2024-11-27T10:05:50Z",
    "severity": "HIGH",
    "process_id": "3344556677889",
    "process_image_file_name": "D:\\Tools\\project_tool.exe",
    "user_id": "1100",
    "user_name": "projectadmin",
    "command_line": "project_tool.exe --new D:\\Projects\\NewProject\\",
    "diff": {},
    "host": {
        "name": "devserver01.example.com",
        "os_version": "Windows 10",
        "local_ip": "192.168.5.50",
        "external_ip": "198.51.100.14",
        "agent_version": "8.29.17000.0",
        "containment_status": "normal",
        "groups": [
            {
                "name": "Development"
            }
        ]
    },
    "policy": {
        "name": "Project Folder Policy",
        "rule_group": {
            "name": "Project Folder Monitoring",
            "rule": {
                "base_path": "D:\\Projects\\"
            }
        }
    },
    "is_suppressed": true,
    "real_user_id": "1100",
    "parent_process_image_file_name": "explorer.exe",
    "grandparent_process_image_file_name": "cmd.exe",
    "tags": [
        {
            "name": "NewProject"
        }
    ],
    "prevalence": {
        "key": "14:14:FOLDER:CREATE:D:\\Projects\\NewProject\\::project_tool.exe:projectadmin",
        "current": "RARE",
        "reported": "RARE",
        "computed_timestamp": "2024-11-27T10:06:50Z"
    }
}
```
</details>

### Sample queries

```sql title="File Changes"
_sourceCategory="Labs/CrowdStrikeFalconFileVantage" entity_type file
| json "id", "is_suppressed", "severity", "entity_type", "action_type", "host.os_version", "platform_name", "host.name", "user_name", "policy.rule_group.name", "policy.rule_group.rule.base_path", "process_id", "process_image_file_name", "host.external_ip", "action_timestamp", "entity_path", "policy.name" as id, is_suppressed, severity, entity_type, action_type, os_version, platform_name, host_name, user_name, rule_group_name, rule_base_path, process_id, process_image_file_name, ip, action_timestamp, entity_path, policy_name nodrop

| where action_type matches "{{action_type}}" and entity_type matches"{{entity_type}}" and entity_path matches"{{entity_path}}" and host_name matches"{{host_name}}" and user_name matches"{{user_name}}"and os_version matches"{{os_version}}" and rule_group_name matches"{{rule_group_name}}" and policy_name matches"{{policy_name}}" and severity matches"{{severity}}"

| where toLowerCase(entity_type) matches "*file*"
| count by id, action_type
| count as frequency by action_type
| sort by frequency, action_type
```

## Set up collection

Follow the instructions provided to set up [Cloud-to-Cloud Integration for CrowdStrike Falcon FileVantage Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-filevantage-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your CrowdStrike Falcon FileVantage app is properly integrated and configured to collect and analyze your CrowdStrike Falcon FileVantage data.

## Installing the CrowdStrike Falcon FileVantage app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing CrowdStrike Falcon FileVantage dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **CrowdStrike Falcon FileVantage - Overview** dashboard provides a comprehensive overview of file and directory activity, helping security analysts monitor file integrity and identify potential risks. It provides a total count of the file changes, categorizing them by severity—**Critical**, **High**, **Medium**, and **Low**—to prioritize investigations. Suppressed changes, which are ignored due to predefined policies, are also highlighted.

Key metrics include file change types (**WRITE**, **RENAME**, **READ** **PERMISSION**, **OTHERS**, **DELETE**), displayed in an easy-to-read pie chart for quick analysis. The dashboard tracks changes by operating system, identifies top hosts and users making changes, and highlights threats or anomalies.

The dashboard also shows the monitoring rules that triggered the most changes, assisting in policy refinement. A detailed table of recent file activities, including timestamps, hostnames, file paths, severities, and associated policies, is provided. Overall, the dashboard strengthens the detection and response to unauthorized or suspicious file activities. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Crowdstrike+Falcon+FileVantage/Crowdstrike+Falcon+FileVantage+dashboard.png')} alt="CrowdStrike Falcon FileVantage Overview" />
 

### Security

The **CrowdStrike Falcon FileVantage - Security** dashboard is tailored for security analysts to monitor high-risk file actions and potential policy violations. It categorizes file activities based on severity (**CRITICAL**, **HIGH**, **LOW**, **MEDIUM**) and action types, such as file creation, deletion, renaming, and attribute changes. This categorization helps analysts prioritize their responses to significant security events.

The dashboard tracks high-risk actions over time, enabling security teams to identify patterns or spikes in suspicious activity. There is also a dedicated section for policy violations, which lists instances where file changes conflict with configured security policies. This section includes details such as affected files, associated rules, and timestamps.

Additionally, security analysts can review file deletions with specific details, including file paths, user names, and originating countries. The severity trends are visually represented, providing a clear overview of security incidents over time and helping teams identify escalation points.

While the dashboard provides placeholders for tracking malicious file changes and directory changes, data in these sections requires specific configuration based on the environment. Finally, the **Host-Based Change Monitoring** table offers detailed insights into the hosts and host groups involved in file changes, assisting in pinpointing areas that need further investigation. Overall, this dashboard is a vital tool for ensuring file integrity and effectively mitigating risks. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Crowdstrike+Falcon+FileVantage/Crowdstrike+Falcon+FileVantage+Security.png')} alt="CrowdStrike Falcon FileVantage Security" />

## Create monitors for CrowdStrike Falcon FileVantage app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### CrowdStrike Falcon FileVantage monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `CrowdStrike Falcon FileVantage - Changes from Embargoed Geo Locations` | This alert identifies file activity originating from locations considered restricted or embargoed by the organization. It helps detect potentially unauthorized access or data exfiltration attempts from high-risk geographic areas. | Critical | Count > 0 | 
| `CrowdStrike Falcon FileVantage - Suppressed Changes` | This alert captures file changes that have been intentionally excluded or suppressed due to pre-defined policies or filters. It provides visibility into the suppressed events for auditing or validation purposes. | Critical | Count > 0|
| `CrowdStrike Falcon FileVantage - Critical Changes` | This alert tracks high-severity file modifications, deletions, or access attempts flagged as critical by CrowdStrike Falcon FileVantage. These changes could indicate potential security incidents, such as unauthorized access or malicious activity. | Critical | Count > 0|

## Upgrade/Downgrade the CrowdStrike Falcon FileVantage app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CrowdStrike Falcon FileVantage app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
