---
id: section
title: Section (Beta)
description: Learn about how to use dashboard section. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

Section in dashboard helps you to better organize complex dashboards by grouping related panels into logical sections. Each section can be expanded or collapsed, allowing you to focus on specific insights while keeping dashboards clean, structured, and easier to navigate. Sections also improve dashboard performance by loading and refreshing only the panels that are currently visible. This approach helps reduce unnecessary query scans and provides greater control over dashboard layout, visibility, and cost efficiency.

## Add a section

To add a section to your dashboard, follow the below steps: 

1. Create or open a **Dashboard**, then click **Add Panel** > **Section**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section.png')} alt="dashboard_section" style={{border: '1px solid gray'}} width="600"/>
1. Drag and drop panels into the newly added section as needed.
1. To modify the section, click the three-dot kebab menu icon in the upper-right corner and select **Edit**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_edit.png')} alt="dashboard_section_edit" style={{border: '1px solid gray'}} width="800"/>
    - Enter a section name.
    - Set the default state to **Expanded** or **Collapsed**.
    - Choose the preferred font size.
        <br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_editor_page.png')} alt="dashboard_section_editor_page" style={{border: '1px solid gray'}} width="800"/>

## Delete a section

To delete a section in your dashboard, follow the below steps:

1. Open the dashboard where you want to delete the section.
1. Click the three-dot kebab menu icon in the upper-right corner and select **Delete**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_delete.png')} alt="dashboard_section_delete" style={{border: '1px solid gray'}} width="800"/>
1. In the delete section pop-up, choose one of the following options:<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_delete_pop_up.png')} alt="dashboard_section_delete_pop_up" style={{border: '1px solid gray'}} width="300"/>
    - **Delete section only**. Removes the section but keeps the panels in the dashboard.
    - **Delete section and all its content**. Removes the section and all panels within it.

## Sharing a dashboard with section

To share a dashboard with coworkers within your organization, refer to [Share a Dashboard](/docs/dashboards/share-dashboard-new/). When you share a dashboard with multiple section, queries will run and costs will be incured only for the sections in expanded state. Panels in the collapsed section do not execute any queries or incur scan costs until they are expanded.

Similarly, if **Autorefresh** is enabled for the dashboard, only panels with the expanded sections are refreshed. Panels in collapsed sections are not refreshed until the section is expanded.
