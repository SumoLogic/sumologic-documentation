---
id: browser-traces
title: Search RUM Browser Traces
sidebar_label: RUM Browser Traces
---

To collect browser RUM traces, create a [trace query](/docs/apm/traces/view-and-investigate-traces.md) that specifies traces starting with the value you gave to `<name_of_your_web_service>` as a root service name. You can also include the following filters as an operation name:
* `documentLoad` as an operation name to find traces that correspond to page loads.
* `Click on *` as an operation name to detect click actions that most likely resulted in XHR calls
* `Navigation: *` as an operation name to detect single-page app navigation changes

Click on any of the load spans, such as `documentLoad`, `documentFetch`, or `resourceFetch` (for `documentLoad`), to open a right-side panel with detailed span metadata, including timing events.

![RUM-trace-view with border.png](/img/rum/RUM-trace-view-with-border.png)
