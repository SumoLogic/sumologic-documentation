---
id: cse-rules-syntax
title: CSE Rules Syntax
sidebar_label: Rules Syntax
description: Learn about the functions you can use when writing CSE Rules.
---

This topic describes commonly used CSE rules language functions. Rules language functions are used in CSE rule expressions. For information about rules and rule expressions, see [About CSE Rules](about-cse-rules.md).

## &&

The double ampersand (&&) operator is equivalent to a logical AND operator.

## \|\|  

A logical OR. 

## !

The exclamation point (!) function is equivalent to a logical NOT operator.

**Examples**

`device_ip != '0.0.0.0'   //  true if the value of the device_ip  is not “0.0.0.0”`

`!(null)   // true`

## -

The dash (-) function is a subtraction operator. The following expression returns the difference between the length of the `dns_query` and the `dns_queryDomain` field values. 

`(length(dns_query) - length(dns_queryDomain)) `

## /

The forward slash (/) operator performs floating-point division between two expressions. 

**Syntax**

`expr1 / expr2`

**Example**

The following expression divides `error_count` by `user_count`.

`error_count / user_count`

## /*  */

The forward slash and asterisk characters (/*  */) comment out lines. 

For CSE rules, two forward slashes (//) are *not* supported for commenting out lines. Two forward slashes are allowed in CIP, however, for [comments in search queries](/docs/search/get-started-with-search/search-basics/comments-search-queries/).

**Syntax**

`/*  */`

**Example**

`/* This is a comment. */`

## <

The less than (<) character returns “true” if the expression is less than the other expression.

**Syntax**

`expr1 < expr2`

**Examples**

`srcPort < dstPort  // true if the value of srcPort is less than the value of dstPort `

`null < 10  // false`

`10 < null  // false`

`null < null  // false`

## <=

The is less than or equal to (<=) character returns true if the expression is less than or equal to the other expression.

**Syntax**

`srcPort <= dstPort`

**Example**

This expression is:

`dstPort <= 6669  //  true if the value of dstPort is less or equal to  than “6669”`

`null <= 10   // false`

`10 <= null   // false`

`null <= null   // false`

## =

The equal to (=) function returns “true” if the expressions are equal, or "false" if either expression is null.  

**Syntax**

`expr1 = expr2 `

**Examples**

`"foo" = "foo" // true`  
 

`null = "foo" // false`  
 

`"foo" = null // false`  
 

`null = null // false`

## ==

The double equal sign (==) function returns “true” if the two expressions are equal. The two expressions must be the same type, and must be a type that can be used in an equality comparison. For complex types such as array and struct, the data types of fields must be orderable.

**Syntax**

`expr1 == expr2`

## >

The greater than (>) function returns “true” if one expression is greater than the other expression.

**Syntax**

`expr1 > expr2 `

**Examples**

`severity > '6'  //  true if the value of the severity field is greater than 6`

`null > 10   // false`

`10 > null   // false`

`null > null   // false`  
 

## >=

The greater than or equal to (>=) function returns “true” if one expression is greater than or equal to another expression.

**Syntax**

`expr1 >= expr2 `

**Examples**

`srcPort >= dstPort  // true if the  srcPort is greater than or equal to dstPort`

`null >= 10  // false`

`10>= null  // false`

`null >= null  // false`

## +

The plus sign (+) function adds the value of two or more expressions.

**Syntax**

`expr1 + expr2 `

**Example**

The following example adds the value of the `errorCount_x`  field to the value of the `errorCount_y`  field.

`errorCount_x + errorCount_y`

## \*

The asterisk (\*) returns the  product  of two expressions.

**Syntax**

`expr1 *  expr2`

## abs

Calculates the absolute value of the supplied argument.

**Syntax**

`abs(<x>)`

**Example**

`abs(-1.5) // 1.5`

## acos

Returns the inverse cosine of the supplied argument.

**Syntax**

`acos(<x>)`

**Example**

`acos(1) // 0`

## anyHttpHeaderMatches

Checks if any HTTP header in the supplied map matches a given regex. 

**Syntax**

`anyHttpHeaderMatches(<map_field>, <regex_string>)`

**Example**

`anyHttpHeaderMatches(request_headers, 'sumo logic')`  
 
## asciiToHex

Casts an ASCII string to a hexadecimal string. This is equivalent to `toHex` in the CSE rules syntax.

**Syntax**

* `asciiToHex(<ascii_string>)`
* `asciiToHex(<ascii_field>)`

## asin

Returns the inverse sine of the supplied argument.

**Syntax**

`asin(<x>)`

**Example**

`asin(1) // 1.5707963267948966`

## atan

Returns the inverse tangent of the supplied argument.

**Syntax**

`atan(<x>)`

**Example**

The following example returns the inverse tangent of 1, which is 

`atan(1) // 0.78540`

## atan2

Returns the four-quadrant inverse tangent of the two arguments supplied.

**Syntax**

`atan2(<b>, <c>)`

**Example**

`atan2(0, -1) // 3.141592653589793 (pi)`

## array_contains

Returns “true” if a specified array contains a particular value. 

CSE rules use `array_contains` statements to look for a value in a Record field. This is useful if you want to check a Record’s `listMatches field` for [Match Lists](about-cse-rules.md) or threat intel list matches. You can also check the contents of the `fieldTags` field to see if matches a keyword tag or schema key tag value.

**Syntax for matching to lists**

The syntax for checking for the existence of a Match List name or a threat intel list name in a Record’s `listMatches` field is: 

`array_contains(listMatches, 'match_list_name')`

where:

* `list_name` is the name of a Match List or a threat intel list

:::note
When you reference a threat intel  list using array_contains, you must substitute underscores for spaces in the threat intel list name.
:::  

**Syntax for matching to a keyword tag**

The syntax for checking to see if the the `fieldsTag` field contains a particular keyword tag is:

`array_contains(fieldTags["user_username"], "keyword-tag")`

where:

* `field `is the name of a Record field
* `keyword-tag` is a keyword tag

**Syntax for matching to a schema key tag**

The syntax for checking to see if the the `fieldTag` field contains a particular schema key tag is:

`array_contains(fieldTags["user_username"], "schema-key:schema-value")`

where:

* `field` is the name of a Record field
* `schema-key` is the name of a schema key tag
* `schema-value` is the value of a schema key tag

**Example**

This example checks to see if the `listMatches` field contains the value “vuln_scanners” (the name of a CSE Match List). 

`array_contains(listMatches, 'vuln_scanners')`

## base64Decode

Casts a `base64` string to an ASCII string, encoded as UTF-8. This is equivalent to `fromBase64` in the CSE rules syntax.

**Syntax**

`base64Decode("<string>")`

`base64Decode(<string_field>)`

## base64Encode 

Takes an ASCII string and converts it to a base64 string. This is equivalent to `toBase64` in the CSE rules syntax.

**Syntax**

`base64Encode("<string>")`

`base64Encode(<string_field>)`

## between

Returns “true” if the value of an expression falls within a specified range. 

**Syntax**

`expr between value1 and value2`

**Example**

This example returns “true” if the value of the  `metadata_deviceEventId` is between “2000000” and “2999999”:

`metadata_deviceEventId between '2000000' and '2999999' // true if metadata_deviceEventId is between “2000000” and “2999999”`

`null BETWEEN 1 and 10   // false`

`1 BETWEEN null and 10   // false`

`10 BETWEEN 1 and null   // false`

## cbrt

Returns the cube root value of the argument.

**Syntax**

`cbrt(<x>)`

**Example**

`cbrt(8) // 2`

## ceil

The ceil operator rounds up a field value to the nearest integer value.

**Syntax**

`ceil(<x>)`

**Examples**

`ceil(1.5) // 2`

`ceil(-1.5) // -1`

## compareCIDRPrefix

Compares two IPv4 addresses and returns true if the network prefixes match.

**Syntax**

`compareCIDRPrefix("<ip_addr1>", "<ip_addr2>", "<prefix_length>")`

**Example**

`compareCIDRPprefix("10.10.1.35", "10.10.1.100", "24") // true`

## concat

Allows you to concatenate or join multiple strings, numbers, and fields into a single string.

**Syntax**

`concat(<field1>, <field2>[, <field3>, ...])`

**Example**

`concat(1, "/", 1, "/", 2020) // "1/1/2020"`

## contains

Compares string values of two fields and returns a boolean result based on whether the second field's value exists in the first.

**Syntax**

`contains(<field1>, <field2>)`

:::note
CIP supports additional two forms of `contains` syntax. CSE supports only the form shown here. 
:::

## cos

Returns the cosine of the argument in radians.

**Syntax**

`cos(<x>)`

**Example**

`cos(1) // 0.5403023058681398`

## cosh

Returns the hyperbolic cosine of the argument in radians.

**Syntax**

`cosh(<x>)`

**Example**

`cosh(1) // 1.54308`

## decToHex

Converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.

**Syntax**

`decToHex("<long_string>")`

**Example**

`decToHex(“4919”) // "1337"`

## exp

Returns Euler's number e raised to the power of x.

**Syntax**

`exp(<x>)`

**Example**

`exp(1) // 2.7182818284590455`

## expm1

Returns value of x in exp(x)-1, compensating for the roundoff in exp(x).

**Syntax**

`expm1(<x>)`

**Example**

`expm1(0.1) // 0.10517091807564763`

## floor

Rounds down to the largest previous integer value. Returns the largest integer not greater than x. This is equivalent to `int` in the CSE rules syntax.

**Syntax**

`floor(<x>)`

**Examples**

* `floor(1.5) as v`   Sets `v` to the value “1”
* `floor(-1.5) as v `   Sets `v` to the value “-2”

## getCIDRPrefix

Extracts the network prefix from an IPv4 address. 

**Syntax**

`getCIDRPrefix("<ip_addr>", "<prefix_length>")`

**Example**

`getCIDRPrefix("10.10.1.35", "24") // "10.10.1.0"`

## haversine

Returns the distance between latitude and longitude values of two coordinates in kilometers.

**Syntax**

`haversine(<latitude1>, <longitude1>, <latitude2>, <longitude2>)`

**Example**

`haversine(39.04380, -77.48790, 45.73723, -119.81143) // 3512.71`

## hexToAscii 

Converts a hexadecimal string to an ASCII string. This is equivalent to fromHex in the CSE rules syntax.

**Syntax**

* `hexToAscii(<hexadecimal_field>)`
* `hexToAscii("<hexadecimal string>")`

## hexToDec

Converts a hexadecimal string of 16 or fewer characters to a long data type using Two's Complement for negative values.

**Syntax**

`hexToDec("<hexadecimal string>")`

**Example**

`hexToDec("0000000000001337") // 4919`

## hypot

Returns the square root of the sum of an array of squares.

**Syntax**

`hypot(<a>, <b>)`

**Example**

`hypot(3, 4) // 5`

## if

Evaluates a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition. On the basis of the test, the entire expression returns `value_if_true` if the condition is true, else `value_if_false` if the condition is false. The two sub-expressions  `value_if_true` and `value_if_false`) must have the same type.

You can nest the `if` operator.

**Syntax**

`if(condition, value_if_true, value_if_false)`

**Example**

`| if(status_code matches "5*", 1, 0) as serverError`

Here is an example of nesting the `if` operator.

`| if(severity >= 10, "Critical", if(severity >= 5, "Moderate", "Low"))`

## in

Returns “true” if the value of an expression exists within the specified list of values.

**Syntax**

`expr IN ("value1", [, <value2>, ...])`

**Example**

`srcDevice_ip IN ("1.2.3.4", "2.3.4.5", "3.4.5.6") // true if the value of srcDevice_ip is "1.2.3.4" or any of the other specified values
http_response_statusCode in (400, 500)   // true if the value of http_response_code equals 400 or 500
null IN ("value1", "value2", "value3") // false`

## ipv4ToNumber

Converts an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format.

**Syntax**

`ipv4ToNumber(<ip_addr>)`

**Example**

`ipv4ToNumber("127.0.0.1") // 2130706433`

## isBlank

Checks to see if a string contains text. Specifically, it checks to see if a character sequence is whitespace, empty (""), or null. It takes a single parameter and returns a boolean value: “true” if the variable is blank, or “false” if the variable contains a value other than whitespace, empty, or null.

**Syntax**

`isBlank(string)`

## isEmpty

Checks to see if a string contains no characters or whitespace, and returns a boolean value: “true” if the string contains no characters or whitespace, or “false” otherwise.

**Syntax**

`isEmpty(string)`

## isNull

Checks to see if a string is null, and returns a boolean value: “true” if the string is null, or “false” if the string is not null.

**Syntax**

`isNull(string)`

## isNumeric

Checks whether a string is a valid Java number. 

Valid numbers include hexadecimals marked with the 0x or 0X qualifier,
octal numbers, scientific notation and numbers marked with a type
qualifier, like 123L.

**Syntax**

`isNumeric("<string>")`

`isNumeric(<string_field>)`

## isPrivateIP

Checks if an IPv4 address is private and returns a boolean.

**Syntax**

`isPrivateIP("<IPv4_string>")`

**Example**

`isPrivateIP("192.168.0.1") // true`

## isPublicIP

Checks if an IPv4 address is public and returns a boolean.

**Syntax**

`isPublicIP("<IPv4_string>")`

**Example**

`isPublicIP("10.255.255.255") // false`

## isValidIP

Checks if the input string is a valid IPv4 or IPv6 address.

**Syntax**

`isValidIP("<IP_string>")`

**Examples**

`isValidIP("10.255.255.255") // true`

`isValidIP("127.0.500.1") // false`

## isValidIPv4

Checks if the input string is a valid IPv4 address.

**Syntax**

`isValidIPv4("<IP_string>")`

**Example**

`isValidIPv4("10.10.10.10") // true`

## isValidIPv6

Checks if the input string is a valid IPv6 address.

**Syntax**

`isValidIPv6("<IP_string>")`

**Example**

`isValidIPv6("10.10.10.10") // false`

## jsonArrayContains 

Returns “true” if a specified field contains a particular value. This is
equivalent to `array_contains` in the CSE rules syntax.

**Syntax**

`jsonArrayContains(field, “value”)`

**Example**

`| where jsonArrayContains(field, “vuln_scanner”)`

## jsonArraySize 

Returns the length of a string. Returns -1 if null. This is equivalent
to `size` in the CSE rules syntax.

**Syntax**

`jsonArraySize(field) > value`

**Example**

`| where jsonArraySize(field) > 5`

## json

Extracts values from JSON logs with selected JSONPath expressions. See
Supported JSONPath syntax elements below.

You can use the `json` operator allows to extract:

* Single, top-level fields
* Multiple fields
* Nested keys
* Keys in arrays

The primary use case for the `json` operator in CSE match expressions is
to access unmapped message fields that are contained in the CSE `fields`
attribute.

**Syntax**

`| json field=<field_name> "<name_or_key>"[, "<name_or_key>", ...] [as <field> ...]`

**Supported JSONPath syntax elements**

| JSONPath  | Description                                                  |
|:-----------|:--------------------------------------------------------------|
| $         | The root object or element.                                  |
| . or \[\] | Child operator.                                              |
| \*        | Wildcard. All objects or elements regardless of their names. |

**Syntax notes**

* In CIP, you can use the `json` operator without specifying a field to parse, in which case the operation is performed against the `_raw` field.
 
:::note
Currently, to use the `json` operator in CSE you must supply a field and an alias, as shown in the syntax above. Currently, the `json` operator is the only Sumo Logic search operator that you can use an alias with in CSE.
:::

* As part of the ingestion process, the `fields` field in CSE is mapped to the `_raw` field in CIP.  For easy copy/paste functionality, CSE accepts `_raw` as an alias to `fields`.
* The pipe character before the first `json` clause is optional.
* You can use multiple `json` clauses in a query.
* You can use only one `where` clause per query.
* CSE doesn’t support all of the `json` operator syntax options that CIP does, but you can do things like:

  * `| json field=fields "foo.bar['baz']" as nestedKey`
  * `| json field=fields "foo[0]" as indexKey`
  * `| json field=fields "foo[*]" as asteriskKey`

        Works for arrays, not maps.

  * `| json field=fields "['foo.bar']" as topLevelKey`

        This is a top-level key named \`foo.bar\`.

**Examples**

```
| json field=fields "foo" as alias
| where toInt(alias) > 5
```


```
| json field=fields "packetsSent" as packets_sent
| json field=fields "packetsReceived" as packets_received
| where toInt(packets_sent) != toInt(packets_received)
```

The second query shown above is equivalent to the following CSE syntax. 

`int(fields['packetsSent']) != int(fields['packetsReceived'])`

## length

Returns the number of characters in a string. If the string is null, it returns 0.

**Syntax**

`length(string) `

**Examples**

`length("sumo logic") // 10`

`length(null) // 0`

## like

Compares a string to a pattern, and returns “true” if the string matches the pattern, null if any arguments are null, and “false” otherwise. Patterns can contain regular characters as well as wildcards. Wildcard characters can be escaped using the single character specified for the `ESCAPE` parameter. Matching is case sensitive.

**Syntax**

`str like pattern [ ESCAPE 'escape_character' ]`

If `pattern` or `escape_character` is null, the expression evaluates to
null.

**Examples**

`null LIKE “%foo%”   // false`

`“foo” LIKE null   // false`

`bro_rdp_cookie like '%admin%' // true if the value of bro_rdp_cookie matches %admin%`  

In the following example, the string` '%SystemDrive%\Users\John'` has to match the pattern `'\%SystemDrive\%\\Users%'` to return “true”.

`'%SystemDrive%\Users\John' like '\%SystemDrive\%\\Users%'`  
 

where:

* `str` is a string expression
* `pattern` is a string expression, which is matched literally, except for the following wildcard symbols:

    * `_` represents a single character 
    * `%` Represents zero, one, or multiple characters    

**Example log**

Returns the natural logarithm of the argument.

**Syntax**

`log(<x>)`

**Example**

`log(2) // 0.6931471805599453`

## log10

Returns the base-10 logarithm of the argument.

**Syntax**

`log10(<x>)`

**Example**

`log10(2) // 0.3010299956639812`

## log1p

Calculates log(1+x) accurately for small values of x.

**Syntax**

`log1p(<x>)`

**Example**

`log1p(0.1) // 0.09531017980432487`

## luhn

Uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them.

**Syntax**

`luhn(<string>")`

**Example**

`luhn("6666-7777-6666-8888") // true`

`luhn("0000000000000131") // false`

## maskFromCIDR

A utility function that returns a subnet mask for boolean operations with IPv4 addresses.

**Syntax**

`maskFromCIDR("<prefix_length>")`

**Example**

`maskFromCIDR("30") // "255.255.255.252"`

## matches

Can be used to match a string to a wildcard pattern or an RE2 compliant regex. The operator returns a boolean value; the operator can be used with `where` or `if` operators.

**Syntax**

* `where <string expression> matches <pattern>`
* `where <string expression> matches /<regex>/`
* `where !(<string expression> matches <pattern>)`

:::note
`<string expression>` is case-sensitive and can be provided as a field.
:::

**Examples**

* `where foo matches "*bar*"` (This example is equivalent to `foo LIKE '%bar%'` in the CSE rules syntax.)
* `where foo matches /.*bar.*/` (This example is equivalent to `foo RLIKE '.*bar.*'` in the CSE rules syntax.)

## num

Casts string data to a number.

**Syntax**

`num(string)`

## number

Casts string data to a number.

**Syntax**

`number()`

## rlike

The `rlike` function returns “true” if a string matches a specified
regular expression. If there is no match, the function returns “false”,
The syntax is:

`str rlike regexp`

where:

* `str` is a string expression.
* `regexp` is a Java regular expression.

**Examples**

`null RLIKE “.*foo.*”   // false`

`“foo” RLIKE null   // false`

This example returns “true” of the value of the `dns_query` field
matches the regular expression `[A-Za-z2-7]{60,}`.

`dns_query rlike '[A-Za-z2-7]{60,}' `

## round

Rounds the function to N decimal places. If the second argument is not
provided, it will round to the nearest integer.

**Syntax**

`round(<x> [,<y>])`

**Examples**

* `round(1.5) // 2`
* `round(1.549, 2) // 1.55`

## sin

Returns the sine of the argument in radians.

**Syntax**

`sin(<x>)`

**Example**

`sin(1) // 0.8414709848078965`

## sinh

Returns the hyperbolic sine of the argument in radians.

**Syntax**

`sinh(<x>)`

**Example**

`sinh(1) // 1.1752011936438014`

## size

Returns the number of elements in the input array.

**Syntax**

`size(<array_field>)`

**Example**

`size(listMatches) > 5`

## sqrt

Returns the square root of the argument.

**Syntax**

`sqrt(<x>)`

**Example**

`sqrt(4) // 2`

## substring

Allows you to specify an offset that will output only part of a string, referred to as a substring. You can use this operator to output just a part of a string instead of the whole string, for example, if you wanted to output an employee’s initials instead of their whole name.

**Syntax**

* `substring(<sourceString>, <startOffset>, <endOffset>)`

* `substring(<sourceString>, <startOffset>)`

**Rules**

* The `startOffset` must be a non-negative integer and less than the length of the `sourceString`.
* The `endOffset` must be a non-negative integer that is equal to or greater than `startOffset`.
* If the `endOffset` is not specified, the `substring` is taken from the `startOffset` until the very end of the `sourceString`.
* The `endOffset` may be equal to or greater than the length of the `sourceString`, but it would behave the same as if the user did not specify an `endOffset`.

**Examples**

* `substring("Hello world!", 6) // "world!"`
* `substring("Sumo Logic", 0, 4) // "Sumo"`
* `substring("Sumo Logic", 0, 100) // "Sumo Logic"`

## tan

Returns the tangent of the argument in radians.

**Syntax**

`tan(<x>)`

**Example**

`tan(1) // 1.5574077246549023`

## tanh

Returns the hyperbolic tangent of the argument in radians.

**Syntax**

`tanh(<x>)`

**Example**

`tanh(1) // 0.76159`

## toDegrees

Converts angles from radians to degrees.

**Syntax**

`toDegrees(<x>)`

**Example**

`toDegrees(asin(1)) // 90 (asin(1) is pi / 2)`

## toDouble

Casts string data to the double data type.

**Syntax **

`toDouble(<field>)`

## toFloat 

Casts a string to a floating point number. This is equivalent to `float`
in the CSE rules syntax.

**Syntax**

`float(<field>)`

## toInt 

Casts a string to an integer. This is equivalent to `int` in the CSE
rules syntax.

**Syntax**

`int (<field>)`

## toLong

Casts string data to the long data type.

**Syntax **

`toLong(<field>)`

## toLowerCase 

Converts a string to all lower case letters. This is equivalent to lower
in the CSE rules syntax.

**Syntax**

`toLowerCase(<string>)`

## toRadians

Converts angles from radians to degrees.

**Syntax**

`toRadians(<x>)`

**Example**

`toRadians(180) // 3.141592653589793 (pi)`

## toUpperCase 

Converts a string to all uppercase letters. This is equivalent to upper
in the CSE rules syntax.

**Syntax**

`toUpperCase(<string>)`

## trim

Eliminates leading and trailing spaces from a string field.

**Syntax**

`trim(" <string expression> ")`

**Example**

`trim("  Hello World  ") // "Hello World"`

## urldecode

Decodes a URL you include in a query, returning the decoded (unescaped)
URL string.

**Syntax**

`urldecode("<url string>")`

**Example**

`urldecode("http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26") // "http://yourmainserver-city55555.org/...iWS7o3KLdfg90&"`

## urlencode

Encodes the URL into an ASCII character set.

**Syntax**

`urlencode("<url string>")`

**Example**

`urlencode("http://yourmainserver-city55555.org/...iWS7o3KLdfg90&") // "http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26"`

## where

Filters results based on the value of a boolean expression.  

**Syntax**

`... | where <boolean expression>`

**Example**

`| where jsonArrayContains(field, “vuln_scanner”)`  

## CIP literals supported in CSE

The following CIP literals are supported in CSE:

* Time-based suffixed literals (millisecond-based. i.e., 1s == 1000)

  * ns (nanosecond)
  * us (microsecond)
  * ms (millisecond)
  * s (second)
  * m (minute)
  * h (hour)
  * d (day)
  * w (week)

* Base-1000 suffixed literals

  * k or K (1,000)
  * M (1,000,000)
  * G or B (1,000,000,000)
  * T (1,000,000,000,000)
  * P (1,000,000,000,000,000)

* Base-1024 suffixed literals

  * Ki (1,024)
  * Mi (1,048,576)
  * Gi (1,073,741,824)
  * Ti (1,099,511,627,776)
  * Pi (1,125,899,906,842,624)

* Escaped double quote are supported

  * For example, `"\"foo\""` is the literal `"foo"`
