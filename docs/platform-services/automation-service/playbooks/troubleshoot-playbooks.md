---
id: troubleshoot-playbooks
title: Troubleshoot Playbooks
sidebar_label: Troubleshoot Playbooks
description: Learn how to test playbooks and troubleshoot playbook problems.  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can run playbooks in automations for [monitors](/docs/alerts/monitors/use-playbooks-with-monitors/), [Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/), or [Cloud SOAR](/docs/cloud-soar/automation/). If a playbook has a problem when it runs in an automation, an error message often displays in the playbook providing information about the problem.

:::tip
To test a playbook before using it in an automation, see [Test a playbook](/docs/platform-services/automation-service/playbooks/troubleshoot-playbooks/#test-a-playbook).
:::

## Test nodes in a playbook

The playbook **Test Mode** toggle lets you test individual nodes of a playbook without needing to complete the entire flow. Testing individual nodes helps you improve your playbooks' reliability and shorten configuration time. You can provide mock values for variables used in the node, and run the results to see the output and any errors. The results provide informative messages to help you troubleshoot problems. 

When you test nodes, keep in mind:
* You can test action, condition, user choice, and task nodes. You cannot test filter or nested playbook nodes.
* A single-node test does not execute downstream nodes. Only the selected node runs using the provided input. You cannot view the previous or past test node run executions.
* Invalid JSON or missing required fields will block the test and show an error in the **Output** panel.
* Before you can test a node, any node configuration changes need to be saved to the playbook draft. When you test a node, clicking **SAVE & RUN TEST** saves the node configuration to the same draft before executing.
* Testing nodes counts against your [action limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit) quota.

To test a node:
1. Select a playbook.
1. Click the **Edit** button at the bottom of the screen to make a draft of the playbook.
1. Click the **Edit** button on a node.
1. Click the **Test Mode** toggle at the top of the **Edit Node** dialog. An **Input** panel appears to the left, and an **Output** panel appears to the right. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-toggle.png')} alt="Playbook Test Mode toggle" style={{border:'1px solid gray'}} width="800"/>
1. In the **Input** panel, enter variables to test the node. When you click **SAVE & RUN TEST**, results of the test appear in the **Output** panel.<br/>Ensure that you enter valid variables for the kind of inputs you need to test. Following are examples with different node types:
   * **Action**<br/>In the following example that uses input from insights, we provide an insight ID. The output shows the result of the action.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-variables.png')} alt="Action node test variables" style={{border:'1px solid gray'}} width="800"/>
   * **Condition**<br/>In the following example that uses input from reputation vendors, we provide reputation scores. The output shows the result of the condition.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-condition.png')} alt="Condition node test variables" style={{border:'1px solid gray'}} width="800"/>
   * **User choice**<br/>In the following example that uses user input data, we provide an email address. The output provides the resulting user choice. Click the user choice options to test whether they work as expected.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-user-choice.png')} alt="User choice node test variables" style={{border:'1px solid gray'}} width="800"/>
   * **Task**<br/>In the following example that uses incident input data, we provide a mock template name. The output provides the resulting task. Click the task options to test whether they work as expected.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-task.png')} alt="Task node test variables" style={{border:'1px solid gray'}} width="800"/>
1. Examine the results in the **Output** panel and take any action needed to troubleshoot node operation:
    * Click the information button <img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-info-icon.png')} alt="Playbook test mode JSON info button" style={{border:'1px solid gray'}} width="30"/> to see information on the test run:<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-info-button.png')} alt="Playbook test mode info" style={{border:'1px solid gray'}} width="300"/>
    * Click the **JSON details** button <img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-json-details-icon.png')} alt="Playbook test mode JSON details button" style={{border:'1px solid gray'}} width="30"/> to see the JSON output:<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-test-node-json-details.png')} alt="Playbook test mode JSON details" style={{border:'1px solid gray'}} width="300"/>
1. Continue testing the node and making changes as needed in the node's configuration. When done, click **Save**. 
1. Test each node in your playbook that has the **Test Mode** button (action, condition, user choice, and task). In each node, enter variables in the **Input** panel and examine the results in the **Output** panel to ensure the node works correctly.

After you're done testing individual nodes,  test the entire playbook to ensure it runs end-to-end (see [Test a playbook](#test-a-playbook)).

## Test a playbook

You can test a playbook to verify that it works properly. The test results show the outcome as if the playbook actually ran.

1. Select a playbook.
1. Click the kebab button in the upper-right corner of the UI.
1. Select **Run Test**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-run-test.png')} alt="Run a playbook test" style={{border:'1px solid gray'}} width="600"/>
1. In the **Test playbook** dialog, enter the requested information and click **Run**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-playbook.png')} alt="Test playbook" style={{border:'1px solid gray'}} width="600"/>
1. The results of the test are displayed in a new window labeled with the playbook name and **(RUN TEST)**. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results.png')} alt="Test results" style={{border:'1px solid gray'}} width="600"/>
1. Click the clock icon in the upper-right corner to see the testing history. Select **Latest actions** to see test results for all the actions on the playbook, or select items on the list to see results for individual actions. <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-playbook-test-results-filtered.png')} alt="Filtered test results" style={{border:'1px solid gray'}} width="600"/>

## Open playbooks that require investigation

### Open a playbook from an alert

1. Access the [alert list](/docs/alerts/monitors/alert-response/#alert-list).
1. Open an alert that uses a playbook.
1. On the alert details page, click the **Playbooks** button to see [automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/#view-automated-playbooks-for-an-alert) attached to the alert. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert.png')} alt="Playbook on an alert" style={{border: '1px solid gray'}} width="300"/>
1. Hover your mouse over the icon to the right of the playbook to see its status. In the example above, the playbook completed with errors.
1. To investigate the problem, click the playbook name. The playbook opens in the Automation Service and any issues display in the results section.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-alert-1.png')} alt="An alert playbook with errors" style={{border: '1px solid gray'}} width="800"/>

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

### Open a playbook from Cloud SIEM

1. Open an [Insight](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) or [Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/) that uses playbooks (that is, that has [automations](/docs/cse/automation/automations-in-cloud-siem)).
1. Click the **Automations** button at the top of the page to view the automations on the Insight or Entity.  <br/><img src={useBaseUrl('img/platform-services/automation-service/automations-in-cloud-siem.png')} alt="Cloud SIEM automations" style={{border: '1px solid gray'}} width="800"/>
1. Click **View Playbook** for a playbook you want to investigate. In the example above, the playbook we want to investigate completed with errors. The playbook opens in the Automation Service, and the issues display in the results section.  <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-in-cloud-siem.png')} alt="A Cloud SIEM automation playbook with errors" style={{border: '1px solid gray'}} width="800"/>

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

### Open a playbook from Cloud SOAR

1. Open an [Incident](/docs/cloud-soar/incidents-triage/#incidents).
1. On the [incident details](/docs/cloud-soar/incidents-triage/#incident-details) page, select **Operations > Playbooks**. Playbooks appear that have run for the incident. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbooks-in-cloud-soar.png')} alt="Playbooks on an incident in Cloud SOAR" style={{border: '1px solid gray'}} width="800"/>
1. Click **Graph View** in the upper-right and click **>** to page through the playbooks. <br/><img src={useBaseUrl('img/platform-services/automation-service/cloud-soar-playbooks-graph-view.png')} alt="Playbook in graph view in Cloud SOAR" style={{border: '1px solid gray'}} width="800"/>
1. Click a node on the playbook that displays an error.

Proceed to [Investigate playbook problems](#investigate-playbook-problems) below to look into playbook problems.

## Investigate playbook problems

After you have [opened a playbook that requires investigation](/docs/platform-services/automation-service/playbooks/troubleshoot-playbooks/#open-playbooks-that-require-investigation), follow the steps below to investigate problems with the playbook.

1. The **Filtered Results** section shows the status of actions that ran on the playbook. The example below shows two failed actions that require investigation. <br/><img src={useBaseUrl('img/platform-services/automation-service/failed-actions-in-filtered-results.png')} alt="Failed actions on a playbook" style={{border: '1px solid gray'}} width="800"/>
1. Click an action for an explanation of the problem. <br/><img src={useBaseUrl('img/platform-services/automation-service/reason-for-failed-action.png')} alt="Reasons for failed actions on a playbook" style={{border: '1px solid gray'}} width="800"/>
1. For more detailed information about the action, click the **Graph View** in the upper right and then click on the action. A pane opens that displays more information about the action. <br/><img src={useBaseUrl('img/platform-services/automation-service/failed-action-in-graph-view.png')} alt="Failed action in playbook graph view" style={{border: '1px solid gray'}} width="800"/>
1. Sometimes the playbook's payload will provide more information about why an action has a problem. To view the playbook's payload, click **>** to the right of the playbook name. <br/><img src={useBaseUrl('img/platform-services/automation-service/arrow-on-playbook.png')} alt="Open playbook payload" style={{border: '1px solid gray'}} width="300"/>
1. Examine the [playbook payload](/docs/platform-services/automation-service/playbooks/playbook-payloads/) for information that might help you resolve the problem. For example, the payload may be able to tell you if a field has not been properly passed from a previous action, or a field was unintentionally left blank that the action requires.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-payload.png')} alt="Playbook payload" style={{border: '1px solid gray'}} width="300"/>
1. Based on what you uncover during investigation, you may need to make changes to the playbook and then [test the playbook](#test-a-playbook) to ensure it works correctly.

## Common playbook problems

Following are some common problems that can occur with playbooks:
* **No response from the bridge**<br/>The [automation bridge](/docs/platform-services/automation-service/automation-service-bridge/) is offline, or the bridge does not have the egress firewall settings to handle the outbound request.
* **API rate limiting issues** <br/>The vendor has capped the number of requests that can be made to their API in a certain time frame.
* **HTTPS connection pool issues** <br/>There are no available connections at the vendor, usually indicative of a vendor API health issue.
* **A required field is empty that the action is looking for** <br/>A field has not been properly passed from a previous action, or a field was unintentionally left blank that the action requires.
* **Permission denied** <br/>The API key is incorrect on the [integration resource](/docs/platform-services/automation-service/about-automation-service/#configure-the-connection-for-an-integration-resource), or the account running the playbook has invalid credentials or insufficient permissions.
* **You have exceeded the actions limit** <br/>The number of actions that your organization can run per hour is limited to a certain threshold. Any actions that are launched beyond this [actions limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit) will not run. You might exceed the limit if:
    * There are alert surges. <br/>
    * The playbook is not optimized properly and actions are stuck in a loop.
    * There are Cartesian flag issues (too many nested elements to process as part of the returned API result).

## Playbook executions

When playbooks run, you can view the outcome for either a single playbook or for all playbooks:
* [View executions of a single playbook](#view-executions-of-a-single-playbook)
* [View executions of all playbooks](#view-executions-of-all-playbooks)

### View executions of a single playbook

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation > Playbooks**. 
1. Select a playbook.
1. Click the kebab button in the upper-right corner of the UI.
1. Select **View Executions**. <br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-view-executions.png')} alt="View Executions menu option" style={{border:'1px solid gray'}} width="800"/>
1. The executions of the playbook are displayed in the **Playbook Executions** screen.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-all.png')} alt="View a playbook's executions" style={{border:'1px solid gray'}} width="800"/>
      :::tip
      Notice that the playbook's ID appears in the search bar at the top of the screen. Viewing executions of a playbook is one way to find the ID for a playbook.
      :::
1. To see information about a specific execution:
   1. Click an entry. Information about the execution displays.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-details.png')} alt="Playbook execution details" style={{border: '1px solid gray'}} width="800"/>
   1. To view the information in a separate tab, click **View Execution Details**.
1. To perform additional actions on executions in the screen, hover your mouse over an entry and select icons that display:
   * <img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-go-to-playbook-icon.png')} alt="Go to Playbook button" style={{border: '1px solid gray'}} width="25"/> **Go to Playbook**. Opens the playbook. 
   * <img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-kill-playbook-icon.png')} alt="Kill Playbook button" style={{border: '1px solid gray'}} width="25"/> **Kill Playbook**. Stops a running playbook.

### View executions of all playbooks

You can view executions of all playbooks on the **Playbook Executions** screen. The page shows the playbook names, run status, and start time and end time.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbook Executions**. You can also click the **Go To...** menu at the top of the screen and select **Playbook Execution**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation > Playbook Executions**.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-executions.png')} alt="Playbook executions screen" style={{border: '1px solid gray'}} width="800"/>
1. To find playbook executions:
   1. Enter commands like the following in the search bar at the top of the screen:
      * Type a word from the name of a playbook (for example, `VirusTotal`). Executions of all playbooks with that word in their name are displayed.
      * Enter `Name:"<name of playbook>"` (for example, `Name: "527 - Enrich Entity with VirusTotal"`)
      * Enter `Playbook ID:"<ID of playbook>"` (for example, `Playbook ID: "6618edc1043a590011932926"`). To get a playbook's ID, [view executions of a single playbook](#view-executions-of-a-single-playbook), or use the [playbook_list_retreive](https://api.sumologic.com/docs/csoar/#operation/playbook_list_retrieve) API.
   1. When you enter a query, click **Save New Query** <img src={useBaseUrl('img/platform-services/automation-service/save-new-query-icon.png')} alt="Save New Query button" style={{border: '1px solid gray'}} width="25"/> in the search bar and click **Add to bookmarks** to save the query for later use.
1. To see information about a playbook's execution:
   1. Click an entry in the list of playbook executions. Information about the execution displays.<br/><img src={useBaseUrl('img/platform-services/automation-service/playbook-execution-details.png')} alt="Playbook execution details" style={{border: '1px solid gray'}} width="800"/>
   1. To view the information in a separate tab, click **View Execution Details**.
1. To perform additional actions on executions in the screen, hover your mouse over an entry and select icons that display:
   * <img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-go-to-playbook-icon.png')} alt="Go to Playbook button" style={{border: '1px solid gray'}} width="25"/> **Go to Playbook**. Opens the playbook. 
   * <img src={useBaseUrl('img/platform-services/automation-service/playbook-executions-kill-playbook-icon.png')} alt="Kill Playbook button" style={{border: '1px solid gray'}} width="25"/> **Kill Playbook**. Stops a running playbook.
 