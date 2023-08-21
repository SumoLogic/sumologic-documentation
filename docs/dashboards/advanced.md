---
id: advanced
title: Advanced Features
sidebar_label: Advanced Features
description: Learn about some of the advanced feature in Dashboard.
---

This page describes advanced features in Dashboards.

## Dashboard Throttling

Sumo Logic implements multiple layers of throttling to ensure a balanced system load, which protects you and Sumo Logic from performance degradation. The throttling mechanism is applied on a per-user basis and is as detailed below:

- **Panel queries**. Sumo Logic limits concurrency to 10 queries per user, to a maximum of two nodes, and across all sessions. It’s important to note that if a panel contains multiple queries, each query will be counted separately towards the concurrency limit.
- **Template variable queries**. Sumo Logic applies throttling to template variable queries separately, limiting them to a maximum of 10 concurrent queries per user across all sessions.
- **Scheduled export**. Sumo Logic applies throttling on scheduled exports to five concurrent jobs per user, each with a timeout of five minutes.

By implementing these throttling measures, you can prevent performance degradation due to spikes in load and traffic.