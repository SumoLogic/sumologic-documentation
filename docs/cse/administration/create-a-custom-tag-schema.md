---
id: create-a-custom-tag-schema
title: Create a Custom Tag Schema
sidebar_label: Create a Custom Tag Schema
description: Custom tag schemas allow you to ensure that users apply consistent tag values.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for creating a custom tag schema in Cloud SIEM. 

## About tags in Cloud SIEM

Tags are metadata you can attach to Insights, Signals, Entities, and Rules. Tags are useful for adding context to these Cloud SIEM items. You can also search for and filter items by tag. There are two types of tags: *keyword tags*, which are arbitrary, freeform strings; and *schema keys*, which are predefined key-value pairs. Cloud SIEM provides built-in schemas keys that display in the Cloud SIEM UI with a Sumo label, as shown in the example below. You can’t edit the built-in schemas.

<img src={useBaseUrl('img/cse/built-in-tags.png')} alt="Built-in schema keys" style={{border: '1px solid gray'}} width="800"/>

Schema tags can enforce specific tag values and prevent confusion from variations in tag values. For example, you might want to ensure the use of standard server identifiers, such as “FinanceServer”, rather than “Server-Finance” or “Finance_Server”. 

For more information about tags in Cloud SIEM, see [Using Tags with Insights, Signals, Entities, and Rules](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules).

## Define a custom tag schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Workflow** select **Tag Schemas**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Workflow** select **Tag Schemas**. You can also click the **Go To...** menu at the top of the screen and select **Tag Schemas**. 
1. On the **Tag Schemas** page, click **Create**. <br/><img src={useBaseUrl('img/cse/tag-schema-empty.png')} alt="Create tag schema" style={{border: '1px solid gray'}} width="400"/>
1. The **Tag Schema** popup appears. 
    1. **Key**. Enter an identifier for the tag you’re defining. It won’t appear in the UI for assigning tags to a content item, unless you leave the **Label** field blank.
    1. **Label**. Enter a label for the tag. If you supply a label, that’s what will appear in the UI for assigning tags to a content item.
    1. **Content Types**. Select the types that you want the tag to be
        available for. You can select one or more of the following:
        * **Custom Insight**
        * **Rule**
        * **Entity** The options do not include **Signal** or **Insight**. Signals and Insights inherit tag values from the rule(s) or Custom Insight definition that triggered the Signal or Insight and involved Entities.
    1. **Allow Custom Values**. Check this box to allow users to add additional allowable values to the tag schema. Otherwise, when applying the tag users may only select one of the values you define in the **Value Options** section below.
    1. **Value Options**. If **Allow Custom Values** is not checked, you must define at least one value for the tag:
        * **Enter Value**. Enter an allowable value for the tag.
        * **Enter Label**. Enter a label for the value.
        * **Enter Link** (optional). Enter a URL for it to appear in the Actions menu of the tag in any content items to which it’s been applied. Cloud SIEM’s built-in schema tags are examples of schema tags that include a link. The screenshot below shows a link from the **Tactic:TA0002** to associated information on the MITRE site. <br/><img src={useBaseUrl('img/cse/mitre-link.png')} alt="Example MITRE link" style={{border: '1px solid gray'}} width="400"/>

