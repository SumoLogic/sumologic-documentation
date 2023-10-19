---
id: audit-event-index
title: Cloud SOAR Audit Logging
sidebar_label: Audit Logging
description: Learn how to search the Audit Event Index for Cloud SOAR log events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Audit Event Index** provides event logs in JSON format on your account activity allowing you to monitor and audit changes. 
By default, the Audit Event Index is enabled for Cloud SOAR and Enterprise accounts.

<!--
// Uncomment this part as soon as it is available.

## Documentation

All available audited events are documented for your reference. This documentation is hosted on each deployment, instead of on this document. Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security") if you are unsure.

Select the documentation link for your deployment:

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs/csoar  |
| CA | https://service.ca.sumologic.com/audit/docs/csoar  |
| DE | https://service.de.sumologic.com/audit/docs/csoar  |
| EU | https://service.eu.sumologic.com/audit/docs/csoar  |
| FED | https://service.fed.sumologic.com/audit/docs/csoar |
| IN | https://service.in.sumologic.com/audit/docs/csoar  |
| JP | https://service.jp.sumologic.com/audit/docs/csoar  |
| US1 | https://service.sumologic.com/audit/docs/csoar     |
| US2 | https://service.us2.sumologic.com/audit/docs/csoar |
-->

## Search the Audit Event Index

Searching the Audit Event Index is the same as running a normal search against your ingested data. 
You specify the `_index` metadata field with one of these values: 

* `sumologic_audit_events`. This index contains user action events, which are events that were triggered by a user action, either from the UI or an API.
* `sumologic_system_events`. This index contains system action events, which are events that were triggered by Sumo Logic, for example, Automation Actions start events, rules triggered, and so on.

## Cloud SOAR Audited events

This Audit Event Index has detailed JSON logs for the following features. 
To search for audit events for a specific feature use the metadata field `_sourceCategory` with its corresponding value. 

For Cloud SOAR events, every `_sourceCategory` related to a feature has the prefix `oar`, so to limit the events returned to Cloud SOAR only, you can use:

```sql
(_index=sumologic_audit_events OR _index=sumologic_system_events) _sourceCategory=oar*
```

To search user action events for Tasks, you would use the query:

```sql
_index=sumologic_audit_events _sourceCategory=oarTasks
```

To search for system action events for Automation Actions, you would use the query:

```sql
_index=sumologic_system_events _sourceCategory=oarAutomationActions
```

The table below shows the `_sourceCategory` that is assigned to event logs by Cloud SOAR feature.

{@import ./audit-event-index-table.md}

## _sourceName and _sourceHost assignment

The `_sourceName` and `_sourceHost` fields are assigned to audit event
logs as follows.

| Metadata Field | Assignment Description |
|:--|:--|
| `_sourceName` | Value of the common parameter, `eventName`. |
| `_sourceHost` | The remote IP address of the host that made the request. If not available the value will be `no_sourceHost`. |

## Common parameters

Each audit event log has common keys that categorize it to a product
area and provide details of the event.

| Parameter | Description | Data Type |
|:--|:--|:--|
| `accountId` | The unique identifier of the organization. | String |
| `eventId` | The unique identifier of the event. | String |
| `eventName` | The name of the event. | String |
| `eventTime` | The event timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. | String |
| `eventFormatVersion` | The event log format version. | String |
| `operator` | Information of who did the operation. If it's missing, the Sumo service was the operator. | JSON object of Strings |
| `subsystem` | The product area of the event. | String |

## Search the Audit Event Index for Cloud SOAR events

To search the Audit Event Index for logs that describe Cloud SOAR events:

1. Open a search tab in the Sumo Logic UI by clicking **+ New** and choosing **Log Search**.

   ![new log search UI buttons.png](/img/search/get-started-search/search-basics/new-log-search-UI-buttons.png)

1. In the search tab, enter a search using `_index` to specify the partition you want to search, and other metadata or fields to further scope your search. For example:
    ```sql
    (_index=sumologic_system_events or _index=sumologic_audit_events) _sourceCategory=oar*
    | where subsystem contains "Playbook"
    ```
3. Choose the time range for your search.
4. Click **Start** to run the search.

## Example event log

Here is an example `PlaybookExecutionStarted` event log.

```json
{
   "accountId": "0000000000000131",
   "eventId": "f002327d-4934-4499-9543-132ec10f3db3",
   "subsystem": "oarPlaybookExecutions",
   "eventName": "PlaybookExecutionStarted",
   "eventTime": "2023-10-05T13:22:59.786+00:00Z",
   "eventFormatVersion": "1.0 beta",
   "severityLevel": "Info",
   "PlaybookExecutionIdentity": {
      "playbook_id": "651eb64eab7e66e25c766ad8",
      "playbook_name": "Application Latency Playbook",
      "running_id": "651eb8b386c1039545766d9c"
   },
   "PlaybookExecution": {
      "playbook_id": "651eb64eab7e66e25c766ad8",
      "playbook_name": "Application Latency Playbook",
      "type": "Denial of Service",
      "running_id": "651eb8b386c1039545766d9c",
      "status": "Running",
      "start": "2023-10-05T13:22:59.641+00:00Z",
      "externalType": "INSIGHT",
      "externalId": "INSIGHT-4332"
   },
   "from": {
      "status": "Not executed"
   },
   "to": {
      "status": "Running"
   }
}
```

## Index retention period 

By default, the retention period of the Audit Event Index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partitions, `sumologic_audit_events` and `sumologic_system_events`. For more information, see [Create and Edit a Partition](/docs/manage/partitions-data-tiers/create-edit-partition).  
   
 
