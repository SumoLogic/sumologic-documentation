---
id: chef
title: Install OpenTelemetry Collector on Chef
sidebar_label: Chef
description: Learn how to install the Sumo Logic OpenTelemetry Collector on Chef.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/chef-logo.png')} alt="chef" width="40"/>

This documentation will guide you through the installation process using the software configuration management tool Chef, enabling you to deploy and manage Sumo Logic collectors at scale.

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. Kanso-->
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Chef**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/chef.png')} alt="chef.png" />
4. Select/create installation token and customize your tags.
5. Follow auto generated steps to install the collector using Chef.
   :::note
   These steps are only supported on Linux Operating System.
   :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
