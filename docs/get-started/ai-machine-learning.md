---
id: ai-machine-learning
title: Sumo Logic AI and Machine Learning Features
sidebar_label: AI and Machine Learning
description: Leverage Sumo Logic's automated machine learning and AI capabilities (mention features here) to (business value).
tags: [ai, artificial intelligence, machine learning, ml, llm]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic offers a robust platform for IT DevSecOps teams, leveraging artificial intelligence (AI), machine learning (ML), and pattern recognition to enhance security management processes. By implementing our machine learning capabilities, you can get real-time security monitoring security management support for your cloud services, streamline incident response processes, and mitigate risks effectively. Our suite of observability and security features empowers developers to proactively monitor and safeguard your technology stack against evolving threats.

<!--Today's machine learning software applications are becoming increasingly sophisticated in their approach, along with the ways they can be integrated with other functionalities. Machine learning is also frequently seen as a value-added feature for software products across industry verticals, including finance, healthcare and IT. IT security professionals are increasingly relying on machine learning applications to facilitate real-time security monitoring of increasingly large and disparate IT infrastructure networks.

The implementation of machine learning technology to support the security management of cloud services can reduce manual workloads for your team and streamline your incident response process. Sumo Logic uses machine learning and pattern recognition to analyze the millions of log files created by your technology stack, detect anomalies and outlier data, and report security issues in a timely fashion with fewer false positives.-->

<img src={useBaseUrl('img/get-started/ai-diagram.png')} alt="ai-diagram.png" />

## Observability

Sumo Logic provides observability into your technology stack by analyzing the millions of log files created by your technology stack, detecting anomalies and outlier data, and reporting security issues in a timely fashion with fewer false positives.


### Log Search

* Copilot. An in-product AI-based assistant that allows you to obtain insights quickly from logs. You can interact with Copilot using plain English queries and utilize search suggestions for result refinement.
* [LogReduce&reg;](/docs/search/logreduce). Utilizes AI-driven algorithms to cluster log messages based on string and pattern similarity. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. Users can refine results based on their preferences, [teaching LogReduce](influence-the-logreduce-outcome.md) for more specific outcomes.


### Alerts

* [Anomaly Detection](/docs/alerts/monitors/create-monitor/#select-monitor-type-and-detection-method). Applies ML techniques to detect anomalies and identify suspicious activity. When you create a monitor using this method, it establishes a baseline for normal signal behavior, leveraging historical data to minimize false positives. Key features include:
  - Detection of seasonality in log signals (hourly, daily, weekly).
  - Auto-tuned anomaly detection for minimal user input.
  - Extensible detector framework allowing you to specify additional context for anomaly detection.
  - Associate anomaly response with a monitor by creating a playbook, as described below.
* [Automated Playbooks](/docs/alerts/monitors/use-playbooks-with-monitors). Set up a predefined set of actions and conditional statements that respond to an events like security incidents by running an automated workflow. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it.
   :::note
   Must be used in conjunction with our [Automation Service](/docs/platform-services/automation-service).
   :::

### Apps

Sumo Logic offers integrations with various AI-driven platforms to analyze large volumes of data, including:

* [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai)
* [OpenAI ChatGPT](/docs/platform-services/automation-service/app-central/integrations/openai-chatgpt/)
* [Vectra AI](/docs/platform-services/automation-service/app-central/integrations/vectra)
* [Microsoft Sentinel](/docs/platform-services/automation-service/app-central/integrations/microsoft-sentinel)
* [Darktrace](/docs/platform-services/automation-service/app-central/integrations/darktrace)
* [Criminal IP](docs/platform-services/automation-service/app-central/integrations/criminal-ip.md)
* [Arcanna](/docs/platform-services/automation-service/app-central/integrations/arcanna)

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
