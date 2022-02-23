---
id: create-a-processing-rule
description: Processing rules can filter and forward data sent to Sumo Logic.
---

# Create a Processing Rule

There are two user interfaces (UI) to create a Processing Rule, classic and new. The new interface is only available on certain Sources and is being released incrementally.
Each UI is documented in a separate tab below.

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

1.  To create a processing rule for an existing Source, go to **Manage Data > Collection > Collection** and click **Edit** next to a Source. When configuring your new or existing Source, click the **\+ Add Filter** or **\+ Add** **Action** text in the **Processing Rules** section. 
    
    *   A filter is either an allowlist or denylist rule.
    *   An action is either a hash or mask rule.
    
    ![processing rules2022.png](/img/processing-rules/create-a-processing-rule/processing-rules2022.png)
2.  Once clicked, the configuration options are displayed.
    
    ![generic processing rules UI with added options.png](/img/processing-rules/create-a-processing-rule/generic_processing_rules_UI_with_added_options.png)
    
3.  Give a meaningful **Name** to your rule. Names can be up to 32 characters long.
4.  Choose the **Type** of processing rule you could like to create:
    *   Filters have the option to:
        *   [Exclude messages that match] (/Manage/Collection/Processing-Rules/Include-and-Exclude-Rules). Remove messages that you do not want to send to Sumo Logic at all, think of it as a "denylist" filter. These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
        *   [Include messages that match] (/Manage/Collection/Processing-Rules/Include-and-Exclude-Rules). Send only the data you could like in your Sumo Logic account, think of it as an "allowlist" filter). This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you could like to exclude, for example, if you only want to include only messages coming from a firewall.
    *   Actions have the option to:
        *   [Hash messages that match] (/Manage/Collection/Processing-Rules/Hash-Rules). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it is fully hidden.
        *   [Mask messages that match] (/Manage/Collection/Processing-Rules/Mask-Rules). Replace an expression with a mask string that you can customize—another option to protect data, such as passwords, that you wouldn't normally track.
5.  For **Filter**, type a regular expression that defines the messages you want to filter. The rule must match the whole message.
    *   For multi-line log messages, to get the lines before and after the line containing your text, wrap the segment with **(?s).\*** such as: **(?s).\*matching text(?s).\***
        
        Your regex must be [RE2 compliant.](https://github.com/google/re2/wiki/Syntax "https://github.com/google/re2/wiki/Syntax")
        
6.  To remove a filter or action click the trash can icon.  
    ![processing rule trach can icon.png](/img/processing-rules/create-a-processing-rule/trashcan-icon.png)
7.  When you are finished adding all the rules you need, click **Submit**.

</TabItem>
<TabItem value="classic-ui">


## Original interface

1.  To create a processing rule for an existing Source, go to **Manage Data \> Collection \> Collection** and click **Edit** next to a Source. When configuring your new or existing Source, expand the **Processing Rules for Logs**** section and then click **Add Rule**.  
      
    ![Add processing rule](/img/processing-rules/create-a-processing-rule/no-rules.png)
    
2.  The **Processing Rule for Logs** dialog is displayed.   
      
    ![Add Processing Rule](/img/processing-rules/create-a-processing-rule/redact-rules.png)  
     
3.  Give a meaningful **Name** to your rule. Names can be up to 32 characters long.
4.  For **Filter**, type a regular expression that defines the messages you want to filter. The rule must match the whole message.

    *   For multi-line log messages, to get the lines before and after the line containing your text, wrap the segment with `(?s).` such as:`(?s).*matching text(?s).`
        
    :::note
    Your regex must be [RE2 compliant.](https://github.com/google/re2/wiki/Syntax)
    :::

5.  Choose the **Type** of processing rule you could like to create:

    *   [Exclude messages that match] (/Manage/Collection/Processing-Rules/Include-and-Exclude-Rules). Remove messages that you do not want to send to Sumo Logic at all, think of it as a "denylist" filter. These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
    *   [Include messages that match] (/Manage/Collection/Processing-Rules/Include-and-Exclude-Rules). Send only the data you could like in your Sumo Logic account, think of it as an "allowlist" filter. This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you could like to exclude, for example, if you only want to include only messages coming from a firewall.
    *   [Hash messages that match] (/Manage/Collection/Processing-Rules/Hash-Rules). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it is fully hidden.
    *   [Mask messages that match] (/Manage/Collection/Processing-Rules/Mask-Rules). Replace an expression with a mask string that you can customize—another option to protect data, such as passwords, that you wouldn't normally track.
    *   Forward messages that match. Send data from an Installed Collector Source to a selected non-Sumo location. This option is only available if you have configured a data forwarding destination. For more information, see [Forward Data from an Installed Collector] (/Manage/Data-Forwarding/Configure-Data-Forwarding-for-Installed-Collectors).

1.  Click **Apply** to add the rule. Continue to add rules as needed.

1.  When you are finished adding all the rules you need, click **Submit**.  

    ![rule-action.png](/img/processing-rules/create-a-processing-rule/save-rule.png)

</TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
