---
id: share-metric-query
title: Share a Metric Query
sidebar_label: Share a Metric Query
description: Share a saved or unsaved metric query.
---

There are two ways you can share a metric query with other Sumo users:

* You can share a saved metric query with one or more roles, users, or a combination of roles and individual users. When you share a saved metric query, you can set the sharing permission level to View, Edit, or Manage, and also apply advanced sharing options.
* You can also share an unsaved metric query. After you run a metric query you can obtain a URL for the chart and send it to other users so that they can view the chart. Anyone in your org with access to the URL can view the chart. When you share an unsaved metric query in this fashion, you can't grant Edit or Manage permissions, or any of the advanced options available when sharing a saved query. 

## Share a saved metric query

You can share a saved metric query from the metric query tab or the Sumo
Logic Library. 

### Share a metric query from the query tab

1. If you have not already saved the query, save it by clicking the save icon. 
1. Click the sharing icon.  

    ![sharing-icon.png](/img/metrics/sharing-icon.png)

1. The sharing popup appears.  

    ![sharing-popup.png](/img/metrics/sharing-popup.png)

1. **Users and Roles**. Enter the user names and/or roles to receive access. For example, if you want all share the query with all users that have the Analyst role, enter Analyst.
1. **Access**. Choose the level of access to grant: **View**, **Edit**, or **Manage**.
1. **Advanced Access** (Optional).You can further refine access to the dashboard by setting a permission level. For details on these options, see [Available Permission Levels](#available-permission-levels).

### Share a metric query from the Sumo Logic library

1. Navigate to the saved metric query in the library.
1. Click the sharing icon.  
1. The sharing popup appears.  
1. **Users and Roles**. Enter the user names and/or roles to receive access. For example, if you want all share the query with all users that have the Analyst role, enter Analyst.
1. **Access**. Choose the level of access to grant: **View**, **Edit**, or **Manage**. 
1. **Advanced Access** (Optional). You can further refine access to the shared query by setting a permission level. For more information, see [Available Permission Levels](#available-permission-levels).

### Available permission levels 

You can share a metric query with specific users or roles. 

By default each permission level allows the user to grant that level of permission to another user. We assume that if a user has View access, for example, that they would be capable of deciding who should also have View access. If you have content where this is not the case, you can restrict their rights to allow others to have View, Edit, or Manage access.

Consider carefully what level of permissions users and roles need with your content:

| Permission Level | Default Permissions | Available Advanced Options/Restrictions |
| :-- | :-- | :-- |
| View | Users can see the content and grant access to others to view. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/>**Grant View Access.** User can grant view access to others. |
| Edit | Users can make changes to the content and grant View or Edit access to others. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/>**Grant View Access.** User can grant View access to others.<br/>**Grant Edit and View Access.** User can grant Edit and View access to users. |
| Manage (Recommended for individual users only) | Designated users are considered co-managers of the content and can modify the content as well grant the right to other users to View, Edit, Manage, or Move the content. | **Cannot Grant Access.** Prevents the user from sharing view access.<br/>**Grant View Access.** User can grant view access to others.<br/>**Grant Edit and View Access.** User can grant View and Edit access to users..<br/>**Grant Manage, Edit, and View Access.** User can grant Manage, Edit, and View access to users. |

## Share an unsaved metric query

After you run a metric query you can obtain a URL for the chart and send it to other users so that they can view the chart. Anyone in your org with access to the URL can view the chart. Any customizations that you have made on the **Settings** tab of the metric query page will be preserved. 

1. Run a metric query.
1. Click the sharing icon in the upper right corner of the metric chart.
1. On the **Share Metrics Search** popup:
    1. Select a time range option:
        * Leave **Use absolute time range** checked to share the search with the current start and end time.
        * Uncheck **Use absolute time range** to share the search with the currently selected relative search expression, "Last 60 minutes" in the example chart.  

            ![share-metric-search.png](/img/metrics/share-metric-search.png)

    1. Click **Copy** to copy the URL. 
1. Send the the URL to the users with whom you want to share the metric
    chart.

When a user opens the URL in a browser, Sumo will prompt the user to log on. If you shared the chart with **Use** **absolute time range** selected, the chart will show data for the actual time range shown when you shared the cart, as shown below. Otherwise, the shared chart will show a relative search expression. In our example query, that would be "Last 60 minutes".

![as-shared-absolute.png](/img/metrics/as-shared-absolute.png)
