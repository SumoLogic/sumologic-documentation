---
id: salesforce-source
title: Salesforce Source
sidebar_label: Salesforce
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/salesforce-logo.svg')} alt="Thumbnail icon" width="75"/>

The Salesforce Source provides a secure endpoint to receive event data from the Salesforce through its [Rest API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm). The source securely stores the required authentication, scheduling, and state tracking information.

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Prerequisites: Generate the Salesforce API token

The Consumer Key and Consumer Secret API tokens from Salesforce are required to configure this source. 

1. The Salesforce Event Monitoring add-on is required to obtain all of the data presented in the app dashboards.  The add-on enables access to all event types in the Salesforce EventLogFile, the LoginEvent object, Transaction Security, and the Event Monitoring Analytics App. For more information, see [Get Started with Event Monitoring](https://trailhead.salesforce.com/en/modules/event_monitoring/units/event_monitoring_intro) and [Enable Event Monitoring](https://help.salesforce.com/articleView?id=Enabling-Event-Monitoring&language=en_US&type=1).
1. Create a dedicated user and profile for the integration as referred to in [Salesforce documentation](https://help.salesforce.com/articleView?id=000331470&type=1&mode=1).
1. Go to the profile created in Step 1 and provide the following permissions required by the source:

   * Under the **Administrative Permissions** page, select **API Enabled** and **Password Never Expires, View All Users, View Setup and Configuration**  
   * Under **General User Permissions select**  **View Event Log Files** and **Run Reports**.  
   * Under **Standard Object Permissions** select **Documents.**  
   * Also if your Salesforce portal requires a single sign on, you need to bypass this user by unchecking the **Is Single Sign-On Enabled** setting in the profile under the **System Permissions** group.

1. Create a Connected App in Salesforce to generate the “Consumer Key” (client_id) and “Consumer Secret” (client_secret) API tokens if these are not already available. To do so:

   * Login to Salesforce.  
   * Go to **Setup > Platform Tools > Apps > App Manager**.
   * Select **New Connected App**. Enter the following [Basic Information](https://help.salesforce.com/articleView?id=connected_app_create_basics.htm&type=5).

     * **App Name**. Enter a name for your connected app name. For Example, Sumo Logic.
     * **API Name**. It defaults to a version of the app name without spaces. Keep the default value. 
     * **Contact Email**. Enter your email id.   

   * API (Enable OAuth Settings)   
     *  Make sure **Enable OAuth Settings** is checked.
     *  Provide the  **Callback URL**, For Example, https://login.salesforce.com/services/oauth2/callback
     *  Select OAuth Scope. Access and manage your data (API)    
     *  Select **Save** and then **Continue.**
     *  After this step, you will get your Consumer Key ("client_id") and Consumer Secret ("client_secret") which you will use to configure the Salesforce source.

1. Ensure that you have your Salesforce user token (aka security token) handy as it will be used while configuring the Source.

   * In case, you don’t remember your user token, you can reset it. For more details see the [Reset Your Security     Token](https://help.salesforce.com/articleView?id=user_security_token.htm&type=5) document.
   * When a user resets their password, a new security token is sent automatically to their email address.

### Create a Salesforce Source

When you create a Salesforce Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Salesforce Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a HostedCollector.
1. Select **Salesforce**.

   ![Salesforce.png](/img/send-data/Salesforce.png)
1. Enter a **Name **for the Source in the Sumo Logic console. The description is optional.**

   ![IMG.png](/img/send-data/salesforce-source.png)

1. For **Source Category (Optional)**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM.** Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the Forward to SIEM option the following metadata fields are set automatically by the integration (Do not include below fields as custom log metadata Fields):

   * `_siemVendor`: Salesforce
   * `_siemProduct`: Salesforce
   * `_siemFormat`: JSON       

1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **SignOn URL.** Enter your Sign on URL, e.g.  https://login.salesforce.com/services/oauth2/token.
1. **User Name.** Enter the username that you used to login to Salesforce.
1. **Password.** Enter the password associated with the above username.
1. **Client ID.** Enter the Consumer Key of the ConnectedApp. 
1. **Client Secret.** Enter the Consumer Secret of the ConnectedApp. 
1. **User Token**: Enter the user token.  
1. **Build In Memory Lookup.** Keep this checked. This will resolve IDs to human-readable names.
1. **Collection Should begin.** Select the time range for how far back you want this source to start collecting data from Salesforce. Options available are: Now, 24 hours ago.
15. When you are finished configuring the Source, click **Submit**.

### Polling Interval and Salesforce API Rate Limits

During each polling interval, the Salesforce Source will make a Rest API request to Salesforce. Your Salesforce instance will limit the number of calls that can be made based on an API [Requests limit*,*](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm) which is based on your subscription plan. The Salesforce API uses paging
and a [maximum of 2,000 rows](https://help.salesforce.com/articleView?id=000332074&type=1&mode=1) are returned at a time.

### States

The Salesforce Source reports errors, its health, and initialization status. Other than indicating that the source is healthy, you are also informed, in real-time, if the source is running into trouble communicating with Salesforce REST API, or if there's an error that requires user action indicated by Sumo Logic Health Events.

A Salesforce Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, details are stored and the source is placed in a **Pending** state.
1. **Started**. A collection task is created on the hosted collector.
1. **Initialized**. Task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source has successfully authenticated with Salesforce
1. **Collecting**. The Source is actively collecting data from Salesforce.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

![Error_State.png](/img/send-data/Error_State.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![Error_Status.png](/img/send-data/salesforce-error-status.png)

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

### Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                                                      | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config            | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef         | JSON Object  | Yes | Use `{"type":"Salesforce"}` for a Salesforce. | not modifiable |
| sourceType        | String       | Yes | Use `Universal` for a Salesforce Source. | not modifiable |

The following table shows the **config** parameters for a Salesforce
Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `password` | String | Yes |  | Type the Salesforce login password for the username. | modifiable |
| `username` | String | Yes |  | Type the Salesforce login username. | modifiable |
| `start_time` | String | No | Now | Type the collection start time. Available options are Now, 24 Hours ago, 2 Days ago, 3 Days ago, 4 Days ago, 5 Days ago. | modifiable |
| `client_id` | String | True | | Type in Consumer Key of the ConnectedApp. | modifiable |
| `client_secret` | String | True |  | Type in Consumer Secret of the ConnectedApp. | modifiable |
| `user_token` | String | True |  | Type in the  Salesforce user token. | modifiable |
| `inmemory_lookup` | Boolean | False | True | Set to true to enable inmemory lookup or to false to disable it.| modifiable |

### Salesforce Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Salesforce"
    },
    "state":{
      "state":"Collecting"
    },
    "config":{
      "signon_url":"https://login.salesforce.com/services/oauth2/token",
      "name":"TestSalesforceSrc",
      "client_secret":"********",
      "description":"Test Salesforce source",
      "client_id":"3MVG9VeAQy5y3BQWhBnxmQyadGTCNr2zbO.TEep4g6Wik9ZEdlgREnNrGBs680cYVdTjw8SlWv2qVoNgYGddS",
      "user_token":"********",
      "inmemory_lookup":true,
      "password":"********",
      "fields":{      
        "_siemForward":false
      },
      "category":"cnc/salesforce_logs",
      "username":"testuser@sumologic.com",
      "start_time":"24 Hours ago"
    },
    "sourceType":"Universal"
  }
}
```

## Troubleshooting

After you configure your Source, you should check the status of the source in the Collectors page. In case the Source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

![salesforce-troubleshooting](/img/send-data/salesforce-troubleshooting.jpg)

The following section details how you can resolve various errors: 

**Error:** Object type 'Document' is not supported

To resolve this: 

1. In Salesforce, go to **Setup\>Administration\>Users\>Profile\>New Profile / Edit Profile**.
1. Under **Standard Object Permissions** \> **Documents** select **Read** permission click on the **Save** button. 
1. Now assign this profile to the user, whose credentials you have configured as part of the Salesforce Source.

**Error** : Object type 'Report' is not supported

To resolve this:

1. Go to **Setup\>Administration\>Users\>Profile**.
1. Edit specific Profile which is assigned to the user
1. Go to: **General User Permissions** and enable / disable **Run Reports**. **Run Reports** should be enabled for access to REPORT

**Error** : Object type 'EventLogFile' is not supported

To resolve this:

1. Go to **Setup\>Administration\>Users\>Permission Sets**.
1. Create New Permission Set and assign to user or Edit specific Permission Set which is assigned to user
1. At the bottom click **System Permissions**
1. Check **API Enabled**
1. Check **View Event Log Files**
1. Save it

:::note 
If the error still occurs after following the above instructions, contact the Salesforce Support Team. The root cause is likely a licensing issue, which requires their help to resolve.
:::

**Error**: Object type ‘SetupAuditTrail’ is not supported

To resolve this:

1. Go to **Setup\>Administration\>Users\>Profile**.
1. Edit specific Profile which is assigned to the user
1. Go to: **Administrative Permissions** and enable / disable **View Setup and Configuration**. **View Setup and Configuration** should be enabled for access to SetupAuditTrail

:::note 
If the error still occurs after following the above instructions, contact the Salesforce Support Team. The root cause is likely a licensing issue, which requires their help to resolve.
:::

**Error** : Token Endpoint must match the format `"https://<hostname>/services/oauth2/token"`. This is due to incorrect source configuration.

To resolve this:

1. Provide the correct "SignOn Url". 

**Error** : `{"error":"invalid_grant","error_description":"authentication failure"}`   This is due to incorrect source configuration.

To resolve this:

1. Provide the correct “User Name”, Password, “User Token”.

 

**Error** : `{"error":"invalid_client_id","error_description":"client identifier invalid"}`   This is due to incorrect source configuration.

To resolve this:

1. Provide the correct “Client ID”.

 
**Error** : `{"error":"invalid_client","error_description":"invalid client credentials"}`   This is due to incorrect source configuration.

To resolve this:

1. Provide the correct “Client Secret” 

 
**Error** : `{"error":"unknown_error","error_description":"retry your request"}`   This is due to an invalid SignOn Url.

To resolve this:

1. Change it from login.salesforce.com to `<instanceURL>.salesforce.com`

 

**Error** : MoreMemoryRequired: Available: 100 FileSize: 200.Please create a support ticket.

To resolve this:

1. Please create a support ticket with sumo logic to increase the memory for your container.
