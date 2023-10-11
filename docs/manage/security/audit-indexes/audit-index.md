---
id: audit-index
title: Audit Index
description: Provides information on the internal events that occur in Sumo Logic.
---

## Availability

| Account Type | Account Level |
|:--------------|:---------------------------------------------------------------------------------|
| Cloud Flex   | Trial, Professional, Enterprise |
| Credits | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

The **Audit Index** provides event logs in plain text on the internal events that occur in your account associated with account management, throttling, scheduled searches, and more. Events report audit messages, and these event messages are collected to give you better visibility into your account usage.

This index is different from the [Audit Event Index](audit-event-index.md), and there is some
overlap of audited events. The Audit Event Index provides event logs in JSON on activities from your account.

Before you can use the audit index, an administrator must enable it. When the audit index is enabled, Sumo logs messages to it once every five minutes. Note that data does not backfill.

:::note
All users can access the data contained within the audit index, but only administrators can enable and disable auditing.
::::

## Enable the audit index

1. Go to **Administration** > **Security** > **Policies**.
1. Next to **Sumo Logic Auditing**, select the **Enable** check box.

:::important
Auditing typically adds a nominal amount of data to your overall volume (approximately one to two percent) when pre-aggregated. Depending on your Sumo Logic account type and subscription, this data will count against your data volume quota. For more information, see [Manage Ingestion](../ingestion-volume/log-ingestion.md).
:::

## Query the audit index

You can query the audit index in a log search tab. To search for all types of audit events,  enter:

```sql
_index=sumologic_audit
```

You can run more targeted search by including other metadata, message fields, or keywords in your query. The source categories for event types are listed in [Audit index source categories](#audit-index-source-categories) below. The fields associated with event messages are listed in [Audit event message fields](#audit-event-message-fields). 

Results are returned in the **Messages** tab.

![audit-index-search.png](/img/security/audit-index-search.png)

:::note
The audit index must be enabled for a search to produce results.
:::

## Audit index source categories

| Event type | Source Category |
|:-----------------------|:----------------------------|
| Account Management    | `account_management`       |
| User Activity         | `user_activity`            |
| Support User Activity | `support_account_activity` |
| Scheduled Search      | `scheduled_search`         |
| Metrics               | `metrics`                  |
| Alerting              | `alert`                    |

## Audit event message fields

The table below lists defines the fields returned for an audit event. Note that by default, only the event time and the raw message are displayed. You can display selected fields by clicking the box next to a field in the **Hidden Fields** section of the page.

| Field | Description |
|:--|:--|
| Time (`_messagetime`) | The time that the event occurred |
| Message (`_raw`) | The raw log message written to the audit index.  |
| Action | The action that was performed. Actions vary by event type. For more information, see [Audit event classes and actions](#audit-event-classes-and-actions).    |
| Class | The object affected by the event. Classes vary by event type. For more information, see [Audit event classes and actions](#audit-event-classes-and-actions). |
| Collector | Values include "InternalCollector".  |
| Interface | Indicates how the event was initiated from the Sumo UI or using an API. Values include: "UI", "API", and "INTERNAL". |
| `_sourceCategory` | The source category associated with the event type. For more information, see [Audit index source](#audit-index) categories below. |
| `_sourceHost` | IP address of the source's host, or "no_sourceHost". |
| sourceSession | The session ID associated with the event, or "no_session". |
| sourceUser | The Sumo username associated with the event.  |
| Status | The status of the action, which can be success or failure |
| Target | The object for the action, such as a key name. |

## Audit event classes and actions

The sections list the classes of objects — for example: collectors, users, and sessions—for which Sumo writes audit logs, and the actions, such as create or delete, that result in a message to the audit log.  

When you query the audit index, the search results will include the class and action for each audit log. The `class` and `action` are hidden by default. To display a hidden field, click the checkbox next to it in the **Hidden Fields** section of the **Messages** tab. You can also perform targeted searches of the audit index using the `class` and `action` fields in your query.

## Account management events

```sql
_sourceCategory=account_management
```

The table below shows the value of the `class` and `action` fields for account management events.

| Class | Actions | Product Feature |
|:--|:--|:--|
| ACCESS_KEY | CREATE<br/>ENABLE<br/>DISABLE<br/>DELETE | Access Keys |
| COLLECTOR | CREATE<br/>UPDATE<br/>UPGRADE<br/>DELETE<br/>THROTTLE | Collection |
| DATA_FORWARDING | ENABLE<br/>DISABLE | Data Forwarding |
| PASSWORD_POLICY | MODIFY | 	Password Policy |
| ROLE | CREATE<br/>MODIFY<br/>DELETE | Roles |
| USER | CREATE<br/>MODIFY<br/>DISABLE | Users |
| VOLUME_QUOTA | EXCEEDED<br/>RESET | Throttling and Ingest Budgets, see Audit Ingest Budgets for example queries. |

### Microsoft Office 365 Audit Source events

Sumo logs audit messages for Microsoft Office 365 Audit Source when the following events occur:

* Source registration success with Microsoft
* Failure to read back content from Microsoft
* Token-update failure events
* Subscription watchpoint failure events

To search for these events use this query:

```sql
_index=sumologic_audit _sourceCategory=account_management _sourceName=collector
```

The events have these formats:

**Registration success event**

`Received validation notification from Office 365 for Audit Source with ID SOURCEID, name SOURCENAME. Validation code - VALIDATIONCODE`

**Callback failure event**

`Failed to read back from Office 365 for audit source with ID SOURCEID, name SOURCENAME. Object identifier - CONTENTURI`

**Token and Subscription failure event** where **NAME** is either `token` or `watchpoint`

`Failed to refresh OAuth NAME for source SOURCENAME. Exception: EXCEPTION. Error message: ERRORMESSAGE`

### Throttling events

Status is provided to the audit index (`_index=sumologic_audit`) in the account management source category
(`_sourceCategory=account_management`) and volume quota source (`_sourceName=VOLUME_QUOTA`). The status includes the type of resource that experienced throttling in the last 15 minutes.

A scheduled search can be set up to send an alert when throttling occurs. See [Schedule a search](/docs/alerts/scheduled-searches). 

Throttling events reported include:

* **LogIngest**. Log data sent to Sumo Logic has been temporarily throttled.
* **MetricIngest**. Metric data sent to Sumo Logic has been temporarily throttled.

Throttling events are reported in the Audit Index if the following criteria are met:

* A throttling event has occurred in the last 15 minutes.
* At least 8 percent of collector sources experienced the effect of data throttling in the time interval.

For example, searching with the following query

```sql
_index=sumologic_audit
_sourceCategory=account_management _sourceName=VOLUME_QUOTA  "rate limit"
```

yields the following throttling notification.

`An automatic data ingest rate limit has been temporarily enabled for your account. (Resource type: LogIngest)`

### Amazon CloudWatch metrics throttling events

AWS automatically throttles CloudWatch data if the limits that Amazon sets for the associated APIs are exceeded.  If you have a high volume of metrics data points in your account, it is likely that Amazon will throttle your CloudWatch data.

If no adjustments are made on the Sumo Logic side, throttling on the Amazon side can cause metrics data to be dropped. To prevent this from occurring, Sumo Logic automatically doubles the CloudWatch scan interval if more than one throttling message is received in a single interval. However, the change in scan interval isn't reflected in the Sumo Logic UI. The original configured interval is still shown. See [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics.md) for instructions on setting the CloudWatch scan interval. 

When the scan interval is increased, a message is added to the audit log. No action is required by the Sumo Logic user. 

The following is an example query to locate throttling notification in the audit index.

```sql
_index=sumologic_audit _sourceCategory=account_management _sourceName=COLLECTOR
```

The query yields the following throttling notification.

```
CloudWatch source ui-cw-oldPrimary received throttling exception from AWS while querying for metrics. Increasing scan interval to 20 minutes.
```

### Audit Source OAuth Token and Watchpoints Refresh

For audit sources, Sumo Logic refreshes OAuth tokens and subscription watchpoints periodically to prevent data loss. If the refresh fails for any reason, a message is added to the audit log.

The following is an example query to locate refresh failure notification in the audit index.

```sql
_index = sumologic_audit  
_sourceCategory = "account_management" _sourceName=COLLECTOR
```

The query yields the following refresh failure notification.

```sql
Failed to refresh OAuth token for source SOURCE_NAME. Exception: com.sumologic.cocoa.api.FailedThirdPartyOperationException Error message: Status code: 400, error message: { "error": "invalid_grant", "error_description": "Token has been expired or revoked."}....
```

## User activity events

```sql
_sourceCategory=user_activity
```

The table below shows the value of the `class` and `action` fields for user activity events.

| Class | Actions |
|:--|:--|
| CONTENT_LIBRARY | CREATE<br/>DELETE<br/>MOVE<br/>COPY<br/>UPDATE (name or description)<br/>IMPORT<br/>EXPORT<br/>APP_INSTALLATION |
| FOLDER | EXPORT<br/>INSTALL<br/>DELETE<br/>IMPORT<br/>MANAGE_PERMISSIONS<br/>CREATE<br/>MOVE<br/>COPY |
| PASSWORD | MODIFY<br/>RESET |
| PREFERENCES | MODIFY |
| REPORT | UPDATE<br/>MANAGE_PERMISSIONS<br/>VIEW |
| SEARCH | CREATE<br/>UPDATE<br/>EXPORT<br/>DELETE<br/>MANAGE_PERMISSIONS |
| SESSION | LOGIN<br/>UPDATE<br/>LOGOUT |
| SOURCE | CREATE<br/>UPDATE |

### Collector upgrade events

If you upgrade or downgrade a collector through the Web UI, an entry is written to the audit index.

The status is provided to the audit index (_index=sumologic_audit) for each event in the user activity source category ( _sourceCategory=user_activity), and collector source (_sourceName=COLLECTOR), including the returned log message of success or failure.

Collector upgrade events reported for your account include the
following:

* Status (SUCCESS/FAILURE) 
* Collector Name
* From version
* To version
* Request time
* Failure reason

For example, searching with the following query:

```sql
_index=sumologic_audit _sourceCategory=user_activity _sourceName=COLLECTOR | Status
```

yields the following collector upgrade events.

```
Status: FAILURE Message: Upgrade collector yanm-mac, from version 20.1-2832,  to version 20.1-2844. request time Mon Jul 25 10:47:32 PDT 2016,  Cannot run program "/Applications/Sumo Logic Collector/jre1.8.0_92.jre/Contents/Home/bin/java":  error=2, No such file or directory
```

### Support account events

```sql
_sourceCategory=support_account_activity
```

The table below shows the value of the class and action fields for support account events.

:::note
Support account events are logged only if you have [enabled a support account](enable-support-account.md).
:::

| Class | Actions |
|:--|:--|
| SESSION | LOGIN<br/>LOGOUT |

### Scheduled search events

```sql
_sourceCategory=scheduled_search
```

The table below shows the value of the `class` and `action` fields for scheduled search events SCHEDULED_SEARCH.

| Actions | Description |
|:--|:--|
| Create | Scheduled search was created. |
| Start | Scheduled search started. |
| Finish | Scheduled search finished successfully. |
| Delete | Scheduled search was deleted. |
| Modify | The alert condition for the scheduled search was met and the alert action was fired. |
| Timeout | Scheduled search did not complete within the timeout period, which is 20 minutes to an hour, depending on the time range set for the query.<br/>For more information, see [How to Prevent your Scheduled Search from Timing Out](/docs/alerts/scheduled-searches/faq#how-to-prevent-your-scheduled-search-from-timing-out). |
| Suspend | Indicates that Sumo has suspended the search because it has timed out repeatedly.<br/><br/>When a Scheduled Search query fails, Sumo Logic attempts to run the query again two more times, for a total of three tries. If all attempts fail, then an Alert Email is sent with a notification of the failure. The Scheduled Search is not run again until the next time it is scheduled to do so.<br/><br/>The next time the Scheduled Search runs, if it fails again after the three tries, then it is suspended. Another Alert Email is sent to notify you that the query has been suspended.<br/><br/>The Scheduled Search will remain suspended for four hours for non-daily searches (for example, searches recurring every 15 minutes, every 1 hour, etc.) and for up to an extra day for a daily search (two failed executions on two days and skips the third day). |
| Skip | Scheduled search was skipped, because it was in a suspended state at a time when it was scheduled to run. For more information, see [What Happens When a Scheduled Search Is Suspended?](/docs/alerts/scheduled-searches/faq#suspended-scheduled-search) |
| Unsuspend | Indicates that Sumo has unsuspended a suspended scheduled search. |

Suspend events only occur if Sumo Logic has manually suspended a search for some reason. If you see a suspended search and feel that this is in error, contact Sumo Logic Support.

### Metric ingestion and extraction events

```sql
_sourceCategory=metrics
```

The table below shows the value of the `class` and `action` fields for metric events.

| Class | Actions | Description |
|:--|:--|:--|
| INGEST | TRUNCATE |  |
| METRIC_EXTRACTION | SKIP | A logs-to-metrics rule extracted one or more dimensions that are longer than 250 character. For more information, see [Logs-to-Metrics](/docs/metrics/logs-to-metrics). |

### Index retention period

By default, the retention period of the Audit Index is the same as the retention period of your Default Partition. You can change the retention period by editing the partition that contains the index, `sumologic_audit`. For more information, see [Edit a Partition](../partitions-data-tiers/create-edit-partition.md).
