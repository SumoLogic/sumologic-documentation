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
import CseRule from '../../reuse/cse-rule-description-links.md';

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

<img src={useBaseUrl('img/cse/outlier-signal-example.png')} alt="Outlier signal example" style={{border: '1px solid gray'}} width="600"/>

After your rule starts generating Signals, evaluate them to determine if they truly represent outliers of concern, and adjust the rule settings as needed. For example, if too many Signals are being generated, the baseline model is too sensitive, and you need to set the model sensitivity threshold higher on the rule; if too few Signals are generated, set the threshold lower. Among other things, also evaluate if the Signals from outliers are generating enough Insights. To [generate an Insight](/docs/cse/get-started-with-cloud-siem/insight-generation-process/), by default the combined severity scores of Signals need to be 12 or higher. Change the severity level in the Outlier rule to ensure that it is high enough to generate enough Signals to trigger Insights for investigation.

:::tip
Sumo Logic ensures that Rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a Rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and Outlier rules are no exception.

On the Rule detail page, if you hover over the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.
:::

Watch this micro lesson to learn more about Outlier rules.

<Iframe url="https://www.youtube.com/embed/1HEUPWpDA_o?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

## Example rule

The screenshot below shows an Outlier rule in the Cloud SIEM rules editor. For an explanation of the configuration options, see [Create an Outlier rule](#create-an-outlier-rule), below.

<img src={useBaseUrl('img/cse/outlier-rule.png')} alt="Example Outlier Rule Definition" style={{border: '1px solid gray'}} width="800" />


## Create an Outlier rule

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**. 
1. On the **Create a Rule** page, click **Create** in the **Outlier** card.
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default, the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming Records until you’ve tested it. <br/><img src={useBaseUrl('img/cse/empty-outlier-rule.png')} alt="Outlier rule" style={{border: '1px solid gray'}} width="600"/>

### Configure "If Triggered" settings

The settings in the **If Triggered** section are divided into two subsections, one for providing Baseline configuration, and the other for Outlier model configuration.

**Baseline Configuration**
1. **For the records matching the expression**. Enter an expression that matches the Records that you want to rule to apply to.
1. Click **Test Rule Expression** to test it against existing Records in Cloud SIEM. The **If Triggered** section expands, and Cloud SIEM searches for Records that match the rule expression. If there are no matching Records, you'll see a **There aren't any matches for the expression** message. If no matches were returned, try changing the time range.
1. Select **Add Tuning Expression** if you want to add a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions) to the rule.
    :::note
    If you use **Test Rule Expression** on a rule that has one or more rule tuning expressions, you can test it without the tuning expressions, or with selected tuning expressions.
    :::
1. **build a daily/hourly baseline**. Select the time window for building the baseline. It can either be a daily or hourly baseline.
1. **for the entity(ies)**. Select one or more Record fields for which you want baselines built. Selecting multiple fields will build a distinct baseline for a combination of entities.
1. Set the baseline and retention settings:
   1. **Baseline Retention Period (days)**. The number of days after which the data points in the baseline will expire (be dropped from the baseline). The default is 90 days. You can decrease this period, but not increase it.
   1. **Baseline Learning Period (days)**. The minimum amount of time for which data points should be collected before firing a Signal. The default is 30 days.
   :::note
   The **Baseline Learning Period** must be shorter than the **Baseline Retention Period**. Also be aware that short baseline learning periods may generate false positive Signals.
   :::

**Outlier Model Configuration**
1. **Detect an outlier for the**. Select the aggregate function that applies to the field in the matched Records to build a normal behavior baseline on.
1. **of the record field**. Select one or more Record fields to build a baseline on and detect an Outlier Signal.
1. **Advanced Expression** (optional). When selected, disables the **of the record field** selector and allows defining Record fields within the field window. For the expression, you can use the syntax described in [Cloud SIEM Rules Syntax](/docs/cse/rules/cse-rules-syntax/). <br/>For example, in the out-of-the-box **Spike in PowerShell Command Line Length From Host** outlier rule, the **Advanced Expression** field is set to `length(commandLine)` to calculate when you see very long command lines out of the ordinary. 
1. **Model Sensitivity Threshold** (1-5). Select the sensitivity of the model defined above. This is the number of standard deviations from the mean that the outlier model should consider for creating a Signal. Lower threshold corresponds to a more sensitive model resulting in more Signals.
1. **Minimum Count Value** (default value 1). Enter the absolute minimum value below which an Outlier Signal will not be generated.

### Configure "Then Create a Signal" settings

1. Click **Show Advanced** if you want the rule to [override global Signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#override-global-signal-suppression).
1. **On Entity**. Select the Entity field—for example, an IP address, MAC address, hostname, and so on—in the Record that the resulting Signal should be associated with. (In Cloud SIEM, an Insight is a set of Signals with the same Entity field.) Select a value from the pull-down list. 
1. **with the name**. Define the name for Signals fired by the rule. You can enter text, and include Record fields from the custom token list. Including Record field values in the Signal name can make it more meaningful.
    :::note
    For extracted fields, you can specify a token for an extracted field using the format `{{fields["<field_name>"]}}`.
    :::
1. **with the description**. Define the description for the Signal the same way you did the Signal name, using text and Record fields. The Signal description should be a good indication of what the rule looks for.
   :::note
   <CseRule/>
   :::
1. **using the summary**. Enter a brief summary describing what causes the Rule to create a Signal.
1. **and a constant severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest). Every Signal that the rule fires will have the same severity.
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like Rules, Insights, Signals, Entities. You can also search for and filter items by tag. Tags you set here will be automatically set on any Signals created from this rule, and inherited by any insights generated from those signals.

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
