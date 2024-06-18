---
title: SLO - Treat Absent Data for Window and Threshold Based SLOs (Observability)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - slo
  - observability
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We are happy to introduce a new update for handling missing data in window and threshold-based Service Level Objectives (SLOs). Previously, any absent data in an interval was assumed to be in the `goodCnt` category. With this update, missing data will now be treated as **zero**, ensuring a more precise determination of the data category after setting the parameter value. Below are some of the key advantages of this change:

* **Enhanced Accuracy**. Treating missing data as zero prevents incorrect assumptions about data quality, leading to more reliable SLO evaluations.
* **Consistency**. Ensures uniformity in data treatment across different intervals, improving the overall consistency of SLO calculations.