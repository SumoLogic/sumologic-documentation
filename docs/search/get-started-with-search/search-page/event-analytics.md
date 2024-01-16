---
id: event-analytics
title: Event Analytics
sidebar: Event Analytics
description: Learn more about events in histogram and aggregate charts for your search results.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Events are actions that can change the state of the system. These could be code deployments, feature flag changes, infrastructure changes and so on. They can be used to identify and mitigate outages in your system.

Sumo Logic intelligently detects and surfaces related events when you run log searches. You can view the indication for the events in the histogram and the aggregate chart below. By clicking on the event, you can view details like **Event start time**, **Event type**, **Event Source** and other metadata associated with the event.

<img src={useBaseUrl('img/search/get-started-search/search-page/event-analytics.png')} alt="event-analytics" style={{border:'1px solid black'}} width="800"/>

<img src={useBaseUrl('img/search/get-started-search/search-page/events_charts.png')} alt="events_charts" style={{border:'1px solid black'}} width="800"/>

In the below example, an event is captured due to the code deployment. Following the occurrence of an event, we can observe a spike in errors due to the change in the state of the system.

<img src={useBaseUrl('img/search/get-started-search/search-page/errors-spike.png')} alt="errors-spike" style={{border:'1px solid black'}} width="800"/>

## Limitations

- You can only view the events in the Line chart, Column chart, and Area Chart. 
- Make sure that you have switched to **[New Visualizations](/docs/search/get-started-with-search/search-basics/chart-search-results)** to view the events in charts.

## Hide Events

By default, you can view the events in the histogram and aggregate chart. If you prefer to hide the events from the histogram, you can do so by clicking on the **Hide Events button**.

<img src={useBaseUrl('img/search/get-started-search/search-page/hide_events.png')} alt="hide_events" style={{border:'1px solid black'}} width="800"/>
