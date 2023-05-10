---
id: automation-service-use-cases
title: Use Cases
sidebar_label: Use Cases
description: Learn use cases to create automations for different situations.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

Following are use cases that describe how to create automations for different situations.

## Use case: Enable a simple enrichment

The following example adds a simple enrichment using the “IP Reputation V3” action from VirusTotal:

1. Edit the VirusTotal OIF resource:
   1. Click the **Configuration** button (gear icon) at the top of the UI.
   1. Under **Integrations**, select **Automation**.
   1. From the Automation screen, click **Manage Playbooks**.
   1. Click **Integrations** in the navigation menu.
   1. Select **VirusTotal OIF**.
   1. Hover your mouse over the resource name and click the Edit button that appears.
   1. Enter the **API URL**: https://www.virustotal.com
   1. Enter the **API Key**. See the [VirusTotal documentation](https://support.virustotal.com/hc/en-us/articles/115002100149-API) to learn how to obtain the API key. If you do not already have a VirusTotal account, you need to create one to get an API key. 
   1. Click **Save**.
1. Create the playbook:
   1. Click **Playbook** in the navigation menu.
   1. Click the **+** button to the left of **Playbook**.
   1. Give your playbook a **Name**. 
   1. For **Type**, enter **CSE**. 
   1. Enter a **Description**.
   1. Click **Create**.
1. Add the “IP Reputation V3” action to the playbook:
   1. Click the **Edit** button (pencil icon) at the bottom of the playbook view.
   1. Click the **Edit** button (pencil icon) on the **START** node.
   1. Select **Insight** from the dropdown menu and click **UPDATE**.
   1. Click the **Add Node** button (**+** icon) on **START**.
   1. Sele**ct **Action**.
   1. For **Integration**, select **VirusTotal OIF**.
   1. Ensure that **Type** is **Enrichment**.
   1. For **Action**, select **IP reputation V3**.
   1. To the right of the **IPs** field click the gear icon.
   1. Click **Playbook inputs** and select **input.entity.value**.
   1. Click **Create**. 
1. Add an enrichment action to the playbook:
   1. Hover your mouse over the **IP reputation V3** node and click the **Add Node** button (**+** icon).
   1. Select **Action**.
   1. For **Integration**, select **CSE Tools**.
   1. For **Type**, select **Notification**.
   1. For **Action**, select **Add Insight Enrichment**.
   1. To the right of the **Insight ID** field click the gear icon.
   1. Click **Playbook inputs** and select **input.readableId**.
   1. In the **Enrichment name** field enter **VirusTotal IP reputation**.
   1. To the right of the **Raw JSON** field click the gear icon.
   1. Click **IP reputation V3** and select **output.raw**.
   1. Click **Create**. 
   1. Click and hold on the right semicircle of the new **Add Insight Enrichment** node and drag to the semicircle of the **END** node and release. The playbook is complete.
1. Save the playbook:
   1. Click on the **Save** button (floppy disk icon) at the bottom of the playbook view.
   1. Click the **Publish** button (clipboard icon) at the bottom of the playbook view.
1. Create an automation to run the playbook:
   1. Return to the main Cloud SIEM screen.
   1. Click the **Configuration** button (gear icon) at the top of the UI.
   1. Under **Integrations**, select **Automation**.
   1. At the top of the automations screen, click **New Automation**. 
   1. For **Playbook**, select the playbook you created in the previous steps.
   1. For **Expects attributes for**, select **Insight**.
   1. For **Executes when**, select **Manually Done**.
   1. Click **Add to List**.
1. Run the automation:
   1. Select **Insights** from the main Cloud SIEM screen.
   1. Select an Insight.
   1. Click the Actions button.
   1. Under **Insight Automation**, select the automation you created in the previous step (it will have the same name as the playbook). The playbook runs.
   1. To see the results of the run, click the **Automations** tab at the top of the Insight.
   1. View the **Status** field to find out if the playbook has a status of Success or another status such as **Completed with errors**. 
   1. Click **View Playbook** to see details of the playbook run. Each node in the playbook will show either **Success** or **Failed**. 
   1. Click a node to download results of that node’s run.


