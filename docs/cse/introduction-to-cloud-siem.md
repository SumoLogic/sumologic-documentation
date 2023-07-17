---
id: introduction-to-cloud-siem
title: Introduction to Cloud SIEM
sidebar_label: Introduction to Cloud SIEM
description: Learn basic concepts about Cloud SIEM. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud SIEM, also known as Cloud SIEM Enterpirse (CSE), is a cloud-based, enterprise-grade security information and event management (SIEM) system. Cloud SIEM leverages Sumo Logic's core functionality, including data collection, ingestion, storage, and threat intelligence. Cloud SIEM is a purchased add-on with an ever-expanding library of content designed for security operations. 

Watch the following micro lesson to learn how to get started using Cloud SIEM for threat investigation.

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

Cloud SIEM automatically normalizes, enriches, and correlates all your data across multiple data sources into actionable security Insights. As shown below, the process starts when logs from data sources enter a collector, then flow through an ingestion process that generates messages. The messages are parsed, mapped to normalized values, and enriched with additional data before becoming records. 

<img src={useBaseUrl('img/cse/intro-cloud-siem-insight-generation-process-1.png')} alt="Records creation" width="800"/>

When records enter Cloud SIEM, rules analyze Entities on the records to produce Signals. The Signals are correlated, and if an Entity's activity score is 12 or more in a two-week period, [an Insight is generated](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) for that Entity. 

<img src={useBaseUrl('img/cse/intro-cloud-siem-insight-generation-process-2.png')} alt="Insights creation" width="725"/>

Following are definitions for some of these terms: 
* [**Messages**](/docs/search/get-started-with-search/search-page/modify-search-from-messages-tab). Logs ingested into Sumo Logic.  
* [**Records**](/docs/cse/records-signals-entities-insights/view-records-signal/). Collections of normalized data created from messages.
* [**Rules**](/docs/cse/rules/about-cse-rules/). Sets of logic that create Signals based on information in incoming Records. 
* [**Signals**](/docs/cse/records-signals-entities-insights/view-records-signal/). Indicators of an event of interest that fire when rule conditions are met.
* [**Entities**](/docs/cse/records-signals-entities-insights/view-manage-entities). Unique actors encountered in incoming messages, such as users, IP addresses, or hosts.
* [**Insights**](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). Groups of Signals clustered around a single Entity that are generated when an Entity’s Activity Score exceeds the threshold of 12.


Because Cloud SIEM designed for larger data volumes, most organizations need to ingest a large amount of data each day for Insights to surface in Cloud SIEM. 

If you already use the Sumo Logic core platform, you’re probably familiar with the data pipeline:

<img src={useBaseUrl('img/cse/intro-cloud-siem-data-pipeline.png')} alt="Data pipeline" width="700"/>

1. **Data collection**. To use Sumo Logic, first you must set up either an installed collector or a hosted collector and add a source. You can also set up source categories and other metadata, which helps you search and analyze the data you collect.
2. **Search and analyze**. Once data is in Sumo Logic, you can write queries to search and correlate events in real-time from the analytics platform UI. Or, you might configure the collector to forward data to Cloud SIEM, and let it do all the correlation work for you.
3. **Visualize and monitor**. Once you’ve found and analyzed data that’s interesting, you can create dashboards to visualize it and set up alerts to monitor your data in real-time. Certain apps, like [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/), come pre-configured with several dashboards designed for security.
4. **Share the findings**. Export your dashboards or share with others on your team. You can control who can view and edit your dashboards to keep your data secure.


### Data collection

Before you can start investigating threats, you need data. As a data analyst, this step may have been done by your administrator. 

Your company collects and [ingests](/docs/cse/ingestion/) millions of log messages into Sumo Logic. Typically, you can use these messages right away in many Sumo Logic apps. To use them in Cloud SIEM, however, your admin must enable [data forwarding](/docs/manage/data-forwarding/). Your admin may also need to [create log mappings](/docs/cse/schema/create-structured-log-mapping/), [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule/), or complete other preprocessing steps to extract the right data.

<img src={useBaseUrl('img/cse/intro-cloud-siem-data-collection.png')} alt="Data collection" width="600"/>

As a data analyst, you should periodically examine the data that’s being ingested by Sumo Logic and Cloud SIEM. After you’ve been using Cloud SIEM for a while, you may want to fine-tune it to fit your organization’s needs. If you discover that you’re ingesting too much or too little data to do threat hunting, you can work with your admin to find that balance.

So, what’s the balance between too much and too little data? It depends. Work with your admin to answer these questions:

* **Are you ingesting enough data?** Cloud SIEM takes thousands or millions of records and boils them down into just a handful of Insights. Most organizations ingest more than 50GB of data every day to start finding any Insights. If your ingest volume is smaller than this, consider sending more data to Cloud SIEM or using other security solutions like the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/) app.
* **Are you ingesting too much data?** More data doesn’t always mean more Insights. The threat detection logic built into Cloud SIEM generally prevents false positives. However, some organizations choose to ingest or store less data as a way to cut costs. One solution is partitioning your data into different tiers, and only sending some of that data along to Cloud SIEM. 
* **Are you ingesting the right data?** Cloud SIEM doesn’t just work on quantity alone. Quality data will affect your performance as well. As a best practice, you’ll need to bring in quality data sources that are supported by Cloud SIEM. High-value data sources include [CloudTrail logs](/docs/integrations/cloud-security-monitoring-analytics/aws-cloudtrail/), [Windows event logs](/docs/send-data/installed-collectors/sources/collect-forwarded-events-windows-event-collector/), [AWS logs](/docs/integrations/amazon-aws/), and [GuardDuty logs](/docs/integrations/amazon-aws/guardduty/).

### Processing your data for Cloud SIEM

Before Cloud SIEM can generate security Insights, your log messages must go through a little processing first. First, Cloud SIEM processes the messages into Records. Each Record contains the information from a message, which is parsed into key-value pairs, mapped to a Cloud SIEM schema, and enriched with other data.

<img src={useBaseUrl('img/cse/intro-cloud-siem-messages-to-records.png')} alt="Messages generate records" width="500"/>

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

## Get started with threat investigation

Threat investigation is reactive while threat hunting is proactive. Typically, threat investigation happens in response to an alert. Once you’ve investigated a threat, you can hunt for similar threats and take precautionary steps to prevent attacks from happening again. 

Threat investigation is an iterative process, much like troubleshooting. In both threat investigation and troubleshooting, you first monitor your systems. Once an anomaly is detected, you can make a hypothesis about how it happened and diagnose the problem. As you dig deeper, you may revise this initial hypothesis and find more clues about why or how the attack or error happened. You can then take action to resolve the issue. 

<img src={useBaseUrl('img/cse/intro-cloud-siem-incident-response-process.png')} alt="Incident response process" width="600"/>

Cloud SIEM acts as your first line of defense, monitoring your system. Cloud SIEM’s threat intelligence and correlation algorithms organize related potential security events into Insights. When you get alerted to an Insight, it’s up to you to diagnose the problem and take action.

The [Insight page](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) shows everything you need to start unravelling the security event. As you start investigating, try to answer as many wh- questions as you can about the event:

* Who is behind the event?
* What assets did the event affect?
* Where did the event occur?
* When did the event occur?
* Why did the event occur?
* How did the event occur? 

When Signals cluster together, Cloud SIEM uses their tactics and techniques to name the Insights they generate. The Insight’s name can point you to how the event occurred, or why the adversary is behaving that way. For example, a tactic name like discovery or persistence shows the reasons the adversary has. Similarly, tactic names like initial access or execution can tell you a little about the methods the adversary used. These names are just starting points, however, and you may need to revise your hypotheses as you continue your investigations.

For example, an Insight is named Discovery with Execution. Why did the event occur? Probably so the adversary could discover your information. How did the event occur? By using an executable file or a similar technique. 

The [timeline](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui#signal-visualization-area) can tell you when the event occurred. You can see whether each signal was triggered at the same time, or sequentially, as well as whether everything happened over minutes, hours, or days. By default, Insights are related Signals that cluster together within the last 14 days.

The [entities within each Signal](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui#entities-tab) can help point to who, what, or where the event occurred. An entity might point to the IP address of a hacked device, the location of the adversary, the location of the database that leaked, the owner of a website or domain, or some other piece of the puzzle.

Cloud SIEM can help with every step of the threat investigation process. Cloud SIEM automatically detects and monitors potential threats by analyzing millions of records and distilling them into a handful of Insights with a low false positive rate. You can choose Insights from the home page of Cloud SIEM in the [Insight Radar](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display#insight-radar), under the [Insight Activity pane](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display#insight-activity), or from the [Insights panel](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/). 

Once you choose an Insight, you can dig through all the raw logs and Signals to conduct deep-dive investigations and even proactive threat hunts. You can organize your thoughts, make hypotheses, and take notes about your investigation in the comments of each Insight. This will share your ideas with your SOC teammates and help you keep track of your investigation.

You can also take certain [actions](/docs/cse/administration/create-cse-actions) directly from the Insight. You can email teammates, create JIRA tickets, execute playbooks, and many other custom actions with the Actions button.

Finally, you can [update the Insight](/docs/cse/administration/manage-custom-insight-resolutions#about-insight-resolutions). You can mark it as “in progress” or “closed”. When you close it, you can mark it as “resolved”, “false positive”, “duplicate”, or “no action”. Updating the status correctly will help the Cloud SIEM Insight engine produce more accurate Insights for your org in the future. 

Of course, this process will repeat each day as new Insights are generated for you to investigate. 

### Dive into Signals and Entities

Insights provide a great, high-level summary of potential security events. Because of Cloud SIEM’s threat intelligence and sophisticated correlation engine, very few Insights are false positives, so they’re all worth investigating.

However, sometimes you may want to investigate deeper, to really understand what happened. Or, you may want to do proactive threat hunting work, to find potential problems before they begin impacting your system, even if some of what you’re looking at are false alarms.

#### Signals

The Signals tab lists all the Signals created by rules that have been triggered in your system in the last 14 days, by default. Signals provide summaries of potential security threats. Remember, not all Signals are security incidents. After all, there are legitimate reasons why someone might be logged in to two different devices at the same time, or why there have been several failed password attempts on an account.

<img src={useBaseUrl('img/cse/intro-cloud-siem-signals.png')} alt="Signals" width="500"/>

When you click into a Signal, you’ll have the option to see the full details of the record that triggered it. This includes information like the IP address, geolocation, threat level, and other information that can aid you in your investigation.

<img src={useBaseUrl('img/cse/intro-cloud-siem-signals-details.png')} alt="Signals details" width="500"/>

#### Entities

The Entities tab lists all the entities that your rules have detected in the last 14 days, by default. Each entity has an Activity Score associated with it. The activity score is the sum of all the severity scores of all the unique signals associated with that entity. When an entity’s activity score reaches at least 12, an Insight is created. If you have several entities with relatively high activity scores, they might be a good starting point for a threat hunt.

<img src={useBaseUrl('img/cse/intro-cloud-siem-entities.png')} alt="Entities" width="500"/>

### Bring it back to Sumo Logic search

Sometimes you want to take your investigation even further. An in-depth threat investigation will use the most of both Cloud SIEM and Sumo Logic’s core search functionality. 

There are several ways to bring the information you find in Cloud SIEM back to the Sumo Logic platform. One [context action](/docs/cse/administration/create-cse-context-actions) is Sumo Logic Search. Selecting this action will create a log search in Sumo Logic. This way, you can find all log messages with that entity, even if it wasn’t detected by a rule in Cloud SIEM.

Many entities in the Insights, Signals, and Entities pages have context actions (six-dot icon). Hover next to certain entities and the six-dot icon may appear, if context actions are available for that object. Use the context actions to insert the entity into an API call, do a DNS lookup, or many other tasks. Your admin can add custom context actions too.

You can also work with your admin to set up dashboards in Sumo Logic that track Insights and other activity in Cloud SIEM. This allows you to monitor what’s going on in Cloud SIEM without ever leaving Sumo Logic’s core platform.

### Take action on Insights

In addition to the context actions available in the Cloud SIEM UI, there are many other [actions](/docs/cse/administration/create-cse-actions/) you might take in response to an Insight.  For example, you might work with your IT team to isolate and wipe laptops infected with malware to prevent spread of malicious code. Or, you might work with your HR team to enforce mandatory anti-phishing training among all employees to prevent future attacks.

In Cloud SIEM, there are several different actions you can take on each Insight. You can comment on the Insight, or close it or assign a status to it. When you close an Insight, Cloud SIEM uses the resolution information to reduce false positives and duplicates further. Assigning a status to the Insight lets you keep working on it, and keep track of your progress. 

You can also assign the Insight to yourself or to a colleague, and use the Actions button to alert colleagues, create JIRA tickets, send Slack messages, execute playbooks, or use other APIs. This Actions button is customizable, but can only be configured by admins. If you need a custom Action, ask your Admin or Sumo account rep for help creating one.

### Using the MITRE ATT&CK matrix

The [MITRE ATT&CK matrix](https://attack.mitre.org/matrices/enterprise/) is published by MITRE, a non-profit research organization. ATT&CK stands for Adversarial Tactics, Techniques, and Common Knowledge. 

The framework organizes and categorizes the tactics and techniques that hactivists, cyber criminals, nation states, scripters, and other adversaries use. This includes attacks like exfiltrating databases, installing malware, stealing credentials, and all the other nefarious activities you and your SOC team are trying to stop. 

Cloud SIEM uses these same tactic names for the stages of Signals and the names of Insights. Once you're familiar with ATT&CK, navigating Cloud SIEM's Insights page becomes easier.

If you read the news, or are familiar with other cybersecurity frameworks like the Pyramid of Pain, you know there are many kinds of threats out there. It’s easy to become overwhelmed. However, Cloud SIEM helps organize all the potential threats in your system into one manageable dashboard, leveraging the knowledge found in the MITRE ATT&CK matrix along with the Insights algorithm.

## Tune your environment

### Why tune?

Once you’ve completed a few investigations, you may want to add or modify the rules, data sources, match lists, and other pieces of the Cloud SIEM puzzle. These modifications can help further reduce false positives or alert you even faster. The most common things to customize are rules and Insights. 

[Rules](/docs/cse/rules/about-cse-rules/) are one of the most important pieces of Cloud SIEM’s threat detection engine. All the records that are ingested in Cloud SIEM are compared to every rule in Cloud SIEM. If there’s a match, an entity is extracted and a Signal is created. Those entities are tracked and may correlate with other Signals to create an Insight, which is where most threat investigations begin.

<img src={useBaseUrl('img/cse/intro-cloud-siem-records-to-signals.png')} alt="Records to signals" width="400"/>

You don’t have to write rules from scratch. The Sumo Logic content team creates and maintains hundreds of [out-of-the box rules](/docs/cse/rules/cse-built-in-rules/), to get you started. These rules are updated frequently, often every few days. You can check out the most recent updates in the [Cloud SIEM release notes page](/release-notes-cse/). 

If you do decide to write a custom rule, Insight, or rule tuning expression, these aren’t updated or deleted by Sumo Logic during the regular updates. They’re independent from the default rules.

### Rule tuning

With [rule tuning](docs/cse/rules/rule-tuning-expressions/), you can modify existing rules without rewriting them from scratch. This lets you customize them without a lot of work. When you use rule tuning instead of [custom rules](/docs/cse/rules/before-writing-custom-rule/), your tuning expressions are retained when Sumo updates that rule. So you still get to take advantage of the rules Sumo pushes out to all users.

Once you’ve written a tuning expression, you can apply that tuning expression to multiple rules. You can also apply multiple tuning expressions to each rule, so they’re very flexible. We’ll learn how to apply one tuning expression to multiple rules, and we’ll also learn how to apply multiple tuning expressions to one rule today.

A rule tuning expression is an AND statement that you add to an existing rule. It’s usually simple logic you add to rules. As a best practice, you should use rule tuning expressions when you have a small number of specific exceptions to existing rules.

### Custom rules

Adding a rule tuning expression to an existing rule is one of the easiest and most common ways to customize your rules. But sometimes you need to [write a new rule from scratch](/docs/cse/rules/before-writing-custom-rule/). You might do this if your system has a source that isn’t covered by the default rules, or if you’re looking for a threat that isn’t covered by the default rules.

See [Rule types](/docs/cse/rules/about-cse-rules#rule-types) for the types of rules you can create.

### Custom Insights

Once a rule is in your system, whether it’s a custom rule you created or one created by the Sumo team, Cloud SIEM will use it to create Signals. When a rule is created, you configure its severity score. This is on a scale from 0 to 10, with 10 being the most severe. 

If a record matches a rule, an entity is extracted from the record. The entity might be something like an IP address, a user name, a domain name. It tells you who the potential threat is.

Once an entity is in Cloud SIEM’s system, Cloud SIEM tracks the total severity score of Signals associated with each entity as an activity score. Once that activity score gets high enough, usually over 12 by default, then an insight is created.

So, if you want an Insight to be created with the default settings, you’d have to have rules with a severity score of 1 trigger 12 different times, or rules with severity scores of 6 or higher trigger twice. This is why Insights typically have several Signals associated with them.

You can have a large number of low-severity score Signals that won’t create an Insight. Or, you can have a small number of high-severity score Signals that will create an Insight. Keep this in mind when you’re configuring the severity scores of your custom rules.

<img src={useBaseUrl('img/cse/intro-cloud-siem-signals-to-insights.png')} alt="Signals to insights" width="450"/>

But what if you want to be alerted right away when a certain rule is triggered?

[Custom Insights](/docs/cse/records-signals-entities-insights/configure-custom-insight/) let you create Insights based on one specific Signal, or a chain of Signals. This is great for known threats specific to your system. You won’t need to change any of your existing rules and Insights. They’ll keep working normally.

### Other customizations and best practices

Remember, Cloud SIEM’s out-of-the-box rules and Insights are great. But we want you to have the flexibility to customize your environment. There are three simple three ways to customize Cloud SIEM’s rules and Insights.

* First, [rule tuning expressions](/docs/cse/rules/rule-tuning-expressions/) are simple ways to add small exceptions and other clauses to existing rules.
* Second, [custom rules](/docs/cse/rules/before-writing-custom-rule/) let you write logic that’s unique to your system, to cover threats or data sources that aren’t covered by built-in rules. 
* Finally, [Custom Insights](/docs/cse/records-signals-entities-insights/configure-custom-insight/) allow you to get alerts based on just one rule or a chain of rules. 

Before you create custom rules from scratch, there are some best practices you’ll want to follow.

* **Check existing rules**. Sumo Logic already has hundreds of [built-in rules](/docs/cse/rules/cse-built-in-rules/), so you might not need to write a new one. Or, you may only need to make small changes to existing rules, like adding a rule tuning expression or adjusting a severity score.
* **Know your system**. You’ll need to understand the [schema](/docs/cse/schema/) and [log mappings](/docs/cse/schema/create-structured-log-mapping/) of all the records ingested into Cloud SIEM to write effective rules. You might want to work with an administrator on your team who knows this to write better rules. 
* **Know your risk appetite**. In addition to your system’s details about log mappings and other metadata, you need to understand your company’s risk appetite and risk tolerance. For example, some companies might want to monitor a large amount of outbound traffic, but not consider this a threat. So, they’d assign this rule a severity of zero. However, other companies might be alarmed by outbound traffic and consider it data exfiltration, assigning the same rule a severity of five.
* **Know the rule types**. You also need to understand all [the types of rules](/docs/cse/rules/about-cse-rules/#rule-types). If your use case requires a chain rule, but you try writing a threshold rule, the rule might not be as efficient or effective. 
* **Make small changes**. As a best practice, when you do write a new rule or edit an existing one, make small changes. For example, instead of decreasing a severity score from 8 to 2, try decreasing it from 8 to 7 and monitoring the change for a while.
* **Save as a prototype**. Another best practice is to [save all new rules as a prototype](/docs/cse/rules/write-match-rule#save-as-prototype). This allows you to monitor the rule’s behavior, without creating new Insights and alerts.

Rule tuning, custom rules, and custom Insights are just a taste of what you can customize in Cloud SIEM. However, some customizations, like configuring the [Actions button](/docs/cse/administration/create-cse-actions), need admin privileges. You can work with your admin or your Sumo Logic account rep to customize:
* [Log mappings](/docs/cse/schema/create-structured-log-mapping/)
* [Match lists](/docs/cse/match-lists-suppressed-lists/)
* [APIs](/docs/cse/administration/cse-apis/) and other [plugins](/docs/cse/integrations/)
* How much data Cloud SIEM [ingests](/docs/cse/ingestion/)




