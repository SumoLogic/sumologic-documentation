---
id: deactivate-activate-user
title: Deactivate or Activate a User
description: Deactivate a user to make the user inactive without removing the user account, or reactivate a previously deactivated user.
---


To temporarily prevent a user from logging into the Sumo Logic service, you can change the user's status to Inactive. You can reactivate an inactive user at any time without the need to re-enter user details.

:::note
If you want to permanently remove a user, [you can delete them](delete-user.md). However, before you delete a user, make sure to perform the steps in [Offboard a User](offboard-user.md).
:::

## What happens when you deactivate a user

* All dashboards owned by the user are deactivated.
* Live Mode is disabled for dashboards owned by the user.
* Scheduled searches are deactivated for the user.
* Access keys are deactivated for the user.
* Scheduled views owned by the user are deactivated.
* Monitors continue to run without any impact.

## Deactivate a user

1. Go to  **Administration** > **Users and Roles** > **Users**.

    ![user-options-menu.png](/img/users-roles/users-page.png)

1. Select the row for the user you want to deactivate and choose **Deactivate** from the three-dot options menu.

The user's icon changes from a green check mark to a red exclamation
point. The user is not notified of the change.

## Activate a user

1. Go to  **Administration** > **Users and Roles** > **Users**.
1. Select the row for the user you want to activate and choose **Activate** from the three-dot options menu.

The user's icon changes from a red exclamation point to a green check
mark. The user is not notified of the change.
