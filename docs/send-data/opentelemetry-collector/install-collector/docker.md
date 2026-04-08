---
id: docker
title: Install OpenTelemetry Collector on Docker
sidebar_label: Docker
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/containers-orchestration/docker.png')} alt="docker" width="100"/>

This documentation will guide you through the installation process using the software configuration management tool Docker, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. 
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Docker**.<br/><img src={useBaseUrl('img/send-data/docker-otel-collection.png')} style={{border: '1px solid gray'}} alt="Docker" />
4. Select/create installation token from the dropdown and customize your tags.
5. (Optional) Select the **Locally Manage Collector** checkbox to enable local management of your collector.
6. Under **Run the Sumo Logic Distribution for OpenTelemetry Collector in container**, copy, paste, and run the command on the terminal to download the zip package.
7. Follow the auto-generated steps to install the collector using Docker.
   :::note
   These steps are supported on both Linux and Windows operating systems.
   :::
8. Once steps are completed, click **Done** to review the collector on the OpenTelemetry Collection page.
9. On the next screen, you will see a list of available Source Templates. Select the required Source Template and proceed with the data configuration.

If you choose to close this Source template creation screen, you can navigate back. [**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Source Template**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
