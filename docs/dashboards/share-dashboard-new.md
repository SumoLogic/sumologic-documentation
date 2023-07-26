---
id: share-dashboard-new
title: Share a Dashboard
description: Learn how to save a custom dashboard and then share it with others.
---

After you have created a custom Dashboard you may also want to share it with coworkers within your organization. This page walks you through these tasks.

Currently, you can only share a Dashboard within your organization.

import Iframe from 'react-iframe';

:::sumo Micro Lesson

Share a Dashboard Inside Your Organization.

<Iframe url="https://www.youtube.com/embed/nQOAYaMad4Q"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
:::


## Sharing a dashboard within your organization

Sharing dashboards allow you to extend the insights you gain from Sumo Logic with others within your organization. You can specify specific permissions for the user with whom you share the dashboard, as well as controlling the data that appears in the dashboard. 

When you share a dashboard, you specify the dashboard access rights for the users—View, Edit, or Manage. Dashboard access rights are described in [Available Permission Levels](/docs/manage/content-sharing#available-permission-levels).

You can grant the same access right to everyone with whom you share the dashboard. Or, you can give some users View access, other users Edit access, and other users Manage access. If you are going to grant different access rights to different users, be prepared with lists of users and the access level you want to grant to each.

## Dashboard sharing options

The following example shows the Share Dashboard dialog options you will use to specify with whom to share the dashboard and their access
permissions:

* **Share with specific users and roles**. This is where you select the users or roles with whom you wish to share the dashboard.
* **See who has access**. Lists the users and roles with whom the dashboard is already shared.
* **Shareable URL**. Shows the URL for the shared dashboard, with options for sharing the dashboard with filters and time range and filter settings. 

![Share Dashboard New.png](/img/dashboards-new/share-dashboard-new/Share-Dashboard-New.png)

## How to share a dashboard

This section walks you through the process of sharing a dashboard with other people within your organization.

To share a dashboard within your organization, do the following:

1. Click the share icon on the dashboard or share it from the [Library](/docs/get-started/library).

    ![share icon.png](/img/dashboards-new/share-dashboard-new/share-icon.png)

1. Click in the **Share with specific users and roles** field and select with whom to share the dashboard from the dropdown list. 

    If you choose **Your Entire Organization**, all users in your organization will be granted the access permissions you specify in the next step. 

1. In the **Access** area, select the user permissions you want to grant from the dropdown list: **Edit**, **View**, or **Manage.** 
1. Optionally, select **Advanced Access** option to allow users to grant view access to others. For more information, see the [Available Permission Levels](/docs/manage/content-sharing#available-permission-levels) section of the [Share Content](/docs/manage/content-sharing) page.

    ![ShareDashboard_Advanced_Access.png](/img/dashboards-new/share-dashboard-new/ShareDashboard_Advanced_Access.png)

1. To share the dashboard with another set of users, but with different access permissions, click **Add users with another access level** and repeat steps 2 and 3. 

    ![ShareDashboard_User_Roles.png](/img/dashboards-new/share-dashboard-new/ShareDashboard_User_Roles.png)

1. To send an email to the recipients of the shared dashboard, toggle **Notify recipients by email** to ON, and enter a note in the text field.

    ![ShareDashboard_Email_notification.png](/img/dashboards-new/share-dashboard-new/ShareDashboard_Email_notification.png)

1. Click **Share**.

## Shareable URL

A URL to your Dashboard is available from the **Shareable URL** section. You have the option to include the current time range or variable values in the URL.

![dashboard new shareable url.png](/img/dashboards-new/share-dashboard-new/dashboard-new-shareable-url.png)
