---
id: traces
title: HTTP Traces Source
description: An HTTP Traces Source is an endpoint for receiving traces.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/http-traces.png')} alt="Thumbnail icon" width="60"/>

An HTTP Traces Source is an endpoint for receiving trace data. The URL securely encodes the Collector and Source information. You can add as many HTTP Traces Sources as you'd like to a single Hosted Collector.

When you set up an HTTP Traces Source, a unique URL is assigned to that Source. The generated URL is a long string of letters and numbers. You can generate a new URL at any time.

:::info
See also: [RUM Traces Source](/docs/apm/real-user-monitoring/configure-data-collection).
:::

## Limitations

* [Zipkin JSON v2](https://zipkin.io/zipkin-api/) and [OTLP/HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/protocol/otlp.md#otlphttp) are the only supported formats.
* Traces up to 1,000 spans are supported, this includes metadata. Traces above 1,000 spans per trace may be throttled and/or the critical path by service may be inaccurate.

## Create an HTTP Traces Source

To configure an HTTP Traces Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Traces**.<br/>  ![source](/img/send-data/http-traces-icon.png)
1. Enter a Name for the Source. A description is optional.<br/>  ![source](/img/send-data/traces-source-no-fields.png)
1. (Optional) For **Source Host** and **Source Category**, enter any string to tag the output collected from the source. These are [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields that allow you to organize your data.
1. When you are finished configuring the Source, click **Save**.

## View the endpoint URL
If you need to access the Source's URL again, click **Show URL**.

![source](/img/send-data/traces-source-no-fields.png)
