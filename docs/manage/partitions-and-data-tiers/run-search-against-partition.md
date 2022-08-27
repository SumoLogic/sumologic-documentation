---
id: run-search-against-partition
title: Run a Search Against a Partition
---


Running a search against the data in a Partition is almost exactly the same as running any other query. The difference you'll notice is the speed at which results are returned, especially if you're searching over a large amount of data.

In a Log Search you can specify the `_index` metadata field with the name of the Partition in the [keyword search expression](../../search/get-started-with-search/build-search/keyword-search-expressions.md) (also called the scope) of your query. For example, if your Partition is named "Compliant" you would add `_index=Compliant` to the scope of your query. The next section shows you how the Partitions page can do this automatically for you.

## Run a search against a partition from the Partitions page

1. Go to **Manage Data \> Logs \> Partitions**.
1. Do one of the following:

    * Click the **Search Icon** to the right of the Partition name. This launches a search on just the data indexed in the partition.    

    ![partitions-page-search-icon.png](/img/partitions-and-data-tiers/partitions-page-search-icon.png)

    * Select a Partition from the table and click the **Search Icon** to the right of the routing expression. This launches a search that runs the expression against the partition, as well as any other logs that match the query. This means that you can capture search results on all data, not just the data indexed in the partition.    

    ![edit-partition-pane-search-icon.png](/img/partitions-and-data-tiers/edit-partition-pane-search-icon.png)

## Searching partitions in Data Tiers

If you have the [Data Tiers](data-tiers.md) feature, see [Searching Data Tiers](searching-data-tiers.md) for information about how to search partitions by Data Tier.

## Why did I get a message to run a search against a partition?

After starting a search that would return faster results if the query were run against a partition, you’ll see a message appear under the search bar that includes a link to the recommended, optimized search.

When the link opens the optimized search in a new search tab, run the search by pressing the Enter/Return key or by clicking **Start** on the Search page. By default, the optimized search uses the same time range as your original search.
