---
id: crowdstrike-spotlight-source
title: CrowdStrike Spotlight Source
sidebar_label: CrowdStrike Spotlight
description: Learn how to collect combined endpoint vulnerabilities data from the CrowdStrike Spotlight platform.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Spotlight source will collect CrowdStrike Spotlight data combined endpoint vulnerabilities from the CrowdStrike Falcon instance with Spotlight module enabled. This combined endpoints deliver a unified and comprehensive view of your vulnerability data with a single request.

## Prerequisites

To collect vulnerability data from the CrowdStrike platform, you must have an authorized CrowdStrike account. CrowdStrike APIs use an OAuth 2.0 authorization token to make authorized API calls. CrowdStrike API Client is required to get the OAuth 2.0 authorization token. To define a CrowdStrike API client, you must be designated as a `CrowdStrike Falcon Administrator` role.

## Data sources

The CrowdStrike Spotlight source ingest vulnerabilities data from the [CrowdStrike Spotlight API](https://falcon.crowdstrike.com/documentation/98/spotlight-apis).

:::important
The CrowdStrike API documentation is not public and can only be accessed by partners or customers.
:::

## Set up and Configuration

In this configuration, you will set up the CrowdStrike Spotlight and configure it to be authorized and authenticated to use vulnerabilities information from CrowdStrike Spotlight API. To obtain the auth token, you will need the following parameters.

### API Client and API Secret

The **API security token** is used to authenticate with CrowdStrike Spotlight API. After successfully creating the API client, you will get the **Client Id**, **Client Secret**, and **Base URL**.

To get the **CrowdStrike API Client**, follow the steps below:
1. Access the [CrowdStrike Spotlight Platform](https://falcon.crowdstrike.com/login/).
1. Sign in using your email address and password. After you've completed the two-factor authentication, you'll be directed to the application dashboard.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-login-screen.png')} style={{border: '1px solid black'}} alt="crowdstrike-spotlight-login-screen.png" width="600" />
1. From the CrowdStrike Spotlight console, select the **Support and resources** option from the menu.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-support-and-resources.png')} style={{border: '1px solid black'}} alt="<crowdstrike-fspotlight-support-and-resources.png>" width="600" />
1. In the **Resources and tools** section, select the **API clients and keys** option. You can then view existing clients or add new API clients from there.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-api-key-client.png')} style={{border: '1px solid black'}} alt="<crowdstrike-spotlight-api-key-client.png>" width="600" />
1. Click **Add new API client**. You will be prompted to give a descriptive name and select the appropriate API scopes.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-new-client.png')} style={{border: '1px solid black'}} alt="<crowdstrike-spotlight-new-client.png>" width="600" />
1. Provide a proper name and description and select the **spotlight-vulnerabilities:read** scope. Click on `ADD` to complete the process.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-add-client.png')} style={{border: '1px solid black'}} alt="<crowdstrike-spotlight-add-client.png>" width="600" />
1. After you click on `ADD` a dialogue box will appear with the **Client ID**, **Client Secret** and **Base URL**. Copy and save the Client Id, Client Secret and Base URL to a folder location because you will need them when creating the [CrowdStrike Spotlight source](#set-up-crowdstrike-spotlight-source).<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-copy-creds.png')} style={{border: '1px solid black'}} alt="<crowdstrike-spotlight-copy-creds.png>" width="600" />

### Region

1. Identify your **Region** based on your **Base URL**. The region can be selected from the list below.

   | Region | Base URL                    |
   | :------ | :-------------------------- |
   | US-1    | https://api.crowdstrike.com |
   | US-2    | https://api.us-2.crowdstrike.com  |
   | EU-1    | https://api.eu-1.crowdstrike.com  |
   | US-GOV-1    | https://api.laggar.gcw.crowdstrike.com |

## States

The CrowdStrike Spotlight source tracks errors and reports its health and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

The CrowdStrike Spotlight source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with CrowdStrike Spotlight.
1. **Collecting**. The Source is actively collecting data from CrowdStrike Spotlight.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Set up CrowdStrike Spotlight Source

When you create a CrowdStrike Spotlight Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the CrowdStrike Spotlight Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **CrowdStrike Spotlight** icon.<br/><img src={useBaseUrl('/img/send-data/crowdstrike-spotlight-icon.png')} style={{border: '1px solid black'}} alt="crowdstrike-spotlight-icon.png" width="120" />
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/crowdstrike-spotlight-config-main.png')} style={{border: '1px solid black'}} alt="crowdstrike-spotlight-config-main.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`. 
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Region**, choose the region as per your Base URL. See [Region](#region) section to know your region.
1. In **Client ID**, enter the Client ID you generated and secured from the [API Client](#api-client-and-api-secret) section.
1. In **Client Secret**, enter the Client Secret you generated and secured from the [API Secret](#api-client-and-api-secret) section.
1. In **Facet**, select the type of data to be returned for each vulnerability entity which allows to limit the response to just the information you want.
1. (Optional) The **Polling Interval** is set for one hour by default, you can adjust it based on your needs. This sets how often the integration will fetch complete vulnerability instance data that has been created or updated within last hour.
1. When you are finished configuring the Source, click **Save**.

## Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                   | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"CrowdStrike Spotlight"}` for CCrowdStrike Spotlight Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for CrowdStrike Spotlight Source. | not modifiable |

### Config parameters

| Parameter | Type | Required | Default | Description | Access |
|:---|:---|:---|:---|:---| :--- |
| `name` | String | Yes |  | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | null | Type the description of the Source. | modifiable |
| `category` | String | No | null | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `region` | String | Yes |  | The Region of your CrowdStrike account. | modifiable |
| `clientID` | String | Yes |  | The CrowdStrike Client ID you want to use to authenticate collection requests. | modifiable |
| `clientSecret` | String | Yes |  | The CrowdStrike Client Secret you want to use to authenticate collection requests. | modifiable |
| `facet` | Checkbox | No | All selected | Type of data to be returned for each vulnerability entity which allows to limit the response to just the information you want. | modifiable |
| `pollingInterval` | Integer | No | 1 hour | This sets how often the Source checks for data. | modifiable |

### JSON example

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"crowdstrike-spotlight",
      "apiBaseUrl":"api.crowdstrike.com",
      "clientId":"********",
      "clientSecret":"********",      
      "evaluationLogic":true,
      "hostInfo":true,
      "remediation":true,
      "cve":true,      
      "pollingInterval":1,
      "fields":{
        "_siemForward":false
      }      
    },
    "schemaRef":{
      "type":"Crowdstrike Spotlight"
    },
    "sourceType":"Universal"
  }
}
```
