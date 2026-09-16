---
title: AWS Simple Notification Service
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.4  
Updated: July 23, 2026***

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
import AWSIAMRole from '../../../../reuse/automation-service/aws/iam-role.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import IAMConfiguration from '../../../../reuse/automation-service/aws/iam-configuration.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSIAMRole/>
* <AWSRegions/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-simple-notification-service-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Simple Notification Service configuration" width="400"/>

For information about Amazon Simple Notification Service, see [Amazon Simple Notification Service documentation](https://docs.aws.amazon.com/sns/).

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Limitations

Local [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) is not supported in this version.

## Required Permissions
```
  sns:Publish
  sns:ListSubscriptions
  sns:ListTopics
  sns:GetSubscriptionAttributes
  sns:GetTopicAttributes
  sns:ListSMSSandboxPhoneNumbers
```

## External Libraries

* [AWS Simple Notification Service](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | July 23, 2026 | Resolved an issue where the integration fails due to deprecated dependency warnings. |
| v1.3 | August 19, 2025 | Added IAM Role Support. Users can now authenticate using an AWS IAM Role in addition to access key–based authentication. |
| v1.2 | June 15, 2023 | Updated the integration with Environmental Variables. |
| v1.1 | March 3, 2023 | Updated the integration field labels. |
| v1.0 | January 30, 2023 | Initial release of the AWS Simple Notification Service integration. |