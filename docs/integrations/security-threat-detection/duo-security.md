---
id: duo-security
title: Duo Security
sidebar_label: Duo Security
description: The Sumo Logic App for Duo Security helps you monitor your Duo account’s authentication logs, administrator logs, and telephony logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="75"/>

Duo provides two-factor authentication, endpoint remediation, and secure single sign-on tools. The Sumo Logic App for Duo Security helps you monitor your Duo account’s [authentication logs](https://duo.com/docs/adminapi#authentication-logs), [administrator logs](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs). The dashboards provide insight into failed and successful authentications, events breakdown by applications, factors, and users, geo-location of events, admin activities, outliers, threat analysis of authentication, and administrator events.

## Log Types

The Duo Security App uses following logs. See [Duo documentation](https://duo.com/docs/adminapi#logs) for details of the log schema.

When you generate the Duo credentials, you should do it for the Admin API application.

* Authentication Logs
* Administrator Logs
* Telephony Logs

## Collecting Logs for the Duo Security App

To collect logs from the Duo Security App, use the new [Cloud to Cloud Integration for Duo Security App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source) to create the source and use the same source category while installing the app.


## Installing the Duo Security App and View the Dashboards

This section provides instructions on how to install the Duo Security App, as well as an example of each of the App dashboards. The App dashboards provide insight into failed and successful authentications, administrator events, and outlier events.

The Duo Security App helps you monitor your Duo account’s [authentication](https://duo.com/docs/adminapi#authentication-logs), [administrator](https://duo.com/docs/adminapi#administrator-logs), and [telephony logs](https://duo.com/docs/adminapi#telephony-logs).

{@import ../../reuse/apps/app-install.md}

## Viewing the Duo Security Dashboards

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
