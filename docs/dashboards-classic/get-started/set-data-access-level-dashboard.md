---
id: set-data-access-level-dashboard
---

# Set the Data Access Level for a Dashboard

This page has information about data access levels for shared dashboards. 

## Understanding data access levels

In Sumo, the data that a user can view is governed by the user's role search filter. When a user runs a query, her role search filter is silently prepended to the query. Role search filters are described on [Construct a Search Filter for a Role](/docs/manage/users-roles/roles/construct-search-filter-for-role.md).

Role search filters affect what data a user sees in a shared dashboard, based on how you configure  he dashboard's *data access level*. A dashboard's data access level governs whose role search filter will be applied to the dashboard when it is shared with other users. 

## Set data access level

A dashboard's data access level defaults to the role search filter of the person who created the dashboard—users with whom the dashboard is shared will see the same data as the dashboard creator does, even if the viewer’s role does not allow access to the data in the dashboard.

:::note
A user with the Manage organization settings [role capability](/docs/manage/users-roles/roles/role-capabilities.md) can override the default behavior by enabling the [Data Access Level for Shared Dashboards](set-data-access-level-dashboard.md) security policy on **Manage** > **Security** > **Policies** page. If you enable the policy, newly-created dashboards will by default run with the role search filter of viewers with whom the dashboard is shared.
:::

The **Change Data Access Level of Dashboards** role capability is required for the dashboard creator, or user that has **Edit** or **Manage** permission, to change the data access level for the dashboard.

To change the Data Access Level for a dashboard:

1. Choose **Data Access Level** in the dashboard menu.

    ![data-access-level.png](/img/dashboards/data-access-level.png)

1. On the **Change Data Access Level** popup, select the desired data access level. 

    ![data-access-level-options.png](/img/dashboards/data-access-level-options.png)

    * **Viewer’s data access level**. When shared, the dashboard will run with the viewer's role search filter. Only data to which the viewer’s role filter allows access will appear in the dashboard. 
    * **My data access level**. When shared, the dashboard will run in your context. Users who view the dashboard will be able to see data allowed by your role filter. Be careful when sharing a dashboard with this access level:  viewers might see data to which they otherwise do not have access.
    * **[*User's*] data access level**. This option is available when you set the data access level for a dashboard whose current access level is other than your own. In the option text, [*User's*] is replaced by the name of the user whose search role filter is currently applied to the dashboard.
