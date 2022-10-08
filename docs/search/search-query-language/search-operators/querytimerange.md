---
id: querytimerange
title: queryTimeRange Operator
sidebar_label: queryTimeRange()
---



## queryTimeRange()

The queryTimeRange() operator returns the time duration for the query being executed in milliseconds. You can use it to establish time ranges for your continuous queries (CQs). This is a preferred operator for queries that are run in live dashboards or real time scheduled searches since it is more accurate than <a href="#queryStartTime">queryStartTime()</a> and <a href="#queryEndTime">queryEndTime()</a> operators in these cases.


**Syntax**

```sql
queryTimeRange() as <field>
```

**Rules**

* An alias is required.

**Examples**

To get the range of time for your query:

```sql
error
| queryTimeRange() as range
```
