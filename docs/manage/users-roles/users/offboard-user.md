---
id: offboard-user
title: Offboard a User
description: Steps to take when removing a user from your organization's Sumo Logic account.
---


When it's time to remove a user from your organization's Sumo Logic account, there are a few important steps to take before actually disabling or deleting that user. To save the settings for a user and temporarily prevent access, you can [deactivate a user](deactivate-activate-user.md) rather than deleting them. Disabled users can't log in to their Sumo Logic account, giving you time to replicate content.

To safeguard content in your organization's Sumo Logic account perform the following tasks before deleting or deactivating a user.

## Transfer account owner (if necessary)

A user designated as Account Owner cannot be deleted. To transfer ownership, the account owner must do this on the **Account** page. For more information, see [Cloud Flex Accounts](/docs/manage/manage-subscription/cloud-flex-accounts.md) or [Cloud Flex Credits Accounts](/docs/manage/manage-subscription/cloud-flex-credits-accounts.md), depending on your Sumo Logic packaging.

## Check for allowlisted IP addresses

Verify if the user has an IP address that should be removed under **Administration** > **Security**.

## Check for access to any shared Access IDs and Keys

If a deleted user's Access IDs and Keys are used in automation tools like Chef or Puppet to register new Collectors, registrations will fail. Delete and recreate any Access IDs and Keys as necessary.

## Deactivate or delete the user

Once these steps are complete, you can deactivate or delete the user. For instructions, see:

* [Deactivate a User](deactivate-activate-user.md)
* [Delete a User](delete-user.md)
