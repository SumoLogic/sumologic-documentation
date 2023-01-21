---
id: partner-app
title: Partner App Template
sidebar_label: Partner App Template
description: Using the Sumo Logic Partner App Template.
---

:::sumo
Copy this file and edit it for your App integration. These guides should be added to the
:::


This application has been developed and is supported by "Partner Name". In case of technical questions, please contact "Partner Name" support at "email address" or "phone number".

**Product Description:**
App description: Describe the application, then fill in the following table.


| Dashboard | Description |
| :-- | :-- |
| "dashboard name" | "dashboard description" |

## "App Name" Page

Add the description from the app description above.

### Log Types
The "AppName" App uses ...

Enter a list of log types, usually hyperlinked to vendor docs

### Sample Log Message

Get a sample from app developer and replace this text with it.

### Sample Query

Get a sample from the app developer and replace this text with it.

```
post query here
```

## Collect Logs for "AppName"

:::note
Write the section heading and section to reflect what’s being collected: logs, metrics, or logs and metrics.
:::

This section has instructions for collecting logs for the Sumo App for "AppName".

### Collection process overview
Note: Include this section in doc if collection is not simple. Include a diagram, as appropriate. For an example, see Collection process for GCP services.  

### Collection step 1. Step Description

Include a description and numbered list of steps. Copy, paste, and fill out for each step needed.

1. First step.
1. Second step.

### Collection step 1. Step Description

### Collection step n. Step Description

## Install the "AppName" App and View the Dashboards
This section has instructions for installing the Sumo App for "AppName" and descriptions of each of the app dashboards.

## Install the Sumo Logic App
Now that you have set up collection, install the Sumo Logic App for Salesforce to use the preconfigured searches and Dashboards that provide insight into your data.

To install the app:

Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
1. Select the version of the service you are using and click **Add to Library**.

    :::note
    Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
    :::

3. To install the app, complete the following fields.

    * **App Name.** You can retain the existing name, or enter a name of your choice for the app.
    * **Data Source.** Select either of these options for the data source.

        * Choose **Source Category**, and select a source category from the list.
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`).

    * **Advanced.** Select the Location in Library (the default is the Personal folder in the library), or click **New Folder** to add a new folder.

1. Click **Add to Library**.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. it is important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results will not immediately be available, but with a bit of time, you will see full graphs and maps.

## Dashboard filters

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

:::note
You can use filters to drill down and examine the data on a granular level.
:::

Replace this sample image with one of your App Dashboard, using red box callout:

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

Replace sample image with panel from your App Dashboard, using red box callout:



Use the instructions from [Install Sumo Logic Apps](/docs/get-started/apps-integrations#install-apps-from-the-library) to install the "Partner" App.

## Dashboard name
Copy, paste, and fill in this dashboard section for each dashboard. Enter a dashboard description from above.
Use this dashboard to:

* Enter a list of features. Example below.

Use this dashboard to:

* Monitor high severity threats and scan attacks.
* Review "fill in" for troubleshooting configuration issues
* Understand how to fine-tune "fill in your product name" based on "fill in panel names"

Post a dashboard screenshot.
