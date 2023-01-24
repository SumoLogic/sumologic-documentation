---
id: view-manage-entities
title: View and Manage Entities
description: The Entities page lists all of the Entities in CSE and their Activity Scores.
---


This topic has information about the Entities page in CSE UI, which lists all of the Entities in CSE and their Activity Scores, and the **Entities > Details** page, which presents information about a particular Entity, including Signals and Insights associated with the Entity.

The **Entities** page is useful for monitoring Entities that are close to having an Insight created. On the **Entities > Details** page, you can view Signals and Insights for an Entity, and, as desired, manually create an Insight from Signals associated with the Entity.

You can also update the [tags](tags-insights-signals-entities-rules.md), [suppression](about-signal-suppression.md) state, and [Criticality](entity-criticality.md) assigned to Entities, as described below in the [Update Multiple Entities](view-manage-entities.md) section below. 

## About Entities

In CSE, an Entity is a unique actor that a Signal fired upon. CSE has a number of built-in Entity types:

* Command
* Domain
* Email
* File
* Hash
* Hostname
* IP Address
* MAC Address
* Process
* URL
* User Agent
* Username

You can create custom Entity types as well. For more information, see [Create a Custom Entity Type](docs/cse/records-signals-entities-insights/create-custom-entity-type.md).

When a Signal is fired, if an Entity doesn’t already exist in CSE for the item that the Signal fired on, CSE creates an Entity for it. For more information about Entities and Signal and Insight generation, see [Insight Generation Process](docs/cse/records-signals-entities-insights/insight-generation-process.md).

## About the Entities list page

To view the **Entities** page, click **Entities** at the top of the CSE UI.

![entities-icon.png](/img/cse/entities-icon.png)

Here’s a screenshot of the Entities page.

![entities-page-2.png](/img/cse/entities-page-2.png)

| Letter | Description |
|:--|:--|
| A | This area shows the total number of unique Entities in CSE. |
| B | In the **Filters** area, you can filter the list of Entities by Activity Score, Hostname, IP Address, Username, Tags, Type, and Suppressed. |
| C | In this area you can sort Entities by Activity Score, Name, or Type.  |
| D | The Import Metadata option allows you to upload a .csv file of updates to Entity tags, suppression state, and Criticality, as described in [Update Multiple Entities](#update-multiple-entities). |
| E | Shows the Entity Type and its value.  |
| F | The **Criticality** column shows whether a [Criticality](entity-criticality.md) has been assigned to the Entity. A Criticality adjusts the severity of Signals for specific Entities based on some risk factor or other consideration. If a Criticality hasn't been assigned to an Entity, the column contains "default". |
| G | The current Activity Score for the Entity, which by default is the sum of the severities of the Signals that have fired on the Entity over the previous two weeks. For more information, see [Understanding Entity Activity Scores](insight-generation-process.md), in the *Insight Generation Process* topic. |
| H | If you see a link below the Entity value, it’s a [tag](tags-insights-signals-entities-rules.md). You can click it to filter Entities by that tag. |
| I | If an Entity has the **Suppressed** indicator, that means that Signals will not be fired on the Entity.   |

## About the Entities Details page

When you click an Entity on the **Entities** page, a details page for
the Entity appears.

![entity-details-page.png](/img/cse/entity-details-page.png)

| Letter | Description |
|:--|:--|
| A | Suppression slider. Shows whether or not the Entity is currently suppressed. You can use the slider to suppress the Entity so that it is excluded from the Insight generation process.  |
| B | **Tags**. Lists any [tags](tags-insights-signals-entities-rules.md) assigned to the Entity. You can add a new tag, select a tag to assign, or remove a tag from the Entity. |
| C | **Criticality**. An Entity’s [Criticality](entity-criticality.md) is a setting that adjusts the severity of Signals that fire on the Entity, based on a risk factor or other consideration. You can reset the Criticality here. |
| D | **Inventory**. If the selected Entity is standard Entity type—an IP address, hostname, or username—this area provides selected information about the Inventory object associated with the Entity. (Inventory information is not provided for custom entity types.) Inventory data is customer or 3rd-party provided information that describes devices and users along with contact information and job descriptions. CSE joins inventory data  on demand with data from Entities in Insights data to provide context to Signals. |
| E | **IP Metadata**. (Displayed only for IP address Entities.) This section lists the contents of enrichment fields  that were added during Record processing.  |
| F | **Matching Network Blocks**. (Displayed only for IP address Entities.) If the IP Address is within any Network Blocks, they're listed here. |
| G | **Related Entities**. If related entities exist, they are listed here. A related entity is a hostname or MAC address from which we have observed a Record in the log stream for which an IP and hostname or MAC appears in the same device within the Record. |
| H | **Audit Log**. This area will list any audit events that have been logged for the Entity. An audit log is generated each time an Entity is suppressed or unsuppressed.  |
| I | **Activity tab**. This tab displays a visualization of Signals on the Entity over time.The x-axis is time, the y-axis is severity. The icons represent Signals.
| J | **Related Entities** tab. If related entities exist, this tab allows you to filter them by time. A related entity is a hostname or MAC address from which we have observed a Record in the log stream for which an IP and hostname or MAC appears in the same device within the Record. |
| K | **Create Insight**. You can use this option to create an Insight on the Entity, as described below in [Create an Insight](#create-an-insight), below. |
| L | The **Current State** section lists Signals that were generated for the Entity during the current [Detection Window](set-insight-generation-window-threshold.md) that are not already part of an Insight. (The Detection Window is the period over which CSE evaluates Signals, which is 14 days, by default. The Detection Window is configured on the Content > Custom Insights page in the CSE UI.) |
| M | The **Prior Activity** section lists Signals that were generated for the Entity prior to the current Detection window, and all Insights for the Entity.  |

## Create an Insight

You can create an Insight for an Entity based on one or more Signals on the Entity. To do so, checkmark each Signal you want to include in the Insight, and click **Create Insight**.

![create-insight.png](/img/cse/create-insight.png)

The page refreshes and shows the selected Signals grouped in a new Insight.

![insight-created.png](/img/cse/insight-created.png)

## Update multiple Entities

This section describes how to update the tags, suppression state,
or Criticality for one or more Entities.

### Update Entities from the UI

1. Click **Entities** at the top of the CSE UI.
1. Note that there is a checkbox at the left end of each Entity row, and one above the Entities list. <br/>![entities-page.png](/img/cse/entities-page.png)
1. Click the top checkbox to select all of the Entities on the page, or click the checkbox next to each Entity you want to update. <br/> ![update-options.png](/img/cse/update-options.png)
1. Note that once you select an Entity, three options appear at the top of the Entities list. See the instructions for each option below:
   * [Update Tags](#update-tags)
   * [Update Suppression](#update-suppression)
   * [Update Criticalities](#update-criticalities)

#### Update tags

1. After selecting the Entities you want to update, click **Update Tags**. 
1. Click the down arrow to display the options: <br/>![tag-options.png](/img/cse/tag-options.png)
   * **Add.** Select this option to add one or more tags to the Entity, without affecting any tags already assigned to the Entity. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value. You can select  multiple tags to add
   * **Remove**. Select his option to remove one or more tags from the Entity. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value.You can select multiple tags to remove. If a selected Entity doesn't have the specified tags, no change will be made to the Entity. 
   * **Replace**. Select this option to remove all of the tags currently assigned to the Entity and add one or more specified tags. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value. 
    :::important
    When you use the **Replace** option, be sure to specify new tags. If you don't, the existing tags will still be removed.
    :::
1. As you select tags, they’ll appear in the update popup. <br/> ![tags-to-add.png](/img/cse/tags-to-add.png)
1. When you are done selecting tags, click **Update Entity Tags**.

#### Update suppression

1. After selecting the Entities you want to update, click **Update Suppression**. 
1. The **Update Suppression** popup appears, with the suppression toggle set to **Not Suppressed**. <br/>![before-suppression.png](/img/cse/before-suppression.png)
1. If you want to unsuppress the selected Entities, click **Update Entity Suppression**. Otherwise, if you want to suppress the Entity, toggle the slider to **Suppressed**, supply a comment if desired, and then click **Update Entity Suppression**. 

#### Update Criticalities

1. After selecting the Entities you want to update, click **Update Criticalities**. 
1. The **Update Criticalities** popup appears. <br/> ![update-criticalities.png](/img/cse/update-criticalities.png)
1. If you want to assign default Criticality to the selected Entities, click **Update Entity Criticalities**. Otherwise, use the down arrow to view defined Criticalities, select one, and then click **Update Entity Criticalities**.

### Import Entity updates from a CSV file

You can update Entities by uploading a .csv file to CSE. 

#### CSV file format

There are two supported formats. The difference is in how you identify the target Entity. 

* **Format 1**—You use the `id` field to specify a target Entity.   `id, suppressed, criticality, tags, tags_to_add, tags_to_remove`
* **Format 2**—You use the `type` and `value` fields to specify the target Entity.   `type, value, suppressed, criticality, tags, tags_to_add, tags_to_remove`

Regardless of the format you use, there are a couple of approaches to updating Entity tags.

* You can use `tags_to_add` and `tags_to_remove` to add new tags and remove existing tags, respectively.
* You can use a `tags` value to specify replacement tags. This will remove all existing tags and add all of the specified replacement tags.

See the next section for column definitions.

#### CSV columns

The table below defines the columns in the .csv file.

Note that:

* The first row of the .csv file must contain all supported columns.
* The .csv file must contain either values in the `id` column or values in both the `type` and `value` column, and a value in at least one other column.
* If a row has a value in the `tags` column, it can’t have values in either the `tags_to_add` or the `tags_to_remove` column.

| Column | Description |
|:--|:--|
| `id` | **This field is required for Format 1.**<br/>To form the id field value, concatenate the Entity `type` and the value of the entity, separated by a dash character (-) where the Entity `type` is one of the following:<br/>`_ip`<br/>`_hostname`<br/>`_username`<br/>`_mac`<br/>`_process`<br/>`_command`<br/>`_hash`<br/>`_domain`<br/>`_useragent`<br/>`_email`<br/>`_url`<br/>`_file`<br/>`<CustomEntityTypeId>`<br/><br/>The `id` for an IP address would look like:<br/><br/>`_ip-1.2.3.4` <br/><br/>You can optionally specify an Entity’s sensor zone as a part of the `id` column, in this format:<br/><br/> `_<entity_type>-<sensor_zone>-<entity_value>`  <br/><br/>For example: <br/><br/> `_ip-zone1-172.18.20.3`|
| `type` | **This field is required for Format 2.**<br/>Identifies the type of Entity, one of:<br/>`_ip`<br/>`_hostname`<br/>`_username`<br/>`_mac`<br/>`_process`<br/>`_command`<br/>`_hash`<br/>`_domain`<br/>`_useragent`<br/>`_email`<br/>`_url`<br/>`_file`<br/>`<CustomEntityTypeId>` |
| `value` | **This field is required for Format 2.**<br/>The value of the Entity, for example, for an IP address:<br/>`1.2.3.4` |
| `sensor_zone` | Identifies the sensor zone for the Entity. <br/><br/>Don’t include this column if you are specifying Entity sensor zones in the `id` column, as described above. |
| `suppressed` | When *true*, CSE suppresses the Entity. |
| `criticality` | Assigns a Criticality to the Entity. (An Entity’s Criticality is a setting that adjusts the severity of Signals that fire on the Entity, based on a risk factor or other consideration.) You can only specify a Criticality that has already been configured in CSE. Allowable values:<br/>`default`<br/>`<CustomCriticality>` |
| `tags` | The tags to assign to the target. This column can’t be present if the file contains a tags_to_add or tags_to_remove column.<br/>Specify a schema key tag as `key:value`.<br/>To assign multiple tags, enclose them in double quotes. For example:<br/>`"<tag>,<tag>,<tag>"` or `"<key>:<value>,<key>:<value>"` |
| `tags_to_add` | The tag to assign to the target Entity. This column can’t be present if the file contains a tags column.<br/>Specify a schema key tag as `key:value`. |
| `tags_to_remove` | The tag to remove from the target Entity. This column can’t be present if the file contains a tags column.<br/>Specify a schema key tag as `key:value`. |

#### Example CSV files

**Format 1 example**

```
id,suppressed,criticality,tags,tags_to_add,tags_to_remove
_ip-zone1-10.0.0.5,false,default,,Office-Based,
_ip-zone1-10.0.0.6,true,default,,Office-Based,Remote
_ip-zone1-10.0.0.7,false,default,,Office-Based,
```

**Format 2 example**

```
type,value,sensor_zone,suppressed,criticality,tags,tags_to_add,tags_to_remove
_ip,10.0.0.5,zone1,false,default,Frequent-Travel,,
_ip,10.0.0.6,zone1,true,default,,Office-Based,Remote
_ip,10.0.0.7,zone1,false,default,,Office-Based,
```

#### Upload CSV file

After creating file, click **Import Metadata** in the upper right of the **Entities** page and upload the file. 
