---
id: automation-service-automations
title: Automations
sidebar_label: Automations
description: Learn how automations run playbooks to add enrichments and create notifications for either Insights or Entities.  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

Automations run playbooks to add enrichments and create notifications for either Insights or Entities. You can set automations to run automatically when Insights are created or closed, or you can run them manually.

## View automations
1. Click the **Configuration** button (gear icon) at the top of the UI.
1. Under **Integrations**, select **Automation**.
1. View the list of available automations. (If no automations display, you must first [create an automation](#create-an-automation)).<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/> 

To view the automations that have run on Insights or Entities, see [View results of an automation](#view-results-of-an-automation).

## Create an automation

The following procedure provides a brief introduction to how to create an automation. For detailed examples, see [Automation examples](/docs/cse/automation-service/automation-service-examples/).

1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
1. Under **Integrations**, select **Automation**.
1. At the top of the automations screen, click **New Automation**.  (To modify an existing automation, click on the edit icon for the corresponding automation.)<br/><img src={useBaseUrl('img/cse/automations-automations-list.png')} alt="Automations list" width="800"/>
1. In the **New Automation** dialog, select a **Playbook** from the drop-down list. The playbook must be defined, and its type must be set to **CSE** before associating it with an automation. (You can set the type as **CSE** when you [create a new playbook](/docs/cse/automation-service/automation-service-playbooks#create-a-new-playbook).)<br/><img src={useBaseUrl('img/cse/automations-new.png')} alt="New Automation" width="400"/>
1. In **Expects attributes for** select whether the playbook will run on an **Entity** or **Insight**. This defines what data payload will be sent to the playbook from Cloud SIEM. 
1. If **Entity** is selected, in the **Type** field select one or more Entity types. The playbook will only execute on the Entity types selected. 
1. Select one or more **Executes when** Insight triggers: **Insight Created**, **Insight Closed**, or **Manually Done**. If **Manually Done** is not selected, the automation will not appear in any **Actions** menu on Insights or **Automations** menus on Entities.
1. Set the **Status**. Disabled automations will not run automatically and will not appear in any **Actions** or **Automations** menus.
1. Click **Add to List** (or **Update** if editing an existing automation).

## Run an automation automatically

If an automation is set to run when an Insight is created or closed, it runs automatically provided that:
* The automation is enabled, 
* The automation is configured to run on the trigger(s), and 
* The automation is an Insight automation, or
* The automation is an Entity automation, and the Insight contains one or more Entities of the Entity types configured in the automation (this includes the primary and any related Entities).

## Run an automation manually

### Run an automation manually on Insights

Automations can be run manually from the **Actions** drop-down menu on [Insight details](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui#insight-details-page) pages:

<img src={useBaseUrl('img/cse/automations-actions-menu.png')} alt="Automations on the Actions menu" width="200"/>

You will see three sections in the **Actions** menu:
* **Insight Automation**. Displays a list of all enabled Insight automations configured to run manually.
* **Entity Automation**. Displays a **Run Automations** option. Click **Run Automations** to open a dialog enabling you to select one or more Entity automations to run (see below).
* **Insight Actions**.  Displays a list of all valid legacy Insight Actions.

### Run an automation manually on Entities

On [Entity details](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) pages, Entity Automations can be run manually from the **Automations** drop-down menu:

<img src={useBaseUrl('img/cse/automations-entity-automations-menu.png')} alt="Automations menu on an Entity" width="250"/> 

:::tip
You can run the same automation more than once for a given Entity or Insight, but not at the same time. Additional attempts to run an automation while an instance is running will result in an error.
:::

### Select Entities to run the automation on

On an Insight, if you select **Actions** > **Entity Automation > Run Automations**, you will be prompted to select one or more of the Entities included in the Insight:

<img src={useBaseUrl('img/cse/automations-entity-menu.png')} alt="Entity Automation menu" width="400"/>

1. Select one or more of the Entities listed or select **Select All Entities**. The selected Entities don’t have to be the same type. 
1. Click **Next**. A list displays of all Entity automations that are enabled, configured to be run manually, and configured for at least one of the Entity types you selected on the previous screen. 
1. Select the automations you wish to run and click **Run Automation**. The automations will run. The system will automatically run the appropriate automations for the appropriate Entity Types.
<img src={useBaseUrl('img/cse/automations-entity-menu-2.png')} alt="Entity Automation menu with selections" width="400"/>

In this example:
   * The CarbonBlack automation is configured for IP Addresses, Email Addresses, and Domain Names, so it will run four times (once for the Email Address and once for each IP Address selected on the previous screen).
   * The nslookup automation is configured to only run on IP Addresses so it will run three times.
   * No automation will run on the Hostname.

## View results of an automation

If an automation is set to run when an Insight is created or closed, it [runs automatically](/docs/cse/automation-service/automation-service-automations#run-an-automation-automatically). You can also [run an automation manually](/docs/cse/automation-service/automation-service-automations#run-an-automation-manually). 

### View automations on Insights and Entities

When automations run, the results display on Insights and Entities.
1. Open an Insight or Entity.
1. Click **Automations** at the top of the screen. The example below shows automations that ran on an Insight. Each automation shows its result under **Status**. You can click **View Playbook** to see the playbook that the automation ran.<br/><img src={useBaseUrl('img/cse/automations-on-insight.png')} alt="Automations on an Insight" width="800"/>

While viewing an Insight or Entity, you can [run automations manually](#run-an-automation-manually).
 
### View enrichments provided by automations

When automations run, they can provide enrichments to Insights, Entities, and Signals. 
1. Open an Insight, Entity, or Signal with enrichments provided by an automation. 
1. Click **Enrichments** at the top of the screen.
1. If [threat indicators are set by the enrichment](/docs/cse/integrations/enrichments-and-indicators#threat-indicators), they are displayed. The following example shows a **Malicious** threat indicator.<br/><img src={useBaseUrl('img/cse/automations-malicious-threat-indicator.png')} alt="Threat indicator example" width="800"/> 


## View an automation's status

After [running an automation](#run-an-automation-automatically), you can go to the **Automations** tab for the Insight or Entity to view the automation's  status.  

<img src={useBaseUrl('img/cse/automations-execution-status.png')} alt="Automations execution status" width="800"/>

On each card you will find:
* The time and date when the automation was run.
* The name and description of the associated playbook.
* The playbook’s current status.
* A link to **View Playbook** in the Automation Service UI.

:::note
You may have to manually refresh this screen to see the most current status.
:::

If you click **View Playbook**, the Automation Service UI will open to the playbook status page:

<img src={useBaseUrl('img/cse/automations-playbook-status.png')} alt="Playbook status" width="600"/>

You can switch to the graphical view by clicking **Graph** in the upper-right corner:

<img src={useBaseUrl('img/cse/automations-playbook-status-graph.png')} alt="Playbook status graph" width="600"/>
