---
title: Azure Monitor Metrics Collection (Collection)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - collection
  - azure-metrics
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-service/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

We're happy to announce an update of the Azure metric collection framework. Here are some of the key features that this update offers:

- Aligns all the components to the latest version of Azure Functions runtime and libraries.
- Replaces the soon-to-be deprecated classic Application insights resource with new workspace-based Application insights.
- Provides necessary security updates.

[Refer here](https://github.com/SumoLogic/sumologic-azure-function/releases/tag/v3.0.0) for details on upgrade instructions and changelog. Also, for more information on metrics collection from Azure Monitor, see our [documentation](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/).
