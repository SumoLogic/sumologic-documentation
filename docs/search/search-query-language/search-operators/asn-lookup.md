---
id: asn-lookup
title: ASN Lookup Search Operator
sidebar_label: ASN lookup
---

Sumo Logic can lookup an Autonomous System Number (ASN) and organization name by an IP address. Any IP addresses that do not have an ASN will return null values.

## Syntax

The ASN Lookup operator uses [lookup-classic](/docs/search/search-query-language/search-operators/lookup-classic) with a specific path, `asn://default`, to provide the ASN and associated organization.

```sql
lookup\<field\> from asn://default on ip\<ip_address\>
```

|  Lookup fields |  Description |
|:--|:--|
| `*` | Use a wildcard (`*`) character as a shortcut to return both fields. |
| `asn` | Autonomous System Number |
| `organization` |  The name of the organization that owns the ASN or ID in some cases. This organization (Carrier) is responsible for the routing of traffic for network blocks. |
| `registering_organization` | The organization responsible for the actions and content associated with a given block of IP addresses. Registering Organizations include many types of entities, including corporate, government, or educational entities, and ISPs managing the allocation and use of network blocks. |
| `carrier_organization` |  The name of the organization that owns the ASN or ID in some cases. This organization (Carrier) is responsible for the routing of traffic for network blocks. |

:::note
The `organization` and `carrier_organization` lookup fields will have the same value because the `carrier` field is used to populate both the `organization` and `carrier_organization` values.
:::

## Example

The following query references a data stream with IPv4 addresses, parses those IPv4 addresses, and then uses ASN Lookup to retrieve their autonomous system information. 

```sql
_dataTier=all _sourceCategory=stream "remote_ip="
| parse regex "(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup organization, registering_organization, asn from asn://default on ip = ip
```
