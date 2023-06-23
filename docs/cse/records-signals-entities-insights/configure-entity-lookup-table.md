---
id: configure-entity-lookup-table
title: Configure an Entity Lookup Table
sidebar_label: Entity Lookup Tables
description: Entity Lookup Tables allow you to normalize the names of users and hosts (machines) in your environment
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes Entity Lookup Tables and how to configure them.

:::note
Entity Lookup Tables are supported if your CSE URL ends in `sumologic.com`.
:::

## What are Entity Lookup Tables good for?

Entity Lookup Tables allow you to normalize the names of users and hosts (machines) in your environment. This is important because the username or hostname formats found in messages tend to vary by data source. For example, you’ll likely encounter the following forms of user names across the services you use:

* `jdoe@acme.com`
* `joseph.doe  `
* `jdoe`

In addition, in some systems a user or a host has both a name and a unique ID, the latter of which is generally not a friendly identifier. For example, the host ID and hostname below both identify a host. It makes sense to replace the host ID in Records with the hostname.

* `d8ece0f8-10a4-3c62-b8a3-2e636a3a0509`
* `testk-122.testlabs.local`

Multiple identifiers for the same user or host are a problem when it comes to correlating Signals around a common Entity: unless you allow for all permutations of a username or hostname, your rule or search won’t function as intended with all data sources.

An Entity Lookup Table defines two sets of values: a lookup value to look for in an incoming message and a substitution value. You can create Entity Lookup Tables to support the following types of normalization:

* **Host ID to Normalized Hostname**
* **User ID to Normalized Username**
* **Username to Normalized Username**

Entity Lookup Tables are based on Sumo Logic’s Lookup Tables feature. Here is an example of a **Host ID to Normalized Hostname** Lookup Table in the Sumo Logic Library:

<img src={useBaseUrl('img/cse/example-table.png')} alt="Example Entity lookup table" width="800"/>

## Limitations

You can configure a maximum of five Entity Lookup Tables. 

## Creating a Lookup Table

Before you configure a Lookup Table in CSE, you must create the Lookup Table in the Sumo Logic platform. There are a variety of ways to create a Lookup Table. 

### Populate table from inventory data

You can create Lookup Tables from information about hosts and users–known as inventory data–in your environment. Inventory data is collected by Sumo Logic core platform inventory sources, typically by an Active Directory source running on a Sumo Logic Installed Collector, and also by sources that leverage the Sumo Logic Cloud-to-Cloud Integration Framework.

This method–the typical way to populate a Lookup Table for the purpose of Entity normalization–involves running a log search against data collected by a CSE Inventory source, and then saving and scheduling the search. This process is described in the [Save Inventory Data to a Lookup Table](/docs/cse/administration/save-inventory-data-lookup-table) topic. After creating the table, perform the steps in [Configure the Lookup Table in CSE](#configure-an-entity-lookup-table), below.

### Existing lookups

If you already have a Lookup Table that contains normalization data, you can configure it in CSE. Or, if you have existing normalization data that is not currently in a Lookup Table you can create a Lookup Table with that data. Note that your Lookup Table must contain a field that contains a lookup value and one that contains a substitution value. There is no requirement for particular column names.

For instructions, see the Create a Lookup Table topic. After creating the table, perform the steps in [Configure the Lookup Table in CSE](#configure-an-entity-lookup-table), below.

### Configure the Lookup Table in CSE

After you’ve created your Entity Lookup Table in the Sumo Logic Library, you can configure it in CSE.

1. Click the gear icon in the CSE UI, and choose **Normalization**, under **Entities**.
1. On the **Entity Normalization** page, click **Lookup Tables**.
1. Click **Create** on the **Lookup Tables** tab.
1. The **Existing Lookup Table** popup appears.<br/><img src={useBaseUrl('img/cse/existing-lookup-table.png')} alt="Existing Lookup Table" width="800"/>  
1. **Type**. Choose the type of normalization you want to set up.
   * **Host ID to Normalized Hostname**. Maps unique host IDs to recognizable hostnames.
   * **User ID to Normalized Username**. Maps unique user IDs to recognizable usernames.
   * **Username to Normalized Username**. Maps a username in one format to a username in another format.  
1. **Lookup Column Name**. Enter the name of the Lookup Table column that contains the primary key for the table.
1. **Substitution Column Name**. Enter the name of the Lookup Table column that contains the value you want to substitute for the lookup column.
1. **Source Category**. (Optional) If you enter a source category, the lookup substitution will only be applied to Records that are tagged with that source category.
1. **Table Path**. Enter the path to the existing Lookup Table in the Sumo Logic Library. For example: `/Library/Admin Recommended/NormalizedHostNames` You can copy the path to the Lookup Table in the Sumo Logic Library. Hover over the row for the table in the Library, and select **Copy path to clipboard** from the three-dot more options menu.<br/><img src={useBaseUrl('img/cse/tree-dot.png')} alt="Three dot" width="800"/> 
1. Click **Create**.     
