---
id: mitre-coverage
title: MITRE Coverage
sidebar_label: MITRE Coverage
description: MITRE Coverage shows the adversary tactics and techniques covered by rules based on your data sources.  
keywords:
  - MITRE ATT&CK
  - tactics
  - techniques
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The MITRE Coverage page shows the [MITRE ATT&CK](https://attack.mitre.org/) adversary tactics and techniques from the [Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/) that are covered by rules in your system, based on your data sources. Not only can you filter on specific tactics and techniques to see how well you are covered for each, but you can filter on vendors and products that provide data sources so you can see the coverage they provide. This will allow you to evaluate the value of your data sources by adding or removing products from the list and seeing the impact those changes will have on coverage of attackers’ tactics and techniques.

To determine your coverage, MITRE Coverage collects data from rules that have fired in the last 180 days. 

## MITRE Coverage page

To open the MITRE Coverage page, select **Content > MITRE Coverage**.

<img src={useBaseUrl('img/cse/mitre-coverage-page.png')} alt="MITRE Coverage page" width="800"/>

1. [**MITRE TTP**](#mitre-ttp-filter). Click to filter on MITRE tactics, techniques, and procedures. 
1. [**Vendor/Product**](#productvendor-filter). Click to filter on vendors and products that provide data sources. 
1. **Export JSON**. Export the filtered coverage to a JSON file. The file includes a score from 0 to 3 for each tactic/technique. The higher the score, the better coverage you have: 0=None (10 or fewer rules), 1=Low (11-13 rules), 2=Medium (14-16 rules), 3=High (17 or more rules). 
1. **Tactics and Techniques matrix**. The tactics and techniques from the MITRE Enterprise matrix. Click a square to see the coverage you have for that tactic/technique. A panel appears showing [details of the coverage](#mitre-details).
1. **All Rules & Data Sources**. Displays coverage for all rules and data sources in your environment. If this is selected, the **Vendor/Product** filter is disabled.
1. **Org History**. Shows coverage for your organization. 
1. **Crowdsourced History**. Shows coverage for a range of organizations in the Sumo Logic cloud. <!-- That description is a guess. I'm not really sure what this is. -->
1. **Coverage**. Shows a summary of your coverage.
     * **Total Coverage**. Estimated coverage for all tactics/techniques in the MITRE Enterprise Matrix. 
     * **Technique Coverage**. The number of techniques covered.
     * **Sub-Technique Coverage**. The number of sub-techniques covered.
     * **Coverage Type**. Key to the coverage:
         * High (17 or more rules) 
         * Medium (14-16 rules)
         * Low (11-13 rules)
         * None (10 or fewer rules)
         * Not detectable (no rules found)

## MITRE details

When you click a square in the tactics/techniques matrix, details about coverage for that tactic/technique display in a panel. The panel has a full description of the tactic/technique, with an assessment of your coverage (**None**, **Low**, **Medium**, and **High**). A coverage of **None** does not mean you have no coverage; it only means you might not have enough rules to adequately cover the tactic/technique.

Click **Rules** at the bottom of the panel to get links to all the rules that contribute to coverage for the tactic/technique.  

<img src={useBaseUrl('img/cse/mitre-details.png')} alt="MITRE TTP filter" width="300"/>

## MITRE TTP filter

Use the **MITRE TTP** filter to search for specific MITRE tactics, techniques, and procedures. Used in combination with the **Product/Vendor** filter, you can see exactly which data sources provide coverage for specific TTPs. 

<img src={useBaseUrl('img/cse/mitre-ttp-filter.png')} alt="MITRE TTP filter" width="300"/>

## Product/vendor filter

Use the **Product/Vendor** filter to search for data sources in your environment to see how well they provide coverage. Filtering on specific products and vendors helps you determine which provide the best coverage. Add or remove items from the list to see how different combinations provide coverage for the specific tactics and techniques you are most concerned about.

This filter is only enabled if you first select **Org History** or **Crowdsourced History**.  

<img src={useBaseUrl('img/cse/mitre-vendor-product-filter.png')} alt="MITRE vendor/product filter" width="300"/>

