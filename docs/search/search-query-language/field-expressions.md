---
id: field-expressions
title: Field Expressions
sidebar_label: Field Expressions
description: Overview of the expressions that create user-defined numeric, boolean, or string fields.
---

The Sumo Logic Query Language can be used to create fields based on calculated expressions, such as:

```sql
| 3 + 2 as val
| "Hello, world" as welcome
| 34 % 10 as remainder
```

Expressions are created by literal values, field names, or search query language operators acting as functions, such as [`concat()`](/docs/search/search-query-language/search-operators/concat) or `pow()`. Fields created in this way appear in results as virtual columns with the same value on each row, and they can be used in where and other clauses.

Expressions can be used to create fields that are Numeric, Boolean, or String values.

## Numeric Expressions

Numbers can be calculated using combinations of addition, subtraction, multiplication, division, modulo, and unary negation. Operators like "+" or "/" can be applied to numeric literals, numeric fields, operators that act as numeric functions (such as `abs()` or `pow()`), or nested numeric expressions. For more information about numeric functions, see [Math Expressions](/docs/search/search-query-language/math-expressions).

## Numeric Literals

In our Query Language, a number, or numeric literal, is a set of digits containing no spaces, with an optional decimal point. Commas are not allowed, and leading and trailing zeros are ignored.  We also allow scientific notation using "e+" or "e-" to divide the number from the exponent. Here are some examples of simple numeric literals:

```sql
| 537 as a
| 3.14e+4 as bigpi
| -42.300 as b
```

It is worth noting that a leading "-" is a unary negation and is treated formally like a "+" or "/" operator.

Numeric literals may optionally end with a suffix. There are two available types: size and time.

## Size suffix 

This is a shorthand way to express scalar numeric values multiplied by common factors. Some examples of size suffixes:

```sql
| 2k as twoThousand
| 1B as oneBillion
| 1.5M as onePointFiveMillion
| sizeBytes / 1Gi as sizeInGiB
| sizeInKiB * (1Ki / 1Mi) as sizeInMiB
```

The list of supported suffixes, and the factor by which they multiply the numeric value, is below. Suffixes are case-sensitive. Both SI-style (1000-based) and ISO/IEC 80000-style (1024-based) suffixes are supported.

| Suffix | Factor      | Suffix | Factor       |
|:------------|:------------------|:------------|:------------------|
| K or k     | 1000             | Ki         | 1024             |
| M          | 1000000          | Mi         | 1048576          |
| G or B     | 1000000000       | Gi         | 1073741824       |
| T          | 1000000000000    | Ti         | 1099511627776    |
| P          | 1000000000000000 | Pi         | 1125899906842624 |

## Time suffix

This is used to represent units of time. **The base unit of time returned is the millisecond**. For example, 1.5s would be returned as 1,500. One and a half seconds converted to the base unit of milliseconds. Some examples of time suffixes:

```sql
| 1w as oneWeek
| 1m as oneMinute
| 1.5s as oneAndAHalfSeconds
| 1d as day
| 1h as hour
```

The following time suffixes are supported:

| Suffix | Time    |
|:------------|:-------------|
| ns         | Nanosecond  |
| us         | Microsecond |
| ms         | Millisecond |
| s          | Second      |
| m          | Minute      |
| h          | Hour        |
| d          | Day         |
| w          | Week        |

## Arithmetic Operators

Numeric expressions are evaluated using the usual precedence rules:
parentheses, multiplication, and division, then addition and
subtraction. Equal precedence is evaluated left to right. Here are some examples:

```sql
| 537 + 435 as value
| 52 * 6 - 2  as noparen // 310, not 208
| 52 * (6 - 2) as paren  // 208, not 310
| 15 - -5 as sq
| 334 % 10 as remainder
```

An expression can involve a series of operations. 

```sql
| 537 + 435 + 39 + 18.5 as value
| 22 - (34 % 10) * pow(2, 3) as value
```

Dates are not recognized. The string 2015-03-15 is not a date, it is 1,997. And 3/15/2015 is not a date, it is 9.92556e-1. There is no way to express a literal date in the query language.

The modulus operator "%" produces the remainder of a division. For example, 44 % 10 = 4, because 44 / 10 is 4, remainder 1. 39 % 3 = 0 because 39 / 3 is 13 with no remainder. The expression n % 2 = 0 is true for all even numbers.

Use the pow operator to calculate an exponent. The operator "^" is not recognized by the query language. To raise 2 to the power of 8, instead of writing 2^8, use: pow(2, 8). If the base is 10, you can use scientific notation: pow(10, 3) == 1.0e+3.

## Boolean Expressions

Boolean expressions, those that evaluate to true or false, can be assigned to fields as well. The words “true” and “false” act as if they were reserved. Use the "!" to mean boolean “not.” Examples:

```sql
| true as yes
| false as locked
| !false as a      // sets a to true
```

### Comparison Operators

Comparison operators include equals ("=" or "=="), >", "\<", "\>=", "\<=", "\<\\>" (or "!=") and produce Boolean values. Examples:

```sql
| x = 2 as duo            // same as x == 2 as duo
| y >= 49 as older
| field <> 0 as nonzero
| !(2 == field) as value  // value is true if 'field' is not 2
```

Remember that x = y is a Boolean expression, not an assignment. The expression is true if x equals y, and otherwise false. String comparisons are case sensitive. To assign the value of y to a variable named x, use this syntax: y as x.

## String Expressions and Quotes

Characters quoted with double quotes (not single quotes) are string literals. Use a backslash to escape double quotes in the string. Examples:

```sql
| "Don’t forget" as reminder
| "They said, \"No later than 10\"" as response
| "Hello, \"Sue,\" if that is your name" as greeting
| concat("Hello, ", "world") as welcome
```

Use string functions, such as [concat()](/docs/search/search-query-language/search-operators/concat), to combine strings. There are no string operators like "+" or ".". The [`format()`](/docs/search/search-query-language/search-operators/format) operator can create string fields in a specified format. Use [`substring()`](/docs/search/search-query-language/search-operators/substring) to extract portions of a string.
