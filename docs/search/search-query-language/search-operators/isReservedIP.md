---
id: isreservedip
---

# isReservedIP

The **isReservedIP** operator checks if an IPv4 address is reserved as defined by [RFC 5735](https://tools.ietf.org/html/rfc5735) and returns a boolean.

## Syntax

* `isReservedIP(\<IPv4_strin\>") as\<fiel\>`
* `isReservedIP\<IPv4_string_fiel\>) [as\<fiel\>]`

## Rules

* Returns `true` if the input is a valid reserved IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  
    
![isprivateip operator warning for dropped invalid ip addresses.png](/img/search/search-query-language/search-operators/isprivateip-dropped-warning.png)

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
