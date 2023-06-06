---
id: proofpoint-tap
title: Proofpoint TAP
sidebar_label: Proofpoint TAP
description: The Sumo Logic app for Proofpoint TAP provides comprehensive visibility and analysis of messages and clicks of malicious URLs to improve your security posture.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/>

The Sumo Logic app for Proofpoint Targeted Attack Protection App (TAP) provides comprehensive visibility and analysis of messages and clicks of malicious URLs. Proofpoint TAP is a cybersecurity solution offered by Proofpoint, a leading cybersecurity company. By leveraging advanced technologies and threat intelligence, Proofpoint TAP helps organizations detect and mitigate sophisticated threats, reducing the risk of successful cyberattacks.

Key features of the Proofpoint TAP app include:

- **Message Protection**. Employs sophisticated email analysis techniques to identify malicious emails, such as those containing malware, ransomware, or phishing attempts.
- **URL Defense**. Analyzes URLs in real-time to identify malicious websites or links used for phishing or spreading malware. This app blocks access to these URLs, protecting you from potential threats.
- **Attachment Defense**. Examines email attachments for potential threats, including infected files or documents containing macros that can execute malicious code.
- **Real-Time Monitoring**. Gain real-time visibility into messages and clicks across your organization's infrastructure. Monitor and analyze messages, clicks, and suspicious activities to detect and respond to potential threats.
- **Interactive Dashboards**. Explore interactive dashboards that provide a holistic view of messages, clicks, and threat intelligence. Visualize data with pre-built charts, graphs, and tables to understand the trends, patterns, and anomalies.

## Log types

This app uses [Proofpoint TAP source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-tap-source/) to collect messages and and retrieves SIEM events through the [SIEM API](https://help.proofpoint.com/Threat_Insight_Dashboard/API_Documentation/SIEM_API).

## Sample log messages

```json title="Sample Message Event"
 {
  "GUID": "qop94nlsUdvm1BsHU_8jdPXWYH0ZCndT",
  "QID": "3qk94m8jy1-1",
  "ccAddresses": [],
  "cluster": "proofpointdemo_cloudadminuidemo_hosted",
  "completelyRewritten": false,
  "fromAddress": [
    "consumerrewards@antifungalcare.email"
  ],
  "headerFrom": "\"Rewards\" <ConsumerRewards@antifungalcare.email>",
  "headerReplyTo": "\"Milwaukee Power Drill\" <OrderPending@antifungalcare.email>",
  "id": "f15d1286-a736-70c0-b7bd-488778aa6126",
  "impostorScore": 0,
  "malwareScore": 0,
  "messageID": "<9emjdh453u14qszz-cd8hly6ja0ihqlc6-16359-4ee24@antifungalcare.email>",
  "messageParts": [
    {
      "contentType": "text/plain",
      "disposition": "inline",
      "filename": "text.txt",
      "md5": "4ab56b435fe89cbc2322eb059cd700d4",
      "oContentType": "text/plain",
      "sandboxStatus": null,
      "sha256": "91795b99f8787aef7b9e97c2222b489b09daf7240c5c1deae4780e63ba441e07"
    },
    {
      "contentType": "text/html",
      "disposition": "inline",
      "filename": "text.html",
      "md5": "3affc08df13319272e5b37a533490181",
      "oContentType": "text/html",
      "sandboxStatus": null,
      "sha256": "980d2c4a156752b2add1d75e1265d6c19f00b98cb61238ae8e0ca5fd89ffe8a1"
    }
  ],
  "messageSize": 9318,
  "messageTime": "2023-05-15T04:34:07.000Z",
  "modulesRun": [
    "av",
    "dkimv",
    "spf",
    "spam",
    "dmarc",
    "urldefense",
    "pdr"
  ],
  "phishScore": 0,
  "policyRoutes": [
    "default_inbound"
  ],
  "quarantineFolder": "Definite Spam",
  "quarantineRule": "spam_definite",
  "recipient": "george@vogon.science",
  "replyToAddress": [
    "5e425c09e2aef2679375eb821f4df750@antifungalcare.email>"
  ],
  "sender": "64426-90969-323108-14183-george=louisiana-internet.net@mail.antifungalcare.email",
  "senderIP": "208.86.203.10",
  "spamScore": 100,
  "subject": "Milwaukee Power Drill Exclusive Rewards For You",
  "threatsInfoMap": [
    {
      "campaignID": null,
      "classification": "phish",
      "threat": "antifungalcare.email",
      "threatID": "bb56ef875eca4953661752b06304c42f1c5daa45eefbd63656cda94239b83027",
      "threatStatus": "active",
      "threatTime": "2023-05-24T08:46:08.000Z",
      "threatType": "url",
      "threatUrl": "https://threatinsight.proofpoint.com/e65934ff-e650-9cbe-56b5-e9cf2cc5ac2e/threat/email/bb56ef875eca4953661752b06304c42f1c5daa45eefbd63656cda94239b83027"
    }
  ],
  "toAddresses": [
    "george@vogon.science"
  ],
  "type": "MESSAGE_BLOCKED",
  "xmailer": null
}
```
```json title="Sample Clicks Log"
{
  "GUID": "6Qpm37_BE3mFckkZEAZtUSrA8t9FyQSm",
  "campaignID": "3qsaakgeb2-1",
  "id": "92c0be29-ee47-72fe-c885-72e0472976d3",
  "messageID": "<3c0ggzqkr2t0hrjz-pwpijod1k4y4x8hk-16359-4f09c@antifungalcare.email>",
  "clickTime": "2023-05-24T08:46:40.000Z",
  "recipient": "kunani@vogon.science",
  "sender": "kunani=grgig.net@mail.antifungalcare.email",
  "senderIP": "208.86.203.10",
  "clickIP": "208.86.203.10",
  "threatStatus": "active",
  "classification": "   ",
  "threatID": "bb56ef875e7",
  "threatTime": "2023-05-24T08:46:08.000Z",
  "url": "antifungalcare.email",
  "userAgent": "Chrome",
  "type": "CLICKS_PERMITTED",
  "threatUrl": "https://threatinsight.proofpoint.com/e659ac2e/threat/email/bb56ef875eca495366175"
}
```

## Sample Queries

```sql title="Sample Message Events Query (Number of Messages)"
_sourceCategory="milan_proofpoint_tap" ("MESSAGE_BLOCKED" OR "MESSAGE_DELIVERED")
| json "id","type","cluster","sender","recipient","messageParts[*].disposition","messageParts[*].sandboxStatus","messageSize","modulesRun","policyRoutes","senderIP","threatsInfoMap[*].classification","threatsInfoMap[*].threatType","threatsInfoMap[*].threatStatus","impostorScore","malwareScore","phishScore","spamScore","quarantineFolder","quarantineRule","subject" as id,type,cluster,sender,recipient,dispositions,sandboxStatuses,messageSize,modules_run,policy_route,sender_ip,threat_categories,threat_types,threat_status,impostor_score,malware_score,phish_score,spam_score,quarantine_folder,quarantine_rule,subject nodrop
| extract field=threat_status "\"?(?<status>[\w\s\-&.,]*)\"?[,\n\]]" multi
| extract field=threat_types "\"?(?<threat_type>[\w\s\-&.,]*)\"?[,\n\]]" multi
| extract field=threat_categories "\"?(?<threat_category>[\w\s\-&.,]*)\"?[,\n\]]" multi
| extract field=modules_run "\"?(?<module>[\w\s\-&.,]*)\"?[,\n\]]" multi
| extract field=policy_route "\"?(?<policy>[\w\s\-&.,]*)\"?[,\n\]]" multi
| where type matches "{{message_type}}"
| where threat_category matches "{{threat_category}}"
| where threat_type matches "{{threat_type}}"
| where status matches "{{threat_status}}"
| where module matches "{{module}}"
| where policy matches "{{policy_route}}"
| count_distinct(id)
```

```sql title="Sample Click Events Query (Number of Clicks)"
_sourceCategory="milan_proofpoint_tap" ("CLICK_PERMITTED" or "CLICK_BLOCKED")
| json "id","type","threatUrl","classification","clickIP","senderIP","sender","recipient","threatStatus" as id,type,threat_url,category,click_ip,sender_ip,sender,recipient,threat_status nodrop
| where type matches "{{click_type}}"
| where category matches "{{threat_category}}"
| where threat_status matches "{{threat_status}}"
| count_distinct(id)
```

## Set up collection

To set up [Cloud to Cloud Integration Proofpoint TAP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-tap-source/) for the Proofpoint TAP app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Proofpoint TAP source category, which you will need to use when installing the app. By following these steps, you can ensure that your Proofpoint TAP app is properly integrated and configured to collect and analyze your Proofpoint TAP data.

## Installing the Proofpoint TAP app​

This section provides instructions on how to install the Proofpoint TAP app, as well as examples of each of the dashboards. The app pre-configured searches and dashboards provide easy-to-access visual insights into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Proofpoint TAP Dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Messages Overview

The **Proofpoint TAP - Messages Overview** dashboard provides real-time analysis of delivered and blocked messages, showing trends and the most active Proofpoint protection clusters. It displays the geographic locations of senders from high-risk countries with the distribution of threats by type, category, and status. The dashboard also provides information on message disposition and sandbox status, highlights the key PPS (Proofpoint Protection Server) modules and policy routes involved in message processing, and presents details about the top senders and receivers. Additionally, it offers a summary of recent messages, giving a quick overview of email activity and any noteworthy events.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TAP-Messages-Overview.png')} alt="Proofpoint-TAP-Messages-Overview"/>

### Clicks Overview

The **Proofpoint TAP - Clicks Overview** dashboard offers real-time analysis of malicious URLs, providing insights into the trends of the click events. It presents the distribution of threats based on their categories and statuses. Furthermore, the dashboard displays the geographic locations of malicious URL clicks originating from high-risk countries and details about the top senders and receivers of the malicious URLs. Additionally, the dashboard offers a summary of recent click events, delivering a concise overview of the malicious URL click activity and highlighting any significant events that may require attention.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-TAP-Clicks-Overview.png')} alt="Proofpoint-TAP-Clicks-Overview"/>
