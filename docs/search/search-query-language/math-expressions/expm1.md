---
id: expm1
title: expm1 Function
sidebar_label: expm1
---

The **expm1** function returns value of x in exp(x)-1, compensating for the roundoff in exp(x).

## Syntax

```sql
expm1(<x>) as <field>
```

## Example

```sql
* | expm1(0.1) as v
```
