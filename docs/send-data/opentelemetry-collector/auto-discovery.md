---
id: auto-discovery
title: Auto Discovery
sidebar_label: Auto Discovery
description: Learn how to enable Auto Discovery to detect services that are installed on the server on which the collector is running.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

With the Sumo Logic OpenTelemetry collector Auto Discovery feature, you can detect, monitor, and observe services that are installed on the server on which the collector is running. Once the services are discovered, you can evaluate the information on Sumo Logic platform and proceed with the onboarding of applications.

:::note
- Auto Discovery is supported only in Linux and macOS operating systems.
- Minimum collector version required to use this feature is `v0.89.0-sumo-0`.
:::

## View discovered services

Auto Discovery is enabled by default on all the OpenTelemetry collectors for the supported version. Below are the **Auto Discoverable Services** provided by Sumo Logic.
- Apache
- MySQL
- Nginx
- ElasticSearch
- PostgreSQL
- Redis
- Kafka
- Docker
- RabbitMQ

For the discovered services, you can set up data collection with guided onboarding steps. Below are the two different ways by which you can install and setup the OTEL Auto discovery apps.

### Collector installation completion page

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. On the OpenTelemetry Collection page, click **Add Collector**.
1. [Install the OpenTelemetry collector](/docs/send-data/opentelemetry-collector/install-collector/).
1. On the **Done** page, you can see services discovered which are updated in real time.<br/><img src={useBaseUrl('img/send-data/collector-installation-completion-page.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />
1. On clicking the application of interest in **Auto Discovered Service(s)** section, you will be taken to the **Configure App** section.
1. Fill up the details to complete the collection configuration and app installation.

### OpenTelemetry collector list page

You can also review the applications discovered per collector on the collector list page.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. Click on the collector from the list which will open the Collector Inspector view.  
1. Select **Discovered Service(s)** tab to review all the services discovered.<br/><img src={useBaseUrl('img/send-data/collector-list-page.png')} alt="collector-list-page" style={{border:'1px solid gray'}} width="800" />
1. On clicking the application of interest, you will be taken to the **Configure App** section.
1. Fill up the details to complete the collection configuration and app installation.



