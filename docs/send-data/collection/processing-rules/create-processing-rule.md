---
id: create-processing-rule
title: Create a Processing Rule
description: Processing rules filter and can forward data sent to Sumo Logic from a Source.
---

There are two user interfaces (UI) to create a Processing Rule, classic and new. The new interface is only available on certain Sources and is being released incrementally. Each UI is documented in a separate tab below.

<Tabs
  className="unique-tabs"
  defaultValue="new-ui"
  values={[
    {label: 'New UI', value: 'new-ui'},
    {label: 'Classic UI', value: 'classic-ui'},
  ]}>

<TabItem value="new-ui">

## New interface for Hosted Collector Sources

You can add a processing rule to an existing Source or create a processing rule when you configure a new Source.

1. To create a processing rule for an existing Source, go to **Manage Data** > **Collection** > **Collection** and click **Edit** next to a Source. When configuring your new or existing Source, click the **\+ Add Filter** or **\+ Add** **Action** text in the **Processing Rules** section. 

    * A filter is either an allowlist or denylist rule.
    * An action is either a hash or mask rule.

    ![processing rules](/img/collector/processing-rules/create-a-processing-rule/processing-rules.png)
1. Once clicked, the configuration options are displayed.

    ![generic processing rules UI with added options.png](/img/collector/processing-rules/create-a-processing-rule/generic_processing_rules_UI_with_added_options.png)

1. Give a meaningful **Name** to your rule. Names can be up to 32 characters long.
1. Choose the **Type** of processing rule you'd like to create:
    * Filters have the option to:
        * [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you don't want to send to Sumo Logic at all, think of it as a "denylist" filter. These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
        * [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account, think of it as an "allowlist" filter). This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you'd like to exclude, for example, if you only want to include only messages coming from a firewall.
    * Actions have the option to:
        * [Hash messages that match](hash-rules.md). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it is fully hidden.
        * [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize—another option to protect data, such as passwords, that you'dn't normally track.
1. For **Filter**, type a regular expression that defines the messages you want to filter. The rule must match the whole message.

    For multi-line log messages, to get the lines before and after the line containing your text, wrap the segment with **(?s).\*** such as: **(?s).\*matching text(?s).\***

  :::note
  Your regex must be [RE2 compliant.](https://github.com/google/re2/wiki/Syntax)
  :::

1. To remove a filter or action click the trash can icon.  

    ![processing rule trach can icon.png](/img/collector/processing-rules/create-a-processing-rule/trashcan-icon.png)

1. When you are finished adding all the rules you need, click **Submit**.

</TabItem>
<TabItem value="classic-ui">


## Original interface

1. To create a processing rule for an existing Source, go to **Manage Data** > **Collection** > **Collection** and click **Edit** next to a Source. When configuring your new or existing Source, expand the **Processing Rules for Logs**** section and then click **Add Rule**.  

    ![Add processing rule](/img/collector/processing-rules/create-a-processing-rule/no-rules.png)

1. The **Processing Rule for Logs** dialog is displayed.   

    ![Add Processing Rule](/img/collector/processing-rules/create-a-processing-rule/redact-rules.png)  
     
1. Give a meaningful **Name** to your rule. Names can be up to 32 characters long.
1. For **Filter**, type a regular expression that defines the messages you want to filter. The rule must match the whole message.

    * For multi-line log messages, to get the lines before and after the line containing your text, wrap the segment with `(?s).` such as:`(?s).*matching text(?s).`

    :::note
    Your regex must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
    :::

1. Choose the **Type** of processing rule you'd like to create:

    * [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you don't want to send to Sumo Logic at all, think of it as a "denylist" filter. These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
    * [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account, think of it as an "allowlist" filter. This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you'd like to exclude, for example, if you only want to include only messages coming from a firewall.
    * [Hash messages that match](hash-rules.md). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it is fully hidden.
    * [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize—another option to protect data, such as passwords, that you'dn't normally track.
    * Forward messages that match. Send data from an Installed Collector Source to a selected non-Sumo location. This option is only available if you have configured a data forwarding destination. For more information, see [Archive Log Data to other destinations](/docs/manage/data-archiving/installed-collectors.md).

1. Click **Apply** to add the rule. Continue to add rules as needed.

1. When you are finished adding all the rules you need, click **Submit**.  

    ![rule-action.png](/img/collector/processing-rules/create-a-processing-rule/save-rule.png)

</TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
