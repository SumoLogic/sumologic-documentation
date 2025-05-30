---
id: crowdstrike-fdr-host-inventory-source
title: CrowdStrike FDR Host Inventory Source
sidebar_label: CrowdStrike FDR Host Inventory
tags:
  - cloud-to-cloud
  - crowdstrike-fdr-host-inventory
description: Learn how to collect device information from the CrowdStrike FDR and send it to Sumo Logic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike FDR Host Inventory Source provides a secure endpoint to receive device data from the CrowdStrike [Host-And-Host-Group-Management-APIs](https://falcon.crowdstrike.com/documentation/84/host-and-host-group-management-apis#managing-hosts). It securely stores the required authentication, scheduling, and state tracking information.

:::important
The CrowdStrike API documentation is not public and can only be accessed by partners or customers.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours |  [Device data](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-source) via a [lookup table](/docs/search/lookup-tables/create-lookup-table/#introduction-to-lookup-tables) |

## Setup

### Vendor configuration

:::note
To collect device data from the CrowdStrike platform, you must have an authorized CrowdStrike account. CrowdStrike APIs use an OAuth 2.0 authorization token to make authorized API calls. CrowdStrike API Client is required to get the OAuth 2.0 authorization token. To define a CrowdStrike API client, you must be designated as a `CrowdStrike Falcon Administrator` role.
:::

In this configuration, you will set up the CrowdStrike FDR account and configure it to be authorized and authenticated to use device information from CrowdStrike FDR API. To obtain the auth token, you will need the following parameters.

#### API Client and API Secret

The **API security token** is used to authenticate with CrowdStrike FDR API. After successfully creating the API client, you will get the **Client Id**, **Client Secret**, and **Base URL**.
To get the **CrowdStrike API Client**, follow the steps below:
1. Access the [CrowdStrike FDR Platform](https://falcon.crowdstrike.com/login/).
1. Log in using your email address and password. After you've completed the two-factor authentication, you'll be directed to the application dashboard.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-login-screen.png')} style={{border:'1px solid gray'}} alt="crowdstrike-fdr-host-inventory-login-screen.png" width="600" />
1. From the CrowdStrike FDR Console, on the left-hand panel of the dashboard, locate the Menu option and click on it.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-open-menu.png')} style={{border:'1px solid gray'}} alt="<crowdstrike-fdr-host-inventory-open-menu.png>" width="600" />
1. Select the **Support and resources** option from the menu.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-support-and-resources.png')} style={{border:'1px solid gray'}} alt="<crowdstrike-fdr-host-inventory-support-and-resources.png>" width="600" />
1. Navigate to and click on **API clients and keys**. You can then view existing clients or add new API clients from there.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-api-key-client.png')} style={{border:'1px solid gray'}} alt="<crowdstrike-fdr-host-inventory-api-key-client.png>" width="600" />
1. Click **Add new API client**. You will be prompted to give a descriptive name and select the appropriate API scopes.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-new-client.png')} style={{border:'1px solid gray'}} alt="<crowdstrike-fdr-host-inventory-new-client.png>" width="600" />
1. Provide a proper name and description and select the **Read Hosts Scope**. Click on `ADD` to complete the process.<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-add-client.png')} style={{border:'1px solid gray'}} alt="<crowdstrike-fdr-host-inventory-add-client.png>" width="600" />
1. After you click on `ADD` a dialogue box will appear with the **Client ID**, **Client Secret** and **Base URL**. Copy and paste the Client Id, Client Secret and Base URL to a folder location because you will need them when creating the [CrowdStrike FDR Host Inventory Source](#source-configuration).<br/><img src={useBaseUrl('img/send-data/crowdstrike-fdr-host-inventory-copy-creds.png')} alt="<crowdstrike-fdr-host-inventory-copy-creds.png>" style={{border:'1px solid gray'}} width="600" />

#### Region

Identify your **Region** based on your **Base URL**. The region can be selected from the list below.

   | Region | Base URL                    |
   | :------ | :-------------------------- |
   | US-1    | https://api.crowdstrike.com |
   | US-2    | https://api.us-2.crowdstrike.com  |
   | EU-1    | https://api.eu-1.crowdstrike.com  |
   | US-GOV-1    | https://api.laggar.gcw.crowdstrike.com |

### Source configuration

When you create a CrowdStrike FDR Host Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the CrowdStrike FDR Host Inventory API:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **CrowdStrike FDR Host Inventory** icon.
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/) as inventory. <br/><ForwardToSiem/>
7. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
8. In **Region**, choose the region as per your Base URL. See [Region](#region) section to know your region.
9. In **Client ID**, enter the Client ID you generated and secured from the [API Client](#api-client-and-api-secret) section.
10. In **Client Secret**, enter the Client Secret you generated and secured from the [API Secret](#api-client-and-api-secret) section.
11. By default, **Polling Interval** is set to 24 hours.
12. When you are finished configuring the Source, click **Save**.

## Metadata Field

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `CrowdStrike` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `FDR Host Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `Inventory` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"CrowdStrike FDR Host Inventory"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| region | String | Yes | `null` | The Region of your CrowdStrike account. |  |
| clientID | String | Yes | `null` | The CrowdStrike Client ID you want to use to authenticate collection requests. |  |
| clientSecret | String | Yes | `null` | The CrowdStrike Client Secret you want to use to authenticate collection requests. |  |
| pollingInterval | Integer | No | 24 | This sets how often the Source checks for data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/crowdstrike-fdr-host-inventory/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/crowdstrike-fdr-host-inventory/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
