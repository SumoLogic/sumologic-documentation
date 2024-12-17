---
id: 1password
title: 1Password
sidebar_label: 1Password
description: The Sumo Logic App for 1Password helps you monitor your 1Password account’s sign-in and item usage events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="55"/>

1Password is a secure and convenient password manager for documents, credit card information, and addresses. The Sumo Logic app for 1Password enables you to monitor sign-in and item usage events within your 1Password account. It offers insights into failed and successful authentications, breaking down events by client applications, type, category, users, and geo-location, while also identifying outliers and analyzing threats related to sign-ins. Furthermore, the app provides in-depth tracking of critical security activities such as account activations, deletions, email changes, and group creations. It visualizes audit events by geographic location, highlights risky areas, and offers detailed logs of recent access activities and role changes. This app helps secure your 1Password vault by delivering comprehensive insights into user actions and threat intelligence on clients accessing shared vaults.

:::info
This app includes [built-in monitors](#1password-alerts). For details on creating custom monitors, refer to [Create monitors for 1Password app](#create-monitors-for-1password-app).
:::

## Log types  

The 1Password app uses the following logs:

* [Sign-in Events](https://support.1password.com/events-api-reference/#signinattemptitems-object)
* [Item Usage](https://support.1password.com/events-api-reference/#itemusage-object)
* [Audit Events Logs](https://developer.1password.com/docs/events-api/audit-events)

### Sample log messages

<details>
<summary>Sign-in attempt Event</summary>

```json 
    {
      "uuid": "56YE2TYN2VFYRLNSHKPW5NVT5E",
      "session_uuid": "A5K6COGVRVEJXJW3XQZGS7VAMM",
      "timestamp": "2021-03-01T16:32:50-03:00",
      "category": "firewall_failed",
      "type": "continent_blocked",
      "country": "France",
      "details": {
        "value": "Europe"
      },
      "target_user": {
        "uuid": "IR7VJHJ36JHINBFAD7V2T5MP3E",
        "name": "Wendy Appleseed",
        "email": "wendy_appleseed@agilebits.com"
      },
      "client": {
        "app_name": "1Password Extension",
        "app_version": "20127",
        "platform_name": "Chrome",
        "platform_version": "string",
        "os_name": "MacOSX",
        "os_version": "10.15.6",
        "ip": "13.227.95.22"
      }
    }
```
</details>

<details>
<summary>Item Usage Event</summary>

```json 
    {
      "uuid": "56YE2TYN2VFYRLNSHKPW5NVT5E",
      "timestamp": "2020-06-11T16:32:50-03:00",
      "used_version": 0,
      "vault_uuid": "VZSYVT2LGHTBWBQGUJAIZVRABM",
      "item_uuid": "SDGD3I4AJYO6RMHRK8DYVNFIDZ",
      "user": {
        "uuid": "4HCGRGYCTRQFBMGVEGTABYDU2V",
        "name": "Wendy Appleseed",
        "email": "wendy_appleseed@agilebits.com"
      },
      "client": {
        "app_name": "1Password Extension",
        "app_version": "20127",
        "platform_name": "Chrome",
        "platform_version": "string",
        "os_name": "MacOSX",
        "os_version": "10.15.6",
        "ip": "13.227.95.22"
      },
    "action": "secure-copy"
    }
```
</details>

<details>
<summary>Audit Events Log</summary>

```json
{
  "uuid": "56YE2TYN2VFYRLNSHKPW5NVT5E",
  "timestamp": "2023-03-15T16:33:50-03:00",
  "actor_uuid": "4HCGRGYCTRQFBMGVEGTABYDU2V",
  "actor_details": {
    "uuid:": "4HCGRGYCTRQFBMGVEGTABYDU2V",
    "name": "Jeff Shiner",
    "email": "jeff_shiner@agilebits.com"
  },
  "action": "join",
  "object_type": "gm",
  "object_uuid": "pf8soyakgngrphytsyjed4ae3u",
  "aux_id": 9277034,
  "aux_uuid": "K6VFYDCJKHGGDI7QFAXX65LCDY",
  "aux_details": {
    "uuid": "K6VFYDCJKHGGDI7QFAXX65LCDY",
    "name": "Wendy Appleseed",
    "email": "wendy_appleseed@agilebits.com"
  },
  "aux_info": "A",
  "session": {
    "uuid": "A5K6COGVRVEJXJW3XQZGS7VAMM",
    "login_time": "2023-03-15T16:33:50-03:00",
    "device_uuid": "lc5fqgbrcm4plajd8mwncv2b3u",
    "ip": "192.0.2.254"
  },
  "location": {
    "country": "Canada",
    "region": "Ontario",
    "city": "Toronto",
    "latitude": 43.5991,
    "longitude": -79.4988
  }
}
```
</details>

### Sample queries

```sql title="Successful Sign-in"
_sourceCategory="1pw"
| json "type", "category", "timestamp",  "details", "target_user.name", "target_user.email", "client.app_name", "client.app_version", "client.platform_name", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city" as type, category, timestamp, details, target_user_name, target_user_email, client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
| where category matches  "{{category}}" AND type matches  "{{type}}" AND country matches  "{{country}}" AND city matches  "{{city}}" AND target_user_name matches  "{{target_user_name}}" AND client_app_name matches  "{{client_app_name}}" AND client_platform matches  "{{client_platform}}" AND client_os matches  "{{client_os}}"
| where category matches "*succ*"
| count by timestamp, target_user_name, type, category, details,client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
```

```sql title="Failed Sign-in"
_sourceCategory="1pw"
| json "type", "category", "timestamp",  "details", "target_user.name", "target_user.email", "client.app_name", "client.app_version", "client.platform_name", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city" as type, category, timestamp, details, target_user_name, target_user_email, client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
| where category matches  "{{category}}" AND type matches  "{{type}}" AND country matches  "{{country}}" AND city matches  "{{city}}" AND target_user_name matches  "{{target_user_name}}" AND client_app_name matches  "{{client_app_name}}" AND client_platform matches  "{{client_platform}}" AND client_os matches  "{{client_os}}"
| where !(category matches "*succ*")
| count by timestamp, target_user_name, type, category, details,client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
```

```sql title="Item Usage"
_sourceCategory=1pw action
| json "timestamp", "user.name", "client.app_name", "client.platform_name", "client.platform_version", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city", "action", "vault_uuid", "item_uuid" as timestamp, user_name, client_app_name, client_platform, client_platform_version, client_os, client_os_version, client_ip, country, region, city, action, vault_uuid, item_uuid
| count by timestamp, user_name, client_app_name, client_platform, client_platform_version, client_os, client_os_version, client_ip, country, region, city, action, vault_uuid, item_uuid
```

```sql title="Recent Access Activities"
_sourceCategory="app/"
| json "uuid", "object_type", "action", "actor_details.email", "aux_details.name", "aux_details.email", "aux_info" as uuid, object_type, action, actor_email, aux_name, aux_email, aux_info nodrop

//global filter
| where action matches "*"
| where object_type matches "*"

| where object_type in ("uva", "gva")
| count as frequency by _messageTime, actor_email, object_type, action, aux_name, aux_email, aux_info
| sort by _messageTime
| formatDate(_messageTime, "dd-MM-yyyy HH:mm:ss") as time
| fields time, actor_email, object_type, action, aux_name, aux_email, aux_info
| fields -_messageTime
```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for 1Password](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/1password-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your 1Password app is properly integrated and configured to collect and analyze your 1Password data.
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

## Viewing 1Password dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **1Password - Overview** provides an overview of 1Password events including events breakdown by type, category, geographic location, one-day time comparison of events, audit logs by audit type, and failed sign-in activity.

<img src={useBaseUrl('img/integrations/1password/1Password-Overview.png')} alt="1Password-Overview" />

### Successful Sign-ins

The **1Password - Successful Sign-ins** dashboard provides geographic location of successful sign-in events, one-day time comparison of events, breakdown of events by Category, Type, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/1password/1Password-Successful-Sign-ins.png')} alt="1Password-Successful-Sign-ins" />

### Failed Sign-ins

The **1Password - Failed Sign-ins** dashboard provides geographic location of failed events, one-day time comparison of events, breakdown of events by Category, Type, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/1password/1Password-Failed-Sign-ins.png')} alt="1Password-Failed-Sign-ins" />

### Threat Intel

The **1Password - Threat Intel** dashboard provides high-level views of threats throughout your 1Password Service. Dashboard panels display visual graphs and detailed information on Threats by the client, target user, source app, platform, threats by actors, and threats by malicious confidence.

<img src={useBaseUrl('img/integrations/1password/1Password-Threat-Intel.png')} alt="1Password-Threat-Intel" />

### Item Usage

The **1Password - Item Usage** dashboard shows information about items in shared vaults that have been modified, accessed, or used. This dashboard provides you geo-locations of clients who accessed items in the shared vault, it also provides threat intel analysis of client IPs to secure your vault access.

<img src={useBaseUrl('img/integrations/1password/1Password-Item-Usage.png')} alt="1Password-Item-Usage" />

### Audit Security

The **1Password - Audit Security** dashboard provides a comprehensive view of security-related activities and monitors critical user activities by tracking key metrics such as account activations, deletions, email changes, and group creations. This dashboard helps you visualize the geographical distribution of audit events and highlights top actions, risky locations, and changes to security configurations like MFA and SSO. It includes detailed logs of recent access activities, role changes, and service account token events, ensuring comprehensive oversight of security events. This dashboard is essential for quick identification and rectification of potential security threats in 1Password.

<img src={useBaseUrl('img/integrations/1password/1Password-Audit-Security.png')} alt="1Password-Audit-Security" />

## Create monitors for 1Password app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### 1Password alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Privileged vault and group access control changes` | This alert is fired when there are changes to privileged vault and group access control. | Critical | Count > 0 | 
| `Login Exceeds Set Parameters` | This alert is fired when the user tries login activities from more than one location. | Critical | Count > 1|
| `Grant User Vault Access` | This alert is fired when the user is granted access to a vault. | Critical | Count > 0 |
| `Changes to a User's MFA settings` | This alert is fired when a user makes changes in the MFA settings. | Critical | Count > 5 |
| `Audit Events from Risky Locations` | This alert is fired when an audit event is registered from an embargo location (Afghanistan, China, Cuba, North Korea, Iran, Libya, Nigeria, Sudan, Syria, and Yemen). | Critical | Count > 0 |
| `1Password tenant-level Changes` | This alert is fired when changes are made to firewall rules, SSO settings, or a user sets up their 1Password account to unlock with SSO. | Critical | Count > 0 |

## Upgrade/Downgrade the 1Password app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the 1Password app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
