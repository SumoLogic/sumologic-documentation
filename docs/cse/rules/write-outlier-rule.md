---
id: write-outlier-rule
title: Write an Outlier rule
sidebar_label: Outlier Rule
description: Outlier rules allow you to generate a Signal when behavior by an Entity (such as a user) is encountered that qualifies as an outlier from expected behavior.
keywords:
  - cloud siem
  - cse
  - outlier rule
  - behavioral analytics
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This topic has information about Outlier rules and how to create them in the CSE UI.

:::tip
If you are new to writing rules, see [About CSE Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About Outlier rules
Outlier rules allow you to generate a Signal when behavior by an Entity (such as a user) is encountered that deviates from its baseline activity. For example, an Outlier rule might look for the events like the following:

* Spike in login failures from a user
* Abnormal number of high severity endpoint alerts
* Spike in EC2 instance creation
* Abnormal volume of data sent to third-party storage

An Outlier rule is different from other CSE rule types in that the threshold for firing a signal is learned from the baseline. The rule expression in an Outlier rule is simply a filter condition that defines what incoming Records the rule will apply to. For each Outlier rule, CSE automatically creates a baseline model of normal behavior evidenced by Records that match the Rule Expression and the aggregate function for a specific time window. After the baseline learning period is completed, activity that deviates from the mean (normal baseline behavior) creates a Signal.

For example, for the [spike in failed logins from a user](#use-case-for-a-spike-in-failed-logins-from-a-user) use case, CSE builds a baseline model of counts of authentication failures that are associated with a user over time. Once the baselining period is complete, CSE creates a Signal for every deviation from the mean observed in the time windows and incrementally add to the baseline.

## Example rule
The screenshot below shows an Outlier rule in the CSE rules editor. For an explanation of the configuration options, see [Configure an Outlier rule](#configure-an-outlier-rule), below.

<img src={useBaseUrl('img/cse/outlier-rule.png')} alt="Example Outlier Rule Definition"/>


## Configure an Outlier rule
This section has instructions for configuring an Outlier rule.

### If triggered
The settings in the **If triggered** section are divided into two subsections, one for providing Baseline configuration, and the other for Outlier model configuration.

**Baseline Configuration**
1. **For the records matching the expression**. Enter an expression that matches the Records that you want to rule to apply to.
1. **build a daily/hourly baseline**. Select the time window for building the baseline. It can either be a daily or hourly baseline.
1. **for the entity(ies)**. Select one or more Record fields for which you want baselines built. Selecting multiple fields will build a distinct baseline for a combination of entities.
1. Set the baseline and retention settings:
   1. **Baseline Retention Period (days)**. The number of days after which the data points in the baseline will expire (be dropped from the baseline). The default is 90 days. You can decrease this period, but not increase it.
   1. **Baseline Learning Period (days)**. The minimum amount of time for which data points should be collected before firing a Signal. The default is 30 days.
   :::note
   The **Baseline Learning Period** must be shorter than the **Baseline Retention Period**. Also be aware that short baseline learning periods may generate false positive Signals.
   :::

**Outlier Model Configuration**
1. **Detect an outlier for**. Select the aggregate function that applies to the field in the matched Records to build a normal behavior baseline on.
1. **of the Record field**. Select one or more Record fields to build a baseline on and detect an Outlier Signal.
1. **Advanced Expression** (optional). When selected, disables the record field selector and allows defining Record fields within the field window.
1. **Model Sensitivity Threshold** (1-5). Select the sensitivity of the model defined above. This is the number of standard deviations from the mean that the outlier model should consider for creating a Signal. Lower threshold corresponds to a more sensitive model resulting in more Signals.
1. **Minimum Count Value** (default value 1). Enter the absolute minimum value below which an Outlier Signal will not be generated.

### Then create a Signal

For instructions, see [Configure “Then Create a Signal” settings](/docs/cse/rules/write-match-rule/#configure-then-create-a-signal-settings) section of the Match Rule topic.

:::tip
Sumo Logic ensures that Rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a Rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and Outlier rules are no exception.

On the Rule detail page, if you hover over the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.
:::

## Use case for a spike in failed logins from a user

This section shows how an Outlier rule would function with a daily baseline.

**Baseline Configuration**
*  Our example rule expression is: `normalizedAction=logon AND success=false`
* **To build a** `daily` **baseline**
* **for the entity(ies)**: `user_username`

**Outlier Model Configuration**
* **Detect an outlier for the** `count`

   When the `count` function is used, the occurrences of rule expression on each record is used to build the normal behavior baseline. You do not need to input a record filed in case of `count`.

   For all the other aggregation types, the Record field is an expected input.

* **Model Sensitivity Threshold**: 3
* **Minimum Count Value**: 10

 :::tip
 If you are unsure what to set the minimum count value to from the default value of 1, consider providing the value which is beyond the normal acceptable behavior for a given time window for a particular entity. The **Minimum Count Value** is geared towards false positive reduction and improving the fidelity of Signals generated, and will vary based upon the use case and type of logs collected.
 :::
