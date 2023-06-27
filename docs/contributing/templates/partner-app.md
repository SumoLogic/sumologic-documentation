---
id: partner-app-doc
title: Partner App Template
sidebar_label: Partner App Template
description: Using the Sumo Logic Partner App Template.
---

:::tip
Copy this file and edit it for your App integration.
:::

This application has been developed and is supported by <Partner Name\>. In case of technical questions, please contact <Partner Name\> support at <email address\> or <phone number\>.

**Product Description:**

Describe the application, then fill in the following table.


| Dashboard | Description |
| :-- | :-- |
| <dashboard name\> | <dashboard description\> |

## <App Name\> Page

<Add the description from the app description above.\>

### Log Types

The <AppName\> App uses ...

<Enter a list of log types, usually hyperlinked to vendor docs.\>

### Sample Log Message

<Get a sample from app developer and replace this text with it.\>

### Sample Query

```
<add your query here\>
```

## Collect Logs for <AppName\>

:::note
Write the section heading and section to reflect what’s being collected: logs, metrics, or logs and metrics.
:::

This section has instructions for collecting logs for the Sumo App for <AppName\>.

### Collection process overview

:::note
Include this section in doc if collection is not simple. Include a diagram, as appropriate. For an example, see [Collection process for GCP services](/docs/integrations/google/app-engine/#collection-process-for-gcp-services).  
:::

### Collection step 1. Step Description

Include a description and numbered list of steps. Copy, paste, and fill out for each step needed.

1. First step.
1. Second step.

### Collection step 2. Step Description

### Collection step n. Step Description

## Install the <AppName\> App

This section has instructions for installing the Sumo App for <AppName\>.

## View the <AppName\> Dashboards

<Descriptions of each app dashboard.\>

## Install the Sumo Logic App

Now that you have set up collection, install the Sumo Logic App for <app name\> to use the preconfigured searches and Dashboards that provide insight into your data.

Uncomment this line to add app install steps:
<!-- {@import ../reuse/apps/app-install.md} -->

## Dashboard filters

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

:::note
You can use filters to drill down and examine the data on a granular level.
:::

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

Replace sample image with panel from your App Dashboard, using red box callout:

Use the instructions from [Install Sumo Logic Apps](/docs/get-started/apps-integrations#install-apps-from-the-library) to install the <Partner\> App.

## <Dashboard name\>

<Copy, paste, and fill in this dashboard section for each dashboard. Enter a dashboard description from above.\> Use this dashboard to:

* Enter a list of features. Example below.

Use this dashboard to:

* Monitor high severity threats and scan attacks.
* Review <fill in\> for troubleshooting configuration issues.
* Understand how to fine-tune <fill in your product name\> based on <fill in panel names\>.

<Add your dashboard screenshot.\>
