---
id: view-manage-entities
title: View and Manage Entities
description: The Entities page lists all of the entities in Cloud SIEM and their activity scores.
keywords:
    - Cloud SIEM
    - entity
    - entities
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe'; 

This topic has information about the **Entities** page in Cloud SIEM UI, which lists all of the entities in Cloud SIEM and their activity scores, and the **Entities > Details** page, which presents information about a particular entity, including signals and insights associated with the entity.

The **Entities** page is useful for monitoring entities that are close to having an insight created. On the **Entities > Details** page, you can view signals and insights for an entity, and, as desired, manually create an insight from signals associated with the entity.

You can also update the [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/), [suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/) state, and [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/) assigned to entities, as described below in the [Update multiple entities](#update-multiple-entities) section below. 

:::sumo Micro Lesson

Watch this micro lesson to learn more about entities.

<Iframe url="https://fast.wistia.net/embed/iframe/jq0zuj302u?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Cloud SIEM Entities Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/cIpLaDQAOAw?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
-->

:::

## About entities

In Cloud SIEM, an entity is a unique actor that a signal fired upon. Cloud SIEM has a number of built-in entity types:

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

You can create custom entity types as well. For more information, see [Create a Custom Entity Type](/docs/cse/records-signals-entities-insights/create-custom-entity-type/).

When a signal is fired, if an entity doesn’t already exist in Cloud SIEM for the item that the signal fired on, Cloud SIEM creates an entity for it. For more information about entities and signal and insight generation, see [Insight Generation Process](/docs/cse/get-started-with-cloud-siem/insight-generation-process).

## About the Entities list page

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To view entities, click **Entities** at the top of the screen. 

[**New UI**](/docs/get-started/sumo-logic-ui). To view entities, in the main Sumo Logic menu select **Cloud SIEM > Entities**. You can also click the **Go To...** menu at the top of the screen and select **Entities**. 

<img src={useBaseUrl('img/cse/entities-page-2.png')} alt="Entities page" style={{border: '1px solid gray'}} width="800"/>


| Letter | Description |
|:--|:--|
| a | This area shows the total number of unique entities in Cloud SIEM. |
| b | In the **Filters** area, you can filter the list of entities by activity score, hostname, IP address, username, tags, type, and suppressed. |
| c | In this area you can sort entities by activity score, name, or type.  |
| d | The Import Metadata option allows you to upload a .csv file of updates to entity tags, suppression state, and criticality, as described in [Update multiple entities](#update-multiple-entities). |
| e | Shows the entity type and its value.  |
| f | If an entity has the **Suppressed** indicator, that means that signals will not be fired on the entity. |
| g | The **Criticality** column shows whether a [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/) has been assigned to the entity. A criticality adjusts the severity of signals for specific entities based on some risk factor or other consideration. If a criticality hasn't been assigned to an entity, the column contains "default". |
| h | The current activity score for the entity, which by default is the sum of the severities of the signals that have fired on the entity over the previous two weeks. For more information, see [Understanding entity activity scores](/docs/cse/get-started-with-cloud-siem/insight-generation-process#understanding-entity-activity-scores), in the *Insight Generation Process* topic. |
| i | The total amount of signal severity for the entity. |

If you see a link below the entity value, it’s a [tag](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/). You can click it to filter entities by that tag. 

## About the entities details page

When you click an entity on the **Entities** page, a details page for
the entity appears.

<img src={useBaseUrl('img/cse/entity-details-new-host.png')} alt="Entity details page" style={{border: '1px solid gray'}} width="900"/>

| Letter | Description |
|:--|:--|
| a | **Suppression**. Shows whether or not the entity is currently [suppressed](/docs/cse/records-signals-entities-insights/about-signal-suppression). You can use the slider to suppress the entity so that it is excluded from the insight generation process.  |
| b | **Automations**. Click to view [automations](/docs/cse/automation/automations-in-cloud-siem/#run-an-automation-manually-on-entities) available to be run on the entity. |
| c | **Tags**. Lists any [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules/) assigned to the entity. You can add a new tag, select a tag to assign, or remove a tag from the entity. |
| d | **Criticality**. An entity’s [criticality](/docs/cse/records-signals-entities-insights/entity-criticality/) is a setting that adjusts the severity of signals that fire on the entity, based on a risk factor or other consideration. You can reset the criticality here. |
| e | **Signal Severity Total**.  The total amount of signal severity for the entity. |
| f | **Indicators**.  The indicators on the entity, whether from enrichments or threat intelligence. |
| g | **Metadata**. This section lists the contents of enrichment fields  that were added during record processing. |
| h | **Network Blocks**.  [Network blocks](/docs/cse/administration/create-use-network-blocks/) for the entity.  |
| i | **Inventory**. If the selected entity is standard entity type (as opposed to a custom entity type), this area provides selected information about the Inventory object associated with the entity. (Inventory information is not provided for custom entity types.) Inventory data is customer or 3rd-party provided information that describes devices and users along with contact information and job descriptions. Cloud SIEM joins inventory data on demand with data from entities in insights data to provide context to signals. |
| j | **Notes**. Contains any notes added to the entity.|
| k | **Audit Log**. This area will list any audit events that have been logged for the entity. An audit log is generated each time an entity is suppressed or unsuppressed.|
| l | **Recent Activity**. Provides a count of how many signals or insights included the entity within the last 30 days. Click the plus sign (+) next to **Signals** or **Insights** to expand the list. |
| m | **Activity**. This tab displays a visualization of signals on the entity over time.The x-axis is time, the y-axis is severity. The icons represent signals.
| n | **Enrichments** tab. If you use Cloud SIEM’s automation as a service, entity enrichments obtained from Cloud SOAR may be available on this tab.   |
| o | **Timeline**. A timeline appears for the entity's activity over a three-day period. For more information, see [About the Entity Timeline tab](#about-the-entity-timeline-tab).|
| p | **Related Entities**. Entities related to the current entity. |
| q | **Automations**. [Automations](/docs/cse/automation/automations-in-cloud-siem/#view-results-of-an-automation) that have been run on the entity. |
| r | **Create Insight**. You can use this option to create an insight on the entity, as described below in [Create an insight](#create-an-insight), below. |
| s | The **Current State** section lists signals that were generated for the entity during the current [detection window](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/) that are not already part of an insight. (The detection window is the period over which Cloud SIEM evaluates signals, which is 14 days, by default. The detection window is configured on the **Custom Insights** page in the Cloud SIEM UI.) |

Below the **Current State** section there may be a **Prior Activity** section. This section lists signals that were generated for the entity prior to the current detection window, and all insights for the entity. 

## About the Entity Timeline tab

The **Entity Timeline** tab provides visibility into entity inventory data, entity relationships, records, signals, and insights over a default three-day time period. This view gives information about what else the entity doing before, during, and after signals and insights involving the entity were generated.

The right side of the tab organizes records by record type and vendor, with a record count. For example, the screenshot below indicates that there were two email records from Microsoft Office 365 at 4:41:02 AM. The orange icon to the left of the record summary indicates that the record aggregation contains a signal. The indented item below the record summary is a link to the signal.

Similarly, a red icon indicates that the record set contains an insight, and the link below the summary is a link to the insight.

<img src={useBaseUrl('img/cse/entity-timeline.png')} alt="Entity timeline" style={{border: '1px solid gray'}} width="800"/>

You can view a summary of the records in a record set by clicking on it. The records are listed on the right side of the **Entity Timeline** tab. To view the complete record, click the link in the upper right corner of the card for a record.

<img src={useBaseUrl('img/cse/timeline-records.png')} alt="Timeline records" style={{border: '1px solid gray'}} width="800"/>

## Create an insight

You can create an insight for an entity based on one or more signals on the entity. To do so, checkmark each signal you want to include in the insight, and click **Create Insight**.

<img src={useBaseUrl('img/cse/create-insight.png')} alt="Create insight" style={{border: '1px solid gray'}} width="800"/>

The page refreshes and shows the selected signals grouped in a new insight.


## Update multiple entities

This section describes how to update the tags, suppression state,
or criticality for one or more entities.

### Update entities from the UI

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Entities** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Entities**. You can also click the **Go To...** menu at the top of the screen and select **Entities**.  
1. Note that there is a checkbox at the left end of each entity row, and one above the entities list. <br/><img src={useBaseUrl('img/cse/entities-page.png')} alt="Entities page" style={{border: '1px solid gray'}} width="800"/>
1. Click the top checkbox to select all of the entities on the page, or click the checkbox next to each entity you want to update. 
1. Note that once you select an entity, three options appear at the top of the entities list. <br/><img src={useBaseUrl('img/cse/update-options.png')} alt="Update options" style={{border: '1px solid gray'}} width="800"/> 
<br/>See the instructions for each option below:
   * [Update Tags](#update-tags)
   * [Update Suppression](#update-suppression)
   * [Update Criticality](#update-criticality)

#### Update Tags

1. After selecting the entities you want to update, click **Update Tags**. 
2. Click the down arrow to display the options: <br/><img src={useBaseUrl('img/cse/tag-options.png')} alt="Tag options" style={{border: '1px solid gray'}} width="400"/>
   * **Add.** Select this option to add one or more tags to the entity, without affecting any tags already assigned to the entity. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value. You can select  multiple tags to add.
   * **Remove**. Select his option to remove one or more tags from the entity. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value. You can select multiple tags to remove. If a selected entity doesn't have the specified tags, no change will be made to the entity. 
   * **Replace**. Select this option to remove all of the tags currently assigned to the entity and add one or more specified tags. You’re prompted to select a tag. If you select a schema tag, you’re prompted to select a tag value. 
    :::important
    When you use the **Replace** option, be sure to specify new tags. If you do not, the existing tags will still be removed.
    :::
3. As you select tags, they’ll appear in the update popup. <br/><img src={useBaseUrl('img/cse/tags-to-add.png')} alt="Add tags to entities" style={{border: '1px solid gray'}} width="400"/>
4. When you are done selecting tags, click **Update Entity Tags**.

#### Update Suppression

1. After selecting the entities you want to update, click **Update Suppression**. 
2. The **Update Suppression** popup appears, with the suppression toggle set to **Not Suppressed**. <br/><img src={useBaseUrl('img/cse/before-suppression.png')} alt="Update suppression" style={{border: '1px solid gray'}} width="400"/>
3. If you want to unsuppress the selected entities, click **Update Entity Suppression**. Otherwise, if you want to suppress the entity, toggle the slider to **Suppressed**, supply a comment if desired, and then click **Update Entity Suppression**. 

#### Update Criticality

1. After selecting the entities you want to update, click **Update Criticality**. 
2. The **Update Criticality** popup appears. <br/><img src={useBaseUrl('img/cse/update-criticalities.png')} alt="Update criticalities" style={{border: '1px solid gray'}} width="400"/>
3. If you want to assign default criticality to the selected entities, click **Update Entity Criticality**. Otherwise, use the down arrow to view defined Criticalities, select one, and then click **Update Entity Criticality**.

### Import entity updates from a CSV file

You can update entities by uploading a .csv file to Cloud SIEM. 

#### CSV file format

There are two supported formats. The difference is in how you identify the target entity. 

* **Format 1**—You use the `id` field to specify a target entity.   `id, suppressed, criticality, tags, tags_to_add, tags_to_remove`
* **Format 2**—You use the `type` and `value` fields to specify the target entity.   `type, value, suppressed, criticality, tags, tags_to_add, tags_to_remove`

Regardless of the format you use, there are a couple of approaches to updating entity tags.

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
| `id` | **This field is required for Format 1.**<br/>To form the id field value, concatenate the entity `type` and the value of the entity, separated by a dash character (-) where the entity `type` is one of the following:<br/>`_ip`<br/>`_hostname`<br/>`_username`<br/>`_mac`<br/>`_process`<br/>`_command`<br/>`_hash`<br/>`_domain`<br/>`_useragent`<br/>`_email`<br/>`_url`<br/>`_file`<br/>`<CustomEntityTypeId>`<br/><br/>The `id` for an IP address would look like:<br/><br/>`_ip-1.2.3.4` <br/><br/>You can optionally specify an entity’s sensor zone as a part of the `id` column, in this format:<br/><br/> `_<entity_type>-<sensor_zone>-<entity_value>`  <br/><br/>For example: <br/><br/> `_ip-zone1-172.18.20.3`|
| `type` | **This field is required for Format 2.**<br/>Identifies the type of entity, one of:<br/>`_ip`<br/>`_hostname`<br/>`_username`<br/>`_mac`<br/>`_process`<br/>`_command`<br/>`_hash`<br/>`_domain`<br/>`_useragent`<br/>`_email`<br/>`_url`<br/>`_file`<br/>`<CustomEntityTypeId>` |
| `value` | **This field is required for Format 2.**<br/>The value of the entity, for example, for an IP address:<br/>`1.2.3.4` |
| `sensor_zone` | Identifies the sensor zone for the entity. <br/><br/>Don’t include this column if you are specifying entity sensor zones in the `id` column, as described above. |
| `suppressed` | When *true*, Cloud SIEM suppresses the entity. |
| `criticality` | Assigns a criticality to the entity. (An entity’s criticality is a setting that adjusts the severity of signals that fire on the entity, based on a risk factor or other consideration.) You can only specify a criticality that has already been configured in Cloud SIEM. Allowable values:<br/>`default`<br/>`<CustomCriticality>` |
| `tags` | The tags to assign to the target. This column can’t be present if the file contains a tags_to_add or tags_to_remove column.<br/>Specify a schema key tag as `key:value`.<br/>To assign multiple tags, enclose them in double quotes. For example:<br/>`"<tag>,<tag>,<tag>"` or `"<key>:<value>,<key>:<value>"` |
| `tags_to_add` | The tag to assign to the target entity. This column can’t be present if the file contains a tags column.<br/>Specify a schema key tag as `key:value`. |
| `tags_to_remove` | The tag to remove from the target entity. This column can’t be present if the file contains a tags column.<br/>Specify a schema key tag as `key:value`. |

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
