---
title: Improved Data Handling for Window and Threshold-Based SLOs (Observability)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - slo
  - observability
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We are happy to introduce a new update for handling missing data in window and threshold-based Service Level Objectives (SLOs). Previously, any window without data was treated as a successful window and the threshold condition check was skipped. With this update, for window without data the threshold will be compared against **zero** to determine whether they are successful or not. Below are some of the key advantages of this change:

* **Enhanced Accuracy**. Treating missing data as zero prevents incorrect assumptions about data quality, leading to more reliable SLO evaluations.
* **Consistency**. Ensures uniformity in data treatment across different intervals, improving the overall consistency of SLO calculations.

