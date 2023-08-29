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

## Migrate from legacy actions and enrichments to the Automation Service 

[Cloud SIEM Actions](/docs/cse/administration/create-cse-actions/) and the [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/) are deprecated because comparable behavior is now available in the Automation Service. To continue using the same functionality found in the legacy actions and enrichments, [use installed playbooks](#use-installed-playbooks) in the Automation Service, or [replace the legacy actions and enrichments](#replace-legacy-actions-and-enrichments) by adding the corresponding actions to playbooks you create in the Automation Service. 

Migrating to the Automation Service has many benefits over using legacy actions and enrichments. With the Automation Service, you can:
* Run actions in playbooks rather than singly.
* Use a library of direct cloud integrations.
* Run on platforms other than Windows if you’re running custom actions.
* Customize output.
* Have support for threat indicators. 

### Use installed playbooks 

Though you can create your own playbooks, the Automation Service provides the following playbooks with functionality that replaces legacy actions and enrichments:
* **Insight Full Enrichment**. Enriches the whole Insight with Recorded Future. It enriches both the primary and all the involved Entities by sorting them based on their Entity type. The playbook alerts you if a risky Entity is detected, and also adds tags to the Insight for easier identification. 
* **Entity Full Enrichment**. Determines the Entity type and uses the appropriate Recorded Future technology to enrich.
* **Enrich Entity with PowerShell Carbon Black**. Executes the PowerShell script to enrich with Carbon Black, adds the enrichment to the Entity, and sends an email if a risky score is detected.
* **Enrich Entity with PowerShell CrowdStrike**. Executes the PowerShell script to enrich with CrowdStrike, and adds the enrichment to the Entity.
* **Enrich Entity with PowerShell GreyNoise**. Executes the PowerShell script to enrich with GreyNoise, and adds the enrichment to the Entity.
* **Enrich Entity with PowerShell SentinelOne**: Executes the PowerShell script to enrich with SentinelOne, and adds the enrichment to the Entity.
* **Enrich Entity with PowerShell nslookup**. Performs nslookup in the local host where PowerShell is running, and adds the enrichment to the Entity.
* **Enrich Entity with PowerShell Whois**. Performs whois in the local host where PowerShell is running, and adds the enrichment to the Entity.
* **Enrich Entity with PowerShell User Query**: Performs a query on user in the local host where PowerShell is running, and adds the enrichment to the Entity.

### Replace legacy actions and enrichments

To continue getting the same behavior found in the legacy actions and enrichments, in addition to using installed playbooks, you can add the corresponding new actions to playbooks you create. 

For directions to add an action to a playbook, see [Add an action node to a playbook](/docs/cse/automation-service/automation-service-playbooks#add-an-action-node-to-a-playbook). For examples, see [Automation Examples](/docs/cse/automation-service/automation-service-examples). 

#### Legacy actions 

In place of the following legacy actions, use the corresponding actions from [integrations](/docs/cse/automation-service/automation-service-integrations/) in the Automation Service. 

Legacy action | Description | Corresponding action <br/>in the Automation Service | Additional instructions |
| :-- | :-- | :-- | :-- |
| AWS Simple Notification Service | Pushes Insight JSON to the AWS Simple Notification Service. | The **Send Message** action in the **AWS Simple Notification Service** integration. | NA| 
| Email | Sends email with Insight details to a list of recipients. The email includes the MITRE tactic and Insight link. | The **Send Email** action in the **Basic Tools** integration). | NA | 
| HTTP POST v2 | Allows you to send a full Insight in JSON format to any HTTP URL. | The **HTTP POST** action in the **HTTP Tools** integration. | NA | 
| Microsoft Teams | Sends a message to a Teams channel using a webhook URL. | The **Send Teams Message** action in the **Microsoft Teams** integration.| Create a node with the **Send Teams Message** action and configure it with the message content and the channel name to which the message must be sent. | 
| PagerDuty | Sends a  notification to PagerDuty.| The **Create New Incident** action in the **PagerDuty** integration. | NA | 
| Recorded Future | Performs IP, URL, and hash reputation, and pushes the enrichment in the Insight. | The **IP Reputation**, **URL Reputation**, and **File Reputation** actions in the **Recorded Future OIF** integration. | 1. Create a node with the reputation action needed. You can add a condition node before the action to automatically determine the reputation action based on the Entity type. <br/>2. Create another node with the **Add Insight Enrichment** action from the **CSE Tools** integration, and configure it to use as enrichment the `output.raw` from the previous node. | 
| Slack | Sends a message to a Slack channel. | The **Send Message** action in the **Slack** integration. | Create a node with the **Send Message** action and configure the node with the channel name to which the message must be sent. | 

#### Legacy enrichments

In place of the following legacy enrichments, use the corresponding actions from [integrations](/docs/cse/automation-service/automation-service-integrations/) in the Automation Service. 

| Legacy enrichment | PowerShell alternative in the Automation Service | Python alternative in the Automation Service | 
| :-- | :-- | :-- |
| [Carbon Black](/docs/cse/integrations/insight-enrichment-server/#carbonblack-enrichment)  | Use the **VMwareCarbon Black IP Enrichment** action from the **PowerShell Tools** integration. | Use the **Get Devices** action from the **VMware Carbon Black Cloud Platform** integration. | 
| [CrowdStrike](/docs/cse/integrations/insight-enrichment-server/#crowdstrike-enrichment) | Use the **Crowd Strike Falcon Enrichment** action from the **PowerShell Tools** integration. | Use the **List Endpoints** action from the **CrowdStrike Falcon** integration. | 
| [GreyNoise](/docs/cse/integrations/insight-enrichment-server/#greynoise-enrichment) | Use the **GreyNoise Enrichmen**t action from the **PowerShell Tools** integration. | Use the **Context IP Lookup** action from the **GreyNoise** integration. | 
| nslookup | Use the **DNS Lookup** action from the **PowerShell Tools** integration. | NA | 
| Query user | Use the **Query User** action from the **PowerShell Tools** integration. | NA | 
| [SentinelOne](/docs/cse/integrations/insight-enrichment-server/#sentinelone-enrichment) | Use the **SentinelOne Enrichment** action from **PowerShell Tools** integration. | Use the **List Agents** action from the **SentinelOne** integration. | 
| whois | Use the **Whois** action from the **PowerShell Tools** integration. | NA | 
| Custom scripts | Use the **Execute Commands** action from the **PowerShell Tools** integration to execute any command inside your PowerShell Windows host, including custom scripts. | NA | 
