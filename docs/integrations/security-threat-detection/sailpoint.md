---
id: sailpoint
title: Sumo Logic App for SailPoint
sidebar_label: SailPoint
description: Install the Sumo Logic app for SailPoint.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

SailPoint is an identity management solution that helps organizations manage employee permissions, digital identities, information security, data access, and compliance. The Sumo Logic App for SailPoint helps you monitor the user events, actions, operations, failed logins, successful logins, and user activities to your applications through SailPoint. The App consists of dashboards that give you visibility into the source deletion, user events, and geo locations of authentication events.

## Log types

The SailPoint Source ingests:

* Events from the [Search API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/search).
* Users Inventory data from the [Public Identities API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/getPublicIdentities).


### Sample Log Messages

```
{
org:"sp-ITgrp",
pod:"stg02-useast1",
created:"2022-10-05T11:52:42.119Z",
id:"aa138dc5c4c8dbfdbdb68336ac89730cb9531a0e5bfec876af6630a6f12e4a2e",
action:"update",
type:"WORKFLOW",
actor:
▶{...},
target:
▶{...},
stack:"tpe",
trackingNumber:"8e2b88914f2d4ffea13c541daeb57952",
attributes:
▶{...},
objects:
▶[...],
operation:"UPDATE",
status:"PASSED",
technicalName:"TASK_SCHEDULE_UPDATE_PASSED",
name:"Update Task Schedule Passed",
synced:"2022-10-05T11:52:42.119Z",
_type:"event",
_version:"v7"
}
```



```
{
org:"sp-solgrp",
pod:"stg02-useast1",
created:"2022-10-05T11:43:02.214Z",
id:"e554182b1186adbd0e6183701a39c534dc434dce218822dc4817090ddaac2c4c",
action:"AUTHENTICATION-103",
type:"AUTH",
actor:
▶{...},
target:
▶{...},
stack:"oathkeeper",
trackingNumber:"5624c8b0a8a843adbd979d5de12e3723",
ipAddress:"177.53.184.122",
details:"5624c8b0a8a843adbd979d5de12e3723",
attributes:
▶{...},
objects:
▶[...],
operation:"REQUEST",
status:"PASSED",
technicalName:"AUTHENTICATION_REQUEST_PASSED",
name:"Request Authentication Passed",
synced:"2022-10-05T11:43:02.214Z",
_type:"event",
_version:"v7"
}
```



### Sample Queries

Authentication Event


```sql
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


SailPoint Event Type


```sql
_sourceCategory=Labs/sailpoint
| json field=_raw "created", "type", "technicalName", "status","operation","actor.name", "action", "name", "target.name", "attributes.sourceName" as created, event_type, technical_name_in_search, event_status, operation, user_name, action, event_desc, target_name, source_name | json "org" as org
| count by event_type
| sort by _count
```

## Set up collection

Follow the instructions for setting up [Cloud to Cloud Integration for SailPoint App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source) to create the source and use the same source category while installing the app.


## Installing the App

This section demonstrates how to install the SailPoint App.

Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.


1. From the App Catalog, search for and select the app.
2. Select the version of the service you're using and click Add to Library. Version selection is applicable only to a few apps currently. For more information, see [Install the Apps from the Library](/docs/get-started/apps-integrations.md/#install-apps-from-the-library)
3. To install the app, complete the following fields.
    1. App Name. You can retain the existing name, or enter a name of your choice for the app. 
    2. Data Source. Select either of these options for the data source. 
        * Choose Source Category, and select a source category from the list. 
        * Choose Enter a Custom Data Filter, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. Advanced. Select the Location in Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
4. Click Add to Library.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing SailPoint Dashboards


### SailPoint - Overview

This dashboard provides a summary of SailPoint events, actions, operations, event trend analysis, and a summary table for all user events.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Overview.png')} alt="overview"/>


### SailPoint - Successful Authentications

This dashboard provides the details of success logins such as the geolocation, country, state, failed login trends, outlier, and top 10 users.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Successful-Authentications.png')} alt="Successful-Authentications"/>


### SailPoint - Failed Authentications

This dashboard shows the details of failed logins such as the geolocation, country, state, failed login trends, outlier, and top 10 users.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Failed-Authentications.png')} alt="Failed-Authentications"/>

### SailPoint - Security

This dashboard provides a summary of source deletion events in source management operations.

<img src={useBaseUrl('img/integrations/security-threat-detection/SailPoint-Security.png')} alt="security"/>
