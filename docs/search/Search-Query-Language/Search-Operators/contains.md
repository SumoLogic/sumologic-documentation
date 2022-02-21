---
id: contains
---

# contains

The contains operator compares string values of two
[parsed](../01-Parse-Operators.md "Parse Operators") fields and returns
a boolean result based on whether the second field's value exists in the
first.

### Syntax

-   `contains\<field\>,\<field\>) as\<fiel\>`
-   \<field\> contains\<field\> as\<fiel\>`
-   `| where\<field\> contains\<field\>`
-   `| where contains\<field\>,\<field\>)`

### Rules

-   Requires field values to be strings. You may [cast
    values](Manually-Casting-String-Data-to-a-Number.md "Casting Data to a Number or String")
    if needed.
-   The full string of field2 must exist within field1.
-   Comparison is case sensitive.
-   Returns `true` when the value from field2 was found and `false` when
    the value was not found in field1.
-   Returns `true` if field1 and field2 are empty, and `false` when only
    one is empty.

### Example

Given the following example log:

`instance of alertNotification{ EventIdentifier = 100; Address = 123 Main Street, San Francisco, California; City = San Francisco; State = CA;}`

Parsing the log so the fields are `city` with the value "San Francisco"
and `address` with the value "123 Main Street, San Francisco,
California" you could use the contains operator to return the log if the
value of `city` is found in the value of `address`.

`| where contains(address, city)`
