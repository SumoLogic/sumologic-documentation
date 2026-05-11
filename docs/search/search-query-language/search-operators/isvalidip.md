---
id: isvalidip
title: isValidIP, isValidIPv4, isValidIPv6 Search Operators
sidebar_label: isValidIP, isValidIPv4, isValidIPv6
description: Use the `isValidIP`, `isValidIPv4`, and `isValidIPv6` operators to validate IP address formats. isValidIP checks for any valid IP address (IPv4 or IPv6), isValidIPv4 validates IPv4 format specifically, and isValidIPv6 validates IPv6 format. Returns true for valid addresses, false otherwise. Useful for filtering malformed IP data and validating address formats before further processing.
---

The `isValidIP` operator checks if the value is a valid IP address. The `isValidIPv4` and `isValidIPv6` operators check if the value is a valid IPv4 or IPv6 address respectively. 

## Syntax

### isValidIP

`isValidIP("<IP_string>") as <field>`

`isValidIP(<IP_string_field>) [as <field>]`

### isValidIPv4

`isValidIPv4("<IP_string>") as <field>`

`isValidIPv4(<IP_string_field>) [as <field>]`

### isValidIPv6

`isValidIPv6("<IP_string>") as <field>`

`isValidIPv6(<IP_string_field>) [as <field>]`

## Rules

* Returns `true` if the input is a valid IP address.

## Examples

```sumo
| isValidIP(dest_host)
```

The following returns `true`:

```sumo
| isValidIP("10.255.255.255") as isIP
```

The following returns `true`:

```sumo
| isValidIP("192.168.0.1") as isIP
```

The following returns `false`:

```sumo
| isValidIP("127.0.500.1") as isIP
```
