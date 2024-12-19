---
id: include-and-exclude-rules
title: Include and Exclude Rules for OpenTelemetry
sidebar_label: Include and Exclude Rules
description: Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic using OpenTelemetry Collector.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use include and exclude processing rules to specify what data is sent to Sumo Logic using OpenTelemetry Collector. Internally these will use [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to get the data filtered.

* An exclude rule functions as a denylist filter where the matching data is not sent to Sumo Logic.
* An include rule functions as an allowlist filter where only matching data is sent to Sumo Logic.

As a best practice, specify these rules to match the lesser volume of data.

* If you want to **collect the majority of data** from a source template, provide **exclude** rules to match (filter out) the lesser volume of data.
* If you want to **collect a small set of data** from a source template, provide **include** rules to match (filter in) the lesser volume of data.

For example, to include only messages coming from a Windows Event log with ID `8015`, you can add a Logs Filter to the source template and select the **Type** of the filter as "Include message that match", and can use the following filter regular expression:

```
.*"id":8015.*
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-logs.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

## Rules and limitations

When writing regular expression rules, you must follow these rules:

* Your rule must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
* If your rule matches *only a section* of the log line, the full log line will be matched.
* For *single line messages*, it is not mandatory to prefix and suffix the regex expression with `.\*`.
* Exclude rules take priority over include rules. Include rules are processed first. However, if an exclude rule matches data that matched the include rule filter, the data is excluded.
* If two or more rules are listed, the assumed Boolean operator is `OR`.
