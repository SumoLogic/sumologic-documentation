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

This topic has information about Outlier rules and how to create them in the Cloud SIEM UI.

:::tip
If you are new to writing rules, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About Outlier rules

Outlier rules allow you to generate a Signal when behavior by an Entity (such as a user) is encountered that deviates from its baseline activity. 

For each Outlier rule, you create a filter condition to look for out-of-the-ordinary behavior that could indicate risk. For example, an Outlier rule might look for the events like the following:

* Spike in login failures from a user
* Abnormal number of high severity endpoint alerts
* Spike in EC2 instance creation
* Abnormal volume of data sent to third-party storage

When you create the rule, you can set the amount of time Cloud SIEM analyzes data to create a baseline model of behavior, with the default period being 30 days. You can set the rule to build data hourly or daily, depending on how frequently you believe events of interest will occur, and how much data you want to gather. Data for the baseline is retained by default for 90 days. In the rule, you set the model sensitivity threshold to calculate outlier activity based on the number of standard deviations from the mean (z‑score). 

After the baseline period completes, Cloud SIEM tracks aggregates of count, sum, min, max, and averages of Record values, and creates a Signal when deviations from the mean occurs. For example, for the [spike in failed logins from a user](#use-case-for-a-spike-in-failed-logins-from-a-user) use case, Cloud SIEM builds a baseline model of counts of authentication failures that are associated with a user over time, and creates a Signal when outlier behavior is detected:

<img src={useBaseUrl('img/cse/outlier-signal-example.png')} alt="Outlier signal example" width="600"/>

Watch this micro lesson to learn more about Outlier rules.

<Iframe url="https://www.youtube.com/embed/1HEUPWpDA_o?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

## Example rule
The screenshot below shows an Outlier rule in the Cloud SIEM rules editor. For an explanation of the configuration options, see [Configure an Outlier rule](#configure-an-outlier-rule), below.

<img src={useBaseUrl('img/cse/outlier-rule.png')} alt="Example Outlier Rule Definition"/>


## Configure an Outlier rule
This section has instructions for configuring an Outlier rule.

### If Triggered
The settings in the **If Triggered** section are divided into two subsections, one for providing Baseline configuration, and the other for Outlier model configuration.

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
1. **of the record field**. Select one or more Record fields to build a baseline on and detect an Outlier Signal.
1. **Advanced Expression** (optional). When selected, disables the **of the record field** selector and allows defining Record fields within the field window. For the expression, you can use the syntax described in [Cloud SIEM Rules Syntax](/docs/cse/rules/cse-rules-syntax/). <br/>For example, in the out-of-the-box **Spike in PowerShell Command Line Length From Host** outlier rule, the **Advanced Expression** field is set to `length(commandLine)` to calculate when you see very long command lines out of the ordinary. 
1. **Model Sensitivity Threshold** (1-5). Select the sensitivity of the model defined above. This is the number of standard deviations from the mean that the outlier model should consider for creating a Signal. Lower threshold corresponds to a more sensitive model resulting in more Signals.
1. **Minimum Count Value** (default value 1). Enter the absolute minimum value below which an Outlier Signal will not be generated.

### Then Create a Signal

For instructions, see [Configure “Then Create a Signal” settings](/docs/cse/rules/write-match-rule/#configure-then-create-a-signal-settings) section of the Match Rule topic.

:::tip
Sumo Logic ensures that Rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a Rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and Outlier rules are no exception.

On the Rule detail page, if you hover over the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.
:::

## When the baseline is reset for an Outlier rule

The baseline learning period begins again when the following fields on the rule are updated or overridden:
* **Baseline Configuration**:
   * **For the records matching the expression**
   * **build a daily/hourly baseline**
   * **for the entity(ies)**
* **Outlier Model Configuration**:
   * **Detect an outlier for**
   * **of the Record field**

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
