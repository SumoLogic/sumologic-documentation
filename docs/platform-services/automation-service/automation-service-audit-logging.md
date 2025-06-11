---
id: automation-service-audit-logging
title: Audit Logging for the Automation Service and Cloud SOAR
sidebar_label: Audit Logging
description: Learn how to search the Audit Event Index for log events in the Automation Service and Cloud SOAR.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) and [System Event Index](/docs/manage/security/audit-indexes/system-event-index/) provide event logs in JSON format on your account activity allowing you to monitor and audit changes. By default, the Audit Event Index and System Event Index are enabled for the Automation Service and Cloud SOAR.

:::note
Audit logging for the Automation Service uses the same logging as Cloud SOAR, since the Automation Service is based on core functionality in Cloud SOAR. For more information about the shared functionality, see [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).
:::

## Where to find documentation

For documentation of the audit log definitions, see [Automation Service and Cloud SOAR audit log definitions](/docs/manage/security/audit-indexes/documentation-audit-log-definitions/#automation-service-and-cloud-soar-audit-log-definitions).

## Search for events

Searching the Audit Event Index and System Event Index is the same as running a normal search against your ingested data. You specify the `_index` metadata field with one of these values: 

* `sumologic_audit_events`. This index contains user action events, which are events that were triggered by a user action, either from the UI or an API.
* `sumologic_system_events`. This index contains system action events, which are events that were triggered by Sumo Logic. For example, this index contains Automation Actions start events, rules triggered, and so on.

To search for events:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Log Search**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs > Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.  
1. In the search tab, enter a search using `_index` to specify the partition you want to search, and other metadata or fields to further scope your search. For example:
    ```sql
    (_index=sumologic_audit_events or _index=sumologic_system_events) _sourceCategory=oar*
    | where subsystem contains "Playbook"
    ```
1. Choose the time range for your search.
1. Click **Start** to run the search.

## Audit Event Index events

The [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) has detailed JSON logs for the following Automation Service and Cloud SIEM features. 

:::important
For Audit Event Index documentation, see [Automation Service and Cloud SOAR audit log definitions](/docs/manage/security/audit-indexes/documentation-audit-log-definitions/#automation-service-and-cloud-soar-audit-log-definitions).
:::

To search for Audit Event Index events for a specific feature, use `_index=sumologic_audit_events` and enter the `_sourceCategory` for that feature. For example:

```sql
_index=sumologic_audit_events _sourceCategory=oarPlaybookExecutions
```

### Audit events for the Automation Service and Cloud SOAR

The table below shows the `_sourceCategory` that is assigned to Audit Event Index events for features that are in both the Automation Service and Cloud SOAR.

| Product Feature | _sourceCategory Value |
|:--|:--|
| [App Central packages](/docs/platform-services/automation-service/automation-service-app-central/)  | `oarAppCentralPackages`   |
| [Automation action](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook) | `oarAutomationActions`  |
| [Automation action configuration](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook) | `oarAutomationActionConfigurations` |
| [Integration](/docs/platform-services/automation-service/automation-service-integrations/)   | `oarIntegrations`  |
| [Integration resource](/docs/platform-services/automation-service/integration-framework/)   | `oarIntegrationResources` |
| [Playbook execution](/docs/platform-services/automation-service/automation-service-playbooks/)  | `oarPlaybookExecutions`   |
| [Playbook revision](/docs/platform-services/automation-service/automation-service-playbooks/)  | `oarPlaybookRevisions`    |

### Audit events for Cloud SOAR only

The table below shows the `_sourceCategory` that is assigned to Audit Event Index events for features that are only in Cloud SOAR.

| Product Feature | _sourceCategory Value |
|:--|:--|
| [Custom Field](/docs/cloud-soar/overview/#custom-fields) | `oarCustomFields`  |
| [Daemon](/docs/platform-services/automation-service/integration-framework/about-integration-framework/#daemon-action-definitions)  | `oarDaemons`  |
| [Dashboard](/docs/cloud-soar/incidents-triage/#dashboards)  | `oarDashboards` |
| Email | `oarEmails`  |
| [Entity](/docs/cloud-soar/incidents-triage/#entities)  | `oarEntities` |
| Folder  | `oarFolders`  |
| [Group](/docs/cloud-soar/overview/#groups)  | `oarGroups` |
| [Incident](/docs/cloud-soar/incidents-triage/#incidents)  | `oarIncidents`   |
| [Incident Artifact](/docs/cloud-soar/incidents-triage/#create-a-new-incident-manually) | `oarIncidentArtifacts`    |
| [Incident Attachment](/docs/cloud-soar/incidents-triage/#documentation-tab)  | `oarIncidentAttachments`  |
| [Incident Investigator](/docs/cloud-soar/incidents-triage/#add-investigators) | `oarIncidentInvestigators`  |
| [Incident Note](/docs/cloud-soar/incidents-triage/#notes)  | `oarIncidentNotes`  |
| [Incident Template](/docs/cloud-soar/automation/#incident-templates)  | `oarIncidentTemplates`    |
| [Notification](/docs/cloud-soar/overview/#notifications)  | `oarNotifications`|
| [Report](/docs/cloud-soar/incidents-triage/#report) | `oarReports` |
| [Setting](/docs/cloud-soar/overview/#settings) | `oarSettings`  |
| [Task](/docs/cloud-soar/incidents-triage/#tasks)  | `oarTasks`  |
| [Triage](/docs/cloud-soar/incidents-triage/#triage)  | `oarTriage` |
| [Triage Attachment](/docs/cloud-soar/incidents-triage/#triage)  | `oarTriageAttachments`  |
| [Triggers](/docs/cloud-soar/overview/#notifications) | `oarTriggers` |
| [Widget](/docs/cloud-soar/incidents-triage/#create-widgets)  | `oarWidgets`  |

## System Event Index events

The [System Event Index](/docs/manage/security/audit-indexes/system-event-index/) has detailed JSON logs for the following Automation Service and Cloud SIEM features. 

:::important
For System Event Index documentation, see [Automation Service and Cloud SOAR audit log definitions](/docs/manage/security/audit-indexes/documentation-audit-log-definitions/#automation-service-and-cloud-soar-audit-log-definitions). When you access the Cloud SOAR Audit Log Definition page, in the left margin scroll down to the **SUMOLOGIC_SYSTEM_EVENTS** section. 
:::

To search for System Event Index events for a specific feature, use `_index=sumologic_system_events` and enter the `_sourceCategory` for that feature. For example:

```sql
_index=sumologic_system_events _sourceCategory=oarAutomationActions
```

### System events for the Automation Service and Cloud SOAR

The table below shows the `_sourceCategory` that is assigned to System Event Index events for features that are in both the Automation Service and Cloud SOAR.

| Product Feature | _sourceCategory Value |
|:--|:--|
| [Automation action](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook) | `oarAutomationActions`  |
| [Playbook execution](/docs/platform-services/automation-service/automation-service-playbooks/)  | `oarPlaybookExecutions`   |


### System events for Cloud SOAR only

The table below shows the `_sourceCategory` that is assigned to System Event Index events for features that are only in Cloud SOAR.

| Product Feature | _sourceCategory Value |
|:--|:--|
| [Entity](/docs/cloud-soar/incidents-triage/#entities)  | `oarEntities` |
| [Investigators](/docs/cloud-soar/incidents-triage/#add-investigators) | `oarIncidentInvestigators` |
| [Incident](/docs/cloud-soar/incidents-triage/#incidents)  | `oarIncidents`   |
| [Triage](/docs/cloud-soar/incidents-triage/#triage)  | `oarTriage` |

## _sourceName and _sourceHost assignment

The `_sourceName` and `_sourceHost` fields are assigned to audit event logs as follows.

| Metadata Field | Assignment Description |
|:--|:--|
| `_sourceName` | Value of the common parameter, `eventName`. |
| `_sourceHost` | The remote IP address of the host that made the request. If not available, the value will be `no_sourceHost`. |

## Common parameters

Each audit event log has common keys that categorize it to a product area and provide details of the event.

| Parameter | Description | Data Type |
|:--|:--|:--|
| `accountId` | The unique identifier of the organization. | String |
| `eventId` | The unique identifier of the event. | String |
| `eventName` | The name of the event. | String |
| `eventTime` | The event timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. | String |
| `eventFormatVersion` | The event log format version. | String |
| `operator` | Information of who did the operation. If it's missing, the Sumo service was the operator. | JSON object of Strings |
| `subsystem` | The product area of the event. | String |

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

By default, the retention period of the Audit Event Index and System Event Index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partitions, `sumologic_audit_events` and `sumologic_system_events`. For more information, see [Create and Edit a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).  
