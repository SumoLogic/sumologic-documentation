---
id: base64decode
title: base64Decode Search Operator
sidebar_label: base64Decode
---

The `base64Decode` operator takes a base64 string and converts it to an ASCII string. Input must be a valid base64 string. Invalid input is returned unaltered.

## Syntax

```sql
base64Decode("<string>"[, "<encoding>"]) as <field>
```

```sql
base64Decode(<string_field>[, "<encoding>"]) as <field>
```

### Supported encodings

* US-ASCII
* UTF-8 (default)
* UTF-16
* UTF-16BE
* UTF-16LE
* UTF-32
* UTF-32BE
* UTF-32LE

## Examples

The following example returns `V` with a value of `http://codec.apache.org/commmons`:

`| base64Decode("aHR0cDovL2NvZGVjLmFwYWNoZS5vcmcvY29tbW1vbnM=") as V`

The following example returns `V` with a value of `This is a test string`:

`| base64Decode("VABoAGkAcwAgAGkAcwAgAGEAIAB0AGUAcwB0ACAAcwB0AHIAaQBuAGcA", "UTF-16LE") as V`
