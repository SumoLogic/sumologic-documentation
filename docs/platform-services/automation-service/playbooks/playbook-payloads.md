---
id: playbook-payloads
title: Playbook Payloads
sidebar_label: Playbook Payloads
description: Learn about the data payloads of the different playbook types.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ActionsLimit from '../../../reuse/actions-limit.md';

When a playbook is run, a payload is passed from the initial object to the playbook (for example, from an alert, entity, or Insight). The variables in the payload can be assigned to parameters and used as inputs for different actions in the playbook. 

You select the initial object to use for the payload when you [create a playbook](/docs/platform-services/automation-service/playbooks/create-playbooks/#create-a-new-playbook). In the **Add one or more params as a playbook input** field, you select the kind of trigger that will execute the playbook: <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node-parameters.png')} alt="Types of start node parameters" style={{border:'1px solid gray'}} width="400"/>
    * **Insight**. An [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Entity**. An [entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) from an [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/).
    * **Alert**. An [alert](/docs/alerts/) from an [automated playbook in a monitor](/docs/alerts/monitors/use-playbooks-with-monitors/).
    * **Parse from json**. A payload from a [parent playbook](/docs/platform-services/automation-service/playbooks/create-playbooks/#add-a-playbook-node-to-a-playbook). You can also select this option if you want to pass a custom payload from an alert.
    * Leave blank if the trigger will be a Cloud SOAR [incident or triage](/docs/cloud-soar/incidents-triage). 

:::note
If you are using [nested playbook nodes](/docs/platform-services/automation-service/playbooks/create-playbooks/#add-a-playbook-node-to-a-playbook), then you will need to configure the parameters of the Start Node in the child playbook to include the outputs of the parent playbook that are passed to the child playbook. It is not recommended to use parameter arrays (for example, `signals[].id`) as the Start Node parameters for the child playbook; you should use a standard parameter names instead (for example, `signals.id`).
:::

Following are examples of payloads from different trigger types:
* [Alert payload](#alert-payload)
* [Entity payload](#entity-payload)
* [Insight payload](#insight-payload)

## Alert payload

### View an alert payload

1. Access the [alert list](/docs/alerts/monitors/alert-response/#alert-list).
1. Open an alert that uses a playbook.
1. On the alert details page, click the **Playbooks** button to see [automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/#view-automated-playbooks-for-an-alert) attached to the alert. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-new.png')} alt="Playbook on an alert" style={{border: '1px solid gray'}} width="300"/>
1. Click the playbook name. The playbook opens in the Automation Service.
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-1-new.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="800"/> <br/>The alert payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/alert-payload.png')} alt="Alert payload" style={{border: '1px solid gray'}} width="800"/>

### Alert payload variables

 The following variables are passed in the payload from an alert to a playbook. 

| Variable | Description |
| :--  | :-- |
|`​​Id`|The unique identifier for alert that triggered the playbook.|
|`Name`|The name of the monitor.|
|`Query`|The query used in the monitor.|
|`QueryURL`|The URL to the logs or metrics query within Sumo Logic.|
|`AlertName`|The name of the alert.|
|`SourceURL`|The URL to the configuration or status page of the monitor in Sumo Logic.|
|`AlertGroup`|The alert grouping that triggered the alert, including associated values for that field.|
|`Description`|The description of the monitor.|
|`MonitorType`|The type of alert, either `Logs` or `Metrics`.|
|`ResultsJson`|JSON object containing the query results that triggered the alert.|
|`TriggerTime`|The date and time the query triggered the alert.|
|`TriggerType`|The status of the alert or recovery. Alert will have a status of `Normal`, `Critical`, `Warning`, or `Missing Data`. Recovery will have a status of `ResolvedCritical`, `ResolvedWarning`, or `ResolvedMissingData`.|
|`TriggerValue`|The value that triggered the alert.|
|`Notifications`|The details for the notifications configured in the monitor.|
|`NumRawResults`|Number of results returned by the search.|
|`DetectionMethod`|The type of detection method used to detect alerts. Values are based on static or outlier triggers and data type, either logs or metrics. The value will be `LogsStaticCondition`, `MetricsStaticCondition`, `LogsOutlierCondition`, `MetricsOutlierCondition`, `LogsMissingDataCondition`, or `MetricsMissingDataCondition`.|
|`NumQueryResults`|The number of results the query returned.|
|`SloDashboardURL`|The URL to the SLO dashboard.|
|`TriggerQueryURL`|The URL to the log search for the query that triggered the alert.|
|`AlertResponseURL`|The URL to the alert page for the corresponding alert ID.|
|`TriggerCondition`|The condition that triggered the alert.|
|`TriggerTimeRange`|The time range of the query that triggered the alert.|
|`ResultsJsonParsed`|The parsed fields from `ResultsJson`.|
|`AggregateResultsJson`|JSON object containing the query results that triggered the alert, along with aggregate values such as message count.|
|`customPlaceholderMap`|The parsed fields from `ResultsJson` and the aggregate values returned from the query. The fields specific to the query that triggered the alert can be referenced by using `customPlaceholderMap`. For example, if the result of the query includes a field named `user_name`, this can be referenced by calling `customPlaceholderMap[].user_name`.|
|`AggregateResultsJsonParsed`|The parsed fields from `AggregateResultsJson`.|

### Alert payload example

```json
{
  "Id": "00000000016CCCDD",
  "Name": "Amazon Guard Duty Brute Force",
  "Query": "_sourceCategory=Labs/AWS/GuardDuty_V3 | parse \"{\\\"key\\\":\\\"Owner\\\",\\\"value\\\":\\\"*\\\"}\" as owner_key | json field=_raw \"service.action.networkConnectionAction.remotePortDetails.portName\"as port_name | json field=_raw \"service.action.networkConnectionAction.remotePortDetails.port\" as port | json field=_raw \"service.action.networkConnectionAction.remoteIpDetails.ipAddressV4\" as ip_address | json field=_raw \"accountId\", \"region\", \"partition\", \"id\", \"arn\", \"type\",\"service.serviceName\",\"service.detectorId\",\"service.action\",\"severity\",\"title\",\"description\", \"vpcId\", \"subnetId\", \"groupId\" , \"tags\", \"groupName\", \"resource.instanceDetails.instanceId\" as account_id, region, partition, id, arn, type, service_name, detector_id, action, severity, title, description, vpcId, subnetId , securityGroupId, tags, securityGroupName, instanceid nodrop  | where type matches \"*BruteForce*\" | count by instanceid, ip_address, port, port_name, owner_key",
  "QueryURL": "https://live.us2.sumologic.com/ui/index.html#/search/1IzrB2mrW6L7egF1GY3zwnqJW663xPamyh9oe1AcFBanRckiRpXQiuPU2hOngFWnHO9bOLhpZ1GnssHTKtQpcLPBAOBp8wwW9VerT83Fj77k6hXQqMl5lI3tqsPv5bMG",
  "AlertName": "Amazon GuardDuty Brute Force Finding",
  "SourceURL": "https://live.us2.sumologic.com/ui/#/alerts/unified-monitors/00000000000007A0?selectedRows=0000000000593B6D",
  "AlertGroup": "instanceid=i-F56tg45tty5gfgd45",
  "Description": "",
  "MonitorType": "Logs",
  "ResultsJson": "[{\"Count\":1,\"instanceid\":\"i-F56tg45tty5gfgd45\",\"ip_address\":\"78.24.180.93\",\"owner_key\":\"security@lxechip.com\",\"port\":\"22\",\"port_name\":\"SSH\"}]",
  "TriggerTime": "05/01/2024 02:08:46 PM CDT",
  "TriggerType": "Critical",
  "TriggerValue": 1,
  "Notifications": [
    {
      "notification": {
        "images": [],
        "subject": "Monitor Alert: {{TriggerType}} on {{AlertName}}",
        "actionId": -4194941809035894000,
        "jsonClass": "EmailAction",
        "ccRecipients": [],
        "templateName": "Default Unified Monitor Email With Alert Response Variables",
        "toRecipients": [
          "example@sumologic.com"
        ],
        "bccRecipients": [],
        "relatedContent": [],
        "emailBodyMessage": ""
      },
      "runForTriggerTypes": [
        "Critical"
      ]
    }
  ],
  "NumRawResults": "45",
  "DetectionMethod": "LogsStaticCondition",
  "NumQueryResults": "1",
  "SloDashboardURL": "",
  "TriggerQueryURL": "https://live.us2.sumologic.com/ui/index.html#/search/1IzrB2mrW6L7egF1GY3zwnqJW663xPamyh9oe1AcFBanRckiRpXQiuPU2hOngFWnHO9bOLhpZ1GnssHTKtQpcLPBAOBp8wwW9VerT83Fj77k6hXQqMl5lI3tqsPv5bMG",
  "AlertResponseURL": "https://live.us2.sumologic.com/ui/#/alert/00000000016CCCDD",
  "TriggerCondition": "ResultCount is Greater than 0.0 in the last 1440 minutes",
  "TriggerTimeRange": "04/30/2024 02:06:46 PM CDT to 05/01/2024 02:06:46 PM CDT",
  "ResultsJsonParsed": [
    {
      "port": "22",
      "Count": 1,
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ],
  "AggregateResultsJson": "[{\"Count\":1,\"instanceid\":\"i-F56tg45tty5gfgd45\",\"ip_address\":\"78.24.180.93\",\"owner_key\":\"security@lxechip.com\",\"port\":\"22\",\"port_name\":\"SSH\"}]",
  "customPlaceholderMap": [
    {
      "port": "22",
      "Count": "1",
      "_count": "1",
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ],
  "AggregateResultsJsonParsed": [
    {
      "port": "22",
      "Count": 1,
      "owner_key": "security@example.com",
      "port_name": "SSH",
      "instanceid": "i-F56tg45tty5gfgd45",
      "ip_address": "78.24.180.93"
    }
  ]
}
```

## Entity payload

### View an entity payload

1. Open an [entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the entity details page to view the automations on the entity.  <br/><img src={useBaseUrl('img/platform-services/automation-service/automation-on-entity-in-cloud-siem.png')} alt="Automation on an Entity in Cloud SIEM" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** on an automation. The automation's playbook opens in the Automation Service. 
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/entity-playbook.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="800"/> <br/>The entity payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/entity-payload.png')} alt="Entity payload" style={{border: '1px solid gray'}} width="800"/>

### Entity payload variables

| Variable | Description |
| :-- | :-- |
| `​​Id` | The unique ID of the [entity](/docs/cse/records-signals-entities-insights/view-manage-entities) whose information is provided in the payload.|
| ​`name` | The entity’s name. ​|
| `tags`​ | [Tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) attached to the entity.​ |
| `value` | The value of the entity. |
| `hostname` ​| The hostname of the entity (if the entity is an item that can have a hostname, such as a computer). ​|
| `lastSeen` ​| When the entity was last seen in a record. ​|
| `firstSeen` ​| When the entity was first seen in a record. ​|
| `inventory` ​| The [inventory source](/docs/cse/administration/inventory-sources-and-data/) for the entity (if it originated in an inventory). ​|
| `entityType` ​| The [type of entity](/docs/cse/records-signals-entities-insights/view-manage-entities/#about-entities). ​|
| `macAddress` ​| The [medium access control (MAC) address](https://en.wikipedia.org/wiki/MAC_address) assigned to the entity (if the entity is a piece of hardware). ​|
| `reputation` ​| The reputation score for the entity. ​|
| `sensorZone` ​| [Sensor zone](/docs/cse/administration/using-sensor-zones/) for the entity. ​|
| `criticality` | The [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/) of the entity. |
| `isSuppressed` | Whether the [entity is suppressed](/docs/cse/records-signals-entities-insights/about-signal-suppression/#suppress-by-entity). |
| `activityScore` | The entity’s [activity score](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#understanding-entity-activity-scores). |
| `recentSignalSeverity` | The most recent [severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity) of the signal that the entity appeared on. |

### Entity payload example

```json
{
  "id": "_ip-198.51.100.0",
  "name": "198.51.100.0",
  "tags": [],
  "value": "198.51.100.0",
  "hostname": null,
  "lastSeen": "2024-08-30T13:36:18",
  "firstSeen": null,
  "inventory": [],
  "entityType": "_ip",
  "macAddress": null,
  "reputation": null,
  "sensorZone": null,
  "criticality": null,
  "isSuppressed": false,
  "activityScore": 12,
  "recentSignalSeverity": 12
}
```

## Insight payload

### View an Insight payload

1. Open an [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the Insight details page to view the automations on the Insight.  <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-automation.png')} alt="Automations on an Insight" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** on an automation. The automation's playbook opens in the Automation Service.  
1. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-playbook.png')} alt="Insight playbook" style={{border: '1px solid gray'}} width="800"/> <br/>The Insight payload appears. <br/><img src={useBaseUrl('img/platform-services/automation-service/insight-payload.png')} alt="Insight payload" style={{border: '1px solid gray'}} width="800"/>

### Insight payload variables

| Variable | Description |
| :-- | :-- |
| `​​id` | The unique ID of the [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#insight-details-page) whose information is provided in the payload.
| `name` | The name of the Insight. |
| `tags` | [Tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) attached to the Insight. |
| `orgId` | The ID of the Sumo Logic organization where the Insight originated. |
| `closed` | Whether the Insight is closed. |
| `entity` |  The [entity](/docs/cse/records-signals-entities-insights/view-manage-entities) the Insight fired on. |
| `source` |  The source of the Insight data. |
| `status` |  The current status of the Insight. |
| `created` | When the Insight was created. |
| `signals` |  The Signals in the Insight. |
| `assignee` | The analyst assigned to the incident. |
| `closedBy` | The analyst who closed the Insight (if it’s status is closed). | 
| `severity` | The [severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity) of the Insight. |
| `timestamp` | The timestamp when the Insight fired. |
| `assignedTo` | The analyst assigned to the incident. |
| `confidence` | If sufficient data is available, a [Global Confidence score](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights/) for the Insight is shown. |
| `readableId` |  The human-readable ID of the Insight. |
| `resolution` | The [resolution](/docs/cse/administration/manage-custom-insight-resolutions/) of the Insight (if the Insight is resolved). |
| `description` | A description of the Insight. |
| `lastUpdated` | When the Insight was last updated. |
| `lastUpdatedBy` | The analyst who last updated the Insight. |
| `subResolution` | The [sub-resolution](/docs/cse/administration/manage-custom-insight-resolutions/) of the Insight (if the Insight is resolved and if a sub-resolution is applied). |
| `teamAssignedto` | The team the Insight is assigned to. |
| `timeToResponse` | The time it took to respond to the Insight. |
| `timeToDetection` | The time it took to detect the Insight. |
| `involvedEntities` | The entities involved in the Insight. |
| `timeToRemediation` | The time it took to resolve the Insight. | 

### Insight payload example

```json
{
  "id": "8e965194-f2da-36e0-839d-c2bacffca684",
  "name": "Unspecified Malicious Activity",
  "tags": [
    "custom-tag",
    "dataComponent:File",
    "foo",
    "MITRE_Expansion_C2",
    "testtag"
  ],
  "orgId": "0000000006ACDE44",
  "closed": null,
  "entity": {
    "id": "_ip-192.0.2.0",
    "name": "192.0.2.0",
    "value": "192.0.2.0",
    "hostname": null,
    "entityType": "_ip",
    "macAddress": null,
    "sensorZone": ""
  },
  "source": "ALGORITHM",
  "status": {
    "name": "new",
    "displayName": "New"
  },
  "created": "2024-09-05T20:25:59.673356",
  "signals": [
    {
      "id": "d02c5f27-5925-54a0-b0dd-0fee9ee2de2d",
      "name": "CrowdStrike Aggregation Rule test signal",
      "tags": [],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "AGGREGATION-U07128",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "RULE",
      "description": "test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where (if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") and if (isNull(objectType), true, objectType != \"email\") and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T20:24:00",
        "queryStartTime": "2024-09-05T19:24:00"
      }
    },
    {
      "id": "34b173fe-792b-55b0-8723-808ded9547ce",
      "name": "Exclude CrowdStrike and Email Chain Rule",
      "tags": [
        "custom-tag",
        "foo",
        "testtag"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "CHAIN-U07162",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "RULE",
      "description": "chain rule test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where ((if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") or if (isNull(objectType), true, objectType != \"email\")) and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T20:24:00",
        "queryStartTime": "2024-09-05T19:24:00"
      }
    },
    {
      "id": "f7ee1ba7-fb69-51e3-8cbe-a7673e237dfe",
      "name": "CrowdStrike First Seen Rule test signal",
      "tags": [
        "testtag",
        "foo",
        "custom-tag"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "FIRST-U00161",
      "created": "2024-09-05T20:20:51.904000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:20:51.904000",
      "contentType": "ANOMALY",
      "description": "test description",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": null
    },
    {
      "id": "5f0db81c-c11a-5b13-b2e0-8a25de6ba376",
      "name": "Exclude CrowdStrike and Email Threshold Rule test",
      "tags": [
        "MITRE_Expansion_C2",
        "testtag",
        "dataComponent:File"
      ],
      "stage": "Unknown/Other",
      "entity": {
        "id": "_ip-192.0.2.0",
        "name": "192.0.2.0",
        "value": "192.0.2.0",
        "hostname": null,
        "entityType": "_ip",
        "macAddress": null,
        "sensorZone": ""
      },
      "ruleId": "THRESHOLD-U07169",
      "created": "2024-09-05T20:25:51.043000",
      "severity": 4,
      "artifacts": [],
      "timestamp": "2024-09-05T20:25:51.043000",
      "contentType": "RULE",
      "description": "Test Threshold rule",
      "recordCount": 1,
      "recordTypes": [],
      "recordSearchDetails": {
        "query": "_index=sec_record_* | where (if (isNull(metadata_vendor), true, metadata_vendor != \"CrowdStrike\") and if (isNull(objectType), true, objectType != \"email\") and if (isNull(srcDevice_ip), false, srcDevice_ip == \"192.0.2.0\"))",
        "queryEndTime": "2024-09-05T21:36:00",
        "queryStartTime": "2024-09-05T09:36:00"
      }
    }
  ],
  "assignee": null,
  "closedBy": null,
  "severity": "HIGH",
  "timestamp": "2024-09-05T20:25:51.043000",
  "assignedTo": null,
  "confidence": null,
  "readableId": "INSIGHT-637",
  "resolution": null,
  "description": "Unknown/Other",
  "lastUpdated": "2024-09-05T20:25:59.673351",
  "lastUpdatedBy": null,
  "subResolution": null,
  "teamAssignedTo": null,
  "timeToResponse": null,
  "timeToDetection": 307.769356,
  "involvedEntities": [
    {
      "id": "_ip-192.0.2.0",
      "name": "192.0.2.0",
      "value": "192.0.2.0",
      "hostname": null,
      "entityType": "_ip",
      "macAddress": null,
      "sensorZone": null
    },
    {
      "id": "_username-pete@tclab.us",
      "name": "pete@tclab.us",
      "value": "pete@tclab.us",
      "hostname": null,
      "entityType": "_username",
      "macAddress": null,
      "sensorZone": null
    },
    {
      "id": "_username-key--d2b90316--a1d3--492d--beb5--308184ab4973 (Sumo Logic API client (read only))",
      "name": "key-d2b90316-a1d3-492d-beb5-308184ab4973 (Sumo Logic API client (read only))",
      "value": "key-d2b90316-a1d3-492d-beb5-308184ab4973 (Sumo Logic API client (read only))",
      "hostname": null,
      "entityType": "_username",
      "macAddress": null,
      "sensorZone": null
    }
  ],
  "timeToRemediation": null
}
```
