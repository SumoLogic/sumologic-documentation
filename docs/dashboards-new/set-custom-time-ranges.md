---
id: set-custom-time-ranges
title: Set Dashboard and Panel Time Ranges
description: Learn how to set dashboard and panel time ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about changing the time range for a dashboard and its panels.

A dashboard has a preset default time range. Often, the dashboard time range applies to all of the panels in the dashboards. Sometimes, individual panels may have a different time range than the dashboard time range. You can change the time range for a dashboard and for individual panels—the options for doing so are described in [Set time range](#set-time-range), below.

After changing the time range for a dashboard or panel, you can set the new range as the default time range. If you do, the default time range you’ve set will persist, even after you close and reopen the dashboard. For more information, see [Set default time range](#set-default-time-range).

## Set time range

You can change the time range for a dashboard or panel by selecting a predefined interval from a drop-down list, choosing a recently used time range, or specifying custom dates and times.

Dashboard panels are limited to a 32-day maximum time range for regular queries, whereas the scheduled view queries have no time range limit.

### Set a predefined time range

**To select a predefined time range:**

1. Click the time range shown near the upper right corner of a dashboard or dashboard panel.<br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/dashboard-setting-default.png')} alt="dash range" width="675"/>
1. Select one of the time range options on the **Relative** tab.<br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/relative-ranges.png')} alt="relative ranges" width="300"/>


### Choose a recently used time range

**To select a recently used time range:**

1. Click the time range shown near the upper right corner of a dashboard or dashboard panel.
1. Click the **Recent** tab, and select a time range.<br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/recent-time-ranges.png')} alt="dash range" width="300"/>

### Set a custom time range

**To set a custom time range:**

1. Click the time range shown near the upper right corner of a dashboard or dashboard panel.
1. Click the **Custom** tab. <br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/custom-tab.png')} alt="custom range" width="300"/>
1. Select start and stop dates on the calendar, and then enter start and stop times.
1. Click **Apply**.

## Set default time ranges

A dashboard has a default time range defined by its creator. The default time range is shown in the upper right of a dashboard. The default time range is displayed in gray font.<br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/dashboard-setting-default.png')} alt="dash range" width="675"/>

### Modify time ranges

As a dashboard user, you can change the time range for the dashboard. After you do, the new time range is shown in blue, and a more options menu is available that allows you to revert back to the default, or make it the default time range. <br/><img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/dashboard-setting-modified.png')} alt="dash modified" width="675"/>

You can make the same time range changes to an individual panel on the dashboard—the behavior is identical. A modified panel time range appears in blue, and you can revert it to the default setting, or make it the new default time range for the panel.

### Set default time ranges

As noted above, you can set a new default time range for a dashboard and individual panels. To do so, you open the options menu next to a modified time range (shown in blue), and click **Set as Default**.   

When you make a modified time range the default, the time range appears in grey, and the more options menu is no longer available.

When you change the default time range for the dashboard, the new time range will automatically be applied to all panels on the dashboard, unless you have set a new default time range default for one or more of the dashboard panels. In that case, you’ll be offered the option to **Override custom panel time ranges** with the new dashboard default. If you don’t select that, the existing default time ranges for individual panels will be preserved.

<img src={useBaseUrl('img/dashboards-new/set-custom-time-ranges/set-as-dashboard-default.png')} alt="dashboard default" width="400"/>

When a default time range is set for a panel, the panel won’t inherit the dashboard’s time range setting. You can change the panel back to inheriting the dashboard's time range by selecting **Inherit dashboard's time range** for the panel, or using the **Override custom panel time ranges** option, which causes every dashboard panel to inherit the dashboard's time range selection.
