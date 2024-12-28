---
id: include-and-exclude-rules
title: OpenTelemetry Remote Management Include and Exclude Rules
sidebar_label: Include and Exclude Rules
description: Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic using OpenTelemetry remote management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use include and exclude processing rules to define which data is sent to Sumo Logic using the OpenTelemetry Collector. These rules internally utilize the [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to filter the data.

* An exclude rule functions as a denylist filter, ensuring that matching data is not sent to Sumo Logic.
* An include rule functions as an allowlist filter, ensuring that only matching data is sent to Sumo Logic.

As a best practice, configure these rules to filter the smaller volume of data for optimal performance:

* If you want to **collect the majority of data** from a source template, use **exclude** rules to match (filter out) the lesser volume of data.
* If you want to **collect a small set of data** from a source template, use **include** rules to match (filter in) the lesser volume of data.

For example, to include only messages from a Windows Event log with ID `8015`, you can add a Logs Filter to the source template. Select the **Type** of the filter as "Include messages that match" and use the following filter regular expression:

```
.*"id":8015.*
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-logs.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

## Rules and limitations

When creating regular expression rules, adhere to the following guidelines:

- Your rule must comply with [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
- If your rule matches *any part* of a log line, the entire log line will be matched.
- For *single-line messages*, it is not necessary to prefix or suffix the regex with `.*`.
- *Exclude rules* take precedence over *include rules*. Include rules are processed first, but if an exclude rule matches data that also matches the include rule, the data will be excluded.
- When multiple rules are listed, the assumed Boolean operator is `OR`.
