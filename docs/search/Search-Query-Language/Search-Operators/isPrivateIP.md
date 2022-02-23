---
id: isprivateip
---

# isPrivateIP

The **isPrivateIP** operator checks if an IPv4 address is private and
returns a boolean.

### Syntax

* `isPrivateIP(\<IPv4_strin\>") as\<fiel\>`
* `isPrivateIP\<IPv4_string_fiel\>) [as\<fiel\>]`

### Rules

* Returns `true` if the input is a valid private IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6
address is detected:  
    
![isprivateip operator warning for dropped invalid ip
addresses.png](../../static/img/Search-Query-Language/Search-Operators/isPrivateIP/isprivateip-dropped-warning.png)

### Examples

`| isPrivateIP(dest_host)`

`| isPrivateIP("10.255.255.255") as isPrivate`        Returns `true`

`| isPrivateIP("192.168.0.1") as isPrivate`        Returns `true`

`| isPrivateIP("127.0.0.1") as isPrivate`        Returns `false`
