---
title: AWS WAF
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.1  
Updated: March 26, 2025***

AWS WAF is a web application firewall that helps protect web applications from attacks by allowing you to configure rules that allow, block, or monitor (count) web requests based on conditions that you define.

## Actions

* **Create IP Set** (*Containment*) -  Creates an IPSet, used to identify web requests that originate from specific IP addresses or ranges of IP addresses.
* **Create Regex Pattern Set** (*Containment*) - Creates a RegexPatternSet, which you reference in a RegexPatternSetReferenceStatement, to have AWS WAF inspect a web request component for the specified patterns.
* **Create Rule Group** (*Containment*) - Creates a RuleGroup per the specifications provided.
* **Delete IP Set** (*Containment*) - Deletes the specified IPSet.
* **Delete Regex Pattern Set** (*Containment*) - Deletes the specified RegexPatternSet.
* **Delete Rule Group** (*Containment*) - Deletes the specified RuleGroup.
* **Get IP Set** (*Enrichment*) - Retrieves the specified IPSet.
* **Get Managed Rule Set** (*Enrichment*) - Retrieves the specified managed rule set.
* **Get Rule Group** (*Enrichment*) - Retrieves the specified RuleGroup.
* **Get Web ACL** (*Enrichment*) - Retrieves the specified WebACL.
* **List Available Managed Rule Groups** (*Enrichment*) - Retrieves a list of managed rule groups that are available for you to use.
* **List IP Sets** (*Enrichment*) - Retrieves a list of IPSetSummary objects for the IP sets that you manage.
* **List Managed Rule Sets** (*Enrichment*) - Retrieves the managed rule sets that you own.
* **List Regex Pattern Sets** (*Enrichment*) - Retrieves a list of RegexPatternSetSummary objects for the regex pattern sets that you manage.
* **List Resources for Web ACLs** (*Enrichment*) - Retrieves a list of the Amazon Resource Names (ARNs) for the regional resources that are associated with the specified web ACL.
* **List Rule Groups** (*Enrichment*) - Retrieves a list of RuleGroupSummary objects for the rule groups that you manage.
* **List Web ACLs** (*Enrichment*) - Retrieves a list of WebACLSummary objects for the web ACLs that you manage.
* **Update IP Set** (*Containment*) - Updates the specified IPSet.


## External Libraries

* [boto3](https://github.com/boto/boto3/blob/develop/LICENSE)


## Change Log

* April 19, 2024 (v1.0)- First upload
* March 26, 2025 (v1.1) - Added **Update IP Set** action: This new action allows users to add or remove IPs from an existing IP Set.
