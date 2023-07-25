---
id: export-dashboard-new
title: Exporting Dashboards
description: Learn how to export Dashboards as a PDF or PNG file.
---

Dashboards provide insights for monitoring key performance indicators (KPIs) across your organization. There may be times when key stakeholders require access to a static snapshot of dashboard KPIs without having to log in to Sumo Logic. In these instances, you can export a snapshot of a dashboard to share. This capability allows you to extend monitoring analytics to a broader base both within and outside your organization.

You can generate and download your Dashboard dashboards in PDF, PNG, and JSON format.

To export a Dashboard follow these steps:

1. Open the Dashboard you need to export.
1. Click the three-dot menu icon on the top right of the Dashboard.<br/>  ![three dot icon.png](/img/dashboards-new/export-dashboard-new/three-dot-icon.png)
1. Hover over **Export**.
1. Click the format you want to export the Dashboard as, either JSON, PDF, or PNG.<br/> ![export dashboard sep 2021.png](/img/dashboards-new/export-dashboard-new/export-dashboard.png)
1. A popup pane is displayed at the top and center of the web page with the text **Preparing Download**. <br/>   ![preparing download.png](/img/dashboards-new/export-dashboard-new/preparing-download.png)
   * If you attempt to export a dashboard while panels are still fetchingdata, it will not produce the file until the dashboard has completed loading all panels.
1. Once the file is prepared, it is downloaded by your browser, stored in your browser's default downloads folder. The file is given the name of the Dashboard.

## Limitations

* Panels are exported the way they are displayed prior to export. For table panels that require scrolling, only the rows in view will show in the exported file. We recommend building your panels where all rows are visible without the need to scroll. 
* Chart panels with more legend labels than can be displayed are not visible in the exported file.
