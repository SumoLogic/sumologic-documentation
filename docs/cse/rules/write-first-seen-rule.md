---
id: write-first-seen-rule
title: Write a First Seen rule
sidebar_label: First Seen Rule
description: First Seen rules allow you to generate a Signal when behavior by an Entity (user) is encountered that hasn't been seen before.
keywords:
  - sumo logic
  - cloud siem
  - first seen rule
  - behavioral analytics
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CseRule from '../../reuse/cse-rule-description-links.md';


This topic has information about First Seen rules and how to create them in the Cloud SIEM UI.
:::tip
If you are new to writing rules, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules) for information about rule expressions and other rule options.
:::

## About First Seen rules
First Seen rules allow you to generate a Signal when behavior by an Entity (such as a user) is encountered that hasn't been seen before. For example, a First Seen rule might look for the events like the following:

* First time a user logged in from a new geographic location (geolocation)
* Newly created or added admin accounts
* High severity EDR alert seen for the first time
* MFA acceptance from first seen device

A First Seen rule is different from other Cloud SIEM rule types in that you don’t define the criteria for firing a Signal. Instead, the rule expression in a First Seen rule is simply a filter condition that defines what incoming Records the rule will apply to. For each First Seen rule, Cloud SIEM automatically creates a baseline model of normal behavior evidenced by Records that match the Rule Expression. After the baseline learning period is completed, when an incoming Record includes matching activity not seen during the baseline learning period, the rule creates a Signal.

For example, for the “First time a user logged in from a new geographic location” use case, Cloud SIEM will build a baseline model of all the geolocations from where a logon event is seen for the Entity (user). Once the baselining period is complete, Cloud SIEM will create a Signal for every new geolocation detected and incrementally add to the baseline.

:::tip
Sumo Logic ensures that Rule processing does not impact the reliability of production environments through the implementation of "circuit breakers." If a Rule matches too many records in too short a period of time, the circuit breaker will trip and the rule will move to a degraded state, and First Seen Rules are no exception.

On the Rule detail page, if you hover over the degraded message, you will usually see more details about what tripped the circuit breaker and how to resolve the problem. Generally speaking, a rule that is degraded probably needs to be tuned for your specific environment.
:::

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
The screenshot below shows a First Seen rule in the Cloud SIEM rules editor. For an explanation of the configuration options, see [Configure a First Seen rule](#configure-a-first-seen-rule), below.
<img src={useBaseUrl('img/cse/first-seen-rule.jpg')} alt="Example First Seen Rule Definition"/>


## Create a First Seen rule

1. Choose **Rules** from the Content menu.
1. On the **Create a Rule** page, click **Create** in the **First Seen** card.
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default, the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming Records until you’ve tested it. 
   
<img src={useBaseUrl('img/cse/empty-first-seen-rule.png')} alt="First Seen rule" width="600"/>

### Configure "If Triggered" settings

The settings in the **If Triggered** section determine what Records the rule will be applied to and baseline-related options.

1.  **When a Record matching the expression**. Enter an expression that matches the Records that you want to rule to apply to.
1. Click **Test Rule Expression** to test it against existing Records in Cloud SIEM. The **If Triggered** section expands, and Cloud SIEM searches for Records that match the rule expression. If there are no matching Records, you'll see a **There aren't any matches for the expression** message. If no matches were returned, try changing the time range.
1. Select **Add Tuning Expression** if you want to add a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions) to the rule.
    :::note
    If you use **Test Rule Expression** on a rule that has one or more rule tuning expressions, you can test it without the tuning expressions, or with selected tuning expressions.
    :::
1. **has a new value for the field(s)**. Select the Record field that will be used to build the baseline.
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

### Configure "Then Create a Signal" settings

1. Click **Show Advanced** if you want the rule to [override global Signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#override-global-signal-suppression).
1. **On Entity**. Select the Entity field—for example, an IP address, MAC address, hostname, and so on—in the Record that the resulting Signal should be associated with. (In Cloud SIEM, an Insight is a set of Signals with the same Entity field.) Select a value from the pull-down list. 
1. **using the name**. Define the name for Signals fired by the rule. You can enter text, and include Record fields from the custom token list. Including Record field values in the Signal name can make it more meaningful.
    :::note
    For extracted fields, you can specify a token for an extracted field using the format `{{fields["<field_name>"]}}`.
    :::
1. **with the summary**. Enter a brief summary describing what causes the Rule to create a Signal.
1. **with the description**. Define the description for the Signal the same way you did the Signal name, using text and Record fields. The Signal description should be a good indication of what the rule looks for.
   :::note
   <CseRule/>
   :::
1. **with a severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest). There are two ways to specify Severity:
   * **Constant**. Every Signal that the rule fires will have the same severity,
   * **Dynamic**. Severity is based on the value of a field in the Record.
1. **Configure constant severity**. Choose **Constant**, and select a severity level. Then, proceed to Step 8. <br/><img src={useBaseUrl('img/cse/constant-severity.png')} alt="constant-severity.png" width="325"/>
1. **Configure dynamic severity**.
   1. Choose **Dynamic**.
   1. The severity area updates. <br/><img src={useBaseUrl('img/cse/dyamic-severity-field.png')} alt="dyamic-severity-field.png" width="450"/>
   1. **severity of**. Use the pulldown to select a default severity value.
   1. **for the record field**. Use the down arrows to display a list of fields, and select one.  The dynamic severity will be based on the value of (or existence of) that field in the Record that matched the rule expression.
   1. The **Add More Mappings** option appears. <br/><img src={useBaseUrl('img/cse/add-more-mappings.png')} alt="add more mappings" width="450"/>
   1. **Click Add More Mappings**. (Optional) You can define additional mappings if desired. If you don’t, the severity value will be the value of the Record field you selected above.
   1. The **if the value is** option appears.<br/><img src={useBaseUrl('img/cse/if-the-value-is.png')} alt="if-the-value-is.png" width="450"/>
   1. Select one of the following options:
      * **equal to**. The Record field’s value must exactly match the string or numeric value you supply. For example "equal to 4" will match "4" and “4.0” but not “4.01”.
      * **less than**. The Record field’s value must be less than the numeric value you supply. The match is not inclusive. For example "less than 5" will match “4.9” but not “5”.
      * **greater than**. The Record field’s value must be greater than the numeric value you supply. The match is not inclusive. For example "greater than “5" will match “5.1”, but not “5”.
      * **between**. The Record field’s value must be between the two numeric values you supply. The match is inclusive. For example, "Between 5 and 10" will match “5”, “7”, or “10”, but not “10.1”.
      * **not in the record**. Will match when the attribute is found in the Record. For example, if the selected field is `broirc_value`, and that field is not present in a Record, the rule will match. If `broirc_value` exists but is null or empty, the rule will not match.
   1. You can define additional conditions, as desired. To define an additional condition, repeat the steps above, starting with **Add More Mappings**.
   :::note
   The conditions you define will be processed in the order you define them. Once a match occurs, processing stops–remaining conditions are ignored.
   :::
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like Rules, Insights, Signals, Entities. You can also search for and filter items by tag. Tags you set here will be automatically set on any Signals created from this rule, and inherited by any insights generated from those signals.

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
