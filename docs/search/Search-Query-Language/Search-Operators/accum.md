---
id: accum
---

# accum

The **accum** operator calculates the cumulative sum of a field. It can
be used to find a count by a specific time interval and can be used to
find a total running count across all intervals.

### Syntax

* `accum\<fiel\> [as\<fiel\>] [by\<field\>,\<field\>, ...]`

### Rules

* An alias for accum is optional. When an alias is not
    provided, \_accum is the default alias.
* Specified fields must contain numeric values.
* If a row contains non-numeric values, that row will be skipped.
* To add a query that includes an accum operator to a Dashboard, you
    must add a group by function before the accum operator.

### Examples

**Requests by running total**. With the accum operator, we can find the
number of requests by a user as a running total. Running a query similar
to:

`_sourceCategory=IIS/Access (Wyatt OR Luke) | parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_username | timeslice by 1m | count as requests by _timeslice,cs_username | sort by _timeslice asc,cs_username | accum requests as running_total`

produces results of a running total of all requests, similar to:

**![Accum](../../static/img/search-query-language/search-operators/accum/Accum.png)**

**Running total by user name.** Another option is to find a running
total for each user's requests. Running a query similar to:

`_sourceCategory=IIS/Access (Wyatt OR Luke) | parse "* * * * * * * * " as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_username | timeslice by 1m | count as requests by _timeslice,cs_username | sort by _timeslice asc,cs_username | accum requests as running_total by cs_username`

produces results of a running total for each user's requests, similar
to:

![Accum by
user](../../static/img/search-query-language/search-operators/accum/AccumByUser.png)
