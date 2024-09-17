---
title: Deprecation Notice - Real-Time Scheduled Searches (Alerts)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - alerts
  - monitors
  - scheduled search
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-service/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

As part of our ongoing evaluation of the Sumo Logic service, we have decided to deprecate [Real-Time Scheduled Searches](/docs/alerts/scheduled-searches/create-real-time-alert). In particular, we will remove the option to create new Real-Time Scheduled Searches on May 15, 2024. Existing Real-Time Scheduled Searches will continue to function until May 15, 2025. We believe many use cases for Real-Time Scheduled Searches can be met by [Monitors](/docs/alerts/monitors/overview). Any remaining use cases can be met by executing these searches at 15m intervals.

In 2020, Sumo Logic released Monitors, which provided a new framework to trigger alerts on both metrics and log data in real time and send notifications. Real-Time Scheduled Searches provided a much more limited version of this functionality. Monitors will continue to be the focus area for our Product and Engineering Teams for features and enhancements regarding alerting.

Learn more [here](/docs/alerts/scheduled-searches/deprecation).
