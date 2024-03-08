---
id: vmware-tanzu-application-service
title: VMware Tanzu Application Service
sidebar_label: VMware Tanzu Application Service
description: This documentation describes the Sumo Logic Nozzle for VMware Tanzu tile.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/containers-orchestration/vmware-tanzu.png')} alt="VMware Tanzu Application Service" width="40" />

The Sumo Logic Nozzle for [VMware Tanzu Firehose](https://docs.vmware.com/en/Tile-Developer-Guide/3.0/tile-dev-guide/nozzle.html) allows operations teams and app owners to monitor and troubleshoot the VMware Tanzu platform and apps in real time, without having to install a Sumo Logic agent in their Cloud Foundry environment.

The nozzle filters out messages per your tile configuration and securely sends those logs and metrics to an HTTP API in the Sumo Logic SaaS service. The tile allows you to configure batching intervals, toggle verbose logging mode, and add metadata to your logs and metrics.

The only configuration you need to do on the Sumo Logic platform is to enable the HTTP API (an HTTP Source) and record the URL. After you deploy the tile, you are able to query the logs and metrics and monitor the log stream using Live Tail.

The Sumo Logic nozzle is written in Go and is based on the [firehose-to-syslog](https://github.com/cloudfoundry-community/firehose-to-syslog) nozzle.

Key features of Sumo Logic Nozzle for VMware Tanzu include:

* View dashboards to monitor the overall health and security of your VMware Tanzu resources.
* Drill down from alerts to see key performance metrics and audit logs for VMware Tanzu and your custom apps.
* Store VMware Tanzu audit details in a fully secure SOC 2, HIPAA, and PCI-compliant environment.

## Prerequisites

Before you install the Sumo Logic Nozzle for VMware Tanzu tile, you'll need Administrative access to your VMware Tanzu deployment.

:::tip
To learn about compatible Tanzu Application Service versions, refer to the [latest release](https://github.com/SumoLogic/sumologic-cloudfoundry-nozzle/releases).
:::

## Setup

This section has instructions for installing and configuring Sumo Logic Nozzle for VMware Tanzu.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive VMware Tanzu events:

1. In the Sumo Logic portal, create a new Hosted Collector or use an existing one. Then add an HTTP Logs and Metrics Source.
1. Configure **Source Category** in the HTTP Source - for example, `vmware-tanzu/logs` - for the VMware Tanzu integration.
1. Copy and save the endpoint URL of the source.

### Vendor configuration

1. Download the product file from [Pivotal Network](https://network.pivotal.io/products/sumologic-nozzle).            
1. Navigate to the Ops Manager Installation Dashboard and click **Import a Product** to upload the product file.                     
1. Under the **Import a Product** button, click **+** next to the version number of Sumo Logic Nozzle for VMware Tanzu. This adds the tile to your staging area.
1. Click the newly added **Sumo Logic Nozzle** for VMware Tanzu tile to access the configuration settings.<br/><img src={useBaseUrl('img/integrations/containers-orchestration/SumoTile.png')} alt="Sumo tile" style={{border: '1px solid gray'}} width="800" />
1. **Assign AZs and Networks**.
   1. Choose placement.
   1. Click **Save**.
1. Configure **Sumo Logic Settings**.
   1. **Sumo Logic Endpoint**. Click **Add**, then enter the endpoint that you configured when specifying VMware Tanzu as an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/) for Sumo Logic. 
      :::note
      You can set up multiple endpoints with different settings.
      :::
	1. **Sumo Logic Post Minimum Delay**. Enter a time in milliseconds for the post minimum delay. The default is 2000ms.
	1. (Optional) **Sumo Logic Category**. Specify a source category to call data with that specific metadata tag. For example, `MyOrg/MyCategory`.
 	1. (Optional) **Sumo Logic Name**. Specify a source name locally to distinguish it from the configured HTTP Source configuration and prevent metadata overwrites if you have more than one use for that source (e.g., `MyPivotalApp`).
   1. (Optional) **Sumo Logic Host**. If you have a local file source, you can specify a hostname. If you are using a Remote Host, do not use this field.
	1. (Optional) **Custom Metadata**. Add custom metadata to the JSON. For example, `key1:value1,key2:value2`.
	1. (Optional) **Include Only Matching Filter**. Include only designated events.
	1. (Optional) **Exclude Always Filter**. Exclude specific events that are not pertinent to your search, such as `cf\_app\_name:sumo-logic-nozzle-0.1.0`.
	1. Click **Save**.<br/><img src={useBaseUrl('img/integrations/containers-orchestration/SumologicSettings.png')} alt="Sumo Logic settings" style={{border: '1px solid gray'}} width="800" />
1. Configure **Cloud Foundry Settings**.
   1. **Cloud Foundry API Endpoint**. Enter your [API endpoint](https://docs.pivotal.io/pivotalcf/2-1/opsguide/api-endpoint.html). 
   1. **Cloud Foundry User**. Specify your Cloud Foundry username.
   1. **Cloud Foundry Password**. Enter Cloud Foundry password.
   1. **Log Events Batch Size**. Choose how many messages need to occur before they are sent to Sumo Logic.
   1. **Comma-separated list of events you would like (Default is "LogMessage")**. List any additional events (no spaces between events) that you want to be included, such as Error, Container Metric, HttpStart, HttpStop, HttpStartStop, LogMessage, ValueMetric, or CounterEvent.  
   1. **Skip SSL Validation**. This option should only be checked if you are on a known and trusted dev environment and have expired certificates. Do not enable this option for a production system.
   1. **Verbose in 'LogMessage' event**. Enable this option if you need more detail than the default logging information, `timestamp`, `cf_app_guid`, `Msg`. This is what a log message looks like when you turn on verbose: <br/><img src={useBaseUrl('img/integrations/containers-orchestration/SumoLogicVerbose.png')} alt="Sumo Logic verbose" style={{border: '1px solid gray'}} width="600" />
   1. **Nozzle Polling Period**. Set how frequently the Nozzle polls the Cloud Foundry Nozzle for data. Sumo Logic recommends 5000ms.
   1. Click **Save**.<br/><img src={useBaseUrl('img/integrations/containers-orchestration/SumoNozzlePCFSettings.png')} alt="Sumo Logic Nozzle PCF settings" style={{border: '1px solid gray'}} width="800" />
1. **Errands**. Leave settings as default.
1. **Resource Config**. For both deploy-all and delete-all, use VM Type setting the Automatic Micro.
1. **Stemcell**. Ensure the proper stemcell is available.
1. Return to the Ops Manager Installation Dashboard.
1. Click **Apply Changes**. The installation can take a few minutes to complete. You will see a message confirming your changes have been applied.

#### Using Sumo Logic Nozzle for VMware Tanzu

This section describes how to use Sumo Logic Nozzle for VMware Tanzu. After installation, the Sumo Logic Nozzle is available in the Apps Manager.

1. From the **system** drop-down menu, select **sumo-logic-nozzle-org**.
1. Under Apps, select the name of the build you want. For example, **sumo-logic-nozzle-0.1.0-build3**. <br/><img src={useBaseUrl('img/integrations/containers-orchestration/selectnozzle.png')} alt="Select Nozzle" style={{border: '1px solid gray'}} width="800" />
1. Push the **Start** button to begin running the nozzle.<br/> <img src={useBaseUrl('img/integrations/containers-orchestration/selectplay.png')} alt="Select play" style={{border: '1px solid gray'}} width="400" />
1. Cloud Foundry will provision the VMs and begin running the nozzle service.
1. Verify Sumo Logic Nozzle for VMware Tanzu tile is installed and started running the nozzle service by [running searches](/docs/search/search-cheat-sheets/general-search-examples/). If this is your first time using Sumo Logic, see [Getting Started with Search](/docs/search/get-started-with-search/).

## Dashboards and alerts

Once the nozzle is set up, you can create [dashboards](/docs/dashboards/) and [alerts](/docs/alerts/) from the data.

## Troubleshooting

To troubleshoot the Sumo Logic Nozzle integration with VMware Tanzu:
1. Log in to **Apps Manager**.
1. Navigate to **Home** > **ORG** `<sumo-logic-nozzle-org>` > **SPACE** `<sumo-logic-nozzle-space>`.
1. Click on **Name**. <br/><img src={useBaseUrl('img/integrations/containers-orchestration/Troubleshooting.png')} alt="Troubleshooting" style={{border: '1px solid gray'}} width="800" />
1. The app page appears. Click **Logs**. <br/><img src={useBaseUrl('img/integrations/containers-orchestration/TroubleshootingApp.png')} alt="Troubleshooting app" style={{border: '1px solid gray'}} width="800" />
1. On the **Logs** page it will show you logs related to the Sumo Logic Nozzle integration. <br/><img src={useBaseUrl('img/integrations/containers-orchestration/TroubleshootingLogs.png')} alt="Troubleshooting logs" style={{border: '1px solid gray'}} width="800" />

## More information

- For detailed version information, refer to the [changelog](https://github.com/SumoLogic/sumologic-cloudfoundry-nozzle/blob/master/CHANGELOG.md) file.
- For support, contact [VMware Tanzu Feedback](mailto:pivotal-cf-feedback@pivotal.io) list or [Sumo Logic Support](https://support.sumologic.com).
