---
id: baseencode
---

# base64Encode

The **base64Encode** operator takes an ASCII string and converts it to a
base64 string.

### Syntax

-   `base64Encode(\<strin\>") as\<fiel\>`
-   `base64Encode\<string_fiel\>) as\<fiel\>`

### Example

`| base64Encode("hello world") as base64`    Returns `base64` with a
value of `aGVsbG8gd29ybGQ=`.
