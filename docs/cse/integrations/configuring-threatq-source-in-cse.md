---
id: configuring-threatq-source-in-cse
title: Configuring a ThreatQ Source in Cloud SIEM
sidebar_label: ThreatQ Source
description: Learn how to set up a ThreatQ source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about configuring a ThreatQ source in Cloud SIEM.

ThreatQ is a threat intelligence platform that centrally manages and correlates external sources of threat intel information. 

If you have a ThreatQ subscription, Cloud SIEM’s ThreatQ integration allows you to leverage ThreatQ threat intel feeds. 

To do so, you simply configure a ThreatQ source in Cloud SIEM. You supply the information Cloud SIEM needs to connect to ThreatQ and fetch feed updates on a periodic basis.

## Configure a ThreatQ source

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). In the top menu select **Content > Threat Intelligence**. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). In the main Sumo Logic menu, select **Cloud SIEM > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  
1. On the **Threat Intelligence** page, click **Add Source**. 
1. On the **Add New Source** page, click **Create** in the ThreatQ tile. <br/><img src={useBaseUrl('img/cse/threatq-create-icon.png')} alt="ThreatQ create icon" style={{border: '1px solid gray'}} width="600"/>
1. The **Add New Source** page updates. <br/><img src={useBaseUrl('img/cse/threatq-add-source.png')} alt="ThreatQ Add New Source" style={{border: '1px solid gray'}} width="800"/>
1. **Name**. Enter a name for the source.
1. **Description**. (Optional) Enter a description of the source.
1. **Enabled**. By default, the new source will be enabled. Use the slider if you want to disable it.
1. **Base URL**. Enter the address you use to access the ThreatQ portal.
1. **Client ID**. Enter your ThreatQ Client ID.
1. **Client Secret**. Enter your ThreatQ Client Secret.
1. **Poll Interval**. Enter how frequently, in minutes, that you want Cloud SIEM to collect indicators from ThreatQ.
1. **Use Expiration Dates from ThreatQ**. Use the indicators expiration dates set in ThreatQ.
1. **Custom Filters JSON**. (Optional) If you want, you can enter a JSON filter to specify the indicators you want to collect from ThreatQ. The example shown in the screenshot above, `[{“score”:{“+gte”:3}}]`, will select indicators whose score is greater than or equal to 3.
1. **Extra Headers**. Provide additional headers you want to add to each request in "Key: Value" format.
1. **Certificate**. (Optional) A PKCS format certificate is required to authenticate to your environment if you have an SSL API gateway in front of your on-premise ThreatQ service.

## ThreatQ sources in the Cloud SIEM UI

After you set up your ThreatQ source, it will appear on the Threat Intel page in the Cloud SIEM UI. Its Type field will be “ThreatQ”.

## Looking for ThreatQ indicators using Cloud SIEM rules

As with other threat intel sources, Cloud SIEM compares each incoming Record to the indicators provided by your ThreatQ source. 

When a Record contains a value that matches an entry in one or more threat intel lists, two fields in the Record get populated: a `listMatches` field that contains the names of threat intel lists that the Record matched, and a `matchedItems` field that contains the actual key-value pairs that were matched. In addition, the string “threat” is added to the `listMatches` field.  

For example, give a Record whose `SourceIp` column matches a entry in “My Threat Intel List”, the `listMatches` field added to the record would look like this:

`listMatches: ['My Threat Intel List', 'column:SourceIp', 'threat']`

Because the threat intel information is persisted within Records, you can reference it downstream in both rules and search. To leverage the information in a rule, you extend your rule expression with the `array_contains` function. The syntax is:

`array_contains(listMatches, "threat_intel_list_name")`

where 

`threat_intel_list_name` is the name of the threat intel list.

:::note
If the name of the list you are referencing with `array_contains` contains any spaces, replace the spaces with underscores. For example, if the list name is *my list*, refer to it as *my_list*.
:::

For more information, see the [Rules and other content](/docs/cse/rules/about-cse-rules#rules-and-other-content) in the *About Cloud SIEM Rules* topic.  
 
