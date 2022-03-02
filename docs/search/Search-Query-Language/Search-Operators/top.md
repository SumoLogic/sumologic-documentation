---
id: top
---

# top

Use the **top** operator with the [sort](sort.md "sort") operator, to
reduce the number of sorted results returned.

We recommend you instead use the [topk](topk.md "topk") operator so you
can take advantage of its additional functionality.

### Syntax

* `top\<\>\<fiel\> [by\<group_by_operato\>]`

### Examples

#### List the Top 5 source categories with errors

Use the following query to list the top 5 source categories with errors,
and get their count.

`error | top 5 _sourcecategory`

which produces results like:

![](../../static/img/search-query-language/search-operators/top/../../../../Assets/Media_Repository/top_example1.png)

You can use the following query to get the same results, but make the
count explicit:

`error | top 5 _sourcecategory by count`

#### List the Top 10 source categories by message time

This query lists the top 10 source categories by message time, without
an explicit count.

`error | top 10 _sourcecategory by _messagetime`

which produces results like:

![](../../static/img/search-query-language/search-operators/top/../../../../Assets/Media_Repository/top_example3.png)
