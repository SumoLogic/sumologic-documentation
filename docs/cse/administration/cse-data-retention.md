---
id: cse-data-retention
title: Cloud SIEM Data Retention
sidebar_label: Data Retention
description: See retention periods for different types of Cloud SIEM data.
---


This topic describes how long different kinds of Cloud SIEM data are retained.

| Data | Partition location   | Retention in the partition | Viewable in Cloud SIEM|
| :-- | :-- | :-- | :-- |
| Insights    | The [`sumologic_system_events` partition](/docs/cse/administration/cse-audit-logging/) contains insights and insight-related events that result from system actions. <br/><br/> The [`sumologic_audit_events` partition](/docs/cse/administration/cse-audit-logging/) contains insights and insight-related events that result from user actions. <br/><br/>There is a charge for storage of insight-related data in the audit indexes. Note however the volume of data is typically very low compared to log ingestion levels. | 30 days<br/><br/>This period is [customer-configurable](/docs/manage/partitions/manage-indexes-variable-retention). | Indefinitely <br/><br/>Playbook and action executions on insights are viewable in Cloud SIEM for 2 years. For customers who need to ensure HIPAA compliance, we remove that data after 7 years. |
| Signals     | Stored in the [`sec_signal` partition](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo/#partition-for-cloud-siem-signals).<br/>There is no additional charge for storage of signals.   | 2 years  |  Signals that are attached to insights are viewable in Cloud SIEM indefinitely. <br/><br/>Signals that are not attached to insights are viewable in Cloud SIEM for 30 days if suppressed, and for 1 year if unsuppressed. |
| Records | Records (normalized logs) are stored in the partitions whose names begin with the string [`sec_records`](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo). There is one partition for each record type. <br/>There is no additional charge for storage of records.| 90 days | Records attached to signals are viewable in Cloud SIEM as long as the signals are viewable (see above). Records not attached to signals are viewable for only 90 days. |
| Raw logs | Raw logs reside in your [default partition](/docs/manage/partitions/run-search-against-partition/#search-the-default-partition) in Sumo Logic. | The retention period defined for your default partition. This period is [customer-configurable](/docs/manage/partitions/manage-indexes-variable-retention).  | Raw logs are not viewable in Cloud SIEM. (Data from raw logs is normalized before appearing as records in Cloud SIEM.) |

## Custom retention periods

You can request retention periods different from those declared in the table above, as long as the retention period requested is greater than 1 day and less than 5000 days.

In order to do that, open a [Support ticket](/docs/get-started/help#support) with your request.