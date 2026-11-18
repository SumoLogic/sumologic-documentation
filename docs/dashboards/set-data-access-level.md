---
id: set-data-access-level
sidebar_label: Set the Data Access Level for a Dashboard
title: Set the Data Access Level for a Dashboard
description: Learn how to set the data access level for a dashboard to control the data that viewers can see.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In Sumo Logic, the data that a user can view is governed by the user's role search filter. When you run a query, the role search filter is silently prepended to the query. Role search filters are described in [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role).

Role search filters affect the data that a viewer can see in the shared dashboard, based on how you configure the data access level. The data access level determines whose role search filter Sumo Logic applies to the dashboard when you share it with other viewers.

## Types of data access level

* **Viewer’s data access level**. When you share the dashboard, it runs with the viewer's role search filter. Only data to which the viewer’s role filter allows access will appear in the dashboard.
* **My data access level**. When you share the dashboard, it runs in your context. Users who view the dashboard can see data allowed by your role filter. Be careful when sharing a dashboard with this access level: viewers might see data to which they otherwise do not have access.
* **[*User's*] data access level**. This option is available when you set the data access level for a dashboard whose access level is other than your own. In the option text, [*User's*] is replaced by the name of the user whose role search filter is applied to the dashboard.

## Key features of data access level for dashboards

- By default, newly created dashboards will run with the role search filter of `Viewer's` with whom the dashboard is shared. Viewers would need your permissions for viewing the dashboard with your data.
- Sumo Logic quotes a template variable substitution if it contains any non-alphanumeric characters. This prevents the viewer from performing subqueries or widening the scope of a query.
- Template variable values shown in the dropdown are always fetched with the `Viewer’s` permission even if the dashboard was shared with `My data` or `User's` data access level.

## Set data access level

The dashboard creator, or a user who has **Edit** or **Manage** permission, needs the **Change Data Access Level of Dashboards** role capability to change the data access level for the dashboard.

To change the data access level for a dashboard:

1. Choose **Data Access Level** in the dashboard menu.<br/><img src={useBaseUrl('img/dashboards/data-access-level.png')} alt="data-access-level" style={{border: '1px solid gray'}} width="400"/>
1. On the **Change Data Access Level** popup, select the desired data access level.<br/><img src={useBaseUrl('img/dashboards/data-access-level-options.png')} alt="data-access-level-options" width="400" style={{border: '1px solid gray'}} />
