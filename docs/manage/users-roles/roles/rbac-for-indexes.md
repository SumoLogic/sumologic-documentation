---
id: rbac-for-indexes
title: Index Based Search Filter
description: The index based search filter allows you to use rule permissions to determine who gets access to certain indexes.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- When the beta period is done, use the following to update the screen image and step 6 of /docs/manage/users-roles/roles/create-manage-roles/

<img src={useBaseUrl('img/users-roles/create-new-role-index-based.png')} alt="Create a new role" style={{border: '1px solid black'}} width="400"/>

1. **Search Filter**. Use this option to control what log data users with this role can access. A search filter for a role defines what log data a user with that role can access. You can define an **Index based** filter to allow access to search indexes, or an **Advanced filter** to allow access only to the logs that match the search filter. You can filter for index keywords, wildcards, metadata fields, and logical operators. Sumo prepends the search filter to each query that a user with the role runs. The search filter is invisible to the user, but limits the log results that are returned. See [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role) for details and examples on constructing search filters for roles. 

 -->

<!-- When the beta period is done, incorporate the following content into /docs/manage/users-roles/roles/construct-search-filter-for-role/ -->

You can restrict access to specific data using roles. When you [create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role), you can use **Search Filter** options to extend the existing data access control. You can select [**Index based**](#index-based) filters to allow access to data based on [indexes](/docs/manage/partitions-data-tiers/), or you can select [**Advanced filter**](#advanced-filter) to define a dataset to allow access based on search criteria. This ensures that users only see the data they are supposed to.

Follow this process to define a search filter:

1. Identify the dataset you would like to control access to. Test it out using a [search query](/docs/search/get-started-with-search/).
2. When you create a role, define the dataset by selecting the indexes through the **Index based** option, or field-specific filters through the **Advanced filter** option.   
3. Verify the dataset access is correct using [emulation](#test-search-filters).
4. [Assign the role](/docs/manage/users-roles/roles/add-remove-users-role/) to the relevant users.


## View the Search Filter options

To see the **Search Filter** options when you [create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role):
1. Go to **Administration > Users and Roles > Roles**.
1. Click **+ Add Role** on the upper right side of the page. The **Create New Role** pane displays the **Search Filter** options.<br/><img src={useBaseUrl('img/users-roles/create-new-role-index-based-boxed.png')} alt="Create a new role" style={{border: '1px solid black'}} width="400"/>

## Index based 

An index based search filter allows or denies access to [search indexes](/docs/manage/partitions-data-tiers/). 

1. [Create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role).
1. Under **Search Filter**, select **Index based**.
1. Select one of the following:
   * **All indexes**. Allow access to all indexes.
   * **Allow few indexes**. Allow access to only the selected indexes. 
   * **Deny few indexes**. Deny access to the selected indexes. 
1. If you choose **Allow few indexes** or **Deny few indexes**, choose the indexes in the **Select Indexes** box that appears.<br/><img src={useBaseUrl('img/users-roles/index-based-filter.png')} alt="Index based filter" style={{border: '1px solid black'}} width="400"/>
   

## Advanced filter

An advanced filter allows access only to the logs that match the search filter. 

1. [Create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role).
1. Under **Search Filter**, select **Advanced filter**.
1. Select one of the following to create a filter that allows access to only the logs that match the defined conditions. You can create only one filter for each.
   * **Log Analytics data filter**. This filter applies to all the [partitions](/docs/manage/partitions-data-tiers/run-search-against-partition/) and [LiveTail](/docs/search/live-tail/). 
   * **Audit data filter**. This filter applies to all the logs in [Audit Indexes](/docs/manage/security/audit-index/) and [LiveTail](/docs/search/live-tail/). For example, you could include filters for `sumologic_audit_events`, `sumologic_search_events`, `sumologic_search_usage_per_query`, or `sumologic_system_events`, to name a few.
   * **Security data filter**. This filter applies on all logs in [Cloud SIEM security indexes](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo#partitions-for-cse-records).
1. Enter search criteria in the box provided. For examples, see [Understanding search filters](/docs/manage/users-roles/roles/construct-search-filter-for-role#understanding-search-filters).<br/><img src={useBaseUrl('img/users-roles/advanced-filter.png')} alt="Advanced filter" style={{border: '1px solid black'}} width="400"/>

## Test search filters

1. Go to **Administration** > **Users and Roles** > **Roles**. 
1. Select a role with search filtering defined. 
1. Click **Emulate log search**. The search will be emulated for the search filters defined in the role. (In the example below, an index based search filter is defined.)<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-index-based.png')} alt="Emulate log search for index based filter" style={{border: '1px solid black'}} width="400"/>
1. Enter your search parameters in the log search emulation window. The search will return only what is allowed by search filters defined in the role.<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-window.png')} alt="Emulate log search window" style={{border: '1px solid black'}} width="800"/>