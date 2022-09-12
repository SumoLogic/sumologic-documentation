---
id: query-comments
title: Using Comments in Metric Queries
sidebar_label: Using Comments in Queries
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In the Metrics Explorer, in [Advanced Mode](https://help.sumologic.com/Metrics/Metric-Queries-and-Alerts/02Metrics_Explorer#Switch_between_Basic_and_Advanced_Mode) you can add comments to a metrics query and comment out portions of the query by using comment formatting.

Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries.

You can’t add or view comments in Basic Mode, but any comments that were added in Advanced Mode persist when you switch to Basic Mode—you just can’t see them in Basic Mode.

<table>
  <tr>
   <td>Comment characters
   </td>
   <td>Usage
   </td>
  </tr>
  <tr>
   <td><code>//</code>
   </td>
   <td>You can comment out part of a line or a complete line by prefacing it with two forward slashes. <strong>Tip</strong>: You can insert the comment characters with <code>cmd /</code> on macOS or <code>ctrl /</code> on Windows.
   </td>
  </tr>
  <tr>
   <td><code>/*  */</code>
   </td>
   <td>You can comment out multiple lines by putting <code>/*</code> and
   <code>*/</code> before and after the lines.
   </td>
  </tr>
</table>


When you comment out part of your metrics query, the commented text appears in gray italics. If the query is valid without the line that is commented out, it will execute when you run the query.

Comments you add to a metrics query will appear on dashboards, monitors and SLO pages that use the metrics query.

In this example, a complete line is commented out.

<img src={useBaseUrl('img/metrics/line-commented.png')} alt="line-commented.png" />

In this example, multiple lines are commented out.

<img src={useBaseUrl('img/metrics/multiline-comment.png')} alt="line-commented.png" />
