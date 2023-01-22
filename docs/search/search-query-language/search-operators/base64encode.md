---
id: base64encode
title: base64Encode Search Operator
sidebar_label: base64Encode
---

The `base64Encode` operator takes an ASCII string and converts it to a base64 string.

## Syntax

```sql
base64Encode("<string>") as <field>
```

```sql
base64Encode(<string_field>) as <field>
```

## Example

```sql
| base64Encode("hello world") as base64
```

Returns `base64` with a value of `aGVsbG8gd29ybGQ=`.
