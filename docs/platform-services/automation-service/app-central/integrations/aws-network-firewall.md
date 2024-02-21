---
title: AWS Network Firewall
description: ''
tags: [ ]
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

## Change Log
 
* January 24, 2024 - First upload
