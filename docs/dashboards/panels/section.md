---
id: section
title: Group Dashboard Panels into Sections
sidebar_label: Group Panels into Sections
description: Group related dashboard panels into collapsible sections to improve organization, navigation, and query performance in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sections help you organize complex Sumo Logic dashboards by collecting related panels into logical groups. Each section can be expanded or collapsed, so you can focus on specific insights while keeping dashboards clean, structured, and easy to navigate. Sections can help improve dashboard performance by loading and refreshing only the panels in expanded sections. Because fewer panel queries are active, sections can also reduce unnecessary query scans and their costs.

## Section limits

The following limits apply to sections:

- **Sections per dashboard**. A dashboard can have a maximum of 10 sections.
- **Panels per section**. Each section can contain a maximum of 20 panels.

## How to add a section

To add a section to your dashboard, follow these steps:

1. Create or open a **Dashboard**, then click **Add Panel** > **Section**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section.png')} alt="dashboard_section" style={{border: '1px solid gray'}} width="600"/>
1. Drag and drop panels into the newly added section as needed.
1. To modify the section, click the three-dot kebab menu icon in the upper-right corner and select **Edit**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_edit.png')} alt="dashboard_section_edit" style={{border: '1px solid gray'}} width="800"/>
    - Enter a section name.
    - Set the default state to **Expanded** or **Collapsed**.
    - Choose the preferred font size.
    - Set the horizontal text alignment to **Left**, **Center**, or **Right**.
    - Choose the title text color.
    - Choose the background color.
        <br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_editor_page.png')} alt="dashboard_section_editor_page" style={{border: '1px solid gray'}} width="800"/>

## How to set a section as default

To save the current state of a section as its default, click the three-dot kebab menu icon in the upper-right corner of the section and select **Set as Default**. This makes the section's current state (expanded or collapsed) its default state.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_set_as_default.png')} alt="Set as Default option in the section kebab menu" style={{border: '1px solid gray'}} width="800"/>

:::note
The **Set as Default** option is grayed out when the section is collapsed and its default state is already **Collapsed** in the edit window. To use the option, expand the section first.
:::

## How to delete a section

To delete a section in your dashboard, follow these steps:

1. Open the dashboard where you want to delete the section.
1. Click the three-dot kebab menu icon in the upper-right corner and select **Delete**.<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_delete.png')} alt="dashboard_section_delete" style={{border: '1px solid gray'}} width="800"/>
1. In the delete confirmation pop-up, choose one of the following options:<br/><img src={useBaseUrl('img/dashboards/section/dashboard_section_delete_pop_up.png')} alt="dashboard_section_delete_pop_up" style={{border: '1px solid gray'}} width="300"/>
    - **Delete section only**. Removes the section but keeps the panels in the dashboard.
    - **Delete section and all its content**. Removes the section and all panels within it.

## How to view the scan estimate

To view the scan estimate for a section, click the <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter icon" width="25"/> next to the three-dot kebab menu icon in the section header. The scan estimate shows the projected data scan, in GB, for all panels in that section.<br/><img src={useBaseUrl('img/dashboards/section/scan-estimate.png')} alt="Section scan estimate popup showing projected GB for panels in that section" style={{border: '1px solid gray'}} width="800"/>

To view the scan estimate for the entire dashboard, broken down by active and collapsed sections, see [Dashboard-level scan estimates](/docs/manage/partitions/estimate-scan-data/#dashboard-level-scan-estimates).

## How to share a dashboard with sections

To share a dashboard with coworkers in your organization, see [Share a Dashboard](/docs/dashboards/share-dashboard-new/). When you open a shared dashboard, queries run only for panels in expanded sections. Panels within collapsed sections do not run queries or use scan resources until you expand the section.

If **Autorefresh** is enabled for the dashboard, only panels within expanded sections are refreshed. Panels in collapsed sections remain unchanged and are refreshed only after their section is expanded.

When you export a dashboard as a report, collapsed sections remain collapsed in the report, reflecting the exact state of the dashboard at the time of export.

## FAQs

### What happens to panels when a section is deleted?

When you delete a section, you can remove only the section (your panels remain on the dashboard) or remove the section along with all its panels. See [How to delete a section](#how-to-delete-a-section).

### Do collapsed sections affect dashboard performance?

No. Queries run only for panels in expanded sections. Panels in collapsed sections do not execute queries or incur scan costs until you expand them.

### How many sections and panels can a dashboard have?

A dashboard can have a maximum of 10 sections, and each section can contain a maximum of 20 panels. See [Section limits](#section-limits).

### Can sections be nested within other sections?

No. Sections cannot be nested. Each section sits at the top level of your dashboard layout.

### What happens to collapsed sections when exporting or sharing a dashboard?

Collapsed sections remain collapsed in exported reports and shared dashboards, reflecting the exact state of the dashboard at the time of export or sharing.

### When do panels inside a section refresh?

Panels refresh only when their section is expanded. If **Autorefresh** is enabled, only panels in expanded sections are automatically refreshed. Panels in a collapsed section refresh when you expand the section.
