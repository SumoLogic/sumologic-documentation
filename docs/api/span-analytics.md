---
id: span-analytics
title: Span Analytics APIs
sidebar_label: Span Analytics
description: The Span Analytics API allows you to browse spans collected in the system.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/distributed-operations.png')} alt="Thumbnail icon" width="50"/>

The Span Analytics API allows you to browse spans collected in the system. You can execute queries to find individual spans matching provided search criteria as well as run aggregated span queries and retrieve their results. For more information, see [Spans](/docs/apm/traces/spans).

:::tip Other Tracing APIs
See also: [Service Map APIs](/docs/api/service-map) and [Traces APIs](/docs/api/tracing).

Tracing APIs give you the ability to browse and execute queries for traces and span analytics, and request a service map of your application environment.
:::


## Endpoints for API access  

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.


## Session Timeout

While the span analytics query is running you need to request the query status based on the query ID. The API keeps the query alive by either polling for status or gathering results. If the search job is not kept alive by API requests, it is canceled after fifteen minutes. When a query is canceled after fifteen minutes of inactivity, you will get a 404 status.

## Errors

{@import ../reuse/api-errors.md}

## Documentation   

Documentation for OpenAPI built APIs is hosted on each deployment. Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started#which-endpoint-should-i-should-use) if you are unsure.

Select the documentation link for your deployment:

| Deployment | Documentation URL                                     |
|:------------|:-------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/spanAnalytics  |
| CA         | https://api.ca.sumologic.com/docs/#tag/spanAnalytics  |
| DE         | https://api.de.sumologic.com/docs/#tag/spanAnalytics  |
| EU         | https://api.eu.sumologic.com/docs/#tag/spanAnalytics  |
| FED        | https://api.fed.sumologic.com/docs/#tag/spanAnalytics |
| IN         | https://api.in.sumologic.com/docs/#tag/spanAnalytics  |
| JP         | https://api.jp.sumologic.com/docs/#tag/spanAnalytics  |
| US1        | https://api.sumologic.com/docs/#tag/spanAnalytics     |
| US2        | https://api.us2.sumologic.com/docs/#tag/spanAnalytics |
