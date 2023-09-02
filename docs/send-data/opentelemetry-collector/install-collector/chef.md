---
id: chef
title: Chef
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation will guide you through the installation process using the software configuration management tool Chef, enabling you to deploy and manage Sumo Logic collectors at scale.

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
2. On the OpenTelemetry Collection page, click **Add Collector**.
3. On the left panel, select **Chef**.
4. Select/create installation token and customize your tags.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/chef.png')} alt="chef.png" />

5. Follow auto generated steps to install the collector using Chef.
   :::note
   These steps are only supported on Linux Operating System.
   :::
6. Once steps are completed, click **Done** to review collector on OpenTelemetry Collection page.
