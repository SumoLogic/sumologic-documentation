---
title: Sumo Logic Notifications
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png')} alt="sumo-logic-notifications" width="100"/>

***Version: 1.2  
Updated: Mar 4, 2024***

Integration with Sumo Logic platform for monitors and Slack Notification.

## Actions

* **Assess Alert Status** (*Scheduled*) - Periodically monitor status of a Sumo Logic alert and notify a Slack user about unresolved alert.

## Sumo Logic Notifications configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Notifications in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <SumoLogicAPIURL/>
* <AccessID/>
* <AccessKey/>
* **Slack Bot/User OAuth Token**. Enter the Bot or User OAuth token from Slack. (The authentication token bears the required scopes.) For information about tokens, see [Slack documentation](https://api.slack.com/concepts/token-types).

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

    * **Sumo Logic API URL**. URL to the API of the instance (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
    * **Access ID**. The access ID that you copied earlier.
    * **Access Key**. The access key that you copied earlier.
    * **Slack Bot/User OAuth Token**. To set up the Slack app, refer to [Slack configuration](/docs/platform-services/automation-service/app-central/integrations/slack/) within App Central. You'll require a Slack Bot/User OAuth Token.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-notifications-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Notifications configuration" width="400"/>
## Change Log

* September 22, 2023 - First upload
* October 18, 2023 (v1.1) - Updated **Assess Alert Status** Action (Updated the Scheduled input to be dynamically set)
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
