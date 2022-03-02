---
id: isnullc-isemptyc-isblank
---

# isNull, isEmpty, isBlank

The **isNull** operator checks a string and returns a boolean value:
true if the string is null, or false if the string is not null.

In addition to isNull:

* The **isEmpty** operator checks if a string
    * contains no characters
    * is only whitespace
* The **isBlank** operator checks if a string
    * contains no characters
    * is only whitespace
    * is null

### When is a field null?

Fields can hold a null value for the following reasons:

* A [parsing operation](../parse-operators.md "Parse Operators")
    failed to parse a value.
* There is a mismatch from a [lookup](lookup-classic.md "lookup")
    operator query.
* There is a missing field from a [geo
    lookup](Geo-Lookup.md "Geo Lookup") operator query.
* There is a missing field from
    a [transpose](transpose.md "transpose") operator query.

### When to use isNull, isEmpty, isBlank

###### isNull(\<string\>)

Checks if the \<strin\>` value is "null".

`isNull(null) = true`

`isNull("") = false`

`isNull(" ") = false`

`isNull("bob") = false`

`isNull(" bob ") = false`

Returns `true` if the string is null.

###### isEmpty(\<string\>)

Checks if the \<strin\>` value is an empty string containing no
characters or whitespace.

`isEmpty(null) = true`

`isEmpty("") = true`

`isEmpty(" ") = false`

`isEmpty("bob") = false`

`isEmpty(" bob ") = false`

Returns `true` if the string is null or empty.

###### isBlank(\<string\>)

Checks if the value is null, empty, or contains only whitespace
characters.

`isBlank(null) = true`

`isBlank("") = true`

`isBlank(" ") = true`

`isBlank("bob") = false`

`isBlank(" bob ") = false`

Returns `true` if the string is null, empty, or only whitespace.

### Examples

**Run a geo lookup query where we can find remote IP addresses that are
not in the geo database.**

In this situation, no `country_code` will be associated with the IP
address and the field value will be null.

Running a query like:

`| parse "remote_ip=*]" as remote_ip | lookup country_code from geo://location on ip = remote_ip | if (isNull(country_code), "unknown", country_code) as country_code`

uses the `isNull` operator to check the field value of
`country_code` and if it returns `true` has the `if` operator replace
the value with the string `unknown`:

![isNull](../../static/img/search-query-language/search-operators/isNull%2C-isEmpty%2C-isBlank/isNull.png)

**Use [where](where.md "where") to check for null values.**

To check for null values from a lookup operation, use a query like:

`| parse "example_ip=*]" as ip | lookup country_name, city from geo://location on ip = ip | where isNull(country_name)`
