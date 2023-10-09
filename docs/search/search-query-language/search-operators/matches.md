---
id: matches
title: matches Search Operator
sidebar_label: matches
---

The `matches` operator can be used to match a string to a wildcard pattern or an RE2 compliant regex. The operator returns a boolean value; the operator can be used with where or if operators.

Matches can be used in Dashboard Panels, and are very commonly used in conjunction with other operators to build robust queries.

## Syntax

:::important
The string expression is case-sensitive and can be provided as a field.
:::

```sql
<string expression> matches <pattern> as <field>
```

```sql
if(<string expression> matches <pattern>, <value_if_true>, <value_if_false>) as <field>
```

```sql
if(<string expression> matches /<regex>/, <value_if_true>, <value_if_false>) as <field>
```

```sql
where <string expression> matches <pattern>
```

```sql
where <string expression> matches /<regex>/
```

```sql
where !(<string expression> matches <pattern>)
```

## Rules

* Patterns use asterisks `*` as wildcards.
* Regex must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).

## Examples

### Matching with regex to filter results

See a [case insensitive parse regex example](../parse-operators/parse-variable-patterns-using-regex.md).

This example is using a regex to match certain IPv4 addresses in a parsed field named `ip`. The regex we are using is:

`12\.1[34][1-5]\.12\.12[3-7]`

A query can use this regex with the **matches** operator with a **where** or **if** operator to filter the results. With a where operator you can filter the results to return only matching `ip` addresses:

```sql
| where ip matches /12\.1[34][1-5]\.12\.12[3-7]/
```

With an if operator you can return an additional boolean field, in this example the new field will be named `ip_group` and will have a value of `1` when the `ip` matched the regex:

```sql
| if(ip matches /12\.1[34][1-5]\.12\.12[3-7]/, 1,0) as ip_group
```

### Identifying the browsers and operating systems used to access your website

Running a query containing a matches operator on Apache Access logs can show you the breakdown of the devices and browsers that are accessing your site. You can then create a Dashboard with this query. We have used a transpose operator in this query to allow us to name the axis of our column chart.

Running a search like:

```
_sourceCategory=Apache/Access
| extract "\"[A-Z]+ \S+ HTTP/[\d\.]+\" \S+ \S+ \S+ \"(?<agent>[^\"]+?)\""
| if (agent matches "*Windows NT*","Windows","Other") as OS
| if (agent matches "*Macintosh*","MacOS",OS) as OS
| if (agent matches "*iPad*","iPad",OS) as OS
| if (agent matches "*iPhone*","iPhone",OS) as OS
| if (agent matches "*Android*","Android",OS) as OS
| if (agent matches "*MSIE*","Internet Explorer","Other") as Browser
| if (agent matches "*Firefox*","Firefox",Browser) as Browser
| if (agent matches "*Safari*","Safari",Browser) as Browser
| if (agent matches "*Chrome*","Chrome",Browser) as Browser
| count(agent) by OS,Browser
| transpose row os column browser as *
```

Produces aggregate results similar to the following, when you configure it to create a [stacked column chart](/docs/dashboards/panels/column-charts):

![Matches](/img/search/searchquerylanguage/search-operators/matches.png)

### Viewing errors and warnings over time

In this example, we will run a query against Windows logs to see the distribution of errors and warnings over the previous hours. Using a timeslice operator in the query breaks the results into one-hour buckets.

Running a search like:

```sql
_sourceCategory=OS/Windows (error or warning)
| parse "Type = \"*\";" as evtType
| if (_raw matches "*EventType = Error*",1,0) as errors
| if (_raw matches "*EventType = Warning*",1,0) as warnings
| if (evtType matches "Error*",1,errors) as errors
| if (evtType matches "Warning*",1,warnings) as warnings
| timeslice by 1h
| sum(errors) as errors, sum(warnings) as warnings by _timeslice
| sort _timeslice asc
```

Produces results similar to the following, when you configure it to be visualized as a [linechart](/docs/dashboards/panels/line-charts):

![Matches Event](/img/search/searchquerylanguage/search-operators/Matches_Ex.png)

### Matching against parsed field values

The matches operator can match against your parsed fields by using the [concat](concat.md) operator to add wildcards to the necessary location of your parsed field. The following example is parsing the instance value and then concatenating wildcards to the beginning and end of the parsed field. This provides the matches operator the necessary wildcards to match against.

```sql
| parse "instance \"*\"" as instance
| concat("*", instance, "*") as instance_match
| where !(host matches instance_match)
```
