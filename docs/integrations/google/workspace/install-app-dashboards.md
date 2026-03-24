---
id: install-app-dashboards
title: Google Workspace app and Dashboards
sidebar_label: App Installation and Dashboards
description: Instructions for installing the Google Workspace app and information about each of the dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

This page demonstrates how to install the Google Workspace app and enable documents shared outside your organization. This page also provides descriptions, use cases, and examples for each of the Google Workspace app dashboards.

## Installing the Google Workspace app

import AppInstall2 from '../../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Google Workspace dashboards​

import ViewDashboards from '../../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Google Workspace - Overview** dashboard provides a high-level overview of up-to-date activities throughout Google Workspace, including information on login failures, logins from multiple IPs, changes in ACL, login failures by user, top apps, and top events by event type.

Use this dashboard to:
* Monitor the number of compromised devices and users.
* Use the panels to navigate to alert center detail dashboards.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Overview.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />

### Admin

The **Google Workspace - Admin** dashboard provides at-a-glance graphs paired with detailed analytics to give you a comprehensive view of administrative activities in Google Workspace. This includes information on users and groups that have been created or deleted, app token actions, admin action count, and actions by admins and users.

Use this dashboard to:
* Monitor alerts associated with admin users.
* Track creation and deletion activities by admin users.
* Monitor user content transfer activity.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Admin.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Drive

The **Google Workspace - Drive** dashboard provides at-a-glance graphs and detailed analytics on Google Drive activity. The up-to-date Google Workspace Drive information includes drive activity by location, trends in drive activity by country, ACL changes, counts of primary actions, recent uploads, document types, documents viewed, and documents shared.

Use this dashboard to:
* Monitor documents shared both inside and outside of the organization.
* Track user geographic locations and their drive activities including ACL changes, uploads, and downloads.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Drive.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Drive - User Activity

The **Google Workspace - Drive - User Activity** dashboard provides detailed information on Google Drive activity by users. A breakdown of user activity information includes most active users, most active IP addresses, and top users for downloading, uploading, creating, and sharing content.

Use this dashboard to:
* Monitor content sharing by compromised users to identify potential data leak issues.
* Determine most active users and active IP addresses.
* Track top users by the number of activities on Google Drive.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Drive-User-Activity.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Login

The **Google Workspace - Login** dashboard provides high-level graphs and detailed information for Google Workspace apps login data. Login information includes geographic locations, logins by state, successful logins, login failures by user, IP address, and type; login failure outliers, login activity trends, and logins from multiple IP addresses.

Use this dashboard to:
* Identify abnormal spikes in login failures.
* Monitor successful logins by compromised users.
* Track user login trends and their geographic locations.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Login.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Alert Center - Overview

The **Google Workspace - Alert Center - Overview** dashboard provides a high-level view of Google Workspace alert data by source and type, suspicious IP and email addresses, compromised devices and credentials, recent alerts, and alert trends over time.

Use this dashboard to:
* Determine potential threats.
* Monitor abnormal spikes and recent alerts.
* Monitor credentials breaches and compromised devices

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Overview.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Alert Center - Admin Actions

The **Google Workspace - Alert Center - Admin Actions** dashboard provides detailed insights into sensitive administrative actions in Google Workspace. This includes information on super admin password reset alerts, primary admin changed alerts, SSO-related alerts, total alerts, and alert trends over time by type.

Use this dashboard to:
* Monitor high-risk administrative changes.
* Investigate admin-related alert trends by type.
* Track alerts related to SSO and super admin account changes.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Admin-Actions.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />



### Alert Center - Investigations

The **Google Workspace - Alert Center - Investigations** dashboard provides easily accessible analytics on compromised credentials, including Google Workspace activity of users with compromised credentials and Google Workspace applications used. This dashboard also provides data on Google Workspace user activities and Google Workspace applications used from compromised devices.

Use this dashboard to:
* Track credential breaches and compromised devices.
* Monitor user activities after credentials have been breached or after a device has been compromised
* Track potential threats by email, IP address, and domain.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Investigations.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Alert Center - Google Identity

The **Google Workspace - Alert Center - Google Identity** dashboard provides detailed information on suspicious logins and suspended users. This dashboard also provides information on the number and location of suspicious logins and suspended users.

Use this dashboard to:
* Monitor suspicious activity and its locations.
* Identify suspended users and suspicious logins.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Google-Identity.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />


### Alert Center - Gmail Phishing

The **Google Workspace - Alert Center - Gmail Phishing** dashboard provides detailed information on phishing attacks and spam activity on Google Workspace applications. This dashboard also provides information on the affected users and the top attackers responsible for the attacks.

Use this dashboard to:
* Monitor users affected by phishing attacks.
* Identify top attackers by volume and breadth.
* Track recent attacks.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Gmail-Phishing.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />

### Alert Center - Mobile Device Management

The **Google Workspace - Alert Center - Mobile Device Management** dashboard provides detailed information on mobile device security alerts in Google Workspace. This includes information on compromised devices, suspicious activity by device type, APNS certificate expiration alerts, device compromised alerts by top users, and recent suspicious activity.

Use this dashboard to:
* Monitor suspicious activity by mobile device type.
* Track compromised device alerts by user.
* Identify APNS certificate expiration alerts.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Mobile-Device-Management.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />

### Alert Center - Other Alerts

The **Google Workspace - Alert Center - Other Alerts** dashboard provides detailed information on miscellaneous Google Workspace alerts. This includes information on Google Mandatory Service Announcements, data loss prevention alerts, customer takeout initiated events, customer abuse alerts, apps outage alerts, Google Operations alerts, and government-backed attack warnings.

Use this dashboard to:
* Monitor service and operations-related alerts.
* Identify data loss prevention and customer takeout events.
* Track customer abuse and government-backed attack warnings.
* Investigate miscellaneous alert activity in one place.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Other-Alerts.png')} style={{border: '1px solid gray'}} alt="Google Workspace dashboards" />

## Create monitors for the Google Workspace app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Google Workspace app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Google Workspace - Alert: Excessive Login Failures by User` | This alert is triggered when a user exceeds three login failures within 15 minutes, including failed login attempts and login challenges. This may indicate a brute-force attack or unauthorized access attempt targeting the user's account. | Count > 3 | Count < = 3 |
| `Google Workspace - Alert: Leaked Password` | This alert is triggered when Google detects that a user's credentials have been compromised in a third-party data breach. Immediate action such as a password reset is recommended to prevent unauthorized access to the affected account. | Count > 0 | Count < = 0 |
| `Google Workspace - Alert: Logins from Multiple IP Addresses` | This alert is triggered when a user logs in from more than one distinct IP address within 15 minutes. This may indicate account compromise, credential sharing, or unauthorized access from multiple locations. | Count > 0 | Count < = 0 |
| `Google Workspace - Alert: Suspicious Activity on Mobile Devices` | This alert is triggered when suspicious activity is detected on a managed mobile device, such as unexpected property changes. This may indicate a compromised or tampered device that requires immediate investigation. | Count > 0 | Count < = 0 |
| `Google Workspace - Alert: Suspicious Login Detected` | This alert is triggered when Google identifies a login attempt as suspicious based on anomalous sign-in patterns. This may indicate an unauthorized user attempting to access the account and warrants immediate investigation. | Count > 0 | Count < = 0 |
| `Google Workspace - Alert: Suspicious Message Reported` | This alert is triggered when a user reports a suspicious or phishing email in Gmail. This provides visibility into potential phishing campaigns targeting your organization and helps identify attackers and affected recipients. | Count > 0 | Count < = 0 |
| `Google Workspace - Alert: User Suspended (Suspicious Activity)` | This alert is triggered when Google suspends a user account due to detected suspicious activity. This typically indicates that the account may have been compromised, and immediate review is required to restore access and secure the account. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Google Workspace app (Optional)

import AppUpdate from '../../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Workspace app (Optional)

import AppUninstall from '../../../reuse/apps/app-uninstall.md';

<AppUninstall/>
