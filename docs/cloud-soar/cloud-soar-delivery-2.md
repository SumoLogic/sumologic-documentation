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

This topic describes the features in the Cloud SOAR Delivery 2 offering. 

Delivery 2 of Cloud SOAR offers the following enhancements over our intial Cloud SOAR product:

* New and improved features
     * Reporting
     * Dashboards
* Architectural improvements
     * Multi-tenant
     * Fully-functional in the Cloud (the Bridge is only required for custom integrations)
     * User and profile management is in Sumo Logic core platform instead of Cloud SOAR
     * Automatic scalability based on server load
 * Open Integration Framework updates
     * Certified integrations allow you to customize JSON and table output schema (with the Bridge)
     * Playbook actions configuration is rearranged for easier use
     * Integration Builder allows you to build integrations without needing to provide code

## Reports

You can create reports on incidents, and add widgets to the reports such as charts and tables. 

### Create a new report

1. Select **Report** from the gear icon in the upper-right corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-reports.png')} alt="Access reports" width="150"/><br/>The Report UI appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-report-ui.png')} alt="Reports user interface" width="600"/> 
1. Click the **+** icon in the upper left corner. 
1. On the right side, select widgets to add to the report from **My Widgets** or **Public**. Widgets can be graphs, charts, tables, or any kind of visual element that contains information. To see all available widgets, click **Show List**. 
1. To create a new widget, click **New**. The dialog to create a widget appears. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-widget.png')} alt="Create a widget" width="600"/>
     1. In **Name**, provide a name that clearly explains the widget's purpose.
     1.  In **Group by**, select whether you want incidents listed in the report to be grouped by **Status**, **Incident ID**, or **Start time**.
     1. On the left, select the type of widget to create (pie chart, bar chart, graph, table, or text).
     1. At the top, query for elements to view in the widget, such as incidents, notes, tasks, and attachments. 
     1. Click **Public** if you want to make the widget available for others to use. 
     1.  Click **Save** when done. 
1. Rearrange the widgets in the report as needed. You can even add widgets to the header and footer.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets-in-report.png')} alt="Widgets in a report" width="600"/>
2. Click **Save**.
3. Click **Export** to export the report to PDF. 
4. Click **Open** to open the report later. 
