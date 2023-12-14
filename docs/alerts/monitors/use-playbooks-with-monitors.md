---
id: use-playbooks-with-monitors
title: Automated Playbooks in Monitors
sidebar_label: Automated Playbooks in Monitors
description: Learn how to use Automation Service playbooks with monitors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to configure automated playbooks in monitors. An *automated playbook* is a [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/), and is a predefined set of actions and conditional statements that run in an automated workflow to respond to an event. For example, suppose that a monitor detects suspicious behavior that could indicate a security problem. When the monitor sends the alert, it could also run an automated playbook to respond to the event. 

To add an automated playbook to a monitor, see [Add an automated playbook to a monitor](#add-an-automated-playbook-to-a-monitor) below.

To create a monitor that detects and automatically responds to suspicious behavior (anomalies), see [Create an anomaly monitor that runs an automated playbook](#create-an-anomaly-monitor-that-runs-an-automated-playbook) below.

## Prerequisites

Automated playbooks are managed by the [Automation Service](/docs/platform-services/automation-service). To use automated playbooks with monitors, you must perform tasks to enable the Automation Service. See [Prerequisites](/docs/platform-services/automation-service/about-automation-service/#prerequisites) for the Automation Service.

## Access automated playbooks for monitors

When working with monitors, use the following ways to access playbooks in the Automation Service.

### When creating a monitor

1. [Create a monitor](/docs/alerts/monitors/create-monitor).
1. Go to the [**Playbook**](/docs/alerts/monitors/create-monitor/#step-4-playbook-optional) section.
1. Click **Manage Playbooks**. <br/>Playbooks are displayed in the Automation Service.

For more information, see [Add an automated playbook to a monitor](/docs/alerts/monitors/use-playbooks-with-monitors#add-an-automated-playbook-to-a-monitor) below.

### When viewing an alert

1. On the [alert page](/docs/alerts/monitors/alert-response/#alert-page), open an alert.
1. Click the **Playbook** button. The attached playbooks, if assigned during Monitor configuration, are displayed along with their execution status. 
1. Click the name of an attached playbook. <br/>The playbook is opened in the Automation Service.

For more information, see [View automated playbooks for an alert](#view-automated-playbooks-for-an-alert) below.

## Add an automated playbook to a monitor

1. [Open the **New Monitor** window](/docs/alerts/monitors/create-monitor/#open-the-new-monitor-window). 
1. Perform [Step 1](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), [Step 2](/docs/alerts/monitors/create-monitor/#step-2-advanced-settings-optional), and [Step 3](/docs/alerts/monitors/create-monitor/#step-3-notifications-optional) in the **New Monitor** window.
1. In [Step 4: Playbook](/docs/alerts/monitors/create-monitor/#step-4-playbook-optional), click **Automated Playbooks** to select a [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/) to run when an alert is fired. <br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />
1.  (Optional) Click **Manage Playbooks** to see playbooks in the Automation Service. From here you can view the playbook you selected above and look at its actions to determine if they are the ones you want to run when the alert is triggered. You can also edit the playbook, or if you want, create a new playbook to use in the monitor.  

After you add a playbook to the monitor, when the monitor triggers an alert, the selected playbook runs automatically.

## View automated playbooks for an alert

Once a monitor triggers an alert with one or more attached playbooks, you can view the playbooks for the alert. 

1. On the [alert page](/docs/alerts/monitors/alert-response/#alert-page), open an alert that has attached playbooks.
1. Click the **Playbook** button. The attached playbooks are displayed. <br/><img src={useBaseUrl('img/monitors/view-playbooks-on-alert.png')} alt="View playbooks for an alert" style={{border: '1px solid black'}} width="800" />
1. Hover your mouse over the icon to the right of the playbook name to view the status of the playbooks:

   | Icon | Description |
   | :-- | :-- |
   | <img src={useBaseUrl('img/monitors/playbook-running-icon.png')} alt="Playbook running icon" width="30" /> | Running |
   | <img src={useBaseUrl('img/monitors/playbook-user-interaction-icon.png')} alt="Waiting for user interaction icon" width="30" /> | Waiting for user interaction |
   | <img src={useBaseUrl('img/monitors/playbook-completed-icon.png')} alt="Completed icon" width="30" /> | Completed |

1. Click the playbook name to open the [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). <br/>The playbook shows the status of each action in the playbook that ran for the alert. For example, **Success** displays at the bottom of actions that have successfully completed, **Failed** for actions that did not complete, or **Waiting Owner** for actions that need user interaction. <br/><img src={useBaseUrl('img/monitors/playbook-in-automation-service.png')} alt="Playbook in the Automation Service" width="800" />
1. Click an action to view more about its status. Status information opens in a box to the left. <br/>In the following example of an action whose status is **Waiting Owner**, an **Action Task** appears in the box that describes user interaction required to complete the task. <br/><img src={useBaseUrl('img/monitors/playbook-waiting-owner.png')} alt="Playbook awaiting user interaction" width="800" />
1. If you have an action marked as **Waiting Owner**, perform the steps needed to complete the **Action Task**. When done, click the appropriate button at the bottom of the **Waiting Owner** action box (**Approve**, **Approve & Close**, or **Reject**). The action completes, and the subsequent remaining actions in the playbook run.<br/><img src={useBaseUrl('img/monitors/playbook-complete-task.png')} alt="Playbook awaiting user interaction" width="300" />
1. Address any other actions in the playbook that need attention. For example, click and open any failed actions to see why they failed and to determine what you need to do to get them to complete successfully. 

## Create an anomaly monitor that runs an automated playbook

You can create a monitor that triggers a "smart alert", an alert that runs an automated playbook in response to unusual behavior (an anomaly). 

An anomaly monitor is triggered when unusual conditions  are detected. Anomaly monitors leverage a machine learning model to detect anomalies and identify unusual patterns of activity. The output of the machine learning model are baselines for normal behavior, in the form of lower and upper thresholds, so that deviations from baselines signal unusual activity and trigger alerts. 

:::note
Outlier monitors are under the detector type for **Anomaly** monitors because outlier monitors use anomaly detection on in-query data. 
:::

To create an anomaly monitor that runs an automated playbook in response to an alert:

1. [Open the **New Monitor** window](/docs/alerts/monitors/create-monitor/#open-the-new-monitor-window).
1. Go to [Step 1: Trigger Conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) in the **New Monitor** window.
1. Select the **Logs** monitor type.
1. Select **Anomaly** under **Detection Method**. <br/> <img src={useBaseUrl('img/monitors/new-monitor-anomaly-detection-method.png')} alt="Anomaly detection method" style={{border: '1px solid black'}} width="800" />
1. In **Query**, [provide a query](/docs/alerts/monitors/create-monitor/#provide-a-query-logs-and-metrics-only) for the logs to be monitored for anomalous behavior.
1. In the **Critical** tab under **Trigger Type**, select the parameters for the alert trigger:
   * **Detection Window**. Select the duration of time to watch for anomalies (from 5 minutes to 24 hours). Ensure that the detection window is 5-10 times longer than the timeslice used in the log query. 
   * **Detector Sensitivity**. Tune the number of anomalous data points detected per day compared to the predicted baseline for the detection window. Low sensitivity will result in more alerts, and high sensitivity will result in fewer alerts. Use low sensitivity if you do not want to miss out on most anomalies.  
   * **Minimum Anomaly Count**. Enter the minimum number of anomalies to detect during the detection window before triggering an alert. This setting helps you add context to anomaly detection. For example, if you know a particular signal is noisy, you may want to wait for a number of anomalous data points in the detection window before triggering an alert. If the Detection Window is set to 5 minutes, and the Minimum Anomaly Count is set to 1, then an alert is triggered if 1 anomaly appears within a 5-minute time period. 
1. Perform [Step 2: Advanced Settings](/docs/alerts/monitors/create-monitor/#step-2-advanced-settings-optional) and [Step 3: Notifications](/docs/alerts/monitors/create-monitor/#step-3-notifications-optional) in the **New Monitor** window. 
1. In [Step 4: Playbook](/docs/alerts/monitors/create-monitor/#step-4-playbook-optional), click **Automated Playbooks** to select one or more playbooks that run when the monitor triggers an alert.  <br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />
1. Perform [Step 5: Monitor Details](/docs/alerts/monitors/create-monitor/#step-5-monitor-details).
1. Click **Save** to save the monitor with the attached playbooks.

When the monitor detects anomalous activity, it triggers an alert that runs the selected playbooks automatically. In this way, the system can respond autonomously to suspicious behavior exposed in logs.

## Configure automated playbooks for monitors

Automated playbooks for monitors are created and maintained in the [Automation Service](/docs/platform-services/automation-service). This section provides tips to configure the automated playbooks. 

### View automated playbooks

To view playbooks in the Automation Service, [access playbooks](#access-automated-playbooks-for-monitors) and click the **Playbook** tab in the Automation Service.

Although you can attach any playbook to a monitor, playbooks of type **Alert** are specifically designed for use with alerts, since they transmit the alert context to the playbook and can drive actions there. When you open a playbook, the type displays next to the name.

<img src={useBaseUrl('img/monitors/playbook-alert-type.png')} alt="Playbook alert type" width="700" />

Sample playbooks to attach to monitors include:
* **535 - Application Latency Playbook**. Diagnose and resolve application latency issues, including code deploy events and infrastructure anomalies.
* **536 - Unresolved Alert Notification**. Periodically monitor status of a Sumo Logic alert and notify a Slack channel about unresolved alerts.

### Create playbooks for monitors

To create a playbook so you can add it to a monitor, see [Create a new playbook](/docs/platform-services/automation-service/automation-service-playbooks/#create-a-new-playbook). As a best practice, whenever you want to create a new playbook, select an existing playbook to serve as the template for the new playbook and click the **Duplicate** button to copy it. 

<img src={useBaseUrl('img/monitors/playbook-duplicate-button.png')} alt="Duplicate button" width="300" />

### Install an integration for monitors

[Integrations](/docs/platform-services/automation-service/automation-service-integrations/) are connectors to applications from industry-leading network and security vendors. Integrations provide the actions run in playbooks. 

To use an integration's actions in a playbook, [install the integration from App Central](/docs/platform-services/automation-service/automation-service-app-central/#install-an-integration-from-app-central). To use an existing integration as the basis for a new integration, [duplicate the integration](/docs/platform-services/automation-service/automation-service-integrations/#duplicate-an-integration).

Some integrations that have useful actions for monitors include:
* **Sumo Logic**. Integration with Sumo Logic platform for logs, metrics, and monitors. <br/>Actions include:
   * **Resolve Alert**. Resolve the alert.
   * **Search Metrics**. Query metrics from Sumo Logic.
   * **Search Output Mapping**. Parse the output of a Search Sumo Logic action.
   * **Search Sumo Logic**. Query logs data from Sumo Logic.
* **Sumo Logic Notifications**. Integration with the Sumo Logic platform for monitors and Slack notifications. <br/>Actions include:
   * **Assess Alert Status**. Periodically monitor status of a Sumo Logic alert and notify a Slack user if the alert is unresolved.