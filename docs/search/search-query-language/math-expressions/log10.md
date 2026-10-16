---
id: log10
title: log10 Function
sidebar_label: log10
---

The log10 function returns the base 10 logarithm of x.

## Syntax

`log10(<x>) as <field>`

## Examples

### Compute the base-10 log of a literal value

```sumo
* | log10(2) as v
```

### Apply base-10 log scaling to a response size field

Use `log10` to scale response sizes across orders of magnitude:

```sumo
_sourceCategory=Apache/Access
| parse "size=*" as size
| num(size)
| log10(size) as log_size
| timeslice 5m
| avg(log_size) by _timeslice
```
