---
id: knowbe4
title: Sumo Logic App for KnowBe4
sidebar_label: KnowBe4
description: The Sumo Logic App for KnowBe4 offers functionality for monitoring and analyzing KnowBe4 Phishing Security logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/knowbe4.png')} alt="icon" width="100" />

The KnowBe4 App for Sumo Logic allows you to easily integrate data from KnowBe4, a security awareness training and simulated phishing platform, into your Sumo Logic account. This App provides an overview of your organization's phishing security testing performance. It includes metrics on the total number of tests, active tests, recipient users, failed recipient users, and distribution of status.

The distribution of **Phishing Security Tests** by difficulty and long-running **Phishing Security Tests** panels offer insights into the difficulty level of the phishing tests and identify tests that have been running for an extended period. The app's **Phish Prone Percentage** dashboard panel helps you understand the percentage of users who are at higher risk of falling for a phishing attack.

The **Geo Location of Failed Users** dashboard panel provides geographic insights into where failed users are located. The **Phishing Security Tests Summary** and **Phish Failures Summary** dashboard panels provide high-level summaries of the organization's testing performance. Finally, the **Top Failed Users** panel identifies users who have failed multiple tests and may require additional training.

## Log Types

The Sumo Logic App for KnowBe4 consumes Phishing Security logs. Refer to the [KnowBe4 Phishing Security Tests](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests/get) and [Recipient Results](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1{pst_id}~1recipients/get) documentation.

## Sample Log Messages

```json title="Sample Phishing Security Tests Log"
{
  "campaign_id": 1892087,
  "pst_id": 8805725,
  "status": "Closed",
  "name": "Mar2023_NA_SUMOs",
  "groups": [
    {
      "group_id": 3552357,
      "name": "Monthly Campaign - NA"
    }
  ],
  "phish_prone_percentage": 0.277,
  "started_at": "2023-03-06T17:13:27.000Z",
  "duration": 7,
  "categories": [
    {
      "category_id": 5013,
      "name": "My Templates"
    }
  ],
  "template": {
    "id": 4813400,
    "name": "Google Calendar",
    "difficulty": 5,
    "type": "USER"
  },
  "landing_page": {
    "id": 183506,
    "name": "Sumo Landing Page"
  },
  "scheduled_count": 625,
  "delivered_count": 625,
  "opened_count": 328,
  "clicked_count": 171,
  "replied_count": 2,
  "attachment_open_count": 0,
  "macro_enabled_count": 0,
  "data_entered_count": 0,
  "qr_code_scanned_count": 0,
  "reported_count": 0,
  "bounced_count": 0
}
```

```json title="Sample Recipient Results Log"
{
  "recipient_id": 1498372653,
  "pst_id": 8805725,
  "user": {
    "id": 81394383,
    "provisioning_guid": "usr-63f633eb290af6f38a075108",
    "first_name": "Beata",
    "last_name": "Franzone",
    "email": "bfranzone@sumologic.com"
  },
  "template": {
    "id": 4813400,
    "name": "Google Calendar",
    "difficulty": 5,
    "type": "USER"
  },
  "scheduled_at": "2023-03-06T17:14:33.000Z",
  "delivered_at": "2023-03-06T17:15:04.000Z",
  "opened_at": "2023-03-06T20:35:41.000Z",
  "clicked_at": "2023-03-06T20:35:41.000Z",
  "replied_at": null,
  "attachment_opened_at": null,
  "macro_enabled_at": null,
  "data_entered_at": null,
  "qr_code_scanned": null,
  "reported_at": null,
  "bounced_at": null,
  "ip": "68.55.88.203",
  "ip_location": "Rochester Hills, MI",
  "browser": "Chrome",
  "browser_version": "110",
  "os": "mac"
}
```


## Sample Queries

```sql title="Total Phishing Security Tests"
_sourceCategory="knowbe4nfr" campaign_id
| json "campaign_id", "pst_id", "status", "name", "phish_prone_percentage", "started_at", "duration", "template.name", "template.difficulty", "scheduled_count", "delivered_count", "opened_count", "clicked_count", "replied_count", "attachment_open_count", "macro_enabled_count", "data_entered_count", "qr_code_scanned_count", "reported_count", "bounced_count" as campaign_id, pst_id, status, name, phish_prone_percentage, started_at, duration, template_name, template_difficulty, scheduled_count, delivered_count, opened_count, clicked_count, replied_count, attachment_open_count, macro_enabled_count, data_entered_count, qr_code_scanned_count, reported_count, bounced_count nodrop
| first(status) as status group by pst_id, name
| where status matches "{{status}}"
| count_distinct(pst_id)
```


```sql title="Total Recipient User"
_sourceCategory="knowbe4nfr" recipient_id
| json "recipient_id", "pst_id", "user.first_name", "user.last_name", "user.email", "scheduled_at", "delivered_at", "opened_at", "clicked_at", "replied_at", "attachment_opened_at", "macro_enabled_at", "data_entered_at", "qr_code_scanned", "reported_at", "bounced_at", "ip", "ip_location", "browser", "browser_version", "os" as recipient_id, pst_id, first_name, last_name,
email, scheduled_at, delivered_at, opened_at, clicked_at, replied_at, attachment_opened_at, macro_enabled_at, data_entered_at, qr_code_scanned, reported_at, bounced_at, ip, ip_location, browser, browser_version, os nodrop
| where ip_location matches "{{user_location}}"
| count_distinct(recipient_id)
```

## Installing the KnowBe4 App

Before you begin, collect logs from KnowBe4 and ingest them into Sumo Logic. Refer to the [KnowBe4 Cloud-to-Cloud Integration](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/knowbe4-api-source/) to create the source and use the same source category while installing the app.

{@import ../../reuse/apps/app-install.md}

## Viewing KnowBe4 Dashboards​

All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### KnowBe4 - Overview

**KnowBe4 - Overview** provides an overview of phishing security tests. It provides insights into the test results, including the total number of tests, active tests, and recipient users. Additionally, the dashboard displays the distribution of test status, the level of difficulty of the tests, and the phish-prone percentage. The dashboard also includes a summary of the phishing security tests and failures, as well as the top failed users and their geo-locations. These insights can help organizations identify areas that require further attention and improve their overall security posture against phishing attacks.

<img src={useBaseUrl('img/integrations/saas-cloud/KnowBe4-Overview.png')} alt="KnowBe4-Overview.png" width="600"/>
