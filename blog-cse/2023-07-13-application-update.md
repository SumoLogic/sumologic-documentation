---
title: July 13, 2023 - Application Update
keywords:
  - cloud siem
  - rbac
  - entity timeline
  - entities
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New RBAC Capabilities

Reminder: Earlier this week, we introduced new RBAC capabilities for Cloud SIEM Enterprise (CSE): *View Entities* and *Manage Entities*. Users with the built-in administrator role received these capabilities automatically, but **admins must manually add these capabilities** to other roles as appropriate. If a user does not have either role, they will not be able to see Entity details or interact with or manage Entities in any way.

### Minor Changes and Enhancements

* [Update] The Entity Timeline feature is now available for all Entity types, including custom types.
* [New] When viewing an Entity's detail page, both Entity Groups that apply to that Entity and membership in a suppression list will now be listed.

### Bug Fixes

* Some customers were seeing non-blocking errors loading Insight detail pages, and links to Cloud SOAR, when they should not have. 
* The number of records ingested into CSE was not being reported consistently on the HUD.