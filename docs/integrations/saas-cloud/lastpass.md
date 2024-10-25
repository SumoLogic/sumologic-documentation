---
id: lastpass
title: LastPass
sidebar_label: LastPass
description: The LastPass app for Sumo Logic provides security analysts with critical visibility into their LastPass environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/lastpass.png')} alt="thumbnail icon" width="55"/>

The Sumo Logic app for LastPass enables security analysts to monitor critical LastPass activities, providing visibility into both user and admin actions that are vital for maintaining account security. The app offers dashboards that track key events such as user logins, password resets, and multi-factor authentication (MFA) changes, helping to detect unusual patterns or potential threats. 

Analysts can monitor user activities like sharing keys, provisioning, de-provisioning, and policy changes, while also monitoring account creation and deletion trends. In addition, geo-location insights highlight the origins of risky activities and failed login attempts, assisting in identifying suspicious behavior across different regions. With real-time visualizations of event trends, analysts can quickly detect spikes in activity, allowing for proactive responses to potential security incidents.

:::info
This app includes [built-in monitors](#lastpass-monitors). For details on creating custom monitors, refer to [Create monitors for LastPass app](#create-monitors-for-lastpass-app).
:::

## Log types

This app uses Sumo Logic’s LastPass Source to collect [audit events](https://support.lastpass.com/s/document-item?bundleId=lastpass&topicId=LastPass/api_event_reporting.html&_LANG=enus) from LastPass platform.

## Sample log messages

```json title="Audit Event Log"
{
  "Time": "2024-10-14 08:00:32",
  "Username": "thomas@sumo.com",
  "IP_Address": "137.80.288.60",
  "Action": "Log in",
  "Data": "LastPass via Chrome v4.134.0"
}
```
## Sample queries

```sql title="Top 10 Active Users"
_sourceCategory="lastpass_event" Action Username
| json "Time","Username", "Action","IP_Address", "Data" as time, user, action, ip_address, data nodrop

// Global filters
| where action matches "{{action}}"

| count as frequency by user
| sort by user
| limit 10
```

## Set up collection

To set up the [LastPass Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/lastpass-source) for the LastPass app, follow the instructions provided. These instructions will guide you through the process of creating a source using the LastPass Source category, which you will need to use when installing the app. By following these steps, you can ensure that your LastPass app is properly integrated and configured to collect and analyze your LastPass data.

## Installing the LastPass app​

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing LastPass dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Activity and Risk Monitoring

The **LastPass - Activity and Risk Monitoring** dashboard provides a detailed view of user actions and event trends, helping security analysts track critical activity. It displays total event counts, new account creations, and top users and actions, allowing for quick identification of frequent behaviors. The event timeline highlights spikes in activity that may indicate potential risks. Additionally, the geo-location maps of events and risky actions offer insights into the geographic distribution of LastPass activities, helping analysts identify regional anomalies or suspicious login patterns. This dashboard is designed to support proactive threat detection and response. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LastPass/LastPass-Activity-and-Risk-Monitoring.png' alt="LastPass-Activity-and-Risk-Monitoring" />

### Security Overview

The **LastPass - Security Overview** provides a detailed view of key authentication events to help security analysts monitor user activity and detect potential threats. It tracks logins to the admin console, encryption key rotations, and SAML login events, offering insight into critical security operations. The dashboard also highlights recent master password changes, MFA modifications, and both successful and failed authentication attempts. By focusing on these events, analysts can quickly identify suspicious behavior, such as unusual login patterns or password resets, and take action to secure the LastPass environment. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LastPass/LastPass-Security-Overview.png' alt="LastPass-Security-Overview" />

### Admin and User Activity

The **LastPass - User and Admin Activity** dashboard offers a comprehensive overview of admin and user activities within LastPass, enabling security analysts to detect and respond to unusual behavior. It tracks admin actions such as user provisioning, de-provisioning, and role changes, alongside critical policy modifications and group updates. Additionally, it highlights user actions such as data imports, exports, and shared folder activities. By analyzing trends in these events, security analysts can quickly identify potential risks, such as unauthorized access or sensitive data deletions, ensuring enhanced protection for the LastPass environment. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LastPass/LastPass-Admin-and-User-Activity.png' alt="LastPass-Admin-and-User-Activity" />

## Create monitors for LastPass app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### LastPass monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Failed login attempt` | This alert notifies you when there is a failed login attempt. Multiple failed login attempts may indicate a brute force attack or an unauthorized user attempting to gain access to the LastPass environment. | Critical | Count > 2 | 
| `Login exceeds set parameters` | This alert is triggered when login attempts or user sessions exceed defined security parameters. This could involve accessing unauthorized devices, exceeding allowed session lengths, or violating other security policies. | Critical | Count > 1|
| `Events from Risky Locations` | This alert is activated when user activities or login attempts are detected from geographical locations deemed high-risk. These events could signal unauthorized access attempts and may require investigation to ensure the legitimacy of the user’s actions. | Critical | Count > 0|
| `Changes in MFA` | This alert is triggered when changes are made to Multi-Factor Authentication (MFA) settings. This could include enabling, disabling, or modifying MFA methods, which are critical to account security and require close monitoring to prevent unauthorized access. | Critical | Count > 0|
| `Master Password & Encryption Key Events` | This alert tracks events related to changes or activities involving master passwords or encryption keys. Since these are crucial elements for accessing sensitive data, any changes should be closely monitored for potential security breaches. | Critical | Count > 0|
| `Changes in Provisional Credentials` | This alert monitors changes made to provisional or temporary credentials. These changes could include issuing new credentials, modifications, or revocation, and should be carefully reviewed to ensure compliance with security policies. | Critical | Count > 0|
| `Role, Policy, and Access Control Changes` | This alert tracks modifications to user roles, security policies, or access control settings within LastPass. Such changes could impact how resources are accessed and managed, so it's critical to ensure that only authorized personnel are making these adjustments. | Critical | Count > 0|

## Upgrading the LastPass app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the LastPass app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>