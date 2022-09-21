---
id: cse-data-retention
title: CSE Data Retention 
sidebar_label: Data Retention 
description: See retention periods for different types of CSE data.
---


This topic lists the CSE data that is retained on the Sumo Logic platform and in CSE, and the retention period for each type of data. 

## Sumo Logic platform 

This table lists where, and for how long, different types of CSE data are retained on the Sumo Logic platform.

<table>
  <tr>
   <td>Data
   </td>
   <td>Location
   </td>
   <td>Retention
   </td>
  </tr>
  <tr>
   <td>Raw logs
   </td>
   <td>Raw logs reside in your Default Partition in Sumo Logic
   </td>
   <td>The retention period defined for your Default Partition. This period is [customer-configurable](docs/manage/partitions-and-data-tiers/manage-indexes-variable-retention).md). 
   </td>
  </tr>
  <tr>
   <td>CSE Records
   </td>
   <td>Records (normalized logs) are stored in the partitions whose names begin with the string <code>sec_records</code>. There is one partition for each Record type.
   </td>
   <td>90 days
   </td>
  </tr>
  <tr>
   <td>CSE Signals
   </td>
   <td><code>sec_signal</code> partition
   </td>
   <td>2 years
   </td>
  </tr>
  <tr>
   <td>CSE Insights
   </td>
   <td>The <code>sumologic_system_events</code> partition contains Insights and Insight-related events that result from system actions. <br/>The <code>sumologic_audit_events</code> partition contains Insights and Insight-related events that result from user actions.
   </td>
   <td>By default, these partitions have a retention period of 30 days. This period is [customer-configurable](docs/manage/partitions-and-data-tiers/manage-indexes-variable-retention).md). 
   </td>
  </tr>
</table>

### CSE  

* Insights and Signals that are attached to Insights are retained in CSE indefinitely.
* Signals that are not attached to Insights are retained in CSE:
    * For 90 days if suppressed. (As of October 1, 2022, this will change to 30 days.)
    * For 365 days if unsuppressed.