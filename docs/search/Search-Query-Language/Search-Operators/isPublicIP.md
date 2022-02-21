---
id: ispublicip
---

# isPublicIP

The **isPublicIP** operator checks if an IPv4 address is public and
returns a boolean.

### Syntax

-   `isPublicIP(\<IPv4_strin\>") as\<fiel\>`
-   `isPublicIP\<IPv4_string_fiel\>) [as\<fiel\>]`

### Rules

-   Returns `true` if the input is a valid public IPv4 address.
-   Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6
address is detected:  
    
![isprivateip operator warning for dropped invalid ip
addresses.png](../../static/img/Search-Query-Language/Search-Operators/isPublicIP/../isPrivateIP/isprivateip%20dropped%20warning.png)

### Examples

`| isPublicIP(dest_host)`

`| isPublicIP("10.255.255.255") as isPublic`        Returns `false`
