---
id: tailor-global-rule
title: Tailor a Global Rule
sidebar_label: Tailor a Global Rule
description: You can override selected fields in all CSE rule types. After you have overridden a field, you can revert to the original field value.
---



This topic has instructions for tailoring global (built-in) rules in CSE. 

You can override selected rule fields in all CSE rule types: Match, Threshold, Chain and Aggregation. After you have overridden a field, you can revert to the original field value.

:::note
You cannot override fields in legacy rules—rules whose ID looks like LEGACY-*xxxxxxx*.
:::

If you want to tailor a rule expression—the expression to which incoming Records are compared—see [Rule Tuning Expressions](rule-tuning-expressions.md).

## Signal generation fields you can override

You can override any of the settings in the **Then Create a Signal** section on the right side of the rule editor.  

| Setting | Notes |
|:--|:--|
| Entity | In the **On Entity** area, you can change the Entity or Entities upon which Signals will fire when the rule is triggered.  |
| Signal name | If the **using the name** field is present, you can override the name that will be assigned to Signals fired by the rule. |
| Summary | In the **with the summary** field, you can override the description of the situation that causes the rule to fire a Signal. |
| Description | In the **with the description** field, you can override the description of what conditions the rule looks for.  |
| Severity settings | You can change the severity type from constant to dynamic and vice versa, change the severity level for a constant severity, or change the field used for dynamic severity. |
| Tags | You can add tags, but you can’t edit or delete the tags already configured for the rule. |

![then-create.png](/img/cse/then-create.png)

## “If triggered” fields you can override

You can override some of the fields in the **If Triggered** section on the left side of the Rules editor. What you can edit depends on the rule type. The table below lists the rule settings that you can override for each rule type. See [Screenshots](#screenshots) below for a visual overview.

| Rule type | What you can override |
|:--|:--|
| Match | nothing |
| Aggregation | <ul><li>grouped by—You can add and remove fields to group Records by. </li><li>within—You can change the time window over which the aggregation conditions are applied.</li></ul> |
| Chain | <ul><li>grouped by—You can add and remove fields to group Records by.</li><li>within—You can change the time window over which the aggregation conditions are applied.</li></ul> |
| Threshold | <ul><li>matches Records with ... values—You can override the number of Records that must match the rule expression.</li></ul> |

## Screenshots

| Aggregation rule | Chain Rule | Threshold rule |
|:--|:--|:--|
| ![aggregation-rule-edits.png](/img/cse/aggregation-rule-edits.png) | ![chain-rule-edits.png](/img/cse/chain-rule-edits.png) | ![thresh-rule-edits.png](/img/cse/thresh-rule-edits.png) |

## Reverting overridden settings

You can revert any overrides you’ve made at any time back to the original value (only). 

Once you save the overrides to a rule, a revert button appears next to each edited field, as shown in the screenshot below. If you hover over the revert button, you can see what the original value was.

![revert-icons.png](/img/cse/revert-icons.png)

To revert an override, just click the revert button next to it. After reverting all desired fields, click **Save Edits** at the bottom of the page. 
