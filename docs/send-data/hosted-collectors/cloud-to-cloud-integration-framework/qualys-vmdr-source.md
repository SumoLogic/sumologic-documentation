---
id: qualys-vmdr-source
title: Qualys VMDR
sidebar_label: Qualys VMDR
---

The Qualys VMDR ingests vulnerability data from [Vulnerability API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf) and asset data from [Asset API](https://www.qualys.com/docs/qualys-global-ai-api-v2-user-guide.pdf)

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## States

A Qualys VMDR Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Qualys VMDR Source goes through the following states when
created:

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

1. In Sumo Logic, select **Manage Data \> Collection \> Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Qualys VMDR**. <br/>   ![qualys vmdr icon.png](/img/send-data/qualys-icon.png)
4. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/> ![qualys vmdr input window.png](/img/send-data/qualys-config-main.png)
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
7. **Qualys API Server URL** and **Qualys API Gateway URL**. Provide the Qualys API server URLs. Use the [Qualys Platform Identification](https://www.qualys.com/platform-identification) page and scroll down to **API URLs** to for a reference to your Qualys deployment location.
8. **Username** and **Password**. Use your Qualys account username and password for API authentication.
9. The next section covers the type of data to collect and how often. <br/> ![qualys vmdr input window.png](/img/send-data/qualys-config-collection-selection.png)
10. **Collect vulnerability data**. This option will fetch the list of hosts with the host's latest vulnerability data based on the host-based scan data available in the user’s account. We recommend leaving the polling interval at the default 1 hour.
11. **Collect asset inventory**. This option consumes asset data from Qualys Global IT Asset Inventory API. The inventory data collected here will also be used in Cloud SIEM as inventory data. We recommend leaving the polling interval at the default 24 hours.
9. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | FirstPartyGenericError |
