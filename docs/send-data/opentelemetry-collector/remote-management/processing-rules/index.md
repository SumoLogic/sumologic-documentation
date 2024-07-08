---
slug: /send-data/opentelemetry-collector/remote-management/processing-rules
title: Processing Rules for OpenTelemetry (Beta)
description: Use Sumo Logic processing rules for an OpenTelemetry agent with an OpenTelemetry remote management (OTRM) source template.
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Processing rules can be used with OpenTelemetry Collector for different source templates in OTRM (OpenTelemetry remote management). These processing rules can filter and can mask the data sent to Sumo Logic from OpenTelemetry Collector which is remotely managed by Sumo Logic. The rules affect only the data sent to Sumo Logic; logs and metrics on your end remain intact and unchanged. Data filtered by OpenTelemetry Collector using processing rules does not count towards your daily data volume quota.

Processing rules for logs collection support the following rule types:

* [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you do not want to send to Sumo Logic at all ("denylist" filter). These messages are skipped by OpenTelemetry Collector and are not uploaded to Sumo Logic.
* [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account (an "allowlist" filter). This type of rule can be useful, for example, if you only want to include messages coming from a firewall.
* [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize. This is another way to your protect data, such as passwords, that you do not normally track.


Processing Rules for metrics collection support the following rule types:

* [Exclude metrics that match](metrics-include-and-exclude-rules.md). Remove metrics that you do not want to send to Sumo Logic at all ("denylist" filter).
* [Include metrics that match](metrics-include-and-exclude-rules.md). Send only selected metrics to your Sumo Logic account (an "allowlist" filter). 

## Limitations

* Regular expressions must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
* Processing Rules are tested with maximum of 20 rules.

## How do processing rules work together?

You can create one or more processing rules for a Source Template, combining the different types of filters to generate the exact data set you want sent to Sumo Logic.  

When a Source has multiple rules they are processed in the following order: includes, excludes, masks.   

Exclude rules take priority over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/include-and-exclude-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Include and Exclude Rules for OpenTelemetry </h4></a>
  <p>Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic using OpenTelemetry Collector.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/send-data/opentelemetry-collector/remote-management/processing-rules/metrics-include-and-exclude-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Metrics Include and Exclude Rules for OpenTelemetry</h4></a>
  <p>Use metrics processing rules to specify what metrics are sent to Sumo Logic using OpenTelemetry Collector.</p>
  </div>
</div>
</div>
