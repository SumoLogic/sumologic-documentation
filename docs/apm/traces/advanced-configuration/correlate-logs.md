---
id: correlate-logs
title: Correlating Logs and Traces
description: Learn how to link your traces and logs together for a broad and deep understanding of your environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Linking together your Sumo Logic traces and logs will provide you a broad and deep understanding of your environment.

Our configurations, available in several programming languages, will inject the trace variables `TraceId` and `SpanId` into your logs:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png' alt="Thumbnail icon" width="30"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/traceid-spanid-injection-into-logs-configuration">Java</a></h4>
  <p>Injects data into user logs in your Java applications.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <img src='https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png' alt="Thumbnail icon" width="95"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript/traceid-spanid-injection-into-logs">JavaScript</a></h4>
  <p>Injects data into user logs in your JavaScript apps.</p>
  </div>
</div>
  <div className="box smallbox3 card">
    <div className="container">
    <img src={useBaseUrl('img/traces/go-logo.png')} alt="thumbnail icon" width="130"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/go/traceid-and-spanid-injection-into-logs">Go (Golang)</a></h4>
    <p>Injects data into your GoLang app user logs.</p>
    </div>
  </div>
  <div className="box smallbox4 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/512px-.NET_Core_Logo.svg.png' alt="Thumbnail icon" width="60"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net/traceid-spanid-injection-into-logs">.NET</a></h4>
    <p>Injects data into user logs from ASP.NET & .NET core.</p>
    </div>
  </div>
  <div className="box smallbox5 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' alt="Thumbnail icon" width="55"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/python/traceid-spanid-injection-into-logs">Python</a></h4>
    <p>Injects data into your Python lambda logs.</p>
    </div>
  </div>
</div>
