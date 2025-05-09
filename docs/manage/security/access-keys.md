---
id: access-keys
title: Access Keys
description: Access keys allow you to securely register new collectors or access Sumo Logic APIs.
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

In Sumo Logic, you'll need an access key to:

* **Register new Collectors**. When you install a collector, in addition to having a role that grants you the **Manage Collectors** capability, you must supply an access key. You can use a different access key for each collector, or use the same access key for multiple collectors. The only time a collector uses the access key is at installation, so if a key is deleted after a collector has been set up, the collector isn't affected.
* **Use Sumo Logic APIs**. You must supply an access key to use the Sumo Logic APIs. See [API Authentication](/docs/api/getting-started#authentication) for details.
* **Run scripts or automation**. Create access keys to provide authentication for scripts or automation.

## Prerequisites

* You'll need the [**Create Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security) to create an access key.
* You'll need the [**Manage Access Keys** capability](/docs/manage/users-roles/roles/role-capabilities#security) to manage access keys created by other users in your org.
* Access keys use the permissions of the user running the key. The user utilizing an access key must have the [role capabilities](/docs/manage/users-roles/roles/role-capabilities) needed to execute the tasks the access key is needed for. 

## Create an access key

### From the Personal Access Keys tab

A *personal access key* is a key that you can create to manage access for personal use. 

:::tip
If you are an administrator who needs to create an access key for system use (such as for API scripts, third party integrations, or infrastructure as code), we recommend you create the access key on a [service account](#from-a-service-account). 
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences > Personal Access Keys**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select your username, and then under **Preferences** select **Personal Access Keys**. You can also click the **Go To...** menu at the top of the screen and select **Personal Access Keys**.
1. On the **Personal Access Keys** tab, click **+ Add Access Key**.<br/><img src={useBaseUrl('/img/security/access-key-preferences-page.png')} alt="Personal Access Keys tab" style={{border: '1px solid gray'}} width="800"/><br/>The **Add New Access Key** window appears.<br/><img src={useBaseUrl('/img/security/create-access-key.png')} alt="Add New Access Key screen" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Enter a name for your access key.  
1. **Allowed CORS Domains (optional)**. Create an allowlist of domains from which the access key can be used to access Sumo Logic APIs. For more information, see [CORS support](#cors-support). 
    :::note
    Enter the domains in the [Origin format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) described in Mozilla help. The URL pattern must include the HTTPS protocol and a domain name. A port is optional.
    :::
1. **Scopes**. For additional security, you can select scopes to give the key only the permissions you specify.
   :::note
   The user who will be utilizing the access key needs to have all the same [role capabilities](/docs/manage/users-roles/roles/role-capabilities) as the scopes on the access key. Otherwise, once the user views the access key details, the scopes will be displayed as red in the UI red with a message that the user does not have rights for those scopes.
   :::
   Select the scopes for the key:
    * **Default**. The key has all permissions.
    * **Custom**. The key has only the specified permissions. <br/><img src={useBaseUrl('/img/security/access-key-scopes.png')} alt="Access key scopes" style={{border: '1px solid gray'}} width="400"/><br/>Select the **View** and **Manage** permissions that you want the access key to have using the available categories.<br/><img src={useBaseUrl('/img/security/custom-scopes-detail.png')} alt="Custom scopes detail" style={{border: '1px solid gray'}} width="550"/>
1. Click **Save** to generate the key. 
1. **IMPORTANT**. Copy both the generated Access ID and Access Key before clicking **Done**. *This is the only time you will be able to copy the ID and key*.<br/><img src={useBaseUrl('/img/security/generated-access-key.png')} alt="Access key successfully created message in Sumo Logic for creating an access key, showing the Access ID and Access Key with options to copy them, and a Done button." style={{border: '1px solid gray'}} width="600"/>
   :::warning
   After you click **Done**, you will not be able to recover this Access ID and Access Key.
   :::

All personal access keys created in the organization are displayed in the **Access Keys** tab, described next. 

### From the Access Keys tab

The **Access Keys** tab shows all access keys in the system. It provides a central place for administrators to manage access keys.

Administrators can create access keys under **Access Keys** as an alternative to doing it [from the Personal Access Keys tab](#from-the-personal-access-keys-tab) or [from a service account](#from-a-service-account).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Access Keys**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Access Keys**. You can also click the **Go To...** menu at the top of the screen and select **Access Keys**.
1. At the top right of the table, click **+ Add Access Key**. <br/><img src={useBaseUrl('/img/security/access-key-security-page.png')} alt="Sumo Logic interface showing a list of access keys with options to add a new access key, search access keys, and statuses of existing keys." style={{border: '1px solid gray'}} width="700"/>
1. Follow the steps in [From the Personal Access Keys tab](#from-the-personal-access-keys-tab) section above, starting with step 3.

### From a Service Account

Administrators can create access keys on a service account for use in scripts or automation. For more information, see [Service Accounts](/docs/manage/security/service-accounts).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Service Accounts**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Service Accounts**. You can also click the **Go To...** menu at the top of the screen and select **Service Accounts**.
1. Select a service account.
1. Click **Add Access Key**.<br/><img src={useBaseUrl('/img/security/service-account-details.png')} alt="Add Access Key button on service account details pane" style={{border: '1px solid gray'}} width="300"/>
1. Follow the steps in [From the Personal Access Keys tab](#from-the-personal-access-keys-tab) section above, starting with step 3.

#### CORS support

Sumo Logic supports cross-origin resource sharing (CORS), a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin. When you create an access key, you can optionally define an allowlist of domains that may access Sumo Logic APIs using that access key. 

Whether Sumo Logic accepts or rejects an API request depends on whether it contains an ORIGIN header and the entries in the allowlist. Sumo Logic rejects:

* Requests with an ORIGIN header but the allowlist is empty.
* Requests with an ORIGIN header that do not match any entry in the allowlist.

When Sumo Logic rejects a request, it issues an httpErrorCode 403 error. The error key is "forbidden" and the error message is: `The request origin is not allowlisted to use this access key`.

Sumo Logic accepts:

* Requests without an ORIGIN header. 
* Requests with an ORIGIN header that matches an entry in the allowlist.
* All OPTIONS requests.

When Sumo Logic accepts a request, the response includes the ORIGIN header in
an Access-Control-Allow-Origin header.

## Edit, activate/deactivate, rotate, or delete access keys

### Personal access keys

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences > Personal Access Keys**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select your username, and then under **Preferences** select **Personal Access Keys**. You can also click the **Go To...** menu at the top of the screen and select **Personal Access Keys**.  
1. Hover your mouse over an access key and click the three-dot icon to reveal the modification options:<br/><img src={useBaseUrl('/img/security/my-access-keys1.png')} alt="Personal Access Keys tab displaying a list of access keys with options to activate/deactivate, edit, rotate, or delete them." style={{border: '1px solid gray'}} width="800"/>
   * **Edit**. Opens up a window where you can modify the allowlist for your access key.
   * **Activate/Deactivate**. Depending on the current status of your access key, you'll see either an **Activate** or **Deactivate** option. If you deactivate an access key, Sumo Logic will retain the key credentials, but render the key useless. By default, Sumo Logic will deactivate an access key if it has gone unused for more than 30 days, though the [access keys deactivation policy](#access-keys-deactivation-policy) can be updated by a Sumo Logic administrator. You can reactivate a key at any time to begin using it again.
     :::note
     After an access key is deactivated, there can be a brief period of time during which a previous successful authentication remains cached and a subsequent API request using the deactivated key will succeed. This could occur if the access key was used to authenticate within 15 minutes prior to the key being deactivated.
     :::
   * **Rotate**. Refresh an access key with a new Access ID and Access Key. Copy the new ID and key and use them in all the places where the previous access key was used. (The old key is still usable for 5 minutes after rotation.) Rotate access keys in accordance with your company's rules. By default, access keys expire in 180 days after creation or rotation, though the [access keys expiration policy](#access-keys-expiration-policy) can be updated by a Sumo Logic administrator. An access key's expiration date appears in the **Expires At** column.
   * **Delete**. Permanently removes the access key. The key will no longer be usable for API calls. However, deleting a key used to register a collector does not affect the collector, since the only time a collector uses the access key is at installation.

### Organization access keys

If you have the [**Manage Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security), you can edit, deactivate, and delete any access keys created by other users in your organization.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Access Keys**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Access Keys**. You can also click the **Go To...** menu at the top of the screen and select **Access Keys**. 

1. Hover your mouse over an access key and click the three-dot kebab icon. This reveals the same modification options that appear on the **Personal Access Key** page, [as described above](#edit-activatedeactivate-rotate-or-delete-access-keys).

### Access keys deactivation policy

To enhance the security of your account, Sumo Logic will by default automatically deactivate access keys that haven’t been used for 30 days or more. As an extra security measure, deactivating an access key that has gone unused will ensure that forgotten keys cannot be used later to access your account.

An administrator can adjust the limit to the number of days an Access Key can go unused before being automatically deactivated. To configure this option, you must be a Sumo Logic Administrator or have the **Manage organization settings** role capability.

To configure the access keys deactivation policy:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. 
1. Under the **Access Keys Deactivation** section, select a value in the **No. of Days** field.<br/><img src={useBaseUrl('img/security/access-keys-deactivation.png')} alt="Access Keys Deactivation settings in Sumo Logic, allowing automatic deactivation of unused or unmodified API access keys after a specified number of days." style={{border: '1px solid gray'}} width="600"/>

    :::note
    This section is visible to Administrators only.
    :::

### Access keys expiration policy

Sumo Logic will expire and deactivate access keys by default 180 days after the keys are created or rotated. Automatically expiring keys ensures they don't remain in use past your company's access key rotation rules. 

An access key's expiration date appears in the **Expires At** column on the **Access Keys** tab. You can sort by this column to see when you must rotate keys. To rotate a key, hover your mouse over an access key, click the three-dot kebab icon, and select **Rotate**. (The old key is still usable for 5 minutes after rotation.) Rotating an access key resets its expiration date according to the number of days in the policy. 

An administrator can adjust the time period before access keys expire. To configure this option, you must be a Sumo Logic Administrator or have the **Manage organization settings** role capability.

To configure the access keys expiration policy:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. 
1. Under the **Access Keys Expiration** section, select a value in the **Expiration** field. <br/><img src={useBaseUrl('img/security/access-key-expiration-policy.png')} alt="Access keys expiration settings in Sumo Logic, allowing automatic expiration of API access keys after a specified number of days." style={{border: '1px solid gray'}} width="600"/>

    :::note
    This section is visible to Administrators only.
    :::

    :::warning
    When you change the policy, all access keys inherit the new policy, and the expiration date for all access keys is reset. For example, if you change the policy to 90 days, then the expiration date is reset on all access keys to 90 days from the date the policy was changed.
    :::

## Audit logging for access key activity

Access key events are recorded in the Audit Event Index. To search for for access key events, run this query:

```
_index=sumologic_audit_events _sourceCategory=accessKeys
```

For more information about audit logging, see [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/).

