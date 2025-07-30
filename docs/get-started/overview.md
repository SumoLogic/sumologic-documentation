---
id: overview
title: Introduction to Sumo Logic
sidebar_label: Intro to Sumo Logic
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic puts the power of data analytics at the fingertips of everyone on your team. Our pre-configured searches and at-a-glance visual dashboards make it easy to search, filter, and analyze your data.

Sumo Logic empowers your team with advanced data analytics, making it simple to transform complex data into actionable insights. With pre-configured searches and intuitive, visual dashboards, anyone on your team can quickly search, filter, and analyze data without requiring deep technical expertise.

Our real-time, at-a-glance visualizations provide continuous monitoring of your application and network health, security, and performance. These insights enable proactive troubleshooting and faster resolution of issues, helping your team stay ahead in an ever-changing digital landscape.

Visual displays of real-time data allow you to monitor the health, fitness, and security of your application and network, providing insights for troubleshooting and timely resolutions.

## Overview

:::sumo Micro Lesson
Get to know Sumo Logic through our video, "Introduction to Sumo Logic".

<Iframe url="https://fast.wistia.net/embed/iframe/pfps97emeh?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Introduction to Sumo Logic Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Benefits of using Sumo Logic

Sumo Logic helps businesses build, run, and secure modern applications through flexible and scalable solutions for organizations of all sizes. The collection of logs in Sumo Logic is managed by the collectors and they help in designing the best Sumo Logic deployment.

There are various factors to consider when implementing a Sumo Logic solution in your organization, based on the different collection strategies.

:::sumo micro lesson
Get to know more about the benefits of using Sumo Logic.

<Iframe url="https://fast.wistia.net/embed/iframe/w9h0my941q?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Benefits of Using Sumo Logic Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Sumo Logic components

A Collector is a small application that gathers log data from your servers and sends it to the cloud. Using Sumo Logic, you can interact with and analyze your data in the Sumo Logic Cloud in real time.

![Collectors M.png](/img/get-started/CollectorsM.png)

### (A) Sumo Logic Collectors and Sources

Sumo Logic helps in transforming daily operations into intelligent business decisions. The data needs to be sent to Sumo Logic to allow you to perform your analysis.

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

### (C) Sumo Logic UI

The Sumo Logic UI allows you to view and analyze your log data in the cloud. With a powerful and intuitive search capability, you can use the web application to expedite functions like forensic analysis, troubleshooting, and system health checks.

Sumo Logic provides access from anywhere since it is fully browser-based. It also provides all required administration tools for managing your installation. This includes tools for administration, checking system status, managing your deployment, and direct access to download and activate Collectors.

## Data Collection strategies

This section describes local collection, centralized collection, and data collection best practices.

* [Basics](/docs/send-data/best-practices#local-and-centralized-data-collection). Review the installed collector and its basic concepts. This is a software agent that can be installed on a machine (physical or virtual) to collect logs. The installed collector can be used to collect logs and metrics from the host machine, or from those within the same network as the host machine.
* [Local Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review local collection and its pros and cons. Local collector installation is the concept of installing a collector agent onto each and every target machine (a 1-to-1 relationship between collectors and hosts). This concept is usually accomplished using some level of automation tooling (Chef, Puppet, Terraform, Ansible, Shell Scripting, etc.). The collectors will use the compute and memory resources from their host machines and will require outbound internet access in order to send the logs to Sumo Logic.
* [Centralized Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Review centralized collection and its pros and cons. Centralized collector installation involves dedicated collection machines that run the collector agent and collect logs from many different target machines at once (a 1-to-many relationship between collectors and hosts). This concept prevents resource usage on the target machines and removes the need for outbound internet access on the target machines.

:::sumo Micro Lesson
Get to know the collection process through our video, "Data Collection Strategy".

<Iframe url="https://fast.wistia.net/embed/iframe/w03b0igi54?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Data Collection Strategy Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Account configuration

Once you've set up a collector and source, read these tips on configuring and managing your Sumo Logic account.

### Data volume and retention

* [Data Retention](/docs/manage/partitions/manage-indexes-variable-retention). Determine the average data retention for your account (total storage and daily ingest) and change the General Index retention period if necessary.
* [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index). Enable the data volume index. This feature allows you to track your log and metric ingest more closely using a built-in Sumo tool.
* [Audit Index](/docs/manage/security/audit-indexes/audit-index). Enable the audit index. This feature allows you to track user behavior, content changes, and scheduled search execution results.
* [Data Volume App](/docs/integrations/sumo-apps/data-volume). Install the Data Volume app in Sumo App Catalog and explore the app's content. This will give you insight into your log and metric ingest volume, as well as the identification of top sources using various metadata tags.
* [Audit App](/docs/integrations/sumo-apps/audit). Install the Audit app and explore its content. You can use this to monitor user activity, content changes, as well as scheduled search changes and executions.


### Optimizing partitions

[Partitions](/docs/search/optimize-search-partitions) store your data in custom indexes, separate from the rest of your account's data, so that you can optimize your searches. When you run a search against an index, results are returned more quickly and efficiently because the search runs against a smaller data set.

Before adding partitions, consider the following:

* **Query Performance**. Partitions can help to reduce query runtimes across the platform. By isolating subsets of data, the system will filter these logs and exclude irrelevant data from both the partitions and user queries.
* **Query Rewriting**. The query service will automatically detect routing expressions for partitions in the backend. No scoping changes are required for existing content to use partitions.
* **Overlap Consequences**. Data should NEVER fall into multiple partitions. This will cause the data to be duplicated across the service and will increase the cost of ingesting the data.

Partitions are tools that can be used to route data into smaller subsets of the overall data ingest. These datasets can be isolated for either query performance reasons or for log retention purposes.

* [Routing Expression.](/docs/manage/partitions) Each partition's contents are determined by the routing expression, which will be scoped using metadata and/or keywords.
* [Variable Retention.](/docs/manage/partitions/manage-indexes-variable-retention.md) Each Partition has its own retention period. This allows for some logs to be retained for longer, while others are discarded more quickly.


### Field Extraction Rule setup

[Field Extraction Rules](/docs/manage/field-extractions) (FERs) are used to pre-parse key/value pairs from log messages as they're collected. They're best utilized on logs that have consistent formatting.

Before creating a Field Extraction Rule (FER), consider the following:  

* **Query Performance**. FERs reduce query runtime by running the parsing logic during collection rather than during search execution.
* **Query Simplification**. FERs simplify queries by removing the need for parse logic in the query. Since the logs are pre-parsed, the parse statements are removed from the relevant searches.
* **Field Naming**. FERs standardize the names of the key/value pairs that they parse, creating a uniform naming convention for all users to leverage.
* **FER Scoping**. FERs are composed of a scoping statement and the parsing logic; scoping usually involves SourceCategory and possibly keywords.
* **Limitations**. FERs can not extract every key/value pair but should be prioritized to the most commonly logged and searched key/value pairs.

If applicable, identify a set of logs to be pre-parsed by a FER. When you create a Field Extraction Rule, it will require you to implement a **Rule Name**, **Scope**, and **Parse Expression**.

## Training and certification

The [Sumo Logic Training and Certification](https://www.sumologic.com/learn/training/) program is offered to you at no cost. You can grow your understanding of Sumo Logic through interactive tutorials, instructor-led training, self-paced training, and a wide range of certifications. We’ve done studies showing that when you are Sumo Logic Certified, you gain greater insight into your data, search more efficiently, and build impactful dashboards.

Our instructor-led training options include:
* [Cert Jams.](https://www.sumologic.com/learn/training/#workshops) We deliver in-person public training classes called Cert Jams that train users and help them attain various certifications.
* [Virtual Cert Jams.](https://www.sumologic.com/learn/training/#training-courses) In addition to in-person Cert Jams, online sessions covering the certification material are open to all.
* Professional Services. For professional services and offerings, [contact our sales team](mailto:sales@sumologic.com) or your account representative.
