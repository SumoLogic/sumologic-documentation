---
id: join
title: join Search Operator
sidebar_label: join
---

The `join` operator combines records of two or more data streams. Results are admitted on-the-fly to allow real time tables to be built. Values common to each table are then delivered as search results. The join operator in Sumo Logic works much like an <a href="https://en.wikipedia.org/wiki/Join_(SQL)#Inner_join">inner SQL join</a>.

## Syntax

```sql
... | join
(parse "starting stream from *" AS a) as t1,
(parse "starting search * from parent stream *" AS b, c) as t2,
(parse "starting save * from parent stream *" AS d, e) as t3
on t1.a = t2.c
and t1.a = t3.e
```

A `timewindow` can be added to constrain how far apart in time records
are allowed to join, using the following syntax:

```sql
... | join
(parse "starting stream from *" AS a) as t1,
(parse "starting search * from parent stream *" AS b, c) as t2,
(parse "starting save * from parent stream *" AS d, e) as t3
on t1.a = t2.c
and t1.a = t3.e
[timewindow 10m]
```

To operate on fields in each table after the ON clause, use this syntax:

```sql
... | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
| fields t1_a, t2_b
```

## Rules

* Two or more tables must be created for a query.
* The join expression can not specify a [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) (scope), if provided it is ignored.
* Data must be present in the time range you choose for the query.
* Join can be used in Dashboard Panels, but in the query they must be included after the first `group-by` phrase.
* [Subqueries](/docs/search/subqueries) are supported, and can include aggregate operators.

### Limitations

* There is a limit of 50,000 messages input in total, which is enforced as 25,000 per table for a join operation between two tables. If you go over this limit, you will receive an error message. 
* There is a limit of 10 million messages output in total, as it is possible to have more output messages than input messages from the two tables you may be performing a *join* on. If you go over this limit, you will receive the following error message: 

    `The number of output messages exceeds 10,000,000. Please refine your search or shorten the time range to reduce the number of output messages.`

* Only conjunctive conditions (AND) are allowed. Using NOT or OR conditions is not supported.
* [Real Time Alerts](/docs/alerts/scheduled-searches/create-real-time-alert.md) don't support the join operator.
* The join operator uses sliding windows to store candidates for joins in order to prevent unbounded memory usage when joining between two large relations. Because of this, the result of the join could be incomplete and inconsistent from run-to-run.
* The following conditions are not currently supported in the ON clause:

    ```
    t1.a = 3
    t1.a != t2.c
    NOT t1.a
    t1.a = t2.c OR t1.b = t2.d
    ```

## Examples

### Running a Join operator query

For this example, run a Join query on two tables using logs that look like:

```
starting stream from stream-2454
starting stream from stream-7343
starting search search-733434 from parent stream stream-2454
starting search search-854343 from parent stream stream-7343
starting stream from stream-6543
starting search search-455563 from parent stream stream-6543
starting search search-32342 from parent stream stream-7343
```

Running a query like:

```sql
* | join
(parse "starting stream from *" AS a) AS T1,
(parse "starting search * from parent stream *" AS b, c) AS T2
on T1.a = T2.c
```

returns results similar to:

| a | b | c |
| :-- | :-- | :-- |
| stream-2454 | search-733434 | stream-2454 |
| stream-7343 | search-854343 | stream-7343 |
| stream-7343 | search-32342  | stream-7343 |
| stream-6543 | search-854343 | stream-6543 |

### Performance

The join operator can consume significant processing time. Selectivity
reduces the number of log messages that must be considered. To improve
join operator performance, place the parse operators toward the start of
the query expression, bringing the search anchors to the front of the
search scope, as in this example:

```
("starting stream from" OR "starting search") | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c...
```

### Using Join with a Diff operator

Let’s say our logs look something like:

```
event=login session=12345 time=20130512
event=purchase session=12345 value=50
event=login session=23456 time=20130513
event=purchase session=12345 value=100
event=purchase session=23456 value=120
event=purchase session=23456 value=200
event=purchase session=23456 value=20
```

Running a query like:

```sql
* | join
(parse "event=login session=* time=*" AS s1,time) as t1,
(parse "event=purchase session=* value=*" AS s2, v2) as t2
on t1.s1 = t2.s2
```

Produces results similar to:

| s1 | time | s2 | v2 |
| :-- | :-- | :-- | :-- |
| 12345  | 20130512 | 12345  | 50     |
| 12345  | 20130512 | 12345  | 100    |
| 23456  | 20130513 | 23456  | 120    |
| 23456  | 20130513 | 23456  | 200    |
| 23456  | 20130513 | 23456  | 20     |

Adding a Diff operator, such as:

```sql
* | join
(parse "event=login session=* time=*" AS s1,time) as t1,
(parse "event=purchase session=* value=*" AS s2, v2) as t2
on t1.s1 = t2.s2
| diff t2_v2 by t2_s2
```

produces results similar to:

| s1 | time | s2 | v2 | _diff |
| :-- | :-- | :-- | :-- | :-- |
| 12345  | 20170512 | 12345  | 50     | null       |
| 12345  | 20170512 | 12345  | 100    | 50         |
| 23456  | 20170513 | 23456  | 120    | null       |
| 23456  | 20170513 | 23456  | 200    | 80         |
| 23456  | 20170513 | 23456  | 20     | -180       |

In another example with diff, running a query such as:

```sql
_sourceCategory=[sourceCategoryName] | join
(parse "Attempting to execute task *. delay: * ms." as taskId, delay) as t1,
(parse "Completed execution of task *. Execution duration: * s" as taskId, duration) as t2
on t1.taskId = t2.taskId
| diff t1_delay as delay_diff
| fields t1_taskId, t1_delay, delay_diff, t2_duration
```

Produces results in the **Aggregate** tab like:

![NewAggregation.png](/img/search/searchquerylanguage/search-operators/NewAggregation.png)

### Operate on fields after the ON clause

Assume you have a Join query, such as:

```sql
* | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
```

After the Join statement, to use the T1.a and the T2.b fields in subsequent clauses, you'd instead refer to them as T1_a and T1_b. For example, to use the [fields operator](fields.md) to single out the T1.a and T2.b values, use the following query:

```sql
* | join
(parse "starting stream from *" AS a) AS t1,
(parse "starting search * from parent stream *" AS b, c) AS t2
on t1.a = t2.c
| fields t1_a, t2_b
```
