---
id: create-cse-context-actions
title: Create Context Actions
sidebar_label: Create Context Actions
description: Learn about context actions, options that a Cloud SIEM analyst can use to query an external system for information about an entity, IOC, or data encountered in a record.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe'; 

This topic has information about Cloud SIEM context actions and how to create them. 

## About context actions

A context action is an option that a Cloud SIEM analyst can use to query an external system for information about an entity, IOC, or data encountered in a record. For example, you might want to check an IP address against a threat intel service, google a username, or run a log search in Sumo Logic for a hostname. 

An authorized user can configure context actions and assign them to particular entity types, record fields, or common IOC types.
* **Context actions on entity types**. You can assign a context action to one or more entity types, including custom entity types. An action assigned to an entity type will be available on any instance of that type in the **Entities** page, or in insights or signals that contain entities of the selected type. For an example, see the screenshot in [How a user accesses context actions](#how-a-user-accesses-contextactions). <br/>An action you assign to an entity type will also be available for record fields that contain the entity type. For example, an action assigned to the Hostname entity type will be available for the `srcDevice_hostname`, `dstDevice_hostname`, and `device_hostname` record fields.     
* **Context actions on record fields**. You can assign a context action to selected record fields, or all record fields. In the Cloud SIEM UI, the action will be available on the context action menu for selected fields.     
* **Context actions on IOC types**. You can assign a context action to one or more of the following IOC data types:
    * Domain
    * IP Address
    * URL
    * Hash
    * MAC Address

The context actions menu will be available for any of these types, wherever they appear in the Cloud SIEM UI.

## How a user accesses context actions

A user runs a context action by clicking the context action icon <img src={useBaseUrl('img/cse/context-action-icon.png')} alt="Context action icon" style={{border: '1px solid gray'}} width="20"/> next to an entity, record field, or IOC and choosing an action from the list that appears. The icon appears when you hover over the value of the item.

In the screenshot below, context actions are listed below the built-in **Add to Match List** and **Add to Suppressed List** options.

<img src={useBaseUrl('img/cse/action-icon-entity.png')} alt="List of context actions" style={{border: '1px solid gray'}} width="300"/>

If an action name is shown in red font, that indicates that the action depends on a record field that doesn’t exist.

:::sumo Micro Lesson

Watch this micro lesson to learn more about how to use context actions.

<Iframe url="https://fast.wistia.net/embed/iframe/o6amvox2uc?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="title"
  id="Micro Lesson: Threat Investigation with Context Actions in Cloud SIEM Video"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/PrMr3sjaJxA?rel=0"
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

## Configure a context action

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Context Actions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Context Actions**. You can also click the **Go To...** menu at the top of the screen and select **Context Actions**.  
1. On the **Context Actions** tab click **+ Add Context Action**.
1. Create the context action.  <br/><img src={useBaseUrl('img/cse/configured-action.png')} alt="Configure action" style={{border: '1px solid gray'}} width="400"/>
    1. **Name**. Enter a name for the context action. 
    1. **Action Type**. Choose whether you want to open a **Sumo Logic Query** or a **URL** to an external service. 
    1. **Query**. Enter the URL or log query that the context action will issue.
        For instructions, see:
        * [Create a Sumo Logic search URL](#create-a-sumo-logic-search-url)
        * [Create a URL to external service](#create-an-url-to-an-external-service)
    1. If you chose **Sumo Logic Query** above, the **Timestamp offset** option appears, which set the query time range. The offset can be either -30m or +30m, and it will be applied to the timestamp in the target record’s [timestamp](/docs/cse/schema/schema-attributes) field.
    1. **Entity Types**. Select the entity types that the context action will apply to.
    1. **Record Properties**. Select the record properties that the context action will apply to.
    1. **IOC Data Types**. Choose the IOC data types to which the context action will apply. You can select one or more of the following data types listed below. Your context action will be available for any occurrences of the IOCs you select.
        * **Domain**
        * **Entity Types**
        * **Hash**
        * **IP Address**
        * **MAC Address**
        * **Record Property**
        * **URL**

### Create a Sumo Logic search URL

To create an URL for a Sumo Logic search, you enter a Sumo Logic search query as you would in a Sumo Logic search tab, but use the `{{value}}` parameter placeholder for the target item. For example, for a context action whose target is **Username**, you could enter the following query to search for Cloud SIEM records of any type whose `user_username` field matches the username on which you run the action. 

`_index=sec_record* AND user_username = "{{value}}"`

When you save the action, the URL template will be populated with your Sumo Logic base URL, and the time range you selected, either `-30m` or `+30m`.

`{{sumobaseurl}}/ui/#/search/@{{timestamp[ms]-30m}}@_index=sec_record* AND user_username = {{value}}`

### Create an URL to an external service

To create a URL to be sent to an external service, enter the URL in the format required by the external service, and use the `{{value}}` parameter placeholder for the target entity, record field, or IOC. 

Examples:

#### Run a google search on the action target

`https://www.google.com?q={{value}}`

#### Check for the action target on AbuseIPDB

`https://www.abuseipdb.com/check/{{value}}`

The only required parameter in the URL is `{{value}}`. Depending on your use case, you can use other template parameters to insert timestamps in the action URL. For more information, see [Template parameters for context actions](#template-parameters-for-context-actions). 

#### Open the Criminal IP lookup page for an IP address

`https://www.criminalip.io/asset/report/{{value}}`

## Template parameters for context actions

The table below defines the parameters you can use in the URL template for a context action.

### Value

(Required) The `{{value}}` parameter inserts the target of the context action, for instance an IP Address to be inserted into the URL to a threat intel service. For example:

`https://www.abuseipdb.com/whois/{{value}}`

### Record value

You can insert any field from the target of a context action into the action URL with the `{{field_name}}` placeholder. For example, you could include `device_ip` in the URL with `{{device_ip}}`.  

### Sumo Logic Base URL

The `{{sumobaseurl}}` parameter applies to context actions that run a Sumo Logic log search.

Assuming your Cloud SIEM instance is configured to communicate with the Sumo Logic platform, when you create an action that runs a Sumo Logic search, Cloud SIEM will automatically insert this placeholder in your URL template—you don’t need to explicitly insert `{{sumobaseurl}} `placeholder yourself.

### Timestamp

When you run an action on a Cloud SIEM record, if that record has a [timestamp](/docs/cse/schema/schema-attributes) field value, you can insert the timestamp in UTC format into the URL using the `{{timestamp}}` parameter.

### Formatted timestamp

To insert a record’s [timestamp](/docs/cse/schema/schema-attributes) field value into the action URL as a Unix timestamp, use `{{timestamp [ms]}}`.

### Timestamp with delta

If desired, you can insert a timestamp value that is some offset of the record’s [timestamp](/docs/cse/schema/schema-attributes) field in the action URL, for example: 

`{{timestamp-5h}}`

**Supported operators**

* \+ (Positive Delta)
* \-  (Negative Delta)

**Supported units (case-sensitive)**

* Y (year)
* M (month)
* W (week)
* D (day)
* h (hour)
* m (minute)
* s (second)
