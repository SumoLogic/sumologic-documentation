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

The Automation Service is a subset of automation capabilities adapted from Cloud SOAR that is available to the entire Sumo Logic log analytics platform. For more information, see [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).

## Benefits

* The Automation Service supports enrichment, notification, containment, user choice, and custom actions in Cloud SIEM. 
* Enrichment actions can be used to gather additional information about an entity or insight, including threat indicators.
* Notification actions can be used to send notifications or update status in systems like Cloud SIEM, the Sumo Logic core platform, Slack, Microsoft Teams, Jira, email, and so on.
* Automations can be triggered automatically when an insight is created or closed. For example, you could define a playbook that is executed automatically when an insight is created that gathers enrichment data. And if the data returned includes a malicious threat indicator:
  1. Changes the insight state to “In Progress”.
  1. Assigns the insight.
  1. Sends a (customized) email with information about the insight and indicator.
  1. Creates a Slack channel for the insight.
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
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Automation**. You can also click the **Go To...** menu at the top of the screen and select **Automation**. <br/>The list of available Cloud SIEM automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" style={{border: '1px solid gray'}} width="800"/>
   1. At the top of the screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} alt="Manage Playbooks menu option" width="300"/> <br/>The Automation Service screen displays: <br/><img src={useBaseUrl('img/cse/automations-playbook-list.png')} alt="Automation Playbook list" style={{border: '1px solid gray'}} width="800"/>
     :::note
     You can also launch the Automation Service by selecting **Automation** from the main menu: <br/><img src={useBaseUrl('img/cse/automation-menu-in-nav-bar.png')} alt="Automation menu option in the nav bar" style={{border: '1px solid gray'}} width="200"/> <br/>If you also have Cloud SOAR installed, a **Cloud SOAR** option appears instead, since all automation services are provided by Cloud SOAR when it installed in conjunction with Cloud SIEM.
     :::
1. Now that you are in the Automation Service, let's explore a little to see how playbooks run actions that are provided by integrations. Open a [playbook](/docs/platform-services/automation-service/automation-service-playbooks) to see the actions it runs. Click an action to view the integration resource that provides it. In the example below, notice that in the **Send Insight Slack Notification** playbook, the **Slack resource** provides the **Get User** action.<br/><img src={useBaseUrl('img/cse/automations-action-example.png')} alt="Action example" style={{border: '1px solid gray'}} width="800"/>
1. Now that we know the resource that provides the action, let's look for the integration that contains that resource. In our case, we're looking for the integration with the Slack resource. Click [**Cloud SIEM > Integrations**](/docs/platform-services/automation-service/automation-service-integrations) in the left navigation bar.
1. If we open the **Slack** integration, we see the **Get User** action used in the **Send Insight Slack Notification** playbook. Now you know how integrations provide actions that are run in playbooks. <br/><img src={useBaseUrl('img/cse/automations-resource-example.png')} alt="Resource example" style={{border: '1px solid gray'}} width="700"/>

To learn how to create automations in Cloud SIEM that run playbooks from the Automation Service, see [Automations in Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem).

## Prerequisites to run the Automation Service for Cloud SIEM

### Configure role capabilities for Cloud SIEM automation

Access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. 
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Users and Roles**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu click **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**. 
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
* `POST /automations/execute`. Run one or more automations against one or more entities/insights
* `DELETE /automations/{id}`. Delete an automation
* `GET /automations/{id}`. Get a specific automation
* `PUT /automations/{id}`. Update a specific automation

The Sumo Logic Terraform provider also supports automation, but does not support the ability to create or modify integrations, playbooks, or actions. For more information about Terraform, see the [Sumo Logic Terraform](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs) documentation.

:::note
The Automation Service uses the [Cloud SOAR API](/docs/api/cloud-soar/). 
:::

### Data retention

Cloud SIEM automation data is retained in accordance with Sumo Logic's policies. For more information, see [Cloud SIEM Data Retention](/docs/cse/administration/cse-data-retention).

