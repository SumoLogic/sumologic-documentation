---
title: AWS Simple Notification Service
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

Amazon Simple Notification Service (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

## Actions

* **Send Message** (*Notification*) - Sends a message to an Amazon SNS Topic, a text message (SMS message) directly to a phone number.
* **List Subscriptions** (*Enrichment*) - List of the requester's subscriptions.
* **List Topics** (*Enrichment*) - List of the requester's topics.
* **Get Subscription Attributes** (*Enrichment*) - Returns all of the properties of a subscription.
* **Get Topic Attributes** (*Enrichment*) - Returns all of the properties of a topic. Topic properties returned might differ based on the authorization of the user.
* **List Sandbox Phone Numbers** (Enrichment) - Lists the calling AWS account's current verified and pending destination phone numbers in the SMS sandbox.

## Configure Amazon Simple Notification Service in Automation Service and Cloud SOAR

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
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/aws-simple-notification-service-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Simple Notification Service configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about Amazon Simple Notification Service, see [Amazon Simple Notification Service documentation](https://docs.aws.amazon.com/sns/).

## External Libraries

* [AWS Simple Notification Service](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* January 30, 2023 - First upload
* March 3, 2023 (v1.1)
	+ Updated integration Fields Label
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
