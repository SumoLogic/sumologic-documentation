---
id: trellix-mvisio-epo-source
title: Trellix mVision ePO Source
sidebar_label: Trellix mVision ePO
description: Learn how to collect event logs using the Trellix mVision ePO.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/trellix-logo.png')} alt="trellix-logo" width="70" />

Trellix is a cybersecurity company that provides cloud-based security solutions for cybersecurity attacks. It provides hardware, software, and services to investigate cybersecurity attacks, protects against malicious software, and analyzes IT security risks.

mVision ePO is a key component of the Trellix security management platform, which provides unified management of endpoint, network, and data security. This can reduce incident response time, strengthen protection, simplify and automate risk and security management, and provide end-to-end network visibility and security.

## Data Source

The Trellix integration fetches event logs using the [Trellix mVision ePO API](https://developer.manage.trellix.com/mvision/apis/v2-events).

## Set up and configuration

The Trellix mVision ePO source requires you to provide a Client ID, Client Secret, and API key. To obtain these, follow the steps below.

1. Log in to the [Trellix Developer Portal](https://developer.manage.trellix.com/).
1. Go to the **Self service** menu and click [**API Access Management**](https://developer.manage.trellix.com/mvision/selfservice/access_manag).<br/><img src={useBaseUrl('img/send-data/self-service.png')} alt="self-service.png" style={{border: '1px solid black'}} width="600" />
    1. Copy the **API key** from the API Access Management section. <br/><img src={useBaseUrl('img/send-data/api-key.png')} alt="api-key" style={{border: '1px solid black'}} width="600" />
    1. In the **Credential Configuration** section, select **Events** as the scope in **APIs** for a given **Client Type**.
    1. Click **Request** for IAM Client type approval.<br/><img src={useBaseUrl('img/send-data/credential-configuration.png')} alt="credential-configuration" style={{border: '1px solid black'}} width="600" />
    1. Once your IAM Client type is approved, generate the **Client ID** and **Client Secret**. <br/><img src={useBaseUrl('img/send-data/generate.png')} alt="generate" style={{border: '1px solid black'}} width="600" />

## States

The Trellix mVision ePO source is a security platform that provides cloud-based security solutions for cybersecurity attacks.

When you create a Trellix mVision ePO source, it goes through the following stages.
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Trellix mVision ePO.
1. **Collecting**. The Source is actively collecting data from Trellix mVision ePO.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Trellix mVision ePO Source

When you create a Trellix mVision ePO Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Trellix mVision ePO Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Trellix mVision ePO**.<br/> <img src={useBaseUrl('img/send-data/trellix-icon.png')} alt="trellix-icon" style={{border: '1px solid black'}} width="100" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/trellix-config.png')} alt="trellix-config.png" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **Client ID** of your Trellix platform.
1. Enter the **Client Secret** of your Trellix platform.
1. Enter the **API Key** for authorization collected from the Trellix platform.
1. (Optional) The **Polling Interval** is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Save**.


### Error Types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Trellix mVision ePO"}` for Trellix mVision ePO source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Trellix mVision ePO. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `apiKey` | String | Yes | API key used for Authorization.  | modifiable |
| `clientID` | String | Yes | Client ID of your account. | modifiable |
| `clientSecret` | String | Yes | Client Secret of your account. | modifiable |
| `pollingInterval` | Integer | No | Choose how often the Source checks for new data (In minutes). | modifiable |

### JSON Example

```json
{
  "api.version": "v1",
  "source": {
    "config": {
      "name": "Trellix",
      "clientID": "xxxxxxxxxxxxxx",
      "clientSecret": "******",
      "apiKey": "*******",
      "pollingInterval": 5
    },
    "schemaRef":{
      "type": "Trellix mVision ePO"
    },
    "sourceType": "Universal"
  }
}
```