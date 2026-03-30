---
id: upwind
title: Upwind
description: Learn about the collection process for the Sumo Logic Upwind integration.
---


import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/upwind-logo.png')} alt="thumbnail icon" width="55"/>

Upwind is a runtime-powered cloud security platform that helps monitor cloud threats, configuration findings, and security operations activity. You can use a custom webhook in Upwind to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor audit activity, configuration findings, and threat detections in Sumo Logic.

For more details, see [Upwind Custom Webhook documentation](https://docs.upwind.io/integrations/monitoring-and-logging/custom-webhook) and [Workflow documentation](https://docs.upwind.io/settings/workflows).

## Event types

The Sumo Logic app for Upwind ingests security events into Sumo Logic through a custom webhook in Upwind workflows. Configure your webhook/workflow to send the log types you want to monitor.

The following log types are used in Upwind Sumo Logic app:
- Audit events
- Configuration findings
- Threat detections

### Sample log messages

```json
{
    "title": "New Audit Log Event Recorded: Delete Membership Invitation",
    "event_type": "audit_log",
    "audit_id": "01KMCGGT28HSH23ENYZ2J4D4S4",
    "actor_name": "xyz Patel",
    "actor_email": "xyz.ctr@khbfgqqeyi.com",
    "activity_name": "Delete Membership Invitation",
    "target_module": "accessmanagement",
    "target_entity_id": "uinv_5lVaGyHkmzJoXr2B",
    "status": "SUCCESS",
    "ingested_time": "2026-03-28 18:39:02.708",
    "location_city": "Ahmedabad",
    "location_ip": "168.119.168.251",
    "workflow_id": "wf-8d90a595d9e0095d",
    "workflow_name": "sumo-4",
    "metadata": {
        "vendor_name": "UPWIND_SECURITY"
    }
}
```

### Sample queries

```sql
_sourceCategory="Labs/Upwind" id severity status category mitre_attacks
| json "id", "severity", "status", "category", "resource.cloud_provider" as id, severity, status, category, cloud_provider nodrop

// global filters
| where if ("*" = "*", true, severity matches "*") and if ("*" = "*", true, status matches "*") and if ("*" = "*", true, cloud_provider matches "*") and if ("*" = "*", true, category matches "*")

| count by id
| count
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Upwind webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Upwind events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one.
2. Add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source, for example, `webhook/upwind`.
4. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Upwind to send events to the Sumo Logic HTTP source.

Follow the below steps to configure the Upwind webhook and workflow.

1. Sign in to your Upwind account.
2. Go to **Components > Integrations > Monitoring & Logging > Custom Webhook**.
3. Click **Create Custom webhook**.
4. Enter webhook form data as follows:
    - **Webhook name**. Provide a name for the integration.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Authentication type**. Select None.
    - Click **Test & save** to validate the connection and save your configuration.
6. Go to **Components > Workflow** and create a new workflow.
7. Select a workflow trigger and set **Workflow Action** to **Select to a Custom webhook**.
8. Select the webhook integration created above and save the workflow.
9. Verify Upwind events are getting ingested in Sumo Logic by executing the following query in Log Search:

```sql
_sourceCategory=webhook/upwind
```

:::info
- For webhook and workflow details, refer to [Upwind Custom Webhook documentation](https://docs.upwind.io/integrations/monitoring-and-logging/custom-webhook) and [Workflow documentation](https://docs.upwind.io/settings/workflows).
:::

### Installing the Upwind app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Upwind dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Audit - Overview

The **Upwind - Audit - Overview** dashboard provides high-level visibility into audit event volume and status, activity trends over time, and recent audit records for investigation.

<img src={useBaseUrl('img/integrations/webhooks/Upwind-Audit-Overview.png')} style={{border: '1px solid black'}} alt="Audit-Overview"/>

### Audit - Security and Operations

The **Upwind - Audit - Security and Operations** dashboard focuses on security and operations-oriented audit activity to help track sensitive changes and operational events.

<img src={useBaseUrl('img/integrations/webhooks/Upwind-Audit-Security-and-Operations.png')} style={{border: '1px solid black'}} alt="Audit-Security-and-Operations"/>

### Configuration Findings - Overview

The **Upwind - Configuration Findings - Overview** dashboard provides summary visibility into configuration findings, including severity and trend-oriented analysis.

<img src={useBaseUrl('img/integrations/webhooks/Upwind-Configuration-Findings-Overview.png')} style={{border: '1px solid black'}} alt="Configuration-Findings-Overview"/>

### Configuration Findings - Security

The **Upwind - Configuration Findings - Security** dashboard helps security teams investigate security-relevant findings and prioritize remediation.

<img src={useBaseUrl('img/integrations/webhooks/Upwind-Configuration-Findings-Security.png')} style={{border: '1px solid black'}} alt="Configuration-Findings-Overview"/>

### Threat Detection - Overview

The **Upwind - Threat Detection - Overview** dashboard provides comprehensive visibility into threat detections including severity distribution, MITRE ATT&CK tactics, affected cloud resources, initiating actors, and high-recurrence open threats.

<img src={useBaseUrl('img/integrations/webhooks/Upwind-Threat-Detection-Overview.png')} style={{border: '1px solid black'}} alt="Threat-Detection-Overview"/>

## Create monitors for the Upwind app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Upwind app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Upwind - Critical Threat Detection` | This alert is triggered when open threats with CRITICAL or HIGH severity are detected in Upwind. This may indicate active or high-impact security risks that require immediate investigation and response. | Count > 0 | Count < = 0 |
| `Upwind - MITRE Defense Evasion Tactic Detected` | This alert is triggered when an Upwind threat is mapped to the MITRE ATT&CK Defense Evasion tactic (TA0005). This may indicate attempts to avoid detection and conceal malicious activity. | Count > 0 | Count < = 0 |
| `Upwind - High Recurrence Open Threat` | This alert is triggered when an open Upwind threat is observed with recurrence greater than one occurrence. This may indicate persistent or repeating malicious behavior affecting cloud resources. | Count > 1 | Count < = 1 |
| `Upwind - Audit Activity from Embargoed Location` | This alert is triggered when Upwind audit activity originates from embargoed or high-risk geographies. This may indicate unauthorized access, policy violations, or suspicious administrative behavior from restricted locations. | Count > 0 | Count < = 0 |
| `Upwind - MITRE Credential Access Tactic Detected` | This alert is triggered when an Upwind threat is mapped to the MITRE ATT&CK Credential Access tactic (TA0006). This may indicate attempts to steal credentials and gain unauthorized access to systems or accounts. | Count > 0 | Count < = 0 |


## Upgrade/Downgrade the Upwind app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Upwind app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
