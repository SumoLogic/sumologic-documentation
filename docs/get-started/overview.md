---
id: overview
title: Introduction to Sumo Logic
sidebar_label: Intro to Sumo Logic
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic puts the power of data analytics at the fingertips of everyone on your team. Sumo's pre-configured searches and at-a-glance visual dashboards make it easy to search, filter, and analyze your data.

Visual displays of real-time data allow you to monitor the health, fitness, and security of your application and network, providing insights for troubleshooting and timely resolutions.

<img src={useBaseUrl('img/get-started/sumo-overview.png')} alt="sumo-overview.png" />

## Overview

Get to know Sumo Logic through our video, "Introduction to Sumo Logic".

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


## Benefits of Using Sumo Logic

Sumo Logic helps businesses build, run, and secure modern applications through flexible and scalable solutions for organizations of all sizes. The collection of logs in Sumo Logic is managed by the collectors and they help in designing the best Sumo Logic deployment.

There are various factors to consider when implementing a Sumo Logic solution in your organization, based on the different collection strategies.

:::sumo micro lesson
Get to know more about the Benefits of Using Sumo Logic.

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

:::

## Sumo Logic Components

A Collector is a small application that gathers log data from your servers and sends it to the Sumo Logic Cloud. Using Sumo Logic, you can interact with and analyze your data in the cloud in real time.

![Collectors M.png](/img/get-started/CollectorsM.png)

### (A) Sumo Logic Collectors and Sources

Sumo Logic helps in transforming daily operations into intelligent business decisions. The data needs to be sent to Sumo Logic to allow you to perform your analysis.

:::tip Data Collection strategies

<details><summary>Learn about local collection, centralized collection, and data collection best practices (click to expand).</summary>

[Basics](/docs/send-data/best-practices#local-and-centralized-data-collection). Review the installed collector and its basic concepts. This is a software agent that can be installed on a machine (physical or virtual) to collect logs. The installed collector can be used to collect logs and metrics from the host machine, or from those within the same network as the host machine.

[Local Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review local collection and its pros and cons. Local collector installation is the concept of installing a collector agent onto each and every target machine (a 1:1 relationship between collectors and hosts). This concept is usually accomplished using some level of automation tooling (Chef, Puppet, Terraform, Ansible, Shell Scripting, etc.). The collectors will use the compute and memory resources from their host machines and will require outbound internet access in order to send the logs to Sumo Logic.

[Centralized Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review centralized collection and its pros and cons. Centralized collector installation involves dedicated collection machines that run the collector agent and collect logs from many different target machines at once (a 1:many relationship between collectors and hosts). This concept prevents resource usage on the target machines and removes the need for outbound internet access on the target machines.

Get to know the Collection process through our video, "Data Collection Strategy".

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


</details>

:::

#### OpenTelemetry Collector (recommended)

The [Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) is our next-generation collector, built on OpenTelemetry, that provides a single unified agent to send logs, metrics, traces, and metadata from a [variety of sources](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/) to Sumo Logic. The collector uses encryption and compression to send data securely and efficiently and is fault-tolerant to network issues.

#### Installed Collector

Sumo Logic [Installed Collectors](/docs/send-data/installed-collectors/sources) receive data from one or more [Sources](/docs/send-data/choose-collector-source). Collectors collect raw log data, compress it, encrypt it, and send it to the Sumo Cloud in real time. A single Sumo Logic Collector can collect up to 15,000 events per second and has fault tolerance during network or service outages. See [Installed Collector System Requirements](system-requirements.md).

If you'd like to collect non-traditional machine data, [Script Sources](/docs/send-data/installed-collectors/sources/script-source) and [Script Actions](/docs/send-data/installed-collectors/sources/script-action) can provide a great deal of flexibility to collect files.

#### Hosted Collector

Sumo Logic [Hosted Collectors](/docs/send-data/hosted-collectors) are hosted in the Sumo Cloud and receive data from one or more [Sources](/docs/send-data/choose-collector-source). You can configure it to collect data from various cloud services like Amazon Web Services, Google Cloud Platform, G Suite, and Microsoft Office 365. It offers [Cloud Syslog Sources](/docs/send-data/hosted-collectors/cloud-syslog-source) to receive syslog data and [HTTP Sources](/docs/send-data/hosted-collectors/http-source/logs-metrics) to receive logs and metrics.

The Hosted Collector is not an installed software agent, but rather a collection of endpoints and integration that collects logs from various cloud data sources.

### (B) Sumo Logic Cloud

The Sumo Logic Cloud is a secure, scalable repository for all of your operations, security, compliance, development, and other log data. The Sumo Logic Cloud stores, indexes, parses, and analyzes data, and provides unlimited horsepower with elastic scalability.

### (C) Sumo Logic Web Application

The Sumo Logic UI allows you to view and analyze your log data in the cloud. With a powerful and intuitive search capability, you can use the web application to expedite functions like forensic analysis, troubleshooting, and system health checks.

Sumo Logic provides access from anywhere since it is fully browser based. It also provides all required administration tools for managing your installation. This includes tools for administration, checking system status, managing your deployment, and direct access to download and activate Collectors.

## Account Configuration

Once you've set up a collector and source, read these tips on configuring and managing your Sumo Logic account.

### Data Volume and Retention

* [Data Retention](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention). Determine the average data retention for your account (total storage and daily ingest) and change the General Index retention period if necessary. The General Index settings can be found on the **Manage Data** > **Settings** > **Partitions** menu, which is explained in further detail on the Optimization Setup sheet of this document.
* [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index). Enable the data volume index. This feature allows you to track your log and metric ingest more closely using a built-in Sumo tool.
* [Audit Index](/docs/manage/security/audit-index). Enable the audit index. This feature allows you to track user behavior, content changes, and scheduled search execution results.
* [Data Volume App](/docs/integrations/sumo-apps/data-volume). Install the Data Volume app in Sumo App Catalog and explore the app's content. This will give you insight into your log and metric ingest volume, as well as the identification of top sources using various metadata tags.
* [Audit App](/docs/integrations/sumo-apps/audit). Install the Audit app and explore its content. You can use this to monitor user activity, content changes, as well as scheduled search changes and executions.


### Optimizing Partitions

[Partitions](/docs/search/optimize-search-partitions) store your data in custom indexes, separate from the rest of your account's data, so that you can optimize your searches. When you run a search against an index, results are returned more quickly and efficiently because the search runs against a smaller data set.

Before adding Partitions, consider the following:

* **Query Performance**. Partitions can help to reduce query runtimes across the platform. By isolating subsets of data, the system will filter these logs and exclude irrelevant data from both the partitions and user queries.
* **Query Rewriting**. The query service will automatically detect routing expressions for partitions in the backend. No scoping changes are required for existing content to use partitions.
* **Overlap Consequences**. Data should NEVER fall into multiple partitions. This will cause the data to be duplicated across the service and will increase the cost of ingesting the data.

The **Partitions** page can be found under the **Manage Data** > **Settings** menu. Partitions are tools that can be used to route data into smaller subsets of the overall data ingest. These datasets can be isolated for either query performance reasons or for log retention purposes.

* [Routing Expression.](/docs/manage/partitions-data-tiers) Each partition's contents are determined by the routing expression, which will be scoped using metadata and/or keywords.
* [Variable Retention.](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention.md) Each Partition has its own retention period. This allows for some logs to be retained for longer, while others are discarded more quickly.


### Field Extraction Rule setup

[Field Extraction Rules](/docs/manage/field-extractions) (FERs) are used to pre-parse key/value pairs from log messages as they're collected. They're best utilized on logs that have consistent formatting.

Before creating a Field Extraction Rule (FER), consider the following:  

* **Query Performance**. FERs reduce query runtime by running the parsing logic during collection rather than during search execution.
* **Query Simplification**. FERs simplify queries by removing the need for parse logic in the query. Since the logs are pre-parsed, the parse statements are removed from the relevant searches.
* **Field Naming**. FERs standardize the names of the key/value pairs that they parse, creating a uniform naming convention for all users to leverage.
* **FER Scoping**. FERs are composed of a scoping statement and the parsing logic; scoping usually involves SourceCategory and possibly keywords.
* **Limitations**. FERs can not extract every key/value pair but should be prioritized to the most commonly logged and searched key/value pairs.

If applicable, identify a set of logs to be pre-parsed by a FER. To [create the FER](/docs/manage/field-extractions/create-field-extraction-rule), go to **Manage Data** > **Settings** > **Field Extraction Rules**. The rule will require you to implement a **Rule Name**, **Scope**, and **Parse Expression**.

## Training and Certification

The [Sumo Logic Training and Certification](https://www.sumologic.com/learn/training/) program is offered to you at no cost. You can grow your understanding of Sumo Logic through interactive tutorials, instructor-led training, self-paced training, and a wide range of certifications. We’ve done studies showing that when you are Sumo Logic Certified, you gain greater insight into your data, search more efficiently, and build impactful dashboards.

Our Instructor-Led Training options include:
* [Cert Jams.](https://www.sumologic.com/learn/training/#workshops) We deliver in-person public training classes called Cert Jams that train users and help them attain various certifications.
* [Virtual Cert Jams.](https://www.sumologic.com/learn/training/#training-courses) In addition to in-person Cert Jams, online sessions covering the certification material are open to all.
* Professional Services. For professional services and offerings, [contact our sales team](mailto:sales@sumologic.com) or your account representative.
