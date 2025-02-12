---
id: trust-login
title: Trust Login
sidebar_label: Trust Login
description: The Trust Login app for Sumo Logic provides security analysts with an overview of the authentication events, user activities, and potential security threats.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/trust-login-icon.png')} alt="Trust-Login-icon" width="50" />

The Sumo Logic app for Trust Login assists security analysts in monitoring authentication events, user activities, and potential security threats. It tracks login attempts, account changes, and policy updates in real-time to detect anomalies. The Trust Login dashboard offers insights into event breakdowns, trends, and time-based comparisons for faster incident response and investigations. The geo-location metrics identify login attempts from high-risk regions, improving threat detection, and the alert mechanism highlights unusual activities, like suspicious logins and geo-location events, enabling proactive threat mitigation. By centralizing security insights, the app improves visibility, streamlines investigations, and strengthens security.

:::info
This app includes [built-in monitors](#trust-login-alerts). For details on creating custom monitors, refer to the [Create monitors for Trust Login app](#create-monitors-for-the-trust-login-app).
:::

## Log types

This app uses Sumo Logic’s [Trust Login Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/trust-login-source/) to collect incidents and events logs from the Trust Login platform.

## Sample log message

```json title="Report Log"
{
    "id": "eb764e67-a338-481b-b57a-8f51461463ca",
    "created_at": "2024-07-23T01:14:11.376+09:00",
    "updated_at": "0001-01-01T00:00:00Z",
    "tenant_id": "a4992f54-808d-4959-8d31-52b20d415f51",
    "subject": {
        "id": "b1a4aec3-45d6-49dc-9e8f-c0954ebdffd9",
        "type": "user",
        "data": {
            "email": "qa6@junqa2022.com",
            "first_name": "",
            "full_name": "6 qa",
            "ip_address": null,
            "last_name": ""
        }
    },
    "objects": [
        {
            "id": "b1a4aec3-45d6-49dc-9e8f-c0954ebdffd9",
            "type": "Membership",
            "data": {
                "email": "qa6@junqa2022.com",
                "first_name": "qa",
                "last_name": "6"
            }
        }
    ],
    "event": {
        "type": "suspended",
        "context_data": {
            "log_msg": "qa6@junqa2022.com"
        },
        "category": "general",
        "producer": "portal"
    }
}
```
    
## Sample queries

```sql title="Events by Category"
_sourceCategory=TrustLoginAppTest
| json "id", "event.type", "event.category", "event.producer", "subject.type", "objects", "subject.data.full_name", "subject.data.ip_address", "created_at", "event.context_data.log_msg", "subject.data.email", "subject.id", "subject.data.first_name", "subject.data.last_name" as event_id, event_type, event_category, event_producer, subject_type, objects, subject_full_name, subject_ip_address, created_at, event_msg, subject_email, subject_id, subject_first_name, subject_last_name nodrop
| parse regex field=objects "(?<objects>\{(?:[^\{\}]|\{[^\{\}]*\})*\})" multi
| json field=objects "type", "data.email" as object_type, object_email nodrop

// global filters
| where event_category matches "{{event_category}}"
| where event_producer matches "{{event_producer}}"
| where event_type matches "{{event_type}}"
| where object_type matches "{{object_type}}"
| where subject_type matches "{{subject_type}}"

| count by event_id, event_category
| count by event_category
| sort by _count, event_category
```

```sql title="Events Over Time by Type"
_sourceCategory=TrustLoginAppTest
| json "id", "event.type", "event.category", "event.producer", "subject.type", "objects", "subject.data.full_name" as event_id, event_type, event_category, event_producer, subject_type, objects, subject_full_name nodrop
| parse regex field=objects "(?<objects>\{(?:[^\{\}]|\{[^\{\}]*\})*\})" multi
| json field=objects "type" as object_type nodrop

// global filters
| where event_category matches "{{event_category}}"
| where event_producer matches "{{event_producer}}"
| where event_type matches "{{event_type}}"
| where object_type matches "{{object_type}}"
| where subject_type matches "{{subject_type}}"

| timeslice 1d
| count by event_id, event_type, _timeslice
| count as frequency by _timeslice, event_type
| fillmissing timeslice, values all in event_type
| transpose row _timeslice column event_type
```

```sql title="Top 10 User"
_sourceCategory=TrustLoginAppTest
| json "id", "event.type", "event.category", "event.producer", "subject.type", "objects", "subject.data.full_name" as event_id, event_type, event_category, event_producer, subject_type, objects, subject_full_name nodrop
| parse regex field=objects "(?<objects>\{(?:[^\{\}]|\{[^\{\}]*\})*\})" multi
| json field=objects "type" as object_type nodrop

// global filters
| where event_category matches "{{event_category}}"
| where event_producer matches "{{event_producer}}"
| where event_type matches "{{event_type}}"
| where object_type matches "{{object_type}}"
| where subject_type matches "{{subject_type}}"

| where !isBlank(subject_full_name)
| count by subject_full_name, event_id
| count as frequency by subject_full_name
| sort by frequency, subject_full_name
| limit 10
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Trust Login](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/trust-login-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Trust Login app is properly integrated and configured to collect and analyze your Trust Login data.
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

## Viewing the Trust Login dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Events Overview

The **Trust Login - Events Overview** dashboard provides a snapshot of the authentication events, user activities, and system changes. It includes visuals like event breakdowns, trends, and geo-location monitoring to detect suspicious behavior in your organization.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Trust+Login/Trust+Login+-+Events+Overview.png' alt="Trust-Login-Events-Overview" />

## Create monitors for the Trust Login app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Trust Login alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Unusual account status changes` | This alert is triggered when an unusual event is performed frequently. This alert helps detect potential security threats like account takeovers or insider threats. | Critical | Count > 3 |
| `Embargoed Geo Location of Events` | This alert is triggered when an event is detected from a location identified as high-risk. This alert helps you monitor activity from unusual or restricted geographic locations, enhancing your ability to identify suspicious activity. | Critical | Count > 0|

## Upgrading/Downgrading the Trust Login app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Trust Login app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
