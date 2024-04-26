---
id: ai-machine-learning
title: Sumo Logic AI and Machine Learning Features
sidebar_label: AI and Machine Learning
description: Leverage Sumo Logic AI- and ML-backed features to resolve issues and reduce MTTR.
keywords:
   - artificial intelligence
   - ai
   - machine learning
   - ml
   - llm
   - mttr
tags: [ai]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this document, you'll learn about Sumo Logic features that leverage artificial intelligence (AI), machine learning (ML), and pattern recognition to support cloud security management, mitigate risks, reduce manual workloads for your team, and streamline incident response and resolution.

These alerting, security, and remediation features go beyond visual analytics. They are tools that accelerate issue resolution, reduce mean time to respond (MTTR), and empower you to proactively monitor and safeguard your technology stack against evolving threats.

<img src={useBaseUrl('img/get-started/ai-diagram.png')} alt="ai-diagram.png" />

## Observability

Sumo Logic provides observability into your technology stack by analyzing the millions of log files created by your technology stack, detecting anomalies and outlier data, and reporting security issues in a timely fashion with fewer false positives.


### Log Search

* Copilot. <!--link - /docs/search/copilot - not published yet-->An in-product AI-based assistant that allows you to obtain insights quickly from logs. You can interact with Copilot using plain English queries and utilize search suggestions for result refinement.
* [LogReduce&reg;](/docs/search/logreduce). Utilizes AI-driven algorithms to cluster log messages based on string and pattern similarity. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. Users can refine results based on their preferences, [teaching LogReduce](/docs/search/logreduce/influence-the-logreduce-outcome) for more specific outcomes.


### Alerts

#### Anomaly Detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#select-monitor-type-and-detection-method) applies ML techniques to detect anomalies and identify suspicious activity. When you create a monitor using this method, it establishes a baseline for normal signal behavior, leveraging historical data to minimize false positives. Key features include:
  - Detection of seasonality in log signals (hourly, daily, weekly).
  - Auto-tuned anomaly detection for minimal user input.
  - Extensible detector framework allowing you to specify additional context for anomaly detection.
  - Associate anomaly response with a monitor by creating an Automated Playbook.


AI-driven alerting overcomes monitoring limitations through:

* **Model-driven anomaly detection**. Utilizing historical data, ML models establish accurate baselines, eliminating guesswork and noise in alerts.
* **AutoML**. The system self-tunes, including seasonality detection, minimizing user intervention for a simpler experience.
* **User context**. Users set alert sensitivity and incident thresholds, adding context to anomaly detection to mitigate noise.
* **One-click playbook assignment**. Monitors seamlessly link to Automation Service playbooks, expediting response without manual intervention.
* **Auto-diagnosis and recovery**. Sumo Logic Automation Service automates diagnosis and resolution, closing the loop from alert to recovery.

#### Automated Playbooks

:::note prerequisites
Must be used in conjunction with our [Automation Service](/docs/platform-services/automation-service).
:::

[Automated Playbooks](/docs/alerts/monitors/use-playbooks-with-monitors) let you set up a predefined set of actions and conditional statements that respond to an events like security incidents by running an automated workflow. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it.

### Apps

Sumo Logic offers integrations with various AI-driven platforms to analyze large volumes of data, including:

* [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai)
* [OpenAI ChatGPT](/docs/platform-services/automation-service/app-central/integrations/openai-chatgpt)
* [Vectra AI](/docs/platform-services/automation-service/app-central/integrations/vectra)
* [Microsoft Sentinel](/docs/platform-services/automation-service/app-central/integrations/microsoft-sentinel)
* [Darktrace](/docs/platform-services/automation-service/app-central/integrations/darktrace)
* [Criminal IP](/docs/platform-services/automation-service/app-central/integrations/criminal-ip)
* [Arcanna](/docs/platform-services/automation-service/app-central/integrations/arcanna)

### Root Cause Explorer

<!-- need more info-->

## Security

### Cloud SIEM

Sumo Logic's Cloud SIEM leverages AI-driven rules for security management, including:

* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

### Global Intelligence

Our Global Intelligence Service apps provide security teams with valuable real-time security intelligence to scale detection, prioritization, investigation, and workflow to prevent potentially harmful service configurations that could lead to a costly data breach.

* [Global Intelligence Service](/docs/integrations/global-intelligence)


## More information

* [Sumo Logic Blog | Machine learning overview](https://www.sumologic.com/glossary/machine-learning/)
<!--
-bashyam's blog about how we trained our AI
-Flex Pricing? The more log data ingested, the sharper your analytics and ML/AI insights become. By eliminating ingest limitations and empowering an ML/AI-driven single source of truth for analytics, Flex enables DevOps and DevSecOps teams to troubleshoot faster, accelerate release velocity, and ensure reliable, secure digital experiences.
-Splunk-to-Sumo conversion migration tool?
-->
