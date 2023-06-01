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

Our new **Data Access Level** feature enables you to control the data that your users can see in the shared dashboard and this is governed by the user's role search filter. Role search filter affect the data that the users can see based on how you configure the data access level.

Here are some of the key features that this feature offers:

- Newly created dashboards run with the `Viewer's` role search filter with whom the dashboard is shared. 
- Template variable substitutions will be quoted if it contains any non-alphanumeric characters, to prevent the viewer from performing subqueries or widening the scope of a query.

Check out our technical documentation [here](docs/dashboards-new/set-data-access-level) to learn more about data access level.
