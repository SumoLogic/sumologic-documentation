---
title: Metrics Monitors Window Update
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

We've enhanced the metric monitoring window to ensure more accurate alerts. A new configurable parameter has been added to specify the minimum number of data points required to trigger and resolve an alert when all match the threshold `at all times within`. The default setting will change from 1 to 2 data points, and you have the flexibility to configure it based on your use cases. This update will help you provide more reliable alerts and reduce false positive alerts caused by intermittent or incomplete data. We encourage you to review your alert settings to ensure they meet your needs. [Learn more](https://help.sumologic.com/docs/alerts/monitors/create-monitor/#metrics-trigger-types).
