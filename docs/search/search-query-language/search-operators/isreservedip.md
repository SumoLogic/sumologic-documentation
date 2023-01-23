---
id: isreservedip
title: isReservedIP Search Operator
sidebar_label: isReservedIP
---

The `isReservedIP` operator checks if an IPv4 address is reserved as defined by <a href="https://tools.ietf.org/html/rfc5735">RFC 5735</a> and returns a boolean.

## Syntax

```sql
isReservedIP("<IPv4_string>") as <field>
```
```sql
isReservedIP(<IPv4_string_field>) [as <field>]
```

## Rules

* Returns `true` if the input is a valid reserved IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  
    
![isprivateip operator warning for dropped invalid ip addresses.png](/img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png)

## Examples

```sql
| isReservedIP(dest_host)
```

The following returns `true`:

```sql
| isReservedIP("127.0.0.0") as isReserved
```

The following returns `true`:

```sql
| isReservedIP("169.254.0.0") as isReserved
```

The following returns `true`:

```sql
| isReservedIP("192.0.0.0") as isReserved
```
