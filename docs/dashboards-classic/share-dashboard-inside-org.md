---
id: share-dashboard-inside-org
---

# Share a Dashboard Inside Your Org

Sharing dashboards lets you provide the insights you gain from Sumo with those you trust. You can share dashboards with other people in your organization or people outside your organization. 

When you share a dashboard with other Sumo users, you select the access right—View, Edit, or Manage—those users will have to the dashboard. The access rights are described in the [Available Permission Levels of the Share Content](/docs/manage/content-sharing) page. You have the following options for sharing a dashboard:

* with filters applied
* with time ranges applied
* outside your organization

:::note
Sharing outside your organization is always view-only.
:::

There’s another factor that affects a shared dashboard: the dashboard’s data access level, which governs what data appears in the dashboard when users with whom the dashboard was shared view it. A dashboard’s data access level determines whose role search filter is applied to it when shared, and hence what data will appear in the dashboard. For more information, see [Set the Data Access Level for a Dashboard](get-started/set-data-access-level-dashboard.md).

This section has instructions for sharing a dashboard with users within your organization. For information about sharing a dashboard with users external to your org, see [Share a Dashboard Outside Your Org](share-dashboard-outside-org.md).

## Dashboard sharing options

The following example shows the Share Dashboard dialog options you'll specify to specify who the dashboard is shared with and the permissions they are granted:

* **Share with specific users and roles.** This is where you select the users or roles with whom you wish to share the dashboard.
* **See who has access.** Lists the users and roles with whom the dashboard is already shared.  
* **Shareable URL.** Shows the URL for the shared dashboard, with options for sharing the dashboard with filters and time range and filter settings, and options for sharing the dashboard with users outside your organization.  

    ![dash-share-ui.png](/img/dashboards/dash-share-ui.png)

## Plan access rights: View, Edit, or Manage

When you share a dashboard with other Sumo users, you select the access right—View, Edit, or Manage—those users will have to the dashboard.

The access rights are described in the Available Permission Levels section of the [Share Content](/docs/manage/content-sharing) page. Sharing outside your organization is always view-only.

You can grant the same access right to everyone with whom you share the dashboard. Or, you can give some users View access, other users Edit access, and still other users Manage access.  

If you are going to grant different access rights to different users, be prepared with lists of users and the access level you want to grant to each.

## Share a dashboard within your organization

1. In the left navigation pane, right-click the dashboard you want to share, and click **Share** in the context menu. 

    ![share-option.png](/img/dashboards/share-option.png)

1. The Share Dashboard dialog appears.  

    ![share-with.png](/img/dashboards/share-with.png)

1. Click the "Share with specific users and roles" field in the **Share with specific users and roles** area. A dropdown appears, listing your Org, and all the users and roles in the Org. 

    1. If you want to share the dashboard with all users in your org, select **Your Entire Organization**. If you choose this option, note that all users in the org will have the access level you choose in step c, below. 
    1. Otherwise, select the individual roles and/or users with whom you want to share the dashboard.
    1. In the **Access** area, select the level of access you want to grant—**Edit**, **View**, or **Manage**—from the dropdown list. As desired, select an advanced access option. For information about access levels and advanced access options, see the Available Permission Levels section of the [Share Content](/docs/manage/content-sharing) page.
    1. If you want to share the dashboard with another set of users, but with different  access permissions, click **Add users with another access level** and repeat the previous sub-steps, starting with b. 

1. **To** **share a dashboard with filters** applied, click **Shareable URL** and toggle **Share with filter values**.   

    ![ShareDashboardwithFilters.png](/img/dashboards/share-dashboard-filters.png)

1. **To share a dashboard with time ranges** applied, click **Shareable URL** and toggle **Share with dashboard time range**.  

    ![ShareDashboardwithTimerange.png](/img/dashboards/share-dashboard-timerange.png)

1. To share the dashboard outside your organization see [Share a Dashboard Outside Your Org](share-dashboard-outside-org.md).

1. When you are done adding users or roles, click **Share**. Unless you unchecked **Notify** **recipients by email**, users with whom you shared the dashboard will be notified by email.   
     
