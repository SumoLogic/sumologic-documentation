---
slug: /dashboards/dashboards-migration
title: Migrate to Dashboards
description: Learn how to migrate Dashboards (Classic) to Dashboards functionality.
tags: [migration, dashboard]
---

The **Migrate to Dashboards** functionality allows you to transform **Dashboards (Classic)** to the **Dashboards** format, with minimal intervention from post-migration activity.

## Advantages

**Dashboards**

- Persistent release and update with new feature additions.
- Provides the unique ability to analyze metrics metadata and log data on the same dashboard in an integrated seamless view. This is what you need to monitor and manage a Kubernetes environment effectively.
- You can control the visual display of metric and log data.
- Streamline dashboard configuration and on-the-fly analytic visualizations with its new templating features.

## Limitations

| Incompatibility | Description |   
| :-----------------| :--------------|
| Panels | <ul><li>Incompatible panels are automatically migrated to **text** panels with all the information about the panel preserved.</li> <li>Retained information in text panel:</li> <ul> <li>Query</li> <li>Time range</li> <li>Panel title</li></ul> </ul> |
