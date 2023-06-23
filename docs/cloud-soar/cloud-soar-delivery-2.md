---
id: cloud-soar-delivery-2
title: Cloud SOAR Delivery 2
sidebar_label: Cloud SOAR Delivery 2
description: Learn about the features in the Cloud SOAR Delivery 2 release.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This topic describes the features in the Cloud SOAR Delivery 2. 

Delivery 2 of Cloud SOAR offers the following enhancements over our initial Cloud SOAR product:

* New and improved features:
   * [Dashboards](#create-a-dashboard)
   * [Reports](#create-a-report)
 * Open Integration Framework updates:
    * [Integration Builder](#integration-builder) allows you to build integrations without needing to provide code
    * Certified integrations allow you to customize JSON and table output schema
    * Actions configuration during playbook design is rearranged for easier use
    * Integrations, and related action execution, can be done [in the cloud or through the Bridge](#cloud-or-bridge-execution). Only certified integrations can be executed in the cloud.
* Architectural improvements:
     * Fully-functional in the Cloud (the Bridge is only required for custom integrations)
     * User and profile management is in Sumo Logic core platform instead of Cloud SOAR
     * Automatic scalability based on server load

## Create a dashboard

You can create dashboards in Cloud SOAR similar to dashboards in the core Sumo Logic platform. You can also [create widgets](#create-widgets-for-dashboards-or-reports) to use in the dashboards that display text, graphs, and charts containing details about incidents and other aspects of Cloud SOAR.

1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
1. Click the **+** icon in the upper-right corner of the UI and select **New Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard.png')} alt="Add dashboard button" width="200"/><br/>A blank dashboard appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-empty-dashboard.png')} alt="Empty dashboard" width="700"/>
1. Click on the name of the blank dashboard (such as **Dashboard 1** in the example), and give the dashboard a name. Click **No description available** and type a description.
1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>The widgets panel displays to the right of the dashboard.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard-example.png')} alt="Widgets panel on the dashboard" width="700"/>
1. Under **My Widgets** or **Public**, select widgets you'd like to add to the dashboard. These are the same widgets that are available to use in [reports](#create-a-report). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets. 
1. Rearrange the widgets in the dashboard as desired. 
1. (Optional) Click **Public** at the top of the dashboard panel if you want to make the dashboard available for others to use. 
1. (Optional) Click **Export** to to the upper-right of the dashboard panel to export the dashboard to PDF.  

## Create a report

You can create reports on incidents to share with others. You can also [create widgets](#create-widgets-for-dashboards-or-reports) to use in the report that display text, graphs, and charts containing details about incidents and other aspects of Cloud SOAR.

1. Click the gear icon in the upper-right corner of the UI, then select **Report**. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-reports.png')} alt="Access reports" width="150"/><br/>The Report UI appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-report-ui.png')} alt="Reports user interface" width="600"/> 
1. Click the **+** icon in the upper left corner. 
1. On the right side, select widgets to add to the report from **My Widgets** or **Public**. These are the same widgets that are available to use in [dashboards](#create-a-dashboard). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets.  
1. Rearrange the widgets in the report as needed. You can even add widgets to the header and footer.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets-in-report.png')} alt="Widgets in a report" width="600"/>
1. Click **Save**. In the dialog:
    1. Provide a **Report name** and a **Description**.
    1. Click **Schedule** to schedule the report to run on a regular basis.
    1. Scroll to the bottom of the dialog and click **Public** if you want to make the report available to others.
    1. Click **Save**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-save-report.png')} alt="Save a report" width="300"/>
1. Click **Export** to export the report to PDF. 
1. Click **Open** to open the report later. 

## Create widgets for dashboards or reports

You can create widgets as needed to help analysts and administrators quickly get the information they need. Widgets are reusable pieces that display information in different forms, such as text, pie chart, bar chart, graph, or table. You can use the same widgets in both dashboards and reports. 

1. Open the widgets panel.
   * From [dashboards](#create-a-dashboard):
      1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
      1. Select a dashboard.
      1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>
   * From [reports](#create-a-report):
      1. Click the gear icon in the upper-right corner of the UI, then select **Report**. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-reports.png')} alt="Access reports" width="150"/>
1. The widgets panel displays to the right of the screen.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets.png')} alt="Widgets panel" width="250"/>
1. Click **New**.<br/>The dialog to create new widgets displays. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-widget.png')} alt="Create a widget" width="600"/>
1. In **Name**, provide a name that clearly explains the widget's purpose.
1. In **Group by**, select whether you want incidents listed in the widget to be grouped by **Status**, **Incident ID**, or **Start time**.
1. On the left, select the type of widget to create (pie chart, bar chart, graph, table, or text).
1. At the top, query for elements to view in the widget, such as incidents, notes, tasks, and attachments. 
1. Click **Public** if you want to make the widget available for others to use. 
1. Click **Save** when done. 

## Integration Builder

You can build basic integrations without having to provide custom YAML files. 

1. Click the gear icon in the upper-right corner and select **Automation**. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-automation-menu.png')} alt="Access Automation" width="150"/>
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select the **+** icon at the top of the screen to the left of **Integrations**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-integration-button.png')} alt="Add Integration button" width="300"/>
1. Fill out the **New Integration** dialog:
   1. Upload a **Logo** for your integration.
   1. Provide a **Name**.
   1. Click **Use Connection Configuration** and fill out the fields for credentials configuration. 
   1. Click **Add** to add the connection configuration.
   1. If other fields are needed at the integration resource level, click **+ Field** to add the fields and their information. For example, for an integration like VirusTotal, you would need to add `apikey` and `domain` as required fields.
   1. Click **Create**. The integration file is created for the integration.
   <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-integration-dialog.png')} alt="New Integration dialog" width="500"/>
1. Now that you have created the integration file, you need to create an action file for the integration.
   1. Hover your mouse over the new integration and click the **Upload** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-icon.png')} alt="Upload button" width="300"/>
   1. In the **Upload** dialog, notice how **Integration File** is highlighted. That's because it was created in the last step.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-upload-files.png')} alt="Upload dialog" width="300"/>
   1. Click **Action** and **Next**. 
1. Fill out the **Upload** dialog: 
   1. Provide a **Name** for the action.
   1. Select a **Type** for the action, such as enrichment, containment, custom, or notification.
   1. Click **Use Connection Configuration** if it is needed for the action, fill out the fields for credentials configuration, and click **Add**.
   1. If other fields are needed at the action level, click **+ Field** to add the fields and their information. 
   1. Click **Create**. The action file is created for the integration.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-action-file.png')} alt="Create action" width="600"/><br/>The new action displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration.png')} alt="Example integration" width="600"/>
1. Add the resource information:
   1. Click the **+** button to the left of **Resources**.
   1. Give the resource a **Label** and enter the connection configuration needed by the resource. What you enter is specific to the integration you're adding the resource for. Each resource's configuration screen may be different, but in most cases, you will need information such as IP addresses, API tokens, usernames, and passwords for the application you're integrating with. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-add-resource.png')} alt="Example integration" width="400"/>
   1. Click **Save**. The new integration is complete.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-completed-integration-2.png')} alt="Example integration" width="600"/>
1. To test the new action, click on the action, then click **Test Action** in the dialog that displays.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-test-action.png')} alt="Example integration" width="400"/>

## Cloud or Bridge execution

You can set integrations, and their related action execution, to be executed in the cloud or through the Bridge. Only certified integrations can be executed in the cloud, while custom integrations must be executed through the [Bridge](/docs/cloud-soar/cloud-soar-bridge/).

1. Select **Automation** from the gear icon in the upper-right corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-automation-menu.png')} alt="Access Automation" width="150"/>
1. Select **Integrations** from the navigation menu at the left of the screen.
1. Select an integration.
1. Hover your mouse over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-button.png')} alt="Resource edit button" width="600"/>
1. In the **Edit resource** dialog, click the **Automation engine** field to select **Cloud execution** (for certified integrations only) or select a Bridge option (for custom integrations).<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-resource-cloud-execution.png')} alt="Automation engine field" width="400"/>

## Standardized Cloud SOAR APIs

[Cloud SOAR APIs](/docs/cloud-soar/cloud-soar-apis/) allow you to manage incidents, triage, and other Cloud SOAR features. With Cloud SOAR Delivery 2, the Cloud SOAR APIs have been standardized to use the same infrastructure as APIs in the Sumo Logic core platform. 

Previously, documentation for the APIs was only available through your Cloud SOAR instance at the following URL: `http[s]:///<cloudsoarhost>/incmansuite_ng/lib/gui/app.php#support_apidoc|api_documentation_v3`.
Now you can access Cloud SOAR APIs documentation at the following URLs.

<!-- At Delivery 2 GA, replace the content at https://help.sumologic.com/docs/api/cloud-soar/ with the following content (but remove the note tag from the reuse bit): -->

:::note
{@import ../reuse/api-intro.md}
:::

{@import ../reuse/csoar-api-table.md}

<!-- Also at Delivery 2 GA, add this reuse API content to the "Cloud SOAR APIs" article at https://help.sumologic.com/docs/cloud-soar/cloud-soar-apis/. Also in that article, update the references to the old "incmansuite_ng" in URLs as needed to align with the new API URLs. -->