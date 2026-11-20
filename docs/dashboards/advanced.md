---
id: advanced
title: Best Practices for Dashboards
sidebar_label: Best Practices
description: Learn best practices for building high-performance Sumo Logic dashboards, including query optimization, panel limits, auto refresh, and throttling.
---

This page describes the recommended best practices for high-performance Sumo Logic dashboards.

- You may experience rate limiting when more than 20 queries run at the same time. Keep the number of panels under 20 for optimal dashboard performance.
- [Optimize your queries](/docs/search/optimize-search-performance/) to scan as little data as possible by using [partitions](/docs/search/optimize-search-partitions/) or the narrowest source categories. When possible, also consider using [scheduled views](/docs/manage/scheduled-views/) for optimal performance.
- For your most-viewed dashboards, enable [Auto-Refresh](/docs/dashboards/about/#auto-refresh) at a five-minute interval. This places compatible panel queries into our continuous query pipeline, allowing for nearly instant execution.

## Dashboard throttling

Sumo Logic implements multiple layers of throttling to ensure a balanced system load, which protects you and Sumo Logic from performance degradation. Throttling applies per user, as follows:

- **Panel queries**. Sumo Logic runs up to 10 panel queries at a time per user across all sessions. If a dashboard has more queries than that, the remaining queries start as earlier ones finish, so large dashboards may take longer to load. If a panel contains multiple queries, each query counts separately toward this limit.
- **Template variable queries**. Sumo Logic applies throttling to template variable queries separately, limiting them to a maximum of 10 concurrent queries per user across all sessions.
- **Scheduled export**. Sumo Logic applies throttling on scheduled exports to five concurrent jobs per user, each with a timeout of five minutes.

These throttling measures prevent performance degradation caused by spikes in load and traffic.
