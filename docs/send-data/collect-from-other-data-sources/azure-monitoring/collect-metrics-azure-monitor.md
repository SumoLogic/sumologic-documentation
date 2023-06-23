---
id: collect-metrics-azure-monitor
title: Collect Metrics from Azure Monitor
sidebar_label: Collecting Metrics 
description: Instructions for configuring a pipeline for shipping metrics available from Azure Monitor to  Sumo Logic.
---

This section has instructions for configuring a pipeline for shipping metrics available from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP source on a hosted collector in Sumo Logic. Azure Monitor collects metrics and well as logs. The pipeline described below is for metrics, not logs. 

For information about Azure metrics, see [Overview of metrics in Microsoft Azure in Azure](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-overview-metrics) help.

Here’s how the solution fits together:

* Azure Monitor collects metrics for most Microsoft Azure services and streams the data to an Azure event hub. 
* Azure Event Hubs is a data streaming platform and event ingestion service. In this pipeline, an event hub streams the metrics collected by Azure Monitor to a Sumo-provided Azure function. 
* The Azure function is a small piece of code triggered by the event hub to send metrics to the Sumo HTTP Source from the event hub, function logs to one Storage Account, and failover data to another. The trigger has to be activated by the customer.

For more information about the solution strategy, see [Azure Monitoring](/docs/send-data/collect-from-other-data-sources/azure-monitoring). 

![Azure-metrics.png](/img/send-data/Azure-metrics.png)

## Configure metric collection

This section has instructions for configuring collection of metrics from Azure Monitor.

### Step 1. Configure an HTTP source

In this step, you configure an HTTP source to receive logs from the Azure function.

1. Select a hosted collector where you want to configure the HTTP source. If desired, create a new hosted collector, as described on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Configure an HTTP source, as described on [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). 

### Step 2. Configure Azure resources using ARM template

In this step, you use a Sumo-provided Azure Resource Manager (ARM) template to create an Event Hub, an Azure function and two Storage Accounts. The Azure function is triggered by Event Hub. Two storage accounts are used to store log messages from the Azure function and failover data from Event Hub. 

1. Download the [azuredeploy_metrics.json](https://s3.amazonaws.com/appdev-cloudformation-templates/azuredeploy_metrics.json) ARM template.
1. Go to **Template deployment** in the Azure Portal.

    ![azure-template-deploy.png](/img/send-data/azure-template-deploy.png)

1. Click **Create**.
1. On the **Custom deployment** blade, click **Build your own template in the editor.**
1. Copy the contents of `azuredeploy_metrics.json` and paste it into the editor window, and click **Save**.

    ![azure-template-deploy.png](/img/send-data/azure-template-deploy2.png)

1. Now you are back on the **Custom deployment** blade.

   1. Create a new Resource Group (recommended) or select an existing one.
   1. Choose **Location**.
   1. For the **Sumo Endpoint URL** supply the URL for  HTTP source you defined in [Step 1](#step-1-configure-an-http-source). 
   1. Agree to the terms and conditions.
   1. Click **Purchase**.

    ![pipeline-custom-deployment.png](/img/send-data/azure-custom-deployment.png)

1. Verify the deployment was successful by looking at **Notifications** at top right corner of Azure Portal.

    ![go-to-resource-group.png](/img/send-data/go-to-resource-group.png)

1. (Optional) In the same window, you can click Go to resource group to verify all resources have been created successfully. You will see something like this:

    ![view-azure-resources.png](/img/send-data/view-azure-resources.png)

1. Go to Storage accounts and search for “sumometfail”. Click on `“sumometfail<random-string>”`.

    ![storage-accounts.png](/img/send-data/azure-metrics-storage-accounts.png)

1. Under **Blob Service,** click **Containers**, then **click + Container**, enter the **Name** "sumomet-failover", and select "Private" for the **Public Access Level**. Click **OK**.

    ![azure-containers.png](/img/send-data/azure-containers.png)

### Step 3. Export metrics for a particular resource to Event Hub

Follow these steps to export metrics for a resource to Event Hub.

1. From the left pane, select **ALL Services.**
1. Search for and select "Monitor".
1. In the **Monitor** pane, select **Diagnostic Settings** under **Settings**.
1. Select the resource for which you want to export metrics. If **diagnostics** is not enabled, click **Turn on Diagnostics Settings.**
1. Once diagnostics are enabled, click **Add a diagnostic setting**.
1. The **Diagnostic Settings** page appears.

    In the left pane:

      * Enter a name for the diagnostic setting.
      * Click the  **Stream to an event hub** checkbox.
      * Select **Configure event hub.** The right pane appears.

    In the right pane:

      * Choose a **Subscription**.
      * Select `SumoMetricsNamespace<UniqueSuffix>` as the event hub namespace.
      * Select **insights-metrics-pt1m** as the event hub name.
      * Select an event hub policy name. You can use the default policy **RootManageSharedAccessKey**.
      * Click **OK**.
      * Save the **Diagnostics Setting**.

### Troubleshooting metrics collection

If metrics are not flowing into Sumo Logic, follow the steps below to investigate the problem.

#### Verify Configurations

First, make sure that the resources you created above were successfully created.

1. Go to **Resource groups**, and select the resource group you created or selected in [Step 2. Configure Azure resources using ARM Template](#step-2-configure-azure-resources-using-arm-template). You should see the five resources you created: an App Service plan, an App Service, an Event Hubs Namespace, and two Storage accounts.

    ![azure-resources.png](/img/send-data/azure-resources.png)

1. From the left pane of Azure Portal, Click **AppServices**, search for “SumoAzureApp”. You should find the `“SumoAzureApp<random-string>”` Function App. Click it. 
1. On the** Function Apps** blade, click **Integrate**. Verify that the **Triggers** field value is “Azure Event Hubs” and the **Outputs** field value is “Azure Blob Storage”. 

    ![triggers.png](/img/send-data/azure-triggers.png)

1. In the same window, click the **function app settings** link. Check that the value of the **SumoAuditEndpoint** field matches the HTTP source URL.

    ![application-settings.png](/img/send-data/logs-function-app.png)

#### Verify Event Hub is receiving metrics

To verify that events are appearing in your event hub:

1. Navigate to the event hub in the Azure Portal.
1. Click the **Messages** link.
1. Message summary information appears below the chart. Check that the **Incoming Messages** count is greater than zero.

    ![event-hub-messages.png](/img/send-data/event-hub-messages.png)

 
