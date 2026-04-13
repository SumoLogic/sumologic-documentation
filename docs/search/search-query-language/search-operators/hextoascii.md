---
id: hextoascii
title: hexToAscii Search Operator
sidebar_label: hexToAscii
---

The `hexToAscii` operator converts a hexadecimal string to an ASCII string.

## Syntax

```sumo
hexToAscii(<hexadecimal_field>) as <field>
```

```sumo
hexToAscii("<hexadecimal string>") as <field>
```

## Example

The following returns `V` with a value of `hello world`:

```sumo
| hexToAscii("68656c6c6f20776f726c640a") as V
```
