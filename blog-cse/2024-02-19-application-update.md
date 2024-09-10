---
title: February 19, 2024 - Application Update
keywords:
  - cloud siem
image: https://help.sumologic.com/img/sumo-square.png  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-cse/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>


### Minor changes and enhancements

* [New] Continuing our work to better align the Cloud SIEM UI pages with Log Analytics UI pages to improve usability and provide a consistent user experience, the color palette has been adjusted slightly, some page decoration has been removed or altered, and some controls have been updated.
* [New] On the Entity list page, you can now filter by reputation indicator (i.e. Malicious, Suspicious or NotFlagged).
* [New] Users can now navigate directly from the Entity Activity panel on the HUD to the Entity List page, with the proper filter pre-applied.
* [Updated] The `Object Type` attribute has been added back to the Signal summary section, next to the timestamp, so that it is visible whether the Signal details are expanded or collapsed.
* [New] A user-editable **Description** field has been added to Rule Tuning Expressions.

### Bug fixes

* Sorting by value was not working properly on the Entities list page.
* Sometimes, if the target value was left blank (default), domain normalization would append a colon to the resulting value.
* Customers were experiencing rate limiting with VirusTotal due to a change to their API and constant retries due to resultant errors in Cloud SIEM. This has been resolved, as has an issue with enrichments for file hashes.
* Some Entities were not showing as being included in Entity Groups properly (even though attributes had been set correctly).
* The MITRE ATT&CK<super>&reg;</super> `stage` attribute was missing from some Signals in the audit logs.
* Custom inventory sources were not included in the appropriate dropdown in Entity Group configuration.
* On the Entity Details page, if the only Signals that existed were in Prototype mode, they would not be visible.
* The reputation indicator on the Entity Details page was being rendered, then hidden.
