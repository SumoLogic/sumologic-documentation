---
id: sailpoint
title: SailPoint
sidebar_label: SailPoint
description: The Sumo Logic app for SailPoint helps you monitor the user events, actions, operations, failed logins, successful logins, and user activities to your applications through SailPoint.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/sailpoint-logo.svg')} alt="SailPoint logo" width="100"/>

SailPoint is an identity management solution that helps organizations manage employee permissions, digital identities, information security, data access, and compliance. The Sumo Logic app for SailPoint provides comprehensive visibility into identity governance and administration activities, including authentication events, access requests, provisioning operations, identity lifecycle changes, privileged access monitoring, source health, and workflow automation.

## Log types

The SailPoint Source ingests:

* Events from the [Search API Endpoint](https://developer.sailpoint.com/idn/api/v3/search).
* Users Inventory data from the [Public Identities API Endpoint](https://developer.sailpoint.com/idn/api/v3/get-public-identities).

### Sample log messages

```json
{
	"org":"sp-ITgrp",
	"pod":"stg02-useast1",
	"created":"2022-10-05T11:52:42.119Z",
	"id":"aa138dc5c4c8dbfdbdb68336ac89730cb9531a0e5bfec876af6630a6f12e4a2e",
	"action":"update",
	"type":"WORKFLOW",
	"actor":"▶"{
		"..."
	},
	"target":"▶"{
		"..."
	},
	"stack":"tpe",
	"trackingNumber":"8e2b88914f2d4ffea13c541daeb57952",
	"attributes":"▶"{
		"..."
	},
	"objects":"▶"[
		"..."
	],
	"operation":"UPDATE",
	"status":"PASSED",
	"technicalName":"TASK_SCHEDULE_UPDATE_PASSED",
	"name":"Update Task Schedule Passed",
	"synced":"2022-10-05T11:52:42.119Z",
	"_type":"event",
	"_version":"v7"
}
```

```json
{
	"org":"sp-solgrp",
	"pod":"stg02-useast1",
	"created":"2022-10-05T11:43:02.214Z",
	"id":"e554182b1186adbd0e6183701a39c534dc434dce218822dc4817090ddaac2c4c",
	"action":"AUTHENTICATION-103",
	"type":"AUTH",
	"actor":"▶"{
		"..."
	},
	"target":"▶"{
		"..."
	},
	"stack":"oathkeeper",
	"trackingNumber":"5624c8b0a8a843adbd979d5de12e3723",
	"ipAddress":"177.53.184.122",
	"details":"5624c8b0a8a843adbd979d5de12e3723",
	"attributes":"▶"{
		"..."
	},
	"objects":"▶"[
		"..."
	],
	"operation":"REQUEST",
	"status":"PASSED",
	"technicalName":"AUTHENTICATION_REQUEST_PASSED",
	"name":"Request Authentication Passed",
	"synced":"2022-10-05T11:43:02.214Z",
	"_type":"event",
	"_version":"v7"
}
```

### Sample queries

```sumo title="Authentication Event"
_sourceCategory=Labs/sailpoint ipAddress
| json field=_raw "created", "type", "technicalName", "status","operation","actor.name", "action", "name", "target.name", "attributes.sourceName" as created, event_type, technical_name_in_search, event_status, operation, user_name, action, event_desc, target_name, source_name
| json "org" as org
| where technical_name_in_search = "AUTHENTICATION_REQUEST_PASSED"
| json field=_raw "ipAddress" as client_ip
| lookup latitude, longitude, country_code, country_name, region, city, postal_code from geo://location on ip = client_ip
| where country_name matches "*" and city matches "*"
| count by latitude, longitude, country_code, country_name, region, city, postal_code
| sort _count
```

```sumo title="SailPoint Event Type"
_sourceCategory=Labs/sailpoint
| json field=_raw "created", "type", "technicalName", "status","operation","actor.name", "action", "name", "target.name", "attributes.sourceName" as created, event_type, technical_name_in_search, event_status, operation, user_name, action, event_desc, target_name, source_name | json "org" as org
| count by event_type
| sort by _count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for SailPoint](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your SailPoint app is properly integrated and configured to collect and analyze your SailPoint data.
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

## Viewing SailPoint dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **SailPoint - Overview** dashboard provides a high-level operational view of SailPoint activity including total event volume, event type distribution, operation breakdown, trends, geolocation of events, and recent event history for rapid situational awareness.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Overview.png')} alt="overview"/>

### Security

The **SailPoint - Security** dashboard highlights critical security signals including source deletions, identity deletions, bulk account removals, admin configuration changes, and high-risk events that may indicate unauthorized access or insider threats.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Security.png')} alt="SailPoint - Security"/>

### Failed authentication events

The **SailPoint - Failed Authentication Events** dashboard provides focused analysis of failed login activity by user, source, and location, with geo maps, outlier detection, and trend comparisons to identify brute-force attacks and anomalies.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Failed-Authentication-Events.png')} alt="SailPoint - Failed Authentication Events"/>

### Successful authentication events

The **SailPoint - Successful Authentication Events** dashboard provides analysis of successful login events by user, source, and location, with geo maps and trends to validate expected access behavior.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Successful-Authentication-Events.png')} alt="SailPoint - Successful Authentication Events"/>

### Identity inventory

The **SailPoint - Identity Inventory** dashboard provides visibility into the identity population including status distribution, identity state breakdown, manager relationships, department and company breakdown, and governance anomalies like inactive identities with active state or missing managers.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Identity-Inventory.png')} alt="SailPoint - Identity Inventory"/>

### Identity lifecycle and governance

The **SailPoint - Identity Lifecycle and Governance** dashboard monitors identity lifecycle state changes, certification campaigns, access reviews, and governance events to help ensure compliance and proper identity management.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Identity-Lifecycle-and-Governance.png')} alt="SailPoint - Identity Lifecycle and Governance"/>

### Access items

The **SailPoint - Access Items** dashboard provides visibility into entitlement and role event breakdowns, trends, and summaries to monitor access item changes across identities.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Access-Items.png')} alt="SailPoint - Access Items"/>

### Access requests and provisioning

The **SailPoint - Access Requests & Provisioning** dashboard monitors access request lifecycle including approvals, denials, provisioning successes and failures, entitlement changes, role assignments, and account modifications.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Access-Requests-&-Provisioning.png')} alt="SailPoint - Access Requests and Provisioning"/>

### Privileged access and token activity

The **SailPoint - Privileged Access & Token Activity** dashboard monitors personal access token usage, capability grants, admin configuration changes, secret modifications, and other privileged operations that may indicate insider threats or compromised credentials.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Privileged-Access-&-Token-Activity.png')} alt="SailPoint - Privileged Access and Token Activity"/>

### Source health and configuration

The **SailPoint - Source Health & Configuration** dashboard monitors source account aggregation health, connection test results, configuration changes, and source lifecycle events to help ensure identity data collection operates reliably.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Source-Health-&-Configuration.png')} alt="SailPoint - Source Health and Configuration"/>

### Workflow and automation

The **SailPoint - Workflow & Automation** dashboard tracks workflow executions, automation triggers, launcher activity, and workflow failures to monitor the health and effectiveness of automated governance processes.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Workflow-&-Automation.png')} alt="SailPoint - Workflow and Automation"/>

## Create monitors for the SailPoint app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### SailPoint app alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `SailPoint - Brute Force Detection (>5 Failed Authentications)` | This alert is triggered when a user exceeds five failed authentication attempts. This may indicate brute-force activity, credential stuffing, or unauthorized access attempts against SailPoint accounts. | Count > 5 | Count <= 5 |
| `SailPoint - Bulk Account Removals` | This alert is triggered when a large number of account removals occur within a short period. This may indicate unauthorized mass deprovisioning, insider threats, or compromised admin credentials used to remove access at scale. | Count > 0 | Count <= 0 |
| `SailPoint - Events from Embargoed Locations` | This alert is triggered when SailPoint activity is observed from embargoed or high-risk countries. | Count > 0 | Count <= 0 |
| `SailPoint - Identity Uncorrelation Events` | This alert is triggered when an identity uncorrelation event is detected in SailPoint. This may indicate unauthorized account detachment, insider threat activity, or administrative changes that could weaken identity governance controls. | Count > 0 | Count <= 0 |
| `SailPoint - Personal Access Token Usage Spike` | This alert is triggered when an unusual spike in personal access token usage is detected. This may indicate compromised API tokens, automated attacks using stolen credentials, or insider misuse of programmatic access. | Count > 2 | Count <= 2 |
| `SailPoint - Source Deletion Events` | This alert is triggered when an identity source is deleted from SailPoint. This may indicate data sabotage, insider threat activity, or unauthorized administrative changes that could disrupt identity governance. | Count > 0 | Count <= 0 |

## Upgrade/Downgrade the SailPoint app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the SailPoint app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>