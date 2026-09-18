---
id: admin-mode
title: Admin Mode for Content Administrators
sidebar_label: Admin Mode
description: Admin mode allows you to control the content for your organization and to put important items in the Admin Recommended folder.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

As a content administrator with the [Manage Content](/docs/manage/users-roles/roles/role-capabilities/#data-management) role capability, you can assume a super user role within Sumo Logic. When you need to manage the content for your organization, you can choose the content administrator role which will turn off your personal content in the library and allow you to see the entire Sumo Logic file tree. 

In this mode, you can migrate content from one location to another, as well as highlight important content in the Admin Recommended folder. 

## Switch to admin mode

As a content administrator,  you can switch to admin mode at any time in order to move content from one folder to another for anyone in your organization.  

To switch to admin mode:

1. Go to the Library.
1. Select **View as:** > **Content Administrator.** <br/>  <img src={useBaseUrl('img/content-sharing/content-admin.png')} alt="Admin Mode" style={{border: '1px solid gray'}} width="200" />

You will now see the whole file tree for your organization, as well as the Admin Recommended folder.

## Move important content to Admin Recommended

Important content can be dashboards that help new users get started, or common searches that your organization needs often. You can draw attention to this content by putting it into Admin Recommended, which appears at the top of the Library in the left navigation bar.

For example, you can content share an audit dashboard at the top of the Library on the left navigation bar with a particular role such as Administrators and move it into Admin Recommended. All Sumo Logic users with the Administrators role will be able to see it there, but any user without that role, will not see the dashboard.

<img src={useBaseUrl('img/content-sharing/admin-rec.png')} alt="Admin Recommended" style={{border: '1px solid gray'}} width="500" />

To add a dashboard or search to Admin Recommended:

1. Select the **Library** tab from the UI.
1. Toggle to **Content Administrator** mode. 
1. A note loads on the left navigation bar that says **Viewing as Content Administrator**. This is to help you remember why your Personal folder doesn't appear.
1. Make sure you've [shared](/docs/manage/content-sharing) the search, dashboard, or folder with the role or users that you want to be able to access it.
1. Select the options menu for the item you want to move, and choose **Move.**
1. From the **Move** dialog, choose the **Admin Recommended** folder and click **Move**.

:::note
Remember to switch out of Content Administrator viewing when you are done.
:::

## Track content changes in your org

If you need to track what content has been shared in your organization, or recently changed by another content administrator, you can find dashboards to help you track that information in the [Sumo Logic Audit app](/docs/integrations/sumo-apps/audit).
