---
id: hextodec
---

# hexToDec

The **hexToDec** operator converts a hexadecimal string of 16 or fewer
characters to a long data type using Two's Complement for negative
values.

### Syntax

-   `hexToDec(\<hexadecimal strin\>") as\<fiel\>`
-   `hexToDec\<hexadecimal_fiel\>) as\<fiel\>`

### Examples

`| hexToDec("0000000000001337") as V `    Returns `V` with a value of
`4919`

`... | count by _collector | decToHex(_count) as v | hexToDec(v) as h`

`... | count by _collector | where _count = hexToDec("7AF")`
