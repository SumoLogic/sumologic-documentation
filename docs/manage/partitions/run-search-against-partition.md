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

## Filter and search a partition

You'll need to filter the partition, depending on the type of partition using the **Add a filter** section provided above the table. Accordingly, you can view the overall allocated storage details with the percentage of storage used for the selected partition type. You can select between two type of partitions:

- **Custom Partitions**. Type of partitions which are created by the user.
- **System Partitions**. Type of partitions which are created from Sumo Logic to optimize the performance of the query.

<img src={useBaseUrl('img/manage/partitions-data-tiers/filter-and-search-a-partition.png')} alt="filter-and-search-a-partition" style={{border:'1px solid gray'}} width="800"/>

## Search the default partition
Data that you ingest that is not directed to a partition will go to the default partition, named `sumologic_default`. The default partition is the first partition listed on the **Partitions** page. To run a search against the default partition, include this in the scope of your search:
```
_index=sumologic_default
```

## Index aliasing

With index aliasing, you can use an alias to point to one or more system indexes such as [`sumologic_default`](/docs/manage/partitions/run-search-against-partition/#search-the-default-partition) in the source expression of your search query. Both the operator part and results of your query will consist of actual index names.

In addition to `sumologic_default`, we have several other Sumo Logic-defined system indexes. As a shortcut, rather than prefacing `sumologic_` when referencing system indexes in a search, you can alias these indexes by typing an underscore at the beginning. For example, `sumologic_default` and `_default` will return the same results. 

:::warning Leading Underscore Reserved for System Index Alias in User-Created Indexes
When creating your own indexes (user-created, non-system indexes), you cannot lead with an underscore (`_`). This is reserved only for system indexes.
:::

If your search query scans both your own indexes and Sumo Logic indexes starting with an underscore (`_`), you'll only see your own indexes in the results. System indexes would be ignored, and you'd see a warning stating: `System indexes with alias names have been excluded from the results of the query`. 

### Using index aliases

Here are some examples where index aliasing is used in wildcard queries.

`_index=*volume*` This query will reference all types of indexes (system indexes as well as user-created).

`_index=_vol*`. This query will reference indexes such as `sumologic_volume`.

`_index=_*`. This will show all Sumo Logic-defined system indexes would show in search results.

## Run a search against a partition from the Partitions page

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. Do one of the following:
    * Click the **Search Icon** to the right of the partition name. This launches a search on just the data indexed in the partition.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/partitions-page-search-icon.png')} style={{border:'1px solid gray'}} alt="icon" />    
    * Select a partition from the table and click the **Search Icon** to the right of the routing expression. This launches a search that runs the expression against the partition, as well as any other logs that match the query. This means that you can capture search results on all data, not just the data indexed in the partition.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/edit-partition-pane-search-icon.png')} style={{border:'1px solid gray'}} alt="edit-partition-pane-search-icon" width="300"/>    

## Searching partitions

- If you have the [Data Tiers](/docs/manage/partitions/data-tiers/) feature, see [Searching Data Tiers](/docs/manage/partitions/data-tiers/searching-data-tiers/) for information about how to search partitions by Data Tier.

- If you have the Flex feature, see [Searching Flex](/docs/manage/partitions/flex/) for information about how to search partitions.

## Why did I get a message to run a search against a partition?

After starting a search that would return faster results if the query were run against a partition, you’ll see a message appear under the search bar that includes a link to the recommended, optimized search.

When the link opens the optimized search in a new search tab, run the search by pressing the Enter/Return key or by clicking **Start** on the Search page. By default, the optimized search uses the same time range as your original search.
