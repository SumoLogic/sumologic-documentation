---
id: query-comments
title: Using Comments in Metric Queries
sidebar_label: Using Comments in Queries
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In the Metrics Explorer, in [Advanced Mode](/docs/metrics/metrics-queries/metrics-explorer#Switch-between-Basic-and-Advanced-Mode) you can add comments to a metrics query and comment out portions of the query by using comment formatting.

Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries.

You can’t add or view comments in Basic Mode, but any comments that were added in Advanced Mode persist when you switch to Basic Mode—you just can’t see them in Basic Mode.

| Comment characters | Usage |
|:---|:---|
| `//` | You can comment out part of a line or a complete line by prefacing it with two forward slashes. Tip: You can insert the comment characters with `cmd /` on macOS or `ctrl /` on Windows. |
| `/* */` | You can comment out multiple lines by putting `/*` and `*/` before and after the lines. |

When you comment out part of your metrics query, the commented text appears in gray italics. If the query is valid without the line that is commented out, it will execute when you run the query.

Comments you add to a metrics query will appear on dashboards, monitors and SLO pages that use the metrics query.

In this example, a complete line is commented out.

<img src={useBaseUrl('img/metrics/line-commented.png')} alt="line-commented.png" />

In this example, multiple lines are commented out.

<img src={useBaseUrl('img/metrics/multiline-comment.png')} alt="line-commented.png" />
