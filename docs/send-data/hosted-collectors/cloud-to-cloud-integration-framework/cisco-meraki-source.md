---
id: cisco-meraki-source
title: Cisco Meraki Source
description: The Cisco Meraki Source for Sumo Logic provides a secure endpoint to receive data from the Cisco Meraki Organization.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The Cisco Meraki Source provides a secure endpoint to receive data from the Meraki organization and networks and ingests event logs pertaining to them. It securely stores the required authentication, scheduling, and state tracking information.

## Data Sources

| Default Interval | API Endpoint                                 |
|:------------------|:----------------------------------------------|
| Every 24 Hours   | [Get Organizations](https://developer.cisco.com/meraki/api-latest/#!get-organizations)                            |
| Every 24 Hours   | [Get Organization Networks](https://developer.cisco.com/meraki/api-latest/#!get-organization-networks)                    |
| Every 15 Minutes | [Get Organization Appliance Security Events](https://developer.cisco.com/meraki/api-v1/#!get-organization-appliance-security-events)  |
| Every 15 Minutes | [Get Organization Configuration Changes](https://developer.cisco.com/meraki/api-v1/#!get-organization-configuration-changes)       |
| Every 15 Minutes | [Get Network Events](https://developer.cisco.com/meraki/api-v1/#!get-network-events)                           |
| Every 15 Minutes | [Get Network Wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal)             |

## States

A Cisco Meraki Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Meraki.
1. **Collecting**. The Source is actively collecting data from Meraki.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector. On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

## Setup and Configuration

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

## Gather Meraki Organization IDs
You will need to provide a single Meraki organization identifier in the configuration. Run the following curl command using your Cisco Meraki API key to see the list of Meraki organizations and note the ID number for the organizations you wish to collect data from.

```
curl --location 'https://api.meraki.com/api/v1/organizations' --header 'X-Cisco-Meraki-API-Key: {{api_key}}'
```

## Create a Cisco Meraki Source

When you create an Cisco Meraki Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector). You will need to create a new Cisco Meraki source for every Cisco Meraki organization you want to collect data from.

To configure Cisco Meraki Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collectors page, click **Add Source** next to a **Hosted Collector**.
1. Select Cisco Meraki.<br/> <img src={useBaseUrl('img/send-data/cisco-meraki-sumo-source-select.png')} alt="cisco-meraki-sumo-source-select.png" width="80" />
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/> <img src={useBaseUrl('img/send-data/cisco-meraki-sumo-source-form.png')} alt="cisco-meraki-sumo-source-formt.png" width="450" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (i.e., dropped).
1. **Base URL**. It refers to the default URL where your Meraki account is hosted. If you are located in China, you have the option to modify the base URL.
1. **API Key**. Provide the API key you generated from your Meraki account.
1. **Meraki Organization ID**. Provide the numeric Meraki organization ID of the Meraki org you want to collect data from. You can only provide one ID. Please create multiple sources for multiple Meraki organizations.
1. **Network Event Collection**. Enable or disable this option to collect information about your Meraki Networks, their network events, and wireless Air Marshal events.
1. (Optional) The **Polling Interval** is set to 300 seconds by default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Cisco Meraki"}` for Cisco Meraki Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Cisco Meraki Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | Region URL of the Cisco Meraki application. | modifiable |
| `apiSecretKey` | String | Yes | Cisco Meraki API secret key | modifiable |
| `merakiOrg` | String | Yes | Cisco Meraki Organization ID | modifiable |
| `pollingInterval` | Integer | No | 300 | This sets how often the Source checks for new data. | modifiable |

## Troubleshooting
You may receive the follow error below if you enter an invalid Cisco Meraki organization ID in your configuration. Please follow the steps in the section [Gather Meraki Organization IDs](#gather-meraki-organization-ids) to ensure you are using an ID for a Meraki organization returned in that query.

```json
{
    "state": "Error",
    "errorType": "THIRD-PARTY-CONFIG",
    "errorCode": 400,
    "errorInfo": "meraki '/api/v1/organizations/orgIdInput' not found using API key"
}
```

# Known Issues
1. Pagination has a rare occurrence to potentially return a small number duplicate logs. This issue has been reported to Cisco.
1. The Cisco Meraki API has a [rate limit](https://developer.cisco.com/meraki/api-latest/#!rate-limit) of 10 API calls every second. There is a possibility for the source to have a collection delay if your Meraki organization has thousands of networks with many product types. The Cisco Meraki API for collecting network events requires we make one API call per network, per product type. There are a total of 6 product types. The API also requires one API call per network for collecting wireless Air Marshal events. This means 2,000 networks can be around 14,000 API calls (2000*6+2000) to retrieve network events assuming no pagination is needed. At the rate limit of 10 API calls per second, the quickest we could make API calls is around 24 mins. Occasionally the Cisco Meraki API can take around 1 to 2 seconds to respond adding to the time. In order to solve this issue, Cisco would need to raise the API rate limit or provide an API endpoint for collecting [network events](https://developer.cisco.com/meraki/api-v1/#!get-network-events) and [wireless Air Marshal](https://developer.cisco.com/meraki/api-v1/#!get-network-wireless-air-marshal) events without the requirement to iterate over each network and product type individually. 
