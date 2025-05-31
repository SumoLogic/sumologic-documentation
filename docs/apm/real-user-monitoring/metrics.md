---
id: metrics
title: Real User Monitoring Metrics
sidebar_label: RUM Metrics
---

import useBaseUrl from '@docusaurus/useBaseUrl';

RUM metrics are automatically generated for you from browser traces. They provide insight into your website's overall user experience as well as front-end services, operating systems, geographical locations, and top-loaded page groups and user cohorts categorized by their browsers.

Metrics are collected for user actions representing document loads and route changes, which means actual retrieval and execution of web documents in the browser or navigation within single-page apps. While XHR calls may still occur, XHR-specific metrics are currently unsupported. Measurements include W3C navigation timings, Core Web Vitals KPIs, and longtask events.

For ad hoc queries, you can find these metrics in [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer.md) by querying for:
```sql
_contenttype=rummetricfromtrace
```

## Document load metrics

The following document load metrics are collected from JavaScript. These are available in each trace in the `documentLoad` and `documentFetch` spans as span events in the details panel and also used in the Real User Monitoring app to populate the Website Performance and UI Paint Timings panels.

These metrics, presented in the form of areas on the **Website Performance** panels on [RUM dashboards](/docs/apm/real-user-monitoring/dashboards), can help you understand the sequence of events (pictured below) from user clicks to a fully loaded document.

![Diagram showing various navigation metrics from user clicks to a fully loaded document, including DNS resolution, SSL connection, TCP establishment, request end, first byte, response end, interactive time, and processing end](/img/rum/Navigation-metrics.png)

Timing metrics are not calculated if the visibility state of the document is "hidden" at any point during the load.

:::info
See [W3C navigation timing](https://www.w3.org/TR/navigation-timing/) for details on how an interface for web applications defines its access timing information concerning navigation and other elements.
:::

### `browser_time_to_dns_resolution_end`

**Calculation**. domainLookupEnd - span start time (fetch start).

### `browser_time_to_ssl_end`

**Calculation**. if secureConnectionStart > 0: connectionEnd - span start time (fetch start) else NaN.

### `browser_time_to_tcp_established`

**Calculation**. if secureConnectionStart > 0: secureConnectionStart - span start time (fetch start) else connectionEnd - span start time (fetch start).

### `browser_time_to_request_end`  

**Calculation**. responseStart - span start time (fetch start).

### `browser_time_to_fb`

**Calculation**. responseEnd - span start time (fetch start).

This metric, Time to first byte, measures the delay between start of the page load and moment when the first byte of the response appears. It helps identify when a web server is too slow to respond to requests. You'll find this metric on the Navigation Timings chart.

<img src={useBaseUrl('img/rum/nav-timings.png')} alt="Screenshot of the Real User Monitoring interface showing detailed metrics and performance data for web applications" style={{border: '1px solid gray'}} />

### `browser_time_to_response_end`

**Calculation**. domInteractive - span start time (fetch start).

### `browser_time_to_interactive`

**Calculation**. domComplete - span start time (fetch start).

### `browser_time_to_processing_end`

**Calculation**. loadEventEnd - span start time (fetch start).


## Rendering events metrics

These metrics, which populate in the **UI Paint Timings** panel on RUM dashboards, explain rendering events inside the user's browser.

### `browser_time_to_fp`

**Calculation**. firstPaint - span start time (fetch start).

[First Paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint) measures the time from page fetch start (span start time) to the moment when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question, "Is it happening?" 

### `browser_time_to_fcp`

**Calculation**. firstContentfulPaint - span start time (fetch start).

[First Contentful Paint](https://web.dev/fcp/) measures the time from page fetch start (span start time) to the moment when any part of the page's content is rendered on the screen. For this metric, "content" refers to text, images (including background images), `<svg>` elements, or non-white `<canvas>` elements.

### `browser_time_to_lcp`

**Calculation**. largestContentfulPaint - span start time (fetch start).

[Largest Contentful Paint](https://web.dev/lcp/) measures the time from page fetch start (span start time) to the moment when the largest image or text block visible within the viewport is rendered.

These are only loosely related to navigation timings and in many cases, some of them may appear long after the page is fully loaded in the browser, which indicates rendering slowdowns.


## Core Web Vitals metrics

[Core Web Vitals (CWV)](https://web.dev/vitals/) is an initiative by Google that defines web page KPIs. Each CWV represents a distinct facet of the user experience that's measurable in the field and reflects the real-world experience of a critical user-centric outcome.

CWV focuses on three aspects of the user experience: document loading, interactivity, and visual stability. This includes the following metrics (and their respective thresholds): `browser_time_fid`, `browser_time_to_lcp`, and `browser_cls`.

<img src={useBaseUrl('img/rum/core-web-vitals.png')} alt="Visual representation of Core Web Vitals metrics within the Real User Monitoring dashboard, highlighting key performance indicators like FID, LCP, and CLS" />

These CWV KPIs are captured and displayed on Overview dashboards for Document Load action types. Detailed metrics are available in span metadata for every transaction trace.

<img src={useBaseUrl('img/rum/prada-documentload.png')} alt="Example of span metadata for transaction traces displayed in the Real User Monitoring dashboard, providing detailed performance insights" style={{border: '1px solid gray'}} />

### `browser_time_fid`  

**Calculation**. From CVW First Input Delay API.

[First Input Delay (FID)](https://web.dev/fid/) measures interactivity. To provide a good user experience, pages should have a FID of **100 milliseconds** or less.

### `browser_time_to_lcp`

**Calculation**. largestContentfulPaint - span start time (fetch start).

[Largest Contentful Paint (LCP)](https://web.dev/lcp/) measures loading performance. To provide a good user experience, LCP should occur within **2.5 seconds** of when the page first starts loading.

### `browser_cls`

**Calculation**. From CVW Cumulative Layout Shift API.

[Cumulative Layout Shift (CLS)](https://web.dev/cls/) measures visual stability. To provide a good user experience, pages should maintain a CLS of **0.1** or less.

## Longtask delay metrics

This section describes how to trace and measure [Longtask delays](https://github.com/w3c/longtasks), which is when the main browser UI thread becomes locked for extended periods (greater than 50 milliseconds) and blocks other critical tasks (including user input) from being executed.

This impacts the user's experience. They can perceive this as a "frozen browser”, even if the communication with the backend has long been completed. RUM automatically captures such events and:
* Displays them as individual spans marking how long the browser was frozen<br/><img src={useBaseUrl('img/rum/prada-nav.png')} alt="Graphical representation of longtask delays in the browser UI, showing how these delays impact user experience and are captured in individual spans" />
* Aggregates the above data into two metrics:
   * Longtask delay: average duration of longtask span
   * Time in longtasks: total time spent in longtasks per user action/trace<br/><img src={useBaseUrl('img/rum/longtask.png')} alt="Aggregated data metrics for longtask delays in the Real User Monitoring dashboard, displaying average duration and total time spent in longtasks per user action or trace." style={{border: '1px solid gray'}} />
