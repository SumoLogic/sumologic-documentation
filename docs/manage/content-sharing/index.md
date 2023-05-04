---
slug: /manage/content-sharing
title: Content Sharing in Sumo Logic
description: Content Sharing allows you to selectively share and collaborate on apps, dashboards, and searches with specific users or roles.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Content Sharing allows you to selectively share and collaborate on apps, dashboards, and searches with specific users or roles. As an Admin, you can use content sharing to transfer ownership of searches and dashboards, or to highlight key content to specific users and groups. As a user, you can now choose how widely shared your content is within your Org.

You can share log searches, metric searches, dashboards, and folders with a user, a role, or combinations of the two. You can edit the sharing permissions at any time and share and revoke as needed from the **Share** dialog:  

![ShareSearchPrime.png](/img/content-sharing/ShareSearchPrime.png)

## Share from any location

You can share content from the following locations:

* **Left nav.** Recommended when you are familiar with the content and need to quickly share with another user.
* **Library.** Recommended when you need a detailed view of the content, who created it, and when it was last modified.

In either location, you click the kabob icon to locate the **Share** option and the dialog appears.

## Sharing notifications

When you share content, the users with whom you have shared it are notified by email. A user can also see shared content in the Library (listed in the left nav bar). By default, any user or role with which you share content receives an email notification that names the person who is sharing the content, the Organization, and the type of content that is shared. You can also add text to the email notification to explain why you think the content is useful to them.

![Emailnotification.png](/img/content-sharing/Emailnotification.png)

To find content in the Library that has been shared with you:

1. Click the clock image in the top of the left nav bar.
1. Toggle between **Recently Opened By Me** or **Recently Shared With Me**.   

    ![Dash3.png](/img/content-sharing/Dash3.png)

## Sharing dashboards, log searches, metric queries, and folders

To share content from the Left-nav or the Library:

1. Click the Details icon ![details](/img/content-sharing/details.png) for the content you want to share.
1. Select **Share** from the dropdown menu.

    ![Share Search](/img/content-sharing/share-search.png)

    :::note
    The **View in Library** option is present when you click the Details icon from the Left-nav. 
    :::

1. In the Share dialog, enter the user name or role name to receive access. For example, if you want all users with the **Analyst** role to be able to edit the content, choose **Analyst**:    

    ![analyst](/img/content-sharing/analyst.png)

    If you have an unsaved search, these options will not be available to you. We need a name saved for your search before we can offer this dialog. If you want to share an unsaved search, you can share a link from the available dialog.   

    ![unsaved-search](/img/content-sharing/unsaved-search.png)
1. Optional. If you are sharing with a large Role, or a user who already expects access to this search, you can turn off **Notify recipients by email**. If you do want to send an email notification, we recommend that you include a note in the email for the recipients to indicate what to do with their new content and leave the option enabled.
1. Choose the level of access from View, Edit, or Manage. For details on permission levels, see [Available Permission Levels](#available-permission-levels).
1. Optional. Choose **Advanced Options** to further refine access to the content. For details on these options, see [Available Permission Levels](#available-permission-levels).

    ![PermissionsShare](/img/content-sharing/PermissionsShare.png)

## Navigate Content Sharing Tabs

Sumo provides a few ways to navigate your content based on what you want to view.

| Icon | Tab Name | Definition |
| :-- | :-- | :-- |
| ![](/img/content-sharing/icon-recents.png) | Recents | Access recent content:<ul><li>Content you’ve recently accessed.</li><li>Content recently shared with you.</li></ul> |
| ![](/img/content-sharing/icon-favorites.png) | Favorites | Content you’ve marked as favorite. |
| ![](/img/content-sharing/icon-personal.png) | Personal | Content you manage. |
| ![](/img/content-sharing/icon-library.png) | Library | List of all accessible content, including your creations and the content shared with you. |

## Available Permission Levels

You can share your content with specific users or roles. As a best practice we recommend sharing at the search or dashboard level, or if you want to share a folder, share a subfolder. All contents of the folder are shared, you can’t exclude a particular content item in a folder as private content.

By default each permission level allows the user to grant that level of permission to another user. By default we assume that if a user has View access, for example, that they would be capable of deciding who should also have View access. If you have content where this is not the case, you can restrict their rights to allow others to have View, Edit, or Manage access.

Consider carefully what level of permissions users and roles need with
your content:

| Permission Level | Default Permissions | Available Advanced Options/Restrictions |
| :-- | :-- | :-- |
| View | Users can see the content and grant access to others to view. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/><br/>**Grant View Access.** User can grant view access to others. |
| Edit | Users can make changes to the content and grant View or Edit access to others. | **Cannot Grant Access.** Prevents the user from sharing any access.<br/><br/>**Grant View Access.** User can grant View access to others.<br/><br/>**Grant Edit and View Access.** User can grant Edit and View access to users. |
| Manage<br/>(Recommended for individual users only) | Designated users are considered co-managers of the content and can modify the content as well grant the right to other users to View, Edit, Manage, or Move the content. | **Cannot Grant Access.** Prevents the user from sharing view access.<br/><br/>**Grant View Access.** User can grant view access to others.<br/><br/>**Grant Edit and View Access.** User can grant View and Edit access to users.<br/><br/>**Grant Manage, Edit, and View Access.** User can grant Manage, Edit, and View access to users. |


In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/content-sharing/admin-mode"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>Admin Mode</h4></a>
  <p>Learn how to control your content and add important items to the Admin Recommended folder.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/content-sharing/changing-alerts"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>Changing Other Alerts</h4></a>
  <p>Learn how to modify or turn off alerts created by another user.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/manage/content-sharing/content-sharing-faq"><img src={useBaseUrl('img/icons/business/networking.png')} alt="icon" width="40"/><h4>FAQ</h4></a>
  <p>Get to know the answers to basic questions around Content Sharing.</p>
  </div>
</div>
</div>
