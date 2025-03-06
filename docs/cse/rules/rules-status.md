---
id: rules-status
title: Rules Status
sidebar_label: Rules Status
description: Learn how about Cloud SIEM rules status and how to mitigate rules in a degraded or failed state.
keywords:
  - cloud siem
  - rules
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes the status of Cloud SIEM rules and how to address rules that are in a degraded or failed state.

## View a rule's status

You can see a rule's status while viewing the rule:
* On the rule list page: <br/><img src={useBaseUrl('img/cse/rule-status-on-list-page.png')} alt="Rule status on list page" style={{border: '1px solid gray'}} width="800"/>
* On the rule details page: <br/><img src={useBaseUrl('img/cse/rule-status-on-detail-page.png')} alt="Rule status on details page" style={{border: '1px solid gray'}} width="800"/>

## Kinds of rule status

Following are the different kinds of rule statuses. A rule's status can change depending on whether it exceeds [rule limits](#rule-limits).

| Status | Description | Action required |
| :-- | :-- | :-- |
| **Active** | The rule is executing normally. | No action required. |
| **Degraded** | The rule is approaching a rule limit and it is removed from execution for one hour to allow processing to catch up. At the end of the hour, the rule is allowed to execute again and its status changes back to Active. | Click the information button <img src={useBaseUrl('img/cse/rule-degraded-info-button.png')} alt="Rule degraded information button" width="20"/> on the **Degraded** label for details. Depending on the information provided, you may want to edit the rule to reduce the chance it will become degraded again later. |
| **Disabled** | The rule was manually disabled using the toggle in the UI, or was disabled with the API. | Enable the rule with the toggle in the UI, or enable the rule with the [API](https://api.sumologic.com/docs/sec/#operation/UpdateRuleEnabled). |
| **Failed** | The rule exceeded a rule limit and was automatically disabled. | Click the information button <img src={useBaseUrl('img/cse/rule-failed-info-button.png')} alt="Rule failed information button" width="20"/> on the **Failed** label for details about the failure.  Depending on the reasons provided in the details, you may need to edit the rule to prevent it from failing again in the future. After addressing the reasons for the failure, enable the rule with the toggle in the UI, or enable the rule with the API. |
| **Warning** | The rule is approaching a rule limit and risks being disabled. | Click the information button <img src={useBaseUrl('img/cse/rule-warning-info-button.png')} alt="Rule warning information button" width="20"/> on the **Warning** label for details about the warning. Depending on the reasons provided in the details, you may need to edit the rule to prevent it from being disabled. |

## Rule limits

Limits are set on how often a rule fires so that the system is not overloaded. For example, if a rule fires too many signals in an hour, it can cause performance problems for all rule processes. If a rule exceeds a limit, its [rule status](#rule-status) changes from Active to Failed and the rule is disabled. 

| Type | Limit |
| :-- | :-- |
| Total allowed custom rules of each [rule type](#rule-types) | 100 <!-- <br/>200 - Tier 2<br/>500 - Tier 3 --> |
| Signals per hour | 50K<!-- - Tier 1<br/>100K - Tier 2<br/>150K - Tier 3 -->|
| Signals per 24 hours | 1M<!-- Tier 1<br/>2M - Tier 2<br/>3M - Tier 3 --> |
| Matched records per day* | 200K<!-- - Tier 1<br/>400K - Tier 2<br/>600K - Tier 3 --> |
| Rule group cardinality per day** | 100K<!-- - Tier 1<br/>200K - Tier 2<br/>300K - Tier 3 --> |

*Applies to all [rule types](#rule-types) except match rules. 
<br/>**Group cardinality is the number of distinct key values in a grouping function of a complex rule type. For instance, if a rule is grouped by email address, the cardinality would be the total number of distinct email addresses.

:::note
Rule limits can be higher if you are in a higher tenant tier level. If you have questions about what your tenant tier level is, contact your Sumo Logic account representative or [contact Sumo Logic Support](https://support.sumologic.com/support/s/).
:::

## Query for rule status changes

You can query audit logs for rule status changes. (For more information about querying audit logs, see [Cloud SIEM Audit Logging](/docs/cse/administration/cse-audit-logging/).)

### Example query for rule status changes

The following query queries for match rules whose status was changed automatically to `Warning` by the system:

```sql
_index=sumologic_system_events _sourceCategory=cseRule
| json field=_raw "templatedMatchRule.status"
| where eventname = "TemplatedMatchRuleUpdated" 
| where templatedMatchRule.status = "Warning"
```

You can set up this query for one or multiple rules, with one or multiple statuses.
* To query for other rule types, replace the `field` and `eventname` strings. 
* To query for for other statuses, replace `Warning` in the example above with another status. For example:
   * `"Active"`
   * `"Degraded"`
   * `"Disabled"`
   * `"Failed"`
   * `"Warning"`

### Example query for disabled rules

If you want to query simply for match rules that are disabled, you could execute a query like this:

```sql
(_index=sumologic_audit_events OR _index=sumologic_system_events) _sourceCategory=cseRule
| json field=_raw "templatedMatchRule.enabled"
| where eventname = "TemplatedMatchRuleUpdated" 
| where templatedMatchRule.enabled = "false"
```

This query looks for match rules that were manually disabled (`_index=sumologic_audit_events`) or automatically disabled by the system (`_index=sumologic_system_events`).

## Create a monitor to alert on rule status changes

You can [create a monitor](/docs/alerts/monitors/create-monitor/) to generate alerts when rules statuses change. This will alert you when you need to take action.

For example, you could use the [example query for rule status changes](#example-query-for-rule-status-changes) above in your monitor. It will alert when the status of match rules change to `Warning`. 

<img src={useBaseUrl('img/cse/example-monitor-for-rule-status-change.png')} alt="Example monitor for rule status change" style={{border: '1px solid gray'}} width="700"/>

## Degraded rules

A degraded rule is one that has had a portion of the rule shut off to prevent it from exceeding a processing limit. If you write a custom rule that becomes degraded, you must tune the rule to correct the problem.

For example, rules have a limit on the number of records per second they can evaluate.  If there is a value used in the "group by" field that causes the rule to exceed that threshold, the particular value will be ignored, but the rest of the rule is still be used. In this case, Cloud SIEM might display a message like this:

`The aggregation on the group key 'admin@company.com' has a record volume exceeding the supported limit, and has been disabled. Consider tuning the rule to exclude records producing this group key.`

To resolve a degraded rule issue, create a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions/) to address the portion of the rule causing the rule degradation.

