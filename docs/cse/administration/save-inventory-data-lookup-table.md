---
id: save-inventory-data-lookup-table
title: Save Inventory Data to a Lookup Table
description: Learn how to use a saved Sumo Logic search to populate a lookup table with Cloud SIEM inventory data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for using a saved Sumo Logic search to populate a lookup table with Cloud SIEM inventory data. Once you’ve created an inventory lookup table, you can leverage it in log searches, and also use it to normalize hostnames and usernames. 

The instructions below are for saving inventory data to a lookup table using the save search operator. In this procedure, you’ll:

* Create a lookup table schema.
* Create a log search that saves inventory data to the lookup table.
* Schedule the search to run on a daily basis, with an **Alert Type** of “Email”. You’ll configure the alert to send an email if the search returns fewer than five results (an indication that the query was not completely successful).

Although the Scheduled Search feature does support an **Alert Type** of “Save to Lookup”, it is *not* recommended for this use case. That’s because the “Save to Lookup” option does not support adding more than 512 rows to a lookup table.  

## Prerequisites 

In order to create an inventory lookup table, you need to have one or more sources of inventory data. One of the most common sources of inventory data in Sumo Logic is the [Windows Active Directory Inventory source](/docs/send-data/installed-collectors/sources/windows-active-directory-inventory-source/) running on an Installed Collector. We recommend you collect AD logs every 12 hours, and that you do not collect logs more frequently than every 8 hours.

Any inventory source–or any log source, for that matter–can be used to populate lookup tables. Sumo Logic also has a variety of inventory sources that run on Hosted Collectors, including the Okta and Carbon Black sources.

## Step 1: Create the lookup table schema

In this step, you create the lookup table schema.

As an example, assume that you are creating a table that will be used to normalize usernames in email format (jdoe@acme.com) to an login name format (john.doe), to be populated by data from Active Directory.  

In this case we create a table with two fields: `mail` (email address) and `samaccountname` (login name).   

Note the following:  

* The name of the fields in the table schema must match the names of the fields in the search results that will populate the table. It’s easiest to use the exact same names as the fields in the data source (as we do in this example) but you can rename a field in the search to make it match the corresponding column name.  
* You can have more than two fields in the lookup table but table size is a consideration. In our example, we populate only the fields required for name normalization.  

To create the lookup table schema:

1. Go to the Sumo Logic Library.
1. Navigate to the folder where you want to create the lookup table.
1. Click **Add New** and then select **New Lookup**. <br/><img src={useBaseUrl('img/cse/new-lookup.png')} alt="New lookup link" style={{border: '1px solid gray'}} width="600"/>
1. The **Create Lookup Table** page appears. <br/><img src={useBaseUrl('img/cse/create-in-cip.png')} alt="Create lookup table" style={{border: '1px solid gray'}} width="600"/>
1. **Name**. Enter a name for the lookup table.
1. **Description**. (Optional)
1. **Set a TTL (Time to Live) for table entries**? Click **No**.
1. **Choose a size limit handling option**. This option controls how additions to the Lookup table will be handled when it reaches its size limit (100 MB). Click **Delete Old Data.**
1. **Create Lookup Table** Click **Create Schema only**.
1. The page displays a **Schema** section. (The screenshot below shows the schema settings for our example filled in.) <br/><img src={useBaseUrl('img/cse/schema.png')} alt="Schema settings" style={{border: '1px solid gray'}} width="600"/>
1. For the first column, enter:
   * **Fields**. Enter *mail*.
   * **Value Type**. Leave the default, *string*, selected.
   * **Primary Key Field(s)**. Click the **Yes** checkbox.
1. For the second column, enter:
   * **Fields**. Enter *samaccountname*.
   * **Value Type**. Leave the default, *string,* selected.
1. Click **Create**. 

## Step 2: Create a search to populate the table

In this step you create an aggregate search that returns the fields required for the table and writes the results to the lookup table you configured above. The search must be an aggregate–that’s easy to accomplish using a count by clause to uniquely identify entries. (The count value can be ignored as it’s not a column in the lookup table).   

For our use case, the query is:

```sql
_sourceCategory="/windows/inventory" and _collector="ad-collector"
| where !isBlank(mail) and !isBlank(samaccountname)
| count by mail, samaccountname
| save <PATH>
```

Where:

* `_sourceCategory` identifies the source category you assigned to the Active Directory Source.
* `_collector` identifies the collector where the Active Directory source runs. 
* `PATH` is the path of the lookup table, in this format:   `path://"/Library/Admin Recommended/userIdToUsername"` You can copy the path to the lookup table in the Sumo Logic Library. Hover over the row for the table in the Library, and select **Copy path to clipboard** from the three-dot kebab menu.

   <img src={useBaseUrl('img/cse/tree-dot.png')} alt="Kebab menu button" style={{border: '1px solid gray'}} width="600"/>

## Step 3: Save and schedule the search

In this step you save and schedule the search created in [Step 2](#step-2-create-a-search-to-populate-the-table) to run on a regular basis. Daily is a good choice. 

Be sure to choose “Email” as the **Alert type**. (*Don’t* select **Save to Lookup**). You can select the conditions under which email alerts will be sent, and the time at which the queries are run. In this example, we have selected to only send an email when the search returns less than 5, which is indicative of an error.  

To save and schedule the search:

1. In the log search tab where you’ve run your query, choose **Save as** from the three-dot kebab menu in the query area. <br/><img src={useBaseUrl('img/cse/save-as.png')} alt="Save as on dropdown list" style={{border: '1px solid gray'}} width="600"/>
1. On the **Save Item** popup:
   * **Name**. Enter a name for the query.
   * **Time range**. Select a time range for the query.
   * **Search By**. Select *Receipt Time*.  
   * **Location to save to**. Choose a folder location.
   * Click **Schedule this search**.     <br/><img src={useBaseUrl('img/cse/save-item.png')} alt="Save item dialog" style={{border: '1px solid gray'}} width="400"/>
1. On the **Save Item** popup:
   * **Run frequency**. Select *Daily*, unless you have another preference.
   * **Send Notification**. Choose *If the following condition is met*.
   * **Alert condition**. Select *Less than \<*.
   * **Alert type**. Select *Email*.
   * **Number of results**. Enter *5*, or another value if you prefer.
   * **Recipients.** Enter the email addresses of one or more users to receive email alerts.
   * **Include in email**. Select *Search Query* and *Histogram*, unless you have another preference.  <br/><img src={useBaseUrl('img/cse/save-item-2.png')} alt="Save item dialog" style={{border: '1px solid gray'}} width="400"/>
1. Click **Save.**

## Step 4: Configure the lookup table in Cloud SIEM

If you’re going to use the lookup table to normalize entities in Cloud SIEM, follow the instructions in [Configure an entity lookup table](/docs/cse/records-signals-entities-insights/configure-entity-lookup-table).
