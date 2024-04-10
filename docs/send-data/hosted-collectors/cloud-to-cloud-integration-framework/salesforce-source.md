---
id: salesforce-source
title: Salesforce Source
sidebar_label: Salesforce
tags:
    - salesforce
    - cloud-SIEM-enterprise
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/salesforce/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/salesforce/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/salesforce/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';

<img src={useBaseUrl('img/integrations/saas-cloud/salesforce-logo.svg')} alt="Thumbnail icon" width="75"/>

The Salesforce Source provides a secure endpoint to receive event data from the Salesforce through its [Rest API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm). The source securely stores the required authentication, scheduling, and state tracking information.

import FedDeploymentNote from '../../../reuse/fed-deployment-note.md';

<FedDeploymentNote/>

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1 hour |  [Event data](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm) |

### Polling Interval and Salesforce API Rate Limits

During each polling interval, the Salesforce Source will make a Rest API request to Salesforce. Your Salesforce instance will limit the number of calls that can be made based on an API [Requests limit*,*](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm) which is based on your subscription plan. The Salesforce API uses paging
and a [maximum of 2,000 rows](https://help.salesforce.com/articleView?id=000332074&type=1&mode=1) are returned at a time.

## Setup

### Vendor configuration

The Consumer Key and Consumer Secret API tokens from Salesforce are required to configure this source. 

1. The Salesforce Event Monitoring add-on is required to obtain all of the data presented in the app dashboards.  The add-on enables access to all event types in the Salesforce EventLogFile, the LoginEvent object, Transaction Security, and the Event Monitoring Analytics App. For more information, see [Get Started with Event Monitoring](https://trailhead.salesforce.com/en/modules/event_monitoring/units/event_monitoring_intro) and [Enable Event Monitoring](https://help.salesforce.com/articleView?id=Enabling-Event-Monitoring&language=en_US&type=1).
1. Create a dedicated user and profile for the integration as referred to in [Create User Profiles](https://help.salesforce.com/s/articleView?id=sf.emergency_response_admin_userprofiles.htm&type=5) and [Add a Single User](https://help.salesforce.com/s/articleView?id=sf.adding_new_users.htm&type=5) sections of the Salesforce Documentation.
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
     *  Provide the **Callback URL**.
     *  Select OAuth Scope. Access and manage your data (API)    
     *  Select **Save** and then **Continue.**
     *  After this step, you will get your Consumer Key ("client_id") and Consumer Secret ("client_secret") which you will use to configure the Salesforce source.
1. Ensure that you have your Salesforce user token (aka security token) handy as it will be used while configuring the Source.
   * In case, you don’t remember your user token, you can reset it. For more details see the [Reset Your Security Token](https://help.salesforce.com/articleView?id=user_security_token.htm&type=5) document.
   * When a user resets their password, a new security token is sent automatically to their email address.

### Source configuration

When you create a Salesforce Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Salesforce Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a HostedCollector.
1. Select **Salesforce**.
1. Enter a **Name** for the Source in the Sumo Logic console. The description is optional.
1. For **Source Category (Optional)**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM.** Check the checkbox to forward your data to Cloud SIEM.      
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
    :::note
    <CollBegin/>
    :::
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Salesforce` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Salesforce` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Salesforce"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| password | String | Yes | `null` | Type the Salesforce login password for the username. |  |
| username | String | Yes | `null` | Type the Salesforce login username. |  |
| start_time | String | No | Now | Type the collection start time. Available options are Now, 24 Hours ago, 2 Days ago, 3 Days ago, 4 Days ago, 5 Days ago. |  |
| client_id | String | True |`null` | Type in Consumer Key of the ConnectedApp. |  |
| client_secret | String | True | `null` | Type in Consumer Secret of the ConnectedApp. |  |
| user_token | String | True |`null`  | Type in the  Salesforce user token. |  |
| inmemory_lookup | Boolean | False | True | Set to true to enable inmemory lookup or to false to disable it.|  |

### JSON example:

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/salesforce/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/salesforce/example.tf)

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

**Error:** Inconsistencies in `DASHBOARD_ID_DERIVED_LOOKUP` Field Values

You might see that in certain logs, the `DASHBOARD_ID_DERIVED_LOOKUP` field has value, but in other logs, it's completely empty. This could be because of a problem with permissions.

To resolve this: 

1. In Salesforce, go to **Setup\>Administration\>Users\>Profile**.
1. Click the **Edit** button for the user's profile you set up for the Salesforce Source.
1. In the **Administrative Permissions** section, check the box for **Manage Reports in Public Folders** permission.
1. In the **General User Permissions** section, check the box for **View My Team's Dashboards** permission.
1. Click the **Save** button

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
