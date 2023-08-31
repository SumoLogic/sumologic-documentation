---
id: cse-data-retention
title: Cloud SIEM Data Retention
sidebar_label: Data Retention
description: See retention periods for different types of Cloud SIEM data.
---


This topic lists the Cloud SIEM data that is retained on the Sumo Logic platform and in Cloud SIEM, and the retention period for each type of data.

## Sumo Logic platform

This table lists where, and for how long, different types of Cloud SIEM data are retained on the Sumo Logic platform.

| Data | Location   | Retention  |
| :-- | :-- | :-- |
| Raw logs | Raw logs reside in your Default Partition in Sumo Logic | The retention period defined for your Default Partition. This period is [customer-configurable](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention).  |
| Records | Records (normalized logs) are stored in the partitions whose names begin with the string `sec_records`. There is one partition for each Record type. <br/><br/>There is no additional charge for storage of Records.| 90 days |
| Signals     | Stored in the `sec_signal` partition.<br/><br/>There is no additional charge for storage of Signals.   | 2 years  |   
| Insights    | The `sumologic_system_events` partition contains Insights and Insight-related events that result from system actions. <br/> The `sumologic_audit_events` partition contains Insights and Insight-related events that result from user actions. <br/><br/>There is a charge for storage of Insight-related data in the audit indexes. Note however the volume of data is typically very low compared to log ingestion levels. | By default, these partitions have a retention period of 30 days.  This period is [customer-configurable](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention). |


### Cloud SIEM  

* Insights and Signals that are attached to Insights are retained in Cloud SIEM indefinitely.
* Signals that are not attached to Insights are retained in Cloud SIEM:
    * For 30 days if suppressed. 
    * For 365 days if unsuppressed.
* Playbook and action executions are retained in Cloud SIEM for 2 years. For those that need to ensure HIPAA compliance, we delete the data after 7 years.

### Custom retention periods

You can request retention periods different from those declared in the tables above, as long as the retention period requested is greater than 1 day and less than 5000 days.

In order to do that, open a [Support ticket](/docs/get-started/help#support) with your request.