---
id: overview
title: Cloud SOAR Overview
sidebar_label: Overview
---

## Why Cloud SOAR?

Cloud SOAR is a modern security operations technology platform that empowers MSSPs, SOCs, and security teams by providing collaborative and automated real-time incident management and threat response. Make quick and insightful decisions during security response with workflow automation.

### All-in-one platform for minimizing the response time

* Integrates disparate technologies focusing analysts on real threats
* Makes the most of automation, orchestrating several tools in Standard Operating Procedures (SOPs)
* Measures success and improves communication


### Better collaboration

Cloud SOAR’s native orchestration capabilities boost the collaboration within the SOC team, ensuring efficient synergy during each phase of incident response.

Automation of the full incident lifecycle eases the burden on security analysts, while helping to successfully pinpoint real threats and coordinate an effective response across tools and team members.

### Customizable reports

Quickly assemble highly customizable reports and dashboards to easily navigate and assess your security intelligence portfolio. Use relevant templates to capture workflow processes, job functions, and response timeframes, including critical indicators of compromise (IOC) and corrective actions taken. Use reports to create greater visibility for KPIs and make collective improvements across the SOC team.

### Speed incident response
Cloud SOAR improves incident response time with flexible workflow automation across tools and teams. Machine learning distinguishes real threats from false positives to reduce alert fatigue.

### Connect disparate tools
Cloud SOAR acts as the connective tissue between your existing tools to automate processes across the SOC and derive relevant insights throughout your security portfolio.

### Close the skill gap
Automated workflow processes help analysts function at an optimal level and reduce the skills gap that exists from the lack of qualified cybersecurity professionals.

### Comprehensive security portfolio
Cloud SOAR is part of Sumo Logic’s comprehensive security portfolio including security monitoring and analytics and Cloud SIEM, to help your organization modernize security operations.

## Support and complaince

### Data retention

This section lists the retention period for each type of data generated. 

#### Default retention periods by data type

We automatically delete the following customer data according to the table retention period below, except for clients that need to ensure HIPAA compliance.

| Data type | Retention period |
| :-- | :-- |
| Incidents | 2 years |
| Triage | 2 years |
| Entities | 2 years |
| Playbook and action executions | 2 years |

For clients that need to ensure HIPAA compliance, we delete data following the retention periods below. Please keep in mind that if a customer needs to follow HIPAA compliance, it is important to explicitly communicate this when requesting Cloud SOAR activation.

| Data type | Retention period |
| :-- | :-- |
| Incidents | 7 years |
| Triage | 7 years |
| Entities | 7 years |
| Playbook and action executions | 7 years |
| CSE Records | Records (normalized logs) are stored in the partitions whose names begin with the string `sec_records`. There is one partition for each Record type. <br/><br/>There is no additional charge for storage of Records.| 90 days |
| CSE Signals | Stored in the `sec_signal` partition.<br/><br/>There is no additional charge for storage of Signals. | 2 years |   
| CSE Insights | The `sumologic_system_events` partition contains Insights and Insight-related events that result from system actions. <br/><br/>The `sumologic_audit_events` partition contains Insights and Insight-related events that result from user actions.<br/><br/>There is a charge for storage of Insight-related data in the audit indexes. Note however the volume of data is typically very low compared to log ingestion levels. | By default, these partitions have a retention period of 30 days. This period is [customer-configurable](/docs/get-started/help#support). |

#### Custom retention periods

Customers can request retention period times different from those declared in the tables above, as long as the retention
period requested is greater than 1 day yet less than 5000 days.

In order, to do that please open a [Support ticket](/docs/get-started/help#support) with your request.
