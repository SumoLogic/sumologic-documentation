---
id: entity-criticality
title: Entity Criticality
description: You can use Entity Criticality to adjust the severity of Signals for specific Entities based on some risk factor or other consideration.

---



This page describes CSE’s Entity Criticality feature and how to use it.

You can use Entity Criticality to adjust the severity of Signals for specific Entities based on some risk factor or other consideration. For example, an executive’s laptop is likely to contain important data, so Signals related to that Entity should have a higher severity. To allow for this, you define a Criticality, which is a single arithmetic expression that will be used to adjust the severity of Signals on Entities the Criticality is assigned to. For example:

`severity+3`

A Signal’s normal severity is specified in the rule that fires the Signal. The Criticality is applied to the normal severity. To ensure that Signals that fire on your executives’ laptops have an elevated severity, you can configure a Criticality like the example above, and then apply it to the Entities that correspond to the executives’ laptops. 

Just as you can use Criticality to increase severity, you can use it to decrease the severity of the Signals fired on an Entity.

If the formula you specify results in a number that isn’t whole, the value is rounded down to the nearest integer.

## About Criticality and Insight generation

The maximum severity that can be assigned to a CSE rule is 10, so normally, Signal severity is also limited to 1. Note however that CSE doesn’t impose a maximum value on the severity that results from a Criticality, although the minimum value will always be 0. 

As described in the [Insight Generation](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) topic, an Insight is generated on an Entity based on the cumulative severity of the unique Signals that have fired on it over the previous two weeks, unless a different period is configured. The cumulative
severity is referred to as the Entity’s Activity Score. Keep in mind that higher Signal severities will increase an Entity’s Active Score and result in Insight’s being generated sooner. 

You can configure both the detection window and the threshold Activity Score for Insight generation, as described in the [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/) topic.

## Define a Criticality

1. Click the gear icon, and select **Criticalities** under **Entities**.
1. On the **Criticalities** page, click **Create**. 

    ![Criticalities.png](/img/cse/Criticalities.png)
1. The **Create Entity Criticality** popup appears.

    ![criticality-popup.png](/img/cse/criticality-popup.png)
1. **Name**. Enter a name. 
1. **Severity Expression**. Enter a formula for adjusting a severity value. You can use a plus sign (+), minus sign (-), an asterisk (\*), or a forward slash (/). Enter the formula in this format:   `severity+2 `
1. Click **Create** to save the Criticality.

## Assign a Criticality to an Entity

You can associate a Criticality with one or more Entities. 

1. Click **Entities** at the top of the CSE UI.

    ![entities-icon.png](/img/cse/entities-icon.png)
1. Navigate to the Entity you want to assign a Criticality and click on it to display the **Entity Details** page. 
1. On the **Entity Details** page, click the **Criticality** field to display a list of Criticalities.

    ![entity-details-criticality.png](/img/cse/entity-details-criticality.png)
1. Click a Criticality to apply it to the Entity.
