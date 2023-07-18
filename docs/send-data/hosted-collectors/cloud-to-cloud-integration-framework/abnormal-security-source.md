---
id: abnormal-security-source
title: Abnormal Security Source
sidebar_label: Abnormal Security
description: Learn how to collect abnormal threat log from the Abnormal Security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/abnormal-security-logo.png')} alt="abnormal-security-logo" width="90" />

Abnormal Security is a behavioral AI-based email security platform that learns the behavior of every identity in a cloud email environment and analyzes the risk of every event to block the most sophisticated attacks.

The Abnormal Security integration ingests threat data identified by the abnormal threat log using the [Abnormal Security API](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1).

## Data Source

The Abnormal Security source fetches the list of threat IDs using the [Threats API ](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Threats/get_threats), and for each threat ID it fetches details of the threat using the [Threat Details API](https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.1#/Threats/get_threats__threatId_).

## Set up and configuration

The Abnormal Security source requires you to provide an authentication token. To obtain the token, follow the steps below.
1. Sign in to the [Abnormal Security](https://portal.abnormalsecurity.com/) platform.<br/><img src={useBaseUrl('img/send-data/abnormal-login.png')} alt="abnormal-login" style={{border: '1px solid black'}} width="400" />
1. In the **Enhance** section, click on the **Settings** option.<br/><img src={useBaseUrl('img/send-data/abnormal-settings.png')} alt="abnormal-settings" style={{border: '1px solid black'}} width="800" />
1. From the **Settings** page, copy and save the authentication token.

## States

The Abnormal Security source is a security platform that provides AI-based email security.
When you create a Abnormal Security source, it goes through the following stages.
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Abnormal Security.
1. **Collecting**. The Source is actively collecting data from Abnormal Security.

If the Source has any issues during any one of these states, it is placed in an **Error** state.
When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Abnormal Security Source

When you create an Abnormal Security Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Abnormal Security Source, follow the steps below:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Abnormal Security**.<br/> <img src={useBaseUrl('img/send-data/abnormal-security-icon.png')} alt="abnormal-security-icon" style={{border: '1px solid black'}} width="100" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/abnormal-config.png')} alt="abnormal-config" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema, it is ignored, also known as dropped.
1. Enter the **Access Token** for authorization collected from the [Abnormal Security platform](#set-up-and-configuration).
1. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Abnormal Security "}` for Abnormal Security  source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Abnormal Security. | not modifiable |

### Config parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `accessToken` | String | Yes | Access token used to retrieve abnormal threats. | modifiable |

### JSON example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
            "name": "ABCDEFGHIJKLMNOPQRSTUVWXYZABC",
            "accessToken": "ABCDEFGH",
            "description": "ABCDEFGHIJKLMNOPQRSTUV",
            "category": "ABCDEFGHIJKLMNOPQRSTUVWX"
        },
        "schemaRef": {
            "type": "Abnormal Security"
        },
        "sourceType": "Security"
    }
}

```
