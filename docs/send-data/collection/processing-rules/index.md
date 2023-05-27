---
slug: /send-data/collection/processing-rules
title: Processing Rules
description: Use Sumo Logic processing rules to filter data at ingest and to forward data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Processing rules filter and can forward data sent to Sumo Logic from a Source. The rules affect only the data sent to Sumo Logic; logs and metrics on your end remain intact and unchanged. Data filtered by a Collector using Processing Rules does not count towards your daily data volume quota.

Using processing rules on a [Hosted Collector](/docs/send-data/hosted-collectors) to filter out 50% or more of your data on a single Source may be subject to temporary [throttling](/docs/manage/ingestion-volume/log-ingestion.md). Excessive filtration can lead to temporary increases in ingest latency. Throttling reduces the effect excessive filtration has on ingestion latency. We encourage you to limit the proportion of data you are filtering out. This policy is subject to change.

Filtered data is fed to the Collector, but does not upload to the Sumo Logic cloud.

**Log Sources** support the following rule types:

* [Exclude messages that match](include-and-exclude-rules.md). Remove messages that you don't want to send to Sumo Logic at all ("denylist" filter). These messages are skipped after reaching the Source and are not uploaded to Sumo Logic.
* [Include messages that match](include-and-exclude-rules.md). Send only the data you'd like in your Sumo Logic account (an "allowlist" filter). This type of rule can be useful, for example, if you only want to include only messages coming from a firewall.
* [Hash messages that match](hash-rules.md). Replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it's fully hidden.
* [Mask messages that match](mask-rules.md). Replace an expression with a mask string that you can customize—this is another option to protect data, such as passwords, that you wouldn't normally track.
* [Forward messages that match](data-forwarding-rules.md). Send data from an Installed Collector Source to a selected non-Sumo location.

**Metrics Sources** support the following rule types:

* [Exclude metrics that match](metrics-include-and-exclude-rules.md). Remove metrics that you don't want to send to Sumo Logic at all ("denylist" filter).
* [Include metrics that match](metrics-include-and-exclude-rules.md). Send only selected metrics to your Sumo Logic account (an "allowlist" filter). 

## Limitations

* Exclude, include, hash, and mask rules can process single line logs up to 1MB and multiline logs up to 2,000 lines or 512KB, whichever comes first.
* The maximum number of Processing Rules allowed on a Source is 100.
* Regular expressions must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).

## How do Processing Rules Work Together?

You can create one or more processing rules for a Source, combining the different types of filters to generate the exact data set you want sent to Sumo Logic.  

When a Source has multiple rules they are processed in the following order: includes, excludes, masks, then forwarders.   

Exclude rules take priority over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/create-processing-rule/"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Create a Processing Rules</h4></a>
  <p>Processing rules filter and can forward data sent to Sumo Logic from a Source.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/data-forwarding-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Data Forwarding Rules
</h4></a>
  <p>Data Forwarding rules forward data collected from an Installed Collector to non-Sumo Logic destinations.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/hash-rules/"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Hash Rules</h4></a>
  <p>With a hash rule, an expression you choose will be replaced by a hash code.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/mask-rules/"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Mask Rules</h4></a>
  <p>Create a mask rule to replace an expression with a mask string.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/include-and-exclude-rule/"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Include and Exclude Rules</h4></a>
  <p>Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/collection/processing-rules/metrics-include-and-exclude-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Metrics Include and Exclude Rules</h4></a>
  <p>Use metrics processing rules to specify what metrics a metrics source are sen to Sumo Logic.</p>
  </div>
</div>
</div>
