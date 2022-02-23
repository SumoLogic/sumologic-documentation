---
id: isvalidip
---

# isValidIP, isValidIPv4, isValidIPv6

The **isValidIP** operator checks if the value is a valid IP address.
The **isValidIPv4** and **isValidIPv6** operators check if the value is
a valid IPv4 or IPv6 address respectively. 

### Syntax

###### isValidIP

* `isValidIP(\<IP_strin\>") as\<fiel\>`
* `isValidIP\<IP_string_fiel\>) [as\<fiel\>]`

###### isValidIPv4

* `isValidIPv4(\<IP_strin\>") as\<fiel\>`
* `isValidIPv4\<IP_string_fiel\>) [as\<fiel\>]`

###### isValidIPv6

* `isValidIPv6(\<IP_strin\>") as\<fiel\>`
* `isValidIPv6\<IP_string_fiel\>) [as\<fiel\>]`

### Rules

* Returns `true` if the input is a valid IP address.

### Examples

`| isValidIP(dest_host)`

`| isValidIP("10.255.255.255") as isIP`        Returns `true`

`| isValidIP("192.168.0.1") as isIP`        Returns `true`

`| isValidIP("127.0.500.1") as isIP`        Returns `false`
