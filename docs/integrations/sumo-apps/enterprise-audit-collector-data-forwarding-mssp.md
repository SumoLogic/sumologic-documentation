---
id: enterprise-audit-collector-data-forwarding-mssp
title: Enterprise Audit - Collector and Data Forwarding Management for MSSP
sidebar_label: Enterprise Audit - Collector and Data Forwarding for MSSP
description: The Enterprise Audit - Collector and Data Forwarding Management for MSSP app presents information on Collector, Sources activities, and data forwarding trends by destination types for child orgs under a MSSP org.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Collector_Data_Forwarding_icon.png')} alt="Enterprise Audit Collector Data Forwarding icon" width="55"/>

The Enterprise Audit - Collector and Data Forwarding Management for MSSP app presents information on Collector, Sources activities, and data forwarding trends by destination types for child orgs under a MSSP org. This app utilizes predefined searches and dashboards that provide visibility into your environment. It has the following two dashboard categories:
* Collector Management
* Data Forwarding Management

## Prerequisites

The Audit Event Index is only available for Trial and Enterprise accounts.

| Account Type    | Account Level      |
| :--------- | :-------- |
| Cloud Flex    | Trial, Enterprise    |
| Credits | Trial, Enterprise Operations, Enterprise Suite, Enterprise Security |

## Installing the Enterprise Audit - Collector and Data Forwarding Management for MSSP app

### Prerequisite

The Audit Event Index (`sumologic_audit_events`) should be enabled in all the child orgs that need to be monitored through this app in an MSSP org, prior to installation. See [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Enterprise Audit - Collector and Data Forwarding Management for MSSP dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

:::note
By default no child orgs will be selected in the dashboard and data will be populated against the audit event index of the MSSP org. Child orgs can be selected though a dropdown menu on the top left corner just below the title of the dashboard. You can also search by org name in this dropdown menu.
:::

<img src={useBaseUrl('img/integrations/sumo-apps/child-org-filter.png')} alt="Dropdown menu to select child orgs" style={{border: '1px solid gray'}} width="600" />

<ViewDashboards/>

### Collector Management Overview

The **Enterprise Audit for MSSP - Collector Management Overview** dashboard provides a high-level view of trends related to collector and source activities, collector upgrade requests, upgrade successes and failures, the number of ephemeral collectors created and deleted, and the number of clobber collectors that were deleted for child orgs.

Use this dashboard to:
* Review collector types, both hosted and installable, for selected child orgs.
* Review distributions by interface from where operations are performed, whether collector, UI, or API.
* Review 7-Day trends for various collector and collector source activities.
* Get the number of ephemeral collectors that were created and deleted, as well as the number of requested collector upgrades and clobber collectors that were deleted.
* Navigate to a dashboard and view more detailed information by clicking a panel.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Collector-Management-Overview-MSSP.png')} alt="Enterprise Audit for MSSP - Collector Management Overview" style={{border: '1px solid gray'}} width="800" />

### Collector Activities

The **Enterprise Audit for MSSP - Collector Activities** dashboard provides detailed information on collector activities for child orgs, such as top users by activity and a one-day time comparison. You can also review data on recent collector activities and upgrades, and use pre-populated filters for a granular view of selected data.

Use this dashboard to:
* Review the geographic locations where activities are performed.
* Review the activities of top users and by a one-day time comparison.
* Analyze data for recent activities, collector upgrades, deleted clobber collectors, and all collector activities for selected child orgs.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Collector-Activities-MSSP.png')} alt="Enterprise Audit for MSSP - Collector Activities" style={{border: '1px solid gray'}} width="800" />

### Collector Sources Activities

The **Enterprise Audit for MSSP - Collector Sources Activities** dashboard provides detailed information on created, updated and deleted sources, the top collectors where sources were added, active users, and one-day time comparisons for child orgs. You can use pre-populated filters for a more granular view of selected data.

Use this dashboard to:
* Review the geographic location where activities were performed.
* Review one-day time shift comparisons, active users, source type distribution, and the top collectors where sources were added for selected child orgs.
* Analyze data for sources recently added to a collector using local configuration management, and sources activities for all collectors.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Collector-Sources-Activities-MSSP.png')} alt="Enterprise Audit for MSSP - Collector Sources Activities" style={{border: '1px solid gray'}} width="800" />

### Data Forwarding Management Overview

The **Enterprise Audit for MSSP - Data Forwarding Management Overview** dashboard provides an at-a-glance view of trends for destination types and the distribution of destination types, such as Amazon S3, hitachi, Syslog, and Generic REST for child orgs. Visual representations for the distribution of data forwarding destinations and data forwarding indexes are also shown.

Use this dashboard to:
* Assess destination type trends for selected child orgs.
* Track data forwarding destination and data forwarding index activities.
* Get a high-level view of active and inactive Amazon S3 indexes and encrypted Amazon S3 indexes.
* Get an overview of the distribution of data source types and format type for data forwarding.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Data-Forwarding-Management-Overview-MSSP.png')} alt="Enterprise Audit for MSSP - Data Forwarding Management Overview" style={{border: '1px solid gray'}} width="800" />

### Data Forwarding Destination Activities

The **Enterprise Audit for MSSP - Data Forwarding Destination Activities** dashboard provides detailed information on data forwarding destination activities for child orgs. You can review trends for activities, their geographical locations, one-day times shift comparisons, user activity, and recent destination activities. For a more granular view of the data, you can use the pre populated filters.

Use this dashboard to:
* Review data forwarding destination trends and the geographic locations from where the activities were performed for selected child orgs.
* Get an at-a-glance overview of user activity and one-day time shift comparisons.
* Review data for all recent destination activities.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Data-Forwarding-Destination-Activities-MSSP.png')} alt="Enterprise Audit for MSSP - Data Forwarding Destination Activities" style={{border: '1px solid gray'}} width="800" />

### Data Forwarding Index Activities

The **Enterprise Audit for MSSP - Data Forwarding Index Activities** dashboard provides detailed information about data forwarding indexes that were created using partitions and scheduled views for child orgs. You can review trends, geographical locations for data forwarding index activities, one-day time shift comparisons, user activities, as well as data on disabled indexes and recent index activities. For a more granular analysis of the data, you can use the pre-populated filters.

Use this dashboard to:
* Review trends for data forwarding index activities and the geographic locations where the activities were performed for selected child orgs.
* Get an at-a-glance view of user activity, one-day time shift comparisons, and the number of data forwarding index that have been disabled.
* Review data on all recent activities.

<img src={useBaseUrl('img/integrations/sumo-apps/Enterprise-Audit-Data-Forwarding-Index-Activities-MSSP.png')} alt="Enterprise Audit for MSSP - Data Forwarding Index Activities" style={{border: '1px solid gray'}} width="800" />

## Upgrade/Downgrade the Enterprise Audit - Collector and Data Forwarding Management for MSSP app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Enterprise Audit - Collector and Data Forwarding Management for MSSP app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
