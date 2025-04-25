---
id: muting-schedules
title: Muting Schedules
description: Use muting schedules to pause alert notifications from monitors according to the schedule that you define.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Setting a **Muting Schedule** allows you to pause alert notifications from monitors according to a schedule that you define. You can apply this setting to individual monitors and/or folders. For folders, this will mute all nested monitors and subfolders. Here are some scenarios where you might want to mute your alerts:

* **Planned System Maintenance**. During system maintenance, notifications can get triggered because your application and infrastructure are being brought up or turned off. Such notifications are known false alarms and should be ignored.
* **Off-Business Hours**. If your monitors reflect performance thresholds that are only applicable during business hours, such monitors might generate false alarms during off-business hours.

## Prerequisites
Make sure you've enabled the [**View Muting Schedules**](/docs/manage/users-roles/roles/role-capabilities/#alerting) and [**Manage Muting Schedules**](/docs/manage/users-roles/roles/role-capabilities/#alerting) user permissions, which allow you to define and edit a muting schedule.

If fine-grained permissions are enabled for your account, you'll need the **Manage Muting Schedules** and **Admin Monitors** capabilities. If not enabled, you'll need the **Manage Muting Schedules** and **Manage Monitors** capabilities.

## Set a muting schedule

To set a muting schedule:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Muting Schedules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Muting Schedules**. You can also click the **Go To...** menu at the top of the screen and select **Muting Schedules**. 
1. Click **Add** > **New Schedule**.
1. Define your **Schedule Configuration** using the provided UI or [*RRule*](https://freetools.textmagic.com/rrule-generator), a syntax that allows you to specify schedule recurrence rules for calendar dates programmatically.
1. Define your **Scope**, where you associate one or more monitors with this schedule.
1. Add a **Name** and optionally, a **Description**.

### Validate muting schedule

To confirm that your muting schedule has been applied successfully:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**. 
1. Find your monitor in the list and check the **Status** column, where you should see the muted indicator.

<img src={useBaseUrl('img/alerts/mute-sched1.png')} alt="mute schedule" />

<img src={useBaseUrl('img/alerts/mute-sched2.png')} alt="mute schedule" />

## Set a muting schedule for an alert group

Optionally, you can apply a muting schedule to an entire alert group, rather than selecting individual monitors. This can save you significant time by allowing you to bundle together monitors as an alert group, then bundle together alert groups that you want to mute on a schedule.

Once you've set up an alert group and a muting schedule, here's how how to link them together:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**. 
1. Select the alert group variable you want to mute. In this example, we'll choose `region`.<br/><img src={useBaseUrl('img/alerts/mute-sched-alert-groups1.png')} alt="mute-sched-alert-groups1.png" style={{border: '1px solid gray'}} width="500"/>
1. Under **(1) Trigger Conditions**, find the alert group you want to use. In this example, we've set up the condition so that if the `region` is `us-east-1`, alerts will be muted every third Saturday.<br/><img src={useBaseUrl('img/alerts/mute-sched-alert-groups2.png')} alt="mute-sched-alert-groups2.png" style={{border: '1px solid gray'}} width="500" />
