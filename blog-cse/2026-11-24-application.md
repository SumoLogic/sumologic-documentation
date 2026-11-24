---
title: November 24, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - filter
  - insights
  - cloud siem
hide_table_of_contents: true
---

## OR operator support in the Insights list APIs

The insight list APIs now support the `OR` condition for filtering insights across multiple assignees, statuses, severities, and many more. Previously, multiple filters could only be combined using the `AND` condition.

For example, filtering on `Assignee is Amy` `OR` `Assignee is John` now returns insights assigned to either person.

:::note
Existing saved filters and API queries keep working, and `AND` is still supported.
:::
