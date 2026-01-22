---
id: enable-support-account-new
title: Enable Support Account Access
description: Allow Sumo Logic support users to troubleshoot and resolve issues directly in your environment.
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>


import useBaseUrl from '@docusaurus/useBaseUrl';

Administrators at your company can enable support account access to your organization, which allows Sumo Logic support users to review and resolve complex issues. These users are added to your organization's Sumo Logic account. Your administrators can approve access for specific Sumo Logic support users for a set time period, and can revoke access when access is no longer needed.

:::important
Remember to capture any content created by the Sumo Logic support users and assign to another user before revoking access.
:::

## Enable support account access to your organization

To enable support account access to your organization for specific Sumo Logic support users:

1. Work with your Sumo Logic support engineer or account representative to determine if you need to grant access to Sumo Logic support users. If access is needed, you must enable it on the **Policies** page.
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. 
1. Under **Support Account Access**, select the **Enable Support Account Access** check box. (Only administrators with the [Manage Support Access](/docs/manage/users-roles/roles/role-capabilities/#security) role capability can set this checkbox.) Now you are ready to accept account access requests from Sumo Logic support users.<br/><img src={useBaseUrl('img/security/enable-support-account-access-checkbox.png')} alt="Support Account Access checkbox" style={{border: '1px solid gray'}} width="500" />
1. When Sumo Logic sends an email to request support account access, click **Manage Access** in the email.<br/><img src={useBaseUrl('img/security/enable-support-account-access-email.png')} alt="Support Account Access email" style={{border: '1px solid gray'}} width="300" />
1. You are redirected to the Sumo Logic **Policies** page, and the support user's access request appears in a table under **Support Account Access**. Click **Approve Access** to approve the support user's request. (If you did not coordinate this access request with your support engineer, click **Deny Access**.)<br/><img src={useBaseUrl('img/security/enable-support-account-access-user-request.png')} alt="Support Account Access request" style={{border: '1px solid gray'}} width="800" />
1. When you click **Approve Access**, a dropdown box appears. Select the duration for the support user's access: <br/><img src={useBaseUrl('img/security/enable-support-account-access-duration-dropdown.png')} alt="Support Account Access duration dropdown" style={{border: '1px solid gray'}} width="150" />
1. Once you have approved access for a specific Sumo Logic support user, the **Approved By** column shows your name, and the **Expires On** column shows the final day of access. The listed support user will have access to your organization for the duration of that time period.<br/><img src={useBaseUrl('img/security/enable-support-account-access-user-access-accepted.png')} alt="Support Account Access accepted" style={{border: '1px solid gray'}} width="800" />
1. Depending on the nature of the work that must be done to troubleshoot in your environment, additional support users may request access. Approve these users as needed.<br/><img src={useBaseUrl('img/security/enable-support-account-access-users.png')} alt="Multiple Support Account Access users" style={{border: '1px solid gray'}} width="800" />
1. To remove access for a user, click **Revoke Access**. To disable Sumo Logic support account access altogether, deselect the **Enable Support Account Access** check box.

## FAQ

#### Who can access my account?

When a support user requests access, they are asked for the explicit reason why access is required. Additionally, you can control the amount of time the agent can access your account to ensure it is limited to the shortest amount of time necessary to complete the investigation.

#### Do I need to create a special user account? 

No, the Sumo Logic support user is automatically added to your organization's account. If you accidentally delete the user, you can just disable, then re-enable the **Support Account Access** checkbox, and the Sumo Logic support user will be recreated. However, any content created or shared from the previous iteration of the Sumo Logic support user will be deleted.
