---
id: sailpoint
title: SailPoint
sidebar_label: SailPoint
description: The Sumo Logic App for SailPoint helps you monitor the user events, actions, operations, failed logins, successful logins, and user activities to your applications through SailPoint.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/sailpoint-logo.svg')} />

SailPoint is an identity management solution that helps organizations manage employee permissions, digital identities, information security, data access, and compliance. The Sumo Logic App for SailPoint helps you monitor the user events, actions, operations, failed logins, successful logins, and user activities to your applications through SailPoint. The App consists of dashboards that give you visibility into the source deletion, user events, and geo locations of authentication events.

## Log types

The SailPoint Source ingests:

* Events from the [Search API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/search).
* Users Inventory data from the [Public Identities API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/getPublicIdentities).


### Sample Log Messages

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

### Sample Queries

```sql title="Authentication Event"
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


```sql title="SailPoint Event Type"
_sourceCategory=Labs/sailpoint
| json field=_raw "created", "type", "technicalName", "status","operation","actor.name", "action", "name", "target.name", "attributes.sourceName" as created, event_type, technical_name_in_search, event_status, operation, user_name, action, event_desc, target_name, source_name | json "org" as org
| count by event_type
| sort by _count
```

## Set up collection

Follow the instructions for setting up [Cloud to Cloud Integration for SailPoint App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source) to create the source and use the same source category while installing the app.


## Installing the SailPoint App

This section demonstrates how to install the SailPoint App.

{@import ../../reuse/app-install.md}


## Viewing SailPoint Dashboards

### Overview

The **SailPoint - Overview** dashboard provides a summary of SailPoint events, actions, operations, event trend analysis, and a summary table for all user events.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Overview.png')} alt="overview"/>


### Successful Authentications

The **SailPoint - Successful Authentications** dashboard provides the details of success logins such as the geolocation, country, state, failed login trends, outlier, and top 10 users.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Successful-Authentications.png')} alt="Successful-Authentications"/>


### Failed Authentications

The **SailPoint - Failed Authentications** dashboard shows the details of failed logins such as the geolocation, country, state, failed login trends, outlier, and top 10 users.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Failed-Authentications.png')} alt="Failed-Authentications"/>

### Security

The **SailPoint - Security** dashboard provides a summary of source deletion events in source management operations.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Security.png')} alt="security"/>
