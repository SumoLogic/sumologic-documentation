---
id: hash
title: hash Search Operator
sidebar_label: hash
---

The `hash` operator uses a cryptographic hash algorithm to obscure data into a random string value. The operator supports MD5, SHA1, SHA2, and MurmurHash3 algorithms. The default is MD5 if no algorithm is specified.

This is helpful when working with sensitive data such as email addresses, usernames, credit cards, and social security numbers. Each unique value will have a unique hash code allowing you to maintain anonymity.

## Syntax 

As a Search operator, hash processes the provided field against the specified algorithm to change the current values into random unique values.

```sql
hash(<field>[<algorithm]) [as <field>]
```

Where:

* `<algorithm>` - Define the algorithm type as either `md5`, `sha1`, `sha2_256`, or `murmur3_128`. The default is `md5`.

## Examples

### Email address

Hash a field of email addresses.

```sql
_sourceCategory=myLogs
| parse "email=*" as email_address
| hash("email_address", "md5") as hashed_email
```

### Username

Find a hashed username with the help of the [where](where.md) and [matches](matches.md) operators.

```sql
_sourceCategory=myLogs
| parse "username=*" as username
| where username matches hash("username", "md5")
```

### Source IP

Get the source IP addresses by user hashes.

```sql
_sourceCategory=myLogs
| parse "username=*" as username
| parse "src_ip=*" as src_ip
| hash(username, "sha_256") as user_hash
| count by src_ip, user_hash
```

### Unique identifier

Create a unique identifier for each log message by concatenating the built-in metadata fields (image below) `_messagetime` and `_messageid`.

```sql
| hash(concat(_messagetime, _messageid), "sha1") as guid
```

![built-in metadata fields](/img/search/get-started-search/build-search/dynamic-parsing/copy-button-messages-table.png)
