---
id: collect-metrics-azure-monitor
title: Collect Metrics from Azure Monitor
sidebar_label: Collecting Metrics using ARM
description: Instructions for configuring a pipeline for shipping metrics available from Azure Monitor to  Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for configuring a pipeline for shipping metrics available from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP source on a hosted collector in Sumo Logic. Azure Monitor collects metrics and well as logs. The pipeline described below is for metrics, not logs. 

For information about Azure metrics, see [Overview of metrics in Microsoft Azure in Azure](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-overview-metrics) help.

Here’s how the solution fits together:

* Azure Monitor collects metrics for most Microsoft Azure services and streams the data to an Azure event hub. 
* Azure Event Hubs is a data streaming platform and event ingestion service. In this pipeline, an event hub streams the metrics collected by Azure Monitor to a Sumo-provided Azure function. 
* The Azure function is a small piece of code triggered by the event hub to send metrics to the Sumo HTTP Source from the event hub, function logs to one Storage Account, and failover data to another. The trigger has to be activated by the customer.

For more information about the solution strategy, see [Azure Monitoring](/docs/send-data/collect-from-other-data-sources/azure-monitoring).

<img src={useBaseUrl('/img/send-data/Azure-metrics.png')} alt="Azure metrics" style={{border: '1px solid gray'}} width="800" />

## Configure metric collection

This section has instructions for configuring collection of metrics from Azure Monitor.

### Step 1. Configure an HTTP source

In this step, you configure an HTTP source to receive logs from the Azure function.

1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).

### Step 2. Configure Azure resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, an Azure function and two Storage Accounts. The Azure function is triggered by Event Hub. Two storage accounts are used to store log messages from the Azure function and failover data from Event Hub.

1. Download the [azuredeploy_metrics.json](https://raw.githubusercontent.com/SumoLogic/sumologic-azure-function/master/EventHubs/src/azuredeploy_metrics.json) ARM template.
1. Go to azure portal and search for **template deployment** in the search bar. Select **Template deployment (deploy using custom templates)** under **Marketplace**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/azure-template-deploy.png')} alt="Azure template deploy" style={{border: '1px solid gray'}} width="800" />
1. On the **Custom deployment** blade, click **Build your own template in the editor**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/custom-deployemnt.png')} alt="Custom deployment" style={{border: '1px solid gray'}} width="800" />
1. On the **Edit template** page, select **Load file** and upload the json file downloaded in the previous step. Click **Save**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/azure-template-deploy2.png')} alt="Azure template deploy" style={{border: '1px solid gray'}} width="800" />
1. Now you are back on the **Custom deployment** blade.
   1. Create a new Resource Group (recommended) or select an existing one.
   1. Choose **Region**. The event hub namespace needs to be in the same region as the resource being monitored if the resource is regional.
   1. For the **Sumo Endpoint URL** supply the URL for HTTP source you defined in [Step 1](#step-1-configure-an-http-source).
   1. Click **Review + Create**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/pipeline-custom-deployment.png')} alt="Pipeline custom deployment" style={{border: '1px solid gray'}} width="800" />
1. After clicking on **create** button, you will land to the **Deployment** page, you should see the **Your deployment is complete** message after deployment is finished:<br/><img src={useBaseUrl('/img/send-data/azure-metrics/microsofttemplate_resource.png')} alt="Microsoft template resource" style={{border: '1px solid gray'}} width="800" />
1. Creating container for failover logs
    1. Click on **Go to resource group** button in the **Deployment** page.
    1. In the Resource Group window, search for `smfaillogs` in **Resources** Tab.  Click on `smfaillogs<random-string>` storage account.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/storageaccount.png')} alt="Storage account" style={{border: '1px solid gray'}} width="800" />
    1. Under **Data Storage**, click **Containers**, then **click + Container**, enter the **Name** `smfaillogs`. Click **Create**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/containers.png')} alt="Containers" style={{border: '1px solid gray'}} width="800" />

### Step 3. Export metrics for a particular resource to Event Hub

Follow these steps to export metrics for a resource to Event Hub.

1. Go to the resource whose metrics you want to collect. In below example we are collecting `SQL database` metrics.
1. From the left pane, select **Diagnostic settings** under **Monitoring**.
1. Click **Add diagnostic setting**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/adddiagnosticsetting.png')} alt="Add diagnostic setting" style={{border: '1px solid gray'}} width="800" />
1. The **Diagnostic settings** page appears.
    1. **Diagnostic setting name**: Enter a name for the diagnostic setting.
    1. In the left panel under **Metrics** section:
        * Choose the metrics you want to collect or you can choose `AllMetrics` (if available) which enables collection for all the metrics. Do not select anything under `Logs` since logs and metrics needs to be exported in separate event hubs.
    1. In the right panel under **Destination details** section:
        * Click the **Stream to an event hub** checkbox.
        * Choose a **Subscription**.
        * Select `SMNamespace<UniqueSuffix>` as the Event hub namespace.
        * Select **insights-metrics-pt1m** as the event hub name.
        * Select an event hub policy name. You can use the default policy **RootManageSharedAccessKey**.
    1. Save the **Diagnostic settings**.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/diagnosticsetting.png')} alt="Diagnostic setting" style={{border: '1px solid gray'}} width="800" />

### Troubleshooting metrics collection

If metrics are not flowing into Sumo Logic, follow the steps below to investigate the problem.

#### Verify Configurations

First, make sure that the resources you created above were successfully created.

Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). You should see the seven resources you created: an App Service plan, an App Service, an Event Hubs Namespace, Application Insights, Log Analytics workspace and two Storage accounts.

<img src={useBaseUrl('/img/send-data/azure-metrics/resource.png')} alt="Resource" style={{border: '1px solid gray'}} width="800" />

#### Verify Event Hub is receiving metrics

To verify that events are appearing in your event hub:

1. Navigate to the event hub namespace present in your resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template) in the Azure Portal. And then go to the event hub.
1. Scroll down and view the `Messages` chart
1. Check that the **Incoming Messages** count is greater than zero and the **Outgoing Messages** count is greater than zero. If there are no Incoming Messages then check the **Diagnostic Settings** are configured correctly or not. If there are no Outgoing Messages then [verify the trigger configuration in Function App](#verify-the-event-hub-trigger-configuration). If both are present then [verify the sumo logic HTTP source URL](#verify-sumo-logic-http-source-url).

<img src={useBaseUrl('/img/send-data/azure-metrics/event-hub-messages.png')} alt="Event hub messages" style={{border: '1px solid gray'}} width="800" />

#### Verify the Event hub trigger configuration

1. Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). Search for `SMFuncApp`. You should find the `SMFuncApp<random-string>` Function App. Click it.
1. Under the **Functions** tab, click **EventHubs_Metrics**.
1. Under the **Developer** section, click **Integration**. Click on `Azure Event Hubs` under the **Triggers** section and verify the event hub configuration, this should be same as the one where you are exporting the logs.

<img src={useBaseUrl('/img/send-data/azure-metrics/azure-triggers.png')} alt="Triggers" style={{border: '1px solid gray'}} width="800" />

#### Verify Sumo Logic HTTP source URL.

1. Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). Search for `SMFuncApp`. You should find the `SMFuncApp<random-string>` Function App. Click it.
1. Click on **Configuration** under **Settings** in the left panel. Click on `SumoLabsMetricEndpoint`. Check that the value of the **SumoLabsMetricEndpoint** field matches the HTTP source URL.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/sumolabsmetricendpoint.png')} alt="Application settings" style={{border: '1px solid gray'}} width="800" />

#### Verify Failure logs in Application Insights

1. Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). Search for `SMAppInsights`. You should find the `SMAppInsights<random-string>` Application Insights. Click it.
1. In the left panel under **Investigate** click on **Failures**. Click on **Count** column on the rightmost panel, it will take you to the trace, select any trace and see the exception message.<br/><img src={useBaseUrl('/img/send-data/azure-metrics/smappinsightfailures.png')} alt="Application insights" style={{border: '1px solid gray'}} width="800" />

### Common errors

For common error messages, refer [Event Hub export error messages](/docs/send-data/collect-from-other-data-sources/azure-monitoring/arm-integration-faq#event-hub-export-error-messages) section.

