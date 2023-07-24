---
id: data-lakes
title: Data Lakes
sidebar_label: Data Lakes
description: Learn about using data lakes with Cloud Security Analytics. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To use a data lake with Cloud Security Analytics, you must first [install a data lake](#install-a-data-lake-for-use-with-cloud-security-analytics). Cloud Security Analytics is optimized to work with Amazon Data Lake, but you can use the data lake of your choice. Ask your Sumo Logic account representative to engage the Professional Services team to guide you through setting up a data lake for use with Cloud Security Analytics.

## About data lakes

A data lake is a centralized repository to store data. Data in the lake can then be used for analytics. A data lake can store both structured and unstructured date, unlike a data warehouse, which typically only stores structured data. You have much more flexibility with a data lake than a data warehouse, because you can retrieve the data in any format used by your consuming services. Data lakes are ideal to use with  Cloud Security Analytics, since Sumo Logic's parsing and mapping capabilities can transform data quickly and at scale. 

### Why use a data lake?

Scattered data is a security risk. When it comes to quickly addressing security threats, it’s common for data to be spread throughout different tools, clouds, and functions, making it hard to access, see, and use effectively. Under these circumstances, identifying potential threats is an arduous task. To get ahead of potential threats, most organizations need detailed security data they can act on in an easy-to-access location. A security data lake is one solution.

A security data lake is a centralized repository that collects and analyzes large amounts of security data from various sources, offering a complete view of an organization’s security posture. A data lake allows security teams to identify potential threats, investigate security incidents, and respond proactively to potential risks.

Security data lakes provide a historical overview of security events. You can proactively use this information to identify patterns and anomalies, ensuring that your data serves a valuable purpose in protecting your organization’s assets.

Retaining data in its original, raw format is also a benefit of security data lakes. This feature provides valuable information for investigation and forensic purposes, resulting in easier threat hunting and investigation through standardized querying and visualization of all data.

### Database versus data lake

“Database” and “data lake” are sometimes used in similar contexts, but they aren’t interchangeable terms. Databases enable teams to efficiently access and manage large amounts of structured or semi-structured data electronically. Database design supports Online Transaction Processing (OLTP), allowing for real-time data processing and record keeping. However, much of the data that organizations need to use is unstructured. Additionally, databases are not a preferred option for analyzing cloud security data. They function primarily for operational and transactional workloads rather than analytical workloads. 

Data lakes fill in the gaps in database functionality. They can:
* Store structured, semi-structured, and unstructured data.
* Ingest data without having to define schema.
* Optimize performance and efficiency due to separated storage and compute functions.

A security data lake allows you to store and access various data types and formats, making it easier to process and analyze data from multiple tools and technologies. Traditional solutions cannot handle such significant volumes of data, leaving valuable security logs and event data scattered across systems and tools. 

### What types of security logs can data lakes store?

* **Firewall logs**. Firewalls deliver valuable information to identify potential threats, including malware, application types, and command and control activities.
* **Proxy and web filtering logs**. In the absence of proxy and web filtering logs in your firewall, you must scrutinize IP, URL, and domain data to identify potential links to malicious locations. User-agent logs are also valuable in unraveling complex breaches and resolving issues.
* **Endpoint security solutions**. By collecting data from each device connected to your network, you can filter out false positives and focus on the real threats.
* **Network security products**. For standalone systems like intrusion protection or network data loss prevention, centralizing their logs with the rest of your data allows you to get fuller security coverage.
* **User access**. Tracking a user’s Windows authentication, single sign-on, and Active Directory are great sources to tie one user to the event in the system, even if they change IP addresses in the middle of their activity.
* **Threat intelligence**. Accessing logs and data from recent threats at other organizations can help you recognize similar patterns or behaviors faster.

### Best practices guide to building a security data lake

Following are the basic steps involved in building a security data lake. 

#### Step 1: Define your security data goals

Determine what data you need to analyze. Data may come from your security detection tools, network devices, applications, servers, and endpoints. For example, collecting data on user activity and access logs is a great place to start if you’re concerned about insider threats.

#### Step 2: Choose a data lake solution

Choose a storage solution that manages vast amounts of data efficiently and adheres to compliance requirements. Certain platforms may require saving data in cold storage, which hinders your investigation capabilities. Sumo Logic offers data tiering, allowing you to store data without compromising accessibility.

If you’re not sure where to start, consider asking these questions:
* What kind of data sources can you ingest from?
* How is the data searchable?
* How much storage capacity do you need?
* What is the event-per-second throughput? 

#### Step 3: Implement data ingestion

Set up a process for collecting data into your data lake. With Sumo Logic, you can begin data ingestion in a secure and compliant manner out-of-the-box. Our high event-per-second throughput ensures you can handle the most demanding workloads and data ingestion without issue.

#### Step 4: Enforce data security

Security controls are necessary to protect your data lake from unauthorized access and breaches. At Sumo Logic, we use state-of-the-art encryption techniques to safeguard your data in transit and at rest. But it’s not just about protection. You must also prioritize compliance and monitoring to ensure your data lake meets all regulatory requirements. Sumo Logic holds numerous certifications and attestations. 

#### Step 5: Search your security data

With the vast amounts of data generated by security tools, it can be overwhelming to sift through it all. Sumo Logic's [Search Query Language](/docs/search/search-query-language/) helps identify anomalous behavior and flags potential security threats in real-time. Query your data lake to uncover patterns, investigate alerts, and identify potential security risks. 

#### Step 6: Establish data governance

Sumo Logic uses role-based access control (RBAC), data classification, retention, and archiving. Our data classification tools allow you to easily identify and manage sensitive information, ensuring that only authorized users have access. And you can keep your data for as long as you need to meet regulatory requirements while also ensuring that it is easily accessible.

#### Step 7: Analyze security data

Once you connect your data lake to Sumo Logic, you can start analyzing security data. Cloud Security Analytics is built on a security-first principle. It is designed to analyze security data with real-time threat detection, compliance reporting, and dashboards. Our cloud-native architecture unifies security events and investigations across multiple cloud platforms, including AWS, Azure, and Google Cloud Platform.

#### Step 8: Monitor your data

With security data flowing in from your data lake, you can continuously monitor and analyze your data to identify potential threats and respond proactively. Our platform is also updated with the latest security content from our Sumo Logic Threat Labs team. This team moves quickly to support customers in crisis, like when the Log4j vulnerability surfaced. They continuously monitor and analyze data to identify threats, both known and unknown.

## Install a data lake for use with Cloud Security Analytics

You can use a number of data lakes to supply data for Cloud Security Analytics. Following are just a couple. 

* **[Amazon Security Lake](https://aws.amazon.com/security-lake/)**. Cloud Security Analytics is optimized to work with Amazon Data Lake. For directions to configure it for Sumo Logic, see [Amazon Security Lake Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-security-lake-source/).
* **[Palo Alto Networks Cortex Data Lake](https://docs.paloaltonetworks.com/cortex/cortex-data-lake)**. For directions to configure it for Sumo Logic, see [Collect Logs from Palo Alto Networks Cortex Data Lake](/docs/send-data/collect-from-other-data-sources/collect-logs-palo-alto-networks-cortex/). 

If you want to use another data lake, ask your Sumo Logic account representative to engage the Professional Services team to guide you through setting up a data lake for use with Cloud Security Analytics.