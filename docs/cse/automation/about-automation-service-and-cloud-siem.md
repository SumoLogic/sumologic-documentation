---
id: about-automation-service-and-cloud-siem
title: About the Automation Service and Cloud SIEM
sidebar_label: About the Automation Service and Cloud SIEM
description: Get an overview of how the Automation Service allows you to automate smart actions, including enrichments and notifications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic provides an overview of using the [Automation Service](/docs/platform-services/automation-service/) to configure automations in Cloud SIEM.

The Automation Service allows you to define and automate smart actions, including enrichments and notifications. These actions can be automatically triggered when certain events occur in Cloud SIEM, helping you to quickly investigate, understand, and react to potential security threats.

You interact with the Automation Service through [automations in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem). The automations execute playbooks in the Automation Service. Playbooks  are composed of one or more actions with a workflow that could include parallel actions and logic steps. Actions are included with integrations. The Automation Service provides a number of integrations, actions, and playbooks that you can customize. You can also create your own.

:::info
Before you can create automations in Cloud SIEM, you must first [configure role capabilities](#configure-role-capabilities-for-cloud-siem-automation).
:::

<!-- Micro lesson is commented out until it is adjusted to show that the Automation Service is no longer under Cloud SIEM.

Watch this micro lesson to learn more about using the Automation Service to create automations in Cloud SIEM.

<Iframe url="https://www.youtube.com/embed/kJawCYJhS4M?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

import Iframe from 'react-iframe';

-->

## Differences compared to Cloud SOAR

Using the Automation Service with Cloud SIEM differs from Cloud SOAR in the following ways:
* Using the Automation Service with Cloud SIEM does not include the incident and case management features from Cloud SOAR.
* The Automation Service does not support daemon and trigger action types. The Automation Service can only use triggers built into Cloud SIEM and the Log Analytics platform. 
* Playbooks, integrations, and actions in the Automation Service may differ from those in [Cloud SOAR automation](/docs/cloud-soar/automation/). 

For more information, see [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).

## Benefits

* The Automation Service supports enrichment, notification, and custom actions in Cloud SIEM:
  * Enrichment actions can be used to gather additional information about an Entity or Insight, including [threat indicators](/docs/cse/integrations/enrichments-and-indicators#threat-indicators).
  * Notification actions can be used to send notifications or update status in systems like Cloud SIEM, the Sumo Logic core platform, Slack, Microsoft Teams, Jira, email, and so on.
* Automations can be triggered automatically when an Insight is created or closed. Automations can also be executed manually via the Cloud SIEM UI and API.
* Playbooks run for Cloud SIEM automation can contain both enrichment and notification actions. Playbooks can also be nested. So, for example, you could define a playbook that is executed automatically when an Insight is created that gathers enrichment data. And if the data returned includes a malicious threat indicator:
  1. Changes the Insight state to “In Progress”.
  1. Assigns the Insight.
  1. Sends a (customized) email with information about the Insight and indicator.
  1. Creates a Slack channel for the Insight.
  1. Invites certain people to the Slack channel.

:::note
* Cloud SIEM automation is intended to replace the legacy [Cloud SIEM Actions](/docs/cse/administration/create-cse-actions) and the [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/). All of the actions and integrations provided with those capabilities are included in the Automation Service (though some may require “on-premise” deployment through the [bridge](/docs/platform-services/automation-service/automation-service-bridge)). Those capabilities will be deprecated later in 2023. See [Migrate from legacy actions and enrichments to the Automation Service](/docs/cse/automation/automations-in-cloud-siem/#migrate-from-legacy-actions-and-enrichments-to-the-automation-service).
* Actions can run directly from the Sumo Logic cloud or from other environments via a [bridge](/docs/platform-services/automation-service/automation-service-bridge/). For security and performance reasons, only certified integrations and actions can run directly from the Sumo Logic cloud environment.
* The Automation Service is not available in FedRAMP environments at this time.
:::

## Access the Automation Service from Cloud SIEM

An [automation in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem) runs a playbook in the Automation Service, which runs actions that are provided by integrations. This section shows you how to access each of these elements in the [Automation Service](/docs/platform-services/automation-service/). 

:::info
Before you can access the Automation Service from Cloud SIEM, you must first [configure role capabilities](#configure-role-capabilities-for-cloud-siem-automation).
:::

1. To access the Automation Service from Cloud SIEM:
   1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
   1. Under **Integrations**, select **Automation**.<br/><img src={useBaseUrl('img/cse/automations-config-menu.png')} alt="Automation menu option" width="150"/><br/>The list of available Cloud SIEM automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
   1. At the top of the screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="400"/> <br/>The Automation Service screen displays: <br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" width="800"/>
     :::note
     You can also launch the Automation Service by selecting **Automation** from the main menu: <br/><img src={useBaseUrl('img/cse/automation-menu-in-nav-bar.png')} alt="Automation menu option in the nav bar" width="200"/> <br/>If you also have Cloud SOAR installed, a **Cloud SOAR** option appears instead, since all automation services are provided by Cloud SOAR when it installed in conjunction with Cloud SIEM.
     :::
1. Now that you are in the Automation Service, let's explore a little to see how playbooks run actions that are provided by integrations. Open a [playbook](/docs/platform-services/automation-service/automation-service-playbooks) to see the actions it runs. Click an action to view the integration resource that provides it. In the example below, notice that in the **Send Insight Slack Notification** playbook, the **Slack resource** provides the **Get User** action.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" width="800"/>
1. Now that we know the resource that provides the action, let's look for the integration that contains that resource. In our case, we're looking for the integration with the Slack resource. Click [**Integrations**](/docs/platform-services/automation-service/automation-service-integrations) in the left navigation bar.<br/><img src={useBaseUrl('img/cse/automations-integrations-list.png')} alt="Integrations list" width="800"/>
1. If we open the **Slack** integration, we see the **Get User** action used in the **Send Insight Slack Notification** playbook. Now you know how integrations provide actions that are run in playbooks. <br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" width="700"/>

To learn how to create automations in Cloud SIEM that run playbooks from the Automation Service, see [Automations in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem).

## Prerequisites to run the Automation Service for Cloud SIEM

### Configure role capabilities for Cloud SIEM automation

Access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. 
1. In the left navigation bar of Sumo Logic, select **Administration > Users and Roles**.
1. Click the **Roles** tab. 
1. Click **Add Role** to create a new role for users of Cloud SIEM automation. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
1. Add the following capabilities:
   * **Cloud SIEM**
     * **Configuration**
       * **View Automations**
       * **Manage Automations**
       * **Execute Automations**
1. [Add Automation Service role capabilities](/docs/platform-services/automation-service/about-automation-service/#configure-role-capabilities). 
1. Follow the directions to [access the Automation Service](#access-the-automation-service-from-cloud-siem) to verify that you can see the **Automation** option in the **Configuration** menu.

## Support and compliance

### API and Terraform support

The [Cloud SIEM API](/docs/cse/administration/cse-apis/) supports automations. Endpoints include:
* `GET /automations`. Get the list of automations
* `POST /automations`. Create an automation
* `POST /automations/execute`. Run one or more automations against one or more Entities/Insights
* `DELETE /automations/{id}`. Delete an automation
* `GET /automations/{id}`. Get a specific automation
* `PUT /automations/{id}`. Update a specific automation

The Sumo Logic Terraform provider also supports automation, but does not support the ability to create or modify integrations, playbooks, or actions. For more information about Terraform, see the [Sumo Logic Terraform](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs) documentation.

:::note
The Automation Service uses the [Cloud SOAR API](/docs/api/cloud-soar/). 
:::

### Data retention

Cloud SIEM automation data is retained in accordance with Sumo Logic's policies. For more information, see [Cloud SIEM Data Retention](/docs/cse/administration/cse-data-retention).

