---
id: now
title: now Search Operator
sidebar_label: now
---

The `now` returns the current epoch time in milliseconds. It can be used with the formatDate operator to get the formatted current time.

It is important to note that the Now operator outputs the exact time (down to the millisecond) each and every time it is executed. This means that if you use now with every message in a search, it will return slightly different results in every message, as messages are not all processed by your search at once.

## Syntax

```sql
now()
```

## Examples

### Return the current date

This query returns a long version of the current date and time in milliseconds.

```sql
* | now() as current_date
```

Which returns results similar to:

![Current date](/img/search/searchquerylanguage/search-operators/CurrentDate.png)

### Return the current date using formatDate

Use the following query with formatDate to return results for the current date formatted as YYYY-MM-dd.

```sql
* | formatDate(now(), "YYYY-MM-dd") as today
```

This returns the following results.

![Today](/img/search/searchquerylanguage/search-operators/Today.png)

For more examples, see [formatDate](formatdate.md) operator.
