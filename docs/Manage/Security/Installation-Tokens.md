---
id: installation-tokens
sidebar_title: Installation Tokens
description: Use Installation Tokens to register Installed Collectors.
---

# Installation Tokens

Installation Tokens register [Installed Collectors] (/03Send-Data/Installed-Collectors/01About-Installed-Collectors) to your Sumo Logic account. They are assigned to your account, do not expire, and can only be used to register Installed Collectors. You can deactivate, reactivate, or delete tokens at any time.

Opposed to [Access Keys] (/Access-Keys), you can embed your Installation Tokens in installation scripts confident they can't be used to make [API] (/APIs) requests if compromised. You can also freely deactivate or delete [users] (/Users-and-Roles/Manage-Users) without worrying about updating Access Keys in installation scripts since Installation Tokens are associated with your account instead of users.

## Limitations

* Your account can have up to 100 Installation Tokens, active and inactive.
* Installation Token names must be unique.
* When using the RPM or Debian package you need to use user.properties to register Collectors.

## Manage Installation Tokens

Installation Tokens in your account are manageable at **Administration \> Security \> Installation Tokens**.

Managing Installation Tokens requires the **Manage Tokens** role capability.

![Installation Tokens UI table.png](/img/installation-tokens/installation-tokens-table.png)

The **Administration \> Security \> Installation Tokens** page displays the following information: 

* **Status** shows a green checkmark ![green checkmark.png](/img/installation-tokens/green-checkmark.png) to indicate if the Installation Token is active and available for use or an exclamation mark in a red circle ![red circle white exclamation.png](/img/installation-tokens/red-circle-white-exclamation.png) to indicate if the Installation Token is deactivated and not available for use.
* **Token Name** is the name of the Installation Token, these must be unique.
* **Description** shows the optional description of the Installation Token.

On the **Administration \> Security \> Installation Tokens** page
you can:

-   Click **+ Add Token** to add Installation Tokens.
-   Search Installation Tokens
-   Edit Installation Tokens
-   Deactivate Installation Tokens
-   Delete Installation Tokens 

For the Installation Tokens listed, select a row to view its details. A details pane appears to the right of the table where you can edit, deactivate, and delete the token.

![token details pane.png](/img/installation-tokens/token-details-pane.png)

### Add Token

1.  Click the **+ Add Token** button on the
    top right of the table. A panel named **Create Installation 
    Token** appears to the right of the table.
1.  Input a unique name and optionally provide a description then
    click **Save**.

![create token.png](/img/installation-tokens/create-token.png)

### Deactivate Token

Deactivated tokens cannot be used to register Collectors. You can deactivate a token at any time.

Select **Deactivate** from the menu on the right of the row on the table or in the details pane of the token under the **More Actions** dropdown.

![deactivate token.png](/img/installation-tokens/deactivate-token.png)

### Delete Token

Deleted tokens are removed from your account and cannot be used anymore. Since tokens are only used to register a Collector it won't affect registered Collectors.

Select **Delete Token** from the menu on the right of the row on the table or in the details pane of the token under the **More Actions** dropdown.

![delete token.png](/img/installation-tokens/delete-token.png)

## Using Installation Tokens

This section provides information on using Installation Tokens to register [Installed Collectors] (/03Send-Data/Installed-Collectors/01About-Installed-Collectors). For details on Collector installation, see [Install a Collector on Linux] (/03Send-Data/Installed-Collectors/04Install-a-Collector-on-Linux), [Install a Collector on MacOS] (/03Send-Data/Installed-Collectors/02Install-a-Collector-on-MacOS), and [Install a Collector on Windows] (/03Send-Data/Installed-Collectors/03Install-a-Collector-on-Windows).

<Tabs
  className="unique-tabs"
  defaultValue="command"
  values={[
    {label: 'command', value: 'command'},
    {label: 'wizard', value: 'wizard'},
    {label: 'user', value: 'user'},
  ]}>

<TabItem value="command">

### Command line installer

To register an Installed Collector with the [command line installer] (/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/06Parameters-for-the-Command-Line-Installer) you need to run the script with the following authentication parameter:

```-Vsumo.token_and_url```

For example:

```sudo ./SumoCollector.sh -q -Vsumo.token_and_url\<installationToken\>```

Where \<installationToke\>` is the **Token String** you want to use to register the Collector.

</TabItem>
<TabItem value="wizard">

### Setup Wizard UI installer

To register an Installed Collector with the Setup Wizard select the **Setup Wizard Token** authentication option. The Setup Wizard does not provide an option for Installation Tokens.

![wizard authentication step.png](/img/installation-tokens/wizard-authentication.png)

Click next and enter the **Token String** you want to use to register the Collector in the input box for a one-time token. Continue with the installation steps.

</TabItem>
<TabItem value="user">

### user.properties

To register an Installed Collector with [user.properties] (/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/06user.properties) you need to use the authentication parameters `token` and `url`. To use these two parameters you'll need to manually base64 decode the **Token String**. For example, you can use the following Powershell commands to decode the base64 token:

<Tabs
  defaultValue="mac"
  values={[
    {label: 'mac', value: 'mac'},
    {label: 'windows', value: 'windows'},
  ]}>
  <TabItem value="mac">

**Mac OSX/Linux**

```echo\<TOKEN\> | base64 -d```

</TabItem>
<TabItem value="windows">

**Windows**

```[Text.Encoding]::Utf8.GetString([Convert]::FromBase64String(\<TOKEN\>'))```

Once decoded you'll have a string with a token and a URL.

For example, the following decoded **Token String**:

```SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXXhttps://collectors.sumologic.com```

would be used as:

```url=https://collectors.sumologic.com token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX```

</TabItem>
</Tabs>
</TabItem>
</Tabs>

## Audit Tokens

You can use the Audit Event Index to review the management of installation tokens and when they're used to register Collectors. For full details on the event log schema and common parameters see our [Audit Event Index] (Audit_Event_Index) documentation.

### Token management events

When an installation token is created, deleted, or updated and event log is created. These include the before (from) and after (to) configurations as well as the ID and name of the token and who made the request. To search for management operations like, creating, deleting, and updating tokens use the following query:

```_index=sumologic_audit_events _sourceCategory=tokens```

An example event log when a token is changed from inactive to active is:

```
{
    "from": {
        "type": "CollectorRegistrationToken",
        "name": "Product_Demo",
        "description": "Used by Product team to install collectors for demos",
        "status": "Inactive"
    },
    "to": {
        "type": "CollectorRegistrationToken",
        "name": "Product_Demo",
        "description": "Used by Product team to install collectors for demos",
        "status": "Active"
    },
    "operator": {
        "email": "sumologic@demo.com",
        "id": "000000000AAAAAAA",
        "interface": "UI",
        "sessionId": "xf4wthlmq6kssjnaxhx7472",
        "sourceIp": "67.180.65.20",
        "type": "UserContext"
    },
    "eventType": "Audit",
    "severityLevel": "Info",
    "accountId": "0000000000000131",
    "eventId": "4332edea-7a38-4df2-bf5f-8c25262955d8",
    "eventName": "TokenUpdated",
    "eventTime": "2020-04-28T20:07:09.180Z",
    "eventFormatVersion": "1.0",
    "subsystem": "tokens",
    "resourceIdentity": {
        "id": "0000000000002D27",
        "name": "Product_Demo",
        "type": "CollectorRegistrationToken"
    }
}
```

### Collector registration events

Collectors registered with installation tokens are recorded in the Audit Event Index with the ID and name of the token that registered the Collector. The following query returns Collector registrations done with installation tokens.

```_index=sumologic_audit_events _sourceCategory=collection CollectorRegistrationTokenContext```

An example event log is:

```
{
    "operator": {
        "tokenId": "0000000000002D27",
        "name": "Product_Demo",
        "sourceIp": "67.180.65.20",
        "type": "CollectorRegistrationTokenContext"
    },
    "collectorIdentity": {
        "collectorId": "000000000AAAAAAA",
        "collectorName": "sumologic"
    },
    "collector": {
        "ephemeral": false,
        "sourceSyncMode": "UI",
        "collectorType": "Installable",
        "name": "sumologic",
        "timeZone": "UTC",
        "category": "token_demo",
        "fields": {}
    },
    "accountId": "0000000000000000",
    "eventId": "2021f554-9a4e-45a5-b2ae-08a6881b3101",
    "eventName": "CollectorCreated",
    "eventTime": "2020-04-23T14:06:12.411Z",
    "eventFormatVersion": "1.0",
    "subsystem": "collection"
}


```
