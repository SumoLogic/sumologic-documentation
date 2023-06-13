---
id: muting-schedules
title: Muting Schedules
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Setting a **Muting Schedule** allows you to pause alert notifications from monitors according to a schedule that you define. You can apply this setting to individual monitors and/or folders. For folders, this will mute all nested monitors and subfolders. Here are some scenarios where you might want to mute your alerts:

* **Scheduled System Maintenance**. When you're doing system maintenance, notifications can get triggered because the application and infrastructure are being brought up or turned off. These notifications can be very distracting, and might hamper the maintenance activities.
* **Off-Business Hours**. If you're configuring alerts with specific thresholds that are only applicable during business hours, that might generate false alerts in off-business hours.

## Prerequisites
Make sure you've enabled the [**View Muting Schedules** and **Manage Muting Schedules**](/docs/manage/users-roles/roles/role-capabilities/#alerts) user permissions, which allow you to define and edit a muting schedule.

If fine-grained permissions are enabled for your account, you'll need the **Manage Muting Schedules** and **Admin Monitors** capabilities. If not enabled, you'll need the **Manage Muting Schedules** and **Manage Monitors** capabilities.

## Set a Muting Schedule

To set a muting schedule:

1. Go to **Manage Data** > **Monitoring** > **Muting Schedules** tab.
1. Click **Add** > **New Schedule**.
1. Define your **Schedule Configuration** using the provided UI or [*RRule*](https://freetools.textmagic.com/rrule-generator), a syntax that allows you to specify schedule recurrence rules for calendar dates programmatically.
1. Define your **Scope**, where you associate one or more monitors with this schedule.
1. Add a **Name** and optionally, a **Description**.

To confirm that your Muting Schedule has been applied successfully:
1. Go to your **Manage Data** > **Monitoring** > **Monitors** tab.
1. Find your monitor in the list and check the **Status** column, where you should see the muted indicator.

<img src={useBaseUrl('img/alerts/mute-sched1.png')} alt="mute schedule" />

<img src={useBaseUrl('img/alerts/mute-sched2.png')} alt="mute schedule" />
