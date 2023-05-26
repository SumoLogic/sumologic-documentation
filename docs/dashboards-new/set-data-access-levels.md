---
id: set-data-access-level
sidebar_label: Set the Data Access Level for a Dashboards (New)
title: Set the Data Access Level for a Dashboards (New)
description: Learn how to set Data Access Level for a Dashboard (New) to control the data that the user can see.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


In Sumo Logic, the data that a user can view is governed by the user's role search filter. When you run a query, the role search filter is silently prepended to the query. Role search filters are described on [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role.md).

Role search filters affect the data that a viewer can see in the shared dashboard, based on how you configure the data access level. The data access level governs whose role search filter will be applied to the dashboard when it is shared with other viewers.

## Types of Data Access Level

* **Viewer’s data access level**. When shared, the dashboard will run with the viewer's role search filter. Only data to which the viewer’s role filter allows access will appear in the dashboard. 
* **My data access level**. When shared, the dashboard will run in your context. Users who view the dashboard will be able to see data allowed by your role filter. Be careful when sharing a dashboard with this access level:  viewers might see data to which they otherwise do not have access.
* **[*User's*] data access level**. This option is available when you set the data access level for a dashboard whose current access level is other than your own. In the option text, [*User's*] is replaced by the name of the user whose search role filter is currently applied to the dashboard.

## Key features of Data Access Level for Dashboards (New) include:

- By default, newly created dashboards will run with the role search filter of `Viewer's` with whom the dashboard is shared. Viewers would need your permissions for viewing the dashboard with your data.
- Template variable substitutions will be quoted if it contains any non-alphanumeric characters. This is to prevent the viewer from performing subqueries or widening the scope of a query.
- Template variable values shown in the dropdown are always fetched with the `Viewer’s` permission even if the dashboard was shared with `My data` or `User's` data access level.

## Set Data Access Level

The **Change Data Access Level of Dashboards** role capability is required for the dashboard creator, or user that has **Edit** or **Manage** permission, to change the data access level for the dashboard.

To change the Data Access Level for a dashboard:

1. Choose **Data Access Level** in the dashboard menu.<br/><img src={useBaseUrl('img/dashboards/data-access-level.png')} alt="data-access-level" width="700"/>
1. On the **Change Data Access Level** popup, select the desired data access level.<br/><img src={useBaseUrl('img/dashboards/data-access-level-options.png')} alt="data-access-level-options" width="400"/>