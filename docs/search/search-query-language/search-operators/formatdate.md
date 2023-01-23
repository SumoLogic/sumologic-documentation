---
id: formatdate
title: formatDate Search Operator
sidebar_label: formatDate
---

The `formatDate` operator allows you to format dates in log files as a string in the format you require, such as U.S. date formatting, European formatting, and timestamps. 

:::note
If you're looking to convert a date to a timestamp, use [`parseDate`](docs/search/search-query-language/parse-operators/parsedate.md).
:::

## Syntax

```sql
formatDate(<date> [, <format> [, <timeZone>]]) as <field>
```

### Returns

A date String, in US-style date format if no format is specified. The date is in the local timezone of the user if no timeZone is specified.

### Parameters

* **date** - milliseconds (13 digits), as a Long. You can also use formatDate with the [Now](now.md) operator.
* **format** - any valid date and time pattern String accepted by Java’s [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html). For more details about specifying the **format** see [Timestamps, Time  Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference.md).
* **timeZone** - a String, such as "America/Los_Angeles" or "Europe/London"

:::important
Convert the date parameter to Long if necessary. Passing a String can produce the error: "Multiple definitions found for function formatDate(String, String)." The solution is to cast the date parameter using the [toLong](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) operator.
:::

## Examples

### Date format yyyy-MM-dd

Use the following query to return results for the current date using the date format **yyyy-MM-dd**.

```sql
* | formatDate(now(), "yyyy-MM-dd") as today
```

This creates the today column, and returns the following results.

![FormatDate](/img/search/searchquerylanguage/search-operators/FormatDate.png)

### European date format** **dd-MM-yyyy

Use the following query to create a **today** column, and return the results using the European date format of day, month, year, **dd-MM-yyyy**.

```sql
* | formatDate(now(),"dd-MM-yyyy") as today
```

This returns the following results:

![EuropeanDateFormat](/img/search/searchquerylanguage/search-operators/EuropeanDateFormat.png)

### US date format with a timestamp

This example creates a **today** column and uses the US date format with a timestamp, **MM-dd-yyyy HH:mm**.

```sql
* | formatDate(now(), "MM-dd-yyyy HH:mm", "America/New_York") as today
```

Which returns results like:

![DateTimestamp](/img/search/searchquerylanguage/search-operators/DateTimestamp.png)

### Find messages with incorrect timestamps

This query allows you to find messages with incorrect timestamps.

```sql
* | formatDate(_receipttime, "MM/dd/yyyy HH:mm:ss:SSS") as receiptDate
| formatDate(_messageTime, "MM/dd/yyyy HH:mm:ss:SSS") as messageDate
| _receiptTime - _messageTime as delay
| delay / 60000 as delayInMinutes
```

This query produces results like this:

![Incorrect Timestamp](/img/search/searchquerylanguage/search-operators/IncorrectTimestamp.png)

### Determine age of log messages

This query lets you determine the age of your log messages.

```sql
* | formatDate(_messageTime, "MM/dd/yyyy HH:mm:ss:SSS") as messageDate
| formatDate(now(), "MM/dd/yyyy HH:mm:ss:SSS") as today
| now() as currentTime
| currentTime - _messageTime as messageAge
| messageAge / (60*1000) as messageAgeInMinutes
```

Which produces results like this:

![Message age](/img/search/searchquerylanguage/search-operators/MessageAge.png)

### Messages by Day of the Week

To get the day of the week from your logs, you can reference your log's timestamps, which are stored as the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_messageTime`. You can also parse out any dates in your logs and use the [formatDate](formatdate.md) operator to get the day of the week.  

Beginning with the `_messageTime` field, you can determine the day of the week, and then remove the days you don't want using the formatDate operator. This example query provides results only for Mondays:

```sql
| formatDate(_messagetime, "EEE") as day
| where day="Mon"
```

This example query provides only weekday results:

```sql
| formatDate(_messagetime, "EEE") as day
| where !(day="Sat" or day="Sun")
```

If you don't use `_messageTime`, and instead parse out another timestamp, you can convert it to milliseconds and determine the day this way:

```sql
| parseDate(parsedtime, "MM/dd/yyyy HH:mm:ss a") as inMilliseconds
```

### Format a milliseconds (13 digits) epoch value

With the following example query:

```sql
_sourceCategory=sourceCategory
| parse "] [*][*][*].[*]" as (user, datasource, session, command)
| count, min(_messageTime), max(_messageTime) by session
```

You get the following results:

| # | session | _count | _min | _max |
|:--||-|-|-|
|  1     | 7oEmE+KLpk1nVYpF | 22          | 1.35844e+12 | 1.35844e+12 |
|  2     | 6uklr9UDkTOg79je | 412         | 1.35844e+12 | 1.35844e+12 |
|  3     | q0K6ztX9IvpZWh1p | 18          | 1.35844e+12 | 1.35844e+12 |

In the results, the **`_min`** and **`_max`** values are displayed as an epoch value. You can format these epoch values into a readable date with an experimental operator, **`toLong`**.

* [toLong](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) casts the data into a Long data type as milliseconds.

Normally, to convert the epoch time into a date formatted string you'd do something like this:

```sql
* | formatDate(_messagetime, "``MM-dd-``yyyy`` HH:mm:ss") as myDate
```

However, in the case where you are using **Min** and **Max** to get the first and last values, you also need to convert the return value to a "Long" value type using the experimental [toLong](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) operator. This is because when you run the **Min** and **Max** operators, the return value gets reformatted as a "Double" value type that the formatDate operator can't read.

```sql
* | count, min(_messagetime) as mindate | formatDate(toLong(mindate))
```

For the given example, the following query gets the proper date/time values in the results:

```sql
_sourceCategory=sourceCategory
| parse "] [*][*][*].[*]" as (user, datasource, session, command)
| count, min(_messagetime) as mindate, max(_messagetime) as maxdate by session
| formatDate(toLong(mindate),"MM-dd-yyyy HH:mm:ss:SSS") as mindate
| formatDate(toLong(maxdate),"MM-dd-yyyy HH:mm:ss:SSS") as maxdate
```

### Format a seconds (10 digits) epoch value

If your timestamp is a normal Unix timestamp it is in seconds since January 1, 1970 at 00:00:00 GMT. The formatDate operator requires your timestamp to be in milliseconds. Therefore, you need to convert by multiplying by 1,000 since there are 1,000 milliseconds in a second.

```sql
...
| toLong(eventTimeInEpochSeconds * 1000) as eventTimeInEpochMs
| formatDate(eventTimeInEpochMs, "MM-dd-yyyy") as eventTimeHuman
```
