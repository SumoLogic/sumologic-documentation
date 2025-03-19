---
id: round
title: round Function
sidebar_label: round
---


The **round** function returns the closest integer to x.

## Syntax

```sql
round(<x> [,<y>]) as <field>
```  

X is the value to round. Y is the number of decimal places to round to.

## Examples

```sql
* | round(1.549, 2) as a
```

You can calculate the message volume for a specific Source Host using this query. You can use the round function to get the closest integer value of the volume.  

```sql
_index=sumologic_volume
| where _sourceCategory="sourcehost_volume"
| parse regex "\"(?<sourcehost>[^\"]*)\"\:(?<data>\{[^\}]*\})" multi
| json field=data "sizeInBytes", "count" as bytes, count
| bytes/1024/1024 as MB
| sum(MB) as MB by sourcehost
| round(MB)
```
