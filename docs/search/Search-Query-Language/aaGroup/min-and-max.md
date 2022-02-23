---
id: min-and-max
---

# min and max

Use the min and max functions to find the smallest or largest value in a
set of values.

## max

Extracts the maximum value of the numerical field being evaluated within
the time range.

### Syntax

* `max\<numerical_fiel\>) [as\<fiel\>] [by\<fiel\>]`

### Rules

* Creates field named `_max`

### Example

`... | max(request_received) group by hour`

`... | max(request_received) as max_request_received, max(request_sent) as max_request_sent`

Note that when you calculate the maximum value of more than one
field, you must create an alias using the [as
operator](../Search-Operators/as-operator.md) to rename the max fields.
See this example:

`_sourceCategory="OS/Windows" | kv "HandleCount", "ThreadCount" | max(HandleCount) as maxHandleCount, max(ThreadCount) as maxThreadCount`

## min

Extracts the minimum value of the numerical field being evaluated within
the time range.

### Syntax

* `min(numerical_field) [as\<fiel\>] [by\<fiel\>]`

### Rules

* Creates field named `_min`

### Example

`... | min(request_received) group by hour`

`​... | min(request_received) as min_request_received, max(request_sent) as max_request_sent`

Note that when you calculate the minimum value of more than one
field, you must create an alias using the [as
operator](../Search-Operators/as-operator.md) to rename the min fields.
See this example:

`_sourceCategory="OS/Windows" | kv "HandleCount", "ThreadCount" | min(HandleCount) as minHandleCount, min(ThreadCount) as minThreadCount`
