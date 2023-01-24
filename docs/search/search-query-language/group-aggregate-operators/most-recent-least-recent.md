---
id: most-recent-least-recent
title: most_recent, least_recent Grouping Operators
sidebar_label: most_recent, least_recent
---

The `most_recent` and `least_recent` operators, used with the `withtime` operator, are aggregate operators that allow you to select the most recent or least recent value within a group.

The `withtime` operator is given a field and creates a JSON object with the field's value and its timestamp in milliseconds. A field is created with the format `x_withtime` that appears as part of your search results. Then the `most_recent` and `least_recent` operators are used to order your data referencing the `x_withtime` field.

The `withtime`, `most_recent`, and `least_recent` operators are not considered standalone operators; they are designed to only be used as an alternative to the [`first` and `last` operators](/docs/search/search-query-language/group-aggregate-operators/first-last) in Live Dashboards or any continuous query where first and last are not supported.

## Syntax

The field `status` is used in the following syntax expressions to represent any field.

```sql
| parse ... as status | withtime status | most_recent(status_withtime) [as <field>] by _sourcehost
```

```sql
| parse ... as status | withtime status | least_recent(status_withtime) [as <field>] by _sourcehost
```

## Rules

* Default alias field is named `_mostrecent` or `_leastrecent`

## Examples

Find the most recent visitors to our site by IP.

Say we would like to keep an eye on visitors that hit our site from different countries. This query will provide the most recent IP addresses based on the logline message time:

```sql
*ip* OR *address*
| parse regex "(?<IP>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup latitude, longitude, country_code from geo://location on ip=IP
| where !isNull(country_code)
| withtime IP
| most_recent(ip_withtime) by country_code
```

produces results like:

![Mostrecent.png](/img/search/searchquerylanguage/group-aggregate-operators/mostrecent.png)
