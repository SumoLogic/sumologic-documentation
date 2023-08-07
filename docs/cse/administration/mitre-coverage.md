---
id: mitre-coverage
title: MITRE Coverage
sidebar_label: MITRE Coverage
description: MITRE Coverage shows the adversary tactics, techniques, and procedures covered by rules based on your data sources.  
keywords:
  - MITRE ATT&CK
  - tactics
  - techniques
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The MITRE Coverage page shows the [MITRE ATT&CK](https://attack.mitre.org/) adversary tactics, techniques, and procedures (TTP) from the [Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/) that are covered by rules in your system. Not only can you filter on specific techniques to see how well you are covered for each, but you can filter on vendors and products that provide your data sources so you can see the coverage they give you. Adding or removing products from the list allows you to evaluate the effectiveness of your data sources.

To determine your coverage, MITRE Coverage collects data from rules that have fired in the last 180 days. 

## MITRE Coverage page

To open the MITRE Coverage page, select **Content > MITRE Coverage**.

<img src={useBaseUrl('img/cse/mitre-coverage-page.png')} alt="MITRE Coverage page" width="900"/>

1. **Theoretical Coverage**. Shows coverage for your organization if all Sumo Logic content were enabled and all possible data sources were connected. If this is selected, the **Vendor/Product** filter is disabled.
1. **Recent Activity**. Shows coverage for your organization based on Signals received over the last 180 days. 
1. **All Community Activity**. Shows coverage for all customers that use Cloud SIEM based on Signals received over the last 180 days. (Customer data is anonymized.) Comparing this coverage to **Recent Activty** can help you determine what coverage you're missing compared to other customers using Cloud SIEM.
1. **Export**. Export the filtered coverage to a JSON file. The file is in the format used by MITRE, and can be used with other exported files of MITRE data to aggregate and analyze MITRE coverage data. The file includes a score from 0 to 3 for each technique. The higher the score, the better coverage you have: 0=None (10 or fewer rules), 1=Low (11-13 rules), 2=Medium (14-16 rules), 3=High (17 or more rules). 
1. [**MITRE TTP**](#mitre-ttp-filter). Click to filter on MITRE tactics, techniques, and sub-techniques. 
1. [**Vendor/Product**](#vendorproduct-filter). Click to filter on vendors and products that provide data sources. Select particular vendors to help you evaluate their coverage. 
1. **Coverage**. Click to filter on coverage provided:
   * High (17 or more rules) 
   * Medium (14-16 rules)
   * Low (11-13 rules)
   * None (10 or fewer rules)
   * Not detectable (no rules found)
1. Filter text in the tiles:
   * **Show Rule Count**. Shows the number of rules covering the technique.
   * **Show Technique ID**. Shows the technique ID. 
   * **Show Technique Name**. Shows the name of the technique.
   * **Show Filtered**. Shows only techniques that are filtered.
1. **Total Coverage**. Estimated coverage for all techniques in the MITRE Enterprise Matrix. Note that it is impossible to get 100% coverage, because some techniques are undetectable by their very nature.  
1. **Technique Coverage**. The number of techniques covered.
1. **Sub-Technique Coverage**. The number of sub-techniques covered.
1. **Coverage Type**. Key to the colors indicating coverage:
   * High (17 or more rules) 
   * Medium (14-16 rules)
   * Low (11-13 rules)
   * None (10 or fewer rules)
   * Not detectable (no rules found)
   * Filter not applied
1. **Matrix**. The techniques from the [MITRE Enterprise matrix](https://attack.mitre.org/matrices/enterprise/). When you click a square, a panel appears with [details](#technique-details) showing your coverage for that technique.

## Technique details

When you click a square in the matrix, details about coverage for that MITRE technique display in a panel. The description displayed is pulled directly from the MITRE Enterprise matrix. The panel includes an assessment of your coverage (**None**, **Low**, **Medium**, and **High**). A coverage of **None** does not mean you have no coverage; it only means you might not have enough rules to adequately cover the technique.

Click **Rules** at the bottom of the panel to see a list of all the rules that contribute to coverage for the technique. Click a rule in the list to open the rule. 

<img src={useBaseUrl('img/cse/mitre-details.png')} alt="MITRE TTP filter" width="300"/>

## MITRE TTP filter

Use the **MITRE TTP** filter to search for specific MITRE tactics, techniques, and sub-techniques. Used in combination with the **Product/Vendor** filter, you can see exactly which data sources provide coverage for specific TTPs. 

<img src={useBaseUrl('img/cse/mitre-ttp-filter.png')} alt="MITRE TTP filter" width="300"/>

## Vendor/Product filter

Use the **Vendor/Product** filter to search for data sources in your environment to see how well they provide coverage. Filtering on specific products and vendors helps you determine which provide the best coverage. Add or remove items from the list to see how different combinations provide coverage for the specific techniques you are most concerned about.

This filter is only enabled if you first select **Recent Activity** or **All Community Activity**.  

<img src={useBaseUrl('img/cse/mitre-vendor-product-filter.png')} alt="MITRE vendor/product filter" width="300"/>
