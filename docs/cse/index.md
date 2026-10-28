---
slug: /cse
title: Cloud SIEM
keywords:
  - cloud siem
  - cse
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud SIEM is Sumo Logic's cloud-based security information and event management (SIEM) system, which collects, correlates, and prioritizes security data into actionable insights. It provides the following functionality: 

* Collection of log and event data from your infrastructure and applications, on-premise and in-cloud.
* Correlation of the collected data to reduce the volume of info you need to sift through to investigate issues.
* A rich interface that analysts and admins can use to investigate security issues and administer Cloud SIEM itself.
* Integration with the Sumo Logic core platform.

:::training Sumo Logic Academy

import SumoAcademy from '../reuse/sumo-logic-academy.md';

<SumoAcademy/>

* **Self-paced**:
    * [Essential Cloud SIEM Skills for SOC Analysts](https://learn.sumologic.com/path/sumo-security/essential-cloud-siem-skills-for-soc-analysts)
    * [Cloud SIEM Training Self-Paced](https://learn.sumologic.com/path/sumo-security/cloud-siem-training-self-paced)
* **Instructor-led virtual classes**:
    * [Workshops: Essential Cloud SIEM Skills for SOC Analysts](https://www.sumologic.com/learn/training?_workshops=essential-cloud-siem-skills-for-soc-analysts#section-2)
    * [Certifications: Cloud SIEM](https://www.sumologic.com/learn/training?_certifications=cloud-siem#section-2)
    * [Workshops: Automation Workshop](https://www.sumologic.com/learn/training?_workshops=automation-workshop#section-2)
:::

This section contains the following topics:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/get-started-with-cloud-siem')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Get Started with Cloud SIEM</h4></a>
  <p>Learn how to start using Cloud SIEM for threat hunting.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/records-signals-entities-insights')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Records, Signals, Entities, and Insights</h4></a>
  <p>Learn about Insight generation, working with Entities, and how to query Cloud SIEM Records.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/ingestion')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Ingestion</h4></a>
  <p>Learn how to configure ingestion for supported products and services.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/rules')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Rules</h4></a>
  <p>Learn how to write rules, rules syntax, and Cloud SIEM built-in rules.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/schema')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Schema</h4></a>
  <p>Learn about Cloud SIEM Schema v3, schema attributes, and the Record processing pipeline.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/sensors')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Sensors</h4></a>
  <p>Cloud SIEM Sensors collect log and event data from your infrastructure and applications.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/integrations')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Integrations</h4></a>
  <p>Cloud SIEM integration with Sumo Logic and threat intel sources, and leveraging the Cloud SIEM Insight Enrichment Server.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/match-lists-suppressed-lists')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Match Lists and Suppressed Lists</h4></a>
  <p>Learn about creating a Match list and their usage in rules.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/automation')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Automation</h4></a>
  <p>Learn how to configure automations to create notifications and enrichments in Cloud SIEM.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/administration')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Administration</h4></a>
  <p>Learn how to set up user accounts and roles, Actions, Network Blocks, custom Insight status and sub-resolutions, and more.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/troubleshoot')}><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Shield on a cloud icon" width="40"/><h4>Troubleshoot</h4></a>
  <p>Learn how to troubleshoot problems with Cloud SIEM.</p>
  </div>
</div>
</div>

## FAQ

### What is Cloud SIEM?

Cloud SIEM is a cloud-based security information and event management system that collects and correlates log and event data from your infrastructure and applications into prioritized security insights.

### What data can I send to Cloud SIEM?

You can forward log and event data already ingested into Sumo Logic, from on-premises or cloud sources, to Cloud SIEM for parsing, mapping, and enrichment into records.

### How is Cloud SIEM different from Cloud SOAR?

Cloud SIEM focuses on the investigation phase of security operations, while [Cloud SOAR](/docs/cloud-soar/) focuses on automated response. You can use them together or independently.

### What are records, signals, entities, and insights in Cloud SIEM?

Records are parsed and enriched log messages. Signals are created when a record matches a rule. Entities are the unique identifiers, like IP addresses or usernames, extracted from signals. Insights are groups of related signals for the same entity that cross a severity threshold.

### Can I write custom rules in Cloud SIEM?

Yes. In addition to hundreds of built-in rules, you can write custom match, threshold, chain, aggregation, first seen, and outlier rules to cover threats or data sources specific to your environment.

### What is SIEM and how does it help with incident response?

SIEM (Security Information and Event Management) collects, correlates, and prioritizes security data into actionable insights. Cloud SIEM generates those insights, and the Automation Service can run playbooks that enrich, notify, or contain based on them, so incident response starts faster and with more context.

### What is a security operations center (SOC) and how does a SIEM fit into it?

A SOC is the team and process that monitors for and responds to security threats. A SIEM supports it by collecting, correlating, and prioritizing security data so analysts can investigate threats, and a SOAR tool is typically used to respond. Both work together as part of the security pipeline in your SOC.

### What is SIEM and how does it help with SOC log management?

A SIEM collects log and event data from across your infrastructure and applications and correlates it so analysts have fewer items to sift through. Cloud SIEM integrates with the Sumo Logic core platform, so the logs you already collect can feed your SOC.

### What is SIEM and how does it support monitoring and incident response?

A SIEM monitors incoming log and event data, and Cloud SIEM turns matches against its rules into signals and groups related signals into insights. Analysts investigate those insights in the Cloud SIEM interface, and you can send them to [Cloud SOAR](/docs/cloud-soar/) to orchestrate the response.

### What is a SIEM system and how does it help with compliance?

A SIEM collects and correlates security data in one place, which helps you monitor controls and find evidence for audits. See [Audit and Compliance](/docs/security/additional-security-features/audit-and-compliance/) for how to use Sumo Logic for compliance and audit tasks.

### Which SOC SIEM integrates with log management tools, handles alerts, and supports playbooks?

Cloud SIEM works with the logs you already collect (see [What is SIEM and how does it help with SOC log management?](#what-is-siem-and-how-does-it-help-with-soc-log-management)). It creates insights from the signals it detects, and the [Automation Service](/docs/cse/automation/about-automation-service-and-cloud-siem/) runs playbooks that act on those insights. Cloud SOAR offers a broader set of automation capabilities. See [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).

### Are there scalable SIEM options designed for hybrid IT infrastructures?

Yes. Cloud SIEM ingests and correlates data from cloud, hybrid, and on-premises sources. The Automation Service can run playbooks from the Sumo Logic cloud or from your own environment through the Automation Service Bridge, so automation can follow your hybrid infrastructure.

### What's the difference between SOC, SIEM, SOAR, and XDR?

A SOC is the team that monitors and responds to threats. SIEM collects and correlates security data into insights, SOAR automates the response, and XDR extends detection and response across multiple security layers. Cloud SIEM and [Cloud SOAR](/docs/cloud-soar/) can be used together or independently.
