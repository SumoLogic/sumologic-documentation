---
id: box-source
title: Box Source
sidebar_label: Box Source
description: The Box API integration ingests events from the Get Events API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Box API integration ingests events from the [Get Events API](https://developer.box.com/reference/get-events/). It securely stores the required authentication, scheduling, and state tracking information.

## Rules 

* JSON is the only supported log format.
* Data is collected in five minute intervals.

## Authentication 

You'll need a Box App Key, App Secret, and Access Code to provide to Sumo Logic.

The following steps must be followed to get the credentials:

1. Login into the [Box Account](https://app.box.com/login).
2. Create and register a new app from the [App Console](https://app.box.com/developers/console). To register the App with Box follow [these](https://developer.box.com/guides/authentication/jwt/jwt-setup/#app-creation-steps) steps. <br/>
:::note
Select **Server Authentication (with JWT) **as the authentication method. Note that use of a key pair requires  2-step verification to be enabled on Box.
:::  
1. Generate `public private key pair` as described in the following steps [Key Pair](https://developer.box.com/guides/authentication/jwt/jwt-setup/#public-and-private-key-pair) and download the JSON file.
2. Go to the **Configuration** and change **App Access Level** to **App + Enterprise Access** and enable **Manage Enterprise properties** in **Application Scopes** and save changes as shown below.
<img src={useBaseUrl('img/send-data/box-configuration.png')} alt="box-configuration.png" />
3. Authorize your app by following these steps [Authorize](https://developer.box.com/guides/authentication/jwt/jwt-setup/#app-authorization).

## States 

A Box Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](docs/manage/health-events.md).

A Box Source goes through the following states when created:

1. **Pending**: Once the Source is submitted it is validated, stored, and placed in a **Pending** state.
2. **Started**: A collection task is created on the Hosted Collector.
3. **Initialized**: The task configuration is complete in Sumo Logic.
4. **Authenticated**: The Source successfully authenticated with Box.
5. **Collecting**: The Source is actively collecting data from Box.

If the Source has any issues during any one of these states it is placed in an **Error** state.

When you delete the Source it is placed in a **Stopping** state, when it has successfully stopped it is deleted from your Hosted Collector.

On the Collection page, the [Health](docs/manage/health-events.md#Collection_page) and Status for Sources is displayed.
<img src={useBaseUrl('img/send-data/health-status-2.png')} alt="health.png" />

You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

<img src={useBaseUrl('img/send-data/hover-c2c-error.png')} alt="health.png" />

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

<img src={useBaseUrl('img/send-data/unable.png')} alt="unable.png" />


## Create a Box Source 

When you create a Box Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors#Create_a_Hosted_Collector).

**To configure a Box Source:**

1. In the Sumo Logic web app, navigate to** Manage Data > Collection** and open the **Collection** tab. 
2. On the Collectors page, click **Add Source** next to a Hosted** **Collector.
3. Select **Box**. 
<img src={useBaseUrl('img/send-data/box-logo.png')} alt="box-logo.png" />
1. Enter a **Name** for the Source. The **description** is optional. 
<img src={useBaseUrl('img/send-data/box-source.png')} alt="box-source.png" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](docs/cse). 

When configured with the **Forward to SIEM** option the following metadata fields are set:

| Field Name   | Value             |   
| :-- | :-- | :-- |
| _siemVendor  | Box               |
| _siemProduct | Enterprise Events |
| _siemFormat  | JSON              |
| _siemEventID | {event_type}      |

1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](https://help.sumologic.com/Manage/Fields).
    * Define the fields you want to associate, each field needs a name (key) and value. 
        * <img src={useBaseUrl('img/reuse/check-green-circle.png')} alt="circle.png" /> A green circle with a checkmark is shown when the field exists and is enabled in the Fields table schema.
        * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
2. Upload the JSON file.
3. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/manage/collection/processing-rules/create-processing-rule.md).
4. When you are finished configuring the Source click **Submit**.

## Error types 

When Sumo Logic detects an issue it is tracked by [Health Events](https://help.sumologic.com/Manage/Health_Events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.
| Reason |Retries | Retry Behavior | Health Event Name]
| :-- | :-- | :-- | :-- | :-- |
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |   
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.  | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |  
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.  | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |   

## JSON configuration 

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](https://help.sumologic.com/APIs/Collector-Management-API). See [how to use JSON to configure Sources](https://help.sumologic.com/03Send-Data/Sources/03Use-JSON-to-Configure-Sources) for details. 

| Parameter   | Type        | Required? | Description  | Access         |  
| :-- | :-- | :-- | :-- | :-- |
| config     | JSON Object | Yes       | Contains the configuration parameters for the Source. |                | 
| schemaRef  | JSON Object | Yes       | Use {"type":"Box"} for a Box Source.                  | not modifiable |  
| sourceType | String      | Yes       | Use Universal for a Box Source.                       | not modifiable |  


The following table shows the **config** parameters for a Box Source.


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
   <td>Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the <a href="https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata">metadata</a> field <code>_source</code>.
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
   <td>Type a category of the source. This value is assigned to the <a href="https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata">metadata</a> field <code>_sourceCategory</code>. See <a href="https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category">best practices</a> for details.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>fields
   </td>
   <td>JSON
<p>
Object</p>
   </td>
   <td>No
   </td>
   <td> 
   </td>
   <td>JSON map of key-value fields (metadata) to apply to the Collector or Source.
<p>
Use the boolean field <code>_siemForward</code> to enable forwarding to SIEM.</p>
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>credentialsJson
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td> 
   </td>
   <td>Its the authentication credentials to access Box platform.
   </td>
   <td>modifiable
   </td>
  </tr>
</table>

## Box Source JSON example


```
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Box"
    },
    "config":{
      "name":"box-test-1",
      "fields":{
        "_siemForward":false
      },
      "credentialsJson":"********"
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```