---
id: cse-data-retention
title: CSE Data Retention 
sidebar_label: Data Retention 
description: See retention periods for different types of CSE data.
---


This topic lists the CSE data that is retained on the Sumo Logic platform and in CSE, and the retention period for each type of data. 

## Sumo Logic platform 

This table lists where, and for how long, different types of CSE data are retained on the Sumo Logic platform.

| Data | Location   | Retention  | 
| :-- | :-- | :-- |
| Raw logs | Raw logs reside in your Default Partition in Sumo Logic | The retention period defined for your Default Partition. This period is [customer-configurable](docs/manage/partitions-data-tiers/manage-indexes-variable-retention.md).  | 
| CSE Records | Records (normalized logs) are stored in the partitions whose names begin with the string `sec_records`. There is one partition for each Record type. | 90 days |
| CSE Signals     | `sec_signal` partition   | 2 years  |   
| CSE Insights    | The `sumologic_system_events` partition contains Insights and Insight-related events that result from system actions. <br/> The sumologic_audit_events partition contains Insights and Insight-related events that result from user actions. | By default, these partitions have a retention period of 30 days.  This period is [customer-configurable](docs/manage/partitions-data-tiers/manage-indexes-variable-retention.md). |



### CSE  

* Insights and Signals that are attached to Insights are retained in CSE indefinitely.
* Signals that are not attached to Insights are retained in CSE:
    * For 90 days if suppressed. (As of October 1, 2022, this will change to 30 days.)
    * For 365 days if unsuppressed.