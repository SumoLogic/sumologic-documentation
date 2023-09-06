---
title: Metrics Monitors Enhancements (Metrics)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - monitors
  - alerts
  - recovery
  - false positive alerts
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

Update - We've enhanced the alerting logic for Metrics Monitors to ensure more accurate alerts. For monitors that alert when all data points are above a given threshold `at all times within`, we've added a customizable parameter for the minimum number of required data points within an alerting window. And, for any existing monitor, the default setting is 2, which means that two data points are required within an alerting window to generate an alert. [Learn more](/docs/alerts/monitors/create-monitor/#alert-and-recovery-window).
