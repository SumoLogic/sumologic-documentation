---
id: azure-key-vault
title: Azure Key Vault
description: Learn about the Sumo Logic collection process for the Azure Key Vault service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-key-vault.png')} alt="Thumbnail icon" width="50"/>

[Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) is a managed service hosted in the cloud that acts as a central message hub for communication between an IoT application and its attached devices. This integration helps in comprehensive monitoring of your key vaults requests, performance, failures, and latency.

## Log and metric types

For Azure Key Vault, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure Key Vault, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/key-vault/general/monitor-key-vault-reference#resource-logs).
* **Key Vault Metrics**. These metrics are available in [Microsoft.KeyVault/vaults](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-keyvault-vaults-metrics) namespace.
* **Managed HSM Metrics**. These metrics are available in [Microsoft.KeyVault/managedhsms](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-keyvault-managedhsms-metrics) namespace.

For more information on supported metrics and their units, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/key-vault/general/monitor-key-vault-reference#key-vault-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Key Vault you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/KeyVault/Logs`, `Azure/KeyVault/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Event Grid namespace that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event Hub namespace created by the ARM template in Step 2 above. You can create a new Event Hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-event-grid-metrics.png')} alt="Azure event grid metrics" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Event Grid Tag Location" style={{border: '1px solid gray'}} width="400" />

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform below steps for each Azure Event Grid namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-eventgrid-logs.png')} alt="Azure Event Grid logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Event Grid Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

## Viewing the Azure Key Vault dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

**Azure Key Vault - Overview** dashboard allows you to monitor and analyze your key vault's usage metrics, including API hits, vault usage, and average latencies. Gain insights into the performance of your vaults.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Overview.png')} alt="Azure Key Vault dashboards" />

### Operations Overview

**Azure Key Vaults - Operations** Overview dashboard provides insights of operational logs for your key vaults. Monitor key, secret, and certificate operations, including creation, storage, deletion, retrieval, setting, and recovery. Gain insights into key activities for effective management.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Operations-Overview.png')} alt="Azure Key Vault dashboards" />

### Operations Detailed

**Azure Key Vaults - Operations Detailed** dashboard provides insights of operational logs for your key vaults. Monitor key, secret, and certificate operations, including creation, storage, deletion, retrieval, setting, and recovery in detailed views. Gain insights into key activities for effective management.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Operations-Detailed.png')} alt="Azure Key Vault dashboards" />

### Errors and Failures

**Azure Key Vaults - Errors and Failures** dashboard provides detailed information on what is happening (errors or recent failure events) in a Key Vault.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Errors-and-Failures.png')} alt="Azure Key Vault dashboards" />

### Administrative Operations

**Azure Key Vaults - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Key Vaults resources Use this dashboard to: Monitor the distribution of operation types and their success rates to ensure proper functioning of your Key Vaults. Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications. Track recent write and delete operations to maintain an audit trail of changes made to your Key Vaults.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Administrative-Operations.png')} alt="Azure Key Vault dashboards" />

### Policy and Recommendations

**Azure Key Vaults - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Key Vaults resources. Use this dashboard to: Monitor the success and failure rates of policy events to ensure proper configuration and compliance. Track and analyse recent recommendations to improve the performance and security of your Vaults setup. Identify trends in policy events and recommendations over time to proactively address potential issues.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Policy-and-Recommendations.png')} alt="Azure Key Vault dashboards" />

### Vault Health

**Azure Key Vaults - Vault Health** dashboard allows you to monitor and analyze your key vault's usage metrics, including API hits, vault usage, and average latencies. Gain insights into the health of your vaults.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Vault-Health.png')} alt="Azure Key Vault dashboards" />

### Compliance

**Azure Key Vaults - Compliance** dashboard provides detailed information on what is happening with polices and compliance related events in a Key Vault and gives an overview of the objects (Keys, Secrets, etc) are adhering to specific compliance and policies in Azure.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureKeyVaults/Azure-Key-Vaults-Compliance.png')} alt="Azure Key Vault dashboards" />

## Create monitors for Azure Key Vaults app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Key Vaults alerts
These alerts are metric based and will work for all Key Vaults.

| Alert Name                                                                                                                                             | Alert Description and Conditions                                                               | Alert Condition | Recover Condition |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------|:----------------|:------------------|
| `Azure Key Vaults - Availability drops below 100%`                                                                                                     | This alert is triggered when availability drops under 100% are detected for any Key Vaults.    | Count < 100     | Count = 100       |
| `Azure Key Vaults - Keys, Secrets, Certificates Expired Alert`                                                                                         | This alert trigger when any Keys, Secrets, Certificates has expired for any of Key Vaults.     | Count >= 1      | Count < 1         |
| `Azure Key Vaults - Keys, Secrets, Certificates Near Expiry Alert`                                                                                     | This alert trigger when any Keys, Secrets, Certificates are near expiry for any of Key Vaults. | Count >= 1      | Count < 1         |
| `Azure Key Vaults - Latency is greater than 1000 ms`                                                                                                   | This alert is triggered when latency of Vaults goes above below 1000ms.                        | Count >= 1000   | Count < 1000      |
| `Azure Key Vaults - Overall Vault Saturation is greater than 75%`                                                                                      | This alert is triggered when Overall vault saturation of any vaults is greater than 75%.       | Count >= 75     | Count < 75        |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
