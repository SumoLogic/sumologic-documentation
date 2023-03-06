---
slug: /send-data/hosted-collectors/http-source
title: Configure HTTP Source for Logs, Metrics, Traces, OTLP
description: An HTTP Source is an endpoint for receiving logs, metrics, traces, and OTLP uploaded via a URL.
---


An HTTP Source is an endpoint for receiving logs, metrics, traces, and OTLP data uploaded to a unique URL generated for the Source. The URL securely encodes the Collector and Source information. You can add as many HTTP Sources as you'd like to a single Hosted Collector.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
  <h3><a href="/docs/send-data/hosted-collectors/http-source/logs-metrics">Configure for Logs and Metrics</a></h3>
  <p>An HTTP Logs and Metrics Source is an endpoint for receiving log and metric data uploaded to a unique URL generated for the Source.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <img src={useBaseUrl('img/send-data/OTLP-HTTP.png')} alt="Thumbnail icon" width="50"/>
  <h3><a href="/docs/send-data/hosted-collectors/http-source/otlp">OTLP</a></h3>
  <p>Use an HTTP OTLP Source to collect OTLP formatted Logs, Metrics, and Traces data.</p>
  </div>
</div>
    <div className="box smallbox3 card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
      <h3><a href="/docs/send-data/hosted-collectors/http-source/upload-logs">Upload Logs to HTTP Source</a></h3>
      <p>This guide provides instructions on uploading logs to an HTTP Source.</p>
      </div>
    </div>
    <div className="box smallbox4 card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
      <h3><a href="/docs/send-data/hosted-collectors/http-source/upload-metrics">Upload Metrics to HTTP Source</a></h3>
      <p>This guide provides instructions on uploading logs to an HTTP Source.</p>
      </div>
    </div>
    <div className="box smallbox5 card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
      <h3><a href="/docs/send-data/hosted-collectors/http-source/generate-new-url">Generate HTTP Source URL</a></h3>
      <p>You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL.</p>
      </div>
    </div>
    <div className="box smallbox6 card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
      <h3><a href="/docs/send-data/hosted-collectors/http-source/troubleshooting">Troubleshooting</a></h3>
      <p>Check the HTTP status codes.</p>
      </div>
    </div>
    <div className="box smallbox7 card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/.png')} alt="Thumbnail icon" width="50"/>
      <h3><a href="/docs/send-data/hosted-collectors/http-source/traces">Configure for Traces</a></h3>
      <p>An HTTP Traces Source is an endpoint for receiving trace data.</p>
      </div>
    </div>
