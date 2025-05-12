---
id: bitwarden
title: Bitwarden
sidebar_label: Bitwarden
description: The Bitwarden app for Sumo Logic provides insights into container security and and manage runtime protection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/bitwarden.png')} alt="thumbnail icon" width="125"/>

The Sumo Logic app for Bitwarden provides comprehensive visibility into user activity, security events, and administrative changes within your Bitwarden environment. It enables security analysts to track key actions such as user logins, failed two-step verifications, master password resets, and decryption key migrations. The app includes contextual data—like IP addresses, device types, and geolocation—to help detect suspicious behavior and potential threats. Visualizations such as event trends and geo heatmaps reveal usage patterns and regional access anomalies.
A major strength of the app is its ability to highlight high-risk activities through event summaries and filtered views of critical actions, such as vault exports or SSO deactivation. It also includes preconfigured alerts to proactively detect security threats like data exfiltration, account compromise, or policy violations.
Overall, the app supports continuous monitoring and accelerates incident response in credential and secret management workflows.

:::info
This app includes [built-in monitors](#bitwarden-monitors). For details on creating custom monitors, refer to [Create monitors for Bitwarden app](#create-monitors-for-bitwarden-app).
:::

## Log types

This app uses Sumo Logic’s [Bitwarden Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/bitwarden-source/) to collect the [event logs](https://bitwarden.com/help/event-logs/) from the Bitwarden platform.

### Sample log messages

```json title="Event Log"
{
  "actingUserEmail": "frank@acoojoravi.com",
  "actingUserId": "9aaa2aeb-6cf1-48a0-8e2e-b28e015b71d6",
  "actingUserName": "frank",
  "date": "2025-04-23T22:42:44-0700226Z",
  "device": 9,
  "deviceName": "ChromeBrowser",
  "groupId": null,
  "groupName": "",
  "installationId": null,
  "ipAddress": "103.149.48.189",
  "itemId": null,
  "memberId": null,
  "object": "event",
  "policyId": null,
  "secretId": null,
  "serviceAccountId": null,
  "type": 1009,
  "typeName": "Created_item_item-identifier"
}
```

### Sample queries

```sql title="Event Breakdown"
_sourceCategory=Labs/bitwarden
| json "actingUserName", "date", "object", "type", "typeName", "ipAddress","deviceName","actingUserEmail" as user_name, date, object, event_code, event_name, ip, device_name, user_email
| lookup event_name from https://sumologic-app-data.s3.us-east-1.amazonaws.com/bitwarden_events.csv on event_code=event_code
| lookup latitude, longitude,country_name, country_code from geo://location on ip = ip


| count by event_name 
| sort by _count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Bitwarden](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/bitwarden-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Bitwarden app is properly integrated and configured to collect and analyze your Bitwarden data.
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

## Viewing the Bitwarden dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Security

The **Bitwarden - Security** dashboard offers security analysts a centralized view of critical user and system activity. It highlights high-risk events such as SSO disablement, master password resets, failed two-step verifications, and decryption key migrations. Visual tools like event timelines and geographic heatmaps help quickly identify anomalies. The dashboard also enforces security policies by flagging access from embargoed regions and tracking users who disable two-step login.
Detailed login and invitation data supports monitoring of access patterns and potential insider threats. Each panel is optimized for real-time investigation and auditing, enhancing the ability to detect and respond to suspicious behavior. The dashboard improves visibility, accountability, and response time for security incidents in Bitwarden.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Bitwarden/Bitwarden+-+Security.png' alt="Bitwarden-Security" />

## Create monitors for Bitwarden app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Bitwarden monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Events from Embargoed Geo Location` | This alert is triggered when a Bitwarden event is detected originating from a geo-location that is on an embargo list. This alert helps security teams detect potential violations of compliance policies or identify suspicious access attempts from high-risk regions. | Critical | Count > 0 |
| `Exported Organization Vault` | This alert is triggered when a user exports the entire organization's vault data. This is a high-risk activity that could indicate potential data exfiltration or insider threat behavior and should be reviewed immediately by security personnel. | Critical | Count > 0 |
| `Organization Disabled SSO` | This alert is triggered when the Single Sign-On (SSO) is disabled for the organization, which could reduce the security posture and increase the risk of unauthorized access. This alert ensures that administrators are immediately aware of any change that affects the organization’s authentication method. | Critical | Count > 0 |

## Upgrading the Bitwarden app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Bitwarden app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>