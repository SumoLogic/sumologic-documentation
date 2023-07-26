---
id: contains
title: contains Search Operator
sidebar_label: contains
---

The `contains` operator compares string values of two <a href="/docs/search/search-query-language/parse-operators">parsed</a> fields and returns a boolean result based on whether the second field's value exists in the first.


## Syntax

```sql
contains(<field1>, <field2>) as <field>
```

```sql
<field1> contains <field2> as <field>
```

```sql
| where <field1> contains <field2>
```

```sql
| where contains(<field1>, <field2>)
```

## Rules

* Requires field values to be strings. You may [cast values](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) if needed.
* The full string of field2 must exist within field1.
* Comparison is case sensitive.
* Returns `true` when the value from field2 was found and `false` when the value was not found in field1.
* Returns `true` if field1 and field2 are empty, and `false` when only one is empty.

## Example

Given the following example log:

```
instance of alertNotification{ EventIdentifier = 100; Address = 123 Main Street, San Francisco, California; City = San Francisco; State = CA;}
```

Parsing the log so the fields are `city` with the value "San Francisco" and `address` with the value "123 Main Street, San Francisco, California" you'd use the contains operator to return the log if the value of `city` is found in the value of `address`.

```sql
| where contains(address, city)
```
