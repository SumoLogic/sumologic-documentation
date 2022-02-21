---
id: parsehex
---

# parseHex

The parseHex operator allows you to convert a hexadecimal string of 16
or fewer characters to a number.

### Syntax

-   `parseHex\<hexadecimal_fiel\>) as\<fiel\>`
-   `parseHex(\<hexadecimal_strin\>") as\<fiel\>`

### Rules

-   `parseHex("ABCD")` and `parseHex("0xABCD")` are both valid formats.

### Example

Parse a hexadecimal value to a decimal value.

The following query will convert a hexadecimal string to a decimal
number.

`* | parseHex("12D230") as decimalValue`

It provides the following results:

![](../../static/img/Search-Query-Language/01-Parse-Operators/parseHex/../../../../Assets/Media_Repo_for_Search/parsehex_operator.png)
