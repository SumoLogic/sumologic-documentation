---
id: automation-service-use-cases
title: Use Cases
sidebar_label: Use Cases
description: Learn use cases to create automations for different situations.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

Following are use cases that describe how to create automations for different situations.

## Simple use case: Enable an enrichment

The following example adds an enrichment using the “IP Reputation V3” action from VirusTotal:

1. Edit the VirusTotal OIF resource:
   1. Click the **Configuration** button (gear icon) at the top of the UI.
   1. Under **Integrations**, select **Automation**.
   1. From the Automation screen, click **Manage Playbooks**.
   1. Click **Integrations** in the navigation menu.
   1. Select **VirusTotal OIF**.
   1. Hover your mouse over the resource name and click the Edit button that appears.
   1. Enter the **API URL**: `https://www.virustotal.com`.
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
   1. Select **Action**.
   1. For **Integration**, select **VirusTotal OIF**.
   1. Ensure that **Type** is **Enrichment**.
   1. For **Action**, select **IP reputation V3**.
   1. To the right of the **IPs** field, click the gear icon.
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

## Medium use case: Configure a notification for a log search

The following use case shows how to configure a notification to send an email with results of a log search in Sumo Logic core platform.

1. Edit the Sumo Logic CIP resource:
   1. Click the **Configuration** button (gear icon) at the top of the UI.
   1. Under **Integrations**, select **Automation**.
   1. From the Automation screen, click **Manage Playbooks**.
   1. Click **Integrations** in the navigation menu.
   1. Select **Sumo Logic CIP**.
   1. Hover your mouse over the resource name and click the **Edit** button that appears.
   1. Enter the **API URL** for your Sumo Logic core platform instance (for example, https://api.us2.sumologic.com). For the URL to use for your Sumo Logic instance, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security). 
   1. [Create an access key](/docs/manage/security/access-keys#create-your-access-key) and copy the resulting access ID and access key.
   1. Enter the **Access ID** and the **Access Key**. 
   1. Select your **Time Zone**.
   1. Click **Save**.
1. Create the playbook:
   1. Click **Playbook** in the navigation menu.
   1. Click the **+** button to the left of **Playbook**.
   1. Give your playbook a **Name**, such as **Notification for a log search**. 
   1. For **Type**, enter **CSE**. 
   1. Enter a **Description**.
   1. Click **Create**.
1. Add the "Search Sumo Logic" action to the playbook:
   1. Click the **Edit** button (pencil icon) at the bottom of the playbook view.
   1. Click the **Edit** button (pencil icon) on the **START** node.
   1. Select **Insight** from the dropdown menu and click **UPDATE**.
   1. Click the **Add Node** button (**+** icon) on **START**.
   1. Select **Action**.
   1. For **Integration**, select Sumo Logic CIP.
   1. Ensure that **Type** is **Enrichment**.
   1. For **Action**, select **Search Sumo Logic**.
   1. In the **Query** box enter the search query you want to make in the Sumo Logic core platform (for example,  `_sourceCategory=collection`). For help with queries, see [General Search Examples Cheat Sheet](https://help.sumologic.com/docs/search/search-cheat-sheets/general-search-examples/). 
   1. For **Last Period** select **1 Hour**.
   1. Click **Create**. 
1. Add the "Send Email" action to the playbook:
   1. Hover your mouse over the new **Search Sumo Logic** node.
   1. Click the **Add Node** button (**+** icon) at the bottom of the **Search Sumo Logic** node.
   1. Select **Action**.
   1. For **Integration**, select **Basic Tools**.
   1. Ensure that **Type** is **Notification**.
   1. For **Action** select **Send Email**. 
   1. In **Recipients** enter your email address and press Enter.
   1. For **Subject** type a subject line for the email (for example, "Results of Sumo Logic log search"). 
   1. In **Plain text content** enter the text you want to appear in the body of the email. For example, enter "Search in Sumo Logic was executed. Click the Automations tab at the top of the Insight for which the 'Notification for a log search' automation was run. Click 'View Playbook' to see the results."
   1. Copy the plain text content into **HTML content** and add formatting if desired.
   1. Click **Create**. 
   1. Click and hold on the right semicircle of the new **Send Email** node and drag to the semicircle of the **END** node and release. The playbook is complete.
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
   1. Click the **Actions** button.
   1. Under **Insight Automation**, select the automation you created in the previous step (it will have the same name as the playbook). The playbook runs.
   1. To see the results of the run, click the **Automations** tab at the top of the Insight.
   1. View the **Status** field to find out if the playbook has a status of **Success** or another status such as **Completed with errors**. 
   1. Click **View Playbook** to see details of the playbook run. Each node in the playbook will show either **Success** or **Failed**. 
   1. Click a node to download results of that node’s run.


## Custom use case: Configure a custom action to run a local script

The following example shows how to create an integration with a custom action that runs a script you provide. The custom action uses [IP Quality Score](https://www.ipqualityscore.com/) to gather IP reputation information for enrichment. 

1. [Install the Automation Service Bridge](/docs/cse/automation-service/automation-service-bridge/). Because this example uses a custom action, you must first install the Bridge before you proceed.
1. Obtain an API key from IP Quality Score:
    1. Create a free account on [IP Quality Score](https://www.ipqualityscore.com/create-account).
    1. Log in.
    1. Go to your [account settings](https://www.ipqualityscore.com/user/settings) and  copy the **API Key**. You will use this key later.
1. Create a new IP Quality Score integration:
    1. Click the **Configuration** button (gear icon) at the top of the UI.
    1. Under **Integrations**, select **Automation**.
    1. From the Automation screen, click **Manage Playbooks**.
    1. Click **Integrations** in the navigation menu.
    1. Click the **+** icon at the top of the screen to the left of **Integrations**. The **New Integration** dialog appears. 
    1. Download this file: <a href="https://help.sumologic.com/files/IP-Quality-Score-Test.yaml" target="_blank">IP-Quality-Score-Test.yaml</a>   
    1. Drag the file into the **Select File** box in the **New Integration** dialog.
    1. Click **Upload**. An IP Quality Score integration is created.
    1. Open the new **IP Quality Score** integration. 
    1. Hover your mouse over the **IP Quality Score** name and click the **Upload** button that appears.
    1. In the **Upload** dialog, select **Action** in the **kind** field. 
    1. Download this file: <a href="https://help.sumologic.com/files/IP-Reputation.yaml" target="_blank">IP-Reputation.yaml</a> 
    1. Drag the file into the **Select File** box in the **New Integration** dialog. 
    1. Click **Upload**. The **IP Reputation** action appears in the IP Quality Score integration.
1. Add the IP Quality Score integration resource:
    1. Click the **+** button to the left of **Resources**. 
    1. Fill out the **Add Resource** dialog:
    * **Label**: Enter **IP Quality Score Resource**.
    * **API URL**: Enter **https://www.ipqualityscore.com/**
    * **API Key**: Enter the API key you previously obtained from IP Quality Score.
    * **Connection Timeout (s)**: Leave the default value at **120**.
    * **Automation engine**: Select the Automation Bridge you installed locally as described in the first step of this example. 
    * **Proxy options**: Select **Use no proxy**.
    1. Click **Save**. The IP Quality Score Resource appears in the integration.
1. Create the playbook:
    1. Click **Playbook** in the navigation menu.
    1. Click the **+** button to the left of **Playbook**.
    1. Give your playbook a **Name**, such as **Custom Enrichment with IP Quality Score**.
    1. For **Type**, select **CSE**. 
    1. Enter a **Description**.
    1. Click **Create**.
1. Select the input parameters for the playbook:
    1.Click the **Edit** button (pencil icon) at the bottom of the playbook view.
    1. On the **Start** node, click the **Edit** button (pencil icon).
    1. In the **Edit node** dialog, select **Insight** in the **Add one or more params as a playbook input** field. (You could also select **Entity**, but choose **Insight** for the purposes of this example.)
    1. Click the **Remove** button (trash can icon) to remove any parameters you don’t want to use as inputs for the playbook. 
    1. Click **Update**. 
1. Add the “IP Reputation” action to the playbook:
    1. Click the **Add Node** button (**+** icon) on the **START** node.
    1. In the **Add node** dialog, click **Action**. 
    1. In the **Integration** field, select **IP Quality Score**.
    1. In the **Action** field, select **IP Reputation**.
    1. To the right of the **IP** field, click the gear icon. 
    1. Click **Playbook inputs**. 
    1. Select **input.entity.value**. 
    1. Click **Create**. The **IP Reputation** node is added to the playbook.
1. Add the “Add Insight Enrichment” action to the playbook:
    1. Hover your mouse over the new **IP Reputation** node.
    1. Click the **Add Node** button (**+** icon) at the bottom of the **IP Reputation** node.
    1. In the **Add node** dialog, click **Action**.
    1. In the **Integration** field, select **CSE Tools**.
    1. In the **Type** field, select **Notification**.
    1. In the **Action** field, select **Add Insight Enrichment**.
    1. To the right of the **Insight ID** field, click the gear icon.
    1. Click **Playbook inputs**. 
    1. Select **input.id**.
    1. In the **Enrichment name** field, enter the name of your playbook, for example, **Custom Enrichment with IP Quality Score**.
    1. To the right of the **Raw JSON** field, click the gear icon. 
    1. Click **IP Reputation**.
    1. Select **output.raw**.
    1. Click **Create**. The **Add Insight Enrichment** node is added to the playbook. 
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
    1. Select an **Insight**.
    1. Click the **Actions** button.
    1. Under **Insight Automation**, select the automation you created in the previous step (it will have the same name as the playbook). The playbook runs.
    1. To see the results of the run, click the **Automations** tab at the top of the Insight.
    1. View the **Status** field to find out if the playbook has a status of **Success** or another status such as **Completed with errors**. 

