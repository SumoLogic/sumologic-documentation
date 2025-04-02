---
id: azure-backup
title: Azure Backup
description: Learn about the Sumo Logic collection process for the Azure Backup service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-backup.png')} alt="Thumbnail icon" width="50"/>

The [Azure Backup](https://learn.microsoft.com/en-us/azure/backup/backup-overview) service provides simple, secure, and cost-effective solutions to back up your data and recover it from the Microsoft Azure cloud. This integration helps you in getting rich insights on your backups across your entire backup estate.

## Log and metric types

For Azure Backup, you can collect the following logs and metrics:

* **Diagnostic logs**. Azure Backup provides the following diagnostics events:
  * CoreAzureBackup
  * AddonAzureBackupProtectedInstance
  * AddonAzureBackupJobs
  * AddonAzureBackupPolicy
  * AddonAzureBackupStorage

To learn more about the schemas differences for Recovery Services vaults and Backup vaults and different fields collected, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/backup/backup-azure-reports-data-model).

* **Health Metrics**. These metrics are available in [Microsoft.RecoveryServices/Vaults](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-recoveryservices-vaults-metrics) and [Microsoft.DataProtection/BackupVaults](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dataprotection-backupvaults-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Backup Vault you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AzureBackup/Logs`, `Azure/AzureBackup/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create a hosted collector and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Backup Vault that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `Health`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the Azure documentation for [Recovery Service Vaults](https://learn.microsoft.com/en-us/azure/backup/configure-reports?tabs=recovery-services-vaults#2-configure-diagnostics-settings-for-your-vaults) and [Backup Vaults](https://learn.microsoft.com/en-us/azure/backup/configure-reports?tabs=backup-vaults#2-configure-diagnostics-settings-for-your-vaults) respectively. Perform below steps for each Azure Backup Vault that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select the following events for respective vault type:
        * Backup Vault: `CoreAzureBackup, AddonAzureBackupJobs, AddonAzureBackupPolicy, and AddonAzureBackupProtectedInstance`.
        * Recover Service Vault: `CoreAzureBackup, AddonAzureBackupJobs, AddonAzureBackupPolicy, AddonAzureBackupStorage, and AddonAzureBackupProtectedInstance`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
