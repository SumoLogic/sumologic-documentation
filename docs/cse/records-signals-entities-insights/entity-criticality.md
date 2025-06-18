---
id: entity-criticality
title: Entity Criticality
description: You can use entity criticality to adjust the severity of signals for specific Entities based on some risk factor or other consideration.

---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes Cloud SIEM’s entity criticality feature and how to use it.

You can use entity criticality to adjust the severity of signals for specific entities based on some risk factor or other consideration. For example, an executive’s laptop is likely to contain important data, so signals related to that entity should have a higher severity. To allow for this, you define a criticality, which is a single arithmetic expression that will be used to adjust the severity of signals on entities the criticality is assigned to. For example: `severity+3`

A signal’s normal severity is specified in the rule that fires the signal. The criticality is applied to the normal severity. To ensure that signals that fire on your executives’ laptops have an elevated severity, you can configure a criticality like the example above, and then apply it to the entities that correspond to the executives’ laptops. 

Just as you can use criticality to increase severity, you can use it to decrease the severity of the signals fired on an entity.

If the formula you specify results in a number that isn’t whole, the value is rounded down to the nearest integer.

## About criticality and insight generation

The maximum severity that can be assigned to a Cloud SIEM rule is 10, so normally, signal severity is also limited to 10. Note however that Cloud SIEM doesn’t impose a maximum value on the severity that results from a criticality, although the minimum value will always be 0. 

As described in the [insight generation](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) topic, an insight is generated on an entity based on the cumulative severity of the unique signals that have fired on it over the previous two weeks, unless a different period is configured. The cumulative
severity is referred to as the entity’s activity score. Keep in mind that higher signal severities will increase an entity’s activity score and result in insight’s being generated sooner. 

You can configure both the detection window and the threshold activity score for insight generation, as described in the [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/) topic.

## Define a criticality

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Entities** select **Criticality**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Entities** select **Criticality**. You can also click the **Go To...** menu at the top of the screen and select **Criticality**.  
1. On the **Criticality** tab, click **+ Add Criticality**. 
1. The **Add Criticality** popup appears.<br/><img src={useBaseUrl('img/cse/criticality-popup.png')} alt="Create entity criticality dialog" style={{border: '1px solid gray'}} width="400"/>
2. **Name**. Enter a name. 
3. **Severity Expression**. Enter a formula for adjusting a severity value. You can use a plus sign (+), minus sign (-), an asterisk (\*), or a forward slash (/). Enter the formula in this format:   `severity+2 `
4. Click **Save** to save the criticality.

## Assign a criticality to an entity

You can associate a criticality with one or more entities. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Entities** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Entities**. You can also click the **Go To...** menu at the top of the screen and select **Entities**.  
1. Navigate to the entity you want to assign a criticality and click on it to display the **Entity Details** page. 
2. On the **Entity Details** page, click the **Criticality** field to display a list of Criticalities. <br/><img src={useBaseUrl('img/cse/entity-details-criticality.png')} alt="Entity criticality details" style={{border: '1px solid gray'}} width="300"/>
3. Click a criticality to apply it to the entity.
