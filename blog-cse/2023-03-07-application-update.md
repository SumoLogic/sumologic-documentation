---
title: March 7, 2023 Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - service release notes
  - cloud siem
  - cse
tags: [cloud siem release notes, application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Entity Relationship Graph

We are excited to announce the new Entity Relationship Graph. With this feature, you can now see a graphical visualization of all related Entities in an Insight, as well as additional relationships beyond the Insight. This enables you to more quickly understand relationships among Entities and the larger context behind a potential security threat.

:::note
This feature is available to all customers but is currently in **Beta**. If you encounter any issues with this feature, report them to Sumo Logic Support. We appreciate your feedback.
:::

The Entity Relationship Graph (and the Related Entities list) displays all Entities involved in the Insight (those referred to in a record in a Signal in the Insight) as well as additional Entity relationships (for example, if CSE detects an IP address may also have had a specific hostname at the time the Insight was generated). 

However, unlike the Related Entities list, the graph can visualize additional Entity relationships that existed outside of the Insight during a specified time frame. 

Both the list and this new graph are available on the **Entities** tab of the Insight details page:

<img src={useBaseUrl('img/release-notes/cse/entity-rel-graph.jpg')} alt="The Entity Relationship Graph UI"/>

You can toggle between the list view and the graph view using the control in the upper-right corner of the main panel.

Each node in the graph represents a single Entity. The graph also displays the relationship types and any Indicators. Hovering over an Entity will highlight it and all of its relationships to other Entities, and when an Entity is selected, details about the Entity are displayed on the right. 

The graph also includes a number of controls for zoom, full screen mode, filtering by Entity type, and adjusting the time frame for relationship detection. 

For more information about how to use the Entity Relationship Graph, see the [online documentation](https://help.sumologic.com/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#about-the-entities-tab-graph-view). You will also see an introduction to the feature the first time you visit an Insight details page.

### Minor Changes and Enhancements

* [New] First Seen Rules now support the use of non-normalized record fields.
* [New] When a file is attached to a Signal, it is now available via API (previously it would only be available if part of a Yara Signal or Threat Intel match). The endpoint is `/api/v1/extracted-file?filename=`
* [Update] The default time frame on the Entity Timeline is now 3 days instead of 24 hours.
* [Update] The http v2 Insight Action payload now includes a numeric severity value (1-4) in addition to the human-readable severity name (LOW, MEDIUM, HIGH, CRITICAL).
* [Update] On the new Active Entities panel on the HUD, if the Entity is a Username, you can now navigate directly to that Entity’s Timeline by hovering over the Entity name and clicking the link.

### Bug Fixes

* In some cases, CSE was unable to properly extract the user name from an AWS ARN.
* A recent change caused checkboxes to malfunction in Firefox.
* On the Entity Timeline record details, the timestamp wasn’t displaying properly.
