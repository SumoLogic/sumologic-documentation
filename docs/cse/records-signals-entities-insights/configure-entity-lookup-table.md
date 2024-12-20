---
id: configure-entity-lookup-table
title: Configure an Entity Lookup Table
sidebar_label: Entity Lookup Tables
description: Entity lookup tables allow you to normalize the names of users and hosts (machines) in your environment
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes entity lookup tables and how to configure them.

:::note
Entity lookup tables are supported if your Cloud SIEM URL ends in `sumologic.com`.
:::

## What are entity lookup tables good for?

Entity lookup tables allow you to normalize the names of users and hosts (machines) in your environment. This is important because the username or hostname formats found in messages tend to vary by data source. For example, you’ll likely encounter the following forms of user names across the services you use:

* `jdoe@acme.com`
* `joseph.doe`
* `jdoe`

In addition, in some systems a user or a host has both a name and a unique ID, the latter of which is generally not a friendly identifier. For example, the host ID and hostname below both identify a host. It makes sense to replace the host ID in records with the hostname.

* `d8ece0f8-10a4-3c62-b8a3-2e636a3a0509`
* `testk-122.testlabs.local`

Multiple identifiers for the same user or host are a problem when it comes to correlating signals around a common entity. Unless you allow for all permutations of a username or hostname, your rule or search won’t function as intended with all data sources.

### Examples of when you create lookup tables

Following are some examples of situations when you'd want to use entity lookup tables:
* CrowdStrike FDR data uses an agent ID (AID) instead of a hostname for some messages.
* Mail Transfer Agent (MTA) systems report usernames in an email format.
* Your users have different login names on different systems (for example, Windows, Linux, and AWS).

### How does an entity lookup table work?

An entity lookup table defines two sets of values: a lookup value to look for in an incoming message and a substitution value. You can create entity lookup tables to support the following types of normalization:

* **Host ID to Normalized Hostname**
* **User ID to Normalized Username**
* **Username to Normalized Username**

Entity lookup tables are based on Sumo Logic’s [lookup tables](/docs/search/lookup-tables/) feature. Here is an example of a **Host ID to Normalized Hostname** lookup table in the Sumo Logic Library:

<img src={useBaseUrl('img/cse/example-table.png')} alt="Example entity lookup table" style={{border: '1px solid gray'}} width="800"/>

## Creating a lookup table

Before you configure a lookup table in Cloud SIEM, you must [create the lookup table](/docs/search/lookup-tables/create-lookup-table/) in the Sumo Logic platform. There are a variety of ways to create a lookup table. 

### Limitations

You can configure a maximum of five entity lookup tables. 

### Populate table from inventory data

You can create lookup tables from information about hosts and users–known as inventory data–in your environment. Inventory data is collected by Sumo Logic core platform inventory sources, typically by an Active Directory source running on a Sumo Logic Installed Collector, and also by sources that leverage the Sumo Logic Cloud-to-Cloud Integration Framework.

This method–the typical way to populate a lookup table for the purpose of entity normalization–involves running a log search against data collected by a Cloud SIEM Inventory source, and then saving and scheduling the search. This process is described in the [Save Inventory Data to a Lookup Table](/docs/cse/administration/save-inventory-data-lookup-table) topic. After creating the table, perform the steps in [Configure the lookup table in Cloud SIEM](#configure-the-lookup-table-in-cloud-siem), below.

### Existing lookups

If you already have a lookup table that contains normalization data, you can configure it in Cloud SIEM. Or, if you have existing normalization data that is not currently in a lookup table you can create a lookup table with that data. Note that your lookup table must contain a field that contains a lookup value and one that contains a substitution value. There is no requirement for particular column names.

For instructions, see [Create a Lookup Table](/docs/search/lookup-tables/create-lookup-table/). After creating the table, perform the steps in [Configure the lookup table in Cloud SIEM](#configure-the-lookup-table-in-cloud-siem), below.

### Configure the lookup table in Cloud SIEM

After you've [created your entity lookup table](/docs/search/lookup-tables/create-lookup-table/) in the Sumo Logic Library, you can configure it in Cloud SIEM.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Entities** select **Normalization**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Entities** select **Normalization**. You can also click the **Go To...** menu at the top of the screen and select **Normalization**.  
1. On the **Normalization** tab, click **Lookup Tables**.
1. Select the lookup table.
1. The **Existing Lookup Table** popup appears. Following is an example.<br/><img src={useBaseUrl('img/cse/existing-lookup-table.png')} alt="Existing lookup table dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click **Edit** to configure the lookup table. Note that most fields are read-only.
    1. **Path**. The path to the existing lookup table in the Sumo Logic Library. For example: `/Library/Admin Recommended/NormalizedHostNames` <br/>To see the path to the [lookup table](/docs/search/lookup-tables/create-lookup-table) in the Sumo Logic Library, hover over the row for the table in the Library, and select **Copy path to clipboard** from the three-dot kebab menu.<br/><img src={useBaseUrl('img/cse/tree-dot.png')} alt="Kebab button on a library item" style={{border: '1px solid gray'}} width="800"/>
    1. **Type**. The type of normalization:
       * **Host ID to Normalized Hostname**. Maps unique host IDs to recognizable hostnames.
       * **User ID to Normalized Username**. Maps unique user IDs to recognizable usernames.
       * **Username to Normalized Username**. Maps a username in one format to a username in another format.  
    1. **Column Name**. The name of the lookup table column that contains the primary key for the table.
    1. **Sub Column Name**. The name of the lookup table column that contains the value you want to substitute for the lookup column.
    1. **Source Category**. (Optional) If you enter a source category, the lookup substitution will only be applied to records that are tagged with that source category.
    1. Click **Save**.     
