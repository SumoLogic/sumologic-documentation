---
id: offboard-user
title: Offboard a User
description: Steps to take when removing a user from your organization's Sumo Logic account.
---

When it's time to remove a user from your organization's Sumo Logic account, there are a few important steps to take before actually disabling or deleting that user. To save the settings for a user and temporarily prevent access, you can [deactivate a user](deactivate-activate-user.md) rather than deleting them. Disabled users cannot log in to their Sumo Logic account, giving you time to replicate content.

To safeguard content in your organization's Sumo Logic account perform the following tasks before deleting or deactivating a user.

## Transfer account owner (if necessary)

A user designated as Account Owner cannot be deleted. To transfer ownership, the account owner must do this on the **Account** page. For more information, see [Cloud Flex Legacy Accounts](/docs/manage/manage-subscription/cloud-flex-legacy-accounts) or [Sumo Logic Credits Accounts](/docs/manage/manage-subscription/sumo-logic-credits-accounts), depending on your Sumo Logic packaging.

:::note
If the account owner leaves your organization and you cannot transfer the account ownership, please [submit a support ticket](https://support.sumologic.com/support/s) to transfer the account ownership.
:::

## Check for allowlisted IP addresses

Verify if the user has an IP address that should be removed on the Service AllowList Settings page.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the Service AllowList Settings page, in the main Sumo Logic menu select **Administration > Security > Service AllowList Settings**. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Service AllowList Settings page, in the top menu select **Administration**, and then under **Account Security Settings** select **Service AllowList Settings**. You can also click the **Go To...** menu at the top of the screen and select **Service AllowList Settings**.
 

## Check for access to any shared Access IDs and Keys

If a deleted user's Access IDs and Keys are used in automation tools like Chef or Puppet to register new Collectors, registrations will fail. Delete and recreate any Access IDs and Keys as necessary.

## Deactivate or delete the user

Once these steps are complete, you can deactivate or delete the user. For instructions, see:

* [Deactivate a User](deactivate-activate-user.md)
* [Delete a User](delete-user.md)
