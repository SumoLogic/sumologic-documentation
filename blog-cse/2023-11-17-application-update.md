---
title: November 17, 2023 - Application Update
keywords:
  - cloud siem
  - markdown
  - links
  - rule description
  - runbook
  - entity groups
  - api
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Links in Rule Description Field

Often, organizations will document standard procedures or runbooks to follow when investigating or responding to certain types of security events. To help analysts more easily access these documents, the description fields in Rules now support standard markdown syntax for links (only). Since the description is included in any resulting Signals, analysts can easily click the link to open the documentation in a new tab/window. 

For example, you could put the following in a Rule description field: `Follow [these steps](http://somedomain.com/runbook1234.html) to investigate.` Then, when a Signal was generated from that Rule, it would include that text as a clickable link, like this:

<img src={useBaseUrl('img/release-notes/cse/markdown-rule-description.jpg')} alt="Example of using markdown syntax to add links to a Rule description"/>

### Minor Changes and Enhancements

* [Update] Wildcards can now be used in the `Value` field for Entity Groups. For example, you can specify `*OU=TCH,OU=PAR,OU=EUR*`. 
* [Update] Second-level unnormalized inventory attributes (like `fields.foo.bar`) can now be used in the `Inventory Key` field for Entity Groups.
* [Update] Playbooks in the Automation Service no longer have to be of type `CSE`; all published playbooks will be available for use in Automations.
* [New] A new API endpoint has been added that supports enabling or disabling Log Mappings, `PUT /log-mappings/{id}/enabled`.
* [New] A new API endpoint has been added to support customers with large numbers of Entities. `GET /entities/all` uses a "cursor" to page through a complete list of Entities. 
* [Deprecated] The legacy (JASK) feature for forwarding Signal data to a Sumo Logic index has been deprecated. Signal data is automatically forwarded to the `sec_signal` index.
* [Update] The UI has been updated to reflect recent product name changes. Cloud SIEM Enterprise is now Cloud SIEM, and Continuous Intelligence Platform is now Log Analytics Platform. URLs and API endpoints have not been changed.

### Bug Fixes

* Users were unable to define rules with names that had been previously used (but deleted).
* Links from the legend for the new **Insights by Status** panel on the HUD were not enabled properly.