---
id: dectohex
---

# decToHex

The **decToHex** operator converts a long value of 16 or fewer digits to
a hexadecimal string using Two's Complement for negative values.

Hexadecimal string is always returned in upper-case.

### Syntax

-   `decToHex\<long_fiel\>) as\<fiel\>`
-   `decToHex(\<long_strin\>") as\<fiel\>`

### Examples

`| decToHex("4919") as V`    Returns `V` with a value of `1337`

`... | count by _collector | decToHex(_count) as v`

`... | decToHex("70") as d`    Returns `d` with a value of `46`
