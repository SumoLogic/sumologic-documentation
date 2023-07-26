---
id: isnull-isempty-isblank
title: isNull, isEmpty, isBlank Search Operators
sidebar_label: isNull, isEmpty, isBlank
---

* The `isNull` operator checks a string and returns a boolean value: true if the string is null, or false if the string is not null.
* The `isEmpty` operator checks if a string contains no characters and is only whitespace.
* The `isBlank` operator checks if a string contains no characters, is only whitespace, and is null.

## When is a field null?

Fields can hold a null value for the following reasons:

* A [parsing operation](/docs/search/search-query-language/parse-operators) failed to parse a value.
* There is a mismatch from a <a href="#lookup-classic">lookup</a> operator query.
* There is a missing field from a [geo lookup](geo-lookup-map.md) operator query.
* There is a missing field from a [transpose](transpose.md) operator query.

## When to use isNull, isEmpty, isBlank

### isNull(<`string`>)

Checks if the `<string>` value is "null".

* `isNull(null) = true`
* `isNull("") = false`
* `isNull(" ") = false`
* `isNull("bob") = false`
* `isNull(" bob ") = false`

Returns `true` if the string is null.

### isEmpty(<`string`>)

Checks if the `<string>` value is an empty string containing no characters or whitespace.

* `isEmpty(null) = true`
* `isEmpty("") = true`
* `isEmpty(" ") = false`
* `isEmpty("bob") = false`
* `isEmpty(" bob ") = false`

Returns `true` if the string is null or empty.

### isBlank(<`string`>)

Checks if the value is null, empty, or contains only whitespace characters.

* `isBlank(null) = true`
* `isBlank("") = true`
* `isBlank(" ") = true`
* `isBlank("bob") = false`
* `isBlank(" bob ") = false`

Returns `true` if the string is null, empty, or only whitespace.

## Examples

### Run a geo lookup query where we can find remote IP addresses that are not in the geo database

In this situation, no `country_code` will be associated with the IP address and the field value will be null.

Running a query like:

```sql
| parse "remote_ip=*]" as remote_ip
| lookup country_code from geo://location on ip = remote_ip
| if (isNull(country_code), "unknown", country_code) as country_code
```

uses the `isNull` operator to check the field value of `country_code` and if it returns `true` has the `if` operator replace the value with the string `unknown`:

![isNull](/img/search/searchquerylanguage/search-operators/isNull.png)

### Use where to check for null values

To check for null values from a lookup operation, use a query with [`where`](where.md), like:

```sql
| parse "example_ip=*]" as ip
| lookup country_name, city from geo://location on ip = ip
| where isNull(country_name)
```
