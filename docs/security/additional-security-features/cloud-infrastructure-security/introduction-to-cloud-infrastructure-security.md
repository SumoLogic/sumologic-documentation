---
id: introduction
title: Introduction to Cloud Infrastructure Security
sidebar_label: Introduction to Cloud Infrastructure Security
description: Learn basic concepts about Cloud Infrastructure Security. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud Infrastructure Security apps provide enhanced insight into threat activity via a unified security and compliance audit view of your cloud infrastructure. Leveraging cloud-native tools and telemetry, these apps accelerate development, operations, security, and reliability management teams in maintaining security visibility into your cloud environment.

## Features

### Pre-built dashboards

The apps provide pre-built dashboards using data collected from your organization's cloud infrastructure, surfacing insights into cloud risk, active threats, misconfigurations, and suspicious activity. Rather than consult multiple dashboards from your cloud service to piece together security posture, these dashboards consolidate insights into a single solution. 

<img src={useBaseUrl('img/security/cis-dashboards.png')} alt="Example dashboards" style={{border: '1px solid gray'}} width="700"/>

### Normalized entity data

We normalize entity data from across your cloud infrastructure so that logging and entity references are consistent across all presented information. The normalized entity data facilitates transitions between dashboards as part of investigative workflows. 

### Threat intelligence 

We provide built-in threat intelligence correlations on logs for cloud services. Threat intelligence helps identify access to cloud resources from malicious IP addresses.

### Suspicious activity

We surface suspicious user/IAM/network activity using AI-driven anomaly detection. While threat detection capabilities from cloud services may only identify known threats, monitoring suspicious activity helps detect potential threats early. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-network-activity.png')} alt="Suspicious Network Activity dashboard" style={{border: '1px solid gray'}} width="700"/>

### Saved searches

The apps offer curated saved searches developed by subject matter experts, such as the Sumo Logic Security Operations Center team, to serve as a starting point for threat investigation in your cloud environment. 

<img src={useBaseUrl('img/security/cis-for-aws-saved-searches.png')} alt="Saved Searches example" style={{border: '1px solid gray'}} width="700" />

### Monitors

The apps provide monitors crafted by subject matter experts such as the Sumo Logic SOC team. Some monitors use our AI-driven alerting capabilities, which apply next-generation anomaly detection capabilities, and some have playbooks. Many of these monitors use the Sumo Logic Alert Grouping feature, where a single monitor will trigger separate alerts based on different criteria. 

<img src={useBaseUrl('img/security/cis-for-aws-monitors.png')} alt="Example monitors" style={{border: '1px solid gray'}} width="400"/>

### Playbooks 

Pre-built playbooks that use the Sumo Logic Automation Service are made available in some of the monitors to automatically respond to security incidents. 

<img src={useBaseUrl('img/alerts/monitors/playbook-in-automation-service.png')} alt="Playbook in the Automation Service" style={{border: '1px solid gray'}} width="700" />

## FAQ

### What is the cloud attack surface?

The cloud attack surface refers to all the potentially exposed applications, networked devices, and infrastructure components that threat actors could exploit within a cloud infrastructure or environment. Issues such as unpatched vulnerabilities in microservices architecture and misconfigurations can compromise the security of cloud-based systems, applications and data. The attack surface in a cloud environment is dynamic and can change as the cloud infrastructure evolves and new services, applications, and configurations are introduced.

Common components of the cloud attack surface include:
* User accounts and credentials
* Application Programming Interfaces (APIs)
* Cloud databases or object storage
* Network connections, including virtual private clouds (VPCs) and public internet connections
* Virtual machines (VMs) and containers (Kubernetes)
* Data in transit (sent over a network)
* Data at rest (in cloud storage)

### What is infrastructure security in cloud computing?

Infrastructure security in cloud computing refers to the practices, tools, and measures to protect the underlying IT infrastructure and resources that make up a cloud computing environment. This includes safeguarding the physical data centers, servers, networking components, and other hardware and the virtualization and management software enabling cloud services. Infrastructure security is a critical aspect of overall cloud security, as the integrity of these components is essential for the secure operation of cloud services.

### What is the difference between cloud security and cybersecurity?

Cybersecurity refers to the set of processes, policies and techniques that work together to secure an organization against digital attacks. Cloud security is a collection of procedures and technology designed to address external and internal security threats targeting virtual servers or cloud services and apps.

### How does Sumo Logic encrypt its data for cloud security?

All data at rest within the Sumo Logic system is encrypted using strong AES 256-bit encryption. All spinning disks are encrypted at the OS level and all long-term data storage is encrypted using per-customer keys that are rotated every twenty-four hours.

## Additional resources

* Blog: [Making the cloud the safest place to compute: Sumo Logic Cloud Infrastructure Security for AWS](https://www.sumologic.com/blog/cloud-infrastructure-security-aws/)
* Brief: [Cloud Infrastructure Security for AWS solutions brief](https://www.sumologic.com/brief/security-analytics/)
* Webinar: [Cloud Infrastructure Security for AWS](https://www.sumologic.com/webinar/cloud-infrastructure-security-for-aws/)