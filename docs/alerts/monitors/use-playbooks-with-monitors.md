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

For example, suppose that a monitor detects anomalous behavior that indicates a possible security breach. The monitor could automatically run an automated playbook when the alert is triggered. For a walkthrough of how to configure this kind of monitor, see [Example smart alert](#example-smart-alert---anomaly-detection) below.

## Add an automated playbook to a monitor

1. Follow the steps in [Create a New Monitor](/docs/alerts/monitors/create-monitor/) to perform steps 1-3 in the **New Monitor** dialog.
1. In [Step 4](/docs/alerts/monitors/create-monitor/#step-4-monitor-details) of the **New Monitor** dialog, select one of the following:
   *  **Insert custom playbook**. Insert your own playbook. This could be anything from a custom script you have developed to run when the alert is triggered, to a set of instructions to the analyst about how to resolve the alert. 
   * **Select an automated playbook**. In the field provided, select a playbook from [playbooks available in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). <br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />
1. To see the actions that will run when you add a playbook to the monitor, click **Manage Playbooks** to examine the [playbook in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/). Examine the actions carefully to determine if they are the kind of actions you want to run when the alert is triggered. 
1. (Optional). Click **Manage Playbooks** to [create a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#create-a-new-playbook). Then select the new playbook for the monitor.

## Example smart alert - Anomaly detection

In this example, we'll show you how to configure a "smart alert", a monitor that automatically runs a playbook when the alert is triggered. In this example, we'll use the Anomaly detection method to look for suspicious patterns of activity.

The Anomaly method lets you uncover unusual behavior identified by anomaly detection. In this method, Sumo Logic applies advanced analytics techniques, including machine learning and behavioral analytics, to detect anomalies and identify suspicious patterns of activity. This method establishes baselines for normal behavior so you can receive alerts when deviations or unusual activities are detected.  

1. Follow the steps in [Create a New Monitor](/docs/alerts/monitors/create-monitor/) to get to [Step 1](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) in the **New Monitor** dialog.
1. Select the **Logs** monitor type.
1. Select **Anomaly** under **Detection Method**. (The Anomaly method applies only to the Logs monitor type.)<br/> <img src={useBaseUrl('img/monitors/new-monitor-anomaly-detection-method.png')} alt="Anomaly detection method" style={{border: '1px solid black'}} width="800" />
1. In **Query**, [provide a query](/docs/alerts/monitors/create-monitor/#provide-a-query-logs-and-metrics-only) for the logs.
1. In the **Critical** tab under **Trigger Type**, select the parameters for the alert trigger:
   * **Detection Window**. Select the duration of time to watch for anomalies (either 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, or 24 hours). 
   * **Detector Sensitivity**. Tune the number of anomalous data points detected per day compared to the predicted baseline for the detection window. High sensitivity will result in more alerts and vice versa. 
   * **Minimum Anomaly Count**. Enter the minimum number of anomalies to detect during the detection window before triggering an alert. For example, if the Detection Window is set to 5 minutes, and the Minimum Anomaly Count is set to 1, then an alert is triggered if 1 anomaly appears within a 5 minute timeframe. 
1. Perform [Step 2: Advanced Settings](/docs/alerts/monitors/create-monitor/#step-2-advanced-settings-optional) and [Step 3: Notifications](/docs/alerts/monitors/create-monitor/#step-3-notifications-optional) in the **New Monitor** dialog. 
1. In [Step 4: Monitor Details](/docs/alerts/monitors/create-monitor/#step-4-monitor-details), select a playbook to run when an alert is triggered.



