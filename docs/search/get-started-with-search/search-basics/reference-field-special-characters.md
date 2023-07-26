---
id: reference-field-special-characters
title: Reference a Field with Special Characters
description: Solution to reference a field name that contains a special character.
---



The Sumo Logic query language allows alphanumeric characters and underscores for field names, with the exception of starting a field name with a number. In cases where a field name contains special characters, you need to escape the field name by using the following syntax when calling the field in the query:

`%\<field_nam\>"`

For example:

```sql
| keyvalue regex " ([A-Z_-]+?)='([^']+?)'" keys "TYPE", "CHANNEL", "DOCUMENT-URI"
| count by %"document-uri"
```

:::tip
You can create a field with the `as` operator.
:::

## Limitations

You don't need to escape field names that:

* have characters matching `a-zA-Z0-9_.`
* don't begin with a number or `.` (dot)
* don't have more than one `.` (dot) together

Escaping field names with the syntax `%\<field_nam\>"` is a safe practice when using special characters. You will need to escape any quote characters `"` with a backslash `\` to use them in the field name when referencing a field with special characters.
