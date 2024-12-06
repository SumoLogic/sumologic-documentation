---
id: introduction-to-cloud-siem-for-administrators
title: Introduction to Cloud SIEM for Administrators
sidebar_label: Introduction for Administrators
description: Learn basic concepts about Cloud SIEM for administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Build your SOC

### The Cloud SIEM data pipeline

Cloud SIEM is a cloud-based, enterprise-grade security information and event management (SIEM) system. Cloud SIEM leverages Sumo Logic's core functionality, including data collection, ingestion, storage, and threat intelligence. 

This is Sumo Logic's Cloud SIEM home page. 

<img src={useBaseUrl('img/cse/cloud-siem-hud.png')} alt="Cloud SIEM main page" style={{border: '1px solid gray'}} width="800"/>

* A. **Count**. A count of the Records created from incoming messages, and the Signals and Insights that have been generated.
* B. **Insights by Status**. An overview of recent Insights and their statuses: New, In Progress, Closed, or Other.
* C. **Radar**. Visualizes the last 24 hours of security activity. Dark blue lines represent Records, light blue bars represent Signals, and red triangles represent Insights.
* D. **Recent Activity**. Displays a feed of the latest Insights that have been generated.

Sumo Logic collects and ingests millions of your company's log messages. However, you may choose to send only a portion of these to Cloud SIEM. Cloud SIEM takes these messages and parses, maps, and enriches them into Records. These records are compared to Rules and, if there's a match, Entities are extracted from them and Cloud SIEM uses that information to create Signals. These Signals and Entities are correlated, and used in security detection use cases. Then, if a certain severity threshold is crossed, they become an Insight. Some of these Insights have actions available right in the Cloud SIEM platform, like alerting your SOC teammates.

<img src={useBaseUrl('img/cse/intro-data-flow.png')} alt="Cloud SIEM data flow"  width="800"/>

As a Cloud SIEM administrator, it's your job to make sure that this pipeline flows smoothly. In this section, you'll learn how to partition your data in Sumo Logic, forward it to Cloud SIEM, customize the schema mappings, and tune the SOC content to support the analysts on your SOC team. All these customizations and optimizations will help reduce false positives and enable your SOC analyst teammates to investigate and hunt threats faster.

### Ingest the right data

The first part of the security data pipeline is collection and ingestion in Sumo Logic.

<img src={useBaseUrl('img/cse/intro-ingest-the-right-data.png')} alt="First part of the data pipeline"  width="500"/>

These messages are then forwarded to Cloud SIEM. It’s a good idea to periodically examine the data you’re ingesting and sending to Cloud SIEM. Ask yourself these questions:

* **Are you ingesting enough data?** Cloud SIEM takes thousands or millions of records and boils them down into just a handful of Insights. Most organizations ingest more than 50GB of data every day to start finding any Insights. If your ingest volume is smaller than this, consider sending more data to Cloud SIEM or using other security solutions like the [Threat Intel Quick Analysis app](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/).
* **Are you ingesting too much data?** More data doesn’t always mean more Insights. The threat detection logic built into Cloud SIEM generally prevents false positives. However, some organizations choose to ingest or store less data as a way to cut costs. One solution is partitioning your data into different tiers, and only sending some of that data along to Cloud SIEM. 
* **Are you ingesting the right data?** Cloud SIEM doesn’t just work on quantity alone. Quality data will affect your performance as well. As a best practice, you’ll need to bring in quality data sources that are supported by Cloud SIEM. High-value data sources include [CloudTrail logs](/docs/integrations/cloud-security-monitoring-analytics/aws-cloudtrail/), [Windows event logs](/docs/send-data/installed-collectors/sources/collect-forwarded-events-windows-event-collector/), [AWS logs](/docs/integrations/amazon-aws/), and [GuardDuty logs](/docs/integrations/amazon-aws/guardduty/). You should also consider whether your data is structured, like key-value pairs, or unstructured, like plain text files. Most data ingested into Sumo Logic is semi-structured, like JSON logs.

Once you’ve answered these questions, you can assess what is and isn’t working for you and your SOC team. You can then partition your data in Sumo Logic and forward some or all of it to Cloud SIEM.

#### Extra resources

* All data must be ingested into Sumo Logic before it can be forwarded to Cloud SIEM. See [Cloud SIEM Ingestion](/docs/cse/ingestion/) to learn more details about data ingestion, setting up collectors, partitioning your data, and designing good metadata. 
* If you only want to forward some, but not all of your data to Cloud SIEM you can use data tiers and partitions. For more information, see [Partitions](/docs/manage/partitions/).

### Which UI should I use?

As a Cloud SIEM admin, you’ll use both the Sumo Logic UI and the Cloud SIEM UI. Even if you’re primarily focused on Cloud SIEM, you need to be comfortable using both interfaces.

| Sumo Logic UI | Cloud SIEM UI |
| :-- | :-- |
| <ul><li>Add collectors and data sources.</li><li>Write field extraction rues.</li><li>Configure partitions and data tiers</li><li>Forward data to Cloud SIEM.</li><li>Configure RBAC controls.</li></ul> | <ul><li>Configure log and ingest mappings.</li><li>Create custom content, such as rules, match lists, and insights.</li><li>Customize actions, context actions, and other workflows.</li></ul>|

In the Sumo Logic UI, you’ll add the collectors and data sources that will be used in Cloud SIEM. You can write field extraction rules, which help parse your logs so they can be better used as records in Cloud SIEM. You can also configure partitions and data tiers in Sumo Logic, and decide which data gets forwarded to Cloud SIEM. Finally, you configure users and roles for both Sumo Logic and Cloud SIEM using the Sumo Logic interface. 

In the Cloud SIEM UI, you’ll configure the log and ingest mappings that turn your log messages into records. You can also create custom content to help with threat investigations like rules, match lists, and Insights. Finally, you can customize what the actions, context actions, and workflows do in the Cloud SIEM interface, using APIs and other playbooks.

## Configure and enable Cloud SIEM

### Get your data into Cloud SIEM

After you’ve decided what data to ingest (or not ingest), you can work on forwarding that data to Cloud SIEM.

When you enable data forwarding, Cloud SIEM automatically starts processing your log messages into Records. Each Record contains the information from a message, which is parsed into key-value pairs, mapped to a Cloud SIEM schema, and enriched with other data.

<img src={useBaseUrl('img/cse/intro-forward-data.gif')} alt="Forward data"  width="500"/>

As an admin, there are several steps you must complete to forward data to Cloud SIEM. 
1. First, you request backend configuration. This is a one-time setup for each Sumo Logic organization. Often, your Sumo account rep will complete this process for you. 
1. Next, you enable data forwarding. You can do this by adding the `_siemForward = True` field when you set up a collector. For cloud data sources, you can also toggle the **Forward to SIEM** checkbox. You’ll need to enable data forwarding each time you add a new data source into Sumo Logic, update your partitions, or make other changes to your data ingestion process.

    Cloud SIEM will not ingest historic data. In other words, any new data ingested into Sumo Logic will be forwarded to Cloud SIEM as soon as you enable data forwarding. However, older data will not be processed by Cloud SIEM. Data will start flowing from Sumo Logic into Cloud SIEM within a few minutes of enabling data forwarding. You can expect Signals and Insights to start generating within a few hours.
1. Finally, you’ll configure the log and ingest mappings. This process is usually automatic, but must be completed for certain types of custom data sources.

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
* For the best Signals and Insights with the fewest false positives in Cloud SIEM, you need to ingest high-quality data. You can ensure your data is high quality by making sure your data and metadata are clean and organized from the moment you first ingest them into Sumo Logic. One way to do this is by writing good field extraction rules. See [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

### Enable data forwarding for an HTTP source

In this section, we’ll show you how to create a new source using a pre-configured collector and enable data forwarding to Cloud SIEM by selecting the **Forward to SIEM** checkbox. Once the new source is configured with data forwarding, you'll be able to send data to it and observe the data flow.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Locate a hosted collector whose data you want to forward to Cloud SIEM.
1. Click **Add Source**.
1. Click **HTTP Logs & Metrics**.
1. Enter a name and source category.
1. Select the **Forward to SIEM** checkbox.
1. Leave other fields as their defaults and click **Save**. 
1. A popup will appear with a URL. Copy the URL and keep it somewhere safe, like a Notes or TextEdit file. We’ll use it in the next section.  

#### Tips and tricks

* Read [Best Practices for Data Collection](/docs/send-data/best-practices/).
* If you need to find the HTTP source URL address again, click the **Show URL** link next to your source.

### Send a log message to Cloud SIEM

In this section, we’ll send a simple JSON log message to the HTTP source we created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source). Then, we’ll look for that log message in Cloud SIEM. This will verify that we configured our source correctly, and demonstrate how quickly Cloud SIEM can ingest data.

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

    This simple JSON log message, `{"ip": "192.0.2.0", "threatName": "trainingRS"}`, will be collected and ingested by Sumo Logic as soon as you press Enter. If data forwarding was enabled properly in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source), it’s also forwarded to Cloud SIEM where it’s parsed, mapped, and enriched. This process can take anywhere from a few seconds to up to 15 minutes. 

1. When you’re ready, we’ll find your log message as a record in Cloud SIEM.
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Records** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Records**. You can also click the **Go To...** menu at the top of the screen and select **Records**. 
    1. In the **Filters** bar, select **Metadata Source Category** from the dropdown.
    1. Select the **is** operator from the dropdown.
    1. Type the source category you used in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    1. You should see a failed record. This record failed because the custom JSON log message does not have a log or ingest mapping associated with it. Although the log message was forwarded from Sumo Logic to Cloud SIEM, it did not successfully complete the parse, map, and enrich steps of the pipeline. We'll fix this in the next sections.

#### Tips and tricks

* If you get an error after running the CURL command in step 2, make sure your quotes are straight. Copy and pasting the command sometimes changes the formatting of these quote marks into curly quotes.
* If you don’t see any records, try:
    * increasing the timestamp range to the last 60 minutes or the last 3 hours.
    * making sure the metadata source category you searched in the **Filters** bar matches the one you created earlier.
    * searching for the log in Sumo Logic with this query: `_index=sec_record_* metadata_sourceCategory=<source-category> ` Replaced `source-category` with the source category you created. 
* If you still don’t see your custom JSON record after these troubleshooting steps, try sending another log message from your terminal window. Make sure the command completes without any errors.

### Logs into records

<img src={useBaseUrl('img/cse/intro-logs-into-records.png')} alt="Logs into records"  width="500"/>

Now that you have a source set up to send data Sumo Logic into Cloud SIEM, let’s follow a simple log message down that data pipeline.

```
sso : ip-192-0-2-0 : alex@travellogic.com : "Successful Login" : “2024-05-25T22:11:42"
```

First, the message is parsed into a set of key-value pairs. This process also fixes basic formatting. This step creates semi-structured data. For example, instead of ip-127-0-0-1, the parsing step extracts the IP address into a key-value pair, where the key is something like `srcDeviceIP` and the value is `192.0.2.0`, with the hyphens normalized to dots. Then, this information is mapped onto the [Cloud SIEM schema](/docs/cse/schema/). Finally, the record is enriched with information from match lists or threat intelligence databases.

These normalized records are then sent down the Cloud SIEM pipeline and compared to rules. When Cloud SIEM extracts an entity from a record to create a signal, it uses the parsed and mapped key-value pairs to categorize each signal. When signals with the same entity cluster together, an insight is created. Therefore, it’s important for the records to have quality metadata from the start to produce the best insights.

You can make sure these records are parsed, mapped, and enriched properly by maintaining good metadata design and setting up good log and ingest mappings, which we'll practice in the next sections.

### Set up an ingest mapping

In [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem), we sent a log message to Cloud SIEM, and received a "failed record" error. In this section and the next one, we’ll create ingest and log mappings to ensure the custom JSON data from the log messages we send are used properly by Cloud SIEM.

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

In this section, we’ll create a log mapping to ensure the custom ingest mapping we created in [Set up an ingest mapping](#set-up-an-ingest-mapping) is used properly by Cloud SIEM.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.
1. Click **Add Log Mapping**. 
1. Click **Structured Mapping**. In Cloud SIEM, JSON data is considered to be structured data. 
1. Give your log mapping a name.
1. Under **If Input Matches**, use the vendor and product you created in [Set up an ingest mapping](#set-up-an-ingest-mapping). 
1. Select **JSON** as the format.
1. Type `.*` for the regex. This will match all incoming logs.
1. Under **Then Create Record**, the vendor and product should match what you entered under **If Input Matches**.
1. In **Fields**, enter the fields from the JSON log message we sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem) under **Input Field**. Then, under **Output Field**, map them to their equivalents in the Cloud SIEM chema. Then, click **Add Field**. Refer to this table for help:
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

Your new log and ingest mappings won't apply to the first log message you sent in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem). In this section, we’ll send another log message to the HTTP source we created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source). Then, we’ll look for that new log message in Cloud SIEM. This time, the log and ingest mappings we created in [Set up an ingest mapping](#set-up-an-ingest-mapping) and [Set up a log mapping](#set-up-a-log-mapping) should apply to the new record.

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

     :::tip
     Since you already sent a CURL command in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem), you may be able to press the up arrow key and Enter to send the command again in most CLI programs.
     :::

     This simple JSON log message, `{"ip": "192.0.2.0", "threatName": "<attacker name>"}`, will be collected and ingested by Sumo Logic as soon as you press Enter. If data forwarding was enabled properly in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source), it’s also forwarded to Cloud SIEM where it’s parsed, mapped, and enriched. This process can take anywhere from a few seconds to up to 15 minutes. 

1. When you’re ready, we’ll find your log message as a record in Cloud SIEM.
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Click **Records** at the top of the screen. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Records**. You can also click the **Go To...** menu at the top of the screen and select **Records**. 
    1. In the **Filters** bar, select **Metadata Source Category** from the dropdown.
    1. Select the **is** operator from the dropdown.
    1. Type the source category you used in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    1. You should see a record with the IP address and threat name parsed properly.

Although the log message and method of ingestion was identical, the log message failed to parse into a Cloud SIEM record in [Send a log message to Cloud SIEM](#send-a-log-message-to-cloud-siem) because the log and ingest mappings weren’t configured. After we configured the log and ingest mappings, the new log messages forwarded to Cloud SIEM successfully completed the parse, map, and enrich steps to become a record.

#### Tips and tricks

* If you get an error after running the CURL command, make sure your quotes are straight. Copy and pasting the command sometimes changes the formatting of these quote marks into curly quotes.
* If you don't see any records, try: 
    * increasing the timestamp range to the last 60 minutes or the last 3 hours.
    * making sure the metadata source category you searched in the **Filters** bar matches the one you created in [Enable data forwarding for an HTTP source](#enable-data-forwarding-for-an-http-source).
    * searching for the log in Sumo Logic with this query: `_index=sec_record_* metadata_sourceCategory=<source-category> ` Replace `<source-category>` with the source category you created earlier. 
* If you still don’t see your custom JSON record after these troubleshooting steps, try sending another log message from your terminal window. Make sure the command completes without any errors. 
* If your new record failed too (you see two failed records), either your log or ingest mapping weren't configured correctly. Review those configurations and try again.

