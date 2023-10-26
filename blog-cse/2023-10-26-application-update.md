---
title: October 26, 2023 - Application Update
keywords:
  - cloud siem
  - custom insight status
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Enhanced Support for Custom Insight Statuses

Sumo Logic is pleased to announce two enhancements to Cloud SIEM related to custom Insight statuses.

First, the In Progress status can now be disabled (not deleted). Many customers create multiple statuses that all represent an "In Progress" state so this option can help reduce confusion in those cases.

Second, while Cloud SIEM has long supported custom Insight statuses, Insights in any custom status have been reported together (as one group on the HUD or using the same color in other instances). To improve this experience, custom statuses can now be assigned a unique color:

<img src={useBaseUrl('img/release-notes/cse/custom-insight-status-colors.png')} alt="Custom Insight Status Color Palette"/>

This color will be used wherever an Insight is displayed with that status (such as in the Insight list and board views). For existing custom statuses, the color will remain white (as it has been) until the configuration is changed.

The HUD has been updated as well; for example, the Insights by Status widget has been updated to properly display each status instead of grouping custom statuses together:

<img src={useBaseUrl('img/release-notes/cse/custom-insight-status-widget.png')} alt="Updated HUD Widget for Custom Insight Statuses"/>

A corresponding attribute (`color`) has also been added to the custom status API.

### Minor Changes and Enhancements

* [New] Searches in Cloud SIEM (from the top menu bar) are now case-insensitive. 
* [New] Custom match list columns now support unnormalized attributes (like `fields.foo`)
* [New] The records search page in Cloud SIEM now includes a link to view the equivalent search in the Log Analytics Platform log search page.
* [Updated] When a comment is added to an Insight by an Action from the Automation Service, it will be attributed to a system user called "Automation Service".

### Bug Fixes

* The Insight data forwarded to the Automation Service did not include the full set of attributes for attached Signals.
* Some hostnames in CrowdStrike FDR inventory sources were not getting normalized properly.
* Entity Groups were being applied to the wrong Entity types.
* Duplicate audit log entries for Insights were being created. (Note that while this has been resolved, the duplicate entries have not been removed from customer audit logs.)
* When entering closing an Insight, users can enter comments and the UI will suggest content based on comment history. These suggestions were broken and have been reset.
* When configuring Entity Groups, the UI was not allowing users to specify unnormalized inventory attributes (like `fields.foo`).