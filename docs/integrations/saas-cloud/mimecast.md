---
id: mimecast
title: Mimecast
sidebar_label: Mimecast
description: The Sumo Logic app for Mimecast enables you to monitor and analyz Mimecast email data to identify potential threats and improve email security posture.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/mimecast-logo.png')} alt="icon" width="50"/>

The Sumo Logic app for Mimecast enables you to leverage advanced security monitoring and analytics capabilities for Mimecast data. Mimecast is a cloud-based cybersecurity platform that ensures email security, continuity, and archiving. Our app is a powerful tool for monitoring and analyzing Mimecast email data, helping you to identify potential threats and improve your email security posture.

Key features of the Mimecast app include:
- **Email Traffic Monitoring**: Monitor message traffic for both delivered and received emails with a detailed overview of each stage.
- **Threat Detection Monitoring**: Monitor logs regarding messages with malicious attachments, user activity, and threat detection within the orgaization users.
- **Data Loss Monitoring**: Monitor data loss resulting from breaches and malicious attacks.

## Log types

The app uses Mimecast Source to collect [SIEM](https://integrations.mimecast.com/documentation/tutorials/understanding-siem-logs/) and [DLP](https://integrations.mimecast.com/documentation/endpoint-reference/logs-and-statistics/get-dlp-logs/) logs from Mimecast platform.

## Sample log message

<details><summary>View Sample Log Message</summary>

```json title="SIEM Log"
{
  "datetime": "2023-04-28T07:20:21+0000",
  "acc": "C0A0",
  "aCode": "7O7I7MvGjghgfhh",
  "IP": "89.189.94.111",
  "Dir": "Internal",
  "MsgId": "<messageId@messageId>",
  "Subject": "message subject",
  "headerFrom": "from@mimecast.com",
  "Sender": "from@mimecast.com",
  "Rcpt": "auser@mimecast.com",
  "SpamInfo": "[]",
  "Act": "Acc",
  "TlsVer": "TLSv1",
  "Cphr": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
  "SpamProcessingDetail": {
    "spf": {
      "info": "SPF_FAIL",
      "allow": true
    },
    "dkim": {
      "info": "DKIM_UNKNOWN",
      "allow": true
    }
  },
  "SpamScore": "1"
}
```
```json title="DLP Log"
{
  "senderAddress": "john@google.com",
  "action": "block",
  "eventTime": "2023-04-28T08:30:14+0000",
  "messageId": "13",
  "policy": "data loss outage",
  "route": "outbound",
  "subject": "Change in strategy",
  "recipientAddress": "sam@mimecast.com"
}
```
</details>

## Sample Query

<details><summary>View Sample Queries</summary>

```sql title="Messages Delivered Without TLS"
_sourceCategory="mimecast_app" Delivered Dir
| json "aCode","Delivered","UseTls" as a_code, delivered, use_tls nodrop
| where delivered="true"
| where use_tls="No"
| count_distinct(a_code)
```

```sql title="DLP Events Over Time"
_sourceCategory="mimecast_app" messageId policy action
| json "messageId","policy","action","route","recipientAddress","senderAddress" as message_id, policy, action, route, recipient, sender nodrop
| timeslice 1d
| count_distinct(message_id) as frequency by _timeslice
| fillmissing timeslice
```
</details>

## Set up collection

Follow the instructions for setting up [Cloud-to-Cloud Integration for Mimecast](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mimecast-source/) source and use the same source category while installing the app.

## Installing the Mimecast app​

This section has instructions for installing the Mimecast app for Sumo Logic and descriptions of each of the dashboards.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **Mimecast** app using the steps described in the [Mimecast Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mimecast-source/). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.
The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing Mimecast dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Overview

The **Mimecast - Overview** dashboard provides a comprehensive view of the message logs and related Data Loss Prevention(DLP) policies. This dashboard provides insight into the total number of messages delivered and messages delivered and received without TLS. Additionally, this dashboard enables monitoring of messages that triggered DLP policies over time, the top 10 DLP policies, and a summary of recent messages that triggered DLP.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Mimecast-Overview.png')} alt="Mimecast-Overview" />

### Email Activity Summary

The **Mimecast - Email Activity Summary** dashboard provides a comprehensive view of the message traffic for both incoming and outgoing messages. This dashboard provides insight into the geographic locations of senders and recipients, rejection types for messages, received message status, delivered message direction, and a summary of both message types. Additionally, this dashboard displays information on the most frequently used ciphers, domains that are not using TLS, and reasons for messages being on hold.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Mimecast-Email-Activity-Summary.png')} alt="Mimecast-Email-Activity-Summary"/>

### Target Threat Protection

The **Mimecast - Target Threat Protection** dashboard provides a comprehensive view of the threat protection logs resulting from any malicious activity. This dashboard provides a summary of the recent attachment threats detected, recent activity on malicious URLs, and recent blocked emails. Additionally, this dashboard provides insight into the top 10 recipients and senders of malicious attachment messages and the top 10 malicious senders and targeted recipients.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Mimecast-Target-Threat-Protection.png')} alt="Mimecast-Target-Threat-Protection" width="750"/>
