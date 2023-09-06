---
id: dedup
title: dedup Search Operator
sidebar_label: dedup
---

The `dedup` operator removes duplicate results. You have the option to remove consecutively and by specific fields. This allows you to filter your results to identify the most recent or last few events based on an identical combination of results.

For example, to find the most recent value of services you'd use the following operation: `| dedup 1 by service`.

## Supported features

The `dedup` operator is supported for the following features:

* [Log Search](/docs/search)
* [Dashboards (New)](/docs/dashboards/about.md)
* [Dashboards](/docs/dashboards), including live mode
* [Scheduled Searches](/docs/alerts/scheduled-searches/schedule-search.md)

## Syntax

```sql
dedup [consecutive] [<int>] [by <field>[, <field2>, ...]]
```

| Parameter | Description | Example |
|:-- |:-- |:-- |
| consecutive | Removes duplicate combinations of values that are in succession. | Remove only consecutive duplicate events. Keep non-consecutive duplicate events. In this example, duplicates must have the same combination of values as the source and host fields for them to be removed. Non-consecutive events with the same combination of source and host fields will be retained.<br/>`... | dedup consecutive by source, host` |
| int | Specifies the number of most recent events to return. | For search results that have the same source value, keep the first three that occur and remove all subsequent search results.<br/>`... | dedup 3 by source` |
| field | A comma-separated list of field names to remove duplicate values from. If no fields are specified, the query is run against _raw, the full raw log message.<br/>For example, `| dedup` is the same as `| dedup` by _raw. | Remove duplicate search results based on _sourceCategory.<br/>`... | dedup by _sourceCategory` |

## Rules

* Non-aggregate and aggregate queries are supported.
    * non-aggregate queries process up to 100k results.
    * aggregate queries process all results.
* Use the [sort operator](sort.md) before dedup to control the order of removed results.
* Running dedup against the full raw log message is inefficient and is not recommended.
* The histogram only shows results the dedup operator returned.

## Examples

The following examples use this sample data.

| Timestamp | City | Country | Continent | Population (in millions) |
|:---|:---|:---|:---|:---|
| 05/09/2021 11:32:00 | Las Vegas | USA | North America | 2.31 |
| 05/09/2021 11:32:00 | Paris | France |   | 6.945 |
| 05/09/2021 11:30:00 | Karachi |   | Asia | 16.1 |
| 05/09/2021 11:29:00 | Chennai | India | Asia | 4.7 |
| 05/09/2021 11:28:05 | Mumbai | India | Asia | 20.7 |
| 05/09/2021 11:28:00 | Bangalore | India | Asia | 12.7 |
| 05/09/2021 11:27:00 | Florida | USA | North America | 2.4 |
| 05/09/2021 11:26:00 | Washington | USA | North America | 7.6 |
| 05/09/2021 11:25:00 | New York | USA | North America | 8.8 |
| 05/09/2021 11:24:00 | San Francisco | USA | North America | 8.5 |
| 05/09/2021 11:23:00 | Delhi | India | Asia | 11 |
| 05/09/2021 11:22:00 | Kolkata | India | Asia | 4.5 |

### Remove duplicate search results by country

```sql
| dedup by country
```

Returns the most recent record for each country:

![deup by country](/img/search/searchquerylanguage/search-operators/dedup-by-country.png)

### Keep the first 3 duplicate results

For search results that have the same country value, keep the first three that occur and remove all subsequent search results.

```sql
| dedup 3 by country
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-last-3.png)

### Keep results with same combination of values in multiple fields

For search results that have the same country AND continent values, keep the first two search results that occur and remove all subsequent results.

```sql
| dedup 2 by country, continent
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-by-two-fields.png)

### Remove only consecutive duplicate events

Remove only consecutive duplicate events. Keep non-consecutive duplicate events. In this example, duplicates must have the same combination of values as the country and continent fields for them to be removed. Non-consecutive events with the same combination of source and host fields will be retained.

```sql
| dedup consecutive by country, continent
```

Returns the following results:

![deup by 3](/img/search/searchquerylanguage/search-operators/dedup-consecutively-two-fields.png)
