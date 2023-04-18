---
title: April 13, 2023 - Application Update
keywords:
  - cloud siem
  - entity timeline
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Minor Changes and Enhancements

* [New] When logs fail to parse or map, a detailed error message will be logged in the `sec_record_failure` index, in the `fields.reason` attribute. 
* [New] Where possible, private domains are now [automatically enriched](/docs/cse/schema/record-processing-pipeline/#enrich-records-with-ip-address-url-and-domain-info) by CSE during record processing. 
* [Updated] Insight comments can now contain up to 1024 characters (up from 256).
* [New] On the list of Rule Tuning Expressions, each Tuning Expression now lists the number of Rules to which it is currently applied.
* [New] For First Seen Rules, the UI will display the baseline model status (i.e., building, with amount of progress, or complete). (Note it will only display the status on Rules that were created or updated after this feature became available.)

### Bug Fixes

* In some cases, inventory data from an AWS EC2 source was not being displayed in CSE properly.
* For Yara-based signals with file attachments, users were unable to download the file.
* Occasionally, some related Entities were not visible in the Insight Related Entities graph but were included correctly on the list.
* Entity suppression state was being reported incorrectly on several screens.
* The `Manage Entity Groups` permission was required to view Entity Groups. Now only `View Entity Groups` is required.
* Links to the CSE API no longer require a trailing slash.
