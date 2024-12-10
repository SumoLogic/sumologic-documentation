---
id: intro-for-administrators
title: Introduction to Cloud SIEM for Administrators
sidebar_label: Introduction for Administrators
description: Learn basic concepts about Cloud SIEM for administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


This article provides an introduction to Cloud SIEM for administrators.

If you are unsure whether you are an analyst or administrator, you can view your role in **Preferences** (see [Onboarding Checklists](/docs/get-started/onboarding-checklists/)). To use Cloud SIEM as an administrator, you must be assigned [Cloud SIEM role capabilities](/docs/manage/users-roles/roles/role-capabilities/#cloud-siem) that allow you to view and manage Cloud SIEM elements as well as perform administration tasks.

While this section provides an introduction to Cloud SIEM for administrators, it is not a how-to for setting up Cloud SIEM. If you're setting up Cloud SIEM for the first time, see [Onboarding Checklist for Cloud SIEM Administrators](/docs/cse/get-started-with-cloud-siem/onboarding-checklist-cse/).

## Build your SOC

### The Cloud SIEM data pipeline

Cloud SIEM is a cloud-based, enterprise-grade security information and event management (SIEM) system. Cloud SIEM leverages Sumo Logic's core functionality, including data collection, ingestion, storage, and threat intelligence. 

This is Sumo Logic's Cloud SIEM home page. 

<img src={useBaseUrl('img/cse/cloud-siem-hud.png')} alt="Cloud SIEM main page" style={{border: '1px solid gray'}} width="800"/>

* A. **Count**. A count of the records created from incoming messages, and the signals and insights that have been generated.
* B. **Insights by Status**. An overview of recent insights and their statuses: New, In Progress, Closed, or Other.
* C. **Radar**. Visualizes the last 24 hours of security activity. Dark blue lines represent records, light blue bars represent signals, and red triangles represent insights.
* D. **Recent Activity**. Displays a feed of the latest insights that have been generated.

Sumo Logic collects and ingests millions of your company's log messages. However, you may choose to send only a portion of these to Cloud SIEM. Cloud SIEM takes these messages and parses, maps, and enriches them into records. These records are compared to rules and, if there's a match, entities are extracted from them and Cloud SIEM uses that information to create signals. These signals and entities are correlated, and used in security detection use cases. Then, if a certain severity threshold is crossed, they become an insight. Some of these insights have actions available right in the Cloud SIEM platform, like alerting your SOC teammates.

<img src={useBaseUrl('img/cse/intro-data-flow.png')} alt="Cloud SIEM data flow"  width="800"/>

As a Cloud SIEM administrator, it's your job to make sure that this pipeline flows smoothly. In this section, you'll learn how to partition your data in Sumo Logic, forward it to Cloud SIEM, customize the schema mappings, and tune the SOC content to support the analysts on your SOC team. All these customizations and optimizations will help reduce false positives and enable your SOC analyst teammates to investigate and hunt threats faster.

### Ingest the right data

The first part of the security data pipeline is collection and ingestion in Sumo Logic.

<img src={useBaseUrl('img/cse/intro-ingest-the-right-data.png')} alt="First part of the data pipeline"  width="500"/>

These messages are then forwarded to Cloud SIEM. It's a good idea to periodically examine the data you're ingesting and sending to Cloud SIEM. Ask yourself these questions:

* **Are you ingesting enough data?** Cloud SIEM takes thousands or millions of records and boils them down into just a handful of insights. Most organizations ingest more than 50GB of data every day to start finding any insights. If your ingest volume is smaller than this, consider sending more data to Cloud SIEM or using other security solutions like the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/).
* **Are you ingesting too much data?** More data doesn't always mean more insights. The threat detection logic built into Cloud SIEM generally prevents false positives. However, some organizations choose to ingest or store less data as a way to cut costs. One solution is partitioning your data into different tiers, and only sending some of that data along to Cloud SIEM. 
* **Are you ingesting the right data?** Cloud SIEM doesn't just work on quantity alone. Quality data will affect your performance as well. As a best practice, you'll need to bring in quality data sources that are supported by Cloud SIEM. High-value data sources include [CloudTrail logs](/docs/integrations/cloud-security-monitoring-analytics/aws-cloudtrail/), [Windows event logs](/docs/send-data/installed-collectors/sources/collect-forwarded-events-windows-event-collector/), [AWS logs](/docs/integrations/amazon-aws/), and [GuardDuty logs](/docs/integrations/amazon-aws/guardduty/). You should also consider whether your data is structured, like key-value pairs, or unstructured, like plain text files. Most data ingested into Sumo Logic is semi-structured, like JSON logs.

Once you've answered these questions, you can assess what is and isn't working for you and your SOC team. You can then partition your data in Sumo Logic and forward some or all of it to Cloud SIEM.

#### Extra resources

* All data must be ingested into Sumo Logic before it can be forwarded to Cloud SIEM. See [Cloud SIEM Ingestion](/docs/cse/ingestion/) to learn more details about data ingestion, setting up collectors, partitioning your data, and designing good metadata. 
* If you only want to forward some, but not all of your data to Cloud SIEM you can use data tiers and partitions. For more information, see [Partitions](/docs/manage/partitions/).

### Which UI should I use?

As a Cloud SIEM admin, you'll use both the Sumo Logic UI and the Cloud SIEM UI. Even if you're primarily focused on Cloud SIEM, you need to be comfortable using both interfaces.

| Sumo Logic UI | Cloud SIEM UI |
| :-- | :-- |
| <ul><li>Add collectors and data sources.</li><li>Write field extraction rues.</li><li>Configure partitions and data tiers</li><li>Forward data to Cloud SIEM.</li><li>Configure RBAC controls.</li></ul> | <ul><li>Configure log and ingest mappings.</li><li>Create custom content, such as rules, match lists, and insights.</li><li>Customize actions, context actions, and other workflows.</li></ul>|

In the Sumo Logic UI, you'll add the collectors and data sources that will be used in Cloud SIEM. You can write field extraction rules, which help parse your logs so they can be better used as records in Cloud SIEM. You can also configure partitions and data tiers in Sumo Logic, and decide which data gets forwarded to Cloud SIEM. Finally, you configure users and roles for both Sumo Logic and Cloud SIEM using the Sumo Logic interface. 

In the Cloud SIEM UI, you'll configure the log and ingest mappings that turn your log messages into records. You can also create custom content to help with threat investigations like rules, match lists, and insights. Finally, you can customize what the actions, context actions, and workflows do in the Cloud SIEM interface, using APIs and other playbooks.

## Configure and enable Cloud SIEM

### Get your data into Cloud SIEM

After you've decided what data to ingest (or not ingest), you can work on forwarding that data to Cloud SIEM.

When you enable data forwarding, Cloud SIEM automatically starts processing your log messages into records. Each record contains the information from a message, which is parsed into key-value pairs, mapped to a Cloud SIEM schema, and enriched with other data.

<img src={useBaseUrl('img/cse/intro-forward-data.gif')} alt="Forward data"  width="500"/>

As an admin, there are several steps you must complete to forward data to Cloud SIEM. 
1. First, you request backend configuration. This is a one-time setup for each Sumo Logic organization. Often, your Sumo account rep will complete this process for you. 
1. Next, you enable data forwarding. You can do this by adding the `_siemForward = True` field when you set up a collector. For cloud data sources, you can also toggle the **Forward to SIEM** checkbox. You'll need to enable data forwarding each time you add a new data source into Sumo Logic, update your partitions, or make other changes to your data ingestion process.

    Cloud SIEM will not ingest historic data. In other words, any new data ingested into Sumo Logic will be forwarded to Cloud SIEM as soon as you enable data forwarding. However, older data will not be processed by Cloud SIEM. Data will start flowing from Sumo Logic into Cloud SIEM within a few minutes of enabling data forwarding. You can expect signals and insights to start generating within a few hours.
1. Finally, you'll configure the log and ingest mappings. This process is usually automatic, but must be completed for certain types of custom data sources.

If you do need to configure log and ingest mappings, there are certain details you need to know about your data:
* Is your data structured or unstructured?
* Does your data have a syslog header?
* Is your data CEF, LEEF, JSON, XML, or some other common data type?
* Have field extraction rules been applied to your messages in Sumo Logic?
* What product and vendor do your messages come from? For example, are they Windows Event Logs, Palo Alto Firewall logs, or AWS GuardDuty logs?

Once you know these details of your data, you can consult the Sumo Logic documentation for specific help for configuring your data pipeline. 

Later in this introduction, we'll be ingesting and processing simple, structured JSON log messages to demonstrate this configuration process.

#### Extra resources

* There are many different data sources and data types you may be ingesting into Sumo Logic. You can read the details about forwarding data from various vendors and products to Cloud SIEM in [Cloud SIEM Ingestion](/docs/cse/ingestion/).
* For the best signals and insights with the fewest false positives in Cloud SIEM, you need to ingest high-quality data. You can ensure your data is high quality by making sure your data and metadata are clean and organized from the moment you first ingest them into Sumo Logic. One way to do this is by writing good field extraction rules. See [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

### Enable data forwarding for an HTTP source

In this section, we'll show you how to create a new source using a pre-configured collector and enable data forwarding to Cloud SIEM by selecting the **Forward to SIEM** checkbox. Once the new source is configured with data forwarding, you'll be able to send data to it and observe the data flow.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Locate a hosted collector whose data you want to forward to Cloud SIEM.
1. Click **Add Source**.
1. Click **HTTP Logs & Metrics**.
1. Enter a name and source category.
1. Select the **Forward to SIEM** checkbox.
1. Leave other fields as their defaults and click **Save**. 
1. A popup will appear with a URL. Copy the URL and keep it somewhere safe, like a Notes or TextEdit file. We'll use it in the next section.  

#### Tips and tricks

* Read [Best Practices for Data Collection](/docs/send-data/best-practices/).
* If you need to find the HTTP source URL address again, click the **Show URL** link next to your source.

### Send a log message to Cloud SIEM

In this section, we'll send a simple JSON log message to the HTTP source we created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source). Then, we'll look for that log message in Cloud SIEM. This will verify that we configured our source correctly, and demonstrate how quickly Cloud SIEM can ingest data.

1. Open a CLI window, such as Terminal or PowerShell. 
1. Type this command:
    * Windows:
       ```
       curl.exe -d "{"ip": "192.0.2.0", "threatName": "<attacker name>"}" -H "Content-Type: application/json" <http source url>
       ```
    * macOS:
       ```
       curl -d '{"ip": "192.0.2.0", "threatName": "<attacker name>"}' -H 'Content-Type: application/json' <http source url>
       ```
     Replace `<attacker name>` with your own initials or another unique identifier. Replace the `<https source url>` with the URL you copied in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).

    This simple JSON log message, `{"ip": "192.0.2.0", "threatName": "trainingRS"}`, will be collected and ingested by Sumo Logic as soon as you press Enter. If data forwarding was enabled properly in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source), it's also forwarded to Cloud SIEM where it's parsed, mapped, and enriched. This process can take anywhere from a few seconds to up to 15 minutes. 

1. When you're ready, we'll find your log message as a record in Cloud SIEM.
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Records** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Records**. You can also click the **Go To...** menu at the top of the screen and select **Records**. 
    1. In the **Filters** bar, select **Metadata Source Category** from the dropdown.
    1. Select the **is** operator from the dropdown.
    1. Type the source category you used in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    1. You should see a failed record. This record failed because the custom JSON log message does not have a log or ingest mapping associated with it. Although the log message was forwarded from Sumo Logic to Cloud SIEM, it did not successfully complete the parse, map, and enrich steps of the pipeline. We'll fix this in the next sections.

#### Tips and tricks

* If you get an error after running the CURL command in step 2, make sure your quotes are straight. Copy and pasting the command sometimes changes the formatting of these quote marks into curly quotes.
* If you don't see any records, try:
    * increasing the timestamp range to the last 60 minutes or the last 3 hours.
    * making sure the metadata source category you searched in the **Filters** bar matches the one you created earlier.
    * searching for the log in Sumo Logic with this query: `_index=sec_record_* metadata_sourceCategory=<source-category>` Replace `source-category` with the source category you created. 
* If you still don't see your custom JSON record after these troubleshooting steps, try sending another log message from your terminal window. Make sure the command completes without any errors.

### Logs into records

<img src={useBaseUrl('img/cse/intro-logs-into-records.png')} alt="Logs into records"  width="500"/>

Now that you have a source set up to send data Sumo Logic into Cloud SIEM, let's follow a simple log message down that data pipeline.

```
sso : ip-192-0-2-0 : alex@travellogic.com : "Successful Login" : “2024-05-25T22:11:42"
```

First, the message is parsed into a set of key-value pairs. This process also fixes basic formatting. This step creates semi-structured data. For example, instead of ip-127-0-0-1, the parsing step extracts the IP address into a key-value pair, where the key is something like `srcDeviceIP` and the value is `192.0.2.0`, with the hyphens normalized to dots. Then, this information is mapped onto the [Cloud SIEM schema](/docs/cse/schema/). Finally, the record is enriched with information from match lists or threat intelligence databases.

These normalized records are then sent down the Cloud SIEM pipeline and compared to rules. When Cloud SIEM extracts an entity from a record to create a signal, it uses the parsed and mapped key-value pairs to categorize each signal. When signals with the same entity cluster together, an insight is created. Therefore, it's important for the records to have quality metadata from the start to produce the best insights.

You can make sure these records are parsed, mapped, and enriched properly by maintaining good metadata design and setting up good log and ingest mappings, which we'll practice in the next sections.

### Set up an ingest mapping

In [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem), we sent a log message to Cloud SIEM, and received a "failed record" error. In this section and the next one, we'll create ingest and log mappings to ensure the custom JSON data from the log messages we send are used properly by Cloud SIEM.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then and under **Integrations** select **Sumo Logic**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Ingest Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Mappings**. 
1. Click **Add Ingest Mapping**.
1. Enter the source category you used in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
1. Select **JSON** as the **Format**. This matches the format of the log message we sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem).
1. Enter a **Vendor** and **Product**. As a best practice, avoid spaces in the vendor and product names. 
1. Click **Save**.
1. Hover your mouse over the new ingest mapping, click the three-dot icon that appears to the right, and select **Enable**. 

#### Extra resources

If you need help configuring other types of ingest mappings, see [Configure a Sumo Logic Ingest Mapping - Cloud SIEM](/docs/cse/ingestion/sumo-logic-ingest-mapping/).

### Set up a log mapping

In this section, we'll create a log mapping to ensure the custom ingest mapping we created in [Set up an ingest mapping](#set-up-an-ingest-mapping) is used properly by Cloud SIEM.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.
1. Click **Add Log Mapping**. 
1. Click **Structured Mapping**. In Cloud SIEM, JSON data is considered to be structured data. 
1. Give your log mapping a name.
1. Under **If Input Matches**, use the vendor and product you created in [Set up an ingest mapping](#set-up-an-ingest-mapping). 
1. Select **JSON** as the format.
1. Type `.*` for the regex. This will match all incoming logs.
1. Under **Then Create Record**, the vendor and product should match what you entered under **If Input Matches**.
1. In **Fields**, enter the fields from the JSON log message we sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem) under **Input Field**. Then, under **Output Field**, map them to their equivalents in the Cloud SIEM schema. Then, click **Add Field**. Refer to this table for help:
     | Input field | Output field |
     | :-- | :-- |
     | ip | device_ip |
     | threatName | threat_name |
     :::note
     Typically, JSON logs have more than just two fields. In this section, we're using the simplified example log we sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem), so we only need to add two new fields.
     :::
1. Scroll back up to **Then Create Record**.
1. For **Record of type** select **Authentication**. Selecting the record type now ensures you do not limit the fields you could selected in an earlier step.
1. Click **Submit**.

#### Tips and tricks

* See [Field Mapping for Security Event Sources](/docs/cse/schema/field-mapping-security-event-sources/) for a for a full list of the fields you can map to.
* Hover over the yellow triangle next to the **Submit** button to see a list of errors and warnings that need to be resolved before you can submit.

### Send another log message to Cloud SIEM

Your new log and ingest mappings won't apply to the first log message you sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem). In this section, we'll send another log message to the HTTP source we created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source). Then, we'll look for that new log message in Cloud SIEM. This time, the log and ingest mappings we created in [Set up an ingest mapping](#set-up-an-ingest-mapping) and [Set up a log mapping](#set-up-a-log-mapping) should apply to the new record.

1. Open a CLI window, such as Terminal or PowerShell. 
1. Type this command:
    * Windows:
       ```
       curl.exe -d "{"ip": "192.0.2.0", "threatName": "<attacker name>"}" -H "Content-Type: application/json" <http source url>
       ```
    * macOS:
       ```
       curl -d '{"ip": "192.0.2.0", "threatName": "<attacker name>"}' -H 'Content-Type: application/json' <http source url>
       ```
     Replace `<attacker name>` with your own initials or another unique identifier so you can find it easily later. Replace the `<https source url>` with the URL you copied in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).

     :::tip
     Since you already sent a CURL command in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem), you may be able to press the up arrow key and Enter to send the command again in most CLI programs.
     :::

     This simple JSON log message, `{"ip": "192.0.2.0", "threatName": "<attacker name>"}`, will be collected and ingested by Sumo Logic as soon as you press Enter. If data forwarding was enabled properly in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source), it's also forwarded to Cloud SIEM where it's parsed, mapped, and enriched. This process can take anywhere from a few seconds to up to 15 minutes. 

1. When you're ready, we'll find your log message as a record in Cloud SIEM.
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Records** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Records**. You can also click the **Go To...** menu at the top of the screen and select **Records**. 
    1. In the **Filters** bar, select **Metadata Source Category** from the dropdown.
    1. Select the **is** operator from the dropdown.
    1. Type the source category you used in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    1. You should see a record with the IP address and threat name parsed properly.

Although the log message and method of ingestion was identical, the log message failed to parse into a Cloud SIEM record in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem) because the log and ingest mappings weren't configured. After we configured the log and ingest mappings, the new log messages forwarded to Cloud SIEM successfully completed the parse, map, and enrich steps to become a record.

#### Tips and tricks

* If you get an error after running the CURL command, make sure your quotes are straight. Copy and pasting the command sometimes changes the formatting of these quote marks into curly quotes.
* If you don't see any records, try: 
    * increasing the timestamp range to the last 60 minutes or the last 3 hours.
    * making sure the metadata source category you searched in the **Filters** bar matches the one you created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    * searching for the log in Sumo Logic with this query: `_index=sec_record_* metadata_sourceCategory=<source-category>` Replace `<source-category>` with the source category you created earlier. 
* If you still don't see your custom JSON record after these troubleshooting steps, try sending another log message from your terminal window. Make sure the command completes without any errors. 
* If your new record failed too (you see two failed records), either your log or ingest mapping weren't configured correctly. Review those configurations and try again.

## Tune your environment

### Why tune?

Once your data gets ingested in Cloud SIEM and is made into records, the records are compared to every rule in Cloud SIEM. If there's a match, an entity is extracted and a signal is created. Those entities are tracked and may correlate with other signals to create an insight, which is where most threat investigations begin.

<img src={useBaseUrl('img/cse/intro-cloud-siem-records-to-signals.png')} alt="Records to signals" width="400"/>

You've already learned how to set up log and ingest mappings to ensure rules accurately match and track these entities. Now that you have a properly parsed a record in Cloud SIEM, it will be compared to rules and potentially generate signals and insights.

 
You've already learned how to set up log and ingest mappings to ensure rules accurately match and track these entities. Now that you have a properly parsed record in Cloud SIEM, it will be compared to rules and potentially generate signals and insights.

Although you don't have to write rules from scratch, you can. In fact, there are several customizations you can do through Cloud SIEM.
* [Rule tuning expressions](/docs/cse/rules/rule-tuning-expressions/) are simple ways to add small exceptions and other clauses to existing rules.
* [Rules](/docs/cse/rules/about-cse-rules/) let you write logic that's unique to your system, to cover threats or data sources that aren't covered by built-in rules.
* [Custom insights](/docs/cse/records-signals-entities-insights/configure-custom-insight/) let you get alerts based on just one rule or a chain of rules.
* [Match lists](/docs/cse/match-lists-suppressed-lists/create-match-list/) can help create groups of entities, such as domains or IP addresses, that can be used when creating other custom content.

Through [role-based access controls](/docs/manage/users-roles/roles/role-based-access-control/), you can allow analysts to customize content as well. However, as a best practice, you should limit who in your organization has the permission to edit and delete rules and other content, since they can impact the number of insights that are generated.

### Custom rules

You don't have to write rules from scratch. The Sumo Logic content team creates and maintains hundreds of out-of-the-box rules, to get you started. You can find documentation on all the out-of-the-box rules in the [Cloud SIEM Content Catalog](/docs/cse/get-started-with-cloud-siem/cloud-siem-content-catalog/). These rules are updated frequently, often every few days. You can check out the most recent updates in the [release notes](/release-notes-cse/).

However, if you have a specific threat you're concerned about or a unique data source that isn't covered, you can write a custom rule. See [Rule types](/docs/cse/rules/about-cse-rules#rule-types) for the types of rules you can create:
* **Match rules** take a simple boolean statement, check if it's true or false. If it's true, then an entity is extracted and a signal is created.
* **Threshold rules** are triggered when a match is found a certain number of times. So, for example, if one failed login attempt is acceptable, but 5 isn't, then a threshold rule would fire after the fifth failed login attempt. 
* **Chain rules** fire when certain events happen in a certain time window. So, for example, if you want to look for 5 failed login attempts followed by one successful log in within one hour, you'd use a chain rule.
* **Aggregation rules** are triggered when up to six different events accumulate over time. For example, if you want a rule that looks for a large number of event types from a single device IP, you'd use aggregation rules.
* **First Seen rules** are triggered when behavior by an entity (such as a user) is encountered for the first time. For instance, it fires the first time a user logged in from a new geographic location.
* **Outlier rules** are triggered when behavior by an entity is encountered that deviates from "normal" baseline activity.  For instance, it fires when a user has an abnormal volume of downloaded data, or has a number of failed logins.

As a Cloud SIEM admin, you'll be able to create all these rules. Work with the SOC analysts on your team to write rules that help them investigate threats and reduce response time.

Before you create custom rules from scratch, there are some best practices you'll want to follow.
* **Check existing rules**. Sumo Logic already has hundreds of [built-in rules](/docs/cse/rules/cse-built-in-rules/), so you might not need to write a new one. Or, you may only need to make small changes to existing rules, like adding a rule tuning expression or adjusting a severity score.
* **Know your system**. You'll need to understand the [schema](/docs/cse/schema/) and [log mappings](/docs/cse/schema/create-structured-log-mapping/) of all the records ingested into Cloud SIEM to write effective rules. As an administrator, it's your responsibility to know this inside and out. 
* **Know your risk appetite**. In addition to your system's details about log mappings and other metadata, you need to understand your company's risk appetite and risk tolerance. For example, some companies might want to monitor a large amount of outbound traffic, but not consider this a threat. So, they'd assign this rule a severity of zero. However, other companies might be alarmed by outbound traffic and consider it data exfiltration, assigning the same rule a severity of five.
* **Know the rule types**. You also need to understand all [the types of rules](/docs/cse/rules/about-cse-rules/#rule-types). If your use case requires a chain rule, but you try writing a threshold rule, the rule might not be as efficient or effective.
* **Make small changes**. As a best practice, when you do write a new rule or edit an existing one, make small changes. For example, instead of decreasing a severity score from 8 to 2, try decreasing it from 8 to 7 and monitoring the change for a while.
* **Save as a prototype**. Another best practice is to [save all new rules as a prototype](/docs/cse/rules/write-match-rule#save-as-prototype). This allows you to monitor the rule's behavior, without creating new insights and alerts.

### Write a threshold rule

In this section, we'll write a rule that looks for three unique Windows event IDs related to failed logins within an hour.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.
1. Click **Create**.
1. On the **Threshold** tile click **Create**.
1. Give your rule a name. 
1. Configure **If Triggered**.
    1. Under **Show Advanced**, select **Count only distinct values for a field**.
    1. Under **When a Record matches the expression**, look for event IDs from Windows by typing this logic: `metadata_deviceEventId=4625`.
    1. Select **matches Records with 3 distinct values**.
    1. In **for field** select **device_ip**. 
    1. Select **within 1 hour(s)**. This configuration looks for any three records within one hour that have the event `ID 4625`, which is the Windows event ID for a failed login attempt.
1. Configure **Then Create Signal**.
    1. For **On Entity** select **device_ip**, since that's the unique entity we want to track.
    1. Enter a description in **with the description**.
    1. Under **with a severity of** select any severity score you think is appropriate for your rule. 
    1. In **with tags** select **Tactic** and **TA0001 - Initial Access**. Because we're looking for failed logins, these are attempts at initial access.
    1. Select the **Save this rule as a prototype** checkbox.
    1. Click **Submit** to save your rule.

#### Tips and tricks
* Rule names must be unique. If your rule won't submit, it's possible that there is a rule with the same name.
* The autocomplete feature can help you write the logic. For example, typing "ip" will bring up a dropdown showing all available fields related to IP addresses.
* The syntax coloring can help you write the logic. For example, try using single quotes ('...') instead of double quotes ("..."). Notice that the syntax coloring lights up correctly when you use double quotes, which is the best practice.
* Insights are named based on the tactics and techniques tagged in the signals. Consider which tactic or technique from the [MITRE ATT&CK](https://attack.mitre.org/) framework your rule is looking for when selecting tags.
* Whenever you create a new rule in Cloud SIEM, save it as a prototype so you can monitor its behavior for a few weeks before pushing it to your system live.
* Check for an orange triangle icon next to the **Submit** button before you submit. This will notify you of any errors or warnings.

### Write a chain rule

In this section, we'll write a chain rule that looks for 1 successful login after 10 failed login attempts from the same IP address within 5 minutes.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.
1. Click **Create**.
1. On the **Chain** tile click **Create**.
1. Give your rule a name.
1. Configure **If Triggered**.
    1. For **When at least ___ Record matches expression** select **10**. For the rule expression enter `bro_rfb_authenticationSuccessful=False`.
    1. For **When at least ___ Record matches expression** select **1**. For the expression enter `bro_rfb_authenticationSuccessful=True`.
    1. Select **in exact order** and **within 5 minutes**.
1. Configure **Then Create Signal**.
    1. For **On Entity** select **device_ip**. This will also update the **Grouped by** field in the **If Triggered** section.
    1. In **with the description** write a description of the rule.
    1. For **with a severity of** select any severity score you think is appropriate for your rule. 
    1. In **with tags** select **Tactic** and **TA0001 - Initial Access**. Because we're looking for failed logins, these are attempts at initial access.
1. Select the **Save this rule as a prototype** checkbox.
1. Click **Submit** to save your rule.

### Other customizations

Once your data is flowing into Cloud SIEM, millions of records will be compared to rules. From these, several hundred may match the rules in your system to create signals and a handful of insights. 

After you and the SOC analysts on your team monitor Cloud SIEM for a period of time, you may decide you want even further customizations and performance tuning. Many of these customizations can only be performed by an administrator. For example, as an admin, you can: 
* **Customize the Actions button in Insights**. Admins can create custom actions. Analysts use the **Actions** button on the [insight details page](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#insight-details-page) to help complete their investigations. You can use APIs when creating custom actions, so you have a lot of flexibility and creativity here to do things like execute playbooks, create JIRA tickets, or send Slack notifications.
* **Create and update match lists and suppression lists**. [Match lists](/docs/cse/match-lists-suppressed-lists/) are groups of entities that Cloud SIEM can use in rules. They're similar to allowlists or denylists. Cloud SIEM comes with dozens of standard match lists, but you can also create your own. 
* **Insight generation and custom insights**. There are several ways you can customize your insights. Although the default is to cluster entities together with an activity score of at least 12 over the last 14 days, the threshold for [insight generation](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) is configurable. You can increase or decrease the time frame, or adjust the activity score threshold. You can also create [custom insights](/docs/cse/records-signals-entities-insights/configure-custom-insight/), which will be created when certain rules are triggered, regardless of their severity scores.
* **Create custom workflows**. By default, you can mark an insight as New, In Progress, or Closed. However, with [custom workflows](/docs/cse/administration/manage-custom-insight-resolutions/#create-a-custom-sub-resolution), you can create a new status. For example, if your analysts frequently like to keep insights open while digging deeper to find the root cause, you might want to create a custom workflow for that called Investigating to keep it separate from other insights that are at different stages of the In Progress stage. 

### Customize the Actions button

The **Actions** button is available in all insights in Cloud SIEM and can help you collaborate with teammates. In this section, we'll create a custom **Actions** button to alert an incident response team.  

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Actions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Actions**. You can also click the **Go To...** menu at the top of the screen and select **Actions**. 
1. On the **Actions** tab, click **+ Add Action**.
1. Give your action a name. 
1. Under **Action Type** select **Email**. 
1. Under **Notifications** select **On Demand**.
1. In the **Recipients** field, enter an email address. 
1. Click **Save**.
1. Hover your mouse over the action, click the three-dot menu on the right, and select **Enable**.
1. Now, we'll test our new **Actions** button:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Insights** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**.
    1. Click the name of any insight. 
    1. In the left pane, click **Actions**. You should see your new action listed.
    1. Click the action on the list to execute it. 

### Next steps

So far in this introduction article, you learned how data is forwarded from Sumo Logic to Cloud SIEM. You followed a simple log message down the data pipeline. Then you learned how to set up log and ingest mappings to ensure that message was parsed properly into a record in Cloud SIEM. You also learned how to create custom rules, to make sure the data you ingest gets used in Cloud SIEM's threat detection engine properly. And you created a custom **Actions** button, so the analysts on your team can alert others in our company.

What's next?

* **Configure the data you're ingesting**. Make sure you're familiar with types of data you [ingest](/docs/cse/ingestion/) and whether or not that data is forwarded properly to Cloud SIEM. Work with the analysts on your team to determine if you're ingesting too much or too little data.
* **Create the roles and capabilities of your team**. Assign [Cloud SIEM role capabilities](/docs/manage/users-roles/roles/role-capabilities/#cloud-siem) to ensure the analysts on your team have access to Cloud SIEM and can interact with the insights, signals, rules, and entities they need to complete their investigations.
* **Create custom content**. Work with your SOC teammates to create custom [log mappings](/docs/cse/schema/create-structured-log-mapping/) and [ingest mappings](/docs/cse/ingestion/sumo-logic-ingest-mapping/), [rules](/docs/cse/rules/about-cse-rules/), [insights](/docs/cse/records-signals-entities-insights/configure-custom-insight/), and [actions](/docs/cse/administration/create-cse-actions/) that suit your organization's needs.

## Automation

### Why automate?

[Automation](/docs/cse/automation/) is a key feature of Cloud SIEM that can help manage insights without a lot of manual effort. Automations are composed of "smart actions" such as enrichments and notifications that can be automatically triggered under a set of circumstances, such as an insight being created or closed. Cloud SIEM automations use playbooks, a pre-defined set of actions in a linear or branching workflow to execute when the proper circumstances arise.  

There are several reasons you might want to automate some security tasks:
* **Faster responses**. Automating parts of your SOC can mean faster response times.
* **Consolidate tools**. Orchestrate all your security tools in one location with integrations and custom APIs.
* **Close the skills gap**. Analysts of all skill levels can deploy playbooks. Veteran analysts can spend more time on threat hunting.

Typically, each playbook in Cloud SIEM will help partially or fully automate one or more steps of the incident response cycle.

<img src={useBaseUrl('img/cloud-soar/incident-response-cycle.png')} alt="Incident response cycle" width="600"/>

### Automations and integrations

Cloud SIEM comes with hundreds of pre-built playbooks, integrations, and use cases as part of [App Central](/docs/platform-services/automation-service/app-central/). 

As a Cloud SIEM administrator, you can explore App Central and install any integrations your team requests. You can also create custom integrations using APIs from the **Integrations** page. These integrations will connect Cloud SIEM to other tools like CrowdStrike, ServiceNow, or Jira. Once all your tools are integrated, Cloud SIEM can be a single, central location for orchestrating your security response. 

### Install a new integration

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Automation** and then and click **App Central** in the left navigation bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Automation > App Central**. You can also click the **Go To...** menu at the top of the screen and select **App Central**.  
1. Click **Integrations** at the top of the window.
1. Find any integration that isn't already installed and click **Install**. If an integration has already been installed by another user, you will not see the option to download it. Instead, it will say **Installed**. 
1. A popup window will appear, summarizing the actions that will become available once the integration has been installed. Once you have reviewed these actions, click **Install**. The actions will vary based on which integration you chose to install. 
1. Verify the integration is installed. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  

You should see the integration you installed here. This is how you can verify which integrations are installed on your instance of Cloud SIEM. You can now use the integration as part of any new playbooks you customize or create.

### Playbooks

Once you've identified a potential security incident, you can respond to it in Cloud SIEM by executing a playbook. Playbooks are automated, or partially automated, workflows that act based on information from an incident. A playbook can enrich data, contain threats, notify teams, and other actions with custom APIs. These actions help automatically orchestrate many parts of the investigation, containment, eradication, and recovery processes.

Custom playbooks allow you to automate any task that uses a custom API. You can also use them to automate tasks that aren't part of the hundreds of default playbooks included in Cloud SIEM.

Playbooks are made up of nodes which are connected together in a flowchart. Whether you're customizing a playbook or creating one from scratch, you have several node options:
* **Actions**. Enrich data, execute APIs, send notifications, or use other integrations. 
* **Conditions**. If-then statements that allow playbooks to branch in different directions.
* **Embedded playbooks**. Run another playbook.

Each of these nodes are color-coded in a playbook. The following image shows a sample playbook. Note the different actions and enrichments, along with the branches that execute different sequences of actions based on conditions.

<img src={useBaseUrl('img/cse/intro-admin-playbook-example.png')} alt="Playbook example" style={{border: '1px solid gray'}} width="800"/>

* A. **Condition**. Conditions, represented by a purple diamond, allow your playbook to branch in different directions based on an if-then statement.
* B. **Enrichment**. Green nodes are enrichments. These might add additional information from a threat intel database or convert data from one type to another.
* C. **Notification**. Blue nodes are notification actions, such as a Slack or email alert.

Action nodes use integrations. These integrations broadly fall into several types:
* **Enrichment**. Add information, metadata, or context, such as from a threat intelligence database.
* **Containment**. Reduces further damage by isolating files or machines related to a threat.
* **Notification**. Alerts sent via email, Slack, PagerDuty, or most other services you can connect with an API.
* **Custom**. Scripts and any other automations you can create using YAML, Perl, Python, PowerShell, or Bash.
* **Daemons**. Background processes that can ingest data. 

Custom actions can also include trigger actions, which run based on an event type until certain criteria are met. For example, if malware is detected, a trigger action could run an anti-malware cleanup software until no malware is detected. Similarly, you can create scheduled actions that run at certain intervals. For example, you could create a scheduled action that checks for malicious IP addresses every 5 minutes until no more malicious IP addresses are found.

#### Best practices

Before you begin creating or customizing a playbook, decide what you'd like to automate. Think about what conditions you want met, and what actions or integrations you want to accomplish based on different flows. Once you have a design in mind for the flow of your playbook, you can create or customize a new one. Search App Central to see if the automations you want already exist, or if you can modify a playbook that's similar to what you have in mind.

### Create a custom playbook

In this section, we'll create a simple playbook from scratch. This playbook will send an email with insight details.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu of Cloud SIEM select **Configuration**, and then under **Integrations** select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Automation**. 
1. On the **Automation** tab, click **Manage Playbooks**. This opens the [Automation Service UI](/docs/platform-services/automation-service/about-automation-service/#automation-service-ui).
1. Near the top, click the **+** icon to create a new playbook.
1. Configure the playbook:
    1. Give your playbook a name.
    1. From the **Type** dropdown, select **Cloud SIEM**.
    1. Write a short description. For example, "Email Notification with Insight Details"
    1. Click **Create**.
1. Click the Edit (pencil) icon near the bottom of the playbook.
1. Hover over the **Start** node, then click the pencil icon. 
1. Select **Insight** from the dropdown. This will populate the dialog with additional parameters from the insight input, which we can use in other places in the playbook.
1. Click **Update** to close the dialog window.
1. Click the plus icon on the **Start** node to add a new node.
1. Choose **Action** as the node type.
1. Configure the node with the following steps: 
    1. In **Node name** type "Email Notification".
    1. From the **Integration** dropdown select **Basic Tools**.
    1. From the **Type** dropdown, select **Notification**. 
    1. In the **Action** dropdown, select **Send Email**. 
    1. For **Recipients**, enter an email address. (If you enter your own email address, you'll be able to check the email results later.) After entering the email address, press Enter to accept it. More than one email address can be entered to the **Recipients** field.
    1. In the **Subject** field, type "Insight Details".
    1. In the **HTML Content (Body)** field, click the **{ }** button to create a placeholder field. Click in the red field and select **Playbook.input.name**. Create two more placeholders with the following fields: **Playbook.input.id** and **Playbook.input.status.displayName**. Add any additional text content or formatting as desired.
    1. Click **Create**.
1. Back on the playbook edit screen, drag the mouse cursor from the half-circle on the right side of the **Email Notification** action to the equivalent node connector on the **End** node.
1. Click the **Save** button at the bottom of the screen to save your playbook.
1. Click the **Publish** button at the bottom of the screen to publish your playbook and make it available for automations. You can add a description to your playbook in the **Publish** dialog window if you'd like. 

If the playbook is published successfully, you will see "Published version" in the upper right, instead of "Draft".

### Automations in Cloud SIEM

[Automations in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem) define the conditions in which a playbook will be executed for Cloud SIEM. For instance, you might want to execute a specific playbook whenever Cloud SIEM creates a new insight.  Or another playbook whenever an insight is closed to create and distribute appropriate notifications or reports. Automations can also be set to "manual execution", allowing operators to run the playbook on a specific insight when judged necessary.

This way, potentially the entire incident response cycle can now be automated: Cloud SIEM identifies a threat, creates an insight, then a playbook is automatically deployed to perform necessary actions and email a final report for an analyst to review.  
 
### Create a custom automation

In this section, you'll create a custom automation using the playbook you created in the previous lab. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu in Cloud SIEM select **Configuration**, and then under **Integrations** select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Automation**. You can also click the **Go To...** menu at the top of the screen and select **Automation**. 
1. In the upper right of the **Automation** tab, click **+ Add Automation**.
1. In **Playbook**, select your custom playbook created in the previous section [Create a custom playbook](#create-a-custom-playbook). (If you do not see your playbook in the list, return to the previous steps and ensure your playbook was published as well as saved.)
1. For the **Object (expects attributes for)** field, select **Insight**.
1. Note that the checkboxes under **Execution** field show that you can trigger your automation when an insight is created or closed. For this example, however, select **Manually Done**. 
1. Click **Save**.

#### Test your automation

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Insights** at the top of the Cloud SIEM screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**.
1. Select any insight from the list by clicking on its name.
1. Click on the **Actions** menu in the left sidebar. 
1. Select your automation from the **Insight Automations** list. (If you do not see your automation, you may need to leave and return to Cloud SIEM to refresh the list.)
1. You should see a green popup at the bottom indicating that your automation was executed successfully.
1. If your playbook included an email notification, and the recipient is your email address, your inbox should have an email from the Cloud SIEM system with the insight details.
1. While still on the insight details screen, click on the **Automations** tab on the top of the screen to see the results of executing your automation. This view will show the status of the automations run on that insight, such as "Running", "Success" or "Completed with errors". 1. 
1. If errors occur, you can click the **View Playbook** link on the right side to see the Playbook view, along with any execution errors that occurred. For help, see [Troubleshoot playbooks](/docs/platform-services/automation-service/automation-service-playbooks/#troubleshoot-playbooks).

You now have a custom automation that can be manually run or attached to an insight upton creation or closing.