---
id: cloud-sensor-guide
title: Cloud Sensor Guide
description: Learn about the Cloud Sensor Integrations and functionality.
---


:::note
The CSE Cloud Sensor has reached end of life and is no longer supported. Please migrate to a Sumo Logic Hosted Collector. For more information, see the [end of life notice](https://app.getbeamer.com/cloudsiementerprise/en/end-of-life-notice-_-cloud-siem-enterprise-sensors).
:::

This section has instructions for configuring CSE Cloud Sensor integrations, which allow you to collect log data from a variety of cloud-based applications and storage services.

## Cloud Sensor Overview

The CSE Cloud Sensor is a sensor that is hosted by CSE. There are two types of integrations available for the Cloud Sensor:

* **Cloud-based app integrations.** These integrations allow you to collect log data from cloud-based apps, for example, Amazon GuardDuty, or Microsoft Office 365. 

* **Cloud-based storage integrations**. These integrations allow you to collect log data from AWS S3, AWS SQS, or Microsoft EventHub. This is useful if you forward log data from applications to one of these storage services. 

You configure Cloud Sensor integrations on the edit page for your Cloud Sensor. When you add an integration, you are prompted to supply a number of configuration parameters. For example, when you add integrations for AWS services, you are prompted to supply your AWS access key, secret key, and data that identifies the resources you want to monitor. For an example configuration procedure, see [Configure an API integration](cloud-sensor-guide.md), below.

## Supported App integrations

The following table lists the integrations supported by CSE. 

| Vendor | Products |
|--|--|
| Amazon Web Services (AWS) | CloudTrail<br/>GuardDuty<br/>SQS Forwarding<br/>S3 Forwarding<br/>Virtual Private Cloud (VPC) Flow Records<br/> |
| Carbon Black | Defense |
| Cisco	| AMP<br/>Umbrella |
| Cloudflare | Logpush |
| Cylance | PROTECT |
| Duo Security | Multi-Factor Authentication (MFA) |
| Endgame | Protect API |
| Google | G Suite |
| Illumio | Adaptive Security Platform (ASP) |
| Lacework | Cloud Security Platform |
| Microsoft | Azure<br/>Azure EventHub Forwarding<br/>Office 365 |
| Mimecast | Message Transfer Agent (MTA) |
| Netskope | Security Cloud |
| Okta | Authentication |
| Proofpoint | TAP |
| Redlock | Cloud Threat Defense |
| Salesforce | Platform |
| Sophos | SIEM API (Alerts and Events) |
| Tenable | Events |

## Supported Cloud Storage Integrations

This section lists the CSE’s cloud storage integrations.

| Storage service | Integrations |
|--|--|
| AWS S3 | AWS CloudTrail via S3<br/>AWS GuardDuty via<br/>Tenable Events via S3<br/>Cisco Umbrella via S3 |
| AWS SQS | AWS CloudTrail via SQS<br/>AWS S3 via SQS<br/>Amazon GuardDuty via SQS<br/>RedLock Cloud threat Defense via SQS<br/>Lacework Cloud Security Platform via SQS<br/>Cisco Umbrella via SQS<br/>Illumino ASP via SQS |
| Microsoft	| Azure Eventhub |

## Configure an API integration 

1. In the CSE web UI, click the gear icon, then click **Sensors**.   

    ![Sensor_UI.png](/img/cse/Sensor_UI.png)
1. Click Cloud Sensor's **Edit** icon.   

    ![Cloud_Sensor_Edit.png](/img/cse/Cloud_Sensor_Edit.png)
1. Click **ADD** under the **INTEGRATIONS** section.   

    ![Integration_ADD.png](/img/cse/Integration_ADD.png)
1. Select the **Type** of integration you would like to configure, fill in the required fields, and click **ADD.   

    ![Integration_Type.png](/img/cse/Integration_Type.png)**
1. The new integration is listed under the Cloud Sensor's INTEGRATIONS section labeled by the **Name** you provided for that Integration. (Not the **Type** of Integration)
1. The Cloud Sensor will begin to automatically collect data from your new integration. To confirm, click on the Info icon next to "Cloud Sensor" to view the integration's configuration and Records Seen Since Start.   

    ![info.png](/img/cse/info.png)   

    ![Records_Seen_Since_Start.png](/img/cse/Records_Seen_Since_Start.png)
