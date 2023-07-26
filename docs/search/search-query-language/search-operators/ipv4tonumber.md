---
id: ipv4tonumber
title: ipv4ToNumber Search Operator
sidebar_label: ipv4ToNumber
---

The `ipv4ToNumber` operator allows you to convert an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format. This decimal format makes it easier to compare one IP address to another, rather than relying on IP masking.

:::tip
The [CIDR operator](cidr.md) allows you to leverage CIDR (Classless Inter-Domain Routing) notation to narrow the analysis of IPv4 networks to specific subnets.
:::

## Syntax

```sql
ipv4ToNumber(<ip_addr>) [as <field>]
```

## Rules

* The input to the function must be a valid IPv4 address string.

## Examples

### Parse IP addresses and convert to number

The following query parses IP addresses, and converts them to numbers, then uses the fields operator to remove all fields except "ip" and "num".

```sql
_sourceCategory=service remote_ip
| parse "[remote_ip=*]" as ip
| ipv4ToNumber(ip) as num
| fields ip, num
```

would produce results like:

![ipv4](/img/reuse/query-search/ipv4ToNumber.png)

### Detect the IP range for a single user

The following query looks at the number of IP addresses, and the IP range, by user. This could be used to determine if someone has hacked a user account.

```sql
_sourceCategory=service remote_ip
| parse "auth=User:*:" as user
| parse "[remote_ip=*]" as remote_ip
| ipv4ToNumber(remote_ip) as remote_ip_dec
| max(remote_ip_dec) as max_ip, min(remote_ip_dec) as min_ip, count_distinct(remote_ip_dec) as count_ips by user
| max_ip - min_ip as ip_range
| where ip_range > 0
| fields user, count_ips, ip_range
```

would produce results like:

![ipv4ToNumber](/img/search/searchquerylanguage/search-operators/ipv4ToNumber.png)
