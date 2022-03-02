---
id: sort
---

# sort

The **sort** operator orders aggregated search results. The default sort
order is descending.

Then you can use the **top** or **limit** operators to reduce the number
of sorted results returned.

Order is also synonymous with sort. You can use them interchangeably in
your queries.

### Syntax

* `sort by\<fiel\> (displays results as descending, by default)`
* `sort by \<fiel\> (displays results as ascending)`
* `sort by\<fiel\> asc (displays results as ascending)`
* `sort by\<field\>,\<field\>`
* `top\<\>\<fiel\>​​​​​​​ by\<group_by_operato\>`

### Rules

* Default sort order is descending.
* Sorting is case sensitive with lower-case followed by upper-case.
* To reverse the sort order to ascending, type a plus sign (+) before
    the field name you are sorting by. Alternatively, you can
    type **asc** after the field name.
* To numerically sort, first [cast the field to a
    number](Manually-Casting-String-Data-to-a-Number.md "Manually Casting String Data to a Number").
    (Otherwise, the sort will be ordered as a text field.)

### Examples

* `status AND down | extract "user=(\<use\>.*?):" | count (*) group by user | sort by _count`
* `... | count user | top 2 user by _count`
* `... | count user | sort by _count asc`

#### Top 10 pages by page hits

This example counts page hits by sourceHost, sorts them by page hits,
and limits the results to the top 10.

`_sourceCategory=Labs/Apache/Access | count as page_hits by _sourceHost | sort by page_hits | limit 10`

which provides results like:

![](../../static/img/search-query-language/search-operators/sort/../../../../Assets/Media_Repository/sort_operator_example.png)

For more information, see [Top](top.md "top")
operator or [Limit](limit.md "limit") operator.
