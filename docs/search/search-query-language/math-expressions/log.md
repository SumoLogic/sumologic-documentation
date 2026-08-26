---
id: log
title: log Function
sidebar_label: log
---

The logarithm function returns the natural logarithm of x.

## Syntax

`log(<x>) as <field>`

## Examples

### Compute the natural log of a literal value

```sumo
* | log(2) as v
```

### Apply log scaling to a parsed numeric field

Use `log` to compress large-range values for aggregation:

```sumo
_sourceCategory=Apache/Access
| parse "bytes=*" as bytes
| num(bytes)
| log(bytes) as log_bytes
| avg(log_bytes) by _sourceHost
```
