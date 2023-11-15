---
id: use-playbooks-with-monitors
title: Use Automated Playbooks with Monitors
description: Learn how to use Automation Service playbooks with monitors.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to use automated playbooks with monitors. A [playbook](/docs/platform-services/automation-service/automation-service-playbooks/) is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. Automated playbooks are provided by the [Automation Service](/docs/platform-services/automation-service).  

For example, suppose that a monitor detects anomalous behavior that indicates a possible security breach. The monitor could automatically run an automated playbook when the alert is triggered. For a walkthrough of how to configure this kind of monitor, see [Create a "smart alert"](#create-a-smart-alert) below.

## Add an automated playbook to a monitor

1. [Open the New Monitor window](/docs/alerts/monitors/create-monitor/#open-the-new-monitor-window). 
1. Perform [Step 1](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), [Step 2](/docs/alerts/monitors/create-monitor/#step-2-advanced-settings-optional), and [Step 3](/docs/alerts/monitors/create-monitor/#step-3-notifications-optional) in the **New Monitor** window.
1. In [Step 4](/docs/alerts/monitors/create-monitor/#step-4-monitor-details) of the **New Monitor** window, select one of the following:
   *  **Insert custom playbook**. Insert your own playbook. This could be anything from a custom script you have developed to run when the alert is triggered, to a set of instructions to the analyst about how to resolve the alert. 
   * **Select an automated playbook**. In the field provided, select a playbook from [playbooks in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). <br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />
1. To see the actions that will run when you add a playbook to the monitor, click **Manage Playbooks** to examine the [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). Examine the actions carefully to determine if they are the kind of actions you want to run when the alert is triggered. 
1. (Optional). Click **Manage Playbooks** to [create a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#create-a-new-playbook). Then select the new playbook for the monitor.
1. Click **Save** to create the monitor.

When the monitor triggers an alert, the selected playbook runs automatically.

## View playbooks for an alert

Once a monitor triggers an alert with one or more attached playbooks, you can view the playbooks for the alert. 

1. Open the alert on the [alert page](/docs/alerts/monitors/alert-response/#alert-page).
1. Click the **Playbook** button. The attached playbooks are displayed. <br/><img src={useBaseUrl('img/monitors/view-playbooks-on-alert.png')} alt="View playbooks for an alert" style={{border: '1px solid black'}} width="800" />
1. Hover your mouse over the icon to the right of the playbook name to view the status of the playbooks:

   | Icon | Description |
   | :-- | :-- |
   | <img src={useBaseUrl('img/monitors/playbook-running-icon.png')} alt="View playbooks for an alert" width="30" /> | Running |
   | <img src={useBaseUrl('img/monitors/playbook-user-interaction-icon.png')} alt="View playbooks for an alert" width="30" /> | Waiting for user interaction |
   | <img src={useBaseUrl('img/monitors/playbook-completed-icon.png')} alt="View playbooks for an alert" width="30" /> | Completed |

1. Click the playbook name to open the [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). The playbook  shows the status of each action in the playbook that ran for the alert. For example, **Success** displays at the bottom of actions that have successfully completed, **Failed** for actions that did not complete, or **Waiting Owner** for actions that need user interaction. <br/><img src={useBaseUrl('img/monitors/playbook-in-automation-service.png')} alt="Playbook in the Automation Service" width="800" />
1. Click an action to view more about its status. Status information opens in a box to the left. <br/>In the following example of an action whose status is **Waiting Owner**, an **Action Task** appears in the box describing the user interaction required to complete the task. <br/><img src={useBaseUrl('img/monitors/playbook-waiting-owner.png')} alt="Playbook awaiting user interaction" width="800" />
1. If you have an action marked as **Waiting Owner**, perform the steps needed to complete the **Action Task**. When done, click the appropriate button at the bottom of the **Waiting Owner** action box (**Approve**, **Approve & Close**, or **Reject**). The action completes, and the subsequent remaining actions in the playbook run.<br/><img src={useBaseUrl('img/monitors/playbook-complete-task.png')} alt="Playbook awaiting user interaction" width="300" />
1. Address any other actions in the playbook that need attention. For example, click and open any failed actions to see why they failed and to determine what you need to do to get them to complete successfully. 

## Create a "smart alert"

A "smart alert" is an alert that automatically runs a playbook when anomalies are detected. Monitors that generate smart alerts use the **Anomaly** detection method. This method uses advanced analytics techniques, including machine learning and behavioral analytics, to detect anomalies and identify suspicious patterns of activity. It establishes baselines for normal behavior so you can receive alerts when deviations or unusual activities are detected.  

To create a monitor that generates smart alerts:

1. [Open the New Monitor window](/docs/alerts/monitors/create-monitor/#open-the-new-monitor-window).
1. Go to [Step 1](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) in the **New Monitor** window.
1. Select the **Logs** monitor type.
1. Select **Anomaly** under **Detection Method**. <br/> <img src={useBaseUrl('img/monitors/new-monitor-anomaly-detection-method.png')} alt="Anomaly detection method" style={{border: '1px solid black'}} width="800" />
1. In **Query**, [provide a query](/docs/alerts/monitors/create-monitor/#provide-a-query-logs-and-metrics-only) for the logs to be monitored for anomalous behavior.
1. In the **Critical** tab under **Trigger Type**, select the parameters for the alert trigger:
   * **Detection Window**. Select the duration of time to watch for anomalies (either 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, or 24 hours). 
   * **Detector Sensitivity**. Tune the number of anomalous data points detected per day compared to the predicted baseline for the detection window. Low sensitivity will result in fewer alerts, and high sensitivity will result in more alerts. 
   * **Minimum Anomaly Count**. Enter the minimum number of anomalies to detect during the detection window before triggering an alert. For example, if the Detection Window is set to 5 minutes, and the Minimum Anomaly Count is set to 1, then an alert is triggered only if 1 anomaly appears within a 5 minute time period. 
1. Perform [Step 2: Advanced Settings](/docs/alerts/monitors/create-monitor/#step-2-advanced-settings-optional) and [Step 3: Notifications](/docs/alerts/monitors/create-monitor/#step-3-notifications-optional) in the **New Monitor** window. 
1. In [Step 4: Monitor Details](/docs/alerts/monitors/create-monitor/#step-4-monitor-details), select one or more playbooks to run when an alert is triggered. Click **Manage Playbooks** to examine the playbooks and see the actions they run. <br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />
1. Click **Save** to create the monitor.

When the monitor detects anomalous activity, it triggers an alert that runs the selected playbooks automatically. In this way, the system can respond autonomously to suspicious behavior exposed in logs, all without any human intervention. 

You can also run playbooks that prompt for user interaction. See [View playbooks for an alert](#view-playbooks-for-an-alert) above. 

