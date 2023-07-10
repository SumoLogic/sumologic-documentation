---
id: write-threshold-rule
title: Write a Threshold Rule
sidebar_label: Threshold Rule
description: Learn how to write a Threshold rule.
---

This topic has information about the Threshold rules and how to create them in the CSE UI.

If you are new to writing rules, see [About CSE Rules](about-cse-rules.md) for information about rule expressions and other rule options.

## About Threshold rules

A Threshold rule fires when its rule expression is matched at least a certain number of times during a specified length of time. For example, if there are five or more failed login attempts for the same IP address within one hour. 

Watch this micro lesson to learn how to create a Threshold rule.

<Iframe url="https://www.youtube.com/embed/uei_TDOy5QM?rel=0"
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

## Create a Threshold rule

1. Choose **Rules** from the Content menu.
1. On the **Create a Rule** page, click **Create** in the **Threshold** card. 
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming Records until you’ve tested it.       
    ![threshold.png](/img/cse/threshold.png)

## Configure “If Triggered” settings

1. **When the expression**. Enter the rule expression, a boolean expression that when “true”, causes the rule to fire.

    :::note
    You can expand the field template guide, which contains a list of all the fields that CSE can normalize to v3 of the CSE Schema. Note that the existence of a field in the guide doesn't mean that your ingested Records necessarily include that field.
    :::

1. **matches *n* Record**. Select how many Records must match the rule expression during the interval you specify below, in the **within** option.
1. **within**. Select the duration within which the rule expression must evaluate to “true” more than the number of times specified in **matches n Record** for the rule to fire a Signal.
1. **Show advanced**. Click this link, in the upper right corner of the **If Triggered** area, to display advanced options. When you checkmark an advanced option, the **If Triggered** area refreshes, displaying additional fields.

    ![advanced-threshold.png](/img/cse/advanced-threshold.png)
1. **Count only distinct values for a field.** Configure this option if you only want to count the number of Records that contain  distinct values of a particular Record field, instead of just counting Records that match your rule expression. Use the **for field** dropdown list to select the desired field. 
1. **group by one or more fields.** By default, a threshold rule implicitly groups by the entity field you’ll select below when configuring the **Then Create a Signal** options. You can select additional “group by” fields with the **matches grouped by** option, so that a Signal is only created if the count for the group is above the threshold count specified above. 

## Test your rule expression
After creating a rule expression, you can test it against existing Records in CSE.

1. Click **Test Rule** above the rule expression.
1. The **If Triggered** section expands, and CSE searches for Records that match the rule expression. If there are no matching Records, you'll see a **There aren't any matches for the expression** message.
1. If no matches were returned, try changing the time range.

:::note
If you use the Test Rule feature on a rule that has one or more [Rule Tuning Expressions](rule-tuning-expressions.md), you can test it without the tuning expressions, or with selected tuning expressions.
:::

## Configure “Then Create a Signal” settings

:::note
When you're configuring a Threshold and Chain rule, you don't supply a Signal name; a Signal fired by those rule types has the same name as the rule that fired it.
:::

1. **On Entity**. Select the Entity field—for example, an IP address, MAC address, hostname, and so on—in the Record that the resulting Signal should be associated with. (In CSE, an Insight is a set of Signals with the same Entity field.) Select a value from the pull-down list. 
1. **with the summary**. Enter a brief summary describing what causes the Rule to create a Signal.
1. **with the description**. Define the description for the Signal. You can use text and Record fields. The Signal description should be a good indication of what the rule looks for.
1. **with a severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest).
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like Rules, Insights, Signals, and Entities. You can also search for and filter items by tag. For more information, see [Using Tags with Insights, Signals, Entities, and Rules](../records-signals-entities-insights/tags-insights-signals-entities-rules.md).

## Save as prototype
If you are not sure that your rule is ready for prime time, you can save it as a prototype. A prototype rule generates Signals, but those Signals won't contribute to Insights. (Signals generated by a prototype rule do not increment the rule's **On Entity** entity's Activity Score.) Running the rule as a prototype for a while allows you to determine whether the rule is too noisy and fires too many Signals.

To make the rule a prototype, click the box next to **Save this rule as a prototype**. When you are satisfied with the rule's behavior you can uncheck the box.

## Duplicate Signals?
If you determine that a Threshold, Chain, or Aggregation rule is firing identical Signals for the same conditions during the same time interval, there’s a likely explanation. This situation can arise due to how these rule types are processed: they are evaluated differently than Match rules, because they support time duration conditions. For example, a Threshold rule fires when its rule expression is matched at least a certain number of times during a specified length of time.

To successfully apply a rule across a sliding time window, CSE evaluates Records across overlapping time spans. Consider a rule that requires three matches across five minutes. With non-overlapping windows, we could detect one match at the end of one time window, and two more in the following time window. This should cause the rule to fire a Signal, but would not, because the required five minute span is split between two evaluation windows. Overlapping evaluation windows solves this problem. In some cases though, it can also result in duplicate Signals. However, as long as you don’t run the rule as a prototype, duplicate Signals will be suppressed, as described in [About Signal Suppression](../records-signals-entities-insights/about-signal-suppression.md).
