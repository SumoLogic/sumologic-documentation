---
id: write-first-seen-rule
title: Write a First Seen rule
sidebar_label: First Seen Rule
description: First Seen rules allow you to generate a Signal when behavior by an Entity (user) is encountered that hasn't been seen before.
keywords:
  - sumo logic
  - cloud siem
  - cse
  - first seen rule
  - behavioral analytics
---

import useBaseUrl from '@docusaurus/useBaseUrl';


This topic has information about First Seen rules and how to create them in the CSE UI.
:::tip
If you are new to writing rules, see [About CSE Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About First Seen rules
First Seen rules allow you to generate a Signal when behavior by an Entity (such as a user) is encountered that hasn't been seen before. For example, a First Seen rule might look for the events like the following:

* First time a user logged in from a new geographic location (geolocation)
* Newly created or added admin accounts
* High severity EDR alert seen for the first time
* MFA acceptance from first seen device

A First Seen rule is different from other CSE rule types in that you don’t define the criteria for firing a Signal. Instead, the rule expression in a First Seen rule is simply a filter condition that defines what incoming Records the rule will apply to. For each First Seen rule, CSE automatically creates a baseline model of normal behavior evidenced by Records that match the Rule Expression. After the baseline learning period is completed, when an incoming Record includes matching activity not seen during the baseline learning period, the rule creates a Signal.

For example, for the “First time a user logged in from a new geographic location” use case, CSE will build a baseline model of all the geolocations from where a logon event is seen for the Entity (user). Once the baselining period is complete, CSE will create a Signal for every new geolocation detected and incrementally add to the baseline.

Watch this micro lesson to learn more about First Seen rules.

<Iframe url="https://www.youtube.com/embed/ssfL_c3j_r8?rel=0"
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
The screenshot below shows a First Seen rule in the CSE rules editor. For an explanation of the configuration options, see [Configure a First Seen rule](#configure-a-first-seen-rule), below.
<img src={useBaseUrl('img/cse/first-seen-rule.jpg')} alt="Example First Seen Rule Definition"/>


## Configure a First Seen rule
This section has instructions for configuring a First Seen rule.

### If Triggered
The settings in the **If Triggered** section determine what Records the rule will be applied to and baseline-related options.

1.  **When a Record matching the expression**. Enter an expression that matches the Records that you want to rule to apply to.
1. **Has a new value for the field(s)**. Select the Record field that will be used to build the baseline.
1. **after building a [global | per Entity]** The settings in this section define the scope of the baseline that will be built.
   * **per Entity**. Baselines will be created for all entities for the Entity type or types that you'll specify in the following step. Note that a **per Entity** baseline creates a baseline for a particular Entity type. This baseline scope is typically used to track events that an Entity has never done before.
   * **global**. Baselining will be performed for all entities and not for specific Entity types. Note that **global** baselines are organizational baselines and are used to track first seen activity across all Entity types.
   :::note
   For more information about how to select the type of base line, see the [Use case](#use-case-monitor-login-from-first-seen-geolocation), below.
   :::
1. **for the following Entity(ies)**. If you selected **per Entity** above, you’ll be prompted to select one or Record fields for which you want baselines built.
   :::note
   If there is more than one entity listed, a baseline is tracked only for that distinct combination of entities.
   :::
1. Set the baseline and retention settings:
   1. **Baseline Retention Period (days)**. The number of days after which the data points in the baseline will expire (be dropped from the baseline). The default is 90 days. You can decrease this period, but not increase it.
   1. **Baseline Learning Period (days)**. The minimum amount of time for which data points should be collected before firing a Signal. The default is 30 days.
   :::note
   The **Baseline Learning Period** must be shorter than the **Baseline Retention Period**. Also be aware that short baseline learning periods can potentially generate false positive Signals.
   :::

### Then Create a Signal

For instructions, see [Configure “Then Create a Signal” settings](/docs/cse/rules/write-match-rule#configure-then-create-a-signal-settings) section of the Match Rule topic.

:::tip
Sumo Logic ensures that Rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a Rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and First Seen Rules are no exception.

On the Rule detail page, if you hover over the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.
:::

## When the baseline is reset for a First Seen rule

The baseline learning period begins again when the following fields on the rule are updated or overridden:
* **If Triggered**:
   * **When a Record matching the expression**
   * **Has a new value for the field(s)**
* **Then Create a Signal**:
   * **On Entity**

## Use case: Monitor login from first seen geolocation

This section shows how the same First Seen rule would function with each of the two baselining strategies.

Our example rule expression is:

`metadata_vendor=Okta AND normalizedAction=logon AND success=true`

with **has a new value for the field(s)** set to `srcDeviceIP_countryName`

### With a global baseline

With a global baseline, and the default baseline learning period of 30 days, the rule will baseline all geolocations that users are logging in for a period of 30 days. After the 30 day baseline is completed, if a new geolocation is detected, a Signal will be created. Then, if a new hire (that wasn’t part of the 30 day baseline) logs in from any geolocation, a Signal
will be created. As a global baseline, the 30 day baseline is shared across all Entities.

### With per-Entity baselines

With a per-Entity baseline, and the default baseline learning period of 30 days, the rule will baseline all geolocations on a per-Entity basis for 30 days. It will generate a Signal when a new geolocation is not part of a user’s historic baseline. On a new hire’s first login, a 30 day baseline will begin building. After the 30 day baseline is created, if that user logs on from a new geolocation, the rule will create a Signal.

:::tip
If you are unsure whether to use a per-Entity or a global baseline, consider your use case. If you’re inclined to select `user_username` in the **Has a new value for the field(s)** prompt, you’re better off creating a global baseline for that behavior. Alternatively, if you want to track a new value for a non-Entity Record field, a per-Entity baseline is appropriate.
:::
