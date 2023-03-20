---
slug: /send-data/hosted-collectors/http-source
title: Configure HTTP Source for Logs, Metrics, Traces, OTLP
description: An HTTP Source is an endpoint for receiving logs, metrics, traces, and OTLP uploaded via a URL.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

An HTTP Source is an endpoint for receiving logs, metrics, traces, and OTLP data uploaded to a unique URL generated for the Source. The URL securely encodes the Collector and Source information. You can add as many HTTP Sources as you'd like to a single Hosted Collector.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/logs-metrics"><img src={useBaseUrl('img/send-data/http-logs-metrics.png')} alt="Thumbnail icon" width="60"/><h4>HTTP Logs and Metrics</h4></a>
  <p>An HTTP Logs and Metrics Source is an endpoint for receiving log and metric data uploaded to a unique URL generated for the Source.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/otlp"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/><h4>OTLP</h4></a>
  <p>Use an HTTP OTLP Source to collect OTLP formatted Logs, Metrics, and Traces data.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs"><img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="40"/>
  <h4>Upload Logs to HTTP Source</h4></a>
  <p>This guide provides instructions on uploading logs to an HTTP Source.</p>
  </div>
</div>
  <div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-metrics"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="40"/>
  <h4>Upload Metrics to HTTP Source</h4></a>
  <p>This guide provides instructions on uploading logs to an HTTP Source.</p>
  </div>
</div>
  <div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/generate-new-url"><img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="40"/>
  <h4>Generate HTTP Source URL</h4></a>
  <p>You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/traces"><img src={useBaseUrl('img/send-data/http-traces.png')} alt="Thumbnail icon" width="40"/><h4>HTTP Traces</h4></a>
  <p>An HTTP Traces Source is an endpoint for receiving trace data.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/apm/real-user-monitoring/configure-data-collection"><img src={useBaseUrl('img/send-data/http-rum.png')} alt="Thumbnail icon" width="40"/>
  <h4>RUM HTTP Traces Source</h4></a>
  <p>Learn how to configure a RUM HTTP Traces Source.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source/troubleshooting"><img src={useBaseUrl('img/icons/operations/troubleshoot.png')} alt="Thumbnail icon" width="40"/>
  <h4>HTTP Source Troubleshooting</h4></a>
  <p>Check the HTTP status codes.</p>
  </div>
</div>
</div>
