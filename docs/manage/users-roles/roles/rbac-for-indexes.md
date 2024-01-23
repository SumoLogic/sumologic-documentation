---
id: rbac-for-indexes
title: Index Access and Advanced Search Filters
description: Index access search filtering allows you to use rule permissions to determine who gets access to certain indexes.
---

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

When you [create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role), you can restrict access to data in logs using advanced search filters, and you can also restrict access to the [indexes](/docs/manage/partitions-data-tiers/) you specify. This ensures that users only see the data they are supposed to.

Follow this process to restrict access using advanced filters and indexes:

1. Identify the dataset you would like to control access to. Test it out using a [search query](/docs/search/get-started-with-search/).
2. When you create a role, define the dataset to give access to using [advanced search filters](#configure-advanced-search-filter-options) and [index access](#configure-index-access).   
3. Verify the dataset access is correct using [emulation](#test-search-filters).
4. [Assign the role](/docs/manage/users-roles/roles/add-remove-users-role/) to the relevant users.

## Configure advanced search filter options

When you [create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role), an advanced filter allows access only to the logs that match the search filter.

1. Go to **Administration > Users and Roles > Roles**.
1. Click **+ Add Role** on the upper right side of the page. The **Create New Role** pane displays.<br/><img src={useBaseUrl('img/users-roles/create-new-role-index-based-boxed.png')} alt="Create a new role" style={{border: '1px solid gray'}} width="400"/>
1. Select one of the following to create a filter that allows access to only the logs that match the defined conditions. You can create only one filter for each.
   * **Log Analytics data filter**. This filter applies to all the [partitions](/docs/manage/partitions-data-tiers/run-search-against-partition/) and [Live Tail](/docs/search/live-tail/).
   * **Audit data filter**. This filter applies to all the logs in [Audit Indexes](/docs/manage/security/audit-indexes/audit-index/) and [Live Tail](/docs/search/live-tail/). For example, you could include filters for `sumologic_audit_events`, `sumologic_search_events`, `sumologic_search_usage_per_query`, or `sumologic_system_events`, to name a few.
   * **Security data filter**. This filter applies on all logs in [Cloud SIEM security indexes](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo#partitions-for-cse-records).
1. Enter search criteria in the box provided. For examples, see [Understanding search filters](/docs/manage/users-roles/roles/construct-search-filter-for-role#understanding-search-filters).<br/><img src={useBaseUrl('img/users-roles/advanced-filter.png')} alt="Advanced filter" style={{border: '1px solid gray'}} width="400"/>

### Advanced filter examples

Following are examples for advanced filtering:
* Let’s say you want to deny access to all logs that contain `error` in log analytics, and contain `malicious=high` in security logs. Select **Log Analytics data filter** and add `!error` to the filter, and then select **Security data filter** and add `!malicious=high` to the filter.
* Let’s say you want to deny access to all error logs in log analytics, and deny access to all audit indexes. In this case, you will have to create two roles. For role 1, select **Advanced filter > Log Analytics filter** and add `!error` to the filter. For role 2, select **Index Access > Deny few indexes** and select all audit indexes.  

Keep in mind that these are examples only, and you must adapt them for use in your environment. For more filter examples, see [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role/).

## Configure index access

An index filter allows or denies access to [search indexes](/docs/manage/partitions-data-tiers/).

1. [Create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role).
1. In the **Create New Role** pane, navigate to **Index Access**.
1. Select one of the following:
   * **All indexes**. Allow access to all indexes.
   * **Allow few indexes**. Allow access to only the selected indexes.
   * **Deny few indexes**. Deny access to the selected indexes.
1. If you choose **Allow few indexes** or **Deny few indexes**, choose the indexes in the **Select Indexes** box that appear.<br/><img src={useBaseUrl('img/users-roles/index-based-filter.png')} alt="Index filter" style={{border: '1px solid gray'}} width="400"/>

### Index filter example

For example, let’s say you want to deny access to partition and security indexes. In our example environment, the `accessLogs` and `authenticationLogs` indexes give access to partitions, and the “sec_*” indexes give access to security information. To deny access to these indexes, click **Deny few indexes** and select those indexes.

## Test search filters

1. Go to **Administration** > **Users and Roles** > **Roles**.
1. Select a role with search filtering defined.
1. Click **Emulate log search**. The search will be emulated for the search filters defined in the role. (In the example below, an index search filter is defined.)<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-index-based.png')} alt="Emulate log search for index filter" style={{border: '1px solid gray'}} width="400"/>
1. Enter your search parameters in the log search emulation window. The search will return only what is allowed by search filters defined in the role.<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-window.png')} alt="Emulate log search window" style={{border: '1px solid gray'}} width="800"/>

