---
id: use-playbooks-with-monitors
title: Use Playbooks with Monitors
description: Learn how to use playbooks with monitors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes how to use playbooks with monitors. [Playbooks](/docs/platform-services/automation-service/automation-service-playbooks/) are provided by the Automation Service. A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type. 

For example, suppose that a monitor detects anomalous behavior that indicates a possible security breach. The monitor could automatically run a playbook when the alert is triggered. For a walkthrough, see [Example smart alert](#example-smart-alert) below.

## Add a playbook to a monitor

1. [Create a monitor](/docs/alerts/monitors/create-monitor/).
1. In [Step 4](/docs/alerts/monitors/create-monitor/#step-4-monitor-details) of the monitor creation dialog, select one of the following:
   *  **Insert custom playbook**. Insert your own playbook. This could be anything from a custom script you have developed to run when the alert is triggered, to a set of instructions to the analyst about how to resolve the alert. 
   * **Select an automated playbook**. Select a playbook from [playbooks available in the Automation Service](/docs/platform-services/automation-service/automation-service-playbooks/).  
<br/><img src={useBaseUrl('img/monitors/monitor-playbooks-ui.png')} alt="Add a playbook to a monitor" style={{border: '1px solid black'}} width="800" />


## Example smart alert

In this example, we'll show you how to configure a "smart alert", a monitor that automatically runs a playbook when the alert is triggered. In this example, we'll use the **Anomaly** detection method to look for suspicious patterns of activity.

Write
 



