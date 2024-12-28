---
slug: /send-data/opentelemetry-collector/remote-management/processing-rules
title: Processing Rules for OpenTelemetry Remote Managment
description: Use Sumo Logic processing rules for an OpenTelemetry agent with an OpenTelemetry remote management source template.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use our OpenTelemetry Collector remote management (OTRM) source template processing rules to filter and mask data sent to Sumo Logic from OpenTelemetry Collector. The collector itself is remotely managed by Sumo Logic.

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
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/metrics-include-and-exclude-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>OTRM Metrics Include and Exclude Rules</h4></a>
  <p>Use OTRM metrics processing rules to specify which metrics data you want to send to Sumo Logic.</p>
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
