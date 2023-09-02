---
id: puppet
title: Install OpenTelemetry Collector on Puppet
sidebar_label: Puppet
description: Learn how to install the Sumo Logic OpenTelemetry Collector on Puppet.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/puppet.png')} alt="puppet icon" width="30"/>

This documentation will guide you through the installation process using the software configuration management tool Puppet, enabling you to deploy and manage Sumo Logic collectors at scale.

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Puppet**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/puppet.png')} alt="puppet.png" />
4. Select/create installation token and customize your tags.
5. Follow auto generated steps to install the collector using Puppet.
  :::note
  These steps are only supported on Linux Operating System.
  :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
