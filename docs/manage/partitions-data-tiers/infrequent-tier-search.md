---
id: infrequent-tier-search
title: Infrequent Tier Support for Scheduled Searches (Beta)
description: Learn how to schedule and run searches against the Infrequent data tier.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

Previously, scheduled searches were only supported in Sumo Logic’s Continuous data tier. Now, you can also schedule searches that run against the Infrequent Tier.

## Sample Queries

This means you can now include data from the Infrequent Tier in the scope of the scheduled search.

* For example, you can use `_dataTier=Infrequent` in your query scope:
  ```sql
  _dataTier=Infrequent _sourceCategory=appA "error"
  ```
* Or, you can select data in the Infrequent tier by specifying the Partition that contains it, like this:
  ```sql
  _index=some_infrequent_index
  ```
  or
  ```sql
  _index=some_infrequent_index OR _index=some_continuous_index
  ```

:::note
If you choose **Save to Index** as the Alert Type for a Scheduled Search, and any of the data that is scanned for the search is in the Infrequent tier, the index will be saved to the Infrequent Tier.
:::


## Infrequent Scheduled Search Dashboard

Sumo Logic provides a dashboard you can use to monitor the Infrequent tier space consumed by saved Scheduled Searches.

<img src={useBaseUrl('img/partitions-data-tiers/infrequent-scheduled-search.png')} alt="dashboard" />

The dashboard presents the following information for the currently selected time range:

* **Total Data Scanned**. The volume of data scanned for scheduled searches.
* **Average Data Scanned**. The average volume of data scanned per scheduled search.
* **Total Scheduled Searches Run**. The number of scheduled searches run.
* **Overall User Count**. The number of users that ran scheduled searches.
* **Data Scanned by Users**. The volume of data scanned by each user that ran scheduled searches.
* **Data Scanned by Query**. The volume of data scanned for each scheduled search that was run.
* **Trend - Data Scanned by Users**. A timeline that shows when each user ran a scheduled search and the volume of data scanned for each.
* **Trend - Data Scanned by Query**. A timeline that shows when each scheduled search was run, and the volume of data scanned for each.
* **Scheduled Search by Status**. A breakdown by status—Finished, Cancelled, or Failed—of the schedule searches that were run.
* **Top 10 Failed Scheduled Search Queries**. The queries are ordered by most recent failed date.

You can download the JSON for the dashboard [here](https://sumologic-app-data.s3.amazonaws.com/Infrequent_Scheduled_Search_Dashboard.json). For information about importing dashboards and other content, see [Import Content in the Library](/docs/get-started/library#import-content).

## Limitations  

* You can’t save a scheduled search that returns data from the Infrequent tier to a partition in the Continuous tier.
* A scheduled search against the Infrequent tier cannot have a run frequency of “real time”.
