---
id: cse-rules-syntax
title: Cloud SIEM Rules Syntax
sidebar_label: Rules Syntax
description: Learn about the functions you can use when writing Cloud SIEM rules.
---

This topic describes commonly used Cloud SIEM rules language functions. Rules language functions are used in Cloud SIEM rule expressions. For information about rules and rule expressions, see [About Cloud SIEM Rules](/docs/cse/rules/about-cse-rules).

## Sumo Logic core platform literals supported in Cloud SIEM

The following Sumo Logic core platform literals are supported in Cloud SIEM rule expressions. For more information about these literals, see [Field Expressions](/docs/search/search-query-language/field-expressions/).

* [Time-based suffixed literals](/docs/search/search-query-language/field-expressions/#time-suffix) (millisecond-based. i.e., 1s == 1000)

  * ns (nanosecond)
  * us (microsecond)
  * ms (millisecond)
  * s (second)
  * m (minute)
  * h (hour)
  * d (day)
  * w (week)

* [Base-1000 suffixed literals](/docs/search/search-query-language/field-expressions/#size-suffix) 

  * k or K (1,000)
  * M (1,000,000)
  * G or B (1,000,000,000)
  * T (1,000,000,000,000)
  * P (1,000,000,000,000,000)

* [Base-1024 suffixed literals](/docs/search/search-query-language/field-expressions/#size-suffix) 

  * Ki (1,024)
  * Mi (1,048,576)
  * Gi (1,073,741,824)
  * Ti (1,099,511,627,776)
  * Pi (1,125,899,906,842,624)

* [Escaped double quote are supported](/docs/search/search-query-language/field-expressions/#string-expressions-and-quotes)

  * For example, `"\"foo\""` is the literal `"foo"`


## Rules language functions

Following are rules language functions commonly used in Cloud SIEM rule expressions. 

Many of these functions are similar to those used in search queries. For more information, see [Search Query Language](/docs/search/search-query-language/). 

### &&

The double ampersand (&&) operator is equivalent to a logical AND operator.

### \|\|  

A logical OR. 

### !

The exclamation point (!) function is equivalent to a logical NOT operator.

**Examples**

* The following expression returns "true" if the value of the `device_ip`  is not `0.0.0.0`:

    `device_ip != '0.0.0.0'`

* The following expression returns "true":

   `!(null)`

### -

The dash (-) function is a subtraction operator. 

**Example**

The following expression returns the difference between the length of the `dns_query` and the `dns_queryDomain` field values:

`(length(dns_query) - length(dns_queryDomain)) `

### /

The forward slash (/) operator performs floating-point division between two expressions. 

**Syntax**

`expr1 / expr2`

**Example**

The following expression divides `error_count` by `user_count`:

`error_count / user_count`

### /*  */

The forward slash and asterisk characters (/*  */) comment out lines.

For Cloud SIEM rules, two forward slashes (//) are *not* supported for commenting out lines. Two forward slashes are allowed in Sumo Logic core platform, however, for [comments in search queries](/docs/search/get-started-with-search/search-basics/comments-search-queries/).

**Syntax**

`/*  */`

**Example**

`/* This is a comment. */`

### `<`

The less than (`<`) character returns “true” if the expression is less than the other expression.

**Syntax**

`expr1 < expr2`

**Examples**

* The following expression returns "true" if the value of `srcPort` is less than the value of `dstPort`:

   `srcPort < dstPort`

* The following expression returns "false":

   `null < 10`

* The following expression returns "false":

   `10 < null`

* The following expression returns "false":

   `null < null`

### `<=`

The is less than or equal to (`<=`) character returns true if the expression is less than or equal to the other expression.

**Syntax**

`srcPort <= dstPort`

**Example**

* The following expression returns "true" if the value of `dstPort` is less than or equal to `6669`:

   `dstPort <= 6669`

* The following expression returns "false":

   `null <= 10`

* The following expression returns "false":

   `10 <= null`

* The following expression returns "false":

   `null <= null`

### =

The equal to (=) function returns “true” if the expressions are equal, or "false" if either expression is null.  

**Syntax**

`expr1 = expr2 `

**Examples**

* The following expression returns "true":

   `"foo" = "foo"`  
 
* The following expression returns "false":

   `null = "foo"`  
 
* The following expression returns "false":

   `"foo" = null`  
 
* The following expression returns "false":

   `null = null`

### ==

The double equal sign (==) function returns “true” if the two expressions are equal. The two expressions must be the same type, and must be a type that can be used in an equality comparison. For complex types such as array and struct, the data types of fields must be orderable.

**Syntax**

`expr1 == expr2`

### >

The greater than (>) function returns “true” if one expression is greater than the other expression.

**Syntax**

`expr1 > expr2 `

**Examples**

* The following expression returns "true" if the value of the `severity` field is greater than `6`:

   `severity > '6'`

* The following expression returns "false":

   `null > 10`

* The following expression returns "false":

   `10 > null`

* The following expression returns "false":

   `null > null`  
 
### >=

The greater than or equal to (>=) function returns “true” if one expression is greater than or equal to another expression.

**Syntax**

`expr1 >= expr2 `

**Examples**

* The following expression returns "true" if the  `srcPort` is greater than or equal to `dstPort`:

   `srcPort >= dstPort`

* The following expression returns "false":

   `null >= 10`

* The following expression returns "false":

   `10>= null`

* The following expression returns "false":

   `null >= null`

### +

The plus sign (+) function adds the value of two or more expressions.

**Syntax**

`expr1 + expr2 `

**Example**

The following example adds the value of the `errorCount_x`  field to the value of the `errorCount_y`  field:

`errorCount_x + errorCount_y`

### \*

The asterisk (\*) returns the  product  of two expressions.

**Syntax**

`expr1 *  expr2`

### abs

Calculates the absolute value of the supplied argument.

**Syntax**

`abs(<x>)`

**Example**

The following expression returns "1.5":

`abs(-1.5)`

### acos

Returns the inverse cosine of the supplied argument.

**Syntax**

`acos(<x>)`

**Example**

The following expression returns "0":

`acos(1`

### anyHttpHeaderMatches

Checks if any HTTP header in the supplied map matches a given regex. 

**Syntax**

`anyHttpHeaderMatches(<map_field>, <regex_string>)`

**Example**

`anyHttpHeaderMatches(request_headers, 'sumo logic')`  
 
### asciiToHex

Casts an ASCII string to a hexadecimal string. This is equivalent to `toHex` in the Cloud SIEM rules syntax.

**Syntax**

* `asciiToHex(<ascii_string>)`
* `asciiToHex(<ascii_field>)`

### asin

Returns the inverse sine of the supplied argument.

**Syntax**

`asin(<x>)`

**Example**

The following example returns "1.5707963267948966":

`asin(1)`

### atan

Returns the inverse tangent of the supplied argument.

**Syntax**

`atan(<x>)`

**Example**

The following expression returns the inverse tangent of 1, which is "0.78540":

`atan(1)`

### atan2

Returns the four-quadrant inverse tangent of the two arguments supplied.

**Syntax**

`atan2(<b>, <c>)`

**Example**

The following expression returns "3.141592653589793" (pi):

`atan2(0, -1)`

### array_contains

Returns “true” if a specified array contains a particular value. 

Cloud SIEM rules use `array_contains` statements to look for a value in a record field. This is useful if you want to check a record’s `listMatches field` for [Match Lists](/docs/cse/match-lists-suppressed-lists/create-match-list) or threat intel list matches. You can also check the contents of the `fieldTags` field to see if matches a keyword tag or schema key tag value.

**Syntax for matching to lists**

The syntax for checking for the existence of a Match List name or a threat intel list name in a record’s `listMatches` field is: 

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

* `field `is the name of a record field
* `keyword-tag` is a keyword tag

**Syntax for matching to a schema key tag**

The syntax for checking to see if the the `fieldTag` field contains a particular schema key tag is:

`array_contains(fieldTags["user_username"], "schema-key:schema-value")`

where:

* `field` is the name of a record field
* `schema-key` is the name of a schema key tag
* `schema-value` is the value of a schema key tag

**Example**

This example checks to see if the `listMatches` field contains the value “vuln_scanners” (the name of a Cloud SIEM Match List). 

`array_contains(listMatches, 'vuln_scanners')`

### base64Decode

Casts a `base64` string to an ASCII string, encoded as UTF-8. This is equivalent to `fromBase64` in the Cloud SIEM rules syntax.

**Syntax**

`base64Decode("<string>")`

`base64Decode(<string_field>)`

### base64Encode 

Takes an ASCII string and converts it to a base64 string. This is equivalent to `toBase64` in the Cloud SIEM rules syntax.

**Syntax**

`base64Encode("<string>")`

`base64Encode(<string_field>)`

### between

Returns “true” if the value of an expression falls within a specified range. 

**Syntax**

`expr between value1 and value2`

**Example**

* The following expression returns "true" if the value of `metadata_deviceEventId` is between “2000000” and “2999999”:

   `metadata_deviceEventId between '2000000' and '2999999'`

* The following expression returns "false":

   `null BETWEEN 1 and 10`

* The following expression returns "false":

   `1 BETWEEN null and 10`

* The following expression returns "false":

   `10 BETWEEN 1 and null`

### cbrt

Returns the cube root value of the argument.

**Syntax**

`cbrt(<x>)`

**Example**

The following expression returns "2":

`cbrt(8)`

### ceil

The ceil operator rounds up a field value to the nearest integer value.

**Syntax**

`ceil(<x>)`

**Examples**

* The following expression returns "2":

   `ceil(1.5)`

* The following expression returns "-1":

   `ceil(-1.5)`

### compareCIDRPrefix

Compares two IPv4 addresses and returns true if the network prefixes match.

**Syntax**

`compareCIDRPrefix("<ip_addr1>", "<ip_addr2>", "<prefix_length>")`

**Example**

The following expression returns "true":

`compareCIDRPprefix("10.10.1.35", "10.10.1.100", "24")`

### concat

Allows you to concatenate or join multiple strings, numbers, and fields into a single string.

**Syntax**

`concat(<field1>, <field2>[, <field3>, ...])`

**Example**

The following example returns "1/1/2020":

`concat(1, "/", 1, "/", 2020)`

### contains

Compares string values of two fields and returns a boolean result based on whether the second field's value exists in the first.

**Syntax**

`contains(<field1>, <field2>)`

:::note
Sumo Logic core platform supports additional two forms of `contains` syntax. Cloud SIEM supports only the form shown here. 
:::

### cos

Returns the cosine of the argument in radians.

**Syntax**

`cos(<x>)`

**Example**

The following expression returns "0.5403023058681398":

`cos(1)`

### cosh

Returns the hyperbolic cosine of the argument in radians.

**Syntax**

`cosh(<x>)`

**Example**

The following expression returns "1.54308":

`cosh(1)`

### decToHex

Converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.

**Syntax**

`decToHex("<long_string>")`

**Example**

The following expression returns "1337":

`decToHex(“4919”)`

### exp

Returns Euler's number e raised to the power of x.

**Syntax**

`exp(<x>)`

**Example**

The following expression returns "2.7182818284590455":

`exp(1)`

### expm1

Returns value of x in exp(x)-1, compensating for the roundoff in exp(x).

**Syntax**

`expm1(<x>)`

**Example**

The following expression returns "0.10517091807564763":

`expm1(0.1)`

### floor

Rounds down to the largest previous integer value. Returns the largest integer not greater than x. This is equivalent to `int` in the Cloud SIEM rules syntax.

**Syntax**

`floor(<x>)`

**Examples**

* `floor(1.5) as v`   Sets `v` to the value “1”
* `floor(-1.5) as v `   Sets `v` to the value “-2”

### getCIDRPrefix

Extracts the network prefix from an IPv4 address. 

**Syntax**

`getCIDRPrefix("<ip_addr>", "<prefix_length>")`

**Example**

The following expression returns "10.10.1.0":

`getCIDRPrefix("10.10.1.35", "24")`

### hasThreatMatch

The `hasThreatMatch` Cloud SIEM rules function matches incoming records in Cloud SIEM to [threat intelligence indicators](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/#hasthreatmatch-cloud-siem-rules-language-function). It can also match values in [custom threat intelligence sources in Cloud SIEM](/docs/cse/administration/create-custom-threat-intel-source/). 

**Syntax**

`hasThreatMatch([<fields>], <filters>, <indicators>)`

Parameters:
* `<fields>` is a list of comma-separated [field names](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/schema/full_schema.md). At least one field name is required.
* `<filters>` is a logical expression using [indicator attributes](/docs/security/threat-intelligence/upload-formats/#normalized-json-format). Allowed in the filtering are parentheses `()`; `OR` and `AND` boolean operators; and comparison operators `=`, `<`, `>`, `=<`, `=>`, `!=`. <br/>You can filter on the following indicator attributes:
   * `actors`
   * `confidence`
   * `id`
   * `indicator`
   * `killChain`
   * `source`
   * `threatType`
   * `type`
   * `validFrom`
   * `validUntil`
* `<indicators>` is an optional case insensitive option that describes how indicators should be matched with regard to their validity. Accepted values are:
   * `active_indicators`. Match active indicators only (default).
   * `expired_indicators`. Match expired indicators only.
   * `all_indicators`. Match all indicators.

**Examples**

* `hasThreatMatch([srcDevice_ip])`
* `hasThreatMatch([srcDevice_ip, dstDevice_ip])`
* `hasThreatMatch([srcDevice_ip], type="ipv4-addr")`
* `hasThreatMatch([srcDevice_ip], confidence > 50)`
* `hasThreatMatch([srcDevice_ip], confidence > 50 AND source="TAXII2Source")`
* `hasThreatMatch([srcDevice_ip], source="s1" OR (source="s2" confidence > 50))`
* `hasThreatMatch([srcDevice_ip], expired_indicators)`
* `hasThreatMatch([srcDevice_ip], confidence > 50, all_indicators)`

#### Best practice

As a best practice, always include filtering to narrow your match to just the types desired (that is, `type=`). This will ensure that your match expressions are not overly broad.

For example:
* `hasThreatMatch([dstDevice_ip], confidence > 1 AND (type="ipv4-addr" OR type="ipv6-addr"))` 
* `hasThreatMatch([file_hash_imphash, file_hash_md5, file_hash_pehash, file_hash_ssdeep, file_hash_sha1, file_hash_sha256], confidence > 1 AND type="file:hashes")` 
* `hasThreatMatch([device_hostname, srcDevice_hostname, dstDevice_hostname, http_hostname, http_referrerHostname, bro_ssl_serverName, bro_ntlm_domainame, bro_ssl_serverName_rootDomain, dns_queryDomain, dns_replyDomain, fromUser_authDomain, http_referrerDomain, http_url_rootDomain, http_url_fqdn], confidence > 1 AND (type="domain-name" OR type="url"))` 
* `hasThreatMatch([http_url], confidence > 1 AND type="url")` 
* `hasThreatMatch([srcDevice_ip], confidence > 1 AND (type="ipv4-addr" OR type="ipv6-addr"))`

Following are the standard indicator types you can filter on:
* `domain-name`. Domain name. 
* `email-addr`. Email address. 
* `file:hashes`. File hash. (If you want to add the hash algorithm, enter `file:hashes.<HASH-TYPE>`. For example, `[file:hashes.MD5 = '5d41402abc4b2a76b9719d911017c592']` or `[file:hashes.'SHA-256' = '50d858e0985ecc7f60418aaf0cc5ab587f42c2570a884095a9e8ccacd0f6545c']`.)
* `file`. File name. 
* `ipv4-addr`. IPv4 IP address. 
* `ipv6-addr`. IPv6 IP address. 
* `mac-addr`. Mac address name. 
* `process`. Process name. 
* `url`. URL. 
* `user-account`. User ID or login name. 

For more information about indicator types, see [Upload Formats for Threat Intelligence Indicators](/docs/security/threat-intelligence/upload-formats).

### haversine

Returns the distance between latitude and longitude values of two coordinates in kilometers.

**Syntax**

`haversine(<latitude1>, <longitude1>, <latitude2>, <longitude2>)`

**Example**

The following expression returns "3512.71":

`haversine(39.04380, -77.48790, 45.73723, -119.81143)`

### hexToAscii 

Converts a hexadecimal string to an ASCII string. This is equivalent to fromHex in the Cloud SIEM rules syntax.

**Syntax**

* `hexToAscii(<hexadecimal_field>)`
* `hexToAscii("<hexadecimal string>")`

### hexToDec

Converts a hexadecimal string of 16 or fewer characters to a long data type using Two's Complement for negative values.

**Syntax**

`hexToDec("<hexadecimal string>")`

**Example**

The following expression returns "4919":

`hexToDec("0000000000001337")`

### hypot

Returns the square root of the sum of an array of squares.

**Syntax**

`hypot(<a>, <b>)`

**Example**

The following expression returns "5":

`hypot(3, 4)`

### if

Evaluates a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition. On the basis of the test, the entire expression returns `value_if_true` if the condition is true, else `value_if_false` if the condition is false. The two sub-expressions  `value_if_true` and `value_if_false`) must have the same type.

You can nest the `if` operator.

**Syntax**

`if(condition, value_if_true, value_if_false)`

**Example**

`| if(status_code matches "5*", 1, 0) as serverError`

Here is an example of nesting the `if` operator.

`| if(severity >= 10, "Critical", if(severity >= 5, "Moderate", "Low"))`

### in

Returns “true” if the value of an expression exists within the specified list of values.

**Syntax**

`expr IN ("value1", [, <value2>, ...])`

**Examples**

* The following expression returns "true" if the value of `srcDevice_ip` is "1.2.3.4" or any of the other specified values:

   `srcDevice_ip IN ("1.2.3.4", "2.3.4.5", "3.4.5.6")`

* The following expression returns "true" if the value of `http_response_code` equals "400" or "500"d:

   `http_response_statusCode in (400, 500)`

* The following expression returns "false":

   `null IN ("value1", "value2", "value3")`

### ipv4ToNumber

Converts an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format.

**Syntax**

`ipv4ToNumber(<ip_addr>)`

**Example**

The following expression returns "2130706433":

`ipv4ToNumber("127.0.0.1")`

### isBlank

Checks to see if a string contains text. Specifically, it checks to see if a character sequence is whitespace, empty (""), or null. It takes a single parameter and returns a boolean value: “true” if the variable is blank, or “false” if the variable contains a value other than whitespace, empty, or null.

**Syntax**

`isBlank(string)`

### isEmpty

Checks to see if a string contains no characters or whitespace, and returns a boolean value: “true” if the string contains no characters or whitespace, or “false” otherwise.

**Syntax**

`isEmpty(string)`

### isNull

Checks to see if a string is null, and returns a boolean value: “true” if the string is null, or “false” if the string is not null.

**Syntax**

`isNull(string)`

### isNumeric

Checks whether a string is a valid Java number. 

Valid numbers include hexadecimals marked with the 0x or 0X qualifier,
octal numbers, scientific notation and numbers marked with a type
qualifier, like 123L.

**Syntax**

`isNumeric("<string>")`

`isNumeric(<string_field>)`

### isPrivateIP

Checks if an IPv4 address is private and returns a boolean.

**Syntax**

`isPrivateIP("<IPv4_string>")`

**Example**

The following expression returns "true":

`isPrivateIP("192.168.0.1")`

### isPublicIP

Checks if an IPv4 address is public and returns a boolean.

**Syntax**

`isPublicIP("<IPv4_string>")`

**Example**

The following expression returns "false":

`isPublicIP("10.255.255.255")`

### isValidIP

Checks if the input string is a valid IPv4 or IPv6 address.

**Syntax**

`isValidIP("<IP_string>")`

**Examples**

* The following expression returns "true":

   `isValidIP("10.255.255.255")`

* The following expression returns "false":

   `isValidIP("127.0.500.1")`

### isValidIPv4

Checks if the input string is a valid IPv4 address.

**Syntax**

`isValidIPv4("<IP_string>")`

**Example**

The following expression returns "true":

`isValidIPv4("10.10.10.10")`

### isValidIPv6

Checks if the input string is a valid IPv6 address.

**Syntax**

`isValidIPv6("<IP_string>")`

**Example**

The following expression returns "false":

`isValidIPv6("10.10.10.10")`

### jsonArrayContains 

Returns “true” if a specified field contains a particular value. This is
equivalent to `array_contains` in the Cloud SIEM rules syntax.

**Syntax**

`jsonArrayContains(field, “value”)`

**Example**

`| where jsonArrayContains(field, “vuln_scanner”)`

### jsonArraySize 

Returns the length of a string. Returns -1 if null. This is equivalent
to `size` in the Cloud SIEM rules syntax.

**Syntax**

`jsonArraySize(field) > value`

**Example**

`| where jsonArraySize(field) > 5`

### json

Extracts values from JSON logs with selected JSONPath expressions. See
Supported JSONPath syntax elements below.

You can use the `json` operator allows to extract:

* Single, top-level fields
* Multiple fields
* Nested keys
* Keys in arrays

The primary use case for the `json` operator in Cloud SIEM match expressions is
to access unmapped message fields that are contained in the Cloud SIEM `fields`
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

* In Sumo Logic core platform, you can use the `json` operator without specifying a field to parse, in which case the operation is performed against the `_raw` field.

:::note
Currently, to use the `json` operator in Cloud SIEM you must supply a field and an alias, as shown in the syntax above. Currently, the `json` operator is the only Sumo Logic search operator that you can use an alias with in Cloud SIEM.
:::

* As part of the ingestion process, the `fields` field in Cloud SIEM is mapped to the `_raw` field in Sumo Logic core platform.  For easy copy/paste functionality, Cloud SIEM accepts `_raw` as an alias to `fields`.
* The pipe character before the first `json` clause is optional.
* You can use multiple `json` clauses in a query.
* You can use only one `where` clause per query.
* Cloud SIEM doesn’t support all of the `json` operator syntax options that Sumo Logic core platform does, but you can do things like:

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

The second query shown above is equivalent to the following Cloud SIEM syntax. 

`int(fields['packetsSent']) != int(fields['packetsReceived'])`

### length

Returns the number of characters in a string. If the string is null, it returns 0.

**Syntax**

`length(string) `

**Examples**

* The following expression returns "10":

   `length("sumo logic")`

* The following expression returns "0":

   `length(null)`

### like

Compares a string to a pattern, and returns “true” if the string matches the pattern, null if any arguments are null, and “false” otherwise. Patterns can contain regular characters as well as wildcards. Wildcard characters can be escaped using the single character specified for the `ESCAPE` parameter. Matching is case sensitive.

**Syntax**

`str like pattern [ ESCAPE 'escape_character' ]`

where:

* `str` is a string expression
* `pattern` is a string expression, which is matched literally, except for the following wildcard symbols:

    * `_` represents a single character 
    * `%` Represents zero, one, or multiple characters  

If `pattern` or `escape_character` is null, the expression evaluates to
null.

**Examples**

* The following expression returns "false":

   `null LIKE “%foo%”`


* The following expression returns "false":

   `“foo” LIKE null`

* The following expression returns "true" if the value of `bro_rdp_cookie` matches `%admin%`:

   `bro_rdp_cookie like '%admin%'`  

* In the following expression, the string `'%SystemDrive%\Users\John'` has to match the pattern `'\%SystemDrive\%\\Users%'` to return “true”.

   `'%SystemDrive%\Users\John' like '\%SystemDrive\%\\Users%'`  
 

### log

Returns the natural logarithm of the argument.

**Syntax**

`log(<x>)`

**Example**

The following expression returns "0.6931471805599453":

`log(2) `

### log10

Returns the base-10 logarithm of the argument.

**Syntax**

`log10(<x>)`

**Example**

The following expression returns "0.3010299956639812":

`log10(2)`

### log1p

Calculates log(1+x) accurately for small values of x.

**Syntax**

`log1p(<x>)`

**Example**

The following expression returns "0.09531017980432487":

`log1p(0.1)`

### luhn

Uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them.

**Syntax**

`luhn(<string>")`

**Example**

* The following expression returns "true":

   `luhn("6666-7777-6666-8888")`

* The following expression returns "false":

   `luhn("0000000000000131")`

### maskFromCIDR

A utility function that returns a subnet mask for boolean operations with IPv4 addresses.

**Syntax**

`maskFromCIDR("<prefix_length>")`

**Example**

The following expression returns "255.255.255.252":

`maskFromCIDR("30")`

### matches

Can be used to match a string to a wildcard pattern or an RE2 compliant regex. The operator returns a boolean value; the operator can be used with `where` or `if` operators.

**Syntax**

* `where <string expression> matches <pattern>`
* `where <string expression> matches /<regex>/`
* `where !(<string expression> matches <pattern>)`

:::note
`<string expression>` is case-sensitive and can be provided as a field.
:::

**Examples**

* `where foo matches "*bar*"` (This example is equivalent to `foo LIKE '%bar%'` in the Cloud SIEM rules syntax.)
* `where foo matches /.*bar.*/` (This example is equivalent to `foo RLIKE '.*bar.*'` in the Cloud SIEM rules syntax.)

### num

Casts string data to a number.

**Syntax**

`num(string)`

### number

Casts string data to a number.

**Syntax**

`number()`

### rlike

The `rlike` function returns “true” if a string matches a specified regular expression. If there is no match, the function returns “false”,

**Syntax**

`str rlike regexp`

where:

* `str` is a string expression.
* `regexp` is a Java regular expression.

**Examples**

* The following expression returns "false":

   `null RLIKE “.*foo.*”`

* The following expression returns "false":

   `“foo” RLIKE null`

* The following expression returns "true" if the value of the `dns_query` field
matches the regular expression `[A-Za-z2-7]{60,}`:

   `dns_query rlike '[A-Za-z2-7]{60,}' `

### round

Rounds the function to N decimal places. If the second argument is not
provided, it will round to the nearest integer.

**Syntax**

`round(<x> [,<y>])`

**Examples**

* The following expression returns "2":

   `round(1.5)`

* The following expression returns "1.55":

   `round(1.549, 2)`

### sin

Returns the sine of the argument in radians.

**Syntax**

`sin(<x>)`

**Example**

The following expression returns "0.8414709848078965":

`sin(1) `

### sinh

Returns the hyperbolic sine of the argument in radians.

**Syntax**

`sinh(<x>)`

**Example**

The following expression returns "1.1752011936438014":

`sinh(1)`

### size

Returns the number of elements in the input array.

**Syntax**

`size(<array_field>)`

**Example**

`size(listMatches) > 5`

### sqrt

Returns the square root of the argument.

**Syntax**

`sqrt(<x>)`

**Example**

The following expression returns "2":

`sqrt(4)`

### substring

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

* The following expression returns "world!":

   `substring("Hello world!", 6)`

* The following expression returns "Sumo":

   `substring("Sumo Logic", 0, 4)`

* The following expression returns "Sumo Logic":

   `substring("Sumo Logic", 0, 100)`

### tan

Returns the tangent of the argument in radians.

**Syntax**

`tan(<x>)`

**Example**

The following expression returns "1.5574077246549023":

`tan(1)`

### tanh

Returns the hyperbolic tangent of the argument in radians.

**Syntax**

`tanh(<x>)`

**Example**

The following expression returns "0.76159":

`tanh(1)`

### toDegrees

Converts angles from radians to degrees.

**Syntax**

`toDegrees(<x>)`

**Example**

The following expression returns "90 (asin(1) is pi / 2)":

`toDegrees(asin(1))`

### toDouble

Casts string data to the double data type.

**Syntax **

`toDouble(<field>)`

### toFloat 

Casts a string to a floating point number. This is equivalent to `float`
in the Cloud SIEM rules syntax.

**Syntax**

`float(<field>)`

### toInt 

Casts a string to an integer. This is equivalent to `int` in the Cloud SIEM
rules syntax.

**Syntax**

`int (<field>)`

### toLong

Casts string data to the long data type.

**Syntax **

`toLong(<field>)`

### toLowerCase 

Converts a string to all lower case letters. This is equivalent to lower
in the Cloud SIEM rules syntax.

**Syntax**

`toLowerCase(<string>)`

### toRadians

Converts angles from radians to degrees.

**Syntax**

`toRadians(<x>)`

**Example**

The following expression returns "3.141592653589793" (pi):

`toRadians(180)`

### toUpperCase 

Converts a string to all uppercase letters. This is equivalent to upper
in the Cloud SIEM rules syntax.

**Syntax**

`toUpperCase(<string>)`

### trim

Eliminates leading and trailing spaces from a string field.

**Syntax**

`trim(" <string expression> ")`

**Example**

The following expression returns "Hello World":

`trim("  Hello World  ")`

### urldecode

Decodes a URL you include in a query, returning the decoded (unescaped)
URL string.

**Syntax**

`urldecode("<url string>")`

**Example**

The following expression returns "http://yourmainserver-city55555.org/...iWS7o3KLdfg90&":

`urldecode("http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26")`

### urlencode

Encodes the URL into an ASCII character set.

**Syntax**

`urlencode("<url string>")`

**Example**

The following expression returns "http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26"

`urlencode("http://yourmainserver-city55555.org/...iWS7o3KLdfg90&")`

### where

Filters results based on the value of a boolean expression.  

**Syntax**

`... | where <boolean expression>`

**Examples**

* `| where jsonArrayContains(field, “vuln_scanner”)`

* `| where` can be used at the beginning of an expression, as well as on subsequent lines after another syntax element has been used to start a preceding line. For example:
   ```
   | json field=fields "foo" as alias
   | where toInt(alias) > 5
   ```