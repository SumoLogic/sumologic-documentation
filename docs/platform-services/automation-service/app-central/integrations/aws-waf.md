---
title: AWS WAF
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.1  
Updated: March 26, 2025***

## Overview

### Purpose

AWS WAF is a web application firewall that helps protect web applications from attacks by allowing you to configure rules that allow, block, or monitor (count) web requests based on conditions that you define.
This integration is designed to manage and retrieve WAF security configurations, including IP sets, regex pattern sets, rule groups, and web access control lists (web ACLs). It enables you to define, update, delete, and retrieve security rule assets that inspect and control web request traffic.

### Use cases

* Creating and managing IP allowlists/denylists
* Defining regex-based pattern rules for request inspection
* Grouping multiple rules in custom rule groups
* Fetching details and summaries of rule components
* Updating existing rules in response to new threats

### Supported versions

This integration supports WAFv2 API actions and works with resources.
It is compatible with all standard environments where WAFv2 actions are supported.

### Prerequisites

* IAM permissions for:
  * `wafv2:CreateIPSet, DeleteIPSet, UpdateIPSet, GetIPSet, ListIPSets`
  * `wafv2:CreateRegexPatternSet, DeleteRegexPatternSet, ListRegexPatternSets`
  * `wafv2:CreateRuleGroup, DeleteRuleGroup, GetRuleGroup, ListRuleGroups`
  * `wafv2:GetWebACL, ListWebACLs, ListResourcesForWebACL`
  * `wafv2:GetManagedRuleSet, ListManagedRuleSets, ListAvailableManagedRuleGroups`
* Proper region selection for WAFv2 API calls (`regional` or `global` scope)
* API credentials with sufficient access

### Limitations

* Regex complexity may be limited by the WAF regex engine's constraints.
* All changes require propagation time before taking effect (~1-2 minutes).

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

## Configure AWS WAF in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **Session Token**. Enter the session token if you are using [temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
* **AWS Region**. Select the [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) to use for the integration. 
* **Scope**. Select the scope for WAF ([**Regional** or **CloudFront**](https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html)).
* **Connection Timeout (s)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the alloted time, then the connection is terminated.
* **Verify Server Certificate**. Select to verify that the [server certificate](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) is valid.
* **Automation Engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-waf/aws-waf-1.png')} style={{border:'1px solid gray'}} alt="Edit Resource for AWS WAF" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS WAF, see [AWS WAF documentation](https://docs.aws.amazon.com/waf/).

## Usage

### Basic usage

* Create an IP Set (allow/block IPs).
* Create a Regex Pattern Set (match request components).
* Group rules using Rule Groups.
* Retrieve or list existing components for monitoring or inspection.

### Advanced usage

Bulk Listing & Auditing: List all rule groups, regex sets, IP sets, and WebACLs and map their usage across resources.

## API reference

### Configuration

Each API call uses the following structure:
* Method: Generally POST or GET depending on the action
* Authentication: AWS Signature V4
* Scope: REGIONAL or CLOUDFRONT

### Containment APIs

#### Create IP Set
* Method: POST
* Action: CreateIPSet
* Required Parameters:
  * Name (string)
  * Scope (REGIONAL | CLOUDFRONT)
  * Region
  * IPAddressVersion (IPV4 | IPV6)
  * Addresses (list of IPs or CIDRs)
  * Description (optional)

```python title="Sample Request (Python)"
client.create_ip_set(
    Name='BlockList',
    Scope='REGIONAL',
    IPAddressVersion='IPV4',
    Addresses=['x.x.x.x/24'],
    Description='Block bad IPs'
)
```

```json title="Sample Response (JSON)"
{
  "Summary": {
    "Name": "BlockList",
    "Id": "123abcde-4567-890a-bcde-1234567890ab",
    "ARN": "arn:aws:wafv2:us-east-1:123456789012:regional/ipset/BlockList/123abcde-4567-890a-bcde-1234567890ab",
    "Description": "Block bad IPs",
    "LockToken": "e1b2c3d4-5678-9101-1121-314151617181"
  }
}
```

#### Create Regex Pattern Set
* Method: POST
* Action: CreateRegexPatternSet
* Required Parameters:
  * Name, Scope, RegularExpressionList, Description (optional)

#### Create Rule Group
* Method: POST
* Action: CreateRuleGroup
* Required Parameters:
  * Name, Scope, Capacity, Rules, VisibilityConfig

#### Update IP Set
* Method: POST
* Action: UpdateIPSet
* Required Parameters:
  * ID, Name, Scope, Add/Remove IP Addresses

#### Delete IP Set / Regex Pattern Set / Rule Group
* Method: POST
* Action: Delete (Type)
* Required Parameters:
  * Name, ID, Scope, Region

### Enrichment APIs

#### Get IP Set / Rule Group / Web ACL / Managed Rule Set
* Method: GET
* Action: Get (Type) ex: Get IP Set/Get Rule Group
* Required Parameters:
  * Id, Name, Scope

#### List IP Sets / Regex Pattern Sets / Rule Groups / Web ACLs / Managed Rule Sets
* Method: GET
* Action: List (Type)s
* Optional Parameters: Limit, NextMarker

#### List Resources for Web ACLs
* Method: GET
* Action: ListResourcesForWebACL
* Required Parameters:
  * WebACLArn

### Rate limits and quotas

| API type | Quota/rate limit |
| :-- | :-- |
| IP sets per region  | 100 |
| Regex sets per region | 100 |
| Rule groups per region | 100 |
| API transactions (TPS) | ~5-10 TPS per account per API |

Limits may vary by region and can be increased via AWS Support.

## Troubleshooting

### Common issues

| Issue | Description | Solution |
| :-- | :-- | :-- |
| WAFNonexistentItemException | Occurs when trying to access or delete a non-existent resource. | Double-check the ID, Name, and Scope. Use List APIs to confirm existence. |
| WAFOptimisticLockException | Indicates a stale or missing LockToken when updating or deleting resources.  | Always fetch the latest LockToken using Get API before performing updates/deletes.  |
| WAFInvalidParameterException | One or more parameters are invalid or missing. |                              Verify that all required parameters are included and correctly formatted (for example, CIDR for IP sets). |
| AccessDeniedException  | Occurs when permissions are insufficient.  | Check IAM roles and policies assigned to the user or service making the request. Ensure `wafv2:*` permissions are included. |
| Resource still appears after deletion. | A deleted IPSet, RuleGroup, etc. still seems accessible in the UI or APIs.  | Allow a few seconds for propagation. Use Get `<action-type>` or List `<action-type>` to confirm removal. |
| IP addresses not being blocked.  | Traffic from listed IPs still reaches the application. | Ensure the IPSet is attached to a WebACL and the WebACL is associated with the resource (for example, CloudFront or ALB). |


### FAQs

#### Can I reuse an IPSet in different rule groups?

Yes, an IPSet can be used in several rule groups or WebACLs. You don’t need to create a new one for each use.

#### What’s the difference between REGIONAL and CLOUDFRONT scopes?

REGIONAL is used for AWS services like Application Load Balancers, API Gateway, and App Runner.

CLOUDFRONT is specifically for CloudFront distributions and must be managed in the US East (N. Virginia) region.

#### Why aren’t my changes showing up right away?

Updates can take a few moments to fully apply within AWS. Try retrieving the latest configuration using the appropriate Get API call to confirm.

#### What if the IP address I provide isn’t in CIDR format?

If the IP isn’t formatted correctly (for example, missing the CIDR suffix), AWS WAF will return a WAFInvalidParameterException. Make sure IPs follow the CIDR notation like 192.0.2.0/24.

### Support

* [AWS WAF documentation](https://docs.aws.amazon.com/waf/latest/developerguide/)
* [AWS WAF API reference](https://docs.aws.amazon.com/waf/latest/APIReference/)
* [Contact AWS support](https://aws.amazon.com/support)

## External libraries

* [boto3](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

### Version history
* April 19, 2024 (v1.0)- First upload
* March 26, 2025 (v1.1) - Added Update IP Set action. This new action allows users to add or remove IPs from an existing IP Set.

### Deprecation notices
* NA