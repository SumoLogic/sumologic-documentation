---
id: ai-machine-learning
title: Harnessing AI and Machine Learning with Sumo Logic
sidebar_label: AI and Machine Learning
description: Leverage Sumo Logic AI- and ML-backed features to set up alerts, resolve issues, and reduce MTTR, enhancing cloud security management and streamlining incident response. Empower your team with advanced observability and proactive threat detection.
keywords:
   - artificial intelligence
   - ai
   - machine learning
   - ml
   - llm
   - mttr
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this document, you'll learn about Sumo Logic features that leverage artificial intelligence (AI), machine learning (ML), and pattern recognition to support cloud security management, mitigate risks, reduce manual workloads for your team, and streamline incident response and resolution.

<details>
<summary>What do these terms mean?</summary>

AI encompasses machines that mimic human-like intelligence, leveraging algorithms to compute tasks efficiently. It includes machine learning and deep learning.

ML, a subset of AI, involves training machines to learn from data without explicit programming, improving performance over time. Within ML, there are various types: supervised learning, unsupervised learning, semi-supervised learning, and reinforcement learning, each suited for different problem settings such as classification, regression, and clustering.

Deep learning, another subset of AI, employs artificial neural networks with multiple layers to process data, excelling in tasks like image recognition and natural language understanding. Generative AI, closely related to deep learning, produces new data resembling training data, often utilizing large language models like GPT.

Pattern learning is fundamental to machine learning and deep learning, where algorithms discern patterns in data to make predictions or classifications, enabling advancements in various fields through data-driven decision-making.

</details>

Our AI and security analytics capabilities enable security and development teams to align around a unified source of truth, allowing for quicker collection and action on data insights.

Our alerting, security, and remediation features extend beyond visual analytics, providing essential tools to accelerate issue resolution, reduce mean time to respond (MTTR), and empower proactive monitoring and safeguarding of your technology stack against evolving threats.

Sumo Logic provides observability into your technology stack by analyzing the millions of log files created in your environment, detecting anomalies and outlier data, and reporting security issues in a timely fashion with fewer false positives.

## Observability

Sumo Logic AI for Observability functionality equips developers and SREs with powerful tools to efficiently manage and optimize their technology stack.

Through comprehensive discovery, monitoring, diagnosis, recovery, and prevention capabilities, we ensure minimized downtime, reduced false positives, faster incident resolution, and proactive issue prevention, all aimed at enhancing the overall health and performance of your applications and services. These capabilities include discovering app, service, and infrastructure stack relationships; utilizing M.E.L.T. telemetry to minimize detection time and false positives; diagnosing incidents swiftly; accelerating recovery times; and preventing future incidents.

### Copilot

Copilot is our AI-based assistant designed that simplifies log analysis by allowing you to ask questions in plain English and provides search suggestions without the need to write log queries. Through plain English queries and automatic log query generation, Copilot simplifies the investigation process, allowing even users without extensive log analysis expertise to pinpoint anomalies and potential threats efficiently.

With Copilot, you can effortlessly investigate complex issues without writing intricate log queries manually. Its intuitive interface guides users through each step of the investigation, refining queries based on AI prompts and feedback. This streamlined approach accelerates the identification of security threats, empowering users to make informed decisions rapidly and proactively detect potential risks. [Learn more](/docs/search/copilot).

### LogReduce

LogReduce&reg; utilizes AI-driven algorithms to cluster log messages based on string similarity and distill thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, teaching LogReduce for more specific outcomes. [Learn more](/docs/search/behavior-insights/logreduce).

### LogCompare

LogCompare simplifies log analysis by enabling easy comparison of log data from different time periods to detect changes or anomalies, facilitating troubleshooting and root cause discovery. By automatically running delta analysis, LogCompare streamlines the process, allowing users to identify significant alterations in log patterns efficiently. Utilizing baseline and target queries, LogCompare clusters logs into patterns and compares them based on the significance of change, providing insights into deviations over time. With intuitive actions like promoting, demoting, and splitting signatures, users can refine their analysis and focus on relevant patterns, ultimately enhancing decision-making and threat detection capabilities. Additionally, LogCompare supports alerts and scheduled searches to notify users of new signatures or significant changes, ensuring proactive monitoring and response to evolving log data. [Learn more](/docs/search/behavior-insights/logcompare).

### AI-driven Alerts

#### Anomaly Detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), powered by machine learning, efficiently flags suspicious activities by establishing baseline behavior and minimizing false positives. It also automatically fine-tunes anomaly detection with minimal user input, and you can associate it with a playbook to link anomaly responses with monitors, streamlining incident response.

#### Automated playbooks

With [Automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors), you can set up a predefined set of actions and conditional statements that respond to an events like security incidents proactively by running an automated workflow without manual intervention. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it. You can access playbooks when creating a monitor, viewing an alert, or directly from the Automation Service.

### App integrations for AI platforms

Sumo Logic offers seamless integrations with various AI-driven platforms to enable comprehensive analysis of large data volumes. These integrations empower users to leverage advanced AI capabilities directly within Sumo Logic, including:

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

Our Sumo Logic AI for Security functionality empowers SOC analysts and threat hunters to effectively safeguard their technology stack against evolving threats. By integrating advanced tools for discovery, detection, investigation, response, and protection, we minimize dwell time, reduce false positives, accelerate incident resolution, and proactively prevent future incidents, ensuring robust security and resilience for your cloud, container, and on-prem resources.

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
-Bashyam's blog about how we trained our AI
-Flex Pricing? The more log data ingested, the sharper your analytics and ML/AI insights become. By eliminating ingest limitations and empowering an ML/AI-driven single source of truth for analytics, Flex enables DevOps and DevSecOps teams to troubleshoot faster, accelerate release velocity, and ensure reliable, secure digital experiences.
-Splunk-to-Sumo conversion migration tool?
-->
