---
title: March 22, 2024 - Application Update
keywords:
  - cloud siem
  - MITRE
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-cse/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>


### Minor changes and enhancements

* Two enhancements have been implemented for the MITRE ATT&amp;CK&reg; Threat Coverage Explorer:
  * The current tactic, technique and sub-technique metrics for the (default) Theoretical and Historical views are now written to the `sumologic_system_events` audit logs daily. This data can be used in dashboards to track coverage and events over time.
  * It is now possible, using the `/mitre-attack/json` endpoint, to extract the MITRE Explorer-formatted JSON via API. (This works the same as the **Export** button in the UI.)
* On the Insight details page, on the Entities tab, the default view is now the Graph view instead of the List view.
* Threat reputation icons/labels are now visible in a number of additional places throughout the UI. These can be set via enrichment.

### Bug fixes

* In some cases, events that are supposed to occur automatically after an Insight is opened were not executing, or were severely delayed.
* If an Insight comment included a long URL, text wrapping was not behaving correctly and some text was being clipped from view. Also, newline characters were not always being honored properly in comments.
