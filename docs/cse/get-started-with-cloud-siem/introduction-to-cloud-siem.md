---
id: introduction-to-cloud-siem
title: Introduction to Cloud SIEM
sidebar_label: Introduction to Cloud SIEM
description: Learn basic concepts about Cloud SIEM. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic introduces basic concepts about Cloud SIEM.

Cloud SIEM Enterprise (CSE) is a cloud-based, enterprise-grade security information and event management (SIEM) system. Cloud SIEM leverages Sumo Logic's core functionality, including data collection, ingestion, storage, and threat intelligence. 

Cloud SIEM is a purchased add-on with an ever-expanding library of content designed for security operations. Cloud SIEM automatically normalizes, enriches, and correlates all your data across multiple data sources into actionable security Insights. 

Watch this micro lesson to learn how to use Insights in Cloud SIEM to perform threat investigations.

<Iframe url="https://www.youtube.com/embed/cDUOzQ63zmc?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

## Getting your data into Cloud SIEM

Because Cloud SIEM designed for larger data volumes, most organizations need to ingest a large amount of data each day for Insights to surface in Cloud SIEM. 

If you already use the Sumo Logic core platform, you’re probably familiar with the data pipeline:

<img src={useBaseUrl('img/cse/intro-cloud-siem-data-pipeline.png')} alt="Data pipeline" width="600"/>

1. **Data collection**. To use Sumo Logic, first you must set up either an installed collector or a hosted collector and add a source. You can also set up source categories and other metadata, which helps you search and analyze the data you collect.
2. **Search and analyze**. Once data is in Sumo Logic, you can write queries to search and correlate events in real-time from the analytics platform UI. Or, you might configure the collector to forward data to Cloud SIEM, and let it do all the correlation work for you.
3. **Visualize and monitor**. Once you’ve found and analyzed data that’s interesting, you can create dashboards to visualize it and set up alerts to monitor your data in real-time. Certain apps, like [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/), come pre-configured with several dashboards designed for security.
4. **Share the findings**. Export your dashboards or share with others on your team. You can control who can view and edit your dashboards to keep your data secure.


### Data collection

Before you can start investigating threats, you need data. As a data analyst, this step may have been done by your administrator. 

Your company collects and [ingests](/docs/cse/ingestion/) millions of log messages into Sumo Logic. Typically, you can use these messages right away in many Sumo Logic apps. To use them in Cloud SIEM, however, your admin must enable [data forwarding](/docs/manage/data-forwarding/). Your admin may also need to [create log mappings](/docs/cse/schema/create-structured-log-mapping/), [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule/), or complete other preprocessing steps to extract the right data.

<img src={useBaseUrl('img/cse/intro-cloud-siem-data-collection.png')} alt="Data collection" width="600"/>

As a data analyst, you should periodically examine the data that’s being ingested into Sumo Logic and Cloud SIEM. After you’ve been using Cloud SIEM for a while, you may want to fine-tune it to fit your organization’s needs. If you discover that you’re ingesting too much or too little data to do threat hunting, you can work with your admin to find that balance.

So, what’s the balance between too much and too little data? It depends. Work with your admin to answer these questions:

* **Are you ingesting enough data?** Cloud SIEM takes thousands or millions of records and boils them down into just a handful of Insights. Most organizations ingest more than 50GB of data every day to start finding any Insights. If your ingest volume is smaller than this, consider sending more data to Cloud SIEM or using other security solutions like the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/) app.
* **Are you ingesting too much data?** More data doesn’t always mean more Insights. The threat detection logic built into Cloud SIEM generally prevents false positives. However, some organizations choose to ingest or store less data as a way to cut costs. One solution is partitioning your data into different tiers, and only sending some of that data along to Cloud SIEM. 
* **Are you ingesting the right data?** Cloud SIEM doesn’t just work on quantity alone. Quality data will affect your performance as well. As a best practice, you’ll need to bring in quality data sources that are supported by Cloud SIEM. High-value data sources include [CloudTrail logs](/docs/integrations/cloud-security-monitoring-analytics/aws-cloudtrail/), [Windows event logs](/docs/send-data/installed-collectors/sources/collect-forwarded-events-windows-event-collector/), [AWS logs](/docs/integrations/amazon-aws/), and [GuardDuty logs](http://localhost:3000/docs/integrations/amazon-aws/guardduty/).

### Processing your data for Cloud SIEM

Before Cloud SIEM can generate security Insights, your log messages must go through a little processing first. First, Cloud SIEM processes the messages into Records. Each Record contains the information from a message, which is parsed into key-value pairs, mapped to a Cloud SIEM schema, and enriched with other data.

<img src={useBaseUrl('img/cse/intro-cloud-siem-messages-to-records.png')} alt="Messages generate records" width="600"/>

Let’s follow a simple log message down this pipeline:
```
sso : ip-127-0-0-1 : alex@travellogic.com : 
"Successful Login" : “2021-05-25T22:11:42"
```

First, the message is parsed into a set of key-value pairs. This process also fixes basic formatting. This step creates semi-structured data. For example, instead of `ip-127-0-0-1`, the parsing step extracts the IP address into a key-value pair, where the key is something like `srcDeviceIP` and the value is `127.0.0.1`, with the hyphens normalized to dots. Then, this information is mapped onto the Cloud SIEM schema. Finally, the record is enriched with information from match lists or threat intelligence databases, such as its [CrowdStrike threat level](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#threat-intel-faq).

These normalized Records are then sent down the Cloud SIEM pipeline and compared to rules. 

### Extracting security Insights for Cloud SIEM

Each record ingested into Cloud SIEM is compared to hundreds of built-in and custom [rules](/docs/cse/rules/). If a record matches the criteria specified in a rule, then Cloud SIEM creates a Signal. When a Signal is created, it contains a name, entity, severity, stage, and description. A Signal always contains, at minimum, an entity and a severity. This data is later used by Cloud SIEM's Insight engine algorithm. 

A Signal is an individual security event. The entity in a Signal is something like an IP address, MAC address, or hostname. The entity tells us who or what was involved in the event that the record described. The stage or tags are assigned based on where the event fits in the [MITRE ATT&CK](https://attack.mitre.org/) framework. This can tell us a bit about how or why the event occurred. The severity is a number between 0 and 10 that tells Cloud SIEM how serious the potential threat is. 

Cloud SIEM typically processes thousands or millions of records and boils them down into hundreds of Signals.

<img src={useBaseUrl('img/cse/intro-cloud-siem-records-signals-insights.png')} alt="Records, signals, and insights" width="400"/>

On the Cloud SIEM main page, you'll see a panel similar to this one. In this case, 199 thousand records have been ingested and processed into just 51 Signals. Some Signals could be false alarms, but many are worth investigating anyway. But, 51 is still way too many for the average SOC analyst to sift through every day. So, how do you know which Signals to pay attention to first?

Cloud SIEM takes everything one step further and correlates those Signals into a manageable number of Insights. Here, just four Insights were created out of 51 Signals.

An Insight is a group of Signals clustered around a single entity. An Insight is created when the sum of the severity scores of Signals with the same entity goes above a certain activity score within a certain timeframe. By default, this is an activity score of 12 within the last 14 days. For example, if a rule was triggered with a severity of 5, and then ten days later another rule with the same entity and a severity of 5 was triggered, the total activity score would only be 10 in the last 14 days, so an Insight would not be created. However, if those same two rules had a severity score of 7, an Insight would be created.

