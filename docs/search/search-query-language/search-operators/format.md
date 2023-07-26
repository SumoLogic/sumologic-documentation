---
id: format
title: format Search Operator
sidebar_label: format
---

The `format` operator allows you to format and combine data from parsed fields. Numbers, strings, and dates can be formatted into a user-defined string. This allows data in logs, such as dates or currency amounts, to be formatted as human readable, when otherwise it would be hard to decipher.

The [`concat`](concat.md) operator is a simpler version of the Format operator, and may be used instead for simpler use cases.

## Syntax

```sql
format(<formatSpecifier>, <field1>[, <field2>, <field3>, ...]) as <field>
```

The Sumo Logic Format operator supports all Java String.format syntax, as defined in [Oracle's Formatter](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax)

## Rules

* The first argument to the Format operator must be a format specifier, which is a string.
* You must define a name for the new field to use Format. There is no default alias.
* The operator allows up to 16 input fields to format. To use more than 16 inputs, you can combine operators.
* AND and OR are not supported
* If a field is null or incompatible, an error will be thrown.
* Use the Format operator after the aggregate.
* You must convert your data type to numeric before converting to hexadecimal, or your data will be dropped.

## Examples

### Format two strings into one string

In this query, we search for errors, then parse the field “fiveMinuteRate” as “rate”, then combine the text “Five Minute Rate is :” and the rate together as “formattedVal”.

```sql
error
| parse "fiveMinuteRate=*," as rate
| format("%s : %s","Five Minute Rate is :" , rate) as formattedVal
```

which results in:

![Format](/img/search/searchquerylanguage/search-operators/Format.png)

### Format numbers

You can format big decimals, this one sets up to 20.

```sql
| format( "%.20f",number) as bigDecimal
```

This query allows you to format number fields from a message log into a
properly formatted, human-readable currency amount.

```sql
| format( "$%.2f",number) as currency
```

This query does the same but also places thousands separators.

```sql
| format("$%,.2f",number)  as currency
```

### Formatting dates

Use the following query to format fields in a message log into a readable date.

```sql
| parse “*-*-*” “as year, month, day | format (“%d/%d/%d”, month, day, year) as date
```

### Convert strings to uppercase

Use this format specifier to convert strings to uppercase:

```sql
| format("%S: %d", name, age) as personAge
```

### Convert numeric data to hexadecimal

For example, to convert a field, collectorId, to 16 character uppercase hexadecimal:

```sql
| parse “*-*-*” “as year, month, day
| format (“%d/%d/%d”, month, day, year) as date
```

### Format a single value with a symbol, like percent, at the end

In this query, we have a single value, like the average cache miss percentage, and we add a "%" to the end.

```sql
| format("%.3f %s", avg_cache_miss_pct,"%") as avg_cache_miss_pct
```

For more options, see [`toLowerCase` and `toUpperCase`](/docs/search/search-query-language/search-operators/tolowercase-touppercase).
