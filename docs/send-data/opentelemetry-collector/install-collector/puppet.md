---
id: puppet
title: Install OpenTelemetry Collector on Puppet
sidebar_label: Puppet
description: Learn how to install the Sumo Logic OpenTelemetry Collector on Puppet.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/puppet.png')} alt="puppet icon" width="30"/>

This documentation will guide you through the installation process using the software configuration management tool Puppet, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. 
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Puppet**.<br/><img src={useBaseUrl('img/send-data/puppet-new.png')} style={{border: '1px solid gray'}} alt="puppet.png" />
4. Select/create installation token and customize your tags.
5. (Optional) Select the **Remotely Manage Collector** checkbox to enable remote management of your collectors.
6. Under **Download module in to your repository**, copy, paste, and run the command on the terminal to download the zip package.
7. Select the operating system on which you want to install the collector using Puppet:
    - **Linux**
      <img src={useBaseUrl('img/send-data/Puppet-linux.png')} style={{border: '1px solid gray'}} alt="puppet.png" />
    - **Windows**
      <img src={useBaseUrl('img/send-data/Puppet-windows.png')} style={{border: '1px solid gray'}} alt="puppet.png" />
8. Follow the auto-generated steps to install the collector using Puppet.
9. Once steps are completed, click **Done** to review the collector on the OpenTelemetry Collection page.
10. On the next screen, you will see a list of available Source Templates. Select the required Source Template and proceed with the data configuration.

If you choose to close this Source template creation screen, you can navigate back. [**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Source Template**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. 
