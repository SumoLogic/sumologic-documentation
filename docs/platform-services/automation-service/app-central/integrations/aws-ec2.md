---
title: AWS EC2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.5  
Updated: Feb 04, 2025***

Using the integration with EC2, you can enrich incidents with specific EC2 data, create and delete snapshots, work with elastic addresses and instances, and manipulate security groups. 

## Actions

* **Authorize Security Group Ingress Rule** (*Containment*) - Adds the specified ingress rules to a security group.
* **Create Snapshot** (*Containment*) - Creates a new snapshot.
* **Delete Security Group** (*Containment*) - Delete a security group.
* **Delete Snapshot** (*Containment*) - Deletes an existing snapshot.
* **Describe Addresses** (*Enrichment*) - Describes the specified Elastic IP addresses or all Elastic IP addresses.
* **Describe Instances** (*Enrichment*) - Describes the specified instances or all of AWS account's instances.
* **Describe Instances V2** (*Enrichment*) - Describes the specified instances or all of AWS account's instances with pagination.
* **Describe Key Pairs** (*Enrichment*) - Describes the specified key pairs or all key pairs.
* **Describe Regions** (*Enrichment*) - Describes the Regions that are enabled for an account, or all Regions.
* **Describe Subnets** (*Enrichment*) - Describes one or more subnets.
* **Describe Security Groups** (*Enrichment*) - Describes the specified security groups or all security groups.
* **Describe Snapshots** (*Enrichment*) - Describes a specified EBS snapshots or all of the EBS snapshots available.
* **Describe Volumes** (*Enrichment*) - Describes the specified EBS volumes or all EBS volumes.
* **Describe VPCs** (*Enrichment*) - Describes one or more VPCs.
* **Disassociate Address** (*Containment*) - Disassociates an Elastic IP address from an instance or network interface it's associated with.
* **Get Password Data** (*Enrichment*) - Retrieves the encrypted administrator password for a running Windows instance.
* **Monitor Instance** (*Containment*) - Monitor a specific instance.
* **Release Address** (*Containment*) - Releases the specified Elastic IP address.
* **Reboot Instances** (*Containment*) - Reboot instances.
* **Revoke Security Group Ingress Rule** (*Containment*) - Removes the specified ingress rules from a security group.
* **Start Instance** (*Containment*) - Start an instance.
* **Stop Instance** (*Containment*) - Stop an instance.
* **Terminate Instance** (*Containment*) - Terminate an instance.
* **Unmonitor Instances** (*Containment*) - Discontinue monitoring of a specified instances.

**Supported Versions**

* October 2019

## External Libraries

* [AWS EC2](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS EC2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegion from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSRegion/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-ec2-configuration.png')} style={{border:'1px solid gray'}} alt="AWS EC2 configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS EC2, see [EC2 documentation](https://docs.aws.amazon.com/ec2/).

## Change Log

* October 9, 2019 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
* January 16, 2024 (v1.3)
	+ Updated action: Stop Instance (Resolved bug related to checkbox fields)
+ July 04, 2024 (v1.4)
	+ Updated action: Describe Instances (Resolved bug related to Instance ID field)
+ February 04, 2025 (v1.5)
    + Added action: Describe Instances V2