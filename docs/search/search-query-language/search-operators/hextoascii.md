---
id: hextoascii
title: hexToAscii Search Operator
sidebar_label: hexToAscii
description: Use the hexToAscii operator to convert hexadecimal strings to ASCII text format.
---

The `hexToAscii` operator converts a hexadecimal string to an ASCII string.

## Syntax

`hexToAscii(<hexadecimal_field>) as <field>`

`hexToAscii("<hexadecimal string>") as <field>`

## Examples

### Convert a literal hex string

The following returns `V` with a value of `hello world`:

```sumo
| hexToAscii("68656c6c6f20776f726c640a") as V
```

### Convert a hex-encoded field from log data

To decode a hex-encoded session token parsed from application logs:

```sumo
_sourceCategory=application/backend
| parse "session_hex=*," as session_hex
| hexToAscii(session_hex) as session_token
```
