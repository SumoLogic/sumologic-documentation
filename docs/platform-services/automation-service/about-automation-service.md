---
id: about-automation-service
title: About the Automation Service
sidebar_label: About
description: Get an overview of how the Automation Service allows you to automate actions. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ActionsLimitQuery from '../../reuse/actions-limit-query.md';
import StaticIpAddresses from '../../reuse/static-ips-automation-service.md';

The Automation Service allows you to set up actions that run automatically when certain conditions are met in Sumo Logic. These automated actions help you to respond quickly to a wide arrange of events. 

To use the Automation Service, execute playbooks to run actions in a workflow. Actions are provided by integrations with Sumo Logic and third-party vendors. The Automation Service has number of integrations, actions, and playbooks that you can customize. You can also create your own.

## Where you can run automations

You can use the Automation Service to run automations for the following:
* **Monitors**. Use [automated playbooks in monitors](/docs/alerts/monitors/use-playbooks-with-monitors) to run workflows in response to alerts. 
* **Cloud SIEM**. Use the [Automation Service with Cloud SIEM](/docs/cse/automation/about-automation-service-and-cloud-siem) to respond to security incidents.
* **Cloud SOAR**. Use [automation](/docs/cloud-soar/automation/) for incident management and triage. 

## Differences compared to Cloud SOAR

The Automation Service is a subset of automation capabilities adapted from [Cloud SOAR Automation](/docs/cloud-soar/automation/) that is available to the entire Sumo Logic log analytics platform. The Automation Service only has Cloud SOAR’s playbook-related features, including App Central and the Automation Bridge. Like the Cloud SOAR action types, the Automation Service action types can perform automated responses to events, including run containment actions and manual user interaction steps. 

The Automation Service differs from Cloud SOAR in the following ways:
* The Automation Service does not include the incident and case management features from Cloud SOAR.
* The Automation Service does not support daemon and trigger action types. The Automation Service can only use triggers built into Cloud SIEM and the Log Analytics platform. 
* Playbooks, integrations, and actions in the Automation Service may differ from those in Cloud SOAR automation. 

For more information, see [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).

## Automation Service UI

The Automation Service UI is composed of the following tabs:
* [**App Central**](/docs/platform-services/automation-service/automation-service-app-central). Displays a central repository of integrations and playbooks you can install to your environment.<br/><img src={useBaseUrl('img/platform-services/app-central-main-screen.png')} style={{border:'1px solid gray'}} alt="App Central screen" width="800"/> 
* [**Playbook**](/docs/platform-services/automation-service/automation-service-playbooks). Shows playbooks, which are workflows you can run to perform automations. <br/><img src={useBaseUrl('img/platform-services/playbook-main-screen.png')} style={{border:'1px solid gray'}} alt="Playbook screen" width="800"/>
* [**Integration**](/docs/platform-services/automation-service/automation-service-integrations.md). Lists integrations with Sumo Logic and third-party vendors that provide actions used in playbooks. <br/><img src={useBaseUrl('img/platform-services/integrations-main-screen.png')} style={{border:'1px solid gray'}} alt="Integrations screen" width="800"/>
* [**Bridge**](/docs/platform-services/automation-service/automation-service-bridge.md). Shows connections between on-premises servers and the Sumo Logic cloud. A bridge allows you to create a custom integration in your own system and use it to for automation. <br/><img src={useBaseUrl('img/platform-services/bridge-main-screen.png')} style={{border:'1px solid gray'}} alt="Bridge screen" width="800"/>

### Theme

import Theme from '../../reuse/dark-light-theme.md';

<Theme/>

## Access the Automation Service

:::info
Before you can access the Automation Service, you must first [configure role capabilities](#configure-role-capabilities).
:::

### From the Sumo Logic screen

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  
1. The **Playbook** screen is displayed. <br/><img src={useBaseUrl('img/platform-services/playbook-main-screen.png')} alt="Playbook screen" style={{border: '1px solid gray'}} width="800"/>

### From Cloud SIEM

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the Cloud SIEM top menu select **Configuration**, and then under **Integrations** select **Automation**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Automation**. You can also click the **Go To...** menu at the top of the screen and select **Automation**.  <br/>The list of available automations appears. Each automation runs a playbook.<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} style={{border:'1px solid gray'}} alt="Automations list" width="800"/>
1. At the top of the screen, click **Manage Playbooks**.<br/><img src={useBaseUrl('img/cse/automations-manage-playbooks.png')} style={{border:'1px solid gray'}} alt="Manage Playbooks menu option" width="300"/>
1. The Automation Service screen opens on the **Playbook** tab. <br/><img src={useBaseUrl('img/platform-services/playbook-main-screen.png')} alt="Playbook screen" style={{border: '1px solid gray'}} width="800"/>

## Prerequisites

### Configure role capabilities

Access to the Automation Service is controlled by [role capabilities](/docs/manage/users-roles/roles/role-capabilities) in the Sumo Logic platform. To get access to the Automation Service:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Administration > Users and Roles** and select the **Roles** tab. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Users and Roles** select **Roles**. You can also click the **Go To...** menu at the top of the screen and select **Roles**.  
1. Click **Add Role** to create a new role for users of the Automation Service. Alternatively, you can select an existing role in the **Roles** tab and click **Edit**.
1. Add the following capabilities:
   * **Automation Service**
      * **Task View**
      * **Task Access**
      * **Task Access all**
      * **Task Edit**
      * **Task Reassign**
      * **App Central Access**
      * **App Central Export**
      * **Integrations Access**
      * **Integrations Configure**
      * **Playbooks Access**
      * **Playbooks Configure**
      * **Bridge Monitoring Access**
      * **Observability Access**
      * **Observability Configure**

### Configure the connection for an integration resource

To use [integrations](/docs/platform-services/automation-service/automation-service-integrations), you must configure the connection for their resources.

See [Configure authentication for integrations](/docs/platform-services/automation-service/configure-authentication-for-integrations/).

## Actions limit

To prevent abuse of system resources or runaway processes, the Automation Service limits the number of playbook actions your organization can execute to 350 per hour by default. To see how many actions your organization has used in the current hour, see the **Current hour actions count** in the [App Central UI](/docs/platform-services/automation-service/automation-service-app-central/#app-central-ui). All actions running in the cloud or via the bridge are included in this limit.

<ActionsLimitQuery/>

Each execution of Custom, Notification, Enrichment, Daemon, Scheduled, and Trigger Actions counts toward the actions limit. User Choice, IF, and Task actions do not count toward the actions limit.

## Static IP addresses

The following table provides the static IP addresses used for the Automation Service by deployment. These are provided in case you want to explicitly allow the IP addresses on the integrations you install.

<StaticIpAddresses/>
