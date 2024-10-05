---
title: AWS EC2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.4  
Updated: July 04, 2024***

Using the integration with EC2, you can enrich incidents with specific EC2 data, create and delete snapshots, work with elastic addresses and instances, and manipulate security groups. 

## Actions

* **Describe Regions** (*Enrichment*) - Describes the Regions that are enabled for an account, or all Regions.
* **Describe Instances** (*Enrichment*) - Describes the specified instances or all of AWS account's instances.
* **Describe Addresses** (*Enrichment*) - Describes the specified Elastic IP addresses or all Elastic IP addresses.
* **Describe Volumes** (*Enrichment*) - Describes the specified EBS volumes or all EBS volumes.
* **Describe Key Pairs** (*Enrichment*) - Describes the specified key pairs or all key pairs.
* **Describe VPCs** (*Enrichment*) - Describes one or more VPCs.
* **Describe Subnets** (*Enrichment*) - Describes one or more subnets.
* **Describe Security Groups** (*Enrichment*) - Describes the specified security groups or all security groups.
* **Describe Snapshots** (*Enrichment*) - Describes a specified EBS snapshots or all of the EBS snapshots available.
* **Get Password Data** (*Enrichment*) - Retrieves the encrypted administrator password for a running Windows instance.
* **Create Snapshot** (*Containment*) - Creates a new snapshot.
* **Delete Snapshot** (*Containment*) - Deletes an existing snapshot.
* **Disassociate Address** (*Containment*) - Disassociates an Elastic IP address from an instance or network interface it's associated with.
* **Release Address** (*Containment*) - Releases the specified Elastic IP address.
* **Start Instance** (*Containment*) - Start an instance.
* **Stop Instance** (*Containment*) - Stop an instance.
* **Terminate Instance** (*Containment*) - Terminate an instance.
* **Delete Security Group** (*Containment*) - Delete a security group.
* **Monitor Instance** (*Containment*) - Monitor a specific instance.
* **Unmonitor Instances** (*Containment*) - Discontinue monitoring of a specified instances.
* **Reboot Instances** (*Containment*) - Reboot instances.
* **Authorize Security Group Ingress Rule** (*Containment*) - Adds the specified ingress rules to a security group.
* **Revoke Security Group Ingress Rule** (*Containment*) - Removes the specified ingress rules from a security group.

**Supported Versions**

* October 2019

## External Libraries

* [AWS EC2](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* October 9, 2019 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
* January 16, 2024 (v1.3)
	+ Updated action: Stop Instance (Resolved bug related to checkbox fields)
+ July 04, 2024 (v1.4)
	+ Updated action: Describe Instances (Resolved bug related to Instance ID field)

