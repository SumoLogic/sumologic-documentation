---
title: April 28, 2023 (Dashboards)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - dashboards new
  - dashboard migration
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We're excited to announce the release of several new features in the **Dashboards (New)**:

- **Sankey Chart**. Our new **Sankey diagram** feature, which you can find under the **Categorical** panel type, is built using the `fromstate` and `tostate` fields in your query. The Sankey diagram helps you understand the flow of the log events within a distributed system. The width of an arrow or stripe in the Sankey diagram shows the proportion of a quantity.
- **Missile Map**. Our new **Missile Map** feature, which you can find under the **Map** panel type, provides visibility into the geographic origins of threats and their target points. By hovering over each line, you can find the threat name, latitude/longitude details of threat origin, and latitude/longitude details of threat target point.
- **Box Plot Charts**. Our new **Box Plot Charts** feature, which you can find under the **Time Series** and **Categorical** panel type, graphically depicts groups of data using quartiles and is built by including `_min`, `_pct_25`, `_pct_50`, `_pct_75`, and `_max` in your query. 