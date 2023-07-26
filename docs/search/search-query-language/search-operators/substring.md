---
id: substring
title: substring Search Operator
sidebar_label: substring
---

The `substring` operator allows you to specify an offset that will output only part of a string, referred to as a substring. You can use this operator to output just a part of a string instead of the whole string, for example, if you wanted to output an employee’s initials instead of their whole name.

## Syntax

```sql
substring(<sourceString>, <startOffset>, <endOffset>) as <outputField>
```

```sql
substring(<sourceString>, <startOffset>) as <outputField>
```

## Rules

* The `startOffset` must be a non-negative integer and less than the ength of the sourceString.
* The `endOffset` must be a non-negative integer that is equal to or greater than startOffset.
* If the `endOffset` is not specified, the substring is taken from the startOffset until the very end of the sourceString.
* The `endOffset` may be equal to or greater than the length of the sourceString, but it would behave the same as if the user did not specify an endOffset.

## Example

### Output "world!" from "Hello world!"

Use the following query to output only the word "world!" and the exclamation point from "Hello world!"

```sql
... | substring("Hello world!", 6)
```

### Output "Sumo" from "Sumo Logic"

This query would output the word "Sumo" from the company name "Sumo Logic".

```sql
... | substring("Sumo Logic", 0, 4)
```

Whereas this query would output the entire company name:

```sql
... | substring("Sumo Logic", 0, 100)
```

### Output the year from the string dateTimeString

This query would output only the year from the string dateTimeString:

```sql
... | substring(dateTimeString, 0, 4)
```

### Get an employee’s initials from their first name and last name

Use the following query to extract an employee’s initials from substrings firstName and lastName, then transform the letters to uppercase and Concat them as "initials":

```sql
| substring(firstName, 0, 1) as x
| substring(lastName, 0, 1) as y
| toUpperCase(concat(x, y)) as initials
```

### Invalid Examples

These are examples of queries that will not work with the Substring Operator:

This query will not work because the startOffset is negative:

```sql
... | substring("Hello world", -1)
```

This query will not work because numerically the endOffset is before the startOffset:

```sql
... | substring("Hello world", 3, 2)
```
