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

<IntegrationsAuth/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about Amazon Simple Notification Service, see [Amazon Simple Notification Service documentation](https://docs.aws.amazon.com/sns/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/aws-simple-notification-service-3.png')} style={{border:'1px solid gray'}} alt="aws-simple-notification-service-3" width="600"/>
1. Populate all the required fields(\*) and click **SAVE**.
   * **Label**. Name of the resource for AWS SNS.
   * **Access key ID**. Enter your AWS Access Key.
   * **Secret Access key**. Enter your AWS Secret Access Key.
   * **AWS Region**. Enter the AWS region for the SNS topic.
   For more info about [Access Key ID and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/aws-simple-notification-service-4.png')} style={{border:'1px solid gray'}} alt="aws-simple-notification-service-4" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/aws-simple-notification-service-5.png')} style={{border:'1px solid gray'}} alt="aws-simple-notification-service-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/aws-simple-notification-service-6.png')} style={{border:'1px solid gray'}} alt="aws-simple-notification-service-6" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/aws-simple-notification-service-7.png')} style={{border:'1px solid gray'}} alt="aws-simple-notification-service-7" width="400"/>

## External Libraries

* [AWS Simple Notification Service](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* January 30, 2023 - First upload
* March 3, 2023 (v1.1)
	+ Updated integration Fields Label
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
