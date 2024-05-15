---
id: ai-machine-learning
title: Sumo Logic AI and Machine Learning-Backed Features
sidebar_label: AI and ML
description: Leverage Sumo Logic AI- and ML-backed features to set up alerts, resolve issues, and reduce MTTR.
keywords:
   - artificial intelligence
   - ai
   - machine learning
   - ml
   - llm
   - mttr
tags: [ai, ml, artificial intelligence, machine learning]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this document, you'll learn about Sumo Logic features that leverage artificial intelligence (AI), machine learning (ML), and pattern recognition to support cloud security management, mitigate risks, reduce manual workloads for your team, and streamline incident response and resolution.

These alerting, security, and remediation features go beyond visual analytics. They are tools that accelerate issue resolution, reduce mean time to respond (MTTR), and empower you to proactively monitor and safeguard your technology stack against evolving threats.

<details>
<summary>What's the difference?</summary>
* Artificial intelligence
* Machine learning
* Pattern recognition

</details>

<!-- Remove OR ask brand to create a cleaner, branded version
<img src={useBaseUrl('img/get-started/ai-diagram.png')} alt="ai-diagram.png" />
-->

## Observability

Sumo Logic provides observability into your technology stack by analyzing the millions of log files created by your technology stack, detecting anomalies and outlier data, and reporting security issues in a timely fashion with fewer false positives.


### Log Search

* [Copilot](/docs/search/copilot). Our in-product AI-based assistant that transforms log analysis by enabling users to quickly obtain actionable insights. Through plain English queries and automatic log query generation, Copilot simplifies the investigation process, allowing even users without extensive log analysis expertise to pinpoint anomalies and potential threats efficiently.

With Copilot, users can effortlessly investigate complex issues without writing intricate log queries manually. Its intuitive interface guides users through each step of the investigation, refining queries based on AI prompts and feedback. This streamlined approach accelerates the identification of security threats, empowering users to make informed decisions rapidly and proactively detect potential risks.
* [LogReduce&reg;](/docs/search/logreduce). Utilizes AI-driven algorithms to cluster log messages based on string similarity, and boils down thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, [teaching LogReduce](/docs/search/logreduce/influence-the-logreduce-outcome) for more specific outcomes.
* [LogCompare](/docs/search/logcompare). Identify and predict anomalies in real time with outlier detection, and uncover root-causes using LogCompare pattern analysis.

### Alerts

#### Anomaly Detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#select-monitor-type-and-detection-method), powered by machine learning, efficiently flags suspicious activities by establishing baseline behavior and minimizing false positives. It also automatically fine-tunes anomaly detection with minimal user input, and you can associate it with a playbook to link anomaly responses with monitors, streamlining incident response.

#### Automated playbooks

With [Automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors), you can set up a predefined set of actions and conditional statements that respond to an events like security incidents proactively by running an automated workflow without manual intervention. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it. You can access playbooks when creating a monitor, viewing an alert, or directly from the Automation Service.

### Apps

Sumo Logic offers integrations with various AI-driven platforms to analyze large volumes of data, including:

* [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai)
* [OpenAI ChatGPT](/docs/platform-services/automation-service/app-central/integrations/openai-chatgpt)
* [Vectra AI](/docs/platform-services/automation-service/app-central/integrations/vectra)
* [Microsoft Sentinel](/docs/platform-services/automation-service/app-central/integrations/microsoft-sentinel)
* [Darktrace](/docs/platform-services/automation-service/app-central/integrations/darktrace)
* [Criminal IP](/docs/platform-services/automation-service/app-central/integrations/criminal-ip)
* [Arcanna](/docs/platform-services/automation-service/app-central/integrations/arcanna)

<!-- Removed - not in Kanso
### Root Cause Explorer

Accelerates troubleshooting by surfacing events of interest correlated with application incidents. [Learn more](/docs/observability/root-cause-explorer)
-->

## Security

### Cloud SIEM

Sumo Logic's Cloud SIEM leverages AI-driven rules for security management, including:

* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

### Global Intelligence

Our Global Intelligence Service apps provide security teams with valuable real-time security intelligence to scale detection, prioritization, investigation, and workflow to prevent potentially harmful service configurations that could lead to a costly data breach. [Learn more](/docs/integrations/global-intelligence).


## More information

* [What are the differences between artificial intelligence, machine learning, deep learning and generative AI?](https://www.sumologic.com/blog/machine-learning-deep-learning)
* [Understanding artificial intelligence for log analytics](https://www.sumologic.com/guides/machine-data-analytics)
* [DevSecOps in an AI world requires disruptive log economics](https://www.sumologic.com/blog/devsecops-ai-disruptive-log-economics)
* [Generative AI: The latest example of systems of insight](https://www.sumologic.com/blog/generative-ai-latest-example-systems-of-insight)
<!--
-bashyam's blog about how we trained our AI
-Flex Pricing? The more log data ingested, the sharper your analytics and ML/AI insights become. By eliminating ingest limitations and empowering an ML/AI-driven single source of truth for analytics, Flex enables DevOps and DevSecOps teams to troubleshoot faster, accelerate release velocity, and ensure reliable, secure digital experiences.
-Splunk-to-Sumo conversion migration tool?
-->
