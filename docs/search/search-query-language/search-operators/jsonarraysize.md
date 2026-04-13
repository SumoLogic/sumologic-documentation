---
id: jsonarraysize
title: jsonArraySize Search Operator
sidebar_label: jsonArraySize
---


Use the `jsonArraySize` operator to determine the size of a JSON array field.  

## Syntax

```sumo
jsonArraySize(field)
```

## Example

```sumo
_sourceCategory=stream .ett 
| fields tiers 
| jsonArraySize("[1, 2, 3]") as js 
| jsonArraySize(tiers) as tierCount
```

## Rules

Returns `-1` if null. 