---
title: Data Access Level (Dashboards)
hide_table_of_contents: true
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - dashboard
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

Our new **Data Access Level** feature enables you to control the data that your users see in the shared dashboard, which is governed by the user's role search filter. Based on how you configure the data access level, the role search filter affects the data that users can see.

Here are some of the key features that this feature offers:

- Newly created dashboards run with the `Viewer's` role search filter with whom the dashboard is shared. 
- Template variable substitutions will be quoted if they contain any non-alphanumeric characters to prevent the viewer from performing subqueries or widening the scope of a query.

Check out our technical documentation [here](/docs/dashboards/set-data-access-level) to learn more about data access level.
