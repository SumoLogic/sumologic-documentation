---
id: parsehex
title: parseHex
---

import useBaseUrl from '@docusaurus/useBaseUrl';


The parseHex operator allows you to convert a hexadecimal string of 16 or fewer characters to a number.

## Syntax

* `parseHex(<hexadecimal_field>) as <field>`
* `parseHex("<hexadecimal_string>") as <field>`

## Rules

* `parseHex("ABCD")` and `parseHex("0xABCD")` are both valid formats.

## Example

Parse a hexadecimal value to a decimal value.

The following query will convert a hexadecimal string to a decimal number.

```sql
* | parseHex("12D230") as decimalValue
```

It provides the following results:

<img src={useBaseUrl('img/reuse/query-search/parsehex_operator.png')} alt="Parse hex" style={{border: '1px solid gray'}} width="700" />
