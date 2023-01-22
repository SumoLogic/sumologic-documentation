---
id: in
title: in Search Operator
sidebar_label: in
---

The `in` operator returns a Boolean value: true if the specified property is in the specified object, or false if it is not.

## Syntax

```sql
<field> in (<value_1>[, <value_2>, <value_3>, ...])
```

In the syntax, we are checking the value of the field provided for the \<field\> argument.

If the value of `<field>` matches any of value arguments (`<value_1>, <value_2>, ...`) the function will return true. Otherwise, it will return false.

## Examples

### Find 5xx or 4xx errors, otherwise OK message

The following query:

```
_sourceCategory=Apache/Access
| parse "GET * HTTP/1.1\" * * \"*\"" as url, status_code, size, referrer
| if (status_code in ("500", "501", "502", "503", "504", "505", "506", "401", "402", "403", "404"), "error", "OK message") as reason
```

would return results similar to:

![in](/img/search/searchquerylanguage/search-operators/in.png)
