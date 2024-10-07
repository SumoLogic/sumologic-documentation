---
id: infrequent-tier-dashboard-support
title: Infrequent Tier Support for Dashboards
description: Learn how to set up dashboard panels against the Infrequent data tier.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

Previously, dashboards were only supported in our Continuous data tier. With this update, you can set up dashboard panels to include data from the Infrequent Tier.

## Sample queries

To use data from the Infrequent Tier in your dashboard panels, you can use the following sample queries.

* Use `_dataTier=Infrequent` in your query scope. For example:
  ```sql
  _dataTier=Infrequent _sourceCategory=appA "error"
  ```
* Or select data in the Infrequent Tier by specifying the Partition that contains it. For example:
  ```sql
  _index=some_infrequent_index
  ```
  Or, run the following query:
  ```sql
  _index=some_infrequent_index OR _index=some_continuous_index
  ```

## Infrequent Dashboard Usage

Sumo Logic provides a dashboard you can use to monitor the Infrequent Tier consumption by saved Dashboards.

<img src={useBaseUrl('img/integrations/manage/partitions-data-tiers/infrequent-dashboard.png')} alt="dashboard" />

The dashboard presents the following information for the currently selected time range:
* **Avg Credits Consumed/Day**. The daily average number of credits consumed over the last 30 days.
* **Total Credits Consumed**. The total credits consumed in the last 30 days.
* **Top 50 Expensive Queries**. The top 50 expensive queries set up on Dashboards to run against the Infrequent Tier.

You can download the JSON for the dashboard [here](https://sumologic-app-data.s3.amazonaws.com/Infrequent_Dashboard.json). For information about importing dashboards and other content see [Import Content in the Library](/docs/get-started/library#import-content).

## Limitations

* Auto refresh is not available for dashboard panels running on the Infrequent Tier.
