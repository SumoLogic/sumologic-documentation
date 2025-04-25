---
slug: /send-data/opentelemetry-collector/remote-management/processing-rules
title: OpenTelemetry Remote Management Processing Rules
description: Use Sumo Logic processing rules for an OpenTelemetry agent with an OpenTelemetry remote management source template.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use OpenTelemetry Collector remote management (OTRM) source template processing rules to filter and mask data sent from the OpenTelemetry Collector to Sumo Logic. The collector itself is remotely managed by Sumo Logic.

Processing rules allow you to define conditions and actions for transforming or filtering data within the OpenTelemetry Collector. With remote management, you can:

* Apply rules at the collector level for specific data sources.
* Enhance data processing by adding metadata, filtering unwanted logs, or standardizing formats.
* Manage rules centrally through source templates, ensuring consistency across multiple collectors.

To configure processing rules, navigate to the remote management section in the Sumo Logic UI, select the desired source template, and define the rules under the processing section.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/include-and-exclude-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>OTRM Include and Exclude Rules</h4></a>
  <p>Use OTRM include and exclude processing rules to specify which data you want to send to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/mask-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>OTRM Mask Rules</h4></a>
  <p>Create an OTRM mask rule to replace an expression with a mask string.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/mask-rules-windows"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>OTRM Windows Source Template Mask Rules</h4></a>
  <p>Create an OTRM Windows source template mask rule to replace an expression with a mask string.</p>
  </div>
</div>
</div>
