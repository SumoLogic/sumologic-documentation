---
id: export-dashboard-new
title: Exporting Dashboards
description: Learn how to export Dashboards as a PDF or PNG file.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Dashboards provide insights for monitoring key performance indicators (KPIs) across your organization. There may be times when key stakeholders require access to a static snapshot of dashboard KPIs without having to log in to Sumo Logic. In these instances, you can export a snapshot of a dashboard to share. This capability allows you to extend monitoring analytics to a broader base both within and outside your organization.

You can generate and download your Dashboard dashboards in PDF, PNG, and JSON format.

To export a Dashboard follow these steps:

1. Open the Dashboard you need to export.
1. Click the three-dot kebab menu icon on the top right of the Dashboard.<br/><img src={useBaseUrl('/img/dashboards-new/export-dashboard-new/three-dot-icon.png')} alt="three-dot icon" style={{border: '1px solid gray'}} width="700" />
1. Hover over **Export**.
1. Click the format you want to export the Dashboard as, either JSON, PDF, or PNG.<br/><img src={useBaseUrl('/img/dashboards-new/export-dashboard-new/export-dashboard.png')} alt="export dashboard sep 2021" style={{border: '1px solid gray'}} width="300" />
1. A popup pane is displayed at the top and center of the web page with the text **Preparing Download**.<br/><img src={useBaseUrl('/img/dashboards-new/export-dashboard-new/preparing-download.png')} alt="preparing download" style={{border: '1px solid gray'}} width="300" />
   * If you attempt to export a dashboard while panels are still fetchingdata, it will not produce the file until the dashboard has completed loading all panels.
1. Once the file is prepared, it is downloaded by your browser, stored in your browser's default downloads folder. The file is given the name of the Dashboard.

## Limitations

* Panels are exported the way they are displayed prior to export. For table panels that require scrolling, only the rows in view will show in the exported file. We recommend building your panels where all rows are visible without the need to scroll. 
* Chart panels with more legend labels than can be displayed are not visible in the exported file.
* PDF export will timeout after 5 minutes. So, make sure that all panels load in less than 5 minutes when viewing a dashboard.
