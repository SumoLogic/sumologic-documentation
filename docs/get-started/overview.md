---
id: overview
title: Sumo Logic Overview
sidebar_label: Sumo Logic overview
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/video.png')} alt="icon" width="50"/>

Sumo Logic is a cloud data analytics platform that focuses on Security, Operations, and Business Intelligence use cases. It also provides elastic processing to collect, manage, and analyze the log data, regardless of type, volume, or location. Sumo Logic provides real-time insights into online operations and customer behavior.

## Intro to Sumo Logic

Get to know Sumo Logic through our video on "Introduction to Sumo Logic".

<Iframe url="https://www.youtube.com/embed/wlwo-RLKRIQ"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


## Sumo Logic Benefits

Sumo Logic helps businesses building, running, and securing modern applications. Get to know about benefits through our video "Benefits of Using Sumo Logic".

<Iframe url="https://www.youtube.com/embed/D4WO5DlqD6o"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

Sumo Logic is a highly flexible and scalable solution. It provides solutions that work for any size of an organization. The collection of logs in Sumo Logic is managed by the collectors and they help in designing the best Sumo Logic deployment. There are various factors to consider when making a decision to implement a Sumo Logic solution in your organizations based on the different collection strategies.

## Sumo Logic Components

A Collector is a small application that gathers log data from your servers and sends it to the Sumo Logic Cloud. Using Sumo Logic, you can interact with and analyze your data in the cloud in real time.<br/>![Collectors M.png](/img/get-started/CollectorsM.png)

### Sumo Logic Collectors and Sources

Sumo Logic [Installed Collectors](/docs/send-data/installed-collectors/sources) receive data from one or more [Sources](/docs/send-data/choose-collector-source).

Collectors collect raw log data, compress it, encrypt it, and send it to the Sumo Cloud, in real time. A single Sumo Logic Collector can collect up to 15,000 events per second or more and has fault tolerance during network or service outages. If you'd like to collect non-traditional machine data, a [Script Source](/docs/send-data/installed-collectors/sources/script-source) or [Script Action](/docs/send-data/installed-collectors/sources/script-action) provide a great deal of flexibility to collect files.

For system requirement details, see [Installed Collector Requirements](system-requirements.md).

Sumo Logic [Hosted Collectors](/docs/send-data/hosted-collectors) are hosted in the Sumo Cloud and receive data from one or more [Sources](/docs/send-data/choose-collector-source)). You can configure it to collect data from various cloud services like Amazon Web Services, Google Cloud Platform, G Suite, and Microsoft Office 365. It offers [Cloud Syslog Sources](/docs/send-data/hosted-collectors/cloud-syslog-source) to receive syslog data and [HTTP Sources](/docs/send-data/hosted-collectors/http-source/logs-metrics) to receive logs and metrics.

### Sumo Logic Cloud

The Sumo Logic Cloud is a secure, scalable repository for all of your operations, security, compliance, development, and other log data. The Sumo Logic Cloud stores, indexes, parses, and analyzes data, and provides unlimited horsepower with elastic scalability.

### Sumo Logic UI

Sumo Logic allows you to view and analyze your log data in the cloud. With a powerful and intuitive search capability, you can use the web application to expedite functions like forensic analysis, troubleshooting, and system health checks. Sumo Logic provides access from anywhere since it is fully browser based. It also provides all required administration tools for managing your installation. This includes tools for administration, checking system status, managing your deployment, and direct access to download  and activate Collectors.

## Data Collection Strategy

Get to know the Collection process through our video "Data Collection Strategy".

<Iframe url="https://www.youtube.com/embed/GzIbFY3sN7M"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

## Basics and Account Configuration

* [Retention](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention.md). Determine the average data retention for your account (total storage / daily ingest) and change the General Index retention period if necessary. The General Index settings can be found on the **Manage Data > Settings > Partitions** menu, which is explained in further detail on the Optimization Setup sheet of this document.
* [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index). Enable the data volume index. This feature allows you to track your log and metric ingest more closely using a built-in Sumo tool.
* [Audit Index](/docs/manage/security/audit-index). Enable the audit index. This feature allows you to track user behavior, content changes, and scheduled search execution results.
* [Data Volume App](/docs/integrations/sumo-apps/data-volume-Legacy). Install the Data Volume app in Sumo App Catalog and explore the app's content. This will give you insight into your log and metric ingest volume, as well as the identification of top sources using various metadata tags.
* [Audit App](/docs/integrations/sumo-apps/Audit). Install the Audit app and explore its content. You can use this to monitor user activity, content changes, as well as scheduled search changes and executions.


## Collection Setup

Sumo Logic helps in transforming daily operations into intelligent business decisions. The data needs to be sent to Sumo Logic to allow users to perform their analysis. There are two types of collectors and you need to choose the Collector right for your environment using Sumo Logic.

Get to know how to choose your collector through our video "Choosing Your Collector Type".

<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


### Installed Collectors

Get to know about Installed Collector through our video "Install a Collector".

<Iframe url="https://www.youtube.com/embed/QxGCrxbJ1Vs"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

[Basics](/docs/send-data/best-practices#local-and-centralized-data-collection). Review the installed collector and its basic concepts. This is a software agent that can be installed on a machine (physical or virtual) to collect logs. The installed collector can be used to collect logs and metrics from the host machine, or from those within the same network as the host machine.

[Local Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review local collection and its pros and cons. Local collector installation is the concept of installing a collector agent onto each and every target machine (a 1:1 relationship between collectors and hosts). This concept is usually accomplished using some level of automation tooling (Chef, Puppet, Terraform, Ansible, Shell Scripting, etc.). The collectors will use the compute and memory resources from their host machines and will require outbound internet access in order to send the logs to Sumo Logic.

[Centralized Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review centralized collection and its pros and cons. Centralized collector installation involves dedicated collection machines that run the collector agent and collect logs from many different target machines at once (a 1:many relationship between collectors and hosts). This concept prevents resource usage on the target machines and removes the need for outbound internet access on the target machines.


### Hosted Collectors

[Basics](/docs/send-data/hosted-collectors). Review the hosted collector and its basic concepts. The hosted collector is not a literal collector agent (i.e. not an installed software agent), but rather a collection of endpoints and integration that collects logs from various cloud data sources.

Get to know about Hosted Collector through our video "Install a Hosted Collector".

<Iframe url="https://www.youtube.com/embed/bjbTm3vR2nA"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

## Optimization Setup

Partitions stores your data in custom indexes separate from the rest of your account's data so you can optimize the searches. When you run a search against an index, results are returned more quickly and efficiently because the search runs against a smaller data set.

Get to know more about the Partitions through our video "Partitions Basics".

<Iframe url="https://www.youtube.com/embed/kpQLFVT4uE8"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


Before adding Partitions, consider the following:

* **Query Performance.** Partitions can help to reduce query runtimes across the platform. By isolating subsets of data, the system will filter these logs and exclude irrelevant data from both the partitions and user queries.
* **Query Rewriting.** The query service will automatically detect routing expressions for partitions in the backend. No scoping changes are required for existing content to use partitions.
* **Overlap Consequences.** Data should NEVER fall into multiple partitions. This will cause the data to be duplicated across the service and will increase the cost of ingesting the data.

[Basics.](/docs/search/optimize-search-partitions) The **Partitions** page can be found under the **Manage Data** > **Settings** menu. Partitions are tools that can be used to route data into smaller subsets of the overall data ingest. These datasets can be isolated for either query performance reasons or for log retention purposes.

[Routing Expression.](/docs/manage/partitions-data-tiers) Each partition's contents are determined by the routing expression, which will be scoped using metadata and/or keywords.

[Variable Retention.](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention.md) Each Partition has its own retention period. This allows for some logs to be retained for longer, while others are discarded more quickly.


## Field Extraction Rule Setup

Before adding Field Extraction Rule (FER), consider the following:  

* **Query Performance.** FERs reduce query runtime by running the parsing logic during collection rather than during search execution.
* **Query Simplification.** FERs simplify queries by removing the need for parse logic in the query. Since the logs are pre-parsed, the parse statements are removed from the relevant searches.
* **Field Naming.** FERs standardize the names of the key/value pairs that they parse, creating a uniform naming convention for all users to leverage.
* **FER Scoping.** FERs are composed of a scoping statement and the parsing logic; scoping usually involves SourceCategory and possibly keywords.
* **Limitations.** FERs can not extract every key/value pair but should be prioritized to the most commonly logged and searched key/value pairs.

[FER Basics](/docs/manage/field-extractions). Field Extraction Rules are used to pre-parse key/value pairs from log messages as they're collected. They're best utilized on logs that have consistent formatting.

[Create a FER.](/docs/manage/field-extractions/create-field-extraction-rule) If applicable, identify a set of logs to be pre-parsed by a FER. Create the FER on the **Field Extraction Rules** page of the **Manage Data > Settings** menu. The rule will require a **Rule Name**, **Scope**, and the **Parse** **Expression** to be implemented.

Get to know more about How to create a FER through our video "Creating a Field Extraction Rule".

<Iframe url="https://www.youtube.com/embed/QWm8hR7SmxE"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


## Training and Certification

The [Sumo Logic Training and Certification](https://www.sumologic.com/learn/training/) program is offered to you at no cost. You can grow your understanding of Sumo Logic through interactive tutorials, instructor-led training, and a wide range of certifications. Certification benefits include improved complex operator usage as well as a better understanding of our search optimization techniques. Your training options are:

[Cert Jams.](https://www.sumologic.com/learn/training/#workshops) We deliver in-person public training classes called Cert Jams that train users and help them attain various certifications.

[Virtual Cert Jams.](https://www.sumologic.com/learn/training/#training-courses) In addition to in-person Cert Jams, online sessions covering the certification material are open to all.

Professional Services. For professional services and offerings, [contact our sales team](mailto:sales@sumologic.com) or your account representative.

[Sumo Logic Fundamentals.](https://www.sumologic.com/learn/certifications/) All users should begin with the Fundamentals certification. This is a prerequisite for all learning pathways and all additional certification levels.
