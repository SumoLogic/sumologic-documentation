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

The **Audit Event Index** contains event logs in JSON format on account activities, allowing you to monitor and audit changes. Enterprise accounts have the Audit Event Index enabled and available to search by default. You can use the [Enterprise Audit Apps](/docs/integrations/sumo-apps/enterprise-audit) to visually display data from the Audit Event Index for monitoring and analysis.

This index is improved and different from the [Audit Index](audit-index.md), and there is some overlap of audited events. The Audit Index provides event logs in plain text and audits when account limits are reached and operation failures, like throttling and scheduled search events.

## Documentation 

All available audited events are documented for your reference. This documentation is hosted on each deployment, instead of on this document. Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security") if you are unsure.

Select the documentation link for your deployment:

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs  |
| CA | https://service.ca.sumologic.com/audit/docs  |
| DE | https://service.de.sumologic.com/audit/docs  |
| EU | https://service.eu.sumologic.com/audit/docs  |
| FED | https://service.fed.sumologic.com/audit/docs |
| IN | https://service.in.sumologic.com/audit/docs  |
| JP | https://service.jp.sumologic.com/audit/docs  |
| US1 | https://service.sumologic.com/audit/docs     |
| US2 | https://service.us2.sumologic.com/audit/docs |

## Search the Audit Event Index

Searching the Audit Event Index is the same as running a normal search against your ingested data. You specify the `_index` metadata field with one of these values: 

* `sumologic_audit_events`. This index contains user action events, which are events that were triggered by a user action, either from the UI or an API.
* `sumologic_system_events`. This index contains system action events, which are events that were triggered by Sumo Logic, for example, throttling events, rules triggered, and so on.  

For example, to search for user action events:

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

To search for system action events for data forwarding, you would use the query:

```sql
_index=sumologic_system_events _sourceCategory=dataForwarding
```

| Product Feature | _sourceCategory Value  |
| :-- | :-- |
| [Access Keys](access-keys.md) | `accessKeys` |
| [Alerts](/docs/alerts/monitors/alert-response) | `alerts` |
| [Collection](/docs/send-data/collection) | `collection` |
| [Connections](/docs/alerts/webhook-connections/set-up-webhook-connections) | `connections` |
| [Content Sharing](/docs/manage/content-sharing) | `content` |
| [Data Forwarding](/docs/manage/data-forwarding) | `dataForwarding` |
| [Field Extractions](/docs/manage/field-extractions) | `fieldExtractionRules` |
| [Fields](/docs/manage/fields.md) | `fieldManagement` |
| [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets) | `ingestBudgets` |
| [Installation Tokens](installation-tokens.md) | `token` |
| [Logs-to-Metrics Rules](../../metrics/logs-to-metrics.md) | `metricExtractionRule` |
| [Monitors](/docs/alerts/monitors) | `monitorLibrary` |
| [Password Policy](set-password-policy.md) | `passwordPolicy` |
| [Roles](../users-roles/roles/create-manage-roles.md) | `roles` |
| [SAML](/docs/manage/security/saml) | `saml` |
| [Scheduled Views](/docs/manage/scheduled-views) | `scheduledView` |
| Security Policies: [Share Dashboards Outside of the Organization](../../dashboards-classic/share-dashboard-outside-org.md), [Data Access Level for Shared Dashboards](data-access-level-shared-dashboards.md), [Per User Concurrent Sessions Limit](set-limit-user-concurrent-sessions.md), and [User Session Timeout](set-max-web-session-timeout.md) | `orgSettings` |
| Security Policy: [Support Account Access](enable-support-account.md) | `supportAccount` |
| [Service Allowlist](create-allowlist-ip-cidr-addresses.md) | `serviceAllowlist` |
| [Support Account](enable-support-account.md) | `supportAccount` |
| [Tracing Ingest](/docs/apm/traces/tracing-ingest) | `tracingIngest` |
| [Transformation Rules](../../metrics/metrics-transformation-rules.md) | `transformationRules` |
| [Users](/docs/manage/users-roles) | `users` |
| User Sessions | `userSessions` |
| [2-Step Verification](about-2-step-verification.md) | `multiFactorAuthentication` |

When performing create, update, and delete requests through Sumo Logic APIs, you can find the API accessID within the operator field of your related Audit Event Index messages.

## Metadata assignment

[Metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields are assigned to audit event logs as follows:

| Metadata Field | Assignment Description |
| :-- | :-- |
| _sourceCategory   | Value of the [common parameter](audit-event-index.md), `subsystem`. |
| _sourceName | Value of the [common parameter](audit-event-index.md), `eventName`. |
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

By default, the retention period of the Audit Event index is the same as the retention period of your Default Partition. You can change the retention period by editing the relevant partitions, `sumologic_audit_events` and `sumologic_system_events`. For more information, see [Edit a Partition](../partitions-data-tiers/create-edit-partition.md).
