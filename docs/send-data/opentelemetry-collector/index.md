---
slug: /send-data/opentelemetry-collector
title: Sumo Logic OpenTelemetry Collector
description: OpenTelemetry Collector provides a unified and flexible solution for collecting, processing, and exporting telemetry data from multiple sources, including metrics, traces, and logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic OpenTelemetry (OTel) Collector is our next-generation collector, built on OpenTelemetry, that provides a single unified agent to send logs, metrics, traces, and metadata for Observability to Sumo Logic. This can help simplify and streamline the performance and behavior monitoring and understanding the performance and behavior of complex distributed systems, making it easier to identify and diagnose issues and improve overall system reliability and efficiency.

What makes the Sumo Logic OTel Collector unique is its flexibility and scalability. It can be easily deployed as a containerized application on any cloud platform, and it supports a wide range of data sources, including AWS CloudWatch, Prometheus, and Jaeger. This means that organizations can use the collector to gain deeper visibility into their distributed systems, no matter where they are hosted.

Once the data is collected, the Sumo Logic platform provides powerful analytics capabilities, enabling users to gain insights into their applications and systems, troubleshoot issues, and optimize their operations. With its user-friendly interface and powerful features, the Sumo Logic OTel Collector is an ideal choice for organizations looking to gain a deeper understanding of their distributed systems and improve their overall performance and reliability.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
  <div className="box smallbox1 card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/install-collector"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="25"/><h4>Install Collector</h4></a>
      <p>Step-by-step instructions for installing the OpenTelemetry collector on Linux, Windows, macOS, and more.</p>
    </div>
  </div>
  <div className="box smallbox2 card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/data-source-configurations">
        <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="25"/>
        <h4>Data Source and Configurations</h4>
      </a>
      <p>Learn how to collect logs, metrics, and tracing data, as well as how to add configurations for the OpenTelemetry collector.</p>
    </div>
  </div>
  <div className="box smallbox3 card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/sumo-logic-opentelemetry-vs-opentelemetry-upstream-relationship"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="25"/><h4>Sumo Logic OTel</h4></a>
      <p>Understand the relationship between the Sumo Logic OpenTelemetry Collector and the OpenTelemetry upstream project.</p>
    </div>
  </div>
  <div className="box smallbox4 card">
    <div className="container">
    <a href="/docs/send-data/opentelemetry-collector/troubleshooting"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="25"/><h4>Troubleshooting and FAQ</h4></a>
    <p>Find solutions to common issues and answers to frequently asked questions about the OpenTelemetry collector.</p>
    </div>
  </div>
</div>
