---
id: enable-support-account
title: Enable a Support Account
description: Support accounts help you address support issues when they arise.
---

Administrators can decide to enable a Sumo Logic support account, which grants very select Sumo Logic support agents access to your organization's account, helping those agents to review and resolve complex issues. Admins can choose to keep the support account enabled full-time, or the account can be disabled when no issues are being investigated.

When a support account is enabled, a special user is added to your organization's Sumo Logic account, named Sumo Logic Support. This is the user that Sumo Logic support agents will use to log in to your organization's account to troubleshoot issues. If you disable your support account, the Sumo Logic Support user account is disabled.

:::important
Remember to capture any content created by the Sumo Logic support account and assign to another user before disabling.
:::

## Who can access my support account?

When a support agent requests access, he or she is asked for the explicit reason why access is required. Additionally, you can control
the amount of time the agent can access the support account to ensure it is limited to the shortest amount of time necessary to complete the investigation.

## Do I need to create a special user account? 

No, the Sumo Logic support user account is automatically added to your organization's account. If you accidentally delete the user, you can
just disable, then re-enable the support account and the Sumo Logic support user will be recreated. However, any content created or shared from the previous iteration of the Sumo Logic support user will be deleted.

## Enable the support account for your organization

![image1.png](/img/security/enable-support1.png)

To enable a support account:

1. Go to **Administration** > **Security** > **Policies**.
1. Next to **Support Account Access**, select the **Enable** check box.
1. Select a duration for the Support Account Access. This determines how long the account will be enabled. You can choose from the following options depending on your needs and comfort level with our access:
    * 1 day (default)
    * 1 week (recommended for most issues)
    * 1 month
    * 1 year
    * Indefinite (please check with your own Security or Compliance team before selecting)

To disable the support account, deactivate the **Enable** check box.
