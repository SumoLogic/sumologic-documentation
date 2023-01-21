---
id: luhn
title: luhn Search Operator
sidebar_label: luhn
---

The `luhn` operator uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them. It takes a string as an input, strips out all characters that are not numerals, and checks if the resulting string is a valid credit card number, returning true or false accordingly.

## Syntax

```sql
luhn(<field>) [as <field>]
```

```sql
luhn("<input string>") [as <field>]
```

## Examples

### Identify and verify credit card numbers in message logs

Use the following query to identify credit card numbers in message logs, and verify them using the Luhn operator:

```sql
| parse regex "(?<maybecc>\d{4}-\d{4}-\d{4}-\d{4})" nodrop
| parse regex "(?<maybecc>\d{4}\s\d{4}\s\d{4}\s\d{4})" nodrop
| parse regex "(?<maybecc>\d{16})" nodrop
| if (luhn(maybecc), true, false) as valid
```

which provides results such as:

![operator example](/img/reuse/query-search/luhn_operator_example.png)

### Search for and verify a specific credit card number

Use the following query to search for a specific credit card number and verify it using the Luhn operator:

```sql
*| "6666-7777-6666-8888" as b
 | luhn(b) as d
```

It would provide the following results:

![operator example](/img/reuse/query-search/lunh_operator_example1.png)
