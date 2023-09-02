---
id: ansible
title: Install OpenTelemetry Collector on Ansible
sidebar_label: Ansible
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ansible-logo.png')} alt="ansible" width="40"/>

This documentation will guide you through the installation process using the software configuration management tool Ansible, enabling you to deploy and manage Sumo Logic collectors at scale.

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Ansible**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/ansible.png')} alt="ansible.png" />
4. Select/create installation token and customize your tags.
5. Follow auto generated steps to install the collector using Ansible.
   :::note
   These steps are only supported on Linux Operating System.
   :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
