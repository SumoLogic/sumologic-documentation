---
title: AWS CloudTrail
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

Interact with AWS CloudTrail through Trails and Events.

## Actions

* **Describe Trails** (*Enrichment*) - Retrieves settings for the trail associated with the current region for an AWS account.
* **Lookup Events** (*Enrichment*) - Looks up management events captured by CloudTrail.
* **Create Trail** (*Enrichment*) - Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
* **Delete Trail** (*Containment*) - Deletes a trail.
* **Start Logging** (*Enrichment*) - Starts the recording of AWS API calls and log file delivery for a trail.
* **Stop Logging** (*Enrichment*) - Suspends the recording of AWS API calls and log file delivery for the specified trail.
* **Update Trail** (*Enrichment*) - Updates the settings that specify delivery of log files.
* **List Trail** (*Enrichment*) - Lists trails that are in the current account.

## External Libraries

* [AWS CloudTrail](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS CloudTrail in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
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
* <AWSRegions/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudtrail-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudTrail configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS CloudTrail, see [CloudTrail documentation](https://docs.aws.amazon.com/cloudtrail/).

## Change Log

* October 1, 2019 - First upload
* March 10, 2022 - Logo
* May 12, 2023 (v1.1) - Integration refactored
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
