---
id: write-match-rule
title: Write a Match Rule
sidebar_label: Match Rule
description: Learn how to write a match rule.
---



This topic has information about the Match rules and how to create them in the CSE UI.

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

## Create a Match rule

1. Choose **Rules** from the Content menu.
1. On the **Create a Rule** page, click **Create** in the **Match** card. 

    ![select-rule-type.png](/img/cse/select-rule-type.png)
1. In the rules editor:
   1. **Name**. Enter a name for the rule.
   1. **Enabled**. By default the rule will be enabled. It's good practice to use the slider to disable the rule so that it won’t be applied to incoming Records until you’ve tested it.              

    ![match.png](/img/cse/match.png)

## Configure "Then Create a Signal" settings

1. **On Entity**. Select the Entity field—an IP address, MAC address, hostname, or username—in the Record that the resulting Signal should be associated with. (In CSE, an Insight is a set of Signals with the same Entity field.) Select a value from the pull-down list. 
1. **using the name**. Define the name for Signals fired by the rule. You can enter text, and include Record fields from the custom token list. Including Record field values in the Signal name can make it more meaningful.

    :::note
    When you're configuring a Threshold and Chain rule, you don't supply a Signal name; a Signal fired by those rule types has the same name as the rule that fired it.
    :::

1. **with the summary**.
1. **with the description**. Define the description for the Signal the same way you did the Signal name, using text and Record fields. The Signal description should be a good indication of what the rule looks for.
1. **with a severity of**. Severity is an estimate of the criticality of the detected activity, from 1 (lowest) to 10 (highest). There are several ways to specify Severity.

   * **Constant**. If you want every Signal that the rule fires to have the same severity, choose Constant, and select a severity level.  

    ![constant-severity.png](/img/cse/constant-severity.png)

   * **Dynamic**. Choose Dynamic if you want to base the severity level on a value of a field in the Record. Use the down arrows to display a list of fields, and select one. If you want the severity to be exactly the value of the field, you’re done. If you want to assign a different severity value based on the value of the Record field you selected, click Configure Mappings and see the instructions below.  

    ![dynamic-severity.png](/img/cse/dynamic-severity.png)

   * **Dynamic with mappings**. On the popup that appears: 

     * **Default Signal Severity**. Enter or select a default severity to assign if the selected Record field does not contain a value.
     * **Record Value**. Enter a value that the selected Record field supports.
     * **Signal Severity**. Enter a value, from 0 to 10, inclusive.
     * The **Record Value** and **Signal Severity** fields refresh. Continue adding field and severity values until you’re done.      

    ![dynamic-rule-mappings.png](/img/cse/dynamic-rule-mappings.png)
1. **with tags**. If desired, you can add metadata tags to your rule. Tags are useful for adding context to items like Rules, Insights, Signals, Entities. You can also search for and filter items by tag.

## Test your rule expression
After creating a rule expression, you can test it against existing Records in CSE.

1. Click **Test Rule** above the rule expression.
1. The **If Triggered** section expands, and CSE searches for Records that match the rule expression. If there are no matching Records, you'll see a **There aren't any matches for the expression** message.
1. If no matches were returned, try changing the time range.

:::note
If you use the Test Rule feature on a rule that has one or more [Rule Tuning Expressions](rule-tuning-expressions.md), you can test it without the tuning expressions, or with selected tuning expressions.
:::

## Configure “Then Create a Signal” settings
If you determine that a Threshold, Chain, or Aggregation rule is firing identical Signals for the same conditions during the same time interval, there’s a likely explanation. This situation can arise due to how these rule types are processed: they are evaluated differently than Match rules, because they support time duration conditions. For example, a Threshold rule fires when its rule expression is matched at least a certain number times during a specified length of time.

To successfully apply a rule across a sliding time window, CSE evaluates Records across overlapping time spans. Consider a rule that requires three matches across five minutes. With non-overlapping windows, we could detect one match at the end of one time window, and two more in the following time window. This should cause the rule to fire a Signal, but would not, because the required five minute span is split between two evaluation windows. Overlapping evaluation windows solves this problem. In some cases though, it can also result in duplicate Signals. However, as long as you don’t run the rule as a prototype, duplicate Signals will be suppressed, as described in Automatic suppression of redundant Signals. 

## Save as prototype
If you are not sure that your rule is ready for prime time, you can save it as a prototype. A prototype rule generates Signals, but those Signals won't contribute to Insights. (Signals generated by a prototype rule do not increment the rule's **On Entity** entity's Activity Score.) Running the rule as a prototype for a while allows you to determine whether the rule is too noisy and fires too many Signals.

To make the rule a prototype, click the box next to **Save this rule as a prototype**. When you are satisfied with the rule's behavior you can uncheck the box.

 
