---
slug: /apm/traces
title: Traces
sidebar_label: Traces
description: See how your application is behaving with trace analytics. Learn how to work with your Tracing data including dashboards, Service Map, Spans, and queries.
tags: [traces, trace, tracing]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="50"/>

Monitoring apps and microservices with Sumo Logic Traces provides transactional intelligence for distributed workflows, by combining telemetry from traces, logs, and metrics in the context of real-time automatically tracked application topology.

This guide provides information to work with your tracing data, including the following:

## Step 1: Set up Traces Collection

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments"><img src='https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg' alt="icon" width="40"/><h4>For AWS environments</h4></a>
  <p>Learn how to install an OpenTelemetry Collector and collect traces in AWS environments.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments"><img src={useBaseUrl('img/icons/operations/kubernetes.png')} alt="icon" width="40"/><h4>For Kubernetes environments</h4></a>
  <p> Learn how to install the Sumo Logic Kubernetes Collection and send traces using OpenTelemetry.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments"><img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="40"/><h4>For Other environments</h4></a>
  <p>Learn how to leverage OpenTelemetry standards and start collecting Traces.</p>
  </div>
</div>
</div>

<br/>

Once you've set up collection, you can start [analyzing your traces in Sumo Logic](/docs/apm/traces/view-and-investigate-traces.md).


## Step 2: Instrument Your App with OpenTelemetry

Learn how to collect telemetry data from applications written in the following programming languages:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png' alt="Thumbnail icon" width="30"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java">Java</a></h4>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <img src='https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png' alt="Thumbnail icon" width="95"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript">JavaScript</a></h4>
  </div>
</div>
  <div className="box smallbox3 card">
    <div className="container">
    <img src={useBaseUrl('img/traces/go-logo.png')} alt="thumbnail icon" width="130"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/go">Go (Golang)</a></h4>
    </div>
  </div>
  <div className="box smallbox4 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/512px-.NET_Core_Logo.svg.png' alt="Thumbnail icon" width="55"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net">.NET</a></h4>
    </div>
  </div>
  <div className="box smallbox5 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' alt="Thumbnail icon" width="50"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/python">Python</a></h4>
    </div>
  </div>
  <div className="box smallbox6 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg' alt="Thumbnail icon" width="55"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby">Ruby</a></h4>
    </div>
  </div>
  <div className="box smallbox7 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg' alt="Thumbnail icon" width="125"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/ruby-on-rails">Ruby on Rails</a></h4>
    </div>
  </div>
  <div className="box smallbox8 card">
    <div className="container">
    <img src={useBaseUrl('img/integrations/saas-cloud/istio.png')} alt="Thumbnail icon" width="100"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/istio">Istio</a></h4>
    </div>
  </div>
</div>


### AWS Lambda environments

Learn how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions and send data to Sumo Logic.

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png' alt="Thumbnail icon" width="30"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/java">Java</a></h4>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' alt="Thumbnail icon" width="95"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/nodejs">NodeJS</a></h4>
  </div>
</div>
  <div className="box smallbox3 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' alt="Thumbnail icon" width="50"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/aws-lambda/python">Python</a></h4>
    </div>
  </div>
</div>

### Kubernetes environments

Setting up Tracing instrumentation for applications deployed in Kubernetes just got easier. In a few steps, you can automatically instrument your app using the [OpenTelemetry-Operator](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator) and send your Traces to Sumo Logic.

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png' alt="Thumbnail icon" width="30"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes">Java</a></h4>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <img src='https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png' alt="Thumbnail icon" width="95"/>
  <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes">JavaScript</a></h4>
  </div>
</div>
  <div className="box smallbox3 card">
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' alt="Thumbnail icon" width="50"/>
    <h4><a href="/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/kubernetes">Python</a></h4>
    </div>
  </div>
</div>

## Optional: Advanced Configuration

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/apm/traces/advanced-configuration/filter-shape-tracing-data"><img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="30"/><h4>Correlating Logs and Traces</h4></a>
  <p>Linking together your Sumo Logic traces and logs will provide you a broad and deep understanding of your environment.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/apm/traces/advanced-configuration/filter-shape-tracing-data"><img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="30"/><h4>Filter and Shape Your Trace Data</h4></a>
  <p>Learn how to create and apply custom rules to shape tracing data and specify which data to send to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/apm/traces/advanced-configuration/working-with-span-attributes"><img src={useBaseUrl('img/icons/traces.png')} alt="icon" width="30"/><h4>Working with Span Attributes</h4></a>
  <p>Learn how to modify span attributes to enhance diagnostic data details, remove redundant information, and mask sensitive information before they leave your site.</p>
  </div>
</div>
</div>
