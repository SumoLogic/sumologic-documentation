---
title: Processing Rules for OpenTelemetry (Beta)
description: Use Sumo Logic processing rules for opentelemetry agent with OTRM source template
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Processing rules can be used with OpenTelemetry collector for different source template in OTRM (Open telemetry remote management). These processing rules can filter and can mask the data sent to Sumo Logic from a OpenTelemtry collector which is remotely managed by Sumo Logic. The rules affect only the data sent to Sumo Logic; logs and metrics on your end remain intact and unchanged. Data filtered by a OpenTelemetry collector using Processing Rules does not count towards your daily data volume quota.

**Processing Rules for Logs Collection** support the following rule types:

* [Exclude messages that match](include-and-exclude-rules-otel.md). Remove messages that you do not want to send to Sumo Logic at all ("denylist" filter). These messages are skipped by OpenTelemetry Collector and are not uploaded to Sumo Logic.
* [Include messages that match](include-and-exclude-rules-otel.md). Send only the data you'd like in your Sumo Logic account (an "allowlist" filter). This type of rule can be useful, for example, if you only want to include only messages coming from a firewall.

**Processing Rules for Metrics Collection** support the following rule types:

* [Exclude metrics that match](metrics-include-and-exclude-rules-otel.md). Remove metrics that you do not want to send to Sumo Logic at all ("denylist" filter).
* [Include metrics that match](metrics-include-and-exclude-rules-otel.md). Send only selected metrics to your Sumo Logic account (an "allowlist" filter). 

## Limitations

* Regular expressions must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).

## How do Processing Rules Work Together?

You can create one or more processing rules for a Source Template, combining the different types of filters to generate the exact data set you want sent to Sumo Logic.  

When a Source has multiple rules they are processed in the following order: includes, excludes, masks.   

Exclude rules take priority over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/processing-rules/include-and-exclude-rules-otel"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Include and Exclude Rules for OpenTelemetry </h4></a>
  <p>Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic using OpenTelemetry Collector.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/processing-rules/metrics-include-and-exclude-rules-otel"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Metrics Include and Exclude Rules for OpenTelemetry</h4></a>
  <p>Use metrics processing rules to specify what metrics are sent to Sumo Logic using OpenTelemetry Collector.</p>
  </div>
</div>
</div>
