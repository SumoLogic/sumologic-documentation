---
title: AWS GuardDuty
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

Interact with AWS GuardDuty during incident investigation.

## Actions

* **List Detectors** (*Enrichment*) - Lists *detectorIds* of all the existing Amazon GuardDuty detector resources.
* **Get Detector** (*Enrichment*) - Retrieves an Amazon GuardDuty detector specified by the *detectorId*.
* **List IP Set** (*Enrichment*) - Lists the IPSets of the GuardDuty service specified by the detector ID.
* **Get IP Set** (*Enrichment*) - Retrieves the IPSet specified by the *ipSetId*.
* **List ThreatIntel Sets** (*Enrichment*) - Lists the ThreatIntelSets of the GuardDuty service specified by the detector ID.
* **Get ThreatIntel Set** (*Enrichment*) - Retrieves the ThreatIntelSet that is specified by the *ThreatIntelSet* ID.
* **List Findings** (*Enrichment*) - Lists Amazon GuardDuty findings for the specified detector I.
* **Get Findings** (*Enrichment*) - Describes Amazon GuardDuty findings specified by finding IDs.
* **Create Detector** (*Containment*) - Creates a single Amazon GuardDuty detector.
* **Update Detector** (*Containment*) - Updates the Amazon GuardDuty detector specified by the *detectorId*.
* **Delete Detector** (*Containment*) - Deletes a Amazon GuardDuty detector specified by the detector ID.
* **Create IP Set** (*Containment*) - Creates a new IPSet, called Trusted IP list in the consoler user interface.
* **Update IP Set** (*Containment*) - Updates the IPSet specified by the IPSet ID.
* **Delete IP Set** (*Containment*) - Deletes the IPSet specified by the *ipSetId*.
* **Create ThreatIntel Set** (*Containment*) - Create a new *ThreatIntelSet*.
* **Update ThreatIntel Set** (*Containment*) - Updates the ThreatIntelSet specified by *ThreatIntelSet* ID.
* **Delete ThreatIntel Set** (*Containment*) - Deletes ThreatIntelSet specified by the *ThreatIntelSet* ID.
* **Create Sample Findings** (*Containment*) - Generates example findings of types specified by the list of finding types.
* **Update Findings Feedback** (*Containment*) - Marks the specified GuardDuty findings as useful or not useful.
* **Archive Findings** (*Containment*) - Archives GuardDuty findings specified by the list of finding IDs.
* **Unarchive Findings** (*Containment*) - Unarchives GuardDuty findings specified by the *findingIds*.

## External Libraries

* [AWS GuardDuty](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS GuardDuty in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Service Name**. Enter `Amazon GuardDuty`.
* **Access Key (ID)**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Key**. Enter the secret access key associated with the access key ID.
* **Server URL**. Enter your [AWS GuardDuty URL](https://docs.aws.amazon.com/general/latest/gr/guardduty.html), for example, `guardduty.us-east-1.amazonaws.com`.
* **Timeout connection (sec)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the alloted time, then the connection is terminated.
* **Verify server certificate**. Select to verify that the [server certificate](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) is valid.
* **Automation engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-guardduty-configuration.png')} style={{border:'1px solid gray'}} alt="AWS GuardDuty configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS GuardDuty, see [GuardDuty documentation](https://docs.aws.amazon.com/guardduty/).

## Change Log

* January 24, 2020 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
