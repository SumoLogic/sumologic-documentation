---
id: format
---

# format

The **Format** operator allows you to format and combine data from
parsed fields. Numbers, strings, and dates can be formatted into
a user-defined string. This allows data in logs, such as dates or
currency amounts, to be formatted as human readable, when otherwise it
would be hard to decipher.

The [Concat](concat.md "concat") operator is a simpler version of the
[Format](./format.md "format") operator, and may be used instead for
simpler use cases.

### Syntax

* `format\<formatSpecifie\>,\<field\>[,\<field\>,\<``field\>, ...]``) as\<fiel\>`

The Sumo Logic Format operator supports all Java String.format syntax,
as defined
in [docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax "https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax")

### Rules

* The first argument to the Format operator must be a format
    specifier, which is a string.
* You must define a name for the new field to use Format. There is no
    default alias.
* The operator allows up to 16 input fields to format. To use more
    than 16 inputs, you can combine operators.
* AND and OR are not supported
* If a field is null or incompatible, an error will be thrown.
* Use the Format operator after the aggregate.
* You must convert your data type to numeric before converting to
    hexadecimal, or your data will be dropped.

### Examples

##### Format two strings into one string

In this query, we search for errors, then parse the field
“fiveMinuteRate” as “rate”, then combine the text “Five Minute Rate is
:” and the rate together as “formattedVal”.

`error  | parse "fiveMinuteRate=*," as rate  | format("%s : %s","Five Minute Rate is :" , rate) as formattedVal`

which results in:

![Format](../../static/img/Search-Query-Language/Search-Operators/format/Format.png)

##### Format numbers

You can format big decimals, this one sets up to 20.

`| format( "%.20f",number) as bigDecimal`

This query allows you to format number fields from a message log into a
properly formatted, human-readable currency amount.

`| format( "$%.2f",number) as currency`

This query does the same but also places thousands separators.

`| format("$%,.2f",number)  as currency`

##### Formatting dates

Use the following query to format fields in a message log into a
readable date.

`| parse “*-*-*” “as year, month, day | format (“%d/%d/%d”, month, day, year) as date`

##### Convert strings to uppercase

Use this format specifier to convert strings to uppercase:

`| format("%S: %d", name, age) as personAge`

##### Convert numeric data to hexadecimal

For example, to convert a field, collectorId, to 16 character uppercase
hexadecimal:

`| int(collectorId) as collectoridint |  format("%016X", collectoridint) as collectoridhex | count by collectorId, collectoridint, collectoridhex`

##### Format a single value with a symbol, like percent, at the end

In this query, we have a single value, like the average cache miss
percentage, and we add a "%" to the end.

`| format("%.3f %s", avg_cache_miss_pct,"%") as avg_cache_miss_pct`

For more options, see [toLowerCase and
toUpperCase](toLowerCase-and-toUpperCase.md "toLowerCase and toUpperCase").
