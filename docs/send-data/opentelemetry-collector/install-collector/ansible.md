---
id: ansible
title: Install OpenTelemetry Collector on Ansible
sidebar_label: Ansible
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ansible-logo.png')} alt="ansible" width="40"/>

This documentation will guide you through the installation process using the software configuration management tool Ansible, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. 
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Ansible**.<br/><img src={useBaseUrl('img/send-data/ansible-new.png')} style={{border: '1px solid gray'}} alt="ansible.png" />
4. Select/create installation token and customize your tags.
5. (Optional) Select the **Remotely Manage Collector** checkbox to enable remote management of your collector.
6. Under **Download module in to your repository**, copy, paste, and run the command on the terminal to download the zip package.
7. Follow the auto-generated steps to install the collector using Ansible.
   :::note
   These steps are supported on both Linux and Windows operating systems.
   :::
8. Once steps are completed, click **Done** to review the collector on the OpenTelemetry Collection page.
9. On the next screen, you will see a list of available Source Templates. Select the required Source Template and proceed with the data configuration.

If you choose to close this Source template creation screen, you can navigate back. [**New UI**](/docs/get-started/sumo-logic-ui/). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Source Template**.   <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
