---
title: Dashboard Time Range Enhancements (Dashboards)
hide_table_of_contents: true
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - dashboard
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We are excited to announce a new set of changes that enhance the time range management capabilities within dashboards and dashboard panels. With these updates, you'll have more control over time ranges, making it easier to investigate specific periods of interest. Here's what's included in this update:


- **Dashboard-Level Time Range Override**:
When setting a dashboard-level time range the new time range will now be temporarily applied to all panels displayed on the dashboard. The updated dashboard time range is applied only for the current viewer of the dashboard unless saved as the new dashboard default.  


- **Panel-Level Time Range Override**:
We've introduced the ability for users to temporarily override panel-level time ranges, allowing you to customize the time range for individual panels without changing the time range for other viewers of the dashboard. The updated panel time range is applied only for the current viewer of the dashboard unless saved as the new panel default. 


- **Time Range Inheritance on Adding Panels**:
When adding a panel to an existing dashboard from the logs search page, you now have the flexibility to specify whether the new panel inherits the time selection of the query as configured or if it inherits the dashboard-level time range. This gives you more control over how time ranges are applied to the new panel.

We believe these enhancements will improve your dashboard experience, giving you better control over time ranges and enhancing your ability to analyze data effectively. Please see our help documentation [here](/docs/dashboards/set-custom-time-ranges) to learn more about setting time ranges within dashboards and panels. 
