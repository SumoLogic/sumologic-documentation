---
title: October 2, 2023 - Application Update
keywords:
  - cloud siem
  - mitre att&ck
  - mitre attack
  - threat coverage explorer
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### MITRE ATT&amp;CK&reg; Threat Coverage Explorer

We are excited to announce a new feature in Cloud SIEM Enterprise (CSE), the MITRE ATT&amp;CK&reg; Threat Coverage Explorer. This interactive tool gives you the ability to see how Rules, Signals, and log sources map to adversary actions using the [MITRE ATT&amp;CK&reg; Matrix for Enterprise](https://attack.mitre.org/).

<img src={useBaseUrl('img/release-notes/cse/Mitre-Explorer.png')} alt="MITRE ATT&amp;CK&reg; Threat Coverage Explorer"/>

The MITRE Explorer can be used to identify gaps in coverage and understand the impact of specific log sources and Rules to the overall threat coverage and value of CSE.

The tool can be accessed in the Content Menu. It supports three different views:
* Recent Activity - Your environment's actual coverage (Rules that generated Signals) over the past six months
* All Community Activity - All CSE customers' anonymized and aggregated coverage over the past six months.
* Theoretical Coverage - Potential coverage if all rules are enabled and all log sources are connected.

The MITRE Explorer uses the built-in MITRE tactic, technique, and sub-technique tags to track coverage, so if custom Rules are tagged appropriately, they will also be included. 

Clicking on a technique will open a detailed view which describes the technique (and any included sub-techniques) and lists the Rules and Signals that match. 

The view is filterable by tactic, technique, and sub-technique, as well as log source and coverage level. There are multiple view options so the display can be customized, and the data can be exported in MITRE's JSON format so it can be combined with data from other tools to view your total coverage. There is also an API to retrieve coverage data and the JSON content. 

For more details on how to use the MITRE Explorer, check out the [online documentation](/docs/cse/administration/mitre-coverage/).

### Minor Changes and Enhancements

* [New] When viewing Insight details, users can now select multiple Signals and remove them from the Insight with a single click.
* [New] When viewing Entity inventory data, unnormalized fields with millisecond-based timestamps are now automatically converted to human-readable format when possible.
* [New] Tag schemas and context actions can now be managed via Terraform. See the API documentation for details.

### Bug Fixes

* The ability to add items to a Match List via Terraform was not working properly.
* Timestamps on the Entity Timeline were using different time zones.
* A UI error was preventing users from overriding some fields on First Seen and Outlier Rules.