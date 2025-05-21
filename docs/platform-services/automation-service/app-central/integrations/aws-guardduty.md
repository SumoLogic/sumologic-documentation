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
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegion from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key-and-secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

<IntegrationLabel/>
<AWSRegion/>
* **Service Name**. Enter `Amazon GuardDuty`.
<AWSAccesskey/>
* **Server URL**. Enter your [AWS GuardDuty URL](https://docs.aws.amazon.com/general/latest/gr/guardduty.html), for example, `guardduty.us-east-1.amazonaws.com`.
<IntegrationTimeout/>
<IntegrationCertificate/>
<IntegrationEngine/>
<IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-guardduty-configuration.png')} style={{border:'1px solid gray'}} alt="AWS GuardDuty configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS GuardDuty, see [GuardDuty documentation](https://docs.aws.amazon.com/guardduty/).

## Change Log

* January 24, 2020 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
