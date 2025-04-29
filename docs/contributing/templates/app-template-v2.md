---
id: app-template-v2  #example: split
title: App Template (Version 2) #example: Split
image: 'https://app_icons.s3.amazonaws.com/dropbox.svg' #replace with your app logo
sidebar_label: App Template #example: Split
tags:
  - apps
  - app-name  #example: Split
description: Description goes here. #example: The Sumo Logic App for Split enables you to seamlessly monitor feature flagging, experiment results, and user behavior, enabling data-driven decision making and fostering a more agile and competitive development process.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

/Introduction/

## Data collected

\Add all the data sources and respective polling interval information\

| Polling Interval | Data |
| :--- | :--- |
| `{{Polling time in minutes}}` | `{{Data sources}}` |

Example:
| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Team Events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events) |

## Log types

### Sample log messages

```json
Your json message goes here
```

### Sample queries

```sql
Your query goes here
```

## Setup

### Vendor configuration

#### Prerequisites (if any)

\NOTE: This section doesn't apply to all sources; use only where needed\

Example: You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials, ....

\Insert steps to configure the Source in the Vendor UI\

Example: Refer to [Split vendor configuration](/docs/integrations/webhooks/split/#vendor-configuration)

### Source configuration

\Insert steps to configure the Source in the Sumo Logic UI\

Example: [Split source configuration](/docs/integrations/webhooks/split/#source-configuration)

#### Metadata fields (If any)

\Insert metadata fields in the Sumo Logic UI. Update the below table accordingly.\

| Field | Value | Description |
| :--- | :--- | :--- |
| `{{field}}` | `{{value}}` | `{{Description}}` |

## Installing the Split app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Split dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Dashboard 1 (example: Overview)

\Descriptions of each app dashboard.\
\This section has dashboard description, use cases, and screenshot for each dashboard.\

The **Split - Overview** dashboard provides a quick snapshot of ....

<!-- example: The **Split - Overview** dashboard offers transparency into actions performed by both administrators and team members, delivering valuable insights into audit events, their distribution, and statistics categorized by their respective types. -->

### Dashboard 2 (example: Users and Groups)

\Descriptions of each app dashboard.\
\This section has dashboard description, use cases, and screenshot for each dashboard.\

The **Split - Users and Groups** dashboard provides a quick snapshot of ....

<!-- #example: The **Split - Users and Groups** dashboard offers concise statistical summaries pertaining to Split users and groups, including administrative actions taken concerning them.-->

## Upgrade/Downgrade the Split app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Split app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>