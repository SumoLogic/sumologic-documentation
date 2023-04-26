---
id: configure-custom-insight
title: Configure a Custom Insight
sidebar_label: Custom Insights
description: Learn how to set up Custom Insight configurations, which you can use to automatically generate Insights on some basis other than Entity Activity Scores.
keywords:
  - custom insight
  - cse
---


As described in the [Insight Generation Process](insight-generation-process.md) topic, CSE automatically generates an Insight based on an Entity’s Activity Score, which is the cumulative severity of the unique Signals that have fired on an Entity during a period of time. In some cases, you may want CSE to generate an Insight on some basis other than Entity Activity Scores. For example, you might want an Insight generated
whenever a particular set of Signals are fired in a particular order. 

This topic has instructions for defining a Custom Insight, which is a configuration you set up that causes CSE to generate Insights based purely on one or more Signals being fired. There are two ways you can define a Custom Insight. You can specify that the Insight should be generated each time:

* One or more selected rules fire a Signal.
* Signals whose name matches a specified wildcard expression are fired. 

Which method should you use? The difference is whether you’re going to create an Insight based on the name of the rule that fired the Signal, or based on the name of the Signal that was fired. Typically, Signals that a rule generates have the same name as the Signal. That is not the case with CSE’s normalized rules. That’s because normalized rules, for example [Normalized Threat rules](../rules/normalized-threat-rules.md), are written to work with multiple data sources. The names of the Signals that a normalized rule fires vary by data source. So, if you want your
Custom Insight configuration to generate Insights for Signals fired by normalized rules, you should base it on Signal names, rather than rule names.

When the conditions of a Custom Insight configuration are met during the currently configured [detection window](set-insight-generation-window-threshold.md), an Insight will be generated for each Entity involved. In other words, if each of the Signals in a Custom Insight configuration fired on a different Entity, an Insight will be created on each of those Entities. The generated Insights will include not only the Signals that it fired on, but also any related Signals. 

This example Custom Insight configuration will generate an Insight as a result of the **McAfee ePO - Virus Outbreak** rule firing a Signal. 

![custom-insight-example.png](/img/cse/custom-insight-example.png)  
 
To create a Custom Insight:

1. Choose **Custom Insights** on the **Content** menu.
1. Click **Create** on the **Custom Insights** page.docs/cse/records-signals-entities-insights/about-cse-insight-ui.md  ![custom-insights-page.png](/img/cse/custom-insights-page.png)
1. The **Configure the Custom Insight** popup appears. ![custom-insight.png](/img/cse/custom-insight.png)
1. In the **Name** field, enter a name for the Custom Insight.
1. If you want the Custom Insight to be generated based on one or more rules firing Signals, jump to step 6, below. Otherwise: 
   1. Leave the **When Signals are created from the following...** clause set to **signal names**.
   1. Enter an expression that matches the name(s) of the Signals of interest. For example: `Critical Severity Intrusion Signature *`
   1. Click **Add**.
   1. If you want to, you can enter one or more additional Signal expressions.
   1. If you’ve configured more than one Signal expression, use the **in ... order** clause to specify whether the Signals must occur in **exact** order, or whether the Signals can occur in **any** order. 
1. If you want the Custom Insight to be generated based on one or more rules firing Signals:
   1. Change the **When Signals are created from the following...** clause to **rule** . 
   1. In the **Type to add a Rule** area, enter a string that the ID of the desired rule contains.
   1. In the list of rules that appears, scroll to the desired rule and click it.
   1. If you want to, you can search for and select one or more additional rules.
   1. If you’ve configured more than one rule, use the **in ... order** clause to specify whether the rules must fire Signals in exact order, or in any order. 
1. In the **Then Create an Insight** section on the right side of the popup, enter a name for the Insight.
1. Enter a description of the Insight, as desired.
1. For severity, you can choose between a constant severity, or a dynamic severity that is based on the severity of the Signals that trigger the Insight. If you want to configure dynamic severity, skip to the next step. To configure constant severity, select one of: Low, Medium, High, or Critical. 
1. To configure dynamic severity:
   1. Choose **dynamic** severity.<br/>  ![dynamic-severity.png](/img/cse/dynamic-severity.png)
   1. Select a default severity, one of Low, Medium, High, or Critical. 
   1. **Minimum Signal Severity** and **Insight Severity**. Enter a minimum Signal severity and associated Insight severity value. For example, if you enter 8 and select high, if any Signal in the Insight has a severity of 8 or higher, the custom Insight will have High severity. 
   1. If desired, you can enter a minimum Signal severity value for other Insight severity levels. For example, you could configure a minimum Signal severity of 4 as the threshold for an Insight severity level of Medium. If you do define multiple thresholds, we honor them from highest to lowest. For example, with the following configuration:
      * If the highest Signal severity was at least 7, severity is Critical.
      * If the highest Signal severity was at least 5, severity is Medium.  
      * If the highest signal severity was at least 3, severity is Low.  <br/>  ![example-dynamic.png](/img/cse/example-dynamic.png)
1. If desired, select [Tags](tags-insights-signals-entities-rules.md) that you want assigned to the Custom Insight. 
1. Click **Submit** to save your Custom Insight configuration.
