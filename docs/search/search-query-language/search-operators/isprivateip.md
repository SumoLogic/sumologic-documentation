---
id: isprivateip
title: isPrivateIP Search Operator
sidebar_label: isPrivateIP
---

The `isPrivateIP` operator checks if an IPv4 address is private and returns a boolean.

## Syntax

```sql
isPrivateIP("<IPv4_string>") as <field>
```

```sql
isPrivateIP(<IPv4_string_field>) [as <field>]
```

## Rules

* Returns `true` if the input is a valid private IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6
address is detected:  
    
![isprivateip operator warning for dropped invalid ip addresses.png](/img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png)

## Examples

`| isPrivateIP(dest_host)`

The following returns `true`:

```sql
| isPrivateIP("10.255.255.255") as isPrivate
```

The following returns `true`:

```sql
| isPrivateIP("192.168.0.1") as isPrivate
```

The following returns `false`:

```sql
| isPrivateIP("127.0.0.1") as isPrivate
```
