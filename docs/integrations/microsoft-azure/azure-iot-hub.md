---
id: azure-iot-hub
title: Azure IoT Hub
description: Learn about the Sumo Logic collection process for the Azure IoT Hub service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-iot-hub.png')} alt="Azure IoT Hub icon" width="50"/>

[Azure IoT Hub](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub) is a managed service hosted in the cloud that acts as a central message hub for communication between an IoT application and its attached devices. This integration helps in monitoring the device creation, device connections, device operations, device data usage, and device failures.

## Log and metric types

For Azure IoT Hub, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure IoT Hub, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/iot-hub/monitor-iot-hub-reference#resource-logs).
* **Platform Metrics for Azure IoT Hub**. These metrics are available in [Microsoft.Devices/IotHubs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-devices-iothubs-metrics) namespace.
For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/iot-hub/monitor-iot-hub-reference#metrics).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports collecting logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure IoT Hub you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/IoTHub/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-use-metrics-and-diags#collect-logs-for-connections-and-device-telemetry). Perform the steps below for each Azure IoT Hub that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/IoTHub/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
