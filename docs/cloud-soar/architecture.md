---
id: architecture
title: Cloud SOAR Architecture
sidebar_label: Architecture
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/cloud/multi-tenant.png')} alt="icon" width="50"/>

Sumo Logic Cloud SOAR provides Security Operations and Automation Incident Response Platform to facilitate and expedite timely management of Incident Response with a rich library of customizable playbooks for different threats and use cases of incident response scenarios expediting and automating response time to incident response events.

This solution additionally provides capabilities to support incident
responders during the process of assessment, Investigation, data collection and correlation to help inference additional information and metrics analytics to see repetitive patterns when doing analysis. It facilitates documentation and knowledge transfer of information across the critical teams working on incident response and SOC operations team members.

Cloud SOAR Automation and Orchestration features help organizations from all sectors of the industry to manage measure and orchestrate security
operations tasks including incident qualification, triage and
escalation, threat hunting, analysis, threat containment and
remediation. The gathering of information from different data sources
and correlating this information expedites the capabilities and augments
human analyst available resources.

The Cloud SOAR tool offers standard management of Incident response events across different teams in the organization with the help of the R3 Rapid response playbook engine. R3 Playbooks are created using a Visual editor supporting granular, stateful and conditional workflows to orchestrate, automate and standardize best practices on a case by case incident response events activities like incident triage, stakeholder notification, data and context enrichment, remediation and threat containment.

Cloud SOAR has been designed with Interoperability for Cybersecurity Industry standards regulatory frameworks to be able to receive data from a wide assortment of Cybersecurity industry vendors to enrich the available data gathered and correlated to offer better forensic analytics. Just to name a few of our quickly growing list of supported vendors: Palo Alto Networks, Cisco ThreatGrid and Umbrella, IBM Qradar, Splunk, McAfee, Encase Forensics.

Cloud SOAR design and architecture follows Cybersecurity Industry standards and regulatory frameworks, and adheres to best Industry practices to meet best Cybersecurity practices followed by ISO, GDPR, OASIS, NIST, Sec Regulations, and more.

Cloud SOAR offers a patent-pending Automated Responder Knowledge (DF-ARK) module which applies machine learning to historical responses and threats. It recommends relevant Playbooks, paths of action to expedite the process, and responses to manage and mitigate similar incidents with better response time.

<img src={useBaseUrl('img/cloud-soar/image3.png')} alt="architecture" width="800"/>



## Multi-Tenancy

Cloud SOAR Security Operations (Cloud SOAR SO) supports a multi-tenant architecture, typically for a Managed Security Service Provider (MSSP) to support management of multiple customers in isolated environments.

Tenants are separately managed in a segregated Cloud SOAR instance with complete isolation of all the platform's functions. Additionally, a Master Console is available to manage all the instances (create, destroy, monitor) and to provide aggregated reporting.

All multi-tenant installations offer:
- Separate schema or databases for each individual tenant
- Logical or physical segregation of tenants
- A **Superuser** role that provides visibility on all tenants and provides for execution of administrative duties, analytics, dashboards, and reporting
- Individual administrators otherwise segregated to each tenant
- Isolation of external actions (e.g., enrichment of indicators of compromise, containment actions prescribed to a host)

![Multi-Tenancy with Physical Segregation](/img/cloud-soar/image5.png)


## Automated Responder Knowledge (DF-ARK)

Cloud SOAR's Automated Responder Knowledge (DF-ARK) module utilizes machine
learning through historical responses to past incidents and threat
intelligence feeds to enrich new incidents. This enrichment allows
Cloud SOAR to recommend relevant Playbooks and plans of action to expedite
detection and response times.

## Automation Bridge

Cloud SOAR interacts with the platforms in your environment using a module called Automation Bridge.

Automation Bridge is a process running on a Linux-based VM (deployed inside the Customer environment) that interacts with your Cloud SOAR Instance and allows you to execute Playbook actions on all the systems that Cloud SOAR is orchestrating in that specific environment. [Learn more](/docs/cloud-soar/incidents-triage/#configuring-the-automation-bridge-for-cyberark).
