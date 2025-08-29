---
id: zimperium
title: Zimperium
sidebar_label: Zimperium
description: The Sumo Logic App for Zimperium provides visibility into mobile threats through centralized threat intelligence and device telemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/integrations/zimperium/zimperium-logo.png')} alt="Thumbnail icon" width="80" />

The Zimperium app equips security analysts with comprehensive visibility into mobile threat activity, enabling faster detection, investigation, and response to security incidents on mobile devices. Its dashboard centralizes Zimperium’s threat intelligence and device telemetry, helping identify high-risk users, compromised devices, and malicious activity targeting mobile endpoints.

With this app, analysts can:
- **Monitor threats by severity**. Track trends over time for critical, important, low, and hidden threats, helping prioritize investigations.
- **Identify malicious network connections**. View domains and URLs flagged as malicious, with threat categorization for quick triage.
- **Correlate threats to users**. Pinpoint employees associated with threats to streamline response and remediation.
- **Review top actionable threats**. See prioritized detection details, including device IDs, risk scores, threat types, and impacted users.
- **Analyze threat artifacts**. Drill into detected malicious URLs, file sources, and exploited vulnerabilities.
- **Detect vulnerable OS versions**. Identify devices running outdated or insecure operating systems.
- **Spot jailbroken devices**. Detect and monitor devices that have been rooted or jailbroken, increasing the attack surface.
- **Investigate system tampering events**. Surface suspicious activities such as debugging, OS tampering, or configuration changes.
- **Assess device risk posture**. Review aggregated risk scores, posture issues, and affected users for incident prioritization.
- **Track threat mitigation events**. Confirm and audit mitigated threats to ensure timely response.
 
Use Cases for Security Analysts:
- Proactively hunting for compromised mobile endpoints in the organization.
- Detecting and investigating targeted phishing or malicious link-tapping events.
- Monitoring users connecting to high-risk networks or malicious domains.
- Enforcing mobile security policies by detecting non-compliant devices.
- Supporting incident response with enriched device and user context.


By integrating Zimperium’s advanced mobile threat defense data into Sumo Logic, security teams gain actionable, real-time insights to reduce mobile attack risk and protect enterprise data from compromise.

:::info
This app includes [built-in monitors](#zimperium-alerts). For details on creating custom monitors, refer to [Create monitors for Zimperium app](#create-monitors-for-the-zimperium-app).
:::

## Log types

The Zimperium app leverages the threat events collected via Zimperium Webhook.

### Sample log messages

<details>
<summary>Threat Event</summary>

```json
{
  "system_token": null,
  "severity": 0,
  "risk_posture": 3,
  "event_id": "7bbe0be8-6a83-4bb0-95a9-5b0211f2077b",
  "forensics": {
    "severity": "HIDDEN",
    "process_list": [
      
    ],
    "os": 1,
    "network_threat": {
      "my_ip": "109.248.151.179",
      "arp_tables": {
        "before": {
          
        }
      },
      "net_stat": [
        
      ]
    },
    "threat_uuid": "e6d7b9b7-080c-c267-7598-5f37aa3aa19c",
    "type": 209,
    "time_interval": 0,
    "general": [
      {
        "name": "Device IP",
        "val": "109.248.151.179"
      },
      {
        "name": "Network",
        "val": "SnowCrash"
      },
      {
        "name": "Network BSSID",
        "val": "94:83:c11:18:00:ee"
      },
      {
        "name": "Device Time",
        "val": "06 18 2025 11:18:00 UTC"
      },
      {
        "name": "Action Triggered",
        "val": "Silent Alert"
      },
      {
        "name": "Time Interval",
        "val": 0
      }
    ],
    "event_id": "7bbe0be8-6a83-4bb0-95a9-5b0211f2077b",
    "BSSID": "94:83:c11:18:00:ee",
    "attack_time": {
      "$date": 1755109080729
    },
    "responses": [
      "SILENT_ALERT"
    ],
    "_id": {
      "$oid": "7bbe0be8-6a83-4bb0-95a9-5b0211f2077b"
    },
    "zdid": "b21f3d31-5de6-4269-9788-1a5a35972303",
    "SSID": "Snow Crash"
  },
  "mitigated": false,
  "location": {
    "gps_latitude": null,
    "gps_longitude": null,
    "location_accuracy": null
  },
  "eventtimestamp": "06 18 2025 11:18:00 UTC",
  "user_info": {
    "employee_name": "",
    "user_id": null,
    "user_role": null,
    "user_email": "z.pocjb@qiyrabjnnu.com",
    "first_name": null,
    "middle_name": null,
    "last_name": null
  },
  "device_owner": {
    "id": null,
    "email": "z.pocjb@qiyrabjnnu.com",
    "first_name": null,
    "middle_name": null,
    "last_name": null
  },
  "device_info": {
    "device_time": "06 18 2025 11:18:00 UTC",
    "tag1": null,
    "tag2": null,
    "app": "MTD",
    "operator": null,
    "imei": "1E4002AE-B157-485E-AF01-38CE7E7B904F",
    "zdid": "b21f3d31-5de6-4269-9788-1a5a35972303",
    "app_version": "5.7.51",
    "zapp_instance_id": "53cb7994-c130-5b4c-9f5a-ab30cd393b60",
    "os": "ios",
    "jailbroken": false,
    "os_version": "15.8.3",
    "model": "iPhone8,2",
    "device_id": "1E4002AE-B157-485E-AF01-38CE7E7B904F",
    "type": null,
    "mdm_device_id": null,
    "mdm_alt_ids": null
  },
  "threat": {
    "name": "TESTFLIGHT_INSTALLED",
    "category": "SINGULAR",
    "general": {
      "time_interval": "0",
      "device_time": "06 18 2025 11:18:00 UTC",
      "external_ip": "109.248.151.179",
      "threat_type": "TESTFLIGHT_INSTALLED",
      "device_ip": "109.248.151.179",
      "imei": "1E4002AE-B157-485E-AF01-38CE7E7B904F",
      "network": "SnowCrash",
      "network_bssid": "94:83:c11:18:00:ee",
      "gateway_ip": null,
      "gateway_mac": null,
      "external_network": null,
      "network_interface": null,
      "network_encryption": null,
      "subnet_mask": null,
      "action_triggered": "Silent Alert",
      "device_mac": null,
      "attacker_ip": null,
      "attacker_mac": null,
      "attacker_ssid": null,
      "attacker_bssid": null,
      "base_station": null,
      "certificate": null,
      "stagefright_vulnerability_report": null,
      "jailbreak_reasons": null,
      "process": null,
      "sideloaded_app_package": null,
      "sideloaded_app_name": null,
      "sideloaded_app_developer": null,
      "event": null,
      "file_name": null,
      "file_path": null,
      "file_hash": null,
      "suspected_url": null,
      "module": null,
      "profile_category": null,
      "profile_description": null,
      "profile_identifier": null,
      "profile_name": null,
      "profile_type": null,
      "profile_risk": null,
      "malware_list": null,
      "package_name": null,
      "installer_source": null,
      "malware_family": null,
      "vulnerable_os_version": null,
      "expected_os_version": null,
      "vulnerable_security_patch": null,
      "expected_security_patch": null,
      "device_manufacturer": null,
      "device_model": null,
      "build_information": null,
      "detected_url": "null",
      "ip_of_detected_url": null
    },
    "threat_uuid": "e6d7b9b7-080c-c267-7598-5f37aa3aa19c",
    "display_name": "TestFlight App Installed",
    "mitre_tactics": [
      
    ],
    "child_threat_uuids": [
      
    ],
    "triggered_actions": [
      
    ]
  },
  "account_id": "b085f23c-4143-4751-ab66-cfb50b1257dd",
  "team_id": "acde6199-545b-4243-8634-eea8864bb1a3",
  "team_name": "Default",
  "additional_public_forensics": null
}
```
</details>

### Sample queries

```sql title="Threat Summary"
_sourceCategory=*zimperium* system_token  mitigated
| json field=_raw "additional_public_forensics", "team_name", "account_id", "device_owner", "device_info", "user_info", "eventtimestamp", "location", "mitigated", "forensics", "event_id", "risk_posture", "severity" nodrop 
| json field=_raw "mitigated" 
| where mitigated = "true"
| json field=_raw "forensics.severity" as severity nodrop
| where isNull(severity) or severity matches "*"
| json field=_raw "threat"
| json field=threat "display_name", "mitre_tactics", "threat_uuid",  "category" as threat_name, mitre_tactics, threat_uuid, threat_category
| json field=device_info "imei", "app", "operator", "app_version", "jailbroken", "model", "device_id"
| json field=user_info "user_email",  "employee_name"
| count by device_id, severity, threat_name, mitre_tactics, threat_uuid, threat_category,  user_email,  employee_name, imei, app, operator, app_version, model
```

## Setup collection

To set up integration for the Zimperium source, follow the steps below:

1. Create a [Sumo Logic HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/). 
2. In the Zimperium app, navigate to **Account Management** > **Data Export**.
:::note
Administrator privileges are required to access the Account Management page.
:::
3. Add a new **Data Export Configuration** and set the **Destination Type** to **REST Endpoint**.
4. Enter the required details as shown in the screenshot below, and use the **Sumo Logic HTTP Source URL** from Step 1 as the **Endpoint**.
<img src={useBaseUrl('/img/integrations/zimperium/add-data-export-config.png')} alt="Thumbnail icon" width="500"/>

## Installing the Zimperium app

This section provides instructions on how to install the Zimperium App for Sumo Logic. The app's pre-configured searches and dashboards provide easy-to-access visual insights into your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Zimperium dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Security

The **Zimperium - Security** dashboard enables you to monitor mobile threats by severity, investigate malicious network connections, and correlate detections with specific users for targeted response. It highlights top actionable threats, vulnerable OS versions, jailbroken devices, and system tampering events, while providing visibility into device risk posture to prioritize high-risk assets and track mitigation efforts for compliance. The dashboard streamlines detection, investigation, and remediation of mobile security incidents.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/zimperium/Zimperium+-+Security.png' alt="Zimperium-Security" />

## Create monitors for the Zimperium app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Zimperium alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Zimperium - Important and Critical Detections` | This alert is triggered when a threat marked as Important or Critical is detected. It immediately notifies security analysts of high-risk threats on managed mobile devices, enabling rapid triage of incidents such as active exploits, malicious network connections, device tampering, or non-compliant configurations. By surfacing only the most critical detections, it helps prioritize response efforts and protect sensitive data from potential compromise. | Critical | Count > 0 |

## Upgrade/Downgrade the Zimperium app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Zimperium app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>