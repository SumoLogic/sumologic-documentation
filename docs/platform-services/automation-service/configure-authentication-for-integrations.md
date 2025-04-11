---
id: configure-authentication-for-integrations
title: Configure Authentication for Integrations
sidebar_label: Configure Authentication for Integrations
description: Learn how to configure authentication for integrations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides a quick reference to configure authentication for [integrations in App Central](/docs/platform-services/automation-service/app-central/integrations/) for the Automation Service and Cloud SOAR. Refer to the individual integrations articles for detailed information on setup, usage, and features. 

## How to configure authentication

1. [Access App Central](/docs/platform-services/automation-service/automation-service-app-central/#view-app-central) and [install the integration](/docs/platform-services/automation-service/automation-service-app-central/#install-an-integration-from-app-central) from App Central.
1. Select the installed integration in the [**Integrations**](/docs/platform-services/automation-service/automation-service-integrations/) page. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.
1. Select the integration whose resource you want to configure the connection for. 
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} style={{border:'1px solid gray'}} alt="Edit a resource" width="800"/> 
1. Enter the authentication needed by the resource. <br/>What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. <br/>For example, in the following screen enter the **API URL** and **API Key** from the vendor. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} style={{border:'1px solid gray'}} alt="Edit a resource" width="400"/>
   :::note
   In many integrations, the configuration screen asks you to do the following:
      * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.
   :::
1. When done, click **TEST** to test the configuration. 
1. Click **SAVE** to save the configuration.

## Authentication needed for integrations

### Authentication for common integrations

The following outlines the authentication requirements for commonly used integrations:
* **[HTTP Tools](/docs/platform-services/automation-service/app-central/integrations/http-tools/)**:
   * For **HTTP API URL** provide the resource-specific URL.
   * In **Extra Headers** add required auth tokens (if applicable) as JSON input or key-value pairs. Verify that the auth token provided has the necessary permissions for the requested playbook actions. 
* **[Incident Tools](/docs/platform-services/automation-service/app-central/integrations/incident-tools/)** / **[Mail Tools](/docs/platform-services/automation-service/app-central/integrations/mail-tools/)** / **[Triage Tools](/docs/platform-services/automation-service/app-central/integrations/triage-tools/)** / **[Zip Tools](/docs/platform-services/automation-service/app-central/integrations/zip-tools/)**:
   * Set the **Cloud SOAR API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Provide the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.
* **[Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/)**:
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.
* **[Sumo Logic Log Analytics](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics/)**: 
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). For minimal configuration, select the scope **Log Search** or other relevant scopes as required.
* **[Sumo Logic Notifications](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/)**: 
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.
   * Provide the **Slack Bot/User OAuth Token**.
* **[Sumo Logic Notifications by Gmail](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/)**:
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.
   * Provide **Client ID (Gmail)** and **Client Secret ID (Gmail)** setup steps obtained as described [here](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/#sumo-logic-notifications-by-gmail-configuration).
   * Configure authorization separately from the playbook (initial one-time setup).
* **[Sumo Logic Notifications by Microsoft](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-microsoft/)**:
   * For the first **API URL** field, provide the Microsoft Graph API URL.
   * Specify the **Authentication Grant Type** and **Directory (Tenant) ID**.
   * For **Client ID** and **Client Secret**, provide the Microsoft Graph client ID and secret obtained as described in [Add a client secret](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-microsoft/#add-a-client-secret).
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.

### Integrations not requiring authentication

These integrations execute without additional authentication:
* [Basic Tools](/docs/platform-services/automation-service/app-central/integrations/basic-tools/)
* [Sumo Logic Automation Tools](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/)
* [Sumo Logic Cloud SIEM Internal](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem-internal/)
* [Sumo Logic Log Analytics Internal](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics-internal/)

## Troubleshooting general issues

### Sumo Logic access key doesn't work

To resolve access key issues:
* Confirm the Access ID and Access Key are correctly copied from the [Access Keys](/docs/manage/security/access-keys/) page.
* Ensure your key has the **Default** scope and hasn't expired.
* Ensure permissions tied to your access key allow the specific integration actions being attempted.
* If issues persist, regenerate your access key and retry.

### API endpoint and error issues

To resolve Sumo Logic API endpoint errors, verify the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) matches your deployment region (for example, `us1`, `us2`, `eu`).

To resolve vendor API endpoint errors:
* Validate integration setup via the third-party vendor’s dashboard or Postman.
* Configure API tokens and access keys with the appropriate scope.
* Check if authentication credentials and API parameters are correct. 
* Review the vendor’s API documentation:
   * Identify the correct authentication method.
   * Define minimum permissions required.
   * Validate endpoint URLs and API parameters. 

Examples of vendor API documentation:
   * [AbuseIPDB](https://www.abuseipdb.com/api.html)
   * [CIRCL CVE Search](http://www.circle.lu/services/cve-search/)
   * [Hatching Triage](https://github.com/hatching/triage/blob/main/README.md)
   * [Mitre Matrix](https://attack.mitre.org/matrices/enterprise/)
   * [Threat Crowd](https://github.com/AlienVault-OTX/ApiV2/blob/master/README.md)

For additional help with APIs, [contact support](https://support.sumologic.com/support/s/).

### Permissions issues

Where possible, permissions should be granted in accordance with the principle of least privilege. 

Permissions depend on the integration’s use case. Users should:
* Refer to the vendor API documentation for required credentials.
* Configure API tokens and access keys with the appropriate scope.

### Vendor site is not available

Use [Check-Host](https://check-host.net/) to monitor website and host availability and performance.

## Troubleshooting vendor-specific issues

### AWS integrations

This section applies to all AWS integrations, (for example, [AWS EC2](/docs/platform-services/automation-service/app-central/integrations/aws-ec2/), [AWS S3](/docs/platform-services/automation-service/app-central/integrations/aws-s3/), etc.)

#### Authentication method

AWS recommends using IAM roles with temporary security credentials over long-term access keys for enhanced security. However, our AWS integrations currently support only access keys due to the need for dynamically managed credentials. 

#### Regional configuration

A single integration can be used across multiple AWS regions. However, if region-specific actions are required in playbooks, separate resources must be created, and conditional logic can be applied for selection.

#### Service specifics

* **Service name**. Use the name of the specific AWS service (for example, S3, EC2).
* **Host/URL**. Must be service-specific and regional (for example, `s3.amazonaws.com`).
* **Session token**. Required for temporary authentication.
* **Scope**. Defines access permissions based on IAM policies.

### CyberArk

For [CyberArk PAM](/docs/platform-services/automation-service/app-central/integrations/cyberark-pam/), obtain client certificates, private keys, and root CA certificates via [CyberArk Docs](https://docs.cyberark.com/portal/latest/en/docs.htm).

### Slack

For the [Slack](/docs/platform-services/automation-service/app-central/integrations/slack/) and [Sumo Logic Notifications](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/) integrations, a Slack OAuth token is required because the integration specifically sends notifications from Sumo Logic to Slack channels.

### Sumo Logic Log Analytics

Users often ask what is the difference between the Sumo Logic Log Analytics Internal and Sumo Logic Log Analytics integrations.

[Sumo Logic Log Analytics Internal](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics-internal/) is designed for internal actions. It requires no additional authentication as it's integrated directly within the Sumo Logic environment. It is used primarily for simple automation within the platform without external API calls.

[Sumo Logic Log Analytics](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics/) requires API-based authentication (Access ID and Access Key) and is intended for external API calls or extended functionality beyond internal tools.