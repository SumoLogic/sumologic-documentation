---
id: rule-tuning-expressions
---

# Rule Tuning Expressions

This topic has instructions for creating and using tuning expressions for Rules.

## What’s a rule tuning expression?

Every CSE rule has a rule expression, to which incoming Records are compared. When a Record matches a rule expression, and other rule criteria are satisfied, the rule generates a Signal. Like a rule expression, a tuning expression is matched against incoming Records. The difference is, if a Record matches a Rule’s tuning expression in addition to its rule expression, the rule will not generate a Signal.

As an example, consider the following rule expression, which detects that an attempt was made to clear the Windows Security Event Log.

```
metadata_vendor = 'Microsoft' and metadata_product = 'Windows' and metadata_deviceEventId = 'Security-1102' and fields['Provider.Name'] = 'Microsoft-Windows-Eventlog'
```

If you don’t want the rule to generate a Signal if the person performing the action is “jdoe”, you can add a tuning expression like this to the rule:

`user_userId != jdoe`

The tuning expression is AND’d with the rule expression—the rule will only generate a Signal if a Record matches both expressions. 

Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule. The benefit of using a tuning expression, over the copy and edit method, is that when CSE updates built-in rules, your tuning expressions are preserved. This division of logic means that you don’t need to create as many custom rules. If you use tuning expressions in combination with multi-entity rules you’ll further reduce the need for custom rules.   

:::tip
There is another benefit of using tuning built-in rules instead of writing custom rules: you get the benefit of CSE's [Global Confidence](../records-signals-entities-insights/global-intelligence-security-insights.md) model. This feature leverages crowd-sourced learning to help security analysts triage and prioritize Insights. 
:::

You can apply multiple tuning expressions to a rule. You can assign a tuning expression to selected rules, or to all of your rules. You can also create a tuning expression without immediately assigning it to any rules.

## Example tuning expression

Here’s what the example tuning expression looks like in the CSE UI.

![example-expression.png](/img/cse/example-expression.png)

## Create a tuning expression

1. Select **Rule Tuning** from the **Content** menu.

    [rule-tuning-option.png](/img/cse/rule-tuning-option.png)
1. On the **Rule Tuning** page, click **Create**.

    ![rule-tuning-page.png](/img/cse/rule-tuning-page.png)
1. The **New Rule Tuning Expression** page appears.

    ![annotated-expression.png](/img/cse/annotated-expression.png)
1. **Name**. Enter a name for the tuning expression. 
1. **Tune \[selected\|all\] Rules**. Choose whether you want to apply the tuning expression to all of your rules, or only selected rules. 
1. If you chose  “selected” in the previous step, follow the instructions in [Apply tuning expression to selected rules](#apply-tuning-expression-to-selected-rules). If you chose “all”, follow the instructions in [Apply tuning expression to all rules](#apply-tuning-expression-to-all-rules).

### Apply tuning expression to selected rules

1. In the **Type to add a rule** area, enter a search string that matches Rule names or Rule IDs. To search by Rule name, you can enter a string that the Rule name contains. To search by Rule ID, you can enter the complete ID, or a subset of the ID, starting with the leading character.  The name and ID of rules that match will appear on the page.
1. In the **To only match Records...** area, enter a tuning expression. 
1. Click **Submit**.

    ![selected-rules.png](/img/cse/selected-rules.png)

### Apply tuning expression to all rules

1. In the **To only match Records...** area, enter a tuning expression. 
1. Click **Submit**.

    ![all-option.png](/img/cse/all-option.png)

### Create tuning expression without applying it to rules

If you want to create a tuning expression and not apply it to any rules immediately, follow the instructions in [Apply tuning expression to selected rules](#apply-tuning-expression-to-selected-rules), but do not enter anything in the **Type to add a rule** area.

## Create and manage tuning expressions on rule page

You can also create new tuning expression and apply existing tuning expressions to a rule using the **Rules Editor** UI.

![tuning.png](/img/cse/tuning.png)

## Enabling and disabling a tuning expression

When you create a tuning expression it is enabled by default. If you disable a tuning expression, rules that it is applied to will behave as if the tuning expression does not exist. 

You can toggle the enablement state of a tuning expression on the **Rule Tuning** page using the control to the left of the delete icon.

![enable-on-list.png](/img/cse/enable-on-list.png)

You can also toggle the enablement state on the details page for a tuning expression.

![enable-on-details.png](/img/cse/enable-on-details.png)

## Testing tuning expressions

When you test a [rule expression](about-cse-rules.md) by clicking **Test Rule** in the rules editor, any tuning expressions assigned to the rule will be included in the test. If you don't want to test the tuning expressions, you can deselect one or more of the tuning expressions before clicking **Test Rule.**

![tuning-checkbox.png](/img/cse/tuning-checkbox.png)

 
