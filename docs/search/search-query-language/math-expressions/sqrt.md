---
id: sqrt
title: sqrt Function
sidebar_label: sqrt
---

The square root function returns the square root value of x.

## Syntax

`sqrt(<x>) as <field>`

## Examples

### Compute the square root of a literal value

```sumo
* | sqrt(4) as v
```

### Compute the square root of a parsed numeric field

Use `sqrt` to convert a variance value back to standard deviation scale:

```sumo
_sourceCategory=application/metrics
| parse "variance=*" as variance
| num(variance)
| sqrt(variance) as std_dev
```
