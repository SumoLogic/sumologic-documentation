---
id: salesforce-source
title: Salesforce Source
sidebar_label: Salesforce
tags:
    - salesforce
    - cloud-SIEM-enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';

<img src={useBaseUrl('img/integrations/saas-cloud/salesforce-logo.svg')} alt="Thumbnail icon" width="75"/>

The Salesforce Source provides a secure endpoint to receive event data from the Salesforce through its [Rest API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm). The source securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1 hour |  [Event data](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm) |

### Polling Interval and Salesforce API Rate Limits

During each polling interval, the Salesforce Source will make a Rest API request to Salesforce. Your Salesforce instance will limit the number of calls that can be made based on an API [Requests limit](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm), which is based on your subscription plan. The Salesforce API uses paging and a [maximum of 2,000 rows](https://help.salesforce.com/articleView?id=000332074&type=1&mode=1) are returned at a time.

## Setup

### Vendor configuration

The Consumer Key and Consumer Secret API tokens from Salesforce are required to configure this source. 

1. The Salesforce Event Monitoring add-on is required to obtain all of the data presented in the app dashboards. The add-on enables access to all event types in the Salesforce EventLogFile, the LoginEvent object, Transaction Security, and the Event Monitoring Analytics App. For more information, see [Get Started with Event Monitoring](https://trailhead.salesforce.com/en/modules/event_monitoring/units/event_monitoring_intro) and [Enable Event Monitoring](https://help.salesforce.com/articleView?id=Enabling-Event-Monitoring&language=en_US&type=1).
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
     * Make sure **Enable OAuth Settings** is checked.
     * Provide the **Callback URL**.
     * Select **OAuth Scope**. Access and manage your data (API).
     * Under API (**Enable OAuth Settings**), select **Enable Client Credentials Flow**.
     * When you understand the security risks, accept the warning (if prompted).
     * Select **Save** and then **Continue**.
     * After this step, you will get your Consumer Key ("client_id") and Consumer Secret ("client_secret"), which you will use to configure the Salesforce source.
     * Find your connected app, click **Manage** ([learn more](https://help.salesforce.com/s/articleView?id=sf.connected_app_client_credentials_setup.htm&type=5)).
     * Under **Client Credentials Flow**, for **Run As**, click **Search Button**, and find the user that you want to assign the client credentials flow. (For Enterprise Edition orgs, we recommend that you select an execution user who has the API Only User permission.)
     * Save your changes.

### Source configuration

When you create a Salesforce Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Salesforce Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a HostedCollector.
1. Select **Salesforce**.
1. Enter a **Name** for the Source in the Sumo Logic console. The description is optional.
1. For **Source Category (Optional)**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **SignOn URL.** Enter your Sign on URL. For example, `https://<MyDomainName>.my.salesforce.com/services/oauth2/token`.
1. **Client ID.** Enter the Consumer Key of the ConnectedApp. 
1. **Client Secret.** Enter the Consumer Secret of the ConnectedApp. 
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
| start_time | String | No | Now | Type the collection start time. Available options are Now, 24 Hours ago, 2 Days ago, 3 Days ago, 4 Days ago, 5 Days ago. |  |
| client_id | String | True |`null` | Type in Consumer Key of the Connected App. |  |
| client_secret | String | True | `null` | Type in Consumer Secret of the Connected App. |  |
| inmemory_lookup | Boolean | False | True | Set to true to enable inmemory lookup or to false to disable it.|  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/salesforce/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/salesforce/example.tf
```

## Troubleshooting

After you configure your Source, you should check the status of the source in the Collectors page. In case the Source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

![salesforce-troubleshooting](/img/send-data/salesforce-troubleshooting.jpg)

The following section details how you can resolve various errors: 

### No client credentials user enabled

**Error**: `{\"error\":\"invalid_grant\",\"error_description\":\"no client credentials user enabled\"}`. This is due to incorrect policies and permissions for authorization.

**Solution**: To resolve this, if you have migrated your source from v2.1.1 to v3.x.x, make sure to follow the steps mentioned in **Vendor Configuration** section related to client credentials with attention.

### Object type 'Document' is not supported

**Error**: Object type 'Document' is not supported

**Solution**:

1. In Salesforce, go to **Setup\>Administration\>Users\>Profile\>New Profile / Edit Profile**.
1. Under **Standard Object Permissions** \> **Documents** select **Read** permission click on the **Save** button. 
1. Now assign this profile to the user, whose credentials you have configured as part of the Salesforce Source.

### Object type 'Report' is not supported

**Error**: Object type 'Report' is not supported

**Solution**:

1. Go to **Setup\>Administration\>Users\>Profile**.
1. Edit specific Profile which is assigned to the user
1. Go to: **General User Permissions** and enable / disable **Run Reports**. **Run Reports** should be enabled for access to REPORT

### Object type 'EventLogFile' is not supported

**Error**: Object type 'EventLogFile' is not supported

**Solution**:

1. Go to **Setup\>Administration\>Users\>Permission Sets**.
1. Create New Permission Set and assign to user or Edit specific Permission Set which is assigned to user.
1. At the bottom click **System Permissions**.
1. Check **API Enabled**.
1. Check **View Event Log Files**.
1. Save it.

:::note
If the error still occurs after following the above instructions, contact the Salesforce Support Team. The root cause is likely a licensing issue, which requires their help to resolve.
:::

### Object type ‘SetupAuditTrail’ is not supported

**Error**: Object type ‘SetupAuditTrail’ is not supported

**Solution**:

1. Go to **Setup\>Administration\>Users\>Profile**.
1. Edit specific Profile which is assigned to the user
1. Go to **Administrative Permissions** and enable / disable **View Setup and Configuration**. **View Setup and Configuration** should be enabled for access to SetupAuditTrail.

:::note
If the error still occurs after following the above instructions, contact the Salesforce Support Team. The root cause is likely a licensing issue, which requires their help to resolve.
:::

### Token endpoint mismatch

**Error**: Token Endpoint must match the format `"https://<hostname>/services/oauth2/token"`. This is due to incorrect source configuration.

**Solution**: Provide the correct "SignOn Url". 

### Client identifier invalid

**Error**: `{"error":"invalid_client_id","error_description":"client identifier invalid"}`. This is due to incorrect source configuration.

**Solution**: Provide the correct “Client ID”.

### Invalid client credentials

**Error**: `{"error":"invalid_client","error_description":"invalid client credentials"}`. This is due to incorrect source configuration.

**Solution**: Provide the correct “Client Secret”. 

### Unknown error: Retry your request

**Error**: `{"error":"unknown_error","error_description":"retry your request"}`. This is due to an invalid SignOn Url.

**Solution**: Change it from login.salesforce.com to `<instanceURL>.salesforce.com`

### More Memory Required

**Error**: MoreMemoryRequired: Available: 100 FileSize: 200. Please create a support ticket.

**Solution**: Create a support ticket with sumo logic to increase the memory for your container.

### Inconsistencies in Field Values

**Error**: Inconsistencies in `DASHBOARD_ID_DERIVED_LOOKUP` Field Values

You might see that in certain logs, the `DASHBOARD_ID_DERIVED_LOOKUP` field has value, but in other logs, it's completely empty. This could be because of a problem with permissions.

**Solution**:

1. In Salesforce, go to **Setup\>Administration\>Users\>Profile**.
1. Click the **Edit** button for the user's profile you set up for the Salesforce Source.
1. In the **Administrative Permissions** section, check the box for **Manage Reports in Public Folders** permission.
1. In the **General User Permissions** section, check the box for **View My Team's Dashboards** permission.
1. Click the **Save** button

### Request not supported on this domain

**Error**: `invalid_grant`

**Solution**: Check your sign-on URL. If your sign-on URL is set to `https://login.salesforce.com/services/oauth2/token` you likely need to change it to another value, such as `https://<MyDomainName>.my.salesforce.com/services/oauth2/token`.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
