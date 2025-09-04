---
id: audit-event-index
title: Audit Event Index
description: The Audit Event Index provides event logs in JSON on your account's activities allowing you to monitor and audit changes.
---

## Availability

| Account Type | Account Level |
|:--|:--|
| Cloud Flex | Trial, Enterprise |
| Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

The Audit Event Index contains event logs in JSON format on account activities, allowing you to monitor and audit changes. This index contains user action events, which are events that were triggered by a user action, either from the UI or an API. Enterprise accounts have the Audit Event Index enabled and available to search by default. You can use the [Enterprise Audit Apps](/docs/integrations/sumo-apps/enterprise-audit) to visually display data from the Audit Event Index for monitoring and analysis.

This index is separate from the [System Event Index](/docs/manage/security/audit-indexes/system-event-index), which shows events triggered by Sumo Logic rather than user action events.

This index is improved and different from the [Audit Index](/docs/manage/security/audit-indexes/audit-index), and there is some overlap of audited events. The Audit Index provides event logs in plain text and audits when account limits are reached and operation failures, like throttling and scheduled search events.

## Documentation 

All available audited events are documented for your reference. See [Documentation for Audit Log Definitions](/docs/manage/security/audit-indexes/documentation-audit-log-definitions/).

## Search the Audit Event Index

Searching the Audit Event Index is the same as running a normal search against your ingested data. You specify the `_index` metadata field with `sumologic_audit_events`.

For example, to search for audit events:

1. In the Search page, enter the following: `_index=sumologic_audit_events`  
     :::important
     Make sure to enter the query exactly as shown. Changing any part of the query renders it ineffective.
     :::
1. Choose the time range for the incidents that you'd like to review.
1. Click **Start** to run the search.

## Audited events

This Audit Event Index has detailed JSON logs for the following features. To search for audit events for a specific feature use the metadata field `_sourceCategory` with its corresponding value. For example, to search user action events for access keys you would use the query:

```sql
_index=sumologic_audit_events _sourceCategory=accessKeys
```

| Product Feature | _sourceCategory Value  |
| :-- | :-- |
| [Access Keys](/docs/manage/security/access-keys/) | `accessKeys` |
| [Alerts](/docs/alerts/monitors/alert-response) | `alerts` |
| [Automation Service and Cloud SOAR](/docs/platform-services/automation-service/automation-service-audit-logging/) | `oar*` |
| [Cloud SIEM](/docs/cse/administration/cse-audit-logging/) | `cse*` |
| [Collection](/docs/send-data/collection) | `collection` |
| [Connections](/docs/alerts/webhook-connections/set-up-webhook-connections) | `connections` |
| [Content Sharing](/docs/manage/content-sharing) | `content` |
| [Data Forwarding](/docs/manage/data-forwarding) | `dataForwarding` |
| [Field Extractions](/docs/manage/field-extractions) | `fieldExtractionRules` |
| [Fields](/docs/manage/fields) | `fieldManagement` |
| [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets) | `ingestBudgets` |
| [Installation Tokens](/docs/manage/security/installation-tokens) | `token` |
| [Logs-to-Metrics Rules](/docs/metrics/logs-to-metrics) | `metricExtractionRule` |
| [Monitors](/docs/alerts/monitors) | `monitorLibrary` |
| [Password Policy](/docs/manage/security/set-password-policy) | `passwordPolicy` |
| [Roles](/docs/manage/users-roles/roles/create-manage-roles) | `roles` |
| [SAML](/docs/manage/security/saml) | `saml` |
| [Scheduled Views](/docs/manage/scheduled-views) | `scheduledView` |
| Security Policies: Share Dashboards Outside of the Organization, [Data Access Level for Shared Dashboards](/docs/manage/security/data-access-level-shared-dashboards), [Per User Concurrent Sessions Limit](/docs/manage/security/set-limit-user-concurrent-sessions), and [User Session Timeout](/docs/manage/security/set-max-web-session-timeout) | `orgSettings` |
| Security Policy: [Support Account Access](/docs/manage/security/enable-support-account) | `supportAccount` |
| [Service Allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses) | `serviceAllowlist` |
| [Support Account](/docs/manage/security/enable-support-account) | `supportAccount` |
| [Threat Intelligence](/docs/security/threat-intelligence/) | `threatIntelligence` |
| [Tracing Ingest](/docs/apm/traces/tracing-ingest) | `tracingIngest` |
| [Transformation Rules](/docs/metrics/metrics-transformation-rules) | `transformationRules` |
| [Users](/docs/manage/users-roles) | `users` |
| User Sessions | `userSessions` |
| [2-Step Verification](/docs/manage/security/about-2-step-verification) | `multiFactorAuthentication` |

When performing create, update, and delete requests through Sumo Logic APIs, you can find the API accessID within the operator field of your related Audit Event Index messages.

## Metadata assignment

[Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields are assigned to audit event logs as follows:

| Metadata Field | Assignment Description |
| :-- | :-- |
| _sourceCategory   | Value of the [common parameter](#common-parameters), `subsystem`. |
| _sourceName | Value of the [common parameter](#common-parameters), `eventName`. |
| _sourceHost | The remote IP address of the host that made the request. If not available the value will be `no_sourceHost`. |

## Common parameters

Each audit event log has common keys that categorize it to a product area and provide details of the event.

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

By default, the retention period of the Audit Event index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partition, `sumologic_audit_events`. For more information, see [Edit a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).
