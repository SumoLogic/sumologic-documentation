---
id: duo-security
title: Duo Security
sidebar_label: Duo Security
description: The Sumo Logic App for Duo Security helps you monitor your Duo account’s authentication logs, administrator logs, and telephony logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="55"/>

Duo provides two-factor authentication, endpoint remediation, and secure single sign-on tools. The Sumo Logic App for Duo Security helps you monitor your Duo account’s [authentication logs](https://duo.com/docs/adminapi#authentication-logs), [administrator logs](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs). The dashboards provide insight into failed and successful authentications, events breakdown by applications, factors, and users, geo-location of events, admin activities, outliers, threat analysis of authentication, and administrator events.

## Log types

The Duo Security App uses following logs. Refer to the [Duo documentation](https://duo.com/docs/adminapi#logs) for details of the log schema.

When you generate the Duo credentials, you should do it for the Admin API application.

* Authentication logs
* Administrator logs
* Telephony logs

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

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

Overview of Duo Events including events breakdown by type, geographic location, one-day time comparison of events, and admin activity.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-overview.png')} alt="Duo Security dashboards" />

### Administrator Events

Geographic location of admin events, one-day time comparison of events, login errors, admin activity over time, and events breakdown by action.

<img src={useBaseUrl('img/integrations/security-threat-detection/Duo-administrator-events.png')} alt="Duo Security dashboards" />

### Success Authentications

Geographic location of successful authentication events, one-day time comparison of events, breakdown of events by Application, Factor, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-success-authentication.png')} alt="Duo Security dashboards" />

### Failed Authentications

Geographic location of failed authentication events, one-day time comparison of failed events, breakdown of events by Application, Factor, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-failed-authentications.png')} alt="Duo Security dashboards" />

### Outliers and Threat Analysis

Outliers and threat analysis of Duo events.

<img src={useBaseUrl('img/integrations/security-threat-detection/duo-outliers-threat.png')} alt="Duo Security dashboards" />

## Upgrade/Downgrade the Duo app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Duo app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>