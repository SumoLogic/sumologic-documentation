---
id: qualys-vmdr-source
title: Qualys VMDR
sidebar_label: Qualys VMDR
description: The Qualys VMDR Source tracks errors, reports its health, and start-up progress.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Qualys VMDR ingests vulnerability data from [Vulnerability API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf), knowledgeBase data from [KnowledgeBase API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf), and asset data from [Asset API](https://www.qualys.com/docs/qualys-global-ai-api-v2-user-guide.pdf)

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## States

A Qualys VMDR Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

When a Qualys VMDR Source is created, it goes through the following states:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Qualys.
1. **Collecting**. The Source is actively collecting data from Qualys.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Create a Qualys VMDR Source

When you create a Qualys VMDR Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Qualys VMDR Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Qualys VMDR**. <br/>  <img src={useBaseUrl('img/send-data/qualys-icon.png')} alt="qualys-icon.png" width="200" />
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.<br/> <img src={useBaseUrl('img/send-data/qualys-config-main.png')} alt="qualys-config-main.png" width="450" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. **Qualys API Server URL** and **Qualys API Gateway URL**. Provide the Qualys API server URLs. Use the [Qualys Platform Identification](https://www.qualys.com/platform-identification) page and scroll down to **API URLs** to for a reference to your Qualys deployment location.
8. **Username** and **Password**. Use your Qualys account username and password for API authentication.
9. The next section covers the type of data to collect and how often. <br/> <img src={useBaseUrl('img/send-data/qualys-config-collection-selection.png')} alt="qualys-config-collection-selection.png" width="450" />
10. **Collect vulnerability data**. This option will fetch the list of hosts with the host's latest vulnerability data based on the host-based scan data available in the user’s account. We recommend leaving the polling interval at the default 1 hour.
11. (Optional) **Collect KnowledgeBase Information**. This option is only available if you choose to collect vulnerability data. If selected, it will automatically download the vulnerability details from the Qualys KnowledgeBase for vulnerabilities detected within your environment.
12. **Collect asset inventory**. This option consumes asset data from Qualys Global IT Asset Inventory API. The inventory data collected here will also be used in Cloud SIEM as inventory data. We recommend leaving the polling interval at the default 24 hours.
13. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | FirstPartyGenericError |

### Restart Sources

When Sources encounter ThirdPartyConfig errors, they can now be restarted. Both the Sumo Logic UI and Sumo Logic API allow you to restart the Sources.

#### UI

To restart your source in the Sumo Logic platform, follow the steps below:
1. Open the Collection page, and go to **Manage Data** > **Collection** > **Collection**.
2. Select the source and click the **information** icon on the right side of the row.
3. The API usage information popup is displayed. Click the **Restart Source** button on the bottom left. <br/><img src={useBaseUrl('img/send-data/restart-source-button.png')} alt="restart-source-button.png" width="550" />
4. Click **Confirm** to send the restart request. <br/><img src={useBaseUrl('img/send-data/restart-source-confirm.png')} alt="restart-source-confirm.png" width="550" />
5. The bottom left of the platform will provide a notification informing you the request was successful.<br/><img src={useBaseUrl('img/send-data/source-restart-initiated.png')} alt="source-restart-initiated.png" width="550" />


#### API

To restart your source using the Sumo Management API, follow the instructions below:
* Method: POST
* Example endpoint: `https://api.sumologic.com/api/v1/collectors/{collector_id}/sources/{source_id}/action/restart`.

Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside us1. For example, an API endpoint in Europe would begin `api.eu.sumologic.com`.  A service endpoint in us2 (Western US) would begin service.us2.sumologic.com.  For more information, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).

## FAQ

### What specific API routes does this C2C collect?

<table>
  <tr>
   <td><strong>Data Type</strong>
   </td>
   <td><strong>API Route</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Vulnerability Detections
   </td>
   <td><code>/api/2.0/fo/asset/host/vm/detection/</code>
   </td>
   <td>This collects a current list of new vulnerabilities detected for each computer. Each detection is sent as a separate log to Sumo Logic. API details are on page 480 in <a href="https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf">this Qualys PDF</a>.
   </td>
  </tr>
  <tr>
   <td>KnowledgeBase
   </td>
   <td><code>/api/2.0/fo/knowledge_base/vuln/</code>
   </td>
   <td>This collects the current vulnerability details from the Qualys KnowledgeBase for vulnerabilities when they are detected within your environment. API details are on page 200 in <a href="https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf">this Qualys PDF</a>.
   </td>
  </tr>
  <tr>
   <td>Computer Inventory
   </td>
   <td><code>/rest/2.0/search/am/asset/</code>
   </td>
   <td>This collects the details for each asset/computer from Qualys. This data source is supported by Cloud SIEM as <a href="https://help.sumologic.com/docs/cse/administration/inventory-sources-and-data/">inventory data</a>. API details are on page 24 in the <a href="https://www.qualys.com/docs/qualys-gav-csam-api-v2-user-guide.pdf">this Qualys PDF</a>.
   </td>
  </tr>
</table>


### Is anything changed with data for computer inventory?

Sometimes the asset information from the computer inventory data can exceed the [Sumo Logic maximum log size of 64KB](https://help.sumologic.com/docs/search/get-started-with-search/search-basics/search-large-messages/). Sumo Logic will automatically split log messages exceeding the size limit into smaller chunks. This C2C makes the following changes to the computer inventory asset data collected in order to keep most logs under the size limit and prevent splitting:

- The `openPortListData` key only contains information about ports open since the last time computer asset was ingested instead of listing all open port history from all time.
- The `softwareListData` is reduced down from the full details to simply a list/array of software names using the full name.

### How can I differentiate between data types collected?

The Qualys VMDR C2C collects all data using JSON as the format. It will add an additional key to your data called `LogType` with the values of `vulnerabilityLogs`, `knowledgeBaseLogs`, and `assetInventory`. This allows you to easily filter between them in your search queries.
