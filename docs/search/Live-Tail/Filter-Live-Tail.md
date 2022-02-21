---
id: filter-live-tail
---

# Filter Live Tail

To find specific logs, you can filter with keywords. You may use
keywords after providing at least one metadata field to the Live Tail
query and click Run or press Enter.

The search is rerun with the new keyword filter and added to incoming
messages only. The screen clears, and new results automatically scroll.

You can start a Live Tail session using the following metadata
categories:

-   \_sourceCategory
-   \_sourceHost
-   \_sourceName
-   \_source
-   \_collector

In filters, you can use quotes to find a specific phrase, but otherwise
the AND operator is implicit, meaning you do not need to type AND when
entering multiple terms. Note that keyword searches are
case-insensitive.

Wildcards are supported in keywords and at the beginning and end
of metadata fields (\_sourceHost=\*abc or \_sourceHost=abc\*). Search
operators are not supported in filters.

## Filter Live Tail

1.  After your Source Category, Source Host, Source Name, Source, or
    Collector, enter the keyword you’d like to filter for. For example,
    enter "OS Process Data".  Use quotes to find a specific phrase,
    otherwise the AND operator is implicit.
2.  Click **Run** or press **Enter**.

The **Run** button changes to **Running**, the new query runs, and the
screen automatically scrolls with the results.

## Examples

In this example, we've started a Live Tail on the Source Host
nite-index-1.

`_sourceHost=nite-index-1`

![](../static/img/Live-Tail/Filter-Live-Tail/Screen%20Shot%202017-06-12%20at%201.17.52%20PM.png)

Next, we added a Source Category filter to the query. Here we're looking
for the Source Category called "search".

`_sourceHost=nite-index-1 _sourceCategory=search`

![](../static/img/Live-Tail/Filter-Live-Tail/Screen%20Shot%202017-06-12%20at%201.18.56%20PM.png)

In this example, we'll add some more keywords to the query, and a
wildcard to a keyword.

`_sourceHost=nite-index-1 (error or fail* or exception)`

![](../static/img/Live-Tail/Filter-Live-Tail/Screen%20Shot%202017-06-12%20at%201.19.43%20PM.png)

In a different example, we're looking for a different Source Host,
Source Category, and filtered for log messages that don't include the
keyword "info". This way, we know we're getting all of our warnings and
errors.

`_sourceHost=nite-cqsplitter-1 _sourceCategory=cqsplitter !info`

![](../static/img/Live-Tail/Filter-Live-Tail/Screen%20Shot%202017-06-12%20at%201.21.00%20PM.png)
