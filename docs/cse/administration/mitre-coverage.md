---
id: mitre-coverage
title: MITRE ATT&CK Coverage
sidebar_label: MITRE ATT&CK Coverage
description: MITRE ATT&CK Coverage shows the adversary tactics, techniques, and procedures covered by rules based on your data sources.  
keywords:
  - MITRE ATT&CK
  - tactics
  - techniques
---

import useBaseUrl from '@docusaurus/useBaseUrl';

import Iframe from 'react-iframe';

The MITRE ATT&CK Coverage page shows the [MITRE ATT&CK](https://attack.mitre.org/) adversary tactics, techniques, and procedures (TTP) from the [Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/) that are covered by rules in your system. Not only can you filter on specific techniques to see how well you are covered for each, but you can filter on vendors and products that provide your data sources so you can see the coverage they give you. Adding or removing products from the list allows you to evaluate the effectiveness of your data sources.

To determine your coverage, MITRE ATT&CK Coverage collects data from rules that have fired in the last 180 days. 

:::note
To view the MITRE ATT&CK Coverage page, you must be assigned the [**View Rules** role capability](/docs/manage/users-roles/roles/role-capabilities/#cloud-siem-enterprise). 
:::

Watch this micro lesson to learn about MITRE ATT&CK Coverage.

<Iframe url="https://www.youtube.com/embed/O1SmpbL4gos?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

## MITRE ATT&CK Coverage page

To open the MITRE ATT&CK Coverage page, select **Content > MITRE ATT&CK Coverage**.

<img src={useBaseUrl('img/cse/mitre-coverage-page.png')} alt="MITRE Coverage page" width="900"/>

1. **Recent Activity**. Shows coverage for your organization based on Signals received over the last 180 days. 
1. **All Community Activity**. Shows coverage for all customers that use the same Cloud SIEM sources as you based on all Signals received by all instances over the last 180 days. (Customer data is anonymized.) Comparing this coverage to **Recent Activity** can help you determine what other potential techniques are covered by your data sources, but not evidenced yet in your environment.
1. **Theoretical Coverage**. Shows coverage for your organization if all data ingest worked perfectly and all enabled rules generated at least one Signal. This view can help you determine what custom rules would be most valuable to implement. If this is selected, the **Vendor/Product** filter is disabled.
1. **Export**. Export the filtered coverage to a JSON file. The file is in the format used by MITRE, and can be used with other exported files of MITRE data to aggregate and analyze MITRE ATT&CK coverage data. The file includes a score from 0 to 3 for each technique. The higher the score, the better coverage you have: 0=None (10 or fewer rules), 1=Low (11-13 rules), 2=Medium (14-16 rules), 3=High (17 or more rules). 
1. [**MITRE TTP**](#mitre-ttp-filter). Click to filter on MITRE tactics, techniques, and sub-techniques. 
1. [**Vendor/Product**](#vendorproduct-filter). Click to filter on vendors and products that provide data sources. Select particular vendors to help you evaluate their coverage. 
1. **Coverage**. Click to filter on coverage provided:
   * High (7 or more rules) 
   * Medium (4-6 rules)
   * Low (1-3 rules)
   * None (no rules)
   * Not detectable (by a SIEM)
1. Filter text in the tiles:
   * **Show Rule Count**. Shows the number of rules covering the technique.
   * **Show Technique ID**. Shows the technique ID. 
   * **Show Technique Name**. Shows the name of the technique.
   * **Show Filtered**. Shows only techniques that are filtered.
1. **Technique Coverage**. The number of techniques covered. Note that it is impossible to get 100% coverage, because some techniques are undetectable by their very nature.
1. **Sub-Technique Coverage**. The number of sub-techniques covered.
1. **Coverage Type**. Key to the colors indicating coverage:
   * High (7 or more rules) 
   * Medium (4-6 rules)
   * Low (1-3 rules)
   * None (no rules)
   * Not detectable (by a SIEM)
   * Filter not applied
1. **Matrix**. The techniques from the [MITRE Enterprise matrix](https://attack.mitre.org/matrices/enterprise/). When you click a square, a panel appears with [details](#technique-details) showing your coverage for that technique.

## Technique details

When you click a square in the matrix, details about coverage for that MITRE technique display in a panel. The description displayed is pulled directly from the MITRE Enterprise matrix. The panel includes an assessment of your coverage (**None**, **Low**, **Medium**, and **High**). A coverage of **None** does not mean you have no coverage; it only means you might not have enough rules to adequately cover the technique.

Click **View Generated Signals** to see the current Signals in Cloud SIEM that have been tagged with that MITRE technique. 

Click **Sub-Techniques** to see the sub-techniques for that technique. 

Click **Rules** at the bottom of the panel to see a list of all the rules that contribute to coverage for the technique. Click a rule in the list to open the rule. 

<img src={useBaseUrl('img/cse/mitre-details.png')} alt="MITRE TTP filter" width="300"/>

## MITRE TTP filter

Use the **MITRE TTP** filter to search for specific MITRE tactics, techniques, and sub-techniques. Used in combination with the **Product/Vendor** filter, you can see exactly which data sources provide coverage for specific TTPs. 

<img src={useBaseUrl('img/cse/mitre-ttp-filter.png')} alt="MITRE TTP filter" width="300"/>

## Vendor/Product filter

Use the **Vendor/Product** filter to search for data sources in your environment to see how well they provide coverage. Filtering on specific products and vendors helps you determine which provide the best coverage. Add or remove items from the list to see how different combinations provide coverage for the specific techniques you are most concerned about.

This filter is only enabled if you first select **Recent Activity** or **All Community Activity**.  

<img src={useBaseUrl('img/cse/mitre-vendor-product-filter.png')} alt="MITRE vendor/product filter" width="300"/>

### Custom rules and vendors/products

Vendors and products appear in the **Vendor/Product** filter when rules with MITRE tags generate Signals from logs provided by those vendors and products. 

If you have custom rules that refer to vendors and products, those vendors and products will not appear in the **Vendor/Product** filter unless they are already added to log mapping. 

To add a new vendor and product to log mapping:
1. Follow the directions in [Create a structured log mapping](/docs/cse/schema/create-structured-log-mapping).
1. In the screen where you you create a new mapping, navigate to the **If Input Matches** area.
1. In the **When a log from vendor** field, type the vendor name as it appears in messages generated by the product and click the **Create "`<vendor name>`"** button that appears beneath the field.<br/><img src={useBaseUrl('img/cse/mitre-create-vendor-example.png')} alt="Create vendor example" width="400"/>
1. In the **and product** field, type the product name as it appears in messages generated by the product and click the **Create "`<product name>`"** button that appears beneath the field.

Once the vendor and product appear in the log mapping list, custom rules can refer to them, and the system can successfully generate Signals from the logs. Then the vendor and product will display in the **Vendor/Product** filter.

## Benefits

* Use **Theoretical Coverage** to understand the content that Cloud SIEM includes out-of-the-box, and compare this with other SIEM solutions. 
* Track **Theoretical Coverage** over time to see the coverage levels increase as Sumo Logic deploys new content and you write new rules.
* Use **Theoretical Coverage** to prioritize which custom rules to write, and use **Recent Activity** to support this as well as your rule tuning efforts.
* Compare **Recent Activity** to **Theoretical Coverage** view to see if rules that provide coverage are actually creating Signals in your environment. If they are not creating Signals, you'll need to investigate why not.
* Use the data in **Recent Activity** to help justify the value of Cloud SIEM. Anywhere a cell is lit up, Cloud SIEM has detected potential malicious activity that matches that technique. In addition, by deselecting and selecting **Vendor/Product** log sources, you can see the contribution (and therefore the value) of any particular log source to that coverage. 
* Use the data in **Community Activity** to better understand the contribution (and therefore the value) of any particular log source, even those they are not currently ingesting into Cloud SIEM. This could help justify additional data ingest into Cloud SIEM, or justify a better balance of data sources to get optimal coverage. 
* Export the data in these views in the standard MITRE JSON format, and combine it with the data exported by other security tools in your environment, to get the total coverage of all of the tools in your environment. 
