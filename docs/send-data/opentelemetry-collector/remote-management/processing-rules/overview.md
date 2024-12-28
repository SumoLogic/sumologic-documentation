---
id: overview
title: OpenTelemetry Remote Management Processing Rules
sidebar_label: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Processing rules affect only the data sent to Sumo Logic; logs and metrics on your end remain intact and unchanged. Data filtered by OpenTelemetry Collector using processing rules will not count towards your daily data volume quota.

## Logs collection

Processing rules for logs collection support the following rule types:

* [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you do not want to send to Sumo Logic at all ("denylist" filter). These messages are skipped by OpenTelemetry Collector and are not uploaded to Sumo Logic.
* [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account (an "allowlist" filter). This type of rule can be useful, for example, if you only want to include messages coming from a firewall.
* [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize. This is another way to your protect data, such as passwords, that you do not normally track.

## Metrics collection

Processing rules for metrics collection support the following rule types:

* [Exclude metrics that match](metrics-include-and-exclude-rules.md). Remove metrics that you do not want to send to Sumo Logic at all ("denylist" filter).
* [Include metrics that match](metrics-include-and-exclude-rules.md). Send only selected metrics to your Sumo Logic account (an "allowlist" filter). 

## How do processing rules work together?

You can create one or more processing rules for a source template, combining the different types of filters to generate the exact data set you want sent to Sumo Logic.  

When a Source has multiple rules they are processed in the following order: includes, excludes, masks.   

Exclude rules take priority over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.

## Limitations

* Regular expressions must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
* Processing rules are tested with maximum of 20 rules.
