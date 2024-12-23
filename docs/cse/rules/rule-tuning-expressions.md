---
id: rule-tuning-expressions
title: Rule Tuning Expressions
sidebar_label: Rule Tuning
description: Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for creating and using tuning expressions for rules.

## What’s a rule tuning expression?

Every Cloud SIEM rule has a rule expression, to which incoming records are compared. When a record matches a rule expression, and other rule criteria are satisfied, the rule generates a signal. A rule tuning expression allows you to extend a rule expression. A rule tuning expression is combined with a rule expression—either with a logical AND or NOT—and the rule will only generate a signal if a record matches the combined expression.  

As an example, consider the following rule expression, which detects that an attempt was made to clear the Windows Security Event Log.

```
metadata_vendor = 'Microsoft' and metadata_product = 'Windows' and metadata_deviceEventId = 'Security-1102' and fields['Provider.Name'] = 'Microsoft-Windows-Eventlog'
```

If you don’t want the rule to generate a signal if the person performing the action is “jdoe”, you can add a tuning expression like this to the rule, and configure the tuning expression to exclude records that match the tuning expression.

`user_userId = "jdoe"`

Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule. The benefit of using a tuning expression, over the copy and edit method, is that when Cloud SIEM updates built-in rules, your tuning expressions are preserved. This division of logic means that you don’t need to create as many custom rules. If you use tuning expressions in combination with multi-entity rules you’ll further reduce the need for custom rules.   

:::tip
There is another benefit of using tuning built-in rules instead of writing custom rules: you get the benefit of Cloud SIEM's [Global Confidence](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights) model. This feature leverages crowd-sourced learning to help security analysts triage and prioritize insights. 
:::

You can apply multiple tuning expressions to a rule. You can assign a tuning expression to selected rules, or to all of your rules. You can also create a tuning expression without immediately assigning it to any rules.

### Example tuning expression

Here’s what the example tuning expression looks like in the Cloud SIEM UI.

<img src={useBaseUrl('img/cse/example-expression.png')} alt="Example expression" style={{border: '1px solid gray'}} width="700"/>

## Writing a tuning expression

Writing a tuning expression is just like writing a rule expression. A tuning expression can use metadata, record fields, and Cloud SIEM [rules language](/docs/cse/rules/cse-rules-syntax) functions. For more information, see [About rule expressions](/docs/cse/rules/about-cse-rules#about-rule-expressions).

Watch this micro lesson to learn how to create a rule tuning expression.

<Iframe url="https://www.youtube.com/embed/3BUKLtJtPI8?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

## Create a tuning expression

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rule Tuning**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rule Tuning**. You can also click the **Go To...** menu at the top of the screen and select **Rule Tuning**. 
1. On the **Rule Tuning** page, click **Create**.
1. The **New Rule Tuning Expression** page appears.
    <br/><img src={useBaseUrl('img/cse/annotated-expression.png')} alt="Annotated expression" style={{border: '1px solid gray'}} width="800"/>
1. **Name**. Enter a name for the tuning expression. 
1. **Description**. Enter a description of the tuning expression.
1. In the **Tune [selected|all] Rules** section:
   * To apply the expression to all rules, choose **all**.
   * To apply the expression to some but not all rules, choose **selected**. In the **Type to add a rule area**, enter a search string that matches rule names or rule IDs. To search by rule name, you can enter a string that the rule name contains. To search by rule ID, you can enter the complete ID, or a subset of the ID, starting with the leading character.  The name and ID of rules that match will appear on the page..
1. In the **To \[include|exclude\]... area**:
   * Leave **include** selected if you want signals to be fired for records that match both the rule expression and the tuning expression.
   * Select **exclude** from the pulldown if you want signals to be fired for records that match the rule expression and do not match the tuning expression.
1. Enter a tuning expression.
1. Click **Submit**.

### Create tuning expression without applying it to rules

If you want to create a tuning expression and not apply it to any rules immediately, follow the instructions in [Create a tuning expression](#create-a-tuning-expression), but do not enter anything in the **Type to add a rule** area.

## Create and manage tuning expressions on rule page

You can also create new tuning expression and apply existing tuning expressions to a rule using the **Rules Editor** UI.

<img src={useBaseUrl('img/cse/tuning.png')} alt="Add tuning expression" style={{border: '1px solid gray'}} width="400"/>

## Enabling and disabling a tuning expression

When you create a tuning expression it is enabled by default. If you disable a tuning expression, rules that it is applied to will behave as if the tuning expression does not exist. 

You can toggle the enablement state of a tuning expression on the **Rule Tuning** page using the control to the left of the delete icon.

<img src={useBaseUrl('img/cse/enable-on-list.png')} alt="Enable on list page" style={{border: '1px solid gray'}} width="800"/>

You can also toggle the enablement state on the details page for a tuning expression.

<img src={useBaseUrl('img/cse/enable-on-details.png')} alt="Enable on details page" style={{border: '1px solid gray'}} width="800"/>


## Testing tuning expressions

When you test a [rule expression](/docs/cse/rules/about-cse-rules#about-rule-expressions) by clicking **Test Rule** in the rules editor, any tuning expressions assigned to the rule will be included in the test. If you do not want to test the tuning expressions, you can deselect one or more of the tuning expressions before clicking **Test Rule.**

<img src={useBaseUrl('img/cse/tuning-checkbox.png')} alt="Test rule" style={{border: '1px solid gray'}} width="600"/>

 
