---
id: filter-live-tail
title: Filter Live Tail
description: To find specific information, you can filter by keyword.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To find specific logs, you can filter with keywords. You may use keywords after providing at least one metadata field to the Live Tail query and click Run or press Enter.

The search is rerun with the new keyword filter and added to incoming messages only. The screen clears, and new results automatically scroll.

You can start a Live Tail session using the following metadata categories:

* `_sourceCategory`
* `_sourceHost`
* `_sourceName`
* `_source`
* `_collector`

In filters, you can use quotes to find a specific phrase, but otherwise the AND operator is implicit, meaning you do not need to type AND when entering multiple terms. Note that keyword searches are case-insensitive.

Wildcards are supported in keywords and at the beginning and end of metadata fields (`_sourceHost=\*abc` or `_sourceHost=abc\*`). Search operators are not supported in filters.

## Filter Live Tail

1. After your Source Category, Source Host, Source Name, Source, or Collector, enter the keyword you’d like to filter for. For example, enter "OS Process Data". Use quotes to find a specific phrase, otherwise the AND operator is implicit.
1. Click **Run** or press **Enter**.

The **Run** button changes to **Running**, the new query runs, and the screen automatically scrolls with the results.

:::note
Ensure that you use appropriate keywords for effective Live Tail usage, and ensure your query does not exceed the limitations described in [About Live Tail](/docs/search/live-tail/about-live-tail/#limitations).
:::

## Examples

In this example, we have started a Live Tail on the Source Host nite-index-1.

```sql
_sourceHost=nite-index-1
```

<img src={useBaseUrl('img/search/livetail/Filter-Live-Tail/livetail-start-nite-index-1.png')} alt="Source hose nite-index-1 example" style={{border: '1px solid gray'}} width="800" />

Next, we added a Source Category filter to the query. Here we're looking for the Source Category called "search".

```sql
_sourceHost=nite-index-1 _sourceCategory=search
```

<img src={useBaseUrl('img/search/livetail/Filter-Live-Tail/add-source-category.png')} alt="Add source category" style={{border: '1px solid gray'}} width="800" />

In this example, we will add some more keywords to the query, and a wildcard to a keyword.

```sql
_sourceHost=nite-index-1 (error or fail* or exception)
```

<img src={useBaseUrl('img/search/livetail/Filter-Live-Tail/add-keywords.png')} alt="Add keywords" style={{border: '1px solid gray'}} width="800" />

In a different example, we're looking for a different Source Host, Source Category, and filtered for log messages that do not include the keyword "info". This way, we know we're getting all of our warnings and errors.

```sql
_sourceHost=nite-cqsplitter-1 _sourceCategory=cqsplitter !info
```

<img src={useBaseUrl('img/search/livetail/Filter-Live-Tail/check-warnings.png')} alt="Check warnings" style={{border: '1px solid gray'}} width="800" />
