---
id: vectra
title: Vectra
sidebar_label: Vectra
description: The Vectra app for Sumo Logic provides security analysts with visibility into security threats detected across networks, cloud environments, and endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/platform-services/automation-service/app-central/logos/vectra.png')} alt="Vectra-icon" width="70" />

The Vectra app offers comprehensive visibility into security threats detected across networks, cloud environments, and endpoints. It consolidates threat intelligence from multiple sources, categorizing detections by their severity, type, and behavior, while providing detailed contextual data to accelerate investigations. With interactive dashboards and targeted monitoring tools, security teams can track trends, pinpoint high-risk activities, and measure remediation effectiveness. By combining threat scoring, detection timelines, and enriched metadata, the app empowers proactive threat hunting, rapid incident response, and continuous improvement of security posture.

:::info
This app includes [built-in monitors](#vectra-alerts). For details on creating custom monitors, refer to the [Create monitors for Vectra app](#create-monitors-for-the-vectra-app).
:::

## Log types

This app uses Sumo Logic’s [Vectra Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/vectra-source/) to collect [detections](https://vectranetworks.my.salesforce.com/sfc/p/#i0000000HOyr/a/Rg00000528gW/UZpXGNk2iGlooWdyT5HpB3eOX39csgrXRdjzKaKpJVY) from the Vectra platform.

### Sample log message

```json title="Detection"
{
  "summary": {
    "user_agents": [
      "Microsoft Azure CLI",
      "Microsoft Azure CLI"
    ],
    "browser": [
      "Chrome 138.0.0",
      "Chrome"
    ],
    "operating_system": [
      "Linux",
      "Linux"
    ],
    "workloads": [
      "Azure Resource Manager",
      "AzureActiveDirectory"
    ],
    "operations": [
      "UserLoggedIn"
    ],
    "src_ips": [
      "80.117.40.124"
    ],
    "description": "This account was seen using a scripting engine to access services in Azure AD which is unusual for the account. Unusual usage of scripting engines in Azure AD and Microsoft 365 can be indicative of a compromised account."
  },
  "data_source": {
    "type": "o365",
    "connection_name": "M365-Demo",
    "connection_id": "s9s9c5cj"
  },
  "filtered_by_rule": false,
  "src_account": {
    "id": 1034,
    "name": "O365:demolab.vectra.ai",
    "url": "https://37373829274.cc1.portal.vectra.ai/api/v3.3/accounts/1034",
    "threat": 30,
    "certainty": 90,
    "privilege_level": null,
    "privilege_category": null
  },
  "threat": 70,
  "last_timestamp": "2025-08-12T18:29:21Z",
  "is_targeting_key_asset": false,
  "sensor_name": "Vectra X",
  "filtered_by_ai": false,
  "id": 3586,
  "c_score": 60,
  "src_ip": null,
  "assigned_date": null,
  "filtered_by_user": false,
  "is_custom_model": false,
  "assigned_to": null,
  "detection_category": "lateral_movement",
  "note_modified_timestamp": null,
  "created_timestamp": "2025-08-12T18:53:29Z",
  "note": null,
  "is_marked_custom": false,
  "url": "https://37373829274.cc1.portal.vectra.ai/api/v3.3/detections/3586",
  "state": "active",
  "detection": "Azure AD Unusual Scripting Engine Usage",
  "triage_rule_id": null,
  "groups": [],
  "category": "lateral_movement",
  "first_timestamp": "2025-08-12T18:29:21Z",
  "certainty": 60,
  "t_score": 70,
  "tags": [],
  "note_modified_by": null,
  "detection_url": "https://37373829274.cc1.portal.vectra.ai/api/v3.3/detections/3586",
  "description": null,
  "notes": [],
  "detection_type": "Azure AD Unusual Scripting Engine Usage",
  "custom_detection": null,
  "sensor": "s9s9c5cj",
  "targets_key_asset": false,
  "is_triaged": false,
  "src_host": null,
  "type": "account",
  "grouped_details": [
    {
      "workload": "Azure Resource Manager",
      "user_agent": "Microsoft Azure CLI",
      "operating_system": "Linux",
      "browser": "Chrome 138.0.0",
      "operations": [
        "UserLoggedIn"
      ],
      "operations_count": 1,
      "src_ips": [
        "80.117.40.124"
      ],
      "first_timestamp": "2025-08-12T18:29:21Z",
      "last_timestamp": "2025-08-12T18:29:21Z"
    },
    {
      "workload": "AzureActiveDirectory",
      "user_agent": "Microsoft Azure CLI",
      "operating_system": "Linux",
      "browser": "Chrome",
      "operations": [
        "UserLoggedIn"
      ],
      "operations_count": 1,
      "src_ips": [
        "80.117.40.124"
      ],
      "first_timestamp": "2025-08-12T18:29:21Z",
      "last_timestamp": "2025-08-12T18:29:21Z"
    }
  ]
}
```

### Sample queries

```sql title="Total Detections"
_sourceCategory="Labs/Vectra"
| json "id","last_timestamp","first_timestamp","state","t_score","c_score","category","type","summary.operations[*]","grouped_details[*].src_ips[*]","detection_url","assigned_to","detection","certainty","src_account.id","src_account.name","src_account.url","src_account.threat","src_account.certainty" as id,last_timestamp,first_timestamp,state,t_score,c_score,category,type,operations,src_ips,detection_url,assigned_to,detection,certainty,src_account_id,src_account_name,src_account_url,src_account_threat,src_account_certainty nodrop
| if (t_score>=70,"critical",if(t_score>=41 and t_score<=69, "medium", if(t_score<=40,"low","unknown"))) as severity

// global filters
| where isNull(state) or state matches "{{state}}"
| where isNull(category) or category matches "{{category}}"
| where isNull(severity) or severity matches "{{severity}}"
| where isNull(type) or type matches "{{type}}"
| where isNull(certainty) or certainty matches "{{certainty}}"

// panel specific
| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Vectra](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/vectra-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Vectra app is properly integrated and configured to collect and analyze your Vectra data.
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

## Viewing the Vectra dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Vectra - Overview** dashboard offers a consolidated, real-time summary of all detected threats, enabling security teams to quickly assess the current threat landscape. It breaks down detections by severity(critical, medium, low), category, type, and resolution state, providing both counts and visual distributions. Time-based trend charts reveal spikes or patterns in threat activity, while geo-location maps identify where hosts are operating, including those in embargoed regions that may pose compliance risks. Additional panels highlight the top-impacted users, frequently targeted operations, and relevant detection sources, with direct links for in-depth investigation. This dashboard serves as the central entry point for monitoring threats, understanding scope, and prioritizing security actions.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Vectra/Vectra-Overview.png' alt="Vectra-Overview" style={{border:'1px solid gray'}} />

### Security

The **Vectra - Security** dashboard focuses on advanced and high-severity threats that require immediate attention. It highlights critical threat detections, command-and-control activities, and account-based privilege escalation attempts, as well as anomalies in Azure AD operations. Persistent threats are tracked with metrics on time-to-remediation, enabling teams to assess response efficiency. Each panels are designed to surface patterns that indicate targeted attacks, lateral movement, or ongoing compromise attempts. By consolidating these high-priority insights, the dashboard helps security analysts quickly isolate urgent incidents, understand attack context, and coordinate effective containment and remediation strategies.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Vectra/Vectra-Security.png' alt="Vectra-Security" style={{border:'1px solid gray'}} />

## Create monitors for the Vectra app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Vectra alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Critical Threat Detections` | This alert is triggered when one or more threat detections with a threat score above 70 are identified. These detections indicate the most severe security risks and necessitate immediate investigation and remediation to prevent potential compromise or damage. | Critical | Count > 0 |

## Upgrading/Downgrading the Vectra app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Vectra app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>