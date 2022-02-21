---
id: topk
---

# topk

The topk operator allows you to select the top values from fields and
group them by fields. The topk operator can replace the top operator and
adds the ability to choose the top of top.

If you are using top, we recommend switching to topk for all your
queries so that you can take advantage of the additional functionality
of topk.

### Syntax

-   `topk\<\>,\<top_fiel\>[,\<top_field_\>, ...]) [by\<group_by_field\>]`

`#` is an integer equal to or greater than 1.

##### Response Field

-   `_rank` - the order number of the result.

### Examples

###### Look at the top five source hosts generating the most errors and the number of errors for given timeslices

`error`  
`| timeslice 1m`  
`| count by _timeslice, _sourceHost`  
`| topk(5, _count)`

![basic error ranking
results.png](../../static/img/Search-Query-Language/Search-Operators/topk/basic%20error%20ranking%20results.png)

###### Look at the top 2 results for a given category

`error`  
`| timeslice 1m`  
`| count by _timeslice, _sourceHost`  
`| topk(2,_count) by _sourceHost`

Let's figure out what is the maximum error count for each sourceHost for
the given time range slightly changing our query. We’ll add a by clause
to the given operator and provide sourceHost as an argument. This tells
the system that we want to look for the top “x” counts for each source
Host.

![basic top 2
rank.png](../../static/img/Search-Query-Language/Search-Operators/topk/basic%20top%202%20rank.png)

Find the top two source host, source category pairs.

`error | timeslice 1m | count by _timeslice, _sourceHost, _sourceCategory | topk(2,_count) by _sourceHost, _sourceCategory`

We can specify more than one argument to group by. In the query above,
we are looking for the top 2 results for each source host, source
Category pairs.

![basic top with group
by.png](../../static/img/Search-Query-Language/Search-Operators/topk/basic%20top%20with%20group%20by.png)  
  
  
  
  
  
  
 
