---
id: pct-sampling
---

# pct sampling

The percent sampling function, pct_sampling, finds the percentile of a
given field. Multiple pct_sampling functions can be included in one
query.

The pct_sampling function will return an approximate result for searches
that produce large volumes of data.

To find the percentile, the function uses a sample of 1,000 messages.
This may cause results to be slightly different for different queries
when you may expect the results to be the same. 

### Syntax

* `| pct_sampling\<fiel\> [, percentile]) [as\<fiel\>] [by\<fiel\>]`
* `| pct_sampling\<fiel\> [, percentile, percentile, percentile]) [as\<fiel\>] [by\<fiel\>]`

### Rules

* Creates a field with the naming convention:
    `\<fiel\>_pct\<percentil\>`.
* Separate multiple percent arguments in one query with commas.

### Examples

`* | parse "data=*" as data  | pct_sampling(data, 95)`

Sample log message:

    Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.

Example based on sample log message:

`file*  | parse "filesize=*" as filesize  | pct_sampling(filesize, 75, 95) by _sourceHost`

Running this query creates fields
named `_filesize_pct_75` and `_filesize_pct_95`.

A query can also take more multiple percent arguments, such as:

`| pct_sampling(q1_delay, 10, 20, 30, 40, 50, 60, 70, 80, 90)`

Running this query creates fields
named `_q1_delay_pct_10, _q1_delay_pct_20, _q1_delay_pct_30,` ...
to`_q1_delay_pct_90`.
