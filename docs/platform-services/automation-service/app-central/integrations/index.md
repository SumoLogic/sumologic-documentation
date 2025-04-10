---
slug: /platform-services/automation-service/app-central/integrations
title: Integrations in App Central
sidebar_position: 1
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section includes the complete catalog of currently supported integrations available in App Central. Our Automation Service and Cloud SOAR offer a comprehensive suite of integrations designed to enhance your automation and orchestration capabilities. 

:::note
Some integrations are tailor-made for Cloud SOAR and are indicated as such within their respective articles. These integrations only appear in the [App Central](/docs/cloud-soar/automation) in Cloud SOAR.
:::

## Configure authentication for integrations

This section provides a quick reference to configure authentication for integrations in App Central for the Automation Service and Cloud SOAR. Refer to the individual integrations articles for detailed information on setup, usage, and features. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.
1. Select the integration whose resource you want to configure the connection for. 
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cse/automations-edit-resource.png')} style={{border:'1px solid gray'}} alt="Edit a resource" width="800"/> 
1. Enter the authentication needed by the resource. <br/>What you enter is specific to the resource you're using. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. For example, in the following screen enter the **API URL** and **API Key**. <br/><img src={useBaseUrl('img/cse/automations-edit-resource-2.png')} style={{border:'1px solid gray'}} alt="Edit a resource" width="400"/> 
1. When done, click **TEST** to test the configuration. 
1. Click **SAVE** to save the configuration.

### Authentication needed for integrations

Following is the authentication needed for commonly-used integrations:
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

### FAQs about integration authentication

#### Why isn't my Access Key working?
* Confirm the Access ID and Access Key are correctly copied from the [Access Keys](/docs/manage/security/access-keys/) page.
* Ensure your key has the **Default** scope and hasn't expired.
* Verify the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) matches your deployment region (for example, `us1`, `us2`, `eu`).
* Ensure permissions tied to your Access Key allow the specific integration actions being attempted.
* If issues persist, regenerate your Access Key and retry.

#### What's the difference between Sumo Logic Log Analytics Internal and Sumo Logic Log Analytics?
* [Sumo Logic Log Analytics Internal](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics-internal/). Designed for internal actions; requires no additional authentication as it's integrated directly within the Sumo Logic environment. Used primarily for simple automation within the platform without external API calls.
* [Sumo Logic Log Analytics](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-log-analytics/). Requires API-based authentication (Access ID and Access Key) and is intended for external API calls or extended functionality beyond internal tools.

## Integrations (337)

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items} />
