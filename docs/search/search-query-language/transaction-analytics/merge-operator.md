---
id: merge-operator
title: Merge Operator
---



The Merge operator reduces a stream of events to a single event using a specified merge strategy. It is particularly useful as a subquery for the [Transactionize](transactionize-operator.md) operator. Each field can have a different merge strategy:

* takeDistinct - summarize the field using only distinct values
* takeFirst - summarize the field using the earliest value
* takeLast - summarize the field using the latest value
* join with *separator* - reduce the field by combining all values into a single string with the specified separator between each value. If no separator is specified a new line is used.

## Syntax

* `merge`  

    Merge [_raw](/docs/search/get-started-with-search/search-basics/built-in-metadata) values and separate them with newlines. Adds a Time field containing the earliest timestamp.

* `merge <field>`   

    Merge values of the named field and separate them with newlines.

* `merge <field> [<strategy>] [as <field>]`  

    Merge values of the named field using the specified strategy and specify a new name for the field.

* `merge <field> [<strategy>] [as <field1>] [,<field> [<strategy>] [as <field2>] ]...`   

    Merge a comma-delimited list of fields with separate merge strategies. When no strategy is specified, join with new lines is implied.

## Limitation

* The [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_messageTime` can only use strategies takeFirst and takeLast.

## Examples

The following query:

```sql
*  | parse "BytesSentPersec = \"*\"" as BytesPersec
| merge BytesPersec join with "--", _messageTime takeLast
```

produces a result something like this:

![example](/img/reuse/query-search/merge_join_result.png)

A common case for using the merge operator with the [`transactionize`](transactionize-operator.md) operator is when all log messages have a common field, such as **`transaction_id`** or **`request_id`**. Using the `merge` operator with `transactionize` merges all the messages with the common fields, for example:

```sql
_sourceCategory=travelweb
| parse regex "(?<ip>[0-9]+\.[0-9]+\.[0-9]+\.[0-9]) - "
| transactionize ip (merge ip takeFirst, _raw join with "\n\n\n")
```

Which provides results like the following. Notice that all the logs from the same IP are now grouped in one record.

![example](/img/reuse/query-search/merge_transactionize_example.png)
