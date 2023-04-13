---
id: ueba
title: UEBA Cloud Security Monitoring and Analytics
sidebar_label: UEBA
description: Install the Sumo Logic UEBA  app to monitor baseline user and entity and report on detected patterns.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/ueba.png')} alt="Thumbnail icon" width="85"/>

The Sumo Logic UEBA (User and Entity Behavior Analytics) app monitors baseline user and entity behavior and reports on any unusual patterns detected. The UEBA app leverages several machine learning algorithms and statistical analysis models to establish normal behavior or patterns and detects anomalies within your environment. Each dashboard in this app takes a different lens on your security data, from UEBA Signals fired to User and Entity centric views of events that truly identify potential and real threats.

## Prerequisites

This app requires access to Cloud SIEM Enterprise (CSE).

## Installing the UEBA App

Install the Sumo Logic App to use the preconfigured searches and dashboards.

To install the app, do the following:
1. In the **App Catalog,** search for "UEBA" and select the **UEBA** app.
2. Click **Add to Library**.<br/><img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/ueba-install.png')} alt="UEBA-Signals" width="500"/>
3. To save the app to a new folder in your personal folder, click **+New Folder** and select a name and location for your folder.
4. Click **Add to Library** to install the app. A confirmation dialog will appear and then you can start viewing your  dashboards.


## Viewing UEBA Security Dashboards

### UEBA - User
The **Users** dashboard displays information about the behavior of users. It displays the devices they typically interact with and the times of day that they log into those devices. The dashboard can be focused onto a particular user or group of users by entering a match expression in the **User** field at the top of the dashboard. Matching users are shown in the Users panel.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/UEBA-Users.png')} alt="UEBA-Users" />

### UEBA - Signals
The **Signals** dashboard displays a brief summary of the behavioral anomalies the app has detected. The **Summary** field shows the users or devices involved, the typical data range, and the observed data range. The **Confidence** field is expressed as a percentage and shows how strongly this finding is supported by evidence.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/UEBA-Signals.png')} alt="UEBA-Signals" />
