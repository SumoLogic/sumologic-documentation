---
slug: /send-data/opentelemetry-collector/remote-management
title: OpenTelemetry Collector Remote Management
sidebar_label: Remote Management
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) simplifies remote management of data collection by enabling setup and configuration from the Sumo Logic UI, deployment to multiple collectors at once, and centralized management of data configurations using source templates.

You can tag your OpenTelemetry collectors to categorize and group them. These tags are enriched in your data so you can use them in dashboards and searches.

Remote management data configuration is handled using source templates. This feature extends our [Installed Collector](/docs/send-data/installed-collectors/sources) source template to support multiple collectors.

By associating source templates with collector tags—a process called *collector linking*—you reduce redundancy in data collection setup and streamline configuration management across your environment.

**Key benefits of remote management**

* Simplified setup and configuration via the Sumo Logic UI
* [Tag-based collector grouping](#collector-tags) for efficient data collection
* Centralized configuration using [source templates](/docs/send-data/opentelemetry-collector/remote-management/source-templates)
* No server access required after installation
* Faster time to value and reduced manual errors

**Common use cases**

* Grouping collectors by environment (for example, production, staging)
* Expanding data collection for new services with minimal effort
* Simplifying migration from legacy monitoring solutions
* Monitoring error logs across multiple Apache servers

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
 <div className="box smallbox card">
 <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/install-tag-collector"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Install and Tag Your OpenTelemetry Collector</h4></a>
  <p>Learn how to install and tag your OTel Collector for remote management of data collection.</p>
  </div>
</div>
  <div className="box smallbox card">
  <div className="container">
    <a href="/docs/send-data/opentelemetry-collector/remote-management/source-templates"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Source Templates</h4></a>
    <p>Learn how to create and modify your OpenTelemetry Remote Management source templates.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Processing Rules</h4></a>
      <p>Use processing rules for an OpenTelemetry agent with remote management source templates.</p>
    </div>
  </div>
</div>
