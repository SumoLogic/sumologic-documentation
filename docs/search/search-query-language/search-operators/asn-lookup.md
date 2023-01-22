---
id: asn-lookup
title: ASN Lookup Search Operator
sidebar_label: ASN lookup
---

Sumo Logic can lookup an Autonomous System Number (ASN) and organization name by an IP address. Any IP addresses that don't have an ASN will return null values.

## Syntax

The ASN Lookup operator uses [lookup-classic](/docs/search/search-query-language/search-operators/lookup-classic) with a specific path, `asn://default`, to provide the ASN and associated organization.

```sql
lookup\<field\> from asn://default on ip\<ip_address\>
```

|  Lookup fields |  Description |
|:--|:--|
| `*` | Use a wildcard (`*`) character as a shortcut to return both fields. |
| `asn` | Autonomous System Number |
| `organization` | Autonomous System Organization Name or ID in some cases. |

## Example

The following query references a data stream with IPv4 addresses, parses
those IPv4 addresses, and then uses ASN Lookup to retrieve their
autonomous system information. 

```sql
_sourceCategory=stream "remote_ip="
| parse regex "(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup organization, asn from asn://default on ip = ip
```
