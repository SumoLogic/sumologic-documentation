---
id: advanced
title: Best Practices
sidebar_label: Best Practices
description: Learn about some of the Best Practices feature in Dashboard usage.
---

This page describes the recommended best practices for high performance Dashboards.

- Rate limiting may be experienced when there are more than 20 concurrent queries. Limiting the number of panels to below 20 will ensure optimal performance for your dashboards. 
- [Optimize your queries](/docs/search/optimize-search-performance/) to scan the least amount of data by using [partitions](/docs/search/optimize-search-partitions/) and/or the most narrow source categories. When possible, also consider using [Scheduled View(s)](/docs/manage/scheduled-views/) to ensure optimal performance.
- For most viewed dashboards, enable [Auto-Refresh](/docs/dashboards/about/#auto-refresh) at a five-minute interval. This places compatible panel queries into our continuous query pipeline, allowing for nearly instant execution.

## Dashboard Throttling

Sumo Logic implements multiple layers of throttling to ensure a balanced system load, which protects you and Sumo Logic from performance degradation. The throttling mechanism is applied on a per-user basis and is as detailed below:

- **Panel queries**. Sumo Logic limits concurrency to 10 queries per user, to a maximum of two nodes per user across all sessions. It's important to note that if a panel contains multiple queries, each query will be counted separately towards the concurrency limit.
- **Template variable queries**. Sumo Logic applies throttling to template variable queries separately, limiting them to a maximum of 10 concurrent queries per user across all sessions.
- **Scheduled export**. Sumo Logic applies throttling on scheduled exports to five concurrent jobs per user, each with a timeout of five minutes.

By implementing these throttling measures, you can prevent performance degradation due to spikes in load and traffic.
