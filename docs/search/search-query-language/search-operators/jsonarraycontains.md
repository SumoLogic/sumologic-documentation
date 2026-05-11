---
id: jsonarraycontains
title: jsonArrayContains Search Operator
sidebar_label: jsonArrayContains
description: Use the `jsonArrayContains` operator to check whether a JSON array field contains a specific string item. Returns true if the item exists in the array, false otherwise. Useful for filtering logs with JSON array fields, checking for specific values in configuration arrays, or validating data presence in structured JSON logs.
---


Use the `jsonArrayContains` operator to determine whether a JSON array contains a particular item.

## Syntax

`jsonArrayContains(<jsonArrayField>, <stringField>)`

The `<jsonArrayField>` argument is a field that contains a string in JSON array format (for example, `["foo", "bar"]`). `<stringField>` is a string to check against the items of that array (for example, `"foo"`). If the item is in the array, it returns `true`; otherwise it returns `false`.
