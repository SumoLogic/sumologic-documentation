---
id: parsehex
title: parseHex Operator
description: Use the parseHex operator to convert hexadecimal strings of 16 or fewer characters to numeric values. Accepts both plain hex format and 0x-prefixed format.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


The parseHex operator allows you to convert a hexadecimal string of 16 or fewer characters to a number.

## Syntax

* `parseHex(<hexadecimal_field>) as <field>`
* `parseHex("<hexadecimal_string>") as <field>`

## Rules

* `parseHex("ABCD")` and `parseHex("0xABCD")` are both valid formats.

## Examples

### Convert a literal hex string to a decimal value

The following query will convert a hexadecimal string to a decimal number.

```sumo
* | parseHex("12D230") as decimalValue
```

It provides the following results:

<img src={useBaseUrl('img/reuse/query-search/parsehex_operator.png')} alt="Parse hex" style={{border: '1px solid gray'}} width="700" />

### Convert a hex field parsed from logs using 0x prefix format

```sumo
_sourceCategory=application/backend
| parse "error_code=*" as hex_code
| parseHex(hex_code) as error_number
| count by error_number
| sort by _count desc
```
