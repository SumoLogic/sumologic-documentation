---
id: round
---

# round

The **round** function returns the closest integer to x.

### Syntax

* `round\<\> [\<\>]) as\<fiel\> ` 
    * X is the value to round
    * Y is the number of decimal places to round to.

### Examples

1.  `round(1.549, 2) as a  // a = 1.55`  
     
2.  You can calculate the message volume for a specific Source Host
    using this query. You can use the round function to get the closest
    integer value of the volume.  

`_index=sumologic_volume | where _sourceCategory="sourcehost_volume" | parse regex "(\<sourcehos\>\"[^\"]+\")\:\{\"sizeInBytes\"\:(\<byte\>\d+),\"count\"\:(\<coun\>\d+)\}" multi | bytes/1024/1024 as MB | sum(MB) as MB by sourcehost | round(MB)`
