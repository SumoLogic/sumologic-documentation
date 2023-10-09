---
id: infrequent-tier-slo-support
title: Infrequent Tier Support for SLOs
description: Learn how to configure SLOs against the Infrequent data tier.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

Previously, SLOs were only supported in Sumo Logic's Continuous data tier. This support enabled you to configure SLOs on Infrequent tier logs to increase the monitoring coverage for reliability management.

## Sample Queries

While defining SLOs for the Infrequent tier logs, you can use the following sample queries.

* Use `_dataTier=Infrequent` in your query scope to only search for data in the Infrequent tier. For example:
  ```sql
  _dataTier=Infrequent _sourceCategory=APIService | parse "Status: *" as status_code | where status_code >= 500
  ```
* Or, use `_index` parameter to specify the Partition that contains the data you want to access. For example:
  ```sql
  _index=some_infrequent_index
  ```
  Or, you can also search across multiple indices by using the `OR` operator. For example:
  ```sql
  _index=some_infrequent_index OR _index=some_continuous_index
  ```

## Infrequent Dashboard Usage

Sumo Logic provides a dashboard to monitor the Infrequent tier consumption by SLOs.

<img src={useBaseUrl('img/partitions-data-tiers/infrequent-support-slo.png')} alt="dashboard" />

The dashboard presents the following information for the currently selected time range:
* **Avg Credits Consumed/Day**. The daily average number of credits consumed over the last 30 days.
* **Total Credits Consumed**. The total credits consumed in the last 30 days.
* **Top 50 Expensive Queries**. The top 50 expensive queries set up on Dashboards to run against the Infrequent tier.

You can download the JSON for the dashboard [here](https://sumologic-app-data.s3.amazonaws.com/Infrequent_SLO.json). For information about importing dashboards and other content, see [Import Content in the Library](/docs/get-started/library#import-content).

## Limitations

* Auto refresh is not available for dashboard panels running on the Infrequent tier.
