---
id: system-event-index
title: System Event Index
description: The System Event Index provides event logs in JSON on your organization's system activities allowing you to monitor and audit changes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


## Availability

| Account Type | Account Level |
|:--|:--|
| Cloud Flex | Trial, Enterprise |
| Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

The System Event Index contains event logs in JSON format on system activities triggered by Sumo Logic, for example, throttling events, rules triggered, and so on. Examining system events allows you to monitor and audit system changes. Enterprise accounts have the System Event Index enabled and available to search by default. 

This index is separate from the [Audit Event Index](/docs/manage/security/audit-indexes/audit-index), which shows user action events rather than events triggered by Sumo Logic. 

## Documentation 

All available system events are documented for your reference. See [Documentation for Audit Log Definitions](/docs/manage/security/audit-indexes/documentation-audit-log-definitions/).

:::important
To see documentation for system events, when you access the Audit Log Definitions, in the left margin scroll down to the **SUMOLOGIC_SYSTEM_EVENTS** section. 
:::

## Search the System Event Index

Searching the System Event Index is the same as running a normal search against your ingested data. You specify the `_index` metadata field with `sumologic_system_events`. 

For example, to search for system events:

1. In the Search page, enter the following: `_index=sumologic_system_events`  
     :::important
     Make sure to enter the query exactly as shown. Changing any part of the query renders it ineffective.
     :::
1. Choose the time range for the events that you'd like to review.
1. Click **Start** to run the search.

## Audited events

The System Event Index has detailed JSON logs for the following features. To search for system events for a specific feature use the metadata field `_sourceCategory` with its corresponding value. For example, to search system events for alerts you would use the query:

```sql
_index=sumologic_system_events _sourceCategory=alerts
```

| Product feature | _sourceCategory value  |
| :-- | :-- |
| [Alerts](/docs/alerts/monitors/alert-response) | `alerts` |
| [Apps](/docs/integrations/) | `apps` |
| [Automation Service and Cloud SOAR](/docs/platform-services/automation-service/automation-service-audit-logging/) | `oar*` |
| [Cloud SIEM](/docs/cse/administration/cse-audit-logging/) | `cse*` |
| [Fields](/docs/manage/fields) | `fieldManagement` |
| [Health Events](/docs/manage/health-events/) | `Collection` |
| [Monitors](/docs/alerts/monitors) | `monitors` |
| [Tracing Ingest](/docs/apm/traces/tracing-ingest) | `tracingIngest` |

When performing create, update, and delete requests through Sumo Logic APIs, you can find the API accessID within the operator field of your related System Event Index messages.

## Metadata assignment

[Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields are assigned to system event logs as follows:

| Metadata Field | Assignment Description |
| :-- | :-- |
| _sourceCategory   | Value of the [common parameter](#common-parameters), `subsystem`. |
| _sourceHost | The remote IP address of the host that made the request. If not available the value will be `no_sourceHost`. |
| _sourceName | Value of the [common parameter](#common-parameters), `eventName`. |

## Common parameters

Each system event log has common keys that categorize it to a product area and provide details of the event.

| Parameter | Description | Data Type |
| :-- | :-- | :-- |
| accountId | The unique identifier of the organization. | String |
| eventId | The unique identifier of the event. | String |
| eventName | The name of the event. | String |
| eventTime | The event timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. | String |
| eventFormatVersion | The event log format version. | String |
| operator | Information of who did the operation. If its missing, the Sumo service was the operator. | JSON object of Strings |
| subsystem | The product area of the event. | String |

```json
{
   severityLevel: "Info",
   details: {
             alertUpdateTime: "2024-07-16T14:46:57.739Z",
             isMuted: false,
             monitorInfo: {
                           monitorId: "0000000000574434",
                           monitorName: "Kubernetes - Container Waiting (Crashloopbackoff)",
                           monitorPath: "/Monitor/Kubernetes - Container Waiting (Crashloopbackoff)",
                           triggerGranularity: "OnePerMonitor"
                           },
             queryStartTime: "2024-07-16T14:40:57.210Z",
             queryEndTime: "2024-07-16T14:45:57.210Z",
             alertingGroup: {
                           groupKey:"",
                           timeSeriesKey: "container=the-coffee-machine pod=coffee-bar-k8demostaging001-coffeemachine-7566c7dd97-tzxkz cluster=k8sdemo-staging metric=sum namespace=k8demostaging001 ",
                           previousState: "Warning",
                           currentState: "Normal",
                           triggerValue: 1
                            },
             tags:{ },
             name: "AlertUpdated"
            },
   eventType: "System",
   accountId: "00000000009B3BEC",
   eventId: "c5d49a6e-cd95-48b9-b88b-a1a3d0d7a8c1",
   eventName: "AlertSystemInfo",
   eventTime: "2024-07-16T14:46:57.739Z",
   eventFormatVersion: "1.0 beta",
   subsystem: "alerts",
   resourceIdentity: {
                      id: "0000000000A74A83",
                      name: "Kubernetes - Container Waiting (Crashloopbackoff)",
                      type: "Alert"
                     }
}
```

## Index retention period

By default, the retention period of the System index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partition `sumologic_system_events`. For more information, see [Edit a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).
