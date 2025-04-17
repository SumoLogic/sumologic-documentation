---
id: write-first-seen-rule
title: Write a First Seen rule
sidebar_label: First Seen Rule
description: First seen rules allow you to generate a signal when behavior by an entity (user) is encountered that hasn't been seen before.
keywords:
  - sumo logic
  - cloud siem
  - first seen rule
  - behavioral analytics
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CseRule from '../../reuse/cse-rule-description-links.md';
import Iframe from 'react-iframe';

This topic has information about first seen rules and how to create them in the Cloud SIEM UI.
:::tip
If you are new to writing rules, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About first seen rules

First seen rules allow you to generate a signal when behavior by an entity (such as a user) is encountered that hasn't been seen before. For example, a first seen rule might look for the events like the following:

* First time a user logged in from a new geographic location (geolocation)
* Newly created or added admin accounts
* High severity EDR alert seen for the first time
* MFA acceptance from first seen device

:::sumo Micro Lesson

Watch this micro lesson to learn more about first seen rules.

<Iframe url="https://fast.wistia.net/embed/iframe/b7o3idjehp?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Cloud SIEM First Seen Rules Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/ssfL_c3j_r8?rel=0"
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

## Baselines for first seen rules

A first seen rule is different from other Cloud SIEM rule types in that you don’t define the criteria for firing a signal. Instead, the rule expression in a first seen rule is simply a filter condition that defines what incoming records the rule will apply to. For each first seen rule, Cloud SIEM automatically creates a baseline model of normal behavior for a defined time period (by default for the last 30 days) evidenced by records that match the Rule Expression. The activity found during this period is considered normal behavior and will not be alerted on. As soon as you save or update a first seen rule, the baseline is built using existing data collected. If data exists in the system to build the baseline, baseline creation typically takes only minutes to complete.

Once the baseline is created, when an incoming record includes matching activity not seen during the baseline learning period, the rule creates a signal identifying the activity as *first seen*. The signal indicates that the activity is first seen:
 
<img src={useBaseUrl('img/cse/first-seen-signal-example.png')} alt="First seen signal example" style={{border: '1px solid gray'}} width="600"/>

For example, for the “First time a user logged in from a new geographic location” use case, Cloud SIEM will build a baseline model of all the geolocations from where a logon event is seen for the entity (user). Once the baseline is created, Cloud SIEM will create a signal for every new geolocation detected and incrementally add to the baseline.

:::tip
Sumo Logic ensures that rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and first seen rules are no exception.

On the rule detail page, if you view the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.

For more information, see [Troubleshoot baseline problems](/docs/cse/rules/rules-status/#troubleshoot-baseline-problems).
:::

## Example rule

The screenshot below shows a first seen rule in the Cloud SIEM rules editor. For an explanation of the configuration options, see [Create a first seen rule](#create-a-first-seen-rule), below.

<img src={useBaseUrl('img/cse/first-seen-rule.png')} alt="Example first seen rule definition" style={{border: '1px solid gray'}} width="700"/>

## Create a first seen rule

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**. 
1. On the **Create a Rule** page, click **Create** in the **First Seen** card.
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default, the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming records until you’ve tested it. <br/><img src={useBaseUrl('img/cse/empty-first-seen-rule.png')} alt="First seen rule" style={{border: '1px solid gray'}} width="600"/>

### Configure "If Triggered" settings

The settings in the **If Triggered** section determine what records the rule will be applied to and baseline-related options.

1.  **When a Record matching the expression**. Enter an expression that matches the records that you want to rule to apply to.
1. Click **Test Rule Expression** to test it against existing records in Cloud SIEM. The **If Triggered** section expands, and Cloud SIEM searches for records that match the rule expression. If there are no matching records, you'll see a **There aren't any matches for the expression** message. If no matches were returned, try changing the time range.
1. Select **Add Tuning Expression** if you want to add a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions) to the rule.
    :::note
    If you use **Test Rule Expression** on a rule that has one or more rule tuning expressions, you can test it without the tuning expressions, or with selected tuning expressions.
    :::
1. **has a new value for the field(s)**. Select the record field that will be used to build the baseline.
1. **after building a [global | per Entity] baseline** The settings in this section define the scope of the baseline that will be built.
   * **global**. Baselining will be performed for all entities and not for specific entity types. Note that global baselines are organizational baselines and are used to track first seen activity across all entity types.
   * **per Entity**. Baselines will be created for all entities for the entity type or types that you specify in **for the following**. Note that a per entity baseline creates a baseline for a particular entity type. This baseline scope is typically used to track events that an entity has never done before. If you select more than one entity,a baseline is tracked only for that distinct combination of entities.
   :::note
   For more information about how to select the type of base line, see the [Use case](#use-case-monitor-login-from-first-seen-geolocation), below.
   :::
1. Set the baseline and retention settings:
   1. **Baseline Retention Period (days)**. The number of days after which the data points in the baseline will expire (be dropped from the baseline). The minimum is 0, and the maximum is 90. The default is 90 days. 
   1. **Baseline Learning Period (days)**. The minimum amount of time for which data points should be collected before firing a signal. The default is for the last 30 days.
   :::note
   The **Baseline Learning Period** must be shorter than the **Baseline Retention Period**. Also be aware that short baseline learning periods can potentially generate false positive signals.
   :::

### Configure "Then Create a Signal" settings

1. Click **Show Advanced** if you want the rule to [override global signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#override-global-signal-suppression).
1. **On Entity**. Select the entity field—for example, an IP address, MAC address, hostname, and so on—in the record that the resulting signal should be associated with. (In Cloud SIEM, an insight is a set of signals with the same entity field.) Select a value from the pull-down list. 
1. **with the name**. Define the name for signals fired by the rule. You can enter text, and include record fields from the custom token list. Including record field values in the signal name can make it more meaningful.
    :::note
    For extracted fields, you can specify a token for an extracted field using the format `{{fields["<field_name>"]}}`.
    :::
1. **with the description**. Define the description for the signal the same way you did the signal name, using text and record fields. The signal description should be a good indication of what the rule looks for.
   :::note
   <CseRule/>
   :::
1. **using the summary**. Enter a brief summary describing what causes the rule to create a signal.
1. **and a constant severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest). Every signal that the rule fires will have the same severity.
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like rules, insights, signals, entity. You can also search for and filter items by tag. Tags you set here will be automatically set on any signals created from this rule, and inherited by any insights generated from those signals.

## When the baseline is reset for a first seen rule

Baseline creation begins again when the following fields on the rule are updated or overridden:
* **If Triggered**:
   * **When a Record matching the expression**
   * **Has a new value for the field(s)**
* **Then Create a Signal**:
   * **On Entity**

If data exists in the system to build the baseline, baseline creation typically takes only minutes to complete.

## Use case: Monitor login from first seen geolocation

This section shows how the same first seen rule would function with each of the two baselining strategies.

Our example rule expression is:

`metadata_vendor=Okta AND normalizedAction=logon AND success=true`

with **has a new value for the field(s)** set to `srcDeviceIP_countryName`

### With a global baseline

With a global baseline, and the default baseline learning period of the last 30 days, the rule creates a baseline of all geolocations that users logged in from for the last 30 days. If a new geolocation is detected, a signal will be created. Then, if a new hire (that wasn’t part of the 30 day baseline) logs in from any geolocation, a signal
will be created. As a global baseline, the 30 day baseline is shared across all entities.

### With per-entity baselines

With a per-entity baseline, and the default baseline learning period of the last 30 days, the rule creates a baseline of all geolocations on a per-entity basis for the last 30 days. It will generate a signal when a new geolocation is not part of a user’s historic baseline. On a new hire’s first login, a baseline for the last 30 days will begin rebuilding. If that user logs on from a new geolocation, the rule will create a signal.

:::tip
If you are unsure whether to use a per-entity or a global baseline, consider your use case. If you’re inclined to select `user_username` in the **Has a new value for the field(s)** prompt, you’re better off creating a global baseline for that behavior. Alternatively, if you want to track a new value for a non-entity record field, a per-entity baseline is appropriate.
:::
