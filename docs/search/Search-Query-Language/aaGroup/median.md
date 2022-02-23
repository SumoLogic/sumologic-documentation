---
id: median
---

# median

In order to calculate the median value for a particular field, you can
utilize the [percentile (pct)
operator](percentile-(pct).md "percentile (pct)") with a percentile
argument of 50.

### Syntax

* `pct\<fiel\> [, 50]) [as\<fiel\>] [by\<fiel\>]`

### Rules

* Creates a field with the naming convention: `\<fiel\>_pct_50`.

### Examples

For example:

`* | parse "data=*" as data   | pct(data, 50) as median`

To calculate the median value of a field called "Len:\*" as seconds, and
then take the median, use the following query:

`| parse "Len: *" as seconds | pct(seconds,50) as median`

Which would return results similar to:

![Median.png](../../static/img/Search-Query-Language/aaGroup/median/Median.png)
