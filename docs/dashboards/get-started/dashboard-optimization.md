---
id: dashboard-optimization
---

# Dashboard Optimization

Optimization improves the efficiency of Dashboard searches. 

Sumo automatically optimizes a dashboard panel if it loads continuously for five minutes. If you pause a query before five minutes has elapsed, and then resume it, the timer restarts.

When a query has loaded for five minutes without completing, Sumo creates a scheduled view for the query, and modifies the query to use that view. Queries that were created with a scheduled view are considered to be already optimized, so Sumo does not attempt additional optimization.

## Optimization icons

The icon in the upper right corner of each Dashboard Panel shows the current optimization status of that Panel.

| Icon  | Description |
|:--|:--|
| ![icon_info.png](/img/dashboards/icon_info.png) | No optimization errors. Click the icon to display information about the Panel. |
| ![icon_caution_25x23.png](/img/dashboards/icon_caution.png) | The Panel can’t be optimized. |

## Optimization timeslice and time range requirements 

* Timeslice—The timeslice must be a factor or multiple of 15. For example:

  * If less than 15 minutes: 1m, 3m, 5m
  * If greater than 15 minutes: 15m, 30m, 45m, 60m, 75m, and so on.

* Timerange—The time range on the dashboard panel must be at least 1 one hour.

## Optimization limitations

There are some limitations on what types of queries can be optimized in an interactive dashboard.

In an aggregate query only, the following group by functions are supported:

* count
* min
* max
* sum
* avg

Before the first group by, only the following operators are supported:

* Extract
* Parse
* Json
* KeyValue
* Filter
* Where
* Fields
* Timeslice

There is no restriction on the operators after the first group by. For
example, you can add lookup after the first group by function, but not
before.
