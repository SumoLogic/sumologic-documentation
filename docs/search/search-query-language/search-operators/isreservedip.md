---
id: isreservedip
title: isReservedIP Search Operator
sidebar_label: isReservedIP
description: Use the `isReservedIP` operator to check if an IPv4 address is reserved as defined by RFC 5735 and return a boolean result. Returns true for valid reserved IPv4 addresses including loopback, link-local, multicast, and other special-use addresses. Invalid IPv4 addresses are dropped from results. Useful for identifying special-purpose IP addresses in network analysis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `isReservedIP` operator checks if an IPv4 address is reserved as defined by [RFC 5735](https://tools.ietf.org/html/rfc5735) and returns a boolean.

## Syntax

`isReservedIP("<IPv4_string>") as <field>`

`isReservedIP(<IPv4_string_field>) [as <field>]`

## Rules

* Returns `true` if the input is a valid reserved IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  

<img src={useBaseUrl('img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png')} alt="isprivateip operator warning for dropped invalid ip addresses" style={{border: '1px solid gray'}} width="200" />

## Examples

```sumo
| isReservedIP(dest_host)
```

The following returns `true`:

```sumo
| isReservedIP("127.0.0.0") as isReserved
```

The following returns `true`:

```sumo
| isReservedIP("169.254.0.0") as isReserved
```

The following returns `true`:

```sumo
| isReservedIP("192.0.0.0") as isReserved
```
