---
id: create-an-entity-group
title: Create an Entity Group
sidebar_label: Entity Groups
description: You can use entity groups to automatically group entities in terms of criteria like name or IP Address.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

An administrator can use the _entity groups_ feature to define groups of entities and to assign attributes to them at the group level. You can define the members of an entity group in two ways:

* Based on entity name or an IP address range.
* Based on membership in a group in an Inventory system like Active Directory.

Note that membership in an entity group is not configured by explicitly assigning individual entities to the group. Instead you define an entity group in terms of criteria, like name or IP address, so that entities will automatically inherit the properties of entity groups they match without manual edits.

You can assign [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/), [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/), and [suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/) status to an entity group, and those settings will be applied to all of the entities in the group.

Consider an entity group configured to:

* Include any host in the Active Directory “laptops” group, and
* Set a (pre-configured) criticality to group members.

Each laptop in the “laptops” group will automatically inherit the criticality defined for the entity group, and so will laptops assigned to the “laptops” group in the future. In other words, when an entity is added, if it matches the membership criteria of an existing entity group, it will be automatically added to that group.

Note that when an insight is created, any tags that are assigned to the primary entity in the insight are automatically inherited by the insight. So, tags that an entity inherits from an entity group will also be inherited by insights that fire on the entity. (Such inheritance is not retro-active: insights that fired on an entity prior to the entity being tagged won’t be tagged.)

## Entity group limits

The number of entity groups you can configure per org varies by the type of the group:

* You can configure a maximum of 1000 entity groups based on membership in a group in an Inventory system.
* You can configure a maximum of 10000 entity groups based on entity name or an IP address range.


## Overlapping entity groups

It’s possible to define entity groups that overlap, in terms of the entities they contain. However, for the sake of simplicity, we recommend you configure your entity groups to not overlap. If an entity does belong to more than one group, the tags from all of the groups are applied to the entity. Criticality and suppression status are applied by the first entity group that matches in this order:

1. Entity groups based on Inventory source and group are processed in alphabetical order, by entity group name.
1. Entity groups based on IP address ranges are processed in order from most specific (smallest block) to least specific (largest block).
1. Entity groups based on name are processed in order, by the length of the match string configured as either Prefix or Suffix, then alphabetically, by entity group name.


## Create an entity group based on entity attributes

Follow these instructions to create an entity group based on entity name or whether the entity is within a specified range of IP addresses.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Entities** select **Groups**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Entities** select **Groups**. You can also click the **Go To...** menu at the top of the screen and select **Groups**.  
1. On the **Entity Groups** page, click **+ Add Entity Group**.
1. The **Add Entity Group** popup appears. (In the screenshot below, values are already entered.)<br/><img src={useBaseUrl('/img/cse/create-entity-group-values.png')} alt="Create an entity group based on attributes" style={{border: '1px solid gray'}} width="400" />
1. **Name**. Enter a name for the entity group.
1. **Description**. (Optional.)
1. **Configuration Type**. Select **Values**.
1. **Entity Types**. Select one of the following entity types:
    * **IP Address**
    * **MAC Address**
    * **Username**
    * **Hostname**
    * **Process**
    * **Command**
    * **Hash**
    * **Domain**
    * **User Agent**
    * **Email**
    * **URL**
    * **File**
1. **Match Condition**. Select one of the following match types:
    * **Prefix**. After you select this option, a **Prefix** field appears. Enter a string that matches the leading characters of the names of the entities you want to include in the group.
    * **Suffix**. After you select this option, a **Suffix** field appears. Enter a string that matches the trailing characters of the names of the entities you want to include in the group.
    * **IP Address Range.** After you select this option, an **IP Address Range** field appears. Enter a CIDR block of IP addresses.
    * **Sensor Zone**. This field is present if you selected _IP Address _as the **Entity Type** above. Optionally, select a **Sensor Zone** from the pulldown.
    :::note
    If you select a [Sensor Zone](/docs/cse/administration/using-sensor-zones), the IP addresses assigned to the entity group will be limited to addresses that are within the specified **IP Address Range** and also have been assigned the selected Sensor Zone.
    :::
1. **Tags**. Select any tags you’d like to apply to entities in the group.
1. **Criticality**. If desired, select a criticality.
1. **Suppression**. Select **Suppressed** if you want to suppress signals on entities in the group.

## Create an entity group based on inventory group membership

Follow these instructions to create an entity group that corresponds to a group in an inventory service in your infrastructure.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Entities** select **Groups**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Entities** select **Groups**. You can also click the **Go To...** menu at the top of the screen and select **Groups**.  
1. On the **Entity Groups** page, click **+ Add Entity Group**.
1. The **Add Entity Group** popup appears. (In the screenshot below, values are already entered.) <br/><img src={useBaseUrl('/img/cse/create-entity-group-inventory.png')} alt="Create an entity group based on inventory" style={{border: '1px solid gray'}} width="400"/>
1. **Name**. Enter a name for the entity group.
1. **Description**. (Optional.)
1. **Configuration Type**. Select **Inventory**.
1. **Inventory Type**. Select one of:
    * Computer
    * User
1. **Inventory Key**. Select an attribute to use from the **Inventory Type** selected above. You can use second-level unnormalized inventory attributes in this field (for example, `fields.foo.bar`). Select **groups** if you want to use an existing entity group attribute. 
1. **Source**. Select an inventory source from the pull-down list.
1. **Value**. Enter a value for the attribute selected in the **Inventory Key** field above. You can use REGEX expressions in this field (for example, in the screenshot above, the value is `.*OU\=ADFS.*`). <br/>If **groups** was selected in the **Inventory Key** field, enter the name of the group in the inventory system that contains the entities you want to add to the entity group. 
   :::note
   **Value** refers to a normalized attribute. The name of the raw attribute varies depending on the inventory source. And if you are entering a value for a group, keep in mind that just as not all inventory sources provide user or computer data, not all inventory sources have an attribute that gets mapped to groups. For information about how attributes are normalized from inventory sources, see [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data).
   :::
1. **Dynamic Schema Tags**. Select if you'd like to apply a [custom tag schema](/docs/cse/administration/create-a-custom-tag-schema) to the entities in the group. If you select this option, the **Value** field changes to *, indicating the value will be automatically generated from the custom tag schema. 
1. **Tag Schema**. Select the tag schema to use for the entity group.
1. **Tags**. Select any tags you’d like to apply to entities in the group. If you previously selected **Dynamic Schema Tags**, the phrase **(in addition to dynamic)** appears, indicating that the tags you select here will be added to the automatically-generated schema tags.
1. **Criticality**. If desired, select a criticality.
1. **Suppression**. Select **Suppressed** if you want to suppress signals on entities in the group.

### Example

The [screenshot above](#create-an-entity-group-based-on-inventory-group-membership) where we create an "ADFS server" entity group corresponds to the following example:

1. Let's say you want to create an entity group for ADFS servers. The Active Directory inventory data for your ADFS servers adheres to the following pattern. Notice the computer name, and how it appears in the `distinguishedName` field:  <br/><img src={useBaseUrl('/img/cse/entity-group-inventory-example-1.png')} alt="Active Directory inventory data" style={{border: '1px solid gray'}} width="800"/>
2. The corresponding Cloud SIEM entity inventory enrichment for the data is as follows. Notice how the `distinguishedName` field is defined: <br/><img src={useBaseUrl('/img/cse/entity-group-inventory-example-2.png')} alt="Entity enrichment data" style={{border: '1px solid gray'}} width="600"/>
3. Now, to ensure that we add the data for these entities to an "ADFS Servers" entity group, we create the entity group as shown in the [screenshot above](#create-an-entity-group-based-on-inventory-group-membership). We set the inventory key as `fields.distinguishedname`, the value as `.*OU\=ADFS.*`, and the tag to be applied as `adfs_server`. 
4. Then when the entity group is processed, the tag we specified is applied to each entity in the group, like in this example from the entities details page: <br/><img src={useBaseUrl('/img/cse/entity-group-inventory-example-3.png')} alt="Tag applied to entity" style={{border: '1px solid gray'}} width="300"/>

## Using tags in rule expressions

If you've applied a tag to an entity, you can use the tag in a [rule expression](/docs/cse/rules/about-cse-rules/#about-rule-expressions). For example, if you've attached a keyword tag "DB Server" to an entity, this `array_contains` statement will return "true" if the entity in a record's `srcDevice_ip` field has the tag "DB Server"

```
array_contains(fieldTags["srcDevice_ip"], "DB Server")
```

## API support

You can use the `/entity-group-configuration` API to create, read, update, and delete entity groups. For more information, see [Cloud SIEM APIs](/docs/cse/administration/cse-apis).
