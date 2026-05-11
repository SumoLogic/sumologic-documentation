---
id: hextoascii
title: hexToAscii Search Operator
sidebar_label: hexToAscii
description: Use the `hexToAscii` operator to convert hexadecimal strings to ASCII text format. Decodes hex-encoded data extracted from logs, network packets, or binary formats into readable text. Useful for analyzing hex-encoded payloads, debug output, or data that was encoded for transmission or storage in hexadecimal format.
---

The `hexToAscii` operator converts a hexadecimal string to an ASCII string.

## Syntax

`hexToAscii(<hexadecimal_field>) as <field>`

`hexToAscii("<hexadecimal string>") as <field>`

## Example

The following returns `V` with a value of `hello world`:

```sumo
| hexToAscii("68656c6c6f20776f726c640a") as V
```
