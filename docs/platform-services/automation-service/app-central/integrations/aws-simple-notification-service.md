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
   
* **Label**. Enter the name you want to use for the resource.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Connection Timeout (s)**. Set the maximum amount of time the integration will wait for a server's response before terminating the connection. Enter the connection timeout time in seconds (for example, `180`). 
* **Verify Server Certificate**. Select to validate the server’s SSL certificate.
* **Automation engine**. Select **Cloud execution** for this certified integration. Select a bridge option only for a custom integration. See [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use a proxy to route network requests through a proxy server to manage and control internet traffic.
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/aws-simple-notification-service-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Simple Notification Service configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about Amazon Simple Notification Service, see [Amazon Simple Notification Service documentation](https://docs.aws.amazon.com/sns/).

## External Libraries

* [AWS Simple Notification Service](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* January 30, 2023 - First upload
* March 3, 2023 (v1.1)
	+ Updated integration Fields Label
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
