---
title: AWS Network Firewall
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0  
Updated: Jan 24, 2024***

AWS Network Firewall is a stateful, managed, network firewall and intrusion detection and prevention service for Amazon Virtual Private Cloud (Amazon VPC). With Network Firewall, you can filter traffic at the perimeter of your VPC. This includes filtering traffic going to and coming from an internet gateway, NAT gateway, over VPN, or Direct Connect.

## Actions

* **Add Rule Group To Firewall Policy** *(Containment)* - Add specified rule group to firewall policy.
* **Create Rule Group** *(Containment)* - Creates the specified stateless or stateful rule group, which includes the rules for network traffic inspection, a capacity setting, and tags.
* **Describe Firewall Policy** *(Enrichment)* - Returns the data objects for the specified firewall policy.
* **Describe Rule Group** *(Enrichment)* - Returns the data objects for the specified rule group.
* **List Firewall Policies** *(Enrichment)* - Retrieves the metadata for the firewall policies that you have defined.
* **List Rule Groups** *(Enrichment)* - Retrieves the metadata for the rule groups that you have defined.

## External Libraries

* [AWS Network Firewall](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS Network Firewall in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Connection Timeout (s)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the allotted time, then the connection is terminated.
* **Verify server certificate**. Select to verify that the [server certificate](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) is valid.
* **Automation engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html). 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-network-firewall-configuration.png')} style={{border:'1px solid gray'}} alt="AWS NetWork Firewall configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS Network Firewall, see [AWS Network Firewall documentation](https://docs.aws.amazon.com/network-firewall/).

## Change Log
 
* January 24, 2024 - First upload
