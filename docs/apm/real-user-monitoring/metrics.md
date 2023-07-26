---
id: metrics
title: Real User Monitoring Metrics
sidebar_label: RUM Metrics
---

import useBaseUrl from '@docusaurus/useBaseUrl';

RUM metrics are automatically generated for you from browser traces. They provide insight into your website's overall user experience as well as front-end services, operating systems, geographical locations, and top-loaded page groups and user cohorts categorized by their browsers.

Metrics are collected for user actions representing document loads, which means actual retrieval and execution of web documents in the browser as well as XHR calls and route changes. Measurements include W3C navigation timings, XHR delays, Core Web Vitals KPIs, longtask events (delays) and others.

For ad-hoc queries, you can find these metrics in [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer.md) by querying for:
```sql
_contenttype=rummetricfromtrace
```

## Document Load Metrics

The following table has details on the Document Load metrics collected from JavaScript. These are available in each trace in the `documentLoad` and `documentFetch` spans as span events in the details panel and also used in the Real User Monitoring app to populate the Website Performance and UI Paint Timings panels.

| Name | Calculation |
|:---|:---|
| `browser_time_to_dns_resolution_end` | domainLookupEnd - span start time (fetch start) |
| `browser_time_to_ssl_end` | if secureConnectionStart > 0: connectionEnd - span start time (fetch start) else NaN |
| `browser_time_to_tcp_established` | if secureConnectionStart > 0: secureConnectionStart - span start time (fetch start) else connectionEnd - span start time (fetch start) |
| `browser_time_to_request_end`  | responseStart - span start time (fetch start) |
| `browser_time_to_fb` <a href="#ttfb">**`*`**</a> | responseEnd - span start time (fetch start) |
| `browser_time_to_response_end` | domInteractive - span start time (fetch start) |
| `browser_time_to_interactive` | domComplete - span start time (fetch start) |
| `browser_time_to_processing_end` | loadEventEnd - span start time (fetch start) |

The above metrics, presented in the form of areas on the **Website Performance** panels on [RUM dashboards](/docs/apm/real-user-monitoring/dashboards), can help you understand the sequence of events (pictured below) from user clicks to a fully loaded document.<br/>![Navigation-metrics.png](/img/rum/Navigation-metrics.png)

<a name="ttfb"><strong>*</strong> Time to first byte</a> (<code>browser_time_to_fb</code>): measures the delay between start of the page load and moment when the first byte of the response appears. It helps identify when a web server is too slow to respond to requests. You'll find this metric on the Navigation Timings chart.<br/><img src={useBaseUrl('img/rum/nav-timings.png')} alt="Real User Monitoring" />

Timing metrics are not calculated if the visibility state of the document was "hidden" at any point during the load.

See [W3C navigation timing](https://www.w3.org/TR/navigation-timing/) for details on how an interface for web applications defines its access timing information concerning navigation and other elements.


## Rendering Events Metrics

These metrics, which populate in the **UI Paint Timings** panel on RUM dashboards, explain rendering events inside the user's browser.

| Name | Calculation |
|:---|:---|
| `browser_time_to_fp` | firstPaint - span start time (fetch start) |
| `browser_time_to_fcp` | firstContentfulPaint - span start time (fetch start) |
| `browser_time_to_lcp` | largestContentfulPaint - span start time (fetch start) |


* [First Paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint): measures the time from page fetch start (span start time) to the moment when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question, "Is it happening?" 
* [First Contentful Paint](https://web.dev/fcp/): measures the time from page fetch start (span start time) to the moment when any part of the page's content is rendered on the screen. For this metric, "content" refers to text, images (including background images), `<svg>` elements, or non-white `<canvas>` elements.
* [Largest Contentful Paint](https://web.dev/lcp/): measures the time from page fetch start (span start time) to the moment when the largest image or text block visible within the viewport is rendered.

These are only loosely related to navigation timings and in many cases, some of them may appear long after the page is fully loaded in the browser, which indicates rendering slowdowns.


## Core Web Vitals Metrics

[Core Web Vitals (CWV)](https://web.dev/vitals/) is an initiative by Google that defines web page KPIs. Each CWV represents a distinct facet of the user experience that's measurable in the field and reflects the real-world experience of a critical user-centric outcome.

| Name | Calculation |
|:---|:---|
| `browser_time_fid` | From CVW First Input Delay API |
| `browser_time_to_lcp` | largestContentfulPaint - span start time (fetch start) |
| `browser_cls` | From CVW Cumulative Layout Shift API |

CWV focuses on three aspects of the user experience: document loading, interactivity, and visual stability. This includes the following metrics (and their respective thresholds):

* [First Input Delay (FID)](https://web.dev/fid/): measures interactivity. To provide a good user experience, pages should have a FID of **100 milliseconds** or less.
* [Largest Contentful Paint (LCP)](https://web.dev/lcp/): measures loading performance. To provide a good user experience, LCP should occur within **2.5 seconds** of when the page first starts loading.
* [Cumulative Layout Shift (CLS)](https://web.dev/cls/): measures visual stability. To provide a good user experience, pages should maintain a CLS of **0.1** or less.<br/><img src={useBaseUrl('img/rum/core-web-vitals.png')} alt="Real User Monitoring" />

The above three CWV KPIs are captured and displayed on Overview dashboards for Document Load action types. Detailed metrics are available in span metadata for every transaction trace.<br/><img src={useBaseUrl('img/rum/prada-documentload.png')} alt="Real User Monitoring" />

## XHR Monitoring Metrics

An XML HTTP Request (XHR) is a form of communication between the browser and the application backend without (re)loading of the page. A typical example is where a page needs to update a ticker of a price automatically or after pressing the “update price” button next to it.

XHR technique is quite often used in _single-page apps_ &#8212; apps that load the page once and then provide all interaction and navigation without loading more documents. Pages can generate one or more XHR requests, typically in the form of HTTP POSTs/GETs, related to various user actions on a page. Sumo Logic provides following monitoring coverage for XHR interactions:

Pages can generate one or more XHR requests, typically in the form of HTTP Posts, related to various user actions on a page. What we do with this, is:
* Measure the following performance timings:

  | Name | Calculation |
  |:---|:---|
  | `browser_time_to_first_xhr` | time from UI interaction until first HTTP `POST` appears |
  | `browser_time_to_last_xhr` | time from UI interaction until last HTTP `POST` ends) |
  | `browser_time_to_xhr_processing_end` | time from UI interaction until all browser-side processing of all XHR requests is done |
  | `browser_time_in_xhr_calls` | total time when the transaction was “busy” with executing XHR communication |

* Measure how many XHR requests have been generated
* Identify the user action that triggered the XHRs by blending UI interaction (e.g., `“click on Pay”`) with the page name (e.g., `http://www.acme.com/checkout`) results in following action name `"Click on Pay on http://www.acme.com/checkout"`
* Measure any erroneous HTTP response to XHR POST calls and count them as XHR errors
* Allow to drill-down via EI to specific traces that explain full process of loading and execution of each such transaction<br/><img src={useBaseUrl('img/rum/xhr-action.png')} alt="Real User Monitoring" />

<!--
### Navigation (Route Change) Metrics
Another browsing technique used by single-page apps is a special way of handling page navigation (e.g., clicking on links, buttons) called route change. It is basically a way to navigate to a new page/view without having to load a new document.
Every time we open a new tab in Sumo, we do a route change (but we are not loading the whole document at the same time). Such actions typically also generate some XHR calls in the background. What we do with this is:
* Create a special type of user actions called `route_changes` with the name of the page that is being opened (i.e., “Route to [https://service.us2.sumologic.com/ui#/search/*](https://service.us2.sumologic.com/ui#/search/*)”)
* Show these actions as third type of action next to document loads and XHR requests
* Measure same type of metrics for them as for XHR requests
* Allow drill-down via EI to specific traces that explain full process of loading and execution of each such transaction
<img src={useBaseUrl('img/rum/nav-action.png')} alt="Real User Monitoring" />
-->

## Longtask Delay Metrics

This section describes how to trace and measure [Longtask delays](https://github.com/w3c/longtasks), which is when the main browser UI thread becomes locked for extended periods (greater than 50 milliseconds) and blocks other critical tasks (including user input) from being executed.

This impacts the user's experience. They can perceive this as a "frozen browser”, even if the communication with the backend has long been completed. RUM automatically captures such events and:
* Displays them as individual spans marking how long the browser was frozen<br/><img src={useBaseUrl('img/rum/prada-nav.png')} alt="Real User Monitoring" />
* Aggregates the above data into two metrics:
   * Longtask delay: average duration of longtask span
   * Time in longtasks: total time spent in longtasks per user action/trace<br/><img src={useBaseUrl('img/rum/longtask.png')} alt="Real User Monitoring" />
