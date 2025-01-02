---
title: Improved Data Handling for Window and Threshold-Based SLOs (Observability)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - slo
  - observability
hide_table_of_contents: true  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-service/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

We are happy to introduce a new update for handling missing data in window and threshold-based Service Level Objectives (SLOs). Previously, any window without data was treated as successful, and the threshold condition check was skipped. With this update, for windows without data, the threshold will be compared against **zero** to determine their success or failure.

This change simplifies expressing SLOs where missing data signifies unsuccessful windows. For example, consider an SLO definition where absence of heartbeat log messages signifies an unsuccessful window. Previously, such windows were treated as successful by default. With this update, modeling such cases will become much easier and more accurate.
