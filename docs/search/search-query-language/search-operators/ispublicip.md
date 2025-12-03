---
id: ispublicip
title: isPublicIP Search Operator
sidebar_label: isPublicIP
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `isPublicIP` operator checks if an IPv4 address is public and returns a boolean.

## Syntax

```sql
isPublicIP("<IPv4_string>") as <field>
```

```sql
isPublicIP(<IPv4_string_field>) [as <field>]
```

## Rules

* Returns `true` if the input is a valid public IPv4 address.
* Invalid IPv4 addresses are dropped from the results.

The following warning is shown when results are dropped or an IPv6 address is detected:  

<img src={useBaseUrl('img/search/searchquerylanguage/search-operators/isprivateip-dropped-warning.png')} alt="isprivateip operator" style={{border: '1px solid gray'}} width="200" />

## Examples

```sql
| isPublicIP(dest_host)
```

The following returns `false`:
```sql
| isPublicIP("10.255.255.255") as isPublic
```
