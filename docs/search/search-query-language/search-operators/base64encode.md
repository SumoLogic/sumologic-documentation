---
id: base64encode
title: base64Encode Search Operator
sidebar_label: base64Encode
---
The `base64Encode` operator takes an ASCII or non-ASCII string and converts it to a base64 string.

## Syntax

```sql
base64Encode("<string>") as <field>
```

```sql
base64Encode(<string_field>) as <field>
```

## Example

The following example returns `base64` with a value of `aGVsbG8gd29ybGQ=`:

```sql
| base64Encode("hello world") as base64
```

The Base64Encode function supports encoding non-ASCII characters in addition to ASCII. The following example returns `base64` with a value of `5LiWIOOCiOOBhOOBoQ==`:

```sql
| base64encode("世 よいち") as base64
```

:::note
Make sure that the encoding format you use matches the decoding format.
:::
