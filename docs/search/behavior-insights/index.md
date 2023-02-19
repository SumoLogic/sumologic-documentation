---
slug: /search/behavior-insights
title: Behavior Insights
description: Gain behavioral insight of your environment using LogReduce operators.
---

Behavior Insights encompasses three log search operators to accelerate insights, troubleshooting, and action plans using structured logs. About 23% of the daily log ingest volume pertains to JSON data and accounts for a growing share of total log volume. This growth is driven by modern applications and underlying cloud (AWS, GCP, Azure) and orchestrator logs. Behavior Insights helps answer the following questions for SecOps, DevOps, and business users:

* What activity patterns are evident from structured logs? What patterns are trending?
* Which groups of users, apps, services, or resources are responsible for activity in logs?
* Which groups of users, apps, services, or resources are responsible for unusual activity in logs?

Modeled after our LogReduce log summarization feature, the LogReduce Values and LogReduce Keys operators cluster logs based on their structure or pattern and activity content respectively.


## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/behavior-insights/logexplain"><h4>LogExplain</h4></a>
  <p>This operator finds the root cause of outliers in logs based on conditions you specify.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/behavior-insights/logexplain"><h4>LogReduce Keys</h4></a>
  <p>Clusters JSON logs based on keys providing an at-a-glance summary of patterns in logs based on their schema while ignoring specific values.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/behavior-insights/logreduce-values"><h4>LogReduce Values</h4></a>
  <p>Clusters JSON logs using the values of keys.</p>
  </div>
</div>
</div>
