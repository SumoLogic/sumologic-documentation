---
slug: /search/behavior-insights
title: Behavior Insights
description: Gain behavioral insight of your environment using LogReduce operators.
---

Behavior Insights encompasses three log search operators to accelerate insights, troubleshooting, and action plans using structured logs. About 23% of the daily log ingest volume pertains to JSON data and accounts for a growing share of total log volume. This growth is driven by modern applications and underlying cloud (AWS, GCP, Azure) and orchestrator logs. Behavior Insights helps answer the following questions for SecOps, DevOps, and business users:

* What activity patterns are evident from structured logs? What patterns are trending?
* Which groups of users, apps, services, or resources are responsible for activity in logs?
* Which groups of users, apps, services, or resources are responsible for unusual activity in logs?

Modeled after our LogReduce log summarization feature, the two Behavior Insights operators below cluster logs based on their structure or pattern and activity content respectively.

* [LogReduce Keys](logreduce-keys.md) clusters JSON logs based on keys providing an at-a-glance summary of patterns in logs based on their schema while ignoring specific values.
* [LogReduce Values](logreduce-values.md) clusters JSON logs using the values of keys.

The third Behavior Insights operator, [LogExplain](logexplain.md), finds the root cause of outliers in logs based on conditions you specify.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
