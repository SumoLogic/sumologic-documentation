---
id: write-match-rule
title: Write a Match Rule
sidebar_label: Match Rule
description: Learn how to write a match rule.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about Match rules and how to create them in the CSE UI.

:::tip
If you are new to writing rules, see [About CSE Rules](about-cse-rules.md) for information about rule expressions and other rule options.
:::

## About Match rules

A Match rule is the simplest type of CSE rule. Each time a single Record matches the rule expression, a Signal is fired. 

A Match rule doesn’t allow you to define other conditions for Signal, like requiring multiple Records to match the rule expression, or looking for events of the different types within a timespan.

Here’s an example of the rule expression for a Match rule:

```sql
metadata_vendor = 'Amazon AWS' AND metadata_product = 'CloudTrail' AND metadata_deviceEventId = 'AwsApiCall-CreateUserPoolClient'
```

This rule fires a Signal each time a UserPoolClient, which has permission to call unauthenticated API operations, is created.

Watch this micro lesson to learn how to create a Match rule.

<Iframe url="https://www.youtube.com/embed/l7xOBls1ROE?rel=0"
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

## Create a Match rule

1. Choose **Rules** from the Content menu.
1. On the **Create a Rule** page, click **Create** in the **Match** card.
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default, the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming Records until you’ve tested it. <br/>![match.png](/img/cse/match.png)

## Configure "Then Create a Signal" settings

1. **On Entity**. Select the Entity field—for example, an IP address, MAC address, hostname, and so on—in the Record that the resulting Signal should be associated with. (In CSE, an Insight is a set of Signals with the same Entity field.) Select a value from the pull-down list. 
1. **using the name**. Define the name for Signals fired by the rule. You can enter text, and include Record fields from the custom token list. Including Record field values in the Signal name can make it more meaningful.
    :::note
    * When you're configuring a Threshold and Chain rule, you don't supply a Signal name; a Signal fired by those rule types has the same name as the rule that fired it.
    * For extracted fields, you can specify a token for an extracted field using the format `{{fields["<field_name>"]}}`.
    :::
1. **with the summary**. Enter a brief summary describing what causes the Rule to create a Signal.
1. **with the description**. Define the description for the Signal the same way you did the Signal name, using text and Record fields. The Signal description should be a good indication of what the rule looks for.
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


## Test your rule expression
After creating a rule expression, you can test it against existing Records in CSE.

1. Click **Test Rule** above the rule expression.
1. The **If Triggered** section expands, and CSE searches for Records that match the rule expression. If there are no matching Records, you'll see a **There aren't any matches for the expression** message.
1. If no matches were returned, try changing the time range.

:::note
If you use the Test Rule feature on a rule that has one or more [Rule Tuning Expressions](rule-tuning-expressions.md), you can test it without the tuning expressions, or with selected tuning expressions.
:::


## Save as prototype
If you are not sure that your rule is ready for prime time, you can save it as a prototype. A prototype rule generates Signals, but those Signals won't contribute to Insights. (Signals generated by a prototype rule do not increment the rule's **On Entity** entity's Activity Score.) Running the rule as a prototype for a while allows you to determine whether the rule is too noisy and fires too many Signals.

To make the rule a prototype, click the box next to **Save this rule as a prototype**. When you are satisfied with the rule's behavior you can uncheck the box.

 
