---
id: event-analytics
title: Event Analytics
sidebar: Event Analytics
description: Learn more about events in histogram and aggregate charts for your search results.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Events are actions that can change the state of the system. These could be code deployments, feature flag changes, infrastructure changes, and so on. They can be used to identify and mitigate outages in your system. 

:::note
Currently, we only support code deploy events from [Kubernetes](/docs/observability/kubernetes/).
:::

Sumo Logic intelligently detects and surfaces related events when you run log searches. You can view the indication for the events in the histogram and the aggregate chart below. By clicking on the event, you can view details like **Event start time**, **Event type**, **Event Source** and other metadata associated with the event.

<img src={useBaseUrl('img/search/get-started-search/search-page/event-analytics.png')} alt="event-analytics" style={{border:'1px solid gray'}} width="800"/>

<img src={useBaseUrl('img/search/get-started-search/search-page/events_charts.png')} alt="events_charts" style={{border:'1px solid gray'}} width="800"/>

In the below example, an event is captured due to the code deployment. Following the occurrence of an event, we can observe a spike in errors due to the change in the state of the system.

<img src={useBaseUrl('img/search/get-started-search/search-page/errors-spike.png')} alt="errors-spike" style={{border:'1px solid gray'}} width="800"/>

## Limitations

- You can only view the events in the Line chart, Column chart, and Area Chart. 
- Make sure that you have switched to **[New Visualizations](/docs/search/get-started-with-search/search-basics/chart-search-results)** to view the events in charts.

## Fine-Tuning Event Overlay

**Gathering Events** icon is displayed below the histogram to indicate event identification is in progress.

<img src={useBaseUrl('img/search/get-started-search/search-page/gathering_events.png')} alt="hide_events" style={{border:'1px solid gray'}} width="800"/>

**Hide Events** button below the histogram will be greyed out if there are no events identified for the particular log search.

<img src={useBaseUrl('img/search/get-started-search/search-page/hide_events_grey.png')} alt="hide_events_grey" style={{border:'1px solid gray'}} width="800"/>

The **Hide Events/Show Events** button below the histogram is used to hide the events from the histogram, and vice versa if you want to view the events. By default, events will be displayed in the histogram and aggregate chart.

<img src={useBaseUrl('img/search/get-started-search/search-page/hide_events.png')} alt="hide_events" style={{border:'1px solid gray'}} width="800"/>
