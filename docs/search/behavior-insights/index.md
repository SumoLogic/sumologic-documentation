---
slug: /search/behavior-insights
title: Behavior Insights
description: Gain behavioral insight of your environment using LogReduce operators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Behavior Insights encompasses three log search operators to accelerate insights, troubleshooting, and action plans using structured logs. About 23% of the daily log ingest volume pertains to JSON data and accounts for a growing share of total log volume. This growth is driven by modern applications and underlying cloud (AWS, GCP, Azure) and orchestrator logs. Behavior Insights helps answer the following questions for SecOps, DevOps, and business users:

* What activity patterns are evident from structured logs? What patterns are trending?
* Which groups of users, apps, services, or resources are responsible for activity in logs?
* Which groups of users, apps, services, or resources are responsible for unusual activity in logs?

Modeled after our LogReduce log summarization feature, the LogReduce Values and LogReduce Keys operators cluster logs based on their structure or pattern and activity content respectively.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/behavior-insights/logcompare')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>LogCompare</h4></a>
  <p>Compare log data from different time periods to detect major changes or anomalies.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/behavior-insights/logreduce')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>LogReduce</h4></a>
  <p>Assess activity patterns for things like a range of devices or traffic on a website.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/behavior-insights/logexplain')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>LogExplain</h4></a>
  <p>Find the root cause of outliers in logs based on conditions you specify.</p>
  </div>
</div>
</div>
