---
slug: /manage/content-sharing
title: Content Sharing in Sumo Logic
description: Content Sharing allows you to selectively share and collaborate on apps, dashboards, and searches with specific users or roles.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Content sharing allows you to selectively share and collaborate on apps, dashboards, and searches with specific users or roles. As an administrator, you can use content sharing to share ownership of apps, searches and dashboards, or to highlight key content to specific users and groups. As a user, you have the flexibility to control how broadly your content is shared within your organization.

You can share apps, log searches, metric searches, dashboards, and folders with a user, a role, or combinations of the two. You can edit the sharing permissions at any time and share and revoke as needed from the **Share** dialog:  

<img src={useBaseUrl('img/content-sharing/ShareSearchPrime.png')} alt="Share dialog"  style={{border: '1px solid gray'}} width="700"/>

## Share from any location

You can share content from the following locations:

* **Left navigation bar.** Recommended when you are familiar with the content and need to quickly share with another user.
* **Library.** Recommended when you need a detailed view of the content, who created it, and when it was last modified.

In either location, you click the kabob icon to locate the **Share** option and the dialog appears.

## Sharing notifications

When you share content, the users with whom you have shared it are notified by email. A user can also see shared content in the library (listed in the left navigation bar). By default, any user or role with which you share content receives an email notification that names the person who is sharing the content, the organization, and the type of content that is shared. You can also add text to the email notification to explain why you think the content is useful to them.

<img src={useBaseUrl('img/content-sharing/Emailnotification.png')} alt="Sharing notification" width="500"/>

To find content in the library that has been shared with you, click the clock image in the left navigation bar: <img src={useBaseUrl('img/content-sharing/recent-icon.png')} alt="Recent icon" style={{border: '1px solid gray'}} width="30" />

## Sharing apps, dashboards, log searches, metric queries, and folders

To share content from the left navigation bar or the library:

1. Click the details icon ![details](/img/content-sharing/details.png) for the content you want to share.
1. Select **Share** from the dropdown menu.

    <img src={useBaseUrl('img/content-sharing/share-search.png')} alt="Share search" width="150"/>

    :::note
    * The **Share** option appears on the dropdown menu only if you have permissions to grant access. See [Available permission levels](#available-permission-levels).
    * The **View in Library** option is present when you click the details icon from the left navigation bar. 
    :::

1. In the **Share** dialog, enter the user name or role name to receive access. For example, if you want all users with the **Analyst** role to be able to edit the content, choose **Analyst**:    

    <img src={useBaseUrl('img/content-sharing/analyst.png')} alt="Analyst role selected in Share dialog" style={{border: '1px solid gray'}} width="700"/>

    If you have an unsaved search, these options will not be available to you. We need a name saved for your search before we can offer this dialog. If you want to share an unsaved search, you can share a link from the available dialog.   

    <img src={useBaseUrl('img/content-sharing/unsaved-search.png')} alt="Unsaved search" style={{border: '1px solid gray'}} width="700"/>
1. Optional. If you are sharing with a large role, or a user who already expects access to this search, you can turn off **Notify recipients by email**. If you do want to send an email notification, we recommend that you include a note in the email for the recipients to indicate what to do with their new content and leave the option enabled.
1. Choose the level of access from view, edit, or manage. For details on permission levels, see [Available permission levels](#available-permission-levels).
1. Optional. Choose **Advanced Access** to further refine access to the content. For details on these options, see [Available permission levels](#available-permission-levels).

    <img src={useBaseUrl('img/content-sharing/PermissionsShare.png')} alt="Permissions share" style={{border: '1px solid gray'}} width="700"/>

## Navigate content sharing tabs

Sumo Logic provides a few ways to navigate your content based on what you want to view.

import UiElements from '../../reuse/ui-elements.md';

<UiElements/>

## Available permission levels

You can share your content with specific users or roles. As a best practice we recommend sharing at the search or dashboard level, or if you want to share a folder, share a subfolder. If all contents of the folder are shared, you can’t exclude a particular content item in a folder as private content.

By default each permission level allows the user to grant that level of permission to another user. By default we assume that if a user has view access, for example, that they would be capable of deciding who should also have view access. If you have content where this is not the case, you can restrict their rights to allow others to have view, edit, or manage access.

   :::note
   App content can only be shared with view access. Edit and manage access is not allowed for installed apps.
   :::

Consider carefully what level of permissions users and roles need with
your content:

| Permission Level | Default Permissions | Available Advanced Options/Restrictions |
| :-- | :-- | :-- |
| View | Users can see the content and grant access to others to view. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/><br/>**Grant View Access.** User can grant view access to others. |
| Edit | Users can make changes to the content and grant view or edit access to others. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/><br/>**Grant View Access.** User can grant view access to others.<br/><br/>**Grant Edit and View Access.** User can grant edit and view access to users. |
| Manage<br/>(Recommended for individual users only) | Designated users are considered co-managers of the content and can modify the content as well grant the right to other users to view, edit, manage, or Move the content. | **Cannot Grant Access.** Prevents the user from sharing view access.<br/><br/>**Grant View Access.** User can grant view access to others.<br/><br/>**Grant Edit and View Access.** User can grant view and edit access to users.<br/><br/>**Grant Manage, Edit, and View Access.** User can grant manage, edit, and view access to users. |


In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/content-sharing/admin-mode"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>Admin Mode</h4></a>
  <p>Learn how to control your content and add important items to the Admin Recommended folder.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/content-sharing/changing-alerts"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>Changing Other Alerts</h4></a>
  <p>Learn how to modify or turn off alerts created by another user.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/content-sharing/content-sharing-faq"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>FAQ</h4></a>
  <p>Get to know the answers to basic questions around Content Sharing.</p>
  </div>
</div>
</div>
