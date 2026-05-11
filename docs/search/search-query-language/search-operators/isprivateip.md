---
id: isprivateip
title: isPrivateIP Search Operator
sidebar_label: isPrivateIP
description: Use the `isPrivateIP` operator to check if an IPv4 address is a private address and return a boolean result. Returns true for valid private IPv4 addresses in ranges like 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Invalid IPv4 addresses are dropped from results. Useful for filtering internal network traffic or identifying private network sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `isPrivateIP` operator checks if an IPv4 address is private and returns a boolean.

## Syntax

`isPrivateIP("<IPv4_string>") as <field>`

`isPrivateIP(<IPv4_string_field>) [as <field>]`

## Rules

* Returns `true` if the input is a valid private IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6
address is detected:  

<img src={useBaseUrl('img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png')} alt="isprivateip operator warning for dropped invalid ip addresses" style={{border: '1px solid gray'}} width="200" />

## Examples

`| isPrivateIP(dest_host)`

The following returns `true`:

```sumo
| isPrivateIP("10.255.255.255") as isPrivate
```

The following returns `true`:

```sumo
| isPrivateIP("192.168.0.1") as isPrivate
```

The following returns `false`:

```sumo
| isPrivateIP("127.0.0.1") as isPrivate
```
