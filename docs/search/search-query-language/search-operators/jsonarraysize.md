---
id: jsonarraysize
title: jsonArraySize Search Operator
sidebar_label: jsonArraySize
description: Use the jsonArraySize operator to determine the number of elements in a JSON array field. Returns the count of items in the array.
---


Use the `jsonArraySize` operator to determine the size of a JSON array field.  

## Syntax

`jsonArraySize(field)`

## Rules

Returns `-1` if null.

## Examples

### Get the size of a JSON array field and a literal array

```sumo
_sourceCategory=stream .ett 
| fields tiers 
| jsonArraySize("[1, 2, 3]") as js 
| jsonArraySize(tiers) as tierCount
```

### Filter events by array length

```sumo
_sourceCategory=application/events
| parse "recipients=*]" as recipients
| jsonArraySize(recipients) as recipient_count
| where recipient_count > 5
```
