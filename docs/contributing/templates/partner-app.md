---
id: partner-app-doc
title: Partner App Template
sidebar_label: Partner App Template
description: Using the Sumo Logic Partner App Template.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Copy this file and edit it for your App integration.
:::

<head>
  <meta name="robots" content="noindex"/>
</head>

<img src={useBaseUrl('path-to-your-icon.png')} alt="Thumbnail icon" width="45"/>

(Introduction about the app)

\Add the description from the app description above\

## Log types and metrics

The `{AppName}` App uses...

\Enter a list of log types, usually hyperlinked to vendor docs.\

## Sample log and metrics messages

### Log message

```json title="Log message"
\<add your log message here\>
```

### Metric message

```json title="Metric message"
\<add your log message here\>
```

## Sample queries

### Log query

```sql title="Log query"
\<add your query here\>
```

### Metric query

```sql title="Metric query"
\<add your query here\>
```

## Prerequisites (Optional)

\Any steps like permissions or roles that the user should have for configuring the collection steps.\

## Collection configuration and app installation

\This section instructions for collecting logs, metrics, or logs and metrics. You can also give link to collection docs if they are hosted publicly. Include a diagram, as appropriate. For an example, see [Collection process for GCP services](/docs/integrations/google/app-engine/#collection-process-for-gcp-services).\

### Step 1.

\step description\

### Step 2.

\step description\

### Step n.

\step description\

## Install the `{AppName}` app

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing the `{AppName}` dashboards

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Dashboard 1

\Descriptions of each app dashboard.\
\This section has dashboard description, use cases, and screenshot for each dashboard.\

The Overview Dashboard provides a quick snapshot of ....

 Use this dashboard to:
- \use-case-1\
- \use-case-2\

### Dashboard 2

View stats and metrics related to ...

Use this dashboard to:
- \use-case-1\
- \use-case-2\

## Support

This application has been developed and is supported by `{app-owner-name}`. In case of any technical queries, contact support at `support contact`.
