---
id: other-ai-features
title: Other AI and ML Features
sidebar_label: Other AI and ML Features
description: Classical machine learning and AI platform integrations in Sumo Logic, including LogReduce, LogCompare, anomaly detection, Cloud SIEM rules, and third-party AI app integrations.
keywords:
  - machine learning
  - ml
  - logreduce
  - logcompare
  - anomaly detection
  - insight trainer
  - global intelligence
  - ai integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Beyond DojoAI, Sumo Logic applies classical machine learning across observability and security workflows to surface patterns, reduce noise, and accelerate detection and investigation.

## Classical machine learning

### Observability

These classical machine learning capabilities help developers and SREs manage and optimize their technology stack: discovering app, service, and infrastructure relationships; using M.E.L.T. telemetry to reduce detection time and false positives; and diagnosing, resolving, and preventing incidents faster.

#### LogReduce

[LogReduce®](/docs/search/behavior-insights/logreduce) utilizes AI-driven algorithms to cluster log messages based on string similarity and distill thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, teaching LogReduce for more specific outcomes.

#### LogCompare

[LogCompare](/docs/search/behavior-insights/logcompare) compares log data from different time periods to identify changes or anomalies, helping with troubleshooting and root cause analysis. It clusters logs into patterns using baseline and target queries, then highlights significant differences over time. You can refine results by promoting, demoting, or splitting signatures, and set up alerts for new or changed patterns.

#### AI in alerting

##### Anomaly detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), powered by ML, efficiently flags suspicious activities by establishing baseline behavior and minimizing false positives. It also automatically fine-tunes anomaly detection with minimal user input, and you can associate it with a playbook to link anomaly responses with monitors, streamlining incident response.

##### Automated playbooks

With [Automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors), you can set up a predefined set of actions and conditional statements that respond to events like security incidents proactively by running an automated workflow without manual intervention. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it. You can access playbooks when creating a monitor, viewing an alert, or directly from the Automation Service.

### Security

These classical machine learning capabilities help SOC analysts and threat hunters safeguard cloud, container, and on-prem resources against evolving threats: supporting discovery, detection, investigation, response, and protection to reduce dwell time and false positives, and accelerate incident resolution.

#### Cloud SIEM Rules

Sumo Logic's Cloud SIEM rules leverage AI for the following:
* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

#### Global Intelligence

The [Global Intelligence Service](/docs/integrations/global-intelligence) apps provide security teams with real-time security intelligence to scale detection, prioritization, investigation, and workflow to prevent potentially harmful service configurations that could lead to a costly data breach.

## App integrations for AI platforms

Sumo Logic offers integrations with AI platforms for monitoring, governance, and security analysis. The following are some popular examples that let you collect, analyze, and act on data from AI tools directly within Sumo Logic:

* [Amazon Bedrock](/docs/integrations/amazon-aws/amazon-bedrock)
* [Amazon Bedrock AgentCore](/docs/integrations/amazon-aws/amazon-bedrock-agentcore)
* [Amazon SageMaker](/docs/integrations/amazon-aws/amazon-sagemaker)
* [ChatGPT Compliance](/docs/integrations/saas-cloud/chatgpt-compliance)
* [Claude Compliance](/docs/integrations/saas-cloud/claude-compliance)
* [Databricks Audit](/docs/integrations/saas-cloud/databricks-audit)
* [GitHub Copilot](/docs/integrations/saas-cloud/github-copilot)
* [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai)
* [LiteLLM](/docs/integrations/saas-cloud/litellm)
* [Microsoft Foundry](/docs/integrations/microsoft-azure/microsoft-foundry)
* [OpenLLMetry](/docs/integrations/aiml/opentelemetry/openllmetry)
