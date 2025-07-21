---
id: intro-to-automation-service
title: Introduction to the Automation Service
sidebar_label: Introduction
description: Get an introduction to the Automation Service. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

The Sumo Logic Automation Service is a key set of automation features integrated with Sumo Logic's Log Analytics Platform and Cloud SIEM. Automations allow you to set up actions to run automatically when certain conditions are met. Automated actions allow your organization to respond quickly and without necessarily needing human input to a wide array of security events and incidents. Automated actions can include integrations provided by Sumo Logic as well as third-party vendors. Actions can be customized, and you can create your own as well.

The Automation Service is a subset of automation capabilities adapted from Sumo Logic Cloud SOAR which are available to all Sumo Logic users even if you are not a Cloud SOAR customer.

The Automation Service differs from Cloud SOAR in the following ways:
* The Automation Service does not include the incident and case management features from Cloud SOAR.
* The Automation Service does not support daemon and trigger action types. The Automation Service can only use triggers built into Cloud SIEM and the Log Analytics platform.
* Playbooks, integrations, and actions available in the Automation Service may differ from those in Cloud SOAR automation.

For full information on feature differences, see [Cloud SOAR Compared to the Automation Service](/docs/cloud-soar/compared-to-automation-service/).

In this article, we will walk you through how the Automation Service works, and you'll have the opportunity to go through some exercises to create automations.

## Why automate?

Automations are a key feature of Sumo Logic's log analytic and security products that can help manage insights and alerts without a lot of manual effort. Automations are composed of "smart actions" such as enrichments and notifications that can be automatically triggered under a set of circumstances, such as an insight being created or closed. Sumo Logic Automations use playbooks, a pre-defined set of actions in a linear or branching workflow to execute when the proper circumstances arise. 

There are several reasons you might want to automate some security tasks:
* **Faster responses**. Automating parts of your SOC can mean faster response times.
* **Consolidate tools**. Orchestrate all your security tools in one location with integrations and custom APIs.
* **Close the skills gap**. Analysts of all skill levels can deploy playbooks. Veteran analysts can spend more time on threat hunting.

Typically, playbooks can be used in Cloud SIEM to help partially or fully automate one or more steps of the incident response cycle. 

<img src={useBaseUrl('img/cloud-soar/incident-response-cycle.png')} alt="Incident response cycle" width="600"/>

### Automation with alerts and monitoring

Automations and playbooks can also be used within Sumo Logic's Log Analytics Platform as a response to incidents or alerts.  For instance, a monitor that detects suspicious behavior can generate an alert, and also automatically run a playbook to respond to the event.

:::sumo Micro Lesson
You can learn more about automation with monitors and alerts by watching this video.

<Iframe url="https://fast.wistia.net/embed/iframe/8z9b2zqtc3?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: AI-driven Alerting Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## App Central integrations and playbooks

App Central is a central repository of out-of-the-box solutions that can help any organization get going with automations quickly without needing customization or development. The Automation Service comes with hundreds of pre-built playbooks, integrations, and use cases as part of App Central. 

<img src={useBaseUrl('img/platform-services/automation-service/intro-app-central.png')} alt="App Central screen" style={{border: '1px solid gray'}} width="800" />

As a Sumo Logic administrator, you can explore App Central and install any integrations your team requests. You can also create custom integrations using APIs from the Integrations page. These integrations will connect Automation Service features to other tools like CrowdStrike, ServiceNow, or Jira. Once all your tools are integrated, App Central can be a single, central location for orchestrating your security response. 

<img src={useBaseUrl('img/platform-services/automation-service/intro-integrations.png')} alt="Integrations screen" style={{border: '1px solid gray'}} width="800" />

## Explore the Automation Service UI

Let's check out the Automation Service UI and learn about installing and configuring integrations. 

1. Navigate to the Automation Service main interface. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Automation** and then and click **App Central** in the left navigation bar. [**New UI**](/docs/get-started/sumo-logic-ui). To access App Central, in the main Sumo Logic menu select **Automation > App Central**. You can also click the **Go To...** menu at the top of the screen and select **App Central**.
1. The App Central integrations page shows a long list of installed and available integrations to augment Automation Service functionality with both Sumo Logic and third-party vendor functionality. <br/><img src={useBaseUrl('img/platform-services/automation-service/intro-explore-ui-integrations.png')} alt="Integrations in App Central" style={{border: '1px solid gray'}} width="700" />
1. Choose a sample integration from the list and click on it. A popup window will appear showing the details of the integration, including version, description, and a list of "actions" that are supported in automations.
1. Navigate to the Integrations view to show installed integrations. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**. 
1. In this view, you can see the integrations that have already been installed and configured in the system.<br/><img src={useBaseUrl('img/platform-services/automation-service/intro-explore-ui-installed-integrations.png')} alt="Installed integrations" style={{border: '1px solid gray'}} width="600" />
1. Locate an integration called Incident Tools in the list and click on it. The panel on the right will show the integration details, including available actions. Many integrations after install will require appropriate configuration using "resources".
1. Move the mouse cursor over the existing resource called "Incident Tools" resource, then click the "Edit" (pencil) icon. You will see a dialog showing the configuration fields for this resource.
     :::note
     When you create a resource or configure an existing one, you will need to enter the appropriate connection information such as the API web URL (for either Sumo Logic or a third-party service) and associated API keys. Many Sumo Logic integrations will require you to create an Access ID and Access Key through the Sumo Logic UI to use in configuring integrations. Some third party integrations may require you to visit their website and sign up for an account in order to obtain the appropriate URL and/or credentials for their API.
     :::
1. Click the Test button after you have configured the resource to test the connection info. You will see a small popup that indicates whether the test was successful (may take a few seconds to execute depending on the integration).

## Playbooks

Once you’ve identified a potential security incident, you can respond to it by executing a playbook. Playbooks are automated, or partially automated, workflows that act based on information from an incident or alert. A playbook can enrich data, contain threats, notify teams, and other actions with custom APIs. These actions help automatically orchestrate many parts of the investigation, containment, eradication, and recovery processes.

Custom playbooks allow you to automate any task that uses a custom API. You can also use them to automate tasks that aren’t part of the hundreds of default playbooks included in the Automation Service.

Playbooks are made up of nodes which are connected together in a flowchart. Whether you’re customizing a playbook or creating one from scratch, you have several node options:

Actions. Enrich data, execute APIs, send notifications, or use other integrations. 
Conditions. If-then statements that allow playbooks to branch in different directions.
Tasks. Assign a manual task to another user.
Filter. Use designated criteria to filter data outputs from previous nodes.
Embedded playbooks. Run another playbook.
Each of these nodes are color-coded in a playbook. The following image shows a sample playbook -- note the different actions and enrichments, along with the branches that execute different sequences of actions based on conditions.

<img src={useBaseUrl('img/cse/intro-admin-playbook-example.png')} alt="Playbook example" style={{border: '1px solid gray'}} width="800"/>

* A. **Condition**. Conditions, represented by a purple diamond, allow your playbook to branch in different directions based on an if-then statement.
* B. **Enrichment**. Green nodes are enrichments. These might add additional information from a threat intel database or convert data from one type to another.
* C. **Notification**. Blue nodes are notification actions, such as a Slack or email alert.

Action nodes use integrations. These integrations broadly fall into several types:

Enrichments. Add information, metadata, or context, such as from a threat intelligence database.
Containment. Reduces further damage by isolating files or machines related to a threat.
Notifications. Alerts sent via email, Slack, PagerDuty, or most other services you can connect with an API.
Custom. Scripts and any other automations you can create using YAML, Perl, Python, PowerShell, or Bash.
Custom actions can also include trigger actions, which run based on an event type until certain criteria are met. For example, if malware is detected, a trigger action could run an anti-malware cleanup software until no malware is detected. Similarly, you can create scheduled actions that run at certain intervals. For example, you could create a scheduled action that checks for malicious IP addresses every 5 minutes until no more malicious IP addresses are found.

### Best practices

Before you begin creating or customizing a playbook, decide what you’d like to automate. Think about what conditions you want met, and what actions or integrations you want to accomplish based on different flows. Once you have a design in mind for the flow of your playbook, you can create or customize a new one. 

The Sumo Logic Automation Service contains hundreds of pre-created playbooks, so take time to search the list of playbooks to see if there's an out-of-the-box solution that works for you. In addition, you can view the structure and organization of those OOTB playbooks to give you a starting template for custom playbooks, where you can save time by modifying an existing playbook rather than starting from an empty canvas. 

## Create a playbook for Cloud SIEM Insights

The Automation Service allows us to create automations that will run whenever Cloud SIEM Insights are created or closed. These automations are powered through "playbooks" as discussed in the previous section – predefined actions run in an automated workflow to respond to an incident. 

Let’s use the Automation Service to create a playbook for use in Cloud SIEM.

Classic UI: In the top right corner, click the cog icon, then Automation. Then, in the upper-right corner, click Manage Playbooks.

New UI: In the left menu, click Automation > Playbooks

You can click on any of the existing playbooks which will open the playbook diagram in the sidebar on the right. You can view here the individual nodes and sequences in the selected playbook(s), to give you an idea of the type of actions and structures that you can create with custom playbooks. Playbooks can have any number of actions, as well as branching conditions to manage different sequences of actions, depending on selected criteria. You can click on any component of a playbook to see more detailed information about each node. 

3. Let's create a playbook of our own. Click the plus icon near the top to create a new playbook.  

4. Enter a sample name "Training Playbook XXX" with XXX replaced by your initials or 3-digit ID. You can optionally enter a description. Select "Cloud SIEM" as the Type for the playbook.

5. Click Create when finished.

On the following screen you will see the starting template for your new (empty) playbook, with "Start" and "End" nodes. 

6. Switch to edit mode by clicking on the Edit (pencil) icon in the bottom toolbar.

<img src={useBaseUrl('img/platform-services/automation-service/intro-edit-button.png')} alt="Edit button" style={{border: '1px solid gray'}} width="300" />


Before we start adding actions to our playbook, we’ll want to set up the initial configuration of the playbook so we get the proper inputs from the Cloud SIEM Insight. 

7. Mouse over the Start node, and click on the Edit (pencil) icon.

8. In the Edit Node popup, select “Insight” from the playbook input parameters dropdown. Choosing “Insight” will automatically populate the popup view with a number of input parameters that will be added to the playbook from the corresponding Insight.

9. Click Update to save and close the input parameters.   

<img src={useBaseUrl('img/platform-services/automation-service/intro-start-node.png')} alt="Start node" style={{border: '1px solid gray'}} width="100" />

When creating an action node, fill out the node configuration using the “Add Node” dialog box (pictured below). Use the following parameters to configure the node (if a field is not listed, keep the default value. Make sure you fill out the listed configuration fields in order, as some fields will only appear in the dialog box after you’ve selected fields above it.)  

10. Action Node Parameters:

Name: “Get Insight Details”
Integration: Sumo Logic Cloud SIEM
Type: Enrichment
Action: Get Insight
Insight ID: CSE Insight ID
11. Click Create when finished.

<img src={useBaseUrl('img/platform-services/automation-service/intro-add-node.png')} alt="Add node" style={{border: '1px solid gray'}} width="500" />

12. Add another action to the playbook by clicking the ‘plus’ icon on the “Get Insight Details” node you just created. Use the parameters outlined below:

Name: “Get VirusTotal Info”
Integration: “VirusTotal V3”
Type: “Enrichment”
Action: “IP Reputation”
For the IPs field, click the “cog” icon on the right, and select the “Get Insight Details” action. Then find the “output.entity.ip.address” field and select it.
13. Click Create to save the new action.

14. Add another action to the playbook by clicking the ‘plus’ icon on the “Get VirusTotal Info” node you just created. Use the parameters outlined below:

Name: “Add Entity Enrichment”
Integration: “Sumo Logic Cloud SIEM”
Type: “Notification”
Action: “Add Entity Enrichment”
Entity ID: “cog” icon > Get Insight Details > output.entity.id
Enrichment Name: “VirusTotal IP Reputation”
Raw JSON: “cog” icon > Get VirusTotal Info > output.raw
15. Click Create to save the action.

Playbooks also allow “condition” nodes that can switch execution branches depending on the true/false results of a given expression. Let’s add a condition node to our playbook that will differentiate the execution branch depending on the severity of the insight.

16. Click the ‘plus’ icon under our last action (the blue “Add Entity Enrichment” action). Choose a Condition node.

17. Click the pencil icon to edit the new Condition node.

18. For the top “select a value”, select the “output.severity” option from the “Get Insight Details” action. Make sure “==” is selected in the middle row.

19. For the bottom “select a value” field, add a manual value: “High”.

20. Click Update to save the Condition node.

21. Click the ‘plus’ icon under the Condition node to create a new node. Select “Action” for this new node.

22. Set the Name for this action to “Send Notification Email”.

23. For the Integration, select “Basic Tools”. Set Type to be “Notification” and Action to be “Send Email”.

24. For Recipients, enter an email address (real or fake). Make sure you hit Enter after typing the email address to signal the Recipients field to parse and accept the email address.

25. Type in a subject into the Subject field “High Severity Insight detected”.

When composing content for an email notification, you have the option of using input parameters from earlier nodes in the playbook in addition to any desired custom text.

26. Click on the “{ }” icon to add a parameter field to your HTML Content (Body) text.

27. Click on the red parameter box that appears and select a source for the desired input parameter (for instance: “Insight.Severity” or “Get Insight Details.output.name”). The parameter box will turn green once you have selected a valid source parameter. You can add custom text before or after the source parameter.

28. Add one or more source parameters and accompanying custom text to outline what you want the email to say (for instance, explain that a high severity insight has been detected with the following details: name, timestamp, etc).

29. Click Create when finished with this action.

30. When you’ve created your final node(s) for your playbook, manually drag the mouse cursor from the gray connection circle on the right side of the Email Notification node to the left connection area of the “End” node. Drag and connect the “failure” end of the condition node to the End node as well.

31. Verify that the Start > End node sequence for all branches have been completed – it will look more or less like the screenshot below. (Note that you can always drag playbook elements anywhere in the playbook canvas for clarity or organization).

<img src={useBaseUrl('img/platform-services/automation-service/intro-completed-playbook.png')} alt="Completed playbook" style={{border: '1px solid gray'}} width="700" />

32. Click the disk (Save) icon at the bottom to save your playbook.

33. You can test your playbook before publishing by going to the “triple dot” icon in the upper right corner and selecting “Run Test”. 

34. After testing and troubleshooting playbook details (if needed), click the “Publish” (clipboard) icon next to the edit/pencil icon to publish your playbook. (You can add a description here if you wish)

Congrats!  You have successfully created a playbook in Sumo Logic's Automation Service!

## Create a custom automation
 
Automations define the conditions in which a playbook will be executed. For instance, you might want to execute a specific playbook whenever Cloud SIEM creates a new Insight. Or another playbook whenever an Insight is closed to create and distribute appropriate notifications or reports. In Cloud Infrastructure Security, you can set up an automation to fire when an alert is triggered. Automations can also be set to "manual execution", allowing operators to run the playbook manually when judged necessary.

This way, potentially the entire incident response cycle can now be automated: a threat is identified, an insight or alert is triggered, then a playbook is automatically deployed to perform necessary actions and email a final report for an analyst to review. 

Now that we've created our own playbook, let’s use Cloud SIEM to create an automation to run it. A Cloud SIEM Automation allows you to automatically run a playbook based on a trigger, such as an insight being created or closed. 

(Classic UI) In the top right corner, click the cog icon, then Automation.

1. (New UI) In the top right corner, click the "cog" icon and select Automation (under the Cloud SIEM Integrations header).

 2. Click the Create button in the upper right.

  3. Select your custom playbook from the previous lab in the Playbook field. (If you do not see your playbook in the list, return to the previous lab steps and ensure your playbook was published as well as saved. You may also need to refresh your page to ensure that Cloud SIEM has updated with the recent playbook changes.)

  4. For the Expects attributes for field, select "Insight".

  5. Note that the checkboxes under the Executes when field show that you can trigger your automation when an Insight is created or closed. For this lab, however, select "Manually Done". 

 6. Click Add To List when finished.

<img src={useBaseUrl('img/platform-services/automation-service/intro-new-automation.png')} alt="New automation" style={{border: '1px solid gray'}} width="400" />

### Test your automation

To test your automation, navigate to the Insights page (Classic UI: click Insights from the top menu. New UI: click Cloud SIEM > Insights from the left menu)
Select any Insight from the list by clicking on its name.
Click on the Actions menu in the left sidebar. Select your automation from the Insight Automations list on top. (If you do not see your automation, you may need to leave and return to Cloud SIEM to refresh the list)

<img src={useBaseUrl('img/platform-services/automation-service/intro-select-automation.png')} alt="Select automation" style={{border: '1px solid gray'}} width="600" />

  4. You should see a green popup at the bottom indicating that your automation was executed successfully.

  5. If you selected a high severity insight and included your email in the playbook email notification, your inbox should have an email from the Cloud SIEM system with the Insight details as designed in the playbook.

  6. Click on the Automations tab on the top of the screen to see the results of executing your automation. 

<img src={useBaseUrl('img/platform-services/automation-service/intro-results-of-automation.png')} alt="Results of automation" style={{border: '1px solid gray'}} width="800" />

This view will show "Success" or "Completed with errors" for the results of each automation. If errors occur, you can click the View Playbook link on the right side to see the Playbook view, along with any execution errors that occurred. 

Congratulations!
You now have a custom automation that can be manually run or attached to Insight creation or closing.

## Create a playbook for Alerts and Monitoring

Cloud SIEM isn’t the only application that can use playbooks from the Automation Service. We can create another playbook that will be triggered on alerts and monitors within Sumo Logic's Log Analytics Platform.

For this playbook let’s presume we have some AWS EC2 instances that are being monitored through Sumo Logic. We’ll create a sample playbook that upon a monitor alert will get information about our instances and reboot them as needed.

1. Return to the Playbooks page:

Classic UI: Cloud SIEM Home Page > Content > Automation > Manage Playbooks
New UI: Left nav menu > Automation > Playbooks
2. Create another playbook by clicking on the “+” button on the top of the playbook list.

3. Name your playbook “Training Alert XXX” with your initials or numerical ID in place of the XXX. Set “Network Anomaly” as the Type. Add a short description if needed.

4. Click the “Edit” (pencil) icon to start editing your playbook.

5. Click the pencil icon underneath the Start node.

6. Select “Alert” as the playbook input in the Edit Node dialog that follows. 

The Edit Node dialog box will auto-populate with a number of parameters related to the source alert. In this case, we also want to add a custom parameter to facilitate later actions.

7. Click Add New Param at the bottom of the parameter list.

8. Type the following as the parameter name:  customPlaceholderMap[].”cloud.instance.id”

<img src={useBaseUrl('img/platform-services/automation-service/intro-params.png')} alt="Playbook paramaters" style={{border: '1px solid gray'}} width="500" />

9. Click Update when finished.

10. Using the method from the previous lab, add a new Action node to your playbook:

Node name: “Describe AWS Instances”
Integration: AWS EC2
Type: Enrichment
Action: Describe Instances
Instance ID: (choose the cog icon > Playbook inputs > customPlaceholderMap[].”cloud.instance.id”) – if you do not see this item in the list, check that you added the parameter and saved it successfully in the Start node using steps 7-9 above.
11. Click on the ‘plus’ icon on your previous node and create a new “Action” node type.

12. Configure the Action node as follows:

Node name: “Reboot Instances”
Integration: AWS EC2
Type: Containment
Action: Reboot Instances
Instance Id: cog icon > Get AWS Instances > output.Reservations.[].Instances.[].InstanceId


13. Create a new Action node after last node you created with the following parameters:

Name: “Resolve Alert”
Integration: “Sumo Logic Log Analytics”
Type: “Notification”
Action: “Resolve Alert”
Alert ID: cog icon > From the Playbook inputs, select “input.Id”
14. Connect the Resolve Alert node to the End node.

Your completed playbook will look more or less like the following:

<img src={useBaseUrl('img/platform-services/automation-service/intro-alerts-playbook.png')} alt="Alert playbook" style={{border: '1px solid gray'}} width="700" />

Now that we have created a playbook for alerts, let’s attach it to an existing monitor.

Classic UI:

15. Return to the previous browser window with the main Sumo Logic web interface. (If it is not open, you can get back there by clicking on the “nine dot” Switch Apps icon in the upper right and selecting Log Analytics Platform) 

15b. From the bottom left nav menu, select Manage Data > Monitoring. 

New UI:

15. From the left nav menu, select Alerts > Monitors.

16. Select any monitor from the list: clicking on it will open a sidebar on the right with the monitor information.

17. Click the Edit button on top of the sidebar.

18. Scroll down to section #4: Playbooks. Here you have a section for a “text” playbook (written instructions to operators as to how to handle this alert), and also a field for “Automated Playbooks”.

19. Click on the Automated Playbooks field to open up the list of playbooks – you should see your “Training Alert XXX” playbook in the list, and now you can potentially add it to a monitor. Saving this monitor with this configuration will run this playbook automatically whenever the alert is triggered.

20. Navigate to the Alerts page -- this page will show alerts that have already triggered, with alert details:

Classic UI: click the “bell” icon in the top tab row.
New UI: Click Alert > Alert List from the left nav menu. 
21. Click on an alert in the list to see the alert details. 

22. On the alert details page, click “Playbooks” in the upper right corner to open a sidebar listing any automated playbooks that have been attached to this monitor using the above process. If there are playbooks in the list, click on the link in the sidebar to open the playbook results page in another browser tab, showing you the results of each playbook action. (If there are no playbooks listed in the sidebar, you can return to the alert list page and choose another alert.)


Go to results