---
id: concat
title: concat Search Operator
sidebar_label: concat
---

The `concat` operator allows you to concatenate or join multiple strings, numbers, and fields into a single user-defined field. It concatenates strings end-to-end and joins them into a new string that you define. For example, to concatenate the words "foot" and "ball" would give you "football". You can also use punctuation and spaces in quotes to concatenate strings in a readable way.

In another example, a log message has a table with the elements of a mailing address, but separated into different fields such as `Street_Number`, `City`, `State`, and `Zip_Code`. You can use the concatenate operate to assemble the fields into a new field called `Mailing_Address` for a customer.

In another example, if you had a log message of an incident with four fields, such as `Signature_Name`, `Vendor_Signature`,
`Incident Detail_URL`, and `Analyst_Assessment` that you wanted to combine into a single field (a single string) called `Event_Detail`, the concatenate operator would also allow you to do this.

## Syntax

```sql
concat(<field1>, <field2>[, <field3>, ...]) as <field>
```

## Rules

* You must define a name for the new field to concatenate the named fields. There is no default.
* You can use punctuation and spaces in quotes to concatenate strings in a readable way.
* A null field is treated as an empty string.
* The operator allows 2 to 16 input fields. To use more than 16 inputs, you can combine operators. See example.
* AND and OR are not supported.

## Examples

### Concatenate fields with and without punctuation

If you had the following fields: field1 = time, field2 = 4, field3 = logs.

Using this query:

```sql
... | concat(field1, field2, field3) as new_string
```

would return: `new_string = time4logs`

If you add punctuation and spaces in quotes, like this:

```sql
... | concat(field1, " ", field2, " ", field3) as new_string
```

you'd get: `new_string = time 4 logs`

### Concatenate fields to create an IP Address

In this example, to create an IP address out of separate message log
fields, concatenate four number fields with punctuation to complete a
new field named `ip_address`.

```sql
... | concat(octet1, ".", octet2, ".", octet3, ".", octet4) as ip_address
```

### Concatenate first and last names

In this example, you'd concatenate fields for a first and last name
to create a new field called **fullName**.

```sql
... | concat(firstName, " ", lastName) as fullName
```

### Formatting dates

You can use the Concat operator to format dates, as shown:

```sql
... | concat(month, "/", day, "/", year) as date
```

### Concatenate more than 16 inputs

To use more than 16 inputs with the concat operator, you can combine operators, using one of the following formats:

```sql
... | concat(field1, field2, ...) as b
| concat(b, field17, field18,...) as c
| ...
```

```sql
... | concat(concat(field1, field2, ...), field17, field18,...) as concatenated_fields
```

## Formatting strings

For information on formatting strings, see the [`format`](format.md) operator.
