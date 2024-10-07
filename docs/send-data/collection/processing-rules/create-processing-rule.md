---
id: create-processing-rule
title: Create a Processing Rule
description: Use processing rules to filter and forward data sent from a source to Sumo Logic.
---

This document describes how to create a processing rule.

You can add a processing rule to an existing Source or create one when you configure a new Source.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Edit** next to a Source. When configuring your new or existing Source, click the **\+ Add Filter** or **\+ Add** **Action** text in the **Processing Rules** section.
   * A filter is either an allowlist or denylist rule.
   * An action is either a hash or mask rule.<br/>![processing rules](/img/collector/processing-rules/create-a-processing-rule/processing-rules.png)
1. Once clicked, the configuration options are displayed.<br/> ![generic processing rules UI with added options.png](/img/collector/processing-rules/create-a-processing-rule/generic_processing_rules_UI_with_added_options.png)
1. Give a meaningful **Name** to your rule. Names can be up to 32 characters long.
1. Choose the **Type** of processing rule you'd like to create:
    * Filters have the option to:
        * [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you do not want to send to Sumo Logic at all, think of it as a "denylist" filter. These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
        * [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account, think of it as an "allowlist" filter). This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you'd like to exclude, for example, if you only want to include only messages coming from a firewall.
    * Actions have the option to:
        * [Hash messages that match](hash-rules.md). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it is fully hidden.
        * [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize—another option to protect data, such as passwords, that you'dn't normally track.
1. For **Filter**, type a regular expression that defines the messages you want to filter. The rule must match the whole message.
    For multi-line log messages, to get the lines before and after the line containing your text, wrap the segment with **(?s).\*** such as: **(?s).\*matching text(?s).\***
     :::note
     Your regex must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
     :::
1. To remove a filter or action, click the trash can icon.<br/>  ![processing rule trash can icon.png](/img/collector/processing-rules/create-a-processing-rule/trashcan-icon.png)
1. When you are finished adding all the rules you need, click **Submit**.
