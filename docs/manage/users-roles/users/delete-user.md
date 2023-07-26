---
id: delete-user
title: Delete a User
description: Deleting a user permanently removes the user and certain content types.
---


Deleting a user permanently removes the user. When you delete a user, you can select a Sumo Logic user account to which to transfer the deleted user’s content, including folders, searches, scheduled searches, scheduled views, monitors, and dashboards. If you don't want to transfer the content to another user, you can choose to delete it along with the user account.

:::note
When you delete a user, a message is written to the Sumo Audit Index, if the audit index is enabled.
:::

If you prefer to prevent a user from accessing Sumo without transferring the user’s Library content, you can [deactivate a user](deactivate-activate-user.md).

:::important
A user designated as Account Owner cannot be deleted. To transfer ownership, the Account Owner must do this on the Account page. For more information, see the [Change the Account Owner](/docs/manage/manage-subscription/manage-org-settings.md) section in the *Manage Organization* topic.
:::

## Before you begin

Before you begin, perform the steps in [Offboard a User.](offboard-user.md) These steps will help you identify any data or access transfers that need to occur before you delete a user and prevent disruption to any automated services set up under that user.

## What happens when you delete a user

* The deleted user’s Access Keys are removed and cannot be restored.
* If you chose to transfer the deleted user’s folder, it is moved to the folder of the new owner. The new owner will have **Manage** access to the transferred content. Note that the transfer of content to the new owner has no impact on other users that have access to the deleted user's content. For example, assume you delete User A and transfer User A’s content to User B. If User C previously had permissions to some of User A’s content, User C will still have the same access to that content. 
* Content created by the deleted user in shared folders is not transferred to the new owner.

:::note
If the user account that created a scheduled search in a shared folder is deleted, the scheduled search will no longer be executed. The owner of the scheduled search will appear as "deleted user" in the Sumo Logic UI. To reinstate the scheduled search you must export the search, and import it back into the Library. 
:::

* Any saved content—saved searches, scheduled searches, dashboards, monitors, and so on—that depend on a Lookup Table created by the user being deleted may no longer run correctly. Note however that Lookup Tables that have been saved in the Admin Recommended folder will not be affected by deletion of a user.
* If a user owns content that was moved to the Admin Recommended folder, when you delete the user and transfer the user's content to another user, the content in Admin Recommended will remain.
* For dashboards, scheduled searches, scheduled views, and monitors for which the deleted user was the run-as user, the new owner becomes the run-as user. So, the transferred dashboards, scheduled searches, scheduled views, and monitors will run with the same data access level as the new owner. This might affect the data seen in the dashboards, scheduled searches, scheduled views, and monitors if the data access level of the owner is different from that of the deleted user. The new owner must have the **Manage Scheduled View** [role capability](../roles/role-capabilities.md) for scheduled views to be successfully transferred.
* Data continues to be indexed into partitions that the deleted user set up. 
* If a new owner is not selected, all scheduled views created by the user being deleted will stop and no new data will be indexed into the scheduled view. (The data itself is not deleted and the name of the scheduled view will still exist).  
* If you transfer content to a new owner, [Monitors](/docs/alerts/monitors) created by the deleted user will run in the context of the new owner.

## Delete a user and transfer content

:::important
Use caution when deleting a user. This action can't be undone.
:::

1. Go to **Administration** > **Users and Roles** > **Users**.  

    ![user-options-menu.png](/img/users-roles/users-page.png)

1. Select the row for the user you want to delete and choose **Delete** from the three-dot options menu.
1. A popup appears, offering you the option to either transfer the user’s content to another user or delete the content along with the user. 

    ![transfer-content-to.png](/img/users-roles/delete-user.png)

1. Click **Transfer Contents To**, select a user from the list that appears, and click **Delete User**.

## Delete a user and user's content

:::important
Use caution when deleting a user. This action can't be undone.
:::

1. Go to  **Administration** > **Users and Roles** > **Users**.  

    ![users-page-2.png](/img/users-roles/users-page-2.png)

1. Select the row for the user you want to delete and choose **Delete** from the three-dot options menu.
1. A popup appears, offering you the option to either transfer the user’s content to another user or delete the content along with the user. 

    ![transfer-content-to.png](/img/users-roles/delete-user2.png)

1. Click the radio button next to **Delete user and all related contents**.
1. You are prompted to type DELETE to confirm your choice.

    ![type-delete.png](/img/users-roles/type-delete.png)

1. Type DELETE and click **Delete User and Contents**.
