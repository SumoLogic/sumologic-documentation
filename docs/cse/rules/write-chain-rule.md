---
id: write-chain-rule
title: Write a Chain Rule
sidebar_label: Chain Rule
description: Learn how to write a chain rule.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CseRule from '../../reuse/cse-rule-description-links.md';
import Iframe from 'react-iframe'; 


This topic has information about chain rules and how to create them in the Cloud SIEM UI.

:::note
If you are new to writing rules, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About chain rules

A chain rule is similar to a threshold rule. A threshold rule fires when one rule expression is matched at least a certain number times during a specified length of time. In a chain rule you configure two more rule expressions, and for each expression, the number of matches that are required for the rule to fire a signal. The interval you define within which the matches must occur applies to all of the rule expressions in the rule.

:::sumo Micro Lesson

Watch this micro lesson to learn how to create a chain rule.

<Iframe url="https://fast.wistia.net/embed/iframe/tuf8pb4hc8?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Create a Chain Rule in Cloud SIEM Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/58h2mVnw1oE?rel=0"
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

## Create a chain rule

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**. 
1. On the **Create a Rule** page, click **Create** in the **Chain** card. 
1. In the rules editor:
   1. **Name.** Enter a name for the rule. Signals fired by the rule will have this name.
   1. **Enabled**. By default the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming records until you’ve tested it. <br/><img src={useBaseUrl('img/cse/chain.png')} alt="Chain rule" style={{border: '1px solid gray'}} width="600"/>

### Configure “If Triggered” settings

1. **When at least ... Record matches expression**. Enter two or more rule expressions. For each, select the number of matches that are required.
1. For each rule expression, click **Test Rule Expression** to test it against existing records in Cloud SIEM. The **If Triggered** section expands, and Cloud SIEM searches for records that match the rule expression. If there are no matching records, you'll see a **There aren't any matches for the expression** message. If no matches were returned, try changing the time range.
1. **grouped by**.  By default, a chain rule implicitly groups by the entity field you’ll select below when configuring the **Then Create a Signal** options. You can select additional “group by” fields with the matches grouped by option, so that a signal is only created if the count for the group is above the threshold count specified above. 
1. **in ... order.** Choose either:
      * **any** if matches can occur in any order.
      * **exact** if matches must occur in the same order as you have ordered the rule expressions. If you choose this option, you can only have two rule expressions.
1. **within...**. Select the duration within which the rule expression must evaluate to “true” more than the number of times specified in **When at least n Record matches expression** for the rule to fire a signal.
1. Select **Add Tuning Expression** if you want to add a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions) to the rule.
    :::note
    If you use **Test Rule Expression** on a rule that has one or more rule tuning expressions, you can test it without the tuning expressions, or with selected tuning expressions.
    :::

### Configure “Then Create a Signal” settings

1. Click **Show Advanced** if you want the rule to [override global signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#override-global-signal-suppression).
1. **On Entity**. Define the entity field — for example, an IP address, hostname, and so on — in the record that the resulting signal should be associated with. (In Cloud SIEM, an insight is a set of signals with the same entity field.) Select a value from the pull-down list. 
1. **with the summary.** Enter a brief summary describing what causes the rule to create a signal.
1. **with the description**. Enter a description for the signal. The signal description should be a good indication of what the rule looks for.
   :::note
   <CseRule/>
   :::
1. **with a severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest).
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like rules, insights, signals, and entities. You can also search for and filter items by tag. For more information, see [Using Tags with Insights, Signals, Entities, and Rules](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules).

## Save as prototype
If you are not sure that your rule is ready for prime time, you can save it as a prototype. A prototype rule generates signals, but those signals won't contribute to insights. (Signals generated by a prototype rule do not increment the rule's **On Entity** entity's Activity Score.) Running the rule as a prototype for a while allows you to determine whether the rule is too noisy and fires too many signals.

To make the rule a prototype, click the box next to **Save this rule as a prototype**. When you are satisfied with the rule's behavior you can uncheck the box.

### Duplicate signals?
If you determine that a threshold, chain, or aggregation rule is firing identical signals for the same conditions during the same time interval, there’s a likely explanation. This situation can arise due to how these rule types are processed: they are evaluated differently than match rules, because they support time duration conditions. For example, a threshold rule fires when its rule expression is matched at least a certain number of times during a specified length of time.

To successfully apply a rule across a sliding time window, Cloud SIEM evaluates records across overlapping time spans. Consider a rule that requires three matches across five minutes. With non-overlapping windows, we could detect one match at the end of one time window, and two more in the following time window. This should cause the rule to fire a signal, but would not, because the required five minute span is split between two evaluation windows. Overlapping evaluation windows solves this problem. In some cases though, it can also result in duplicate signals. However, as long as you don’t run the rule as a prototype, duplicate signals will be suppressed, as described in [About Signal Suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression).
