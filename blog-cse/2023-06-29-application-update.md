---
title: June 29, 2023 - Application Update
keywords:
  - cloud siem
  - rbac
  - related entities graph
  - detection time
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New RBAC Capabilities

Starting **Thursday, July 6**, we're introducing new RBAC capabilities for Cloud SIEM Enterprise (CSE): *View Entities* and *Manage Entities*. Users with the built-in administrator role will receive these capabilities automatically, but **admins must manually add these capabilities** to other roles as appropriate. If a user does not have either role, they will not be able to see Entity details or interact with/manage Entities in any way.

### Minor Changes and Enhancements

* [New] Nodes can now be moved around individually on the Insight Related Entities Graph.
* [Update] To align more closely with accepted industry definitions, we are changing the *Dwell Time* label on Insight metrics in the UI to *Detection Time*. Note that only the label is changing, not now the metric is calculated (i.e. the period of time between when the first record in an Insight was observed and when the Insight was created).
* [Update] Match list update containing more than 1000 entries are now supported by our Terraform provider.
* [Update] When a custom product or vendor is selected in log mapping, the string entered by the user is now indexed instead of the word "Custom", so that the custom entry can be searchable/filterable. This only applies to mappings configured going forward.
* [New] Custom tag schemas can now be retrieved via API (`GET /tag-schemas`). 
* [New] When viewing Rule Tuning Expressions, if one applies to all rules, it will now say `All` instead of giving a numerical count.
* [Update] The CSE UI color palette has been updated to more closely align with the standard Sumo Logic "dark mode" color palette. 

### Bug Fixes

* Insight sub-resolutions were not being passed to XSOAR correctly in some circumstances.
* Some users were unable to override fields on some Sumo-provided rules.
* When extrating fields in rule expressions, double quotes were not working (`{{fields["<field_name>"]}}`).
