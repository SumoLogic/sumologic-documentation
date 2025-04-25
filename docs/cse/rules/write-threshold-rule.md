---
id: write-threshold-rule
title: Write a Threshold Rule
sidebar_label: Threshold Rule
description: Learn how to write a threshold rule.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CseRule from '../../reuse/cse-rule-description-links.md';
import Iframe from 'react-iframe';

This topic has information about the threshold rules and how to create them in the Cloud SIEM UI.

If you are new to writing rules, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.

## About threshold rules

A threshold rule fires when its rule expression is matched at least a certain number of times during a specified length of time. For example, if there are five or more failed login attempts for the same IP address within one hour. 

:::sumo Micro Lesson

Watch this micro lesson to learn how to create a threshold rule.

<Iframe url="https://fast.wistia.net/embed/iframe/04ymrxo93q?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Create a Threshold Rule in Cloud SIEM Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/uei_TDOy5QM?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
-->

:::

## Create a threshold rule

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**. 
1. On the **Create a Rule** page, click **Create** in the **Threshold** card. 
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming records until you’ve tested it.  <br/><img src={useBaseUrl('img/cse/threshold.png')} alt="Threshold rule" style={{border: '1px solid gray'}} width="600"/>

### Configure “If Triggered” settings

1. **When a Record matches the expression**. Enter the rule expression, a boolean expression that when “true”, causes the rule to fire.
    :::note
    You can expand the field template guide, which contains a list of all the fields that Cloud SIEM can normalize to v3 of the Cloud SIEM Schema. Note that the existence of a field in the guide doesn't mean that your ingested records necessarily include that field.
    :::
1. Click **Test Rule Expression** to test it against existing records in Cloud SIEM. The **If Triggered** section expands, and Cloud SIEM searches for records that match the rule expression. If there are no matching records, you'll see a **There aren't any matches for the expression** message. If no matches were returned, try changing the time range.
1. **matches at least *n* Record**. Select how many records must match the rule expression during the interval you specify below, in the **within** option.
1. **within...**. Select the duration within which the rule expression must evaluate to “true” more than the number of times specified in **matches at least n Record** for the rule to fire a signal.
1. Select **Add Tuning Expression** if you want to add a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions) to the rule.
    :::note
    If you use **Test Rule Expression** on a rule that has one or more rule tuning expressions, you can test it without the tuning expressions, or with selected tuning expressions.
    :::
1. **Show advanced**. Click this link at the top of the **If Triggered** tab to display advanced options. When you select these options, the **If Triggered** area refreshes, displaying additional fields. <br/><img src={useBaseUrl('img/cse/advanced-threshold.png')} alt="Advanced section of threshold rule" style={{border: '1px solid gray'}} width="400"/>
    1. **Count only distinct values for a field.** Configure this option if you only want to count the number of records that contain  distinct values of a particular record field, instead of just counting records that match your rule expression. Use the **for field** dropdown list to select the desired field. 
    1. **Group by one or more fields.** By default, a threshold rule implicitly groups by the entity field you’ll select below when configuring the **Then Create a Signal** options. You can select additional “group by” fields with the **matches grouped by** option, so that a signal is only created if the count for the group is above the threshold count specified above. 

### Configure “Then Create a Signal” settings

:::note
When you're configuring a threshold and chain rule, you do not supply a signal name; a signal fired by those rule types has the same name as the rule that fired it.
:::

1. Click **Show Advanced** if you want the rule to [override global signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#override-global-signal-suppression).
1. **On Entity**. Select the entity field—for example, an IP address, MAC address, hostname, and so on—in the record that the resulting signal should be associated with. (In Cloud SIEM, an insight is a set of signals with the same entity field.) Select a value from the pull-down list. 
1. **with the summary**. Enter a brief summary describing what causes the rule to create a signal.
1. **with the description**. Define the description for the signal. You can use text and record fields. The signal description should be a good indication of what the rule looks for.
   :::note
   <CseRule/>
   :::
1. **with a severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest).
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like rules, insights, signals, and entities. You can also search for and filter items by tag. For more information, see [Using Tags with Insights, Signals, Entities, and Rules](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules).

## Save as prototype
If you are not sure that your rule is ready for prime time, you can save it as a prototype. A prototype rule generates signals, but those signals won't contribute to insights. (Signals generated by a prototype rule do not increment the rule's **On Entity** entity's Activity Score.) Running the rule as a prototype for a while allows you to determine whether the rule is too noisy and fires too many signals.

To make the rule a prototype, click the box next to **Save this rule as a prototype**. When you are satisfied with the rule's behavior you can uncheck the box.

## Duplicate signals?
If you determine that a threshold, chain, or aggregation rule is firing identical signals for the same conditions during the same time interval, there’s a likely explanation. This situation can arise due to how these rule types are processed: they are evaluated differently than match rules, because they support time duration conditions. For example, a threshold rule fires when its rule expression is matched at least a certain number of times during a specified length of time.

To successfully apply a rule across a sliding time window, Cloud SIEM evaluates records across overlapping time spans. Consider a rule that requires three matches across five minutes. With non-overlapping windows, we could detect one match at the end of one time window, and two more in the following time window. This should cause the rule to fire a signal, but would not, because the required five minute span is split between two evaluation windows. Overlapping evaluation windows solves this problem. In some cases though, it can also result in duplicate signals. However, as long as you don’t run the rule as a prototype, duplicate signals will be suppressed, as described in [About Signal Suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression).
