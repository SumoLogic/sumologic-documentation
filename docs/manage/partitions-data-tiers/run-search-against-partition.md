---
id: run-search-against-partition
title: Run a Search Against a Partition
sidebar_label: Search a Partition
description: Learn how to run a search against data in a partition.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Running a search against the data in a partition is almost exactly the same as running any other query. The difference you'll notice is the speed at which results are returned, especially if you're searching over a large amount of data.

## Search a partition from a log search tab

To search a particular partition, specify the `_index` metadata field with the name of the partition in the keyword search expression (also called the scope) of your query. For example, if your partition is named _Compliant_, you would add this to the scope of your query: `_index=Compliant`.

:::note
You can only use `_index` in the keyword search expression that scopes the search, in other words, before the first pipe (`|`) in the search.
:::

## Search the default partition
Data that you ingest that is not directed to a partition will go to the default partition, named `sumologic_default`. The default partition is the first partition listed on the **Partitions** page. To run a search against the default partition, include this in the scope of your search. `_index=sumologic_default`.

## Run a search against a partition from the Partitions page

1. Go to **Manage Data > Logs > Partitions**.
1. Do one of the following:
    * Click the **Search Icon** to the right of the partition name. This launches a search on just the data indexed in the partition.<br/><img src={useBaseUrl('img/partitions-data-tiers/partitions-page-search-icon.png')} alt="icon" />    
    * Select a partition from the table and click the **Search Icon** to the right of the routing expression. This launches a search that runs the expression against the partition, as well as any other logs that match the query. This means that you can capture search results on all data, not just the data indexed in the partition.<br/><img src={useBaseUrl('img/partitions-data-tiers/edit-partition-pane-search-icon.png')} alt="icon" />    

## Searching partitions in Data Tiers

If you have the [Data Tiers](data-tiers.md) feature, see [Searching Data Tiers](searching-data-tiers.md) for information about how to search partitions by Data Tier.

## Why did I get a message to run a search against a partition?

After starting a search that would return faster results if the query were run against a partition, you’ll see a message appear under the search bar that includes a link to the recommended, optimized search.

When the link opens the optimized search in a new search tab, run the search by pressing the Enter/Return key or by clicking **Start** on the Search page. By default, the optimized search uses the same time range as your original search.
