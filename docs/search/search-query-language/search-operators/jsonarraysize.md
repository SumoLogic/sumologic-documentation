---
id: jsonarraysize
title: jsonArraySize Search Operator
sidebar_label: jsonArraySize
---


Use the `jsonArraySize` operator to determine the size of a JSON array. Returns `-1` if null. 

## Syntax

```sql
jsonArraySize(field) > value
```

## Example

```sql
| where jsonArraySize(field) > 5
```