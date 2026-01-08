---
id: chef
title: Install OpenTelemetry Collector on Chef
sidebar_label: Chef
description: Learn how to install the Sumo Logic OpenTelemetry Collector on Chef.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/chef-logo.png')} alt="chef" width="40"/>

This documentation will guide you through the installation process using the software configuration management tool Chef, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**.
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Chef**.<br/><img src={useBaseUrl('img/send-data/chef-new.png')} style={{border: '1px solid gray'}} alt="chef.png" />
4. Select/create installation token and customize your tags.
5. (Optional) Select the **Remotely Manage Collector** checkbox to enable remote management of your collectors.
6. Under **Download cookbook in to your repository**, copy, paste, and run the command on the terminal to download the zip package.
7. Select the operating system on which you want to install the collector using Chef:
    - **Linux**
      <img src={useBaseUrl('img/send-data/Chef-linux.png')} style={{border: '1px solid gray'}} alt="puppet.png" />
    - **Windows**
      <img src={useBaseUrl('img/send-data/Chef-windows.png')} style={{border: '1px solid gray'}} alt="puppet.png" />
8. Follow auto generated steps to install the collector using Chef.
9. Once steps are completed, click **Done** to review the collector on the OpenTelemetry Collection page.
10. On the next screen, you will see a list of available Source Templates. Select the required Source Template and proceed with the data configuration.

If you choose to close this Source template creation screen, you can navigate back. [**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Source Template**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. 
