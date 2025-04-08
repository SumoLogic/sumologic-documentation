---
id: puppet
title: Install OpenTelemetry Collector on Puppet
sidebar_label: Puppet
description: Learn how to install the Sumo Logic OpenTelemetry Collector on Puppet.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/puppet.png')} alt="puppet icon" width="30"/>

This documentation will guide you through the installation process using the software configuration management tool Puppet, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Puppet**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/puppet.png')} alt="puppet.png" />
4. Select/create installation token and customize your tags.
5. Follow the auto-generated steps to install the collector using Puppet.
  :::note
  These steps are only supported on Linux Operating System.
  :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
