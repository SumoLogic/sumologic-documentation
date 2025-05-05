---
id: service-accounts
title: Service Accounts
description: Service accounts allow you to create access keys that can be used in scripts or automation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A service account allows you to create [access keys](/docs/manage/security/access-keys/) for processes that run Sumo Logic APIs. You can use a service account to create multiple access keys. Because access keys in a service account are not tied to an individual user, they can continue to be used even if the creator’s user account is deactivated or deleted. Service accounts are an ideal way to ensure continuity of operation for critical services. 

You can use service accounts to provide authentication for operations that use Sumo Logic APIs, such as:
* API scripts
* Third party integrations
* Infrastructure as code (for example, Terraform)

Benefits of using service accounts include:
* The **Service Accounts** tab, a dedicated page to manage service keys and to reduce their being confused with [personal access keys](/docs/manage/security/access-keys/#from-the-personal-access-keys-tab).
* Access keys on service accounts can be [scoped](#add-an-access-key-to-a-service-account) with reduced capabilities to reduce impact.
* There is [audit trail](#audit-logging-for-service-account-activity) for changes to service keys.

:::tip
You can use the API to create and manage service accounts. See [Service Accounts API](/docs/api/service-accounts/).
:::

## Prerequisites

Only administrators can create service accounts. If you are unsure whether you are an administrator, you can view your role in **Preferences** (see [Onboarding Checklists](/docs/get-started/onboarding-checklists/)).

## Create a service account

To configure a service account, you must first create the account and then add access keys to it. You can add multiple access keys to each service account. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Service Accounts**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Service Accounts**. You can also click the **Go To...** menu at the top of the screen and select **Service Accounts**.
1. On the **Service Accounts** tab, click **+ Add Service Account**.<br/><img src={useBaseUrl('/img/security/service-accounts-page.png')} alt="Service Accounts tab" style={{border: '1px solid gray'}} width="700"/>
<br/>The **Add Service Account** window appears.<br/><img src={useBaseUrl('/img/security/add-service-account.png')} alt="Add Service Account window" style={{border: '1px solid gray'}} width="300"/>
1. **Name**. Enter a name for your service account. Make it descriptive enough so that others will be able to tell what its purpose is.
1. **Email**. Enter an email to associate with the service account. It should be an email monitored by an organization rather than an email for an individual, so that it is not dependent on use by a single person.
1. **Roles**. Select the roles to assign to the service account. A service account must have the [role capabilities](/docs/manage/users-roles/roles/role-capabilities) needed to execute the tasks its access keys are needed for.  
   :::tip
   You can further limit permissions in the access keys using scope. The scoping of keys allows you to further restrict an access key to a subset of the service account’s assigned role capabilities.
   :::
1. Click **Save**.
1. Proceed to the next section to add access keys to the service account.

### Add an access key to a service account

After you have created a service account, add access keys to the service account. The access keys are tied to the service account. When you create an access key for a service account, ensure that the scope of the key is restricted to only the rights needed for the key. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Service Accounts**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Service Accounts**. You can also click the **Go To...** menu at the top of the screen and select **Service Accounts**.
1. Select a service account.
1. Click **Add Access Key**.<br/><img src={useBaseUrl('/img/security/service-account-details.png')} alt="Add Access Key button on service account details pane" style={{border: '1px solid gray'}} width="300"/>
1. The **Add New Access Key** window appears. Add the access key information, including scopes. Follow the steps to add an access key as described in [Create an access key](/docs/manage/security/access-keys/#create-an-access-key). <br/><img src={useBaseUrl('/img/security/create-access-key.png')} alt="Add New Access Key screen" style={{border: '1px solid gray'}} width="500"/>
1. You can add multiple access keys to the service account.

:::note
Any access keys you add on a service account appear on the [**Access Keys** tab](/docs/manage/security/access-keys/#from-the-access-keys-tab).
:::

## Change a service account

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Service Accounts**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Service Accounts**. You can also click the **Go To...** menu at the top of the screen and select **Service Accounts**.
1. Hover your mouse over a service account and click the three-dot kebab icon to reveal the modification options.<br/><img src={useBaseUrl('/img/security/modify-options-for-service-accounts.png')} alt="Edit a service account" style={{border: '1px solid gray'}} width="700"/>

:::warning
When a service account is deactivated or deleted, the access keys on the service account are also deactivated or deleted. For more information about deactivation, see [Access Keys deactivation policy](/docs/manage/security/access-keys/#access-keys-deactivation-policy).
:::

## Change an access key on a service account

To modify only the access keys on a service account (rather than the service account itself):
1. Open the service account.
1. Click the number under **Access Keys**. <br/><img src={useBaseUrl('/img/security/edit-access-keys-on-service-account.png')} alt="Edit access keys on a service account" style={{border: '1px solid gray'}} width="300"/>
1. Select the access key you want to change.
1. Make changes as needed. You can change the domains and scope, deactivate the key, or delete the key.

## Audit logging for service account activity

Service account events are recorded in the Audit Event Index as user events. To search for for service account events, run this query:

```
_index=sumologic_audit_events _sourceCategory=users
```

Service account events will return with `subsystem` shown as `serviceAccounts`.

For more information about audit logging, see [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/).
