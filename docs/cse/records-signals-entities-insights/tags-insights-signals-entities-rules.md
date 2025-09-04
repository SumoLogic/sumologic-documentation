---
id: tags-insights-signals-entities-rules
title: Using Tags with Insights, Signals, Entities, and Rules
sidebar_label: Using Tags
description: Tags are metadata you can attach to insights, signals, entities, and rules. Tags are useful for adding context to these Cloud SIEM items. You can also search for and filter items by tag.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## What are tags?

Tags are metadata you can attach to insights, signals, entities, and rules. Tags are useful for adding context to these Cloud SIEM items. You can also search for and filter items by tag.

There are two types of tags: 

* **Schema keys**. These are predefined key-value pairs, which are useful for ensuring that users use  consistent values when assigning tags to items. There are two built-in schema tags: **Tactic** and **Technique**, which relate to the Mitre ATT&CK framework.

    You can create your own schema tags as well, as described in [Create a Custom Tag Schema](/docs/cse/administration/create-a-custom-tag-schema/). You can optionally configure a URL for each value in a custom tag schema. If you do, a user will be able to open that URL from the tag’s Action menu when it’s presented in the Cloud SIEM UI. See [Tag actions](#tag-actions) below for an example.

    You can assign schema key tags to custom rules you’ve developed.  For  built-in rules, you can assign or delete new  schema tags, but you can’t change or remove the tags that come with the rule. You can also assign schema key tags to insights, both Cloud SIEM-generated and custom.    
* **Keyword tags**. These are arbitrary labels that you define yourself. You can assign keyword tags to custom rules, entities, and insights, both Cloud SIEM-generated and custom. You can’t remove or change the tags that come with built-in rules. 

A tag attached to a rule is applied to signals that the rule generates. Similarly, tags applied to a signal are applied to the insights the signal contributes to. All of the tags applied to an insight's contributing signals are aggregated, de-duplicated, and applied to the insight. Note that an item is tagged when it is created. So, if you add a tag to a rule, signals and insights created before you updated the rule will not have that tag applied.

## Tags and types

Some items that support tags in Cloud SIEM can be tagged explicitly from the
Cloud SIEM UI. Some can inherit tags from another item. The table below
summarizes this behavior.

| Type                     | Supports explicit tag assignment? | Items inherit tags from...      |
|:--------------------------|:-----------------------------------|:---------------------------------|
| Built-in rule            | yes                               | \-                              |
| Custom rule              | yes                               | \-                              |
| Custom insight           | yes                               | \-                              |
| System-generated insight | yes                               | Rule(s), entity, custom insight |
| Entity                   | yes                               | \-                              |
| Signal                   | no                                | Rule(s), entity                 |

## View tags

You can view tags on the details pages of insights, signals, entities, or rules. 

Following is the details view of an insight showing multiple schema key tags attached to the insight:<br/><img src={useBaseUrl('img/cse/insight-list-tags.png')} alt="Insight list tags" style={{border: '1px solid gray'}} width="300"/>

## Tag actions

The actions menu for a tag allows you to:

* Open an URL, if the tag is a schema tag, and an URL is configured for the selected tag value.
* Copy the raw tag to your clipboard.<br/><img src={useBaseUrl('img/cse/tag-action-menu.png')} alt="Tag actions" style={{border: '1px solid gray'}} width="350"/>

## Find the tagging UI

The procedure for tagging rules, entities, and insights is similar. The
difference is where you do the tagging. 

### UI for tagging a rule

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.  
1. Navigate to a custom rule.
1. The UI for tagging is at the bottom of the **Then Create a Signal** area of the **Rule Editor**.
1. To add a tag, follow the instructions in [Add a schema key tag](#applya-schema-key-tag) or [Add a keyword tag](#apply-a-keyword-tag). <br/><img src={useBaseUrl('img/cse/tag-a-rule.png')} alt="Tag a rule" style={{border: '1px solid gray'}} width="350"/>

### UI for tagging an entity

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Entities** at the top of the screen.  <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Entities**. You can also click the **Go To...** menu at the top of the screen and select **Entities**. 
1. Navigate to the entity to which you want to attach a tag.
1. The UI for tagging is at the bottom of the **Details** pane.
2. To add a tag, follow the instructions in [Add a keyword tag](#apply-a-keyword-tag).<br/><img src={useBaseUrl('img/cse/tag-an-entity.png')} alt="Tag an entity" style={{border: '1px solid gray'}} width="350"/>

### UI for tagging a Cloud SIEM-generated insight

Note that in addition to tags that you manually assign to an insight, an insight will inherit any tags that were applied to the content that went into the insight—the entity and the rule(s) or custom insight definitions that created the included signals—will automatically be inherited (and aggregated) by the insight. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Insights** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Insights**. You can also click the **Go To...** menu at the top of the screen and select **Insights**. 
1. Navigate to the insight to which you want to attach a tag.
1. The UI for tagging is at the bottom of the **Details** pane.
1. To add a tag, follow the instructions in [Add a schema key tag](#applya-schema-key-tag) or [Add a keyword tag](#apply-a-keyword-tag).<br/><img src={useBaseUrl('img/cse/tag-an-insight.png')} alt="Tag an insight" style={{border: '1px solid gray'}} width="350"/>

### UI for tagging a custom insight

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Custom Insights**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Custom Insights**. You can also click the **Go To...** menu at the top of the screen and select **Custom Insights**.  
1. Navigate to a custom insight and select it.
1. The UI for tagging is at the bottom of the **Then Create a Signal** area of the insight editor. To add a tag, follow the instructions in [Add a schema key tag](#applya-schema-key-tag) or [Add a keyword tag](#apply-a-keyword-tag).<br/><img src={useBaseUrl('img/cse/custom-insight.png')} alt="Tag a custom insight" style={{border: '1px solid gray'}} width="600"/>

## Apply a schema key tag

1. Navigate to the item to which you want to add a tag, as described in the previous section. 
1. In the tagging section, click the chevron icon.<br/><img src={useBaseUrl('img/cse/chevron-icon.png')} alt="Chevron icon" style={{border: '1px solid gray'}} width="400"/>
1. Click a tag under **Schema Keys**.<br/><img src={useBaseUrl('img/cse/tag-list-1.png')} alt="Tag list" style={{border: '1px solid gray'}} width="400"/>
1. A list of values appears. <br/><img src={useBaseUrl('img/cse/values.png')} alt="Tag list" style={{border: '1px solid gray'}} width="400"/>
1. Select a tag value, and press Return to add it to the item. 

### Apply a keyword tag

1. Navigate to the rule, entity, or insight to which you want to add a tag, as described in [Find the tagging UI](#find-the-tagging-ui).
1. In the tagging section, click the chevron icon.<br/><img src={useBaseUrl('img/cse/chevron-icon.png')} alt="Chevron icon" style={{border: '1px solid gray'}} width="400"/>
1. A list of keyword tags that have already been assigned to items of the current type (rule, entity, or insight) appears. You can select an existing tag, or add a new one. Enter text in the field to see a list of matching values.<br/><img src={useBaseUrl('img/cse/freeform-tag-list.png')} alt="Freeform tag list" style={{border: '1px solid gray'}} width="400"/>
1. To add a new tag, enter it and press Return.
1. The tag is added to the item. 

## Search by tag

### Search insights, signals, or entities by tag

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Near the top of the screen, click in the Cloud SIEM search area and then click the funnel icon.  <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Search Cloud SIEM**, and click the funnel icon. You can also click the **Go To...** menu at the top of the screen and select **Search Cloud SIEM**. <br/><img src={useBaseUrl('img/cse/funnel-icon.png')} alt="Funnel icon" width="400"/>
1. Select **Insights**, **Signals**, or **Entities** from the **Sources** list.<br/><img src={useBaseUrl('img/cse/sources.png')} alt="Sources" style={{border: '1px solid gray'}} width="300"/>
1. Select **Tags** from the **Fields** list.<br/><img src={useBaseUrl('img/cse/tags-field.png')} alt="Tags field" style={{border: '1px solid gray'}} width="600"/>
1. Choose **contain** or **do not contain** from the **Operators** list.<br/><img src={useBaseUrl('img/cse/operators.png')} alt="Operators" style={{border: '1px solid gray'}} width="300"/>
1. Select a tag from either the **Schema Keys** or **Keyword Tags** list. If you select a tag from the **Schema Keys** list, you are prompted to select a value, and items that match are listed. If you select a tag from the **Keywords list**, items that match are listed.

### Search rules by tag

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.  
1. Click in the **Filters** area and select **Tags** from the **Fields** list.<br/><img src={useBaseUrl('img/cse/search-rules-by-tag.png')} alt="Search rules by tag" style={{border: '1px solid gray'}} width="400"/>
1. Choose **contain** or **do not contain** from the **Operators** list.<br/><img src={useBaseUrl('img/cse/operators-for-rules.png')} alt="Operators" style={{border: '1px solid gray'}} width="250"/>  
1. Select a tag from either the **Schema Keys** or **Keyword Tags** list. If you select a tag from the **Schema Keys** list, you are prompted to select a value, and items that match are listed. If you select a tag from the **Keywords Tags** list, items that match are listed. Note that if an item has a MITRE-related tag, an icon appears next to it. Click the icon to view a MITRE page on the Tactic or Technique.