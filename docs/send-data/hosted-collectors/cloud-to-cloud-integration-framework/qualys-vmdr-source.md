---
id: qualys-vmdr-source
title: Qualys VMDR Source
sidebar_label: Qualys VMDR
tags:
    - qualys-vmdr
    - cloud-SIEM-enterprise
description: The Qualys VMDR Source tracks errors, reports its health, and start-up progress.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/qualys-icon.png')} alt="qualys-icon.png" width="120" />

The Qualys VMDR ingests vulnerability data from [Vulnerability API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf), knowledgeBase data from [KnowledgeBase API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf), and asset data from [Asset API](https://www.qualys.com/docs/qualys-global-ai-api-v2-user-guide.pdf).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1 hour | [Assets](https://www.qualys.com/docs/qualys-global-ai-api-v2-user-guide.pdf) |
| 24 hours | [Vulnerabilities](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf) |

## Setup

### Vendor configuration

Identify your Qualys API server URLs and Qualys API Gateway URL as mentioned in the [Qualys documentation](https://www.qualys.com/platform-identification).

### Source configuration

When you create a Qualys VMDR Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Qualys VMDR Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Qualys VMDR**.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Qualys API Server URL** and **Qualys API Gateway URL**. Provide the Qualys API server URLs. Use the [Qualys Platform Identification](https://www.qualys.com/platform-identification) page and scroll down to **API URLs** to for a reference to your Qualys deployment location.
1. **Username** and **Password**. Use your Qualys account username and password for API authentication.
1. The next section covers the type of data to collect and how often.
1. **Collect vulnerability data**. This option will fetch the list of hosts with the host's latest vulnerability data based on the host-based scan data available in the user’s account. We recommend leaving the polling interval at the default 1 hour.
1. (Optional) **Collect KnowledgeBase Information**. This option is only available if you choose to collect vulnerability data. If selected, it will automatically download the vulnerability details from the Qualys KnowledgeBase for vulnerabilities detected within your environment.
1. **Collect asset inventory**. This option consumes asset data from Qualys Global IT Asset Inventory API. The inventory data collected here will also be used in Cloud SIEM as inventory data. We recommend leaving the polling interval at the default 24 hours.
   * To forward Qualys VMDR assetInventory to Cloud SIEM, it is recommended to create a [Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/) with the following criteria:
   * Scope: `_sourceCategory="<enter your source category here from Step 5>" "assetInventory"`
   * Parse Expression: `"true" as _siemForward`
1. When you are finished configuring the Source, click **Submit**.


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

### What specific API routes does this C2C collect?

<table>
  <tr>
   <td><strong>Data Type</strong></td>
   <td><strong>API Route</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>Vulnerability Detections</td>
   <td><code>/api/2.0/fo/asset/host/vm/detection/</code></td>
   <td>This collects a current list of new vulnerabilities detected for each computer. Each detection is sent as a separate log to Sumo Logic.<br />
   Permissions - <code>Managers</code> view all VM scanned hosts in subscription. <code>Auditors</code> have no permission to view VM scanned hosts. <code>Unit Managers</code> view VM scanned hosts in the user’s assigned business unit. <code>Scanners</code> and <code>Readers</code> view VM scanned hosts in the user’s account.<br/>
   API details are on page 496 in <a href="https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf">this Qualys PDF</a>.</td>
  </tr>
  <tr>
   <td>KnowledgeBase</td>
   <td><code>/api/2.0/fo/knowledge_base/vuln/</code></td>
   <td>This collects the current vulnerability details from the Qualys KnowledgeBase for vulnerabilities when they are detected within your environment.<br />
   Permissions - A subscription must be granted permission to run this API function. Roles <code>Manager</code>, <code>Unit Manager</code>, <code>Scanner</code>, <code>Reader</code> are granted a permission <code>Download vulnerability data from the KnowledgeBase</code>. Role <code>Auditor</code> has no such permission.<br />
   API details are on page 209 in <a href="https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf">this Qualys PDF</a>.</td>
  </tr>
  <tr>
   <td>Computer Inventory</td>
   <td><code>/rest/2.0/search/am/asset/</code></td>
   <td>This collects the details for each asset/computer from Qualys. This data source is supported by Cloud SIEM as <a href="/docs/cse/administration/inventory-sources-and-data">inventory data</a>.<br />
   Permissions - User must have the <code>GAV/CSAM</code> module and the <code>App API Enabled</code> option enabled for that role. Additionally, the user must have the <code>Allow user view access to all objects</code> checkbox enabled under <strong>Roles And Scopes</strong> within the user settings.<br/>
   API details are on page 27 in the <a href="https://www.qualys.com/docs/qualys-gav-csam-api-v2-user-guide.pdf">this Qualys PDF</a>.</td>
  </tr>
</table>

### Is anything changed with data for computer inventory?

Sometimes the asset information from the computer inventory data can exceed the [Sumo Logic maximum log size of 64KB](/docs/search/get-started-with-search/search-basics/search-large-messages/). Sumo Logic will automatically split log messages exceeding the size limit into smaller chunks. This C2C makes the following changes to the computer inventory asset data collected in order to keep most logs under the size limit and prevent splitting:

- The `openPortListData` key only contains information about ports open since the last time computer asset was ingested instead of listing all open port history from all time.
- The `softwareListData` is reduced down from the full details to simply a list/array of software names using the full name.

### How can I differentiate between data types collected?

The Qualys VMDR C2C collects all data using JSON as the format. It will add an additional key to your data called `LogType` with the values of `vulnerabilityLogs`, `knowledgeBaseLogs`, and `assetInventory`. This allows you to easily filter between them in your search queries.
