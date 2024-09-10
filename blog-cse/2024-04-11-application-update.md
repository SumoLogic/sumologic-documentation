---
title: April 11, 2024 - Application Update
keywords:
  - cloud siem
  - mitre
  - light mode
  - dark mode
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-cse/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>


### MITRE ATT&amp;CK&reg; Coverage Enhancements

We're excited to announce multiple enhancements to our MITRE ATT&amp;CK Threat Coverage Explorer.

* **Rules Filtering** - You can now easily filter the coverage visualization based on rules, including out-of-the-box and user-created rules, as well as enabled, disabled, production and prototype rules.
* **All Community Activity** - This view now defaults to show only the vendor and product logs that are being sent to Cloud SIEM from your data sources. This gives you a better comparison between what your theoretical and historical coverage shows and what other customers of Cloud SIEM using those same log sources are seeing. You can still change the filter to display other (or all) log sources.
* **Customizable Colors** - You can now customize the tile colors to your own scheme. <br/><img src={useBaseUrl('img/release-notes/cse/mitre-attack-explorer-custom-colors.jpg')} alt="Custom MITRE ATT&amp;CK Explorer Color Palette"/>

For full details, see the [MITRE ATT&amp;CK Coverage documentation](/docs/cse/administration/mitre-coverage/).

### New UI Themes for Cloud SIEM

We are also excited to announce that Cloud SIEM now supports two different UI themes: the default "dark" theme, and a new "light" theme:

<img src={useBaseUrl('img/release-notes/cse/csiem-light-dark-theme.jpg')} alt="Light and Dark theme examples in Cloud SIEM"/>

The theme is set per user, and can be changed on the Sumo Logic user preferences page:

<img src={useBaseUrl('img/release-notes/cse/theme-setting.png')} alt="Option to change UI theme"/>

Note that the setting currently only affects Cloud SIEM and the Automation Service, but in the future this setting will also affect other pages in the Sumo Logic UI.

### Bug fixes

* Terraform no longer times out while waiting for match lists to be updated.
