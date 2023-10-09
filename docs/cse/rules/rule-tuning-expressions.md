---
id: rule-tuning-expressions
title: Rule Tuning Expressions
sidebar_label: Rule Tuning
description: Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for creating and using tuning expressions for Rules.

## What’s a rule tuning expression?

Every CSE rule has a rule expression, to which incoming Records are compared. When a Record matches a rule expression, and other rule criteria are satisfied, the rule generates a Signal. A rule tuning expression allows you to extend a rule expression. A rule tuning expression is combined with a rule expression—either with a logical AND or NOT—and the rule will only generate a Signal if a Record matches the combined expression.  

As an example, consider the following rule expression, which detects that an attempt was made to clear the Windows Security Event Log.

```
metadata_vendor = 'Microsoft' and metadata_product = 'Windows' and metadata_deviceEventId = 'Security-1102' and fields['Provider.Name'] = 'Microsoft-Windows-Eventlog'
```

If you don’t want the rule to generate a Signal if the person performing the action is “jdoe”, you can add a tuning expression like this to the rule, and configure the tuning expression to exclude Records that match the tuning expression.

`user_userId = "jdoe"`

Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule. The benefit of using a tuning expression, over the copy and edit method, is that when CSE updates built-in rules, your tuning expressions are preserved. This division of logic means that you don’t need to create as many custom rules. If you use tuning expressions in combination with multi-entity rules you’ll further reduce the need for custom rules.   

:::tip
There is another benefit of using tuning built-in rules instead of writing custom rules: you get the benefit of CSE's [Global Confidence](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights) model. This feature leverages crowd-sourced learning to help security analysts triage and prioritize Insights. 
:::

You can apply multiple tuning expressions to a rule. You can assign a tuning expression to selected rules, or to all of your rules. You can also create a tuning expression without immediately assigning it to any rules.

Watch this micro lesson to learn how to create a rule tuning expression.

<Iframe url="https://www.youtube.com/embed/3BUKLtJtPI8?rel=0"
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

## Writing a tuning expression

Writing a tuning expression is just like writing a rule expression. A tuning expression can use metadata, record fields, and CSE [rules language](/docs/cse/rules/cse-rules-syntax) functions. For more information, see [About rule expressions](/docs/cse/rules/about-cse-rules#About_rule_expressions).

## Example tuning expression

Here’s what the example tuning expression looks like in the CSE UI.

<img src={useBaseUrl('img/cse/example-expression.png')} alt="Example expression" width="800"/>

## Create a tuning expression

1. Select **Rule Tuning** from the **Content** menu.
    <br/><img src={useBaseUrl('img/cse/rule-tuning-option.png')} alt="Rule tuning option" width="800"/>
1. On the **Rule Tuning** page, click **Create**.
    <br/><img src={useBaseUrl('img/cse/rule-tuning-page.png')} alt="Rule tuning page" width="800"/>
1. The **New Rule Tuning Expression** page appears.
    <br/><img src={useBaseUrl('img/cse/annotated-expression.png')} alt="Annotated expression" width="800"/>
1. **Name**. Enter a name for the tuning expression. 
1. In the **Tune [selected|all] Rules** section: 
   * To apply the expression to all rules, choose **all**.
   * To apply the expression to some but not all rules, choose **selected**. In the **Type to add a rule area**, enter a search string that matches Rule names or Rule IDs. To search by Rule name, you can enter a string that the Rule name contains. To search by Rule ID, you can enter the complete ID, or a subset of the ID, starting with the leading character.  The name and ID of rules that match will appear on the page..
1. In the **To \[include|exclude\]... area**:
   * Leave **include** selected if you want Signals to be fired for Records that match both the rule expression and the tuning expression.
   * Select **exclude** from the pulldown if you want Signals to be fired for Records that match the rule expression and don't match the tuning expression.
1. Enter a tuning expression.
2. Click **Submit**.
   <br/><img src={useBaseUrl('img/cse/new-expression.png')} alt="New expression" width="800"/>

### Create tuning expression without applying it to rules

If you want to create a tuning expression and not apply it to any rules immediately, follow the instructions in [Create a tuning expression](#create-a-tuning-expression), but do not enter anything in the **Type to add a rule** area.

## Create and manage tuning expressions on rule page

You can also create new tuning expression and apply existing tuning expressions to a rule using the **Rules Editor** UI.

<img src={useBaseUrl('img/cse/tuning.png')} alt="Add tuning expression" width="800"/>

## Enabling and disabling a tuning expression

When you create a tuning expression it is enabled by default. If you disable a tuning expression, rules that it is applied to will behave as if the tuning expression does not exist. 

You can toggle the enablement state of a tuning expression on the **Rule Tuning** page using the control to the left of the delete icon.

<img src={useBaseUrl('img/cse/enable-on-list.png')} alt="Enable on list page" width="800"/>

You can also toggle the enablement state on the details page for a tuning expression.

<img src={useBaseUrl('img/cse/enable-on-details.png')} alt="Enable on details page" width="800"/>


## Testing tuning expressions

When you test a [rule expression](/docs/cse/rules/about-cse-rules#about-rule-expressions) by clicking **Test Rule** in the rules editor, any tuning expressions assigned to the rule will be included in the test. If you don't want to test the tuning expressions, you can deselect one or more of the tuning expressions before clicking **Test Rule.**

<img src={useBaseUrl('img/cse/tuning-checkbox.png')} alt="Test rule" width="400"/>

 
