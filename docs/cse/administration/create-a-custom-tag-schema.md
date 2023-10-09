---
id: create-a-custom-tag-schema
title: Create a Custom Tag Schema
sidebar_label: Create a Custom Tag Schema
description: Custom tag schemas allow you to ensure that users apply consistent tag values.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for creating a custom tag schema in CSE. 

## About tags in CSE

Tags are metadata you can attach to Insights, Signals, Entities, and Rules. Tags are useful for adding context to these CSE items. You can also search for and filter items by tag. There are two types of tags: *keyword tags*, which are arbitrary, freeform strings; and *schema keys*, which are predefined key-value pairs. CSE provides built-in schemas keys that display in the CSE UI with a Sumo label, as shown in the example below. You can’t edit the built-in schemas.

<img src={useBaseUrl('img/cse/built-in-tags.png')} alt="Built-in schema keys" width="400"/>

Schema tags can enforce specific tag values and prevent confusion from variations in tag values. For example, you might want to ensure the use of standard server identifiers, such as “FinanceServer”, rather than “Server-Finance” or “Finance_Server”. 

For more information about tags in CSE, see [Using Tags with Insights, Signals, Entities, and Rules](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules).

## Define a custom tag schema

1. Click the gear icon at the top of the CSE UI and select **Tag Schemas** under **Workflow**.  <br/><img src={useBaseUrl('img/cse/gear-tag-schema.png')} alt="Access tag schemas" width="800"/>
1. On the **Tag Schemas** page, click **Create**. <br/><img src={useBaseUrl('img/cse/tag-schemas-page.png')} alt="Tag schemas page" width="800"/>

1. The **Tag Schema** popup appears. The screenshot below shows a previously configured tag schema.  <br/><img src={useBaseUrl('img/cse/tag-schema-filled-in.png')} alt="Tag schema" width="800"/>
    1. **Key**. Enter an identifier for the tag you’re defining. It won’t appear in the UI for assigning tags to a content item, unless you leave the **Label** field blank.
    1. **Label**. Enter a label for the tag. If you supply a label, that’s what will appear in the UI for assigning tags to a content item.
    1. **Content Types**. Select the types that you want the tag to be
        available for. You can select one or more of the following:
        * **Custom Insight**
        * **Rule**
        * **Entity** The options don't include **Signal** or **Insight**. Signals and Insights inherit tag values from the rule(s) or Custom Insight definition that triggered the Signal or Insight and involved Entities.
    1. **Allow Custom Values**. Check this box to allow users to add additional allowable values to the tag schema. Otherwise, when applying the tag users may only select one of the values you define in the **Value Options** section below.
    1. **Value Options**. If **Allow Custom Values** is not checked, you must define at least one value for the tag:
        * **Value**. Enter an allowable value for the tag.
        * **Label**. Enter a label for the value.
        * **Link** (optional). Enter a URL for it to appear in the Actions menu of the tag in any content items to which it’s been applied. CSE’s built-in schema tags are examples of schema tags that include a link. The screenshot below shows a link from the **Tactic:TA0002** to associated information on the MITRE site. <br/><img src={useBaseUrl('img/cse/mitre-link.png')} alt="MITRE link" width="800"/>
