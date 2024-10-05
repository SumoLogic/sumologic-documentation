---
title: Atlassian Opsgenie
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/atlassian.png')} alt="criminal-ip" width="90"/>

***Version: 1.2
Updated: Sep 16, 2024***

OpsGenie, a service powered by Atlassian in the cloud, provides operational teams with robust alert management capabilities. It ensures efficient tracking of notifications triggered by various monitoring systems. The primary goal is to guarantee that alerts reach the appropriate team members and that issues are resolved swiftly. This service has been successfully incorporated and rigorously vetted in combination with OpsGenie's platform.

## Actions

* **Acknowledge Alert** *(Notification)* - Confirm receipt of alerts with OpsGenie.
* **Add Note to Alert** *(Notification)* -  Append a remark to an alert within the OpsGenie system
* **Add Responder to Alert** *(Notification)* - Append a responder to an alert within OpsGenie.
* **Add Tag to Alert** *(Notification)* - Allocate an OpsGenie tag.
* **Assign Alert** *(Notification)* - Allocate an OpsGenie alert.
* **Close Alert** *(Containment)* - Close an alert within OpsGenie.
* **Create Alert** *(Notification)* - Generate a notification within OpsGenie.
* **Create Incident** *(Notification)* - Generate an incident within OpsGenie.
* **Delete Alert** *(Containment)* - Remove an alert from OpsGenie.
* **Escalate Alert Notification Analysis** *(Enrichment)* - Retrieve escalation policies from OpsGenie.
* **Get Alert** *(Enrichment)* - Retrieve the specified alert from OpsGenie.
* **Get On Calls** *(Enrichment)* - Retrieve current on-call participants of a specific schedule.
* **Get Alert Request Status** *(Enrichment)* - Retrieve the status of an alert request from OpsGenie.
* **Get Incident** *(Enrichment)* - Retrieve summarized data, such as issues, risks, open ports, connections, and detection information for a specific IP address.
* **Get Team** *(Enrichment)* - Retrieve specific team information from OpsGenie.
* **List Alerts** *(Enrichment)* - Retrieve a list of alerts from OpsGenie.
* **List Incidents** *(Enrichment)* - Retrieve a list of incidents from OpsGenie.
* **List Schedules** *(Enrichment)* - Retrieve a list of schedules from OpsGenie.
* **List Teams** *(Enrichment)* - Retrieve a list of teams from OpsGenie.
* **List Users** *(Enrichment)* - Retrieve a list of users from OpsGenie.

## Atlassian Opsgenie configuration

Follow the steps below to create an API key. 

### Subscriptions account

1. Navigate to the **Settings** page.
1. Go to **Integrations** > **Integrations**.
1. Click on **Default API**.
1. Copy the **API key**.

### Trial accounts

1. Navigate to the **Settings** page.
1. Go to **App Settings** > **API Key Management**.
1. Click **Add New API Key**.
1. Enter a name for the API key and select the access rights to give to this API key. You can regenerate the shown API key *before saving*, if you would like to.
1. Click **Add API Key** to save the new API key.

:::info
The main purpose of usage for these API keys is configuration based API requests. They can be used for configuration actions, *List Teams, List Users, Get Team*.
:::

To run the other actions, you need to have an API from **Team Integrations**:

1. Navigate to the **Teams** page.
1. Click on the team you want to integrate with.
1. Go to **Integrations**
1. Click on **Add Integration**.
1. Select **API**.
1. Enter a name **Integration Name** and **Assign the Team**.
1. Click **Continue**.
1. Copy the **API key**.
1. Click **Turn On Integration**.

:::warning
Please keep in mind that the API keys of the team integrations can only be used for the alerts/incidents of the specific team and the team-based configurations, whereas the API keys of the global integrations can be used for all of the API requests, including account-based configurations.
:::

## Change Log

* March 22, 2024 - First upload
* July 11, 2024 - Added the Actions:
    + Get On Calls
    + List Schedules
* Sep 16, 2024 - Update the Action:
    + Create Incident - Fixed the bug that caused the action not to add responders to the incident.

