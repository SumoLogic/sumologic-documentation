---
id: 1password-source
title: 1Password Source
sidebar_label: 1Password
description: The 1Password Source provides a secure endpoint to receive Sign-in Attempts and Item Usage from the 1Password Event API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="45"/>

The 1Password Source provides a secure endpoint to receive Sign-in Attempts and Item Usage from the [1Password Event API](https://support.1password.com/events-api-reference/). It securely stores the required authentication, scheduling, and state tracking information.

The 1Password Source ingests:
* [Sign-in Attempts](https://support.1password.com/events-api-reference/#sign-in-attempts)
* [Item Usage](https://support.1password.com/events-api-reference/#item-usage)


## Rules

* JSON is the only supported log format.
* Data is collected in five minute intervals.


## Authentication

You'll need a 1Password API token and your customer-specific 1Password domain (for example, `events.1password.com`). To generate a 1Password API token, follow these steps:
1. [Sign in](https://start.1password.com/signin) to your 1Password account and click [Integrations](https://my.1password.com/integrations/active) in the sidebar.
2. Switch to the **Directory** tab (or use [this direct link to the Directory tab](https://sumologictestingapi.1password.com/integrations/directory)).
3. Go to the **Events Reporting** section and click the **Sumo Logic** integration.
4. In the **System Name** field, enter the name of your choice (default value `Sumo Logic` should be fine in most cases), then click **Add Integration**.
5. In the **Set up token** section:
   1. Enter a **Token Name**. This can be any string that will help you recognize tokens generated for different environments like production, staging, and dev.
   1. Under **Events to Report**, leave enabled event sources which you want to share using the token.
   1. When you're done, click **Issue Token**.
6. In the **Save token** section, click the copy icon (next to the token string) to copy it to your clipboard. You can also click **Save in 1Password** to store it for your future reference.
7. Lastly, click **View Integration Details** to see the summary, then click **Learn More** pointing to 1Password App installation manual.


## States

A 1Password Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events).

A 1Password Source goes through the following states when created:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
2. **Started**. A collection task is created on the Hosted Collector.
3. **Initialized**. The task configuration is complete in Sumo Logic.
4. **Authenticated**. The Source successfully authenticated with 1Password.
5. **Collecting**. The Source is actively collecting data from 1Password.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.<br/> ![1password state.png](/img/send-data/1password-state.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.<br/> ![1password](/img/send-data/health_error_generic.png)


## Create a 1Password Source

When you create a 1Password Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors#Create_a_Hosted_Collector).

To configure a 1Password Source:

1. In Sumo Logic, select** Manage Data > Collection > Collection**.
2. On the Collectors page, click **Add Source** next to a Hosted** **Collector.
3. Select **1Password**.<br/><img src={useBaseUrl('img/send-data/1password-source-icon.png')} alt="1password-source-icon.png" width="150" />
4. Enter a **Name** for the Source. The **description** is optional.<br/> ![1password-input](/img/send-data/1password-input.png)
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option, the following metadata fields are set:

| Field Name | API | Value |
|:---|:---|:---|
| `_siemVendor` | Sign-in, Item | `1Password` |
| `_siemProduct` | Sign-in, Item | `1Password` |
| `_siemFormat` | Sign-in, Item | `JSON` |
| `_siemEventID` | Sign-in | `signin-{{category}}` |
| `_siemEventID` | Item | `item_usage-{{action}}` |

7. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
8. **Base URL**. Provide your 1Password customer-specific domain, for example `events.1password.com`.
9. **API Token**. Enter the token you got from creating your 1Password API token in the [Authentication section](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/1password-source#Authentication) above.
10. **Supported APIs to collect**. Select one or more of the available APIs, **Item Usage** and **Sign-in Attempts**.
11. When you are finished configuring the Source, click **Submit**.


## Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

<table>
  <tr>
   <td>Type
   </td>
   <td>Reason
   </td>
   <td>Retries
   </td>
   <td>Retry Behavior
   </td>
   <td>Health Event Name
   </td>
  </tr>
  <tr>
   <td>ThirdPartyConfig
   </td>
   <td>Normally due to an invalid configuration. You'll need to review your Source configuration and make an update.
   </td>
   <td>No retries are attempted until the Source is updated.
   </td>
   <td>Not applicable
   </td>
   <td>ThirdPartyConfigError
   </td>
  </tr>
  <tr>
   <td>ThirdPartyGeneric
   </td>
   <td>Normally due to an error communicating with the third party service APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which it quits.
   </td>
   <td>ThirdPartyGenericError
   </td>
  </tr>
  <tr>
   <td>FirstPartyGeneric
   </td>
   <td>Normally due to an error communicating with the internal Sumo Logic APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which it quits.
   </td>
   <td>FirstPartyGenericError
   </td>
  </tr>
</table>

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>config
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Contains the [configuration parameters](#config-parameters) for the Source.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>schemaRef
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Use <code>&#123;"type":"1Password"&#125;</code> for a 1Password Source.
   </td>
   <td>not modifiable
   </td>
  </tr>
  <tr>
   <td>sourceType
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Use <code>Universal</code> for a 1Password Source.
   </td>
   <td>not modifiable
   </td>
  </tr>
</table>

### Config parameters

The following table shows the **config** parameters for a 1Password Source.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata field</a> <code>_source</code>.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>description
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>null
   </td>
   <td>Type a description of the Source.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>null
   </td>
   <td>Type a category of the source. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata field</a> field <code>_sourceCategory</code>. See <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">best practices</a> for details.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>fields
   </td>
   <td>JSON Object
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field <code>_siemForward</code> to enable forwarding to SIEM.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>base_url
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide your 1Password customer-specific domain, such as, <code>events.1password.com</code>.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>api_token
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide the 1Password API token you want to use to authenticate collection requests.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>supported_apis
   </td>
   <td>Array of strings
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Define one or more of the available APIs to collect: <code>itemUsage</code>, and <code>sign-in</code>. <br/> For example, for both you'd use: <code>["itemUsage","sign-in"]</code>
   </td>
   <td>modifiable
   </td>
  </tr>
</table>

### Example

1Password Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"1Password"
    },
    "config":{
      "name": "1Pass",
      "base_url": "events.1password.com",
      "supported_apis": ["itemUsage","sign-in"],
      "api_token": "********",
      "fields": {
           "_siemForward": true
      }
    },
    "sourceType":"Universal"
  }
}
```

## Troubleshooting

After configuring your Source, you should check the status of the source in the **Collectors** page >  **Status** column. If the Source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

![troubleshooting.jpg](/img/send-data/1password-troubleshooting.jpg)

**Error Code**: `401` <br />
**Error Details**: `{"Error":{"Message":"Unauthorized"}}`

To resolve these errors:
- Make sure the Base URL matches your domain.
- Make sure correct API Token is used to configure the source.
- If you're still seeing the `401 Unauthorized error` in the **Status** column, regenerate the API Token by following [these Authentication steps](#authentication) and then updating the API Token for the source.
