---
id: troubleshoot-observability-solution
title: Troubleshooting with Sumo Logic Observability
sidebar_label: Troubleshooting
description: tk
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/troubleshoot.png')} alt="icon" width="70"/>

Now that you have identified the issue and isolated the cause to a specific service or area, the next step is to get to the root cause and fix it so that the system could be restored to a healthy state.

![root-cause-wheel](/img/observability/root-cause-wheel.png)

## Find Anomalous behavior in Metrics

Having trouble isolating the real issues when there’s an incident? You can use the [Root Cause Explorer](/docs/observability/root-cause-explorer) to quickly isolate issues by identifying services and metrics that have been behaving abnormally over the incident timespan. This will help you pinpoint the root cause of the issue.

![rce-example.png](/img/observability/rce-example.png)

## Find Interesting Patterns in your Log Data 

You can also leverage [Behavior Insights](/docs/search/behavior-insights) to understand interesting log signature patterns in your data, like connection timeouts, errors, or exceptions. This will help you uncover the needle in a haystack, so you can get to the root cause quickly, without having to go through tons of data manually.  

![behavior-insights-example.png](/img/observability/behavior-insights-example.png)

## Ad Hoc Searching to get to the root cause

You can use [Log Search](/docs/search/get-started-with-search/search-page) to do ad hoc searches on your data to quickly validate or debunk hypotheses and narrow down your investigation scope. You can also do rich analytics on unstructured data to uncover patterns that will help you find interesting insights that help you find the root cause. 

![log-search-example.png](/img/observability/log-search-example.png)
