---
id: install-app-dashboards
title: Google Workspace app and Dashboards
sidebar_label: App Installation and Dashboards
description: Instructions for installing the Google Workspace app and information about each of the dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

This page demonstrates how to install the Google Workspace app and enable documents shared outside your organization. This page also provides descriptions, use cases, and examples for each of the Google Workspace app dashboards.

## Installing the Google Workspace app

import AppInstall2 from '../../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Google Workspace dashboards​

import ViewDashboards from '../../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Filters   

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

<img src={useBaseUrl('img/integrations/google/GSuite_AlertCenter_Panel-filter.png')} alt="Google Workspace app" />

### Overview

The **Google Workspace - Overview Dashboard** provides a high-level overview of up-to-date activities throughout Google Workspace, including information on login failures, logins from multiple IPs, changes in ACL, login failures by the user, top apps, and top events by event type.

Use this dashboard to:
* Monitor the number of compromised devices and users.
* Use the panels to navigate to alert center detail dashboards.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Overview.png')} alt="Google Workspace dashboards" />


### Admin

The **Google Workspace - Admin Dashboard** provides at-a-glance graphs paired with detailed analytics to give you a comprehensive view of up-to-date administrative activities in Google Workspace. This includes information on users and groups that have been created or deleted, app token actions, admin action count, and actions by admins and users.

Use this dashboard to:
* Monitor alerts associated with admin users.
* Track creation and deletion activities by admin users.
* Monitor user content transfer activity.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Admin.png')} alt="Google Workspace dashboards" />


### Drive

The **Google Workspace - Drive Dashboard** provides at-a-glance graphs and detailed analytics on Google Drive activity. The up-to-date Google Workspace Drive information includes drive activity by location, trends in drive activity by country, ACL changes, counts of primary actions, recent uploads, document types, documents viewed, and documents shared.

Use this dashboard to:
* Monitor documents shared both inside and outside of the organization.
* Track user geographic locations and their drive activities including ACL changes, uploads, and downloads.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Drive.png')} alt="Google Workspace dashboards" />


### User Activity

The **Google Workspace - User Activity Dashboard** provides detailed information on Google Drive activity by users. A breakdown of user activity information includes most active users, most active IP addresses, and top users for downloading, uploading, creating, and sharing content.

Use this dashboard to:
* Monitor content sharing by compromised users to identify potential data leak issues.
* Determine most active users and active IP addresses.
* Track top users by the number of activities on Google Drive.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Drive-User-Activity.png')} alt="Google Workspace dashboards" />


### Login

The **Google Workspace - Login Dashboard** provides high-level graphs and detailed information for Google Workspace apps login data. Login information includes geographic locations, logins by state, successful logins, login failures by the user, IP address, and type; login failure outliers, login activity trends, and logins from multiple IP addresses.

Use this dashboard to:
* Identify abnormal spikes in login failures.
* Monitor successful logins by compromised users.
* Track user login trends and their geographic locations.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Login.png')} alt="Google Workspace dashboards" />


### Alert Center - Overview Dashboard

The **Google Workspace - Alert Center - Overview Dashboard** provides a high-level view of Google Workspace alert data by source and type, suspicious IP and email addresses, compromised devices and credentials, recent alerts, and alert trends over time.

Use this dashboard to:
* Determine potential threats.
* Monitor abnormal spikes and recent alerts.
* Monitor credentials breaches and compromised devices

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Overview.png')} alt="Google Workspace dashboards" />



### Alert Center - Investigations

The **Google Workspace - Alert Center - Investigations Dashboard** provides easily accessible analytics on compromised credentials, including Google Workspace activity of users with compromised credentials. This dashboard also provides data on Google Workspace activity from compromised devices.

Use this dashboard to:
* Track credential breaches and compromised devices.
* Monitor user activities after credentials have been breached or after a device has been compromised
* Track potential threats by email, IP address, and domain.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Investigations.png')} alt="Google Workspace dashboards" />


### Alert Center - Google Identity

The **Google Workspace - Alert Center - Google Identity dashboard** provides detailed information on suspicious logins and suspended users. This dashboard also provides information on the number and location of suspicious logins and suspended users.

Use this dashboard to:
* Monitor suspicious activity and its locations.
* Identify suspended users and suspicious logins.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Google-Identity.png')} alt="Google Workspace dashboards" />


### Alert Center - Gmail Phishing

The **Google Workspace - Alert Center - Gmail Phishing dashboard** provides detailed information on phishing attacks and spam activity on Google Workspace applications. This dashboard also provides information on the affected users and the top attackers responsible for the attacks.

Use this dashboard to:
* Monitor users affected by phishing attacks.
* Identify top attackers by volume and breadth.
* Track recent attacks.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Gmail-Phishing.png')} alt="Google Workspace dashboards" />

### Alert Center - Other Alerts

The **Google Workspace - Other Alerts Dashboard** provides a high-level view paired with detailed information on Google Workspace operations for security and privacy issues, potential government-backed attacks, recent customer takeout initiated alerts, and  Mobile device management-based alerts.

Use this dashboard to:
* Identify compromised devices and monitor suspicious activity.
* Determine which users are exporting data from your domain.
* Track government-backed attacks.
* Monitor security and privacy issues affecting your organization's Google Workspace services.

<img src={useBaseUrl('img/integrations/google/Google-Workspace-Alert-Center-Other-Alerts.png')} alt="Google Workspace dashboards" />

## Upgrade/Downgrade the Google Workspace app (Optional)

import AppUpdate from '../../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Workspace app (Optional)

import AppUninstall from '../../../reuse/apps/app-uninstall.md';

<AppUninstall/>
