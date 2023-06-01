---
id: access-keys
title: Access Keys
description: Access keys allow you to securely register new Collectors or access Sumo Logic APIs.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

In Sumo Logic, you must use an access key to:

* **Register new Collectors.** When you install a Collector, in addition to having a role that grants you the **Manage Collectors** capability, you must supply an access key. You can use a different access key for each Collector, or use the same access key for multiple Collectors. The only time a Collector uses the access key is at installation, so if a key is deleted after a Collector has been set up, the Collector isn't affected.
* **Use Sumo Logic APIs.** You must supply an access key to use the Sumo Logic APIs. See [API Authentication](/docs/api/getting-started#authentication) for details.

You can create and manage your own access keys on the **Preferences** page in the Sumo web app. If your role grants you the **Manage Access Keys** capability, you can manage access keys created by other Sumo users on the **Administration** > **Security** > **Access Keys** page.

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


## Create your access key

### From the Preferences page

If you have the [**Create Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security), you can use the **Preferences** page to create access keys.

To create your own access keys:

1. In Sumo Logic, click your name in the left-nav and open the **Preferences** page.
1. In the **My Access Keys** section, click **+ Add Access Key**.<img src={useBaseUrl('/img/security/access-key-preferences-page-2.png')} alt="Add Access Key" width="800"/>
1. The **Create a Sumo Logic Access Key** window appears.
<img src={useBaseUrl('/img/security/create-access-key.png')} alt="Create an Access Key" width="600"/>
1. Enter a name for the access key in the **Name** field. If you don’t want to create an allowlist of domains from which the access key can be used to access Sumo APIs, go to step 7 below.
1. (Optional) In this step, you can define one or more domains that may use the access key to access Sumo APIs.
  :::note
  Enter a domain in the **Allowlisted CORS Domains** field and click **Add**. Enter the domains in the [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) format described in Mozilla help. The URL pattern must include the HTTPS protocol and a domain name, a port is optional.
  :::
  <img src={useBaseUrl('/img/security/create-access-key-2.png')} alt="Add a domain for an access key" width="600"/>
1. The window updates, and displays the domain you added.Repeat steps 5 and 6 to add additional domains to the allowlist.
1. Click **Create Key** to generate the key. 
1. The window displays the generated Access ID and Access Key. Copy both before clicking **Done**. After you press **Done**, you will not be able to recover the Access ID and Access Key.
<img src={useBaseUrl('/img/security/generated-access-key.png')} alt="Access key successfully created" width="600"/>

### CORS support

Sumo supports cross-origin resource sharing (CORS), a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin. 

When you create an access key, you can optionally define an allowlist of domains that may access Sumo APIs using that access key. 

Whether Sumo accepts or rejects an API request depends on whether it contains an ORIGIN header and the entries in the allowlist. 

Sumo rejects:

* Requests with an ORIGIN header but the allowlist is empty.
* Requests with an ORIGIN header that don't match any entry in the allowlist.

When Sumo rejects a request, it issues an httpErrorCode 403 error. The error key is "forbidden" and the error message is: `The request origin is not allowlisted to use this access key`.

Sumo accepts:

* Requests without an ORIGIN header. 
* Requests with an ORIGIN header that matches an entry in the allowlist.
* All OPTIONS requests.

When Sumo accepts a request, the response includes the ORIGIN header in
an Access-Control-Allow-Origin header.



## Edit, deactivate, or delete an access key

You can use the **Preferences** page to edit, activate, deactivate, and delete your access keys. 

When you mouse over an access key on the **Preferences** page, several controls appear. 
<img src={useBaseUrl('/img/security/my-access-keys1.png')} alt="My Access Keys" width="800"/>

* **Edit**. The pencil icon opens up an **Edit Access Key** window where you can modify the allowlist for the access key.
* **Deactivate/Reactivate**. Depending on the current status of the key, there will be either a **Deactivate** or **Reactivate** link. If you deactivate an access key, Sumo Logic retains the key credentials but renders the key useless. By default, Sumo Logic will deactivate an Access Key if it has gone unused for more than 30 days, though the [Access Keys Deactivation policy](#access-keys-deactivation-policy) can be updated by a Sumo Logic administrator. You can reactivate a key at any time to begin using it again.
  :::note
  After an access key is deactivated, there can be a brief period of time during which a previous successful authentication remains cached and a subsequent API request using the deactivated key will succeed. This could occur if the access key was used to authenticate within 15 minutes prior to the key being deactivated.
  :::
* **Delete**. Use the trash can icon to permanently remove the access key. The key will no longer be usable for API calls. However, deleting a key used to register a Collector does not affect the Collector, as the only time a Collector uses the access key is at installation.

### Access Keys Deactivation policy

To enhance the security of your account, Sumo Logic will by default automatically deactivate any Access Keys that haven’t been used for over 30 days. Deactivating Access Keys that have gone unused ensures that forgotten keys cannot be later used to access your account. 

An administrator can adjust the limit to the number of days an Access Key can go unused before being automatically deactivated. To configure this option, you must be a Sumo Logic Administrator or have the **Manage organization settings** role capability. 

To configure the Access Keys Deactivation policy:
1. Go to **Administration > Security > Policies**.
2. Locate the **Access Keys Deactivation** policy setting. 
3. Select a value in the **No. of Days** field.
   <img src={useBaseUrl('img/security/access-keys-deactivation.png')} alt="Access Keys Deactivation" width="600"/>


## Manage all users’ access keys on Access Keys page

If you have the [**Manage Access Keys** role capability](/docs/manage/users-roles/roles/role-capabilities#security), you can manage access keys created by other Sumo Logic users in your organization: you can edit, deactivate, and delete any access key. You can use the **Access Keys** page to create and edit your own access keys. 

### Generate an access key 

1. Go to **Administration** > **Security** > **Access Keys**.
<img src={useBaseUrl('/img/security/access-key-security-page.png')} alt="Add Access Key" width="800"/>
1. At the top right of the table, click **+ Add Access Key**.
1. Follow the steps to create your own access keys [from the Preferences page](#from-the-preferences-page) above, starting with step 3.

### Edit, deactivate, or delete an access key

The **Security** > **Access Keys** page lists all access keys in your account. 

When you mouse over an access key, a three-dot more options menu appears, with three options.
<img src={useBaseUrl('img/security/access-key-three-dot.png')} alt="Edit access key" width="800"/>

* **Edit**. Opens up an **Edit Access Key** window where you can modify the allowlist for the access key.
* **Deactivate/Reactivate**. Depending on the current status of the key, there will be either a **Deactivate** or **Reactivate** option. If you deactivate an access key, Sumo retains the key credentials but renders the key useless. You can reactivate a key at any time to begin using it again. 
* **Delete**. Use the trash can icon to permanently remove the access key. The key will no longer be usable for API calls. However, deleting a key used to register a Collector has no effect on the Collector, as the only time a Collector uses the access key is at installation.
