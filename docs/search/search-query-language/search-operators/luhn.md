---
id: luhn
title: luhn Operator
sidebar_label: Luhn
---



The luhn operator uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them. It takes a string as an input, strips out all characters that are not numerals, and checks if the resulting string is a valid credit card number, returning true or false accordingly.

## Syntax

```sql
luhn(<field>) [as <field>]
```

```sql
luhn("<input string>") [as <field>]
```

**Examples**

#### Identify and verify credit card numbers in message logs

Use the following query to identify credit card numbers in message logs, and verify them using the Luhn operator:

```sql
| parse regex "(?<maybecc>\d{4}-\d{4}-\d{4}-\d{4})" nodrop
| parse regex "(?<maybecc>\d{4}\s\d{4}\s\d{4}\s\d{4})" nodrop
| parse regex "(?<maybecc>\d{16})" nodrop
| if (luhn(maybecc), true, false) as valid
```

which provides results such as:

![operator example](/img/reuse/query-search/luhn_operator_example.png)

#### Search for and verify a specific credit card number

Use the following query to search for a specific credit card number and verify it using the Luhn operator:

```sql
*| "6666-7777-6666-8888" as b
 | luhn(b) as d
```

It would provide the following results:

![operator example](/img/reuse/query-search/lunh_operator_example1.png)




## Manually cast data to string or number

Most data in Sumo Logic is stored as a string data type. Metadata fields are stored as string data and parsed fields are by default parsed as string type data. Sumo Logic will implicitly cast string data to a number type assuming it is clear that you need a number to perform an action, such as a math calculation or when using a function like sum or avg. However, if there is any ambiguity about whether a number is required, the data remains string data.

This detail can be important when you are building queries. There are at least two cases where you will need to manually cast string data to a number so that you get the results that you expect:

* When using the **where** operator to match integers like this:
    * **where** value **in** (integer_value1, integer_value2, integer_value3)
    * **where** value **not in** (integer_value1, integer_value2, integer_value3)
* When you need to numerically sort a series of results from a query,
    like in this example:

    ```sql
    * | parse "took *ms" as duration | toLong(duration) | sort by duration
    ```

In the first case, if your statement looks something like "where some_value in (1, 2, 4, 16)" and you need to match (or not match) integers, then you will first need to cast "some_value" to a number.

In the second case, the results will sort out of order as text values if you don't first cast the field "duration" to a number. After the field is cast to a number type, the sort order will produce expected results.

Sumo Logic accepts these functions for casting string data to a number:

* `num()` or `number()`
* `toLong()`

You can use the function `toString()` to cast data to a string.

When casting a field, remember to separate the casting statement with a pipe, like this:

```sql
* | parse "OSload *ms" as boot_time | number(boot_time)
```
