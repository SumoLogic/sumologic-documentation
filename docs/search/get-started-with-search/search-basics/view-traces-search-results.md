---
id: view-traces-search-results
title: View Traces Search Results
description: Open and review traces from search log results.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In the Messages tab, some search results may have associated Traces data to review. You can right-click to drill-down and view the Trace View for any log entry with a Trace ID (`trace_id...`) or Span ID (`span_id...`). See View and [Investigate Traces](/docs/apm/traces/view-and-investigate-traces) and [Traces](/docs/apm/traces) for more information.

1. Build and run your search.
1. In the **Messages** tab, right-click a log line. If tracing data is available, select **Open Trace**. The entry gives you the tracing id.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/search-open-trace.png')} alt="Search open trace" style={{border: '1px solid gray'}} width="800" />
1. The **Trace View** loads for the selected trace.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/search-open-trace.png')} alt="Trace example" style={{border: '1px solid gray'}} width="800" />
