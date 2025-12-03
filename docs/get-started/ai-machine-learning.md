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

## What’s new: Dojo AI for the SOC

Sumo Logic Dojo AI is our agentic AI platform for security teams. It brings specialized agents that reduce manual triage, summarize investigations at the insight level, and help analysts move from reactive to proactive workflows. Dojo AI is built and deployed on AWS and focuses on governed, context-first automation designed for enterprise SOCs. [Learn more](https://www.sumologic.com/solutions/dojo-ai).

* **Query Agent**. Translate plain-language questions into efficient Sumo queries to speed exploration and scoping. Works hand in hand with Mobot to improve query quality and outcomes.
* **Knowledge Agent**. Ask any how-to question about Sumo Logic, such as "How do I add a collector for AWS CloudTrail?" or "What are the API endpoints for Sumo Logic?", and get answers sourced from our official documentation.
* **Summary Agent**. Generate clear, insight-level summaries that help teams understand incidents faster and respond with confidence. Available in Cloud SIEM.
* **Availability**. Dojo AI is available through Sumo Logic and in AWS Marketplace.

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

### Mobot

Mobot is our AI-based assistant designed that simplifies log analysis by allowing you to ask questions in plain language and provides search suggestions without the need to write log queries. Through plain language queries and automatic log query generation, Mobot simplifies the investigation process, allowing even users without extensive log analysis expertise to pinpoint anomalies and potential threats efficiently.

With Mobot, you can effortlessly investigate complex issues without writing intricate log queries manually. Its intuitive interface guides users through each step of the investigation, refining queries based on AI prompts and feedback. This streamlined approach accelerates the identification of security threats, empowering users to make informed decisions rapidly and proactively detect potential risks. [Learn more](/docs/search/mobot).

### LogReduce

LogReduce&reg; utilizes AI-driven algorithms to cluster log messages based on string similarity and distill thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, teaching LogReduce for more specific outcomes. [Learn more](/docs/search/behavior-insights/logreduce).

### LogCompare

LogCompare simplifies log analysis by enabling easy comparison of log data from different time periods to detect changes or anomalies, facilitating troubleshooting and root cause discovery. By automatically running delta analysis, LogCompare streamlines the process, allowing users to identify significant alterations in log patterns efficiently. Utilizing baseline and target queries, LogCompare clusters logs into patterns and compares them based on the significance of change, providing insights into deviations over time. With intuitive actions like promoting, demoting, and splitting signatures, users can refine their analysis and focus on relevant patterns, ultimately enhancing decision-making and threat detection capabilities. Additionally, LogCompare supports alerts and scheduled searches to notify users of new signatures or significant changes, ensuring proactive monitoring and response to evolving log data. [Learn more](/docs/search/behavior-insights/logcompare).

### AI in alerting

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

## Security

Our Sumo Logic AI for Security functionality empowers SOC analysts and threat hunters to effectively safeguard their technology stack against evolving threats. By integrating advanced tools for discovery, detection, investigation, response, and protection, we minimize dwell time, reduce false positives, accelerate incident resolution, and proactively prevent future incidents, ensuring robust security and resilience for your cloud, container, and on-prem resources.

### Dojo AI (agentic AI for the SOC)

Dojo AI brings governed, specialized agents into daily SOC workflows so you can cut manual triage, accelerate query-to-answer steps, and get consistent, insight-level investigation summaries. Built and deployed on AWS, Dojo AI focuses on measurable gains in accuracy and response time with a human in the loop.

* **Query Agent**. Ask questions in plain language and get optimized Sumo Logic queries that speed data exploration.
* **Summary Agent**. See AI-generated summaries on insights in Cloud SIEM to understand incidents faster.
* **Get it**. Available from Sumo Logic and in AWS Marketplace.

### Cloud SIEM

#### Insight summary

Sumo Logic's Dojo AI **Summary** Agent, an agentic AI tool, generates a synopsis for each insight that describes the threat incidents that led to its creation. This helps security teams understand incidents faster and accelerate response time. [Learn more](/docs/cse/get-started-with-cloud-siem/insight-summary/).


#### Rules

Sumo Logic's Cloud SIEM rules leverage AI for the following:
* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

### Global Intelligence

Our Global Intelligence Service apps provide security teams with valuable real-time security intelligence to scale detection, prioritization, investigation, and workflow to prevent potentially harmful service configurations that could lead to a costly data breach. [Learn more](/docs/integrations/global-intelligence).


## Additional resources


* Guide:
   * [Dojo AI Overview](https://www.sumologic.com/solutions/dojo-ai)
   * [Understanding artificial intelligence for log analytics](https://www.sumologic.com/guides/machine-data-analytics)
* Blogs:
   * [Welcome to Dojo AI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc)
   * [What are the differences between artificial intelligence, machine learning, deep learning and generative AI?](https://www.sumologic.com/blog/machine-learning-deep-learning)
   * [DevSecOps in an AI world requires disruptive log economics](https://www.sumologic.com/blog/devsecops-ai-disruptive-log-economics)
   * [Generative AI: The latest example of systems of insight](https://www.sumologic.com/blog/generative-ai-latest-example-systems-of-insight)
   * [Harnessing the power of artificial intelligence in log analytics](https://www.sumologic.com/blog/power-ai-log-analytics/)
   * [Reduce alert noise, automate incident response and keep coding with AI-driven alerting](https://www.sumologic.com/blog/ai-driven-low-noise-alerts/)
* News: [Dojo AI launch announcement](https://www.sumologic.com/newsroom/sumo-logic-brings-agentic-ai-into-enterprise-security-stack-with-launch-of-dojo-ai-on-amazon-web-services)
