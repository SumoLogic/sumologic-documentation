---
id: abs
title: abs Function
sidebar_label: abs
---

The absolute function calculates the absolute value of x.

## Syntax

`abs(<x>) as <field>`

## Rules

The function cannot be nested.

## Examples

### Get the absolute value of a literal number

```sumo
* | abs(-1.5) as v
```

### Calculate the absolute difference between two fields

Use `abs` with parsed numeric fields to compute the absolute difference:

```sumo
_sourceCategory=application/backend
| parse "latency=* baseline=*" as latency, baseline
| abs(latency - baseline) as deviation
```
