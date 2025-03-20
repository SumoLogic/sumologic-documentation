---
slug: /send-data/opentelemetry-collector/remote-management
title: OpenTelemetry Collector Remote Management
sidebar_label: Remote Management
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe'; 

The [Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) simplifies remote management of data collection by enabling setup and configuration from the Sumo Logic UI, deploying to multiple collectors at once, data filtering with remote processing rules, and centralized management of data configurations using source templates.

:::sumo Micro lesson

<Iframe url="https://fast.wistia.net/embed/iframe/o7g9pe3c4t?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="MicroLesson - Open Telemetry Collector Remote Management Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>
:::

  
  **If you want to manage the collector with local configs, you MUST check this box otherwise by default the collector will only be managed by remote**
![image](https://github.com/user-attachments/assets/80b64ddb-f88a-4129-bb82-76c48e3544dd)


**Key features**

* **Tagging collectors**. Tag your OpenTelemetry collectors to categorize and group them. These tags enrich your data, allowing you to use them effectively in dashboards and searches.
* **Source templates for configuration**. Remote management data configuration is handled using source templates, an enhancement of our [Installed Collector source template](/docs/send-data/installed-collectors/sources), supporting multiple collectors. By associating source templates with collector tags—a process called *collector linking*—you reduce redundancy and streamline configuration management across your environment.
* **Flexible data processing**. Transform, filter, and enhance data centrally using processing rules to ensure consistency across multiple collectors.

**Remote management benefits**

* **Simplified setup and configuration**. Manage collectors directly from the Sumo Logic UI.
* **Tag-based grouping**. Efficiently organize and group collectors using tags.
* **Centralized configuration**. Manage data configurations for multiple collectors in one place.
* **No server access required**. Once installed, no direct server access is needed.
* **Improved efficiency**. Achieve faster time to value and reduce manual errors.

**Common use cases**

* **Environment grouping**. Organize collectors by environment, such as production or staging.
* **Data collection expansion**. Quickly scale data collection for new services.
* **Legacy migration**. Simplify transitions from legacy monitoring solutions.
* **Centralized log monitoring**. Monitor error logs across multiple Apache servers.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
  <div className="box smallbox card">
  <div className="container">
    <a href="/docs/send-data/opentelemetry-collector/remote-management/source-templates"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Source Templates</h4></a>
    <p>Learn how to create and modify your OpenTelemetry Remote Management source templates to optimize data collection and configuration.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Processing Rules</h4></a>
      <p>Discover how to apply processing rules for an OpenTelemetry agent using remote management source templates to enhance data handling.</p>
    </div>
  </div>
    <div className="box smallbox card">
    <div className="container">
      <a href="/docs/send-data/opentelemetry-collector/remote-management/troubleshooting"><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="OTel thumbnail icon" width="25"/><h4>Troubleshooting</h4></a>
      <p>Find solutions to common issues with the OpenTelemetry collector remote management.</p>
    </div>
  </div>
</div>
