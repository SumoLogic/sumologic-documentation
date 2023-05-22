---
id: jsonarraycontains
title: jsonArrayContains Search Operator
sidebar_label: jsonArrayContains
---


Use the `jsonArrayContains` operator to determine whether a JSON array contains a particular item.

## Syntax

```sql
jsonArrayContains(<jsonArrayField>, <stringField>)
```

The `<jsonArrayField>` argument is a field that contains a string in JSON array format (for example, `["foo", "bar"]`). `<stringField>` is a string to check against the items of that array (for example, `"foo"`). If the item is in the array, it returns `true`; otherwise it returns `false`.


