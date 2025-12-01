---
id: cisco-meraki-source
title: Cisco Meraki Source
sidebar_label: Cisco Meraki
tags:
  - cloud-to-cloud
  - cisco-meraki
description: The Cisco Meraki Source for Sumo Logic provides a secure endpoint to receive data from the Cisco Meraki Organization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Cisco Meraki Source provides a secure endpoint to receive data from the Meraki organization and networks and ingests event logs pertaining to them. It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
|:--|:--|
| Every 12 Hours   | [Get Organizations](https://developer.cisco.com/meraki/api-latest/#!get-organizations) |
| Every 12 Hours   | [Get Organization Networks](https://developer.cisco.com/meraki/api-latest/#!get-organization-networks) |
| Every 15 Minutes | [Get Organization Appliance Security Events](https://developer.cisco.com/meraki/api-v1/#!get-organization-appliance-security-events) |
| Every 15 Minutes | [Get Organization Configuration Changes](https://developer.cisco.com/meraki/api-v1/#!get-organization-configuration-changes) |
| Every 15 Minutes | [Get Network Events](https://developer.cisco.com/meraki/api-v1/#!get-network-events) |
| Every 15 Minutes | [Get Network Wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) |
| Every 15 Minutes | [Get Network Traffic Events](https://developer.cisco.com/meraki/api-v1/get-network-traffic/) |

## Setup

### Vendor configuration

In this configuration, you will set up an Meraki source account and configure it to be authorized and authenticated to use device logs and alerts from MERAKI API.
To obtain an Meraki auth token, follow the steps below:
1. Log in to the [Meraki](https://dashboard.meraki.com/) application.
1. Navigate to the **Organization**, under **Configure** section, select **Settings** page.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-org-settings.png')} alt="cisco-meraki-org-settings.png" width="500" />
1. Check the **Enable access to the Cisco Meraki Dashboard API** <br/> <img src={useBaseUrl('img/send-data/cisco-meraki-org-enable-api.png')} alt="cisco-meraki-org-enable-api.png" width="800" />
1. Click **Save Changes** at the bottom of the page.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-org-save.png')} alt="cisco-meraki-org-save.png" width="400" />
1. Navigate to your profile by clicking your name in the upper right corner and select **My profile**.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-my-profile.png')} alt="cisco-meraki-my-profile.png" width="500" />
1. Scroll down to **API access** and click **Generate new API key**.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-generate-key.png')} alt="cisco-meraki-generate-key.png" width="400" />
1. Save your new API key into your preferred password vault for later use.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-save-key.png')} alt="cisco-meraki-save-key.png" width="500" />

For more detailed steps with troubleshooting examples, visit the official documentation [here](https://developer.cisco.com/meraki/api-v1/#!authorization/authorization).

#### Gather Meraki Organization IDs
You will need to provide a single Meraki organization identifier in the configuration. Run the following curl command using your Cisco Meraki API key to see the list of Meraki organizations and note the ID number for the organizations you wish to collect data from.

```
curl --location 'https://api.meraki.com/api/v1/organizations' --header 'X-Cisco-Meraki-API-Key: {{api_key}}'
```

### Source configuration

When you create an Cisco Meraki Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector). You will need to create a new Cisco Meraki source for every Cisco Meraki organization you want to collect data from.

To configure Cisco Meraki Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a **Hosted Collector**.
1. Search for and select **Cisco Meraki**.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
7. **Base URL**. It refers to the default URL where your Meraki account is hosted. If you are located in China, you have the option to modify the base URL.
8. **API Key**. Provide the [API key](#vendor-configuration) you generated from your Meraki account. 
9. **Meraki Organization ID**. Provide the numeric [Meraki organization ID](#vendor-configuration) of the Meraki org you want to collect data from. You can only provide one ID. Please create multiple sources for multiple Meraki organizations.
10. **API Collection**. Choose the APIs below to collect data. Organization and Network details are fetched by default.
    - **Security Event Collection**
    - **Organization Configuration Changes Collection**
    - **Network Wireless Air Marshal Events Collection**
    - **Network Event Collection**
    - **Network Traffic Event Collection**
11. (Optional) The **Polling Interval** is set to 900 seconds by default. You can adjust this value as needed.
12. (Optional) The **Infra Polling Interval** is set to 24 hours by default. You can adjust this value as needed.
13. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Cisco Meraki"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | Region URL of the Cisco Meraki application. |  |
| apiKey | String | Yes | `null` | Cisco Meraki API secret key used for authentication. |  |
| organizationID | String | Yes | `null` | Cisco Meraki Organization ID you want to collect events from. |  |
| collectSecurityEvents | Boolean | No | `True` | Specify if you need to collect the security events. |  |
| collectOrgConfigChangesEvents | Boolean | No | `True` | Specify if you need to collect the organization config changes events. |  |
| collectAirMarshalEvents | Boolean | No | `True` | Specify if you need to collect the wireless air marshal events. |  |
| collectNetworkEvents | Boolean | No | `True` | Specify if you need to collect the network events. |  |
| collectNetworkTrafficEvents | Boolean | No | `True` | Specify if you need to collect the network traffic events. |  |
| pollingInterval | Integer | No | 900 | This sets how often the Source checks for new data. |  |
| infraPollingInterval | Integer | No | 24 | This sets how often the Source checks for organization and network info (in hours). |  |

## Troubleshooting
* You may receive the follow error below if you enter an invalid Cisco Meraki organization ID in your configuration. Please follow the steps in the section [Gather Meraki Organization IDs](#gather-meraki-organization-ids) to ensure you are using an ID for a Meraki organization returned in that query.

  ```json
  {
      "state": "Error",
      "errorType": "THIRD-PARTY-GENERIC",
      "errorCode": 400,
      "errorInfo": "meraki '/api/v1/organizations/orgIdInput' not found using API key"
  }
  ```

* This error occurs when the Cisco Meraki API returns a 401 Unauthorized response with the message `Invalid API key`. It indicates that the API key configured in the Cisco Meraki Source is invalid, revoked, or does not have the required permissions. To resolve this issue, verify that you are using the correct and active API key generated from the [Cisco Meraki Dashboard](https://dashboard.meraki.com/) by navigating to *My Profile → API access → Generate new API key*.

  ```json
  {
      "state": "Error",
      "errorType": "THIRD-PARTY-GENERIC",
      "errorCode": 401,
      "errorInfo": "cisco meraki api response 401 Unauthorized: {\"errors\":[\"Invalid API key\"]}"
  }
  ```

* This error occurs when the API call to Cisco Meraki fails because the Meraki organization or network associated with the API key does not have a valid license. API access is available only for actively licensed Meraki organizations, and the issue may occur if the organization’s license has expired or if the API key is associated with an unlicensed or trial organization. In this case, visit the [Cisco Meraki Dashboard](https://dashboard.meraki.com/) and check the license status under *Organization → Configure → License info*.

  ```json
  {
      "state": "Error",
      "errorType": "THIRD-PARTY-GENERIC",
      "errorCode": 403,
      "errorInfo": "cisco meraki api response 403 Forbidden: {\"errors\":[\"Meraki API services are available for licensed Meraki devices only. Please contact Meraki support. To renew your licenses, go to 'https://n136.meraki.com/o/s78Gsdic/manage/dashboard/license_info'\"]}"
  }
  ```

### Known Issues
* The integration will return an error containing the text `context deadline exceeded (Client.Timeout or context cancellation while reading body)`. This error occurs when the integration is reading the HTTP body, but reaches our timeout which is currently set to 10 minutes. We have observed this behavior across multiple customers when the integration is fetching data from the [Get Network Wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) endpoint. Increasing the timeout does not appear to solve the issue as the network connection to this specific endpoint will occasionally never complete. Sumo Logic recommends customers contact Cisco Meraki support if they encounter this error.
* Pagination has a rare occurrence to potentially return a small number duplicate logs. This issue has been reported to Cisco.
* The Cisco Meraki API has a [rate limit](https://developer.cisco.com/meraki/api-latest/#!rate-limit) of 10 API calls every second. The source can have a collection delay if your Meraki organization has thousands of networks with many product types. The Cisco Meraki API for collecting network events requires one API call per network, per product type. There are a total of 6 product types. The API also requires one API call per network for collecting wireless Air Marshal events. This means 2,000 networks can be around 14,000 API calls (2000*6+2000) to retrieve network events, assuming no pagination is needed. At the rate limit of 10 API calls per second, the quickest we could make API calls is around 24 mins. Occasionally, the Cisco Meraki API can take 1 to 2 seconds to respond, which adds to the time. To solve this issue, Cisco would need to raise the API rate limit or provide an API endpoint for collecting [network events](https://developer.cisco.com/meraki/api-v1/#!get-network-events) and [wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) events, without the requirement to iterate over each network and product type individually.
* Cisco Meraki network events API can return a maximum of 1000 events per request. So, integration will be able to process a maximum of 1000 events with the same timestamp. If there are more events than 1000 events with the same timestamp, they will be skipped.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
