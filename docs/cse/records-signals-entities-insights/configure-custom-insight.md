---
id: configure-custom-insight
title: Configure a Custom Insight
sidebar_label: Custom Insights
description: Learn how to set up custom insight configurations, which you can use to automatically generate insights on some basis other than entity activity scores.
keywords:
  - custom insight
  - cloud siem
---

import useBaseUrl from '@docusaurus/useBaseUrl';

As described in the [Insight Generation Process](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) topic, Cloud SIEM automatically generates an insight based on an entity’s activity score, which is the cumulative severity of the unique signals that have fired on an entity during a period of time. In some cases, you may want Cloud SIEM to generate an insight on some basis other than entity activity scores. For example, you might want an insight generated whenever a particular set of signals are fired in a particular order. 

This topic has instructions for defining a custom insight, which is a configuration you set up that causes Cloud SIEM to generate insights based purely on one or more signals being fired. 

## Ways to define a custom insight

When you create a custom insight, the following field appears on the creation dialog: 

<img src={useBaseUrl('img/cse/ways-to-define-custom-insight.png')} alt="Ways to define a custom insight" style={{border: '1px solid gray'}} width="300"/>

This lets you choose how you want to define a custom insight. You can specify that the insight should be generated each time:

* Signals whose name matches a specified wildcard expression are fired. 
* One or more selected rules fire a signal.

Which method should you use? The difference is whether you’re going to create an insight based on the name of the signal that was fired, or based on the name of the rule that fired the signal. 

Typically, signals that a rule generates have the same name as the rule. That is not the case with Cloud SIEM’s normalized rules. That’s because normalized rules, for example [normalized threat rules](/docs/cse/rules/normalized-threat-rules/), are written to work with multiple data sources. The names of the signals that a normalized rule fires vary by data source. So, if you want your custom insight configuration to generate insights for signals fired by normalized rules, you should base it on signal names, rather than rule names.

## When are custom insights generated?

### For each involved entity

When the conditions of a custom insight configuration are met during the currently configured [detection window](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/), an insight will be generated for *each entity* involved. In other words, if each of the signals in a custom insight configuration fired on a different entity, an insight will be created on each of those entities. The generated insights will include not only the signals that it fired on, but also any related signals.

### For only signals defined in the custom insight

You may want to generate insights only on those signals defined in your custom insight. In that case, select the **Only include the signals defined in this custom insight** checkbox under **Strict Signal Configuration**. Any additional signals related to the applicable entity are excluded.

<img src={useBaseUrl('img/cse/strict-signal-configuration-checkbox.png')} alt="Strict Signal Configuration checkbox" style={{border: '1px solid gray'}} width="300"/>
 
## Create a custom insight

To create a custom insight:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu, select **Content > Custom Insights**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Custom Insights**. You can also click the **Go To...** menu at the top of the screen and select **Custom Insights**.  
1. Click **Add Custom Insight** on the **Custom Insights** page.
1. The **Configure the Custom Insight** popup appears. <br/><img src={useBaseUrl('img/cse/custom-insight.png')} alt="Configure an insight" style={{border: '1px solid gray'}} width="600"/>
1. In the **Name** field, enter a name for the custom insight.
1. If you want the custom insight to be generated based on one or more rules firing signals, jump to step 6, below. Otherwise: 
   1. Leave the **When Signals are created from the following...** clause set to **Signal names**.
   2. Enter an expression that matches the name(s) of the signals of interest. For example: `Critical Severity Intrusion Signature *`
   3. Click **Add**.
   4. If you want to, you can enter one or more additional signal expressions.
   5. If you’ve configured more than one signal expression, use the **in ... order** clause to specify whether the signals must occur in **exact** order, or whether the signals can occur in **any** order. 
1. If you want the custom insight to be generated based on one or more rules firing signals:
   1. Change the **When Signals are created from the following...** clause to **rule**. 
   2. In the **Type to add a Rule** area, enter a string that the ID of the desired rule contains.
   3. In the list of rules that appears, scroll to the desired rule and click it.
   4. If you want to, you can search for and select one or more additional rules.
   5. If you’ve configured more than one rule, use the **in ... order** clause to specify whether the rules must fire signals in exact order, or in any order. 
1. Under **Strict Signal Configuration**, select **Only include the signals defined in this custom insight** to generate insights only on those signals defined in your custom insight. Any additional signals related to the applicable entity are excluded.
1. In the **Then Create an Insight** section on the right side of the popup, enter a name for the insight.
1. Enter a description of the insight, as desired.
1. For severity, you can choose between a constant severity, or a dynamic severity that is based on the severity of the signals that trigger the insight. If you want to configure dynamic severity, skip to the next step. To configure constant severity, select one of: Low, Medium, High, or Critical. 
1. To configure dynamic severity for the custom insight:
    1. Choose **dynamic** severity.
          :::note
          You can define dynamic severity for record fields on [Match rules](/docs/cse/rules/write-match-rule#configure-then-create-a-signal-settings) and [Aggregation rules](/docs/cse/rules/write-aggregation-rule/#configure-then-create-a-signal-settings). 
          :::
    1. Select a default severity, one of **Low**, **Medium**, **High**, or **Critical**. 
    1. **Minimum Signal Severity** and **Insight Severity**. Enter a minimum signal severity and associated insight severity value. For example, if you enter 8 and select high, if any signal in the insight has a severity of 8 or higher, the custom insight will have High severity. 
    1. If desired, you can enter a minimum signal severity value for other insight severity levels. For example, you could configure a minimum signal severity of 4 as the threshold for an insight severity level of Medium. If you do define multiple thresholds, we honor them from highest to lowest. For example, with the following configuration:
       * If the highest signal severity was at least 3, severity is Low.
       * If the highest signal severity was at least 5, severity is Medium.
       * If the highest signal severity was at least 7, severity is Critical.
      <br/><img src={useBaseUrl('img/cse/example-dynamic.png')} alt="Example dynamic severity" style={{border: '1px solid gray'}} width="300"/>
1. If desired, select [Tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/) that you want assigned to the custom insight. 
1. Click **Submit** to save your custom insight configuration.
