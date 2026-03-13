---
id: duo-security
title: Duo Security
sidebar_label: Duo Security
description: The Sumo Logic app for Duo Security helps you monitor your Duo account’s authentication logs, administrator logs, and telephony logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="55"/>

Duo provides two-factor authentication, endpoint remediation, and secure single sign-on tools. The Sumo Logic app for Duo Security helps you monitor your Duo account’s [authentication logs](https://duo.com/docs/adminapi#authentication-logs), [administrator logs](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs). The dashboards provide insight into failed and successful authentications, events breakdown by applications, factors, and users, geo-location of events, admin activities, outliers, threat analysis of authentication, and administrator events.

## Log types

The Duo Security app uses following logs. Refer to the [Duo documentation](https://duo.com/docs/adminapi#logs) for details of the log schema.

When you generate the Duo credentials, you should do it for the Admin API application.

* Authentication logs
* Administrator logs
* Telephony logs

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Duo Security](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Duo Security app is properly integrated and configured to collect and analyze your Duo Security data.
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

## Viewing Duo Security dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

The Duo Security app helps you monitor your Duo account’s [authentication](https://duo.com/docs/adminapi#authentication-logs), [administrator](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs).

### Overview

The **Duo Security - Overview** dashboard provides a high-level summary of Duo activity, including event-type distribution, trends, failed-authentication reasons, geo-location, and recent administrator activity.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Overview.png')} alt="Duo Security dashboards" />

### Activity Events

The **Duo Security - Activity Events** dashboard provides detailed visibility into Duo activity logs, including action trends, top actors, device and browser activity, sensitive actions, and geo-location context for investigation.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Activity-Events.png')} alt="Duo Security dashboards" />

### Administrator Events

The **Duo Security - Administrator Events** dashboard provides comprehensive monitoring of administrator activity, including login errors, successful logins, action breakdowns, trends over time, and geo-location of admin access.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Administrator-Events.png')} alt="Duo Security dashboards" />

### Success Authentications

The **Duo Security - Success Authentications** dashboard provides analysis of successful login events by user, factor, application, reason, and location, with geo maps and trends to validate expected access behavior.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Success-Authentications.png')} alt="Duo Security dashboards" />

### Failed Authentications

The **Duo Security - Failed Authentications** dashboard provides focused analysis of failed login activity by reason, factor, application, user, and location, with geo maps and trend comparisons to identify anomalies.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Failed-Authentications.png')} alt="Duo Security dashboards" />

### Outliers and Threat Analysis

The **Duo Security - Outliers and Threat Analysis** dashboard helps detect anomalous authentication behavior and investigate threats using threat intelligence enrichment across authentication and administrator events.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Outliers-and-Threat-Analysis.png')} alt="Duo Security dashboards" />

### Users Overview

The **Duo Security - Users Overview** dashboard provides user posture visibility across status distribution, lockout reasons, enrollment coverage, group membership, inactive users, and lifecycle changes.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-Security-Users-Overview.png')} alt="Duo Security dashboards" />

## Create monitors for the Duo Security app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Duo Security app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Duo Security - Activity from Embargoed Location` | This alert is triggered when Duo activity is observed from embargoed or high-risk countries. This may indicate unauthorized access, policy violations, or malicious activity originating from restricted geographies. | Count > 0 | Count < = 0 |
| `Duo Security - Admin Login Error Detected` | This alert is triggered when administrator login errors are detected in Duo. Repeated admin login failures may indicate credential abuse, brute-force attempts, or unauthorized attempts to access privileged accounts. | Count > 0 | Count < = 0 |
| `Duo Security - Admin Login from Embargoed Location` | This alert is triggered when a Duo administrator login originates from an embargoed or high-risk location. This may indicate compromised administrative access and should be investigated immediately. | Count > 0 | Count < = 0 |
| `Duo Security - Excessive Failed Authentications by User` | This alert is triggered when a user exceeds three failed Duo authentication attempts within 15 minutes. This may indicate brute-force activity, credential stuffing, or unauthorized access attempts against user accounts. | Count > 3 | Count < = 3 |
| `Duo Security - Secret Key View Activity` | This alert is triggered when Duo integration secret keys are viewed. Secret key access is a sensitive administrative action and may indicate privilege misuse or preparation for unauthorized integration changes. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Duo app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Duo app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
