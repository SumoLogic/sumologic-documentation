---
id: manage-panels
---

# Manage Panels

See the following sections to view, edit, and manage dashboard panels.

## Edit Data Panels on the Dashboards Page

To edit data panels on a dashboard:

1. Click the **Edit** icon in the upper right of the dashboard.  

    ![edit-dash-icon.png](/img/dashboards/edit-dash-icon.png)

1. Click the **Settings** icon in the panel you want to edit.  

    ![gear-icon-panel.png](/img/dashboards/gear-icon-panel.png)  
     
1. For details on the various options shown, see [Edit Dashboards and Panels](/docs/dashboards-classic/edit-dashboards).
1. When you are done making edits, click **Done Editing**.

You can also edit a Data Panel on the [Search](#edit-data-panels-on-the-search-page) page. But the **Settings** dialogs are different.

You can view the query in the Settings dialog, but you must edit it from the Search page. See [Save edits to a Panel](#save-edits-to-a-panel).

## Save Edits to a Panel

After running a search from a panel, any edits made to the query can be saved back to the panel. These changes are immediately reflected in the panel. In addition to fine-tuning the query, you can also change the time range of the panel.

Only the owner of a shared dashboard can save changes back to a panel.

To save changes back to a panel:

1. Click a panel to launch a search.
1. Make any changes you'd like, either to the query or the time range of the panel.
1. Run the search.
1. Once the search has completed, click **Update Dashboard**.
1. Confirm the changes you've made.

Changes are reflected immediately.

## Editing Shared Dashboards

In Sumo, a dashboard's *data access level* determines what data appears in the dashboard when users with whom the dashboard was shared view it. In effect, the data access level of a dashboard controls what search role filter is applied to the dashboard:  the viewer's filter, or the filter of the user that shared the dashboard. For more information about data access levels, see [Set the Data Access Level for a Dashboard](../get-started/set-data-access-level-dashboard.md).

When you add or edit a panel in a shared dashboard, Sumo compares your role search filter to the search filter with which the dashboard was shared. If the search filters vary, Sumo displays a message like this:

`Cannot Edit Dashboard Dashboard Name`

![cannot-edit-dashboard.png](/img/dashboards/cannot-edit-dashboard.png)

To be able to edit the dashboard, you can either:

* Make a copy of of the dashboard.
* Change the data access level. You can either set the data access level to your own data access level, or to the viewer's.

    * If you set the data access level to your own, users with whom the dashboard is shared will see the same data that you can in the dashboard.
    * If you set the data access level to the viewer's, users with whom the dashboard is shared will only see data to which their role filter allows access.  

        ![change-data-access-level.png](/img/dashboards/change-data-access-level.png)

## View and Edit Queries

### View the Query of a Data Panel

The query and its time range of a Data Panel is displayed in the **Settings** dialog of the **Dashboards** page.

If you’d like to edit the query itself, you can do that on the **Search** page. See [Manage Charts](manage-charts.md).

On the **Dashboards** page, in the Panel, click the **Show in Search** icon. The Search query opens in a new tab loading the query.

![show-search-icon.png](/img/dashboards/show-search-icon.png)

### Edit the Query of a Data Panel

You can view the query of a Data Panel in the **Settings** dialog of the **Dashboards** page, but you must edit it on the **Search** page. Here's a quick way to access that functionality.

To edit a query:

1. Click a section of the Data Panel to open the query in the **Search** page.
1. Edit the query as necessary.
1. Click **Update Dashboard** save your changes and return to the dashboard.

## Change the Panel Legend

For Bar, Column, Line, or Area charts, you can change the way legends in a chart are displayed, or hide them entirely.

:::note
You cannot change the labels on legends. 
:::

To change a panel legend, do the following:

1. On the **Dashboards** page, select the **Edit** button.
1. Click the panel **Settings** icon. 
1. In the **Settings** dialog, select **General**.
1. Under **Legend** select from the display options:

    * **No Legend**
    * **Right**
    * **Bottom**

1. Click **Save**.

## Change the Panel Legend from the Search Page

You can change the way legends in a chart are displayed, or hide them entirely.

To change the legend of a Panel chart:

1. On the Search page, in the **Aggregation** tab, click the Settings icon and select **Change Legend**.
1. Deselect **Show Legend** to remove the **Right** or **Bottom** legend in the chart.
1. Click **Save**.

## Change the Panel Legend from the Search Page

You can change the way legends in a chart are displayed, or hide them entirely.

To change the legend of a Panel chart:

1. On the Search page, in the **Aggregation** tab, click the Settings icon and select **Change Legend**.
1. Deselect **Show Legend** to remove the **Right** or **Bottom** legend in the chart.
1. Click **Save**.

## Change the Panel Type of a Data Panel on the Search Page

If you'd like to change the way a data Panel is displayed in a Dashboard you can choose a different layout.

On the **Search** page, in the **Aggregates** tab, click the icon for the layout you would like to use.

## Change the Time Range of a Panel

Once you've created a panel, you can change the time range whenever you'd like.

### Change the time range of a panel temporarily

1. Click the panel's time range text to display a menu, and select an option to change the time range. Or enter a new time range manually. 

    :::note
    Dashboard panels are limited to a 32-day maximum time range.
    :::

1. The Panel updates to display the data for that time range. 

### Change the time range of a panel permanently

1. Click **Show in Search**.
1. The Panel query opens in the **Search** page.
1. Change the time range on the **Search** page, and rerun the search.
1. Click **Update Dashboard**.  
1. In the **Save Back with Time Range** dialog, select the original or  new time range you want to use. Then click **Apply**.   

    ![panel_save_back_with_time_range.png](/img/dashboards/panel_save_back_with_time_range.png)

    :::note
    Dashboard panels are limited to a 32-day maximum time range.
    :::

1. The panel's time range is reset in the Dashboard. 

## Edit Data Panels on the Search Page

Changes to a Data Panel can be made by editing the search query. 

To change a Data Panel from the Dashboard:

* On the **Dashboards** page, hover over a data panel.
* Click on the Show In Search icon.   

    ![show-search-icon.png](/img/dashboards/show-search-icon.png)

* Edit the query to your specifications.
* Click **Update Dashboard** to save your changes and update the dashboard with your changes.  

    ![UpdateDash.png](/img/dashboards/UpdateDash.png)