---
id: isvalidip
title: isValidIP, isValidIPv4, isValidIPv6 Search Operators
sidebar_label: isValidIP, isValidIPv4, isValidIPv6
---

The `isValidIP` operator checks if the value is a valid IP address. The isValidIPv4 and isValidIPv6 operators check if the value is a valid IPv4 or IPv6 address respectively. 

## Syntax

### isValidIP

```sql
isValidIP("<IP_string>") as <field>
```

```sql
isValidIP(<IP_string_field>) [as <field>]
```

### isValidIPv4

```sql
isValidIPv4("<IP_string>") as <field>
```

```sql
isValidIPv4(<IP_string_field>) [as <field>]
```

### isValidIPv6

```sql
isValidIPv6("<IP_string>") as <field>
```

```sql
isValidIPv6(<IP_string_field>) [as <field>]
```

## Rules

* Returns `true` if the input is a valid IP address.

## Examples

```sql
| isValidIP(dest_host)
```

The following returns `true`:

```sql
| isValidIP("10.255.255.255") as isIP
```

The following returns `true`:

```sql
| isValidIP("192.168.0.1") as isIP
```

The following returns `false`:

```sql
| isValidIP("127.0.500.1") as isIP
```
