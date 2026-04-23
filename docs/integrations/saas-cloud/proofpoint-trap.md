---
id: proofpoint-trap
title: Proofpoint TRAP
sidebar_label: Proofpoint TRAP
description: The Sumo Logic app for Proofpoint TRAP (Threat Response Auto-Pull) provides comprehensive visibility into email threats detected and remediated by Proofpoint, including phishing, malware, impostor/BEC attempts, and suspicious messages.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="Proofpoint icon" width="140"/>

The Sumo Logic app for Proofpoint TRAP (Threat Response Auto-Pull) provides comprehensive visibility into email threats detected and remediated by Proofpoint, including phishing, malware, impostor/BEC attempts, and suspicious messages. The app consists of four predefined dashboards covering threat overview, remediation effectiveness, security operations and threat analysis, and user risk and exposure to give security teams actionable insights into email-borne attacks across the organization.

:::info
This app includes [built-in monitors](#proofpoint-trap-app-alerts). For details on creating custom monitors, refer to [Create monitors for the Proofpoint TRAP app](#create-monitors-for-the-proofpoint-trap-app).
:::

## Log types

This app uses Sumo Logic’s [Proofpoint TRAP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-trap-source) to collect message logs from the Proofpoint TRAP API.

### Sample log message

<details>
<summary>Message Log</summary>

```json
{
  "id": "a1b2c3d4-cccc-4aaa-bbbb-177685702412",
  "vap": false,
  "sources": [
    {
      "id": "5d385f22-e694-4e59-aa89-304487bf1ccb",
      "type": "TapAlert"
    }
  ],
  "email_id": "e1a00012-aaaa-4000-8000-177685702412",
  "pps_guid": "Ij1Kl2Mn3Op4Qr5St6Uv7Wx8Yz9Ab0Cd",
  "incidents": [
    {
      "id": "f0a00012-bbbb-4000-8000-177685702412",
      "title": "Message Delivered to legal[@]lawfirm-partners[.]com with link hxxps://docusign-fake[.]com/review/sign",
      "display_id": 7012,
      "link_attribute": "sender_and_url"
    }
  ],
  "sender_id": "11111111-aaaa-4000-8000-177685702412",
  "tenant_id": "e3d0d1b3-382a-4871-a0bc-c26bd0ab4633",
  "created_at": "2026-04-22T16:53:44.907",
  "message_id": "<LLL222MMM333@nprghjwfsu.prod.outlook.com>",
  "updated_at": "2026-04-22T16:53:44+053088",
  "disposition": "phish",
  "received_at": "2026-04-22T16:53:44.907+00:00",
  "tap_cleared": false,
  "body_expired": null,
  "body_present": false,
  "clear_verdict": null,
  "email_subject": "[EXTERNAL] DocuSign: Contract Awaiting Your Signature",
  "message_status": {
    "is_read": true,
    "permitted_clicks": 1,
    "message_delivered": true
  },
  "sender_address": "signing@docusign-notification-fake.com",
  "last_known_type": "mailbox",
  "clear_confidence": null,
  "tap_threat_types": ["delivered_url_threat"],
  "recipient_address": "legal@lawfirm-partners.com",
  "email_message_size": null,
  "email_recipient_id": "a1b2c3d4-cccc-4aaa-bbbb-177685702412",
  "remediation_status": "message_not_found",
  "tap_false_positive": false,
  "abuse_reporter_rank": "not_a_reporter",
  "quarantine_strategy": null,
  "mime_content_expired": null,
  "mime_content_present": false,
  "click_block_exclusive": null,
  "remediation_status_context": null,
  "received_time": "2026-04-22T16:53:44.907+00:00"
}
```

</details>

### Sample queries

```sql title="Delivered High-Risk Threat Messages"
_sourceCategory=proofpoint-trap-app disposition pps_guid
| json "id","disposition","recipient_address","sender_address","email_subject","created_at","remediation_status","tap_threat_types[*]","sources[*].type","clear_confidence", "message_status.message_delivered" as msg_id,disposition,recipient_address,sender_address,email_subject,created_at,remediation_status,tap_threat_types_list,source_type_list,clear_confidence,message_delivered nodrop
| extract field=source_type_list "\"?(?<source_type>[\\w\\s\\-&.,]*)\"?[,\\n\\]]" multi
| extract field=tap_threat_types_list "\"?(?<tap_threat_type>[\\w\\s\\-&.,]*)\"?[,\\n\\]]" multi
| where clear_confidence = "high" and message_delivered = "true"
| count by created_at, disposition, sender_address, recipient_address, tap_threat_type, email_subject, clear_confidence, remediation_status, message_delivered, id
| sort by created_at
| fields -_count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Proofpoint TRAP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-trap-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Proofpoint TRAP app is properly integrated and configured to collect and analyze your Proofpoint TRAP data.
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

## Viewing Proofpoint TRAP dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Proofpoint TRAP - Overview** dashboard provides a high-level summary of email threat activity with total message trends, disposition distributions, source and threat-type breakdowns, top targeted users and senders, and recent threat events. Detailed phishing, malware, and remediation-specific use cases are available in dedicated dashboards.

<img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TRAP-Overview.png')} alt="Proofpoint TRAP dashboards" />

### Remediation and Response

The **Proofpoint TRAP - Remediation and Response** dashboard monitors the effectiveness of email threat remediation, including quarantine counts, pending and failed remediation, abuse mailbox reports, remediation status trends over time, quarantine strategy distribution, messages with permitted clicks, and detailed failure investigation data.

<img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TRAP-Remediation-and-Response.png')} alt="Proofpoint TRAP dashboards" />

### Security and Threat Analysis

The **Proofpoint TRAP - Security and Threat Analysis** dashboard combines actionable security insights with deep threat analysis. It provides delivered high-risk threat monitoring, user click exposure, remediation tracking, plus detailed analysis of phishing, malware, impostor/BEC, and suspicious email threats including threat disposition trends, URL and attachment details, and investigative data.

<img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TRAP-Security-and-Threat-Analysis.png')} alt="Proofpoint TRAP dashboards" />

### User Risk and Exposure

The **Proofpoint TRAP - User Risk and Exposure** dashboard highlights user-level risk indicators including very attacked person (VAP) targeting, threat messages read before quarantine, permitted link clicks on threat messages, delivered threats, risk event trends over time, and comprehensive high-risk user exposure details for incident prioritization.

<img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TRAP-User-Risk-and-Exposure.png')} alt="Proofpoint TRAP dashboards" />

## Create monitors for the Proofpoint TRAP app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Proofpoint TRAP app alerts

| Name  | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Proofpoint TRAP - Delivered High-Risk Messages` | This alert is triggered when Proofpoint TRAP detects high-confidence threat messages that were successfully delivered to recipients. Delivered high-risk messages indicate a gap in upstream filtering and may expose users to phishing, malware, or BEC attempts that require immediate response. | Count > 0 | Count < = 0 |
| `Proofpoint TRAP - Remediation Failures` | This alert is triggered when Proofpoint TRAP cannot remediate a threat message because the mailbox or message cannot be found. Remediation failures may indicate stale mailbox data, integration issues, or threat content that remains accessible to end users. | Count > 0 | Count < = 0 |
| `Proofpoint TRAP - Quarantine Pending` | This alert is triggered when Proofpoint TRAP messages remain in a `quarantine_pending` state. Pending quarantine actions may indicate processing delays or integration problems that leave threat messages partially remediated. | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the Proofpoint TRAP app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Proofpoint TRAP app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
