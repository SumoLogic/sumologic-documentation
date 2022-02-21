---
id: where
---

# where

Use the **where** operator to filter results based on a boolean
expression. For example, using **where** with the boolean operator
[isValidIP](isValidIP.md "isValidIP, isValidIPv4, isValidIPv6"):

-   Filters as true and returns results:
    `| where isValidIP("192.168.0.10")`
-   Filters as false and won't return results:
    `| where !isValidIP("192.168.0.10")`

The **where** operator must appear as a separate operator distinct from
other operators, delimited by the pipe symbol ("\|"). In other words,
the following construct will not work and will generate a syntax error:

This query will NOT work:

`...| parse "seconds=*;" as time where\> 5`

Instead, separate the **where** operator from the
preceding **parse** operator like this:

`...| parse "seconds=*;" as time  | where time\> 5`

### Syntax

-   `... | where\<boolean expressio\> | ...`

### Rules

-   The pipe delimiter is required to separate the **where** operator as
    a distinct query operator.
-   The **where** operator *cannot* be used inline as a query clause,
    like ".`.. | extract a where b==something |...`"
-   Multiple **where** operators are processed in the order they are
    specified, with each subsequent **where **operator further filtering
    results.
-   [Keyword expressions](../../Get-Started-with-Search/How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expressions")
    can be used in the boolean expression, such as OR and AND.
-   If defining a [built-in metadata
    field](../../Get-Started-with-Search/Search-Basics/Built-in-Metadata.md "Built-in Metadata")
    value in the boolean expression you need to quote the value. If it's
    not wrapped in quotes the value is interpreted as a field name.
-   If you are using [**in**](in-operator.md "in operator") or **not
    in** to match integers, [cast "x" to a number
    first](Manually-Casting-String-Data-to-a-Number.md "Manually Casting String Data to a Number").
-   The [matches](matches.md "matches") operator can be used in the
    boolean expression. You can use an [RE2
    compliant](https://github.com/google/re2/wiki/Syntax "https://github.com/google/re2/wiki/Syntax")
    regular expression or use asterisks `*` as wildcards.
-   Any operator that returns a boolean value can be used in the boolean
    expression. Such as [compareCIDRPrefix](CIDR.md "CIDR"), 
    [contains](contains.md "contains"), [in](in-operator.md "in operator"), [isBlank](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank"), [isEmpty](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank"), [isNull](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank"), [isNumeric](isNumeric.md "isNumeric"), [isPrivateIP](isPrivateIP.md "isPrivateIP"), [isPublicIP](isPublicIP.md "isPublicIP"), [isValidIP](isValidIP.md "isValidIP, isValidIPv4, isValidIPv6"),
    and [math expressions](../Math-Expressions.md "Math Expressions").

Use [comparison operators](../Field-Expressions.md "Field Expressions")
to produce boolean values.

### Examples

-   `... | where \<b `
-   `... | where a=x`
-   `... | where \>=x`
-   `... | where \<=x`
-   `... | where \<x`
-   `... | where \<10`
-   `... | where (x\>=10 and x\<=20)`
-   `... | where x="some string"`
-   `... | where _sourceCategory="xyz"`
-   `... | where error="fail*"`
-   `... | where use\\>"root"`
-   `... | where x matches "some string"`
-   `... | where x matches "fail*"`
-   `... | where x matches /regex/`
-   `... | where !(x matches /regex/)`
-   `... | num(x) | where x in (4, 3, 5) `
-   `... | where x in ("error", "fail")`
-   `... | where x not in ("error", "fail")`
-   `... | where x matches "Android" or x matches "iPhone" or x matches "iPad"`

### Using the "not" option

If you need a query using the **where** operator, where xxx DOES NOT
match yyy, use "!" followed by the **matches** operator enclosed in
parenthesis.

For example:

`...| where !\<field xx\> matches \<value yy\>") | ...`

or:

`...| where !(status matches "200")`

### Use where to check for null values

For details,
see [isNull](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank")
operator.
