---
id: access-keys
title: Access Keys
description: Access keys allow you to securely register new Collectors or access Sumo Logic APIs.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

In Sumo Logic, you'll need an access key to:

* **Register new Collectors**. When you install a Collector, in addition to having a role that grants you the **Manage Collectors** capability, you must supply an access key. You can use a different access key for each Collector, or use the same access key for multiple Collectors. The only time a Collector uses the access key is at installation, so if a key is deleted after a Collector has been set up, the Collector isn't affected.
* **Use Sumo Logic APIs**. You must supply an access key to use the Sumo Logic APIs. See [API Authentication](/docs/api/getting-started#authentication) for details.

import Iframe from 'react-iframe';

:::sumo Micro Lesson

Managing Access Keys (how to).

<Iframe url="https://www.youtube.com/embed/1UY7vQiJwQ4?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::

## Prerequisites

* You'll need the [**Create Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security) to create an access key.
* You'll need the [**Manage Access Keys** capability](/docs/manage/users-roles/roles/role-capabilities#security) to manage access keys created by other users in your org.


## Create an access key

### From the Preferences page

1. In Sumo Logic, click your name in the left-nav and open the **Preferences** page.
1. In the **My Access Keys** section, click **+ Add Access Key**.<img src={useBaseUrl('/img/security/access-key-preferences-page.png')} alt="Add Access Key" style={{border: '1px solid gray'}} width="800"/>
1. When the **Create an Access Key** window appears, enter a name for your access key. If you don’t want to create an allowlist of domains from which the access key can be used to access Sumo APIs, proceed to the step. <br/><img src={useBaseUrl('/img/security/create-access-key.png')} alt="Create an Access Key" style={{border: '1px solid gray'}} width="500"/>
1. Optionally, you can add [**Allowlisted CORS Domains**](#cors-support), which will allow you to use this newly created access key to access Sumo APIs.
    :::note
    Enter the domains in the [Origin format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) described in Mozilla help. The URL pattern must include the HTTPS protocol and a domain name. A port is optional.
    :::
1. Click **Create Key** to generate the key. Be sure to copy both the generated Access ID and Access Key before clicking **Done**.<br/><img src={useBaseUrl('/img/security/generated-access-key.png')} alt="Access key successfully created" style={{border: '1px solid gray'}} width="450"/>
   :::warning
   After you click **Done**, you will not be able to recover this Access ID and Access Key.
   :::

### From the Access Keys page

Administrators can create access keys under **Administration** > **Security** > **Access Keys** as an alternative to doing it from the [Preferences page](#from-the-preferences-page).

1. At the top right of the table, click **+ Add Access Key**. <br/><img src={useBaseUrl('/img/security/access-key-security-page.png')} alt="Add Access Key" width="700"/>
1. Follow the steps from [the previous section](#from-the-preferences-page), starting with step 3.

#### CORS support

Sumo supports cross-origin resource sharing (CORS), a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin. 

When you create an access key, you can optionally define an allowlist of domains that may access Sumo APIs using that access key. 

Whether Sumo accepts or rejects an API request depends on whether it contains an ORIGIN header and the entries in the allowlist. 

Sumo rejects:

* Requests with an ORIGIN header but the allowlist is empty.
* Requests with an ORIGIN header that do not match any entry in the allowlist.

When Sumo rejects a request, it issues an httpErrorCode 403 error. The error key is "forbidden" and the error message is: `The request origin is not allowlisted to use this access key`.

Sumo accepts:

* Requests without an ORIGIN header. 
* Requests with an ORIGIN header that matches an entry in the allowlist.
* All OPTIONS requests.

When Sumo accepts a request, the response includes the ORIGIN header in
an Access-Control-Allow-Origin header.

## Edit, deactivate, or delete an access key

Anyone, regardless of role, can edit, activate, deactivate, and delete access keys you've created.

1. In Sumo Logic, click your name in the left-nav and open the **Preferences** page.
1. Hover your mouse over an access key and click the three-dot kebab icon to reveal the modification options:<br/><img src={useBaseUrl('/img/security/my-access-keys1.png')} alt="My Access Keys" style={{border: '1px solid gray'}} width="800"/>
   * **Edit**. Opens up a window where you can modify the allowlist for your access key.
   * **Deactivate/Reactivate**. Depending on the current status of your access key, you'll see either a **Deactivate** or **Reactivate** option. If you deactivate an access key, Sumo Logic will retain the key credentials, but render the key useless. By default, Sumo Logic will deactivate an access key if it has gone unused for more than 30 days, though the [Access Keys Deactivation policy](#access-keys-deactivation-policy) can be updated by a Sumo Logic administrator. You can reactivate a key at any time to begin using it again.
  :::note
  After an access key is deactivated, there can be a brief period of time during which a previous successful authentication remains cached and a subsequent API request using the deactivated key will succeed. This could occur if the access key was used to authenticate within 15 minutes prior to the key being deactivated.
  :::
   * **Delete**. Use the trash can icon to permanently remove the access key. The key will no longer be usable for API calls. However, deleting a key used to register a Collector does not affect the Collector, as the only time a Collector uses the access key is at installation.

## Edit, deactivate, or delete an org access key

If you have the [**Manage Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security), you can you can edit, deactivate, and delete any access keys created by other users in your organization.

1. Go to the **Security** > **Access Keys** page for a list of all access keys in your account. 
1. Hover your mouse over an access key and click the three-dot kebab icon. This reveals the same modification options that appear on the **Preferences** page, [as described above](#edit-deactivate-or-delete-an-access-key).

### Access Keys Deactivation policy

To enhance the security of your account, Sumo Logic will by default automatically deactivate access keys that haven’t been used for 30 days or more. As an extra security measure, deactivating an access key that has gone unused will ensure that forgotten keys cannot be used later on to access your account.

:::info For Administrators only
This section is visible to Administrators only.
:::

An administrator can adjust the limit to the number of days an Access Key can go unused before being automatically deactivated. To configure this option, you must be a Sumo Logic Administrator or have the **Manage organization settings** role capability.

To configure the Access Keys Deactivation policy:
1. Go to **Administration > Security > Policies**.
1. Under the **Access Keys Deactivation** policy section, select a value in the **No. of Days** field.<br/><img src={useBaseUrl('img/security/access-keys-deactivation.png')} alt="Access Keys Deactivation" width="400"/>
