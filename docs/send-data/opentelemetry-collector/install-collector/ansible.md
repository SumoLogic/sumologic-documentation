---
id: ansible
title: Install OpenTelemetry Collector on Ansible
sidebar_label: Ansible
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ansible-logo.png')} alt="ansible" width="40"/>

This documentation will guide you through the installation process using the software configuration management tool Ansible, enabling you to deploy and manage Sumo Logic collectors at scale.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Ansible**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/ansible.png')} alt="ansible.png" />
4. Select/create installation token and customize your tags.
5. Follow the auto-generated steps to install the collector using Ansible.
   :::note
   These steps are only supported on Linux Operating System.
   :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
