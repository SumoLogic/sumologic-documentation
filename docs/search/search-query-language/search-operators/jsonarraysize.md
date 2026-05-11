---
id: jsonarraysize
title: jsonArraySize Search Operator
sidebar_label: jsonArraySize
description: Use the `jsonArraySize` operator to determine the number of elements in a JSON array field. Returns the count of items in the array. Useful for analyzing array lengths in structured logs, identifying oversized arrays, or filtering based on the number of elements in JSON array fields.
---


Use the `jsonArraySize` operator to determine the size of a JSON array field.  

## Syntax

`jsonArraySize(field)`

## Example

```sumo
_sourceCategory=stream .ett 
| fields tiers 
| jsonArraySize("[1, 2, 3]") as js 
| jsonArraySize(tiers) as tierCount
```

## Rules

Returns `-1` if null. 