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

The **System Event Index** contains event logs in JSON format on system activities triggered by Sumo Logic, for example, throttling events, rules triggered, and so on. Examining system events allows you to monitor and audit system changes. Enterprise accounts have the System Event Index enabled and available to search by default. 

This index is separate from the [Audit Event Index](/docs/manage/security/audit-indexes/audit-index), which shows user action events rather than events triggered by Sumo Logic. 

## Documentation 

All available system events are documented for your reference. This documentation is hosted on each deployment, instead of on this document. Select the documentation link for your deployment.  Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security") if you are unsure.

:::important
To see documentation for system events, in the left margin of the documentation scroll down to the **SUMOLOGIC_SYSTEM_EVENTS** section.
:::

### General audit log documentation

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs |
| CA | https://service.ca.sumologic.com/audit/docs |
| DE | https://service.de.sumologic.com/audit/docs |
| EU | https://service.eu.sumologic.com/audit/docs |
| FED | https://service.fed.sumologic.com/audit/docs |
| IN | https://service.in.sumologic.com/audit/docs |
| JP | https://service.jp.sumologic.com/audit/docs |
| US1 | https://service.sumologic.com/audit/docs |
| US2 | https://service.us2.sumologic.com/audit/docs |

### Cloud SIEM audit log documentation

For more information, see [Cloud SIEM Audit Logging](/docs/cse/administration/cse-audit-logging/).

| Deployment | Location | Documentation URL |
|:--|:--|:--|
| AU | Australia |https://service.au.sumologic.com/audit/docs/sec |
| JP | Japan |https://service.jp.sumologic.com/audit/docs/sec |
| IN | India |https://service.in.sumologic.com/audit/docs/sec |
| US1 | United States |https://service.sumologic.com/audit/docs/sec |
| US2 | United States |https://service.us2.sumologic.com/audit/docs/sec |

### Automation Service and Cloud SOAR audit log documentation

For more information, see [Audit Logging for the Automation Service](/docs/platform-services/automation-service/automation-service-audit-logging/) and [Cloud SOAR Audit Logging](/docs/cloud-soar/audit-event-index/).

:::note
Audit logging for the Automation Service uses the same logging as Cloud SOAR, since the Automation Service is based on core functionality in Cloud SOAR. 
:::

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs/csoar |
| CA | https://service.ca.sumologic.com/audit/docs/csoar |
| DE | https://service.de.sumologic.com/audit/docs/csoar |
| EU | https://service.eu.sumologic.com/audit/docs/csoar |
| IN | https://service.in.sumologic.com/audit/docs/csoar |
| JP | https://service.jp.sumologic.com/audit/docs/csoar |
| US1 | https://service.sumologic.com/audit/docs/csoar |
| US2 | https://service.us2.sumologic.com/audit/docs/csoar |

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

| Product Feature | _sourceCategory Value  |
| :-- | :-- |
| [Alerts](/docs/alerts/monitors/alert-response) | `alerts` |
| [Apps](/docs/integrations/) | `apps` |
| [Automation Service actions](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook) and [Cloud SOAR actions](/docs/cloud-soar/automation/#action) | `oarAutomationActions` |
| [Automation Service playbook executions](/docs/platform-services/automation-service/automation-service-playbooks) and [Cloud SOAR playbook executions](/docs/cloud-soar/automation/#playbook-execution) | `oarPlaybookExecutions` |
| [Automation Service tasks](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-task-node-to-a-playbook) and [Cloud SOAR tasks](/docs/cloud-soar/automation/#task) | `oarTasks` |
| [Cloud SIEM automation](/docs/cse/automation/) | `cseAutomation` |
| [Cloud SIEM Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) | `cseInsight` |
| [Cloud SIEM log mapping](/docs/cse/schema/create-structured-log-mapping/) | `cseLogMapping` |
| [Cloud SIEM Mitre Att&ck Threat Coverage](/docs/cse/administration/mitre-coverage/) | `cseMitreAttackCoverage` |
| [Cloud SIEM rules](/docs/cse/rules/) | `cseRule` |
| [Cloud SIEM threat intel source](/docs/cse/administration/create-custom-threat-intel-source/) | `cseThreatIntelSource` |
| [Cloud SIEM Yara rules](/docs/cse/rules/import-yara-rules/) | `cseYara` | 
| [Cloud SOAR action configuration](/docs/cloud-soar/automation/#action) | `oarAutomationActionConfigurations` |
| [Cloud SOAR entities](/docs/cloud-soar/incidents-triage/#entities) | `oarEntities` |
| [Cloud SOAR incidents](/docs/cloud-soar/incidents-triage/#working-with-incidents) | `oarIncidents` |
| [Cloud SOAR integrations](/docs/cloud-soar/automation/#integrations) | `oarIntegrations` |
| [Cloud SOAR playbook revisions](/docs/cloud-soar/automation/#playbook) | `oarPlaybookRevisions` |
| [Cloud SOAR reports](/docs/cloud-soar/incidents-triage/#report) | `oarReports` |
| [Cloud SOAR triage](/docs/cloud-soar/incidents-triage/#triage) | `oarTriage` |
| [Cloud SOAR triggers](/docs/cloud-soar/cloud-soar-integration-framework/#trigger-action-definitions) | `oarTriggers` |
| [Monitors](/docs/alerts/monitors) | `monitors` |
| [Tracing Ingest](/docs/apm/traces/tracing-ingest) | `tracingIngest` |

When performing create, update, and delete requests through Sumo Logic APIs, you can find the API accessID within the operator field of your related System Event Index messages.

## Metadata assignment

[Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields are assigned to system event logs as follows:

| Metadata Field | Assignment Description |
| :-- | :-- |
| _sourceCategory   | Value of the [common parameter](#common-parameters), `subsystem`. |
| _sourceName | Value of the [common parameter](#common-parameters), `eventName`. |
| _sourceHost | The remote IP address of the host that made the request. If not available the value will be `no_sourceHost`. |

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
    "content": {
        "type": "search",
        "name": "this search should be packaged NHAXoOdq80o1ZKZ",
        "description": "savedSearch"
    },
    "operator": {
        "email": "searchservice_test@demo.com",
        "id": "0000000002F2438D",
        "interface": "UI",
        "sessionId": "go42n37za657ck0i3t4368",
        "sourceIp": "50.18.133.252",
        "type": "UserContext"
    },
    "contentIdentity": {
        "type": "search",
        "contentId": "0000000009B2636B",
        "externalId": "000000000BFB73FE",
        "name": "this search should be packaged NHAXoOdq80o1ZKZ"
    },
    "adminMode": false,
    "accountId": "0000000000000131",
    "eventId": "0234cc63-333c-4585-a78f-08517e5f9fd7",
    "eventName": "ContentCreated",
    "eventTime": "2018-12-11T21:37:33.950Z",
    "eventFormatVersion": "1.0 beta",
    "subsystem": "content"
}
```

## Index retention period

By default, the retention period of the System index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partition `sumologic_system_events`. For more information, see [Edit a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).
