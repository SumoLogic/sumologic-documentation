---
id: usage-attribution
title: Usage Attribution
sidebar_label: Usage Attribution
description: Attribute Sumo Logic ingest volume to teams, services, and owners with the Usage Attribution dashboard, custom tags, and an ownership lookup CSV.
keywords:
  - usage attribution
  - granular usage visibility
  - ingest volume
  - chargeback
  - showback
  - data tiers
  - ownership mapping
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Usage Attribution (also called Granular Usage Visibility) is a dashboard in Sumo Logic that attributes your ingest volume to teams, services, environments, and owners. It breaks down volume and data tier by fields such as `_sourceCategory`, collector, and host, or by your own custom tags and ownership fields such as team and owner. It reports volume and data tier only. It does not calculate dollar or credit costs.

Use this to find the teams, services, and environments that ingest the most data, see how that volume splits across data tiers, and map raw source fields to the team and owner responsible for the data. You can also track how much of your volume is still unassigned so you can improve your tagging, and review usage trends over time for chargeback and showback reporting, without building custom dashboards.

## Pre-requisites

Usage Attribution builds on the Data Volume Index. Before you use it:

- Make sure the [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/) is enabled for your organization. Credits accounts need an administrator to turn on **Enable Granular Data Tracking**.
- Make sure you have the permissions to view or configure Usage Attribution. Contact your Sumo Logic administrator if you do not see the tab.

:::note
Usage Attribution data starts from the time you enable it. Sumo Logic does not rebuild historical data.
:::

## How to open Usage Attribution

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**.
1. Click the **Usage Attribution** tab.

### Read the dashboard

The Usage Attribution dashboard is an out-of-the-box dashboard for your organization. Most panels follow the field you select in **Breakdown by**. The default time range is the last 24 hours. Click the time range at the top right of the dashboard to change it.

<img src={useBaseUrl('img/manage/ingestion-volume/usage-attribution/usage-attributes-dashboard.png')} alt="Usage Attributes Dashboard" style={{border: '1px solid gray'}} width="800" />

The dashboard includes the following panels:

- **Total Ingested Volume (GB).** The volume ingested in the selected time range.
- **Entity Count.** The number of distinct values (entities) for the field you selected in **Breakdown by**. For example, if you break down by `collector`, it shows how many collectors sent data.
- **% Volume Tagged.** The share of volume that has a value for the selected field. Use this coverage figure to find how much volume is still unassigned.
- **Tier Share** and **Volume by Tier (GB).** How the volume splits across data tiers (Continuous, Frequent, Infrequent, and Flex).
- **Volume by *field* (Top 10).** The 10 values that account for the most volume for the selected field.
- **Volume Over Time (GB)** and **Volume by Tier Over Time.** Volume over the selected time range, in total and by tier.
- **Ingestion Metadata Detail.** A table of volume by source category and partition. For each row, it shows the tier, total events, volume in GB, and bytes per event.
- **Top Consumers by *field*.** A table that ranks the values of the selected field by volume in GB.
- **Unassigned Volume (GB).** The volume that has no value for the selected field.
- **Active Attribution Dimensions.** The standard tags and custom tags currently configured for Usage Attribution.
- **Active Scope.** The filters currently applied to the dashboard. It shows **All data (no filters applied)** when you have not set any filters.
- **Volume by *field* Over Time.** A line chart of the volume and total bytes for each value of the selected field.
- **Combination Breakdown.** A table of volume for each combination of dimension values and tier, including the share of the volume in scope.
- **Cross-Dimension Matrix: *field* x Tier.** A table of volume and total bytes for each value of the selected field, split by tier.

### How to filter the dashboard

Use the variables at the top of the dashboard to filter the data. The variables are hidden by default. Click the filter icon at the top right of the dashboard to show or hide them.

The variables are:

- **Breakdown by.** A dropdown at the left of the variables that sets the field the dashboard groups volume by. Select `bladeName`, `collector`, `owner`, `partitionName`, `sourceCategory`, `sourceHost`, or `team`. The panels that follow the selected field update to match. For example, select `collector` to see **Volume by collector (Top 10)**, **Top Consumers by collector**, and the other collector panels. The list also includes any custom tags you add and the columns from your ownership lookup CSV.
- **Field boxes.** One box for each field in the **Breakdown by** list: `bladeName`, `collector`, `owner`, `partitionName`, `sourceCategory`, `sourceHost`, and `team`. Enter a value in a box to narrow every panel to data that matches it. For example, enter `prod-k8s-us-west` in the **collector** box to see only the volume, tiers, and entities for that collector. Filtering by a field from your ownership lookup, such as `team` or `owner`, narrows every panel in the same way.
- **Tier.** Select a data tier to show only that tier. The default is **All**.

<img src={useBaseUrl('img/manage/ingestion-volume/usage-attribution/filters-and-time-panels.png')} alt="Usage Attribution dashboard with the filter variables open, including Breakdown by, a box for each field, and Tier" style={{border: '1px solid gray'}} width="800" />

Sumo Logic saves your filters and **Breakdown by** selection, so they remain when you reload the page. You type filter values manually. Autocomplete and multi-select for filter values are not available.

## How to configure Usage Attribution

Use the **Configure Usage Attribution** panel to add custom tags and to manage your ownership lookup. To open it:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Administration**, and then under **Account** select **Account Overview**.
1. Click the **Usage Attribution** tab.
1. Click **Configure** at the top right of the dashboard.

<img src={useBaseUrl('img/manage/ingestion-volume/usage-attribution/configure-button-highlight.png')} alt="Usage Attribution tab with a red box around the Configure button at the top right" style={{border: '1px solid gray'}} width="800" />

The **Configure Usage Attribution** panel opens on the right.

<img src={useBaseUrl('img/manage/ingestion-volume/usage-attribution/configure-panel.png')} alt="Configure Usage Attribution panel with Tags and Lookup Mapping sections" style={{border: '1px solid gray'}} width="300" />

### How to add a custom tag

Custom tags become new dimensions you can break down and filter by, such as `environment` or `cost_center`.

1. Open the **Configure Usage Attribution** panel.
1. Under **Tags**, click **Add Dimension**.
1. Enter a dimension name, and then click the check mark.
1. Click **Save Configuration**.

<img src={useBaseUrl('img/manage/ingestion-volume/usage-attribution/add-dimension.png')} alt="Add Dimension field in the Configure Usage Attribution panel" style={{border: '1px solid gray'}} width="300" />

:::important
A new dimension applies to data ingested after you save the configuration. Sumo Logic does not apply it to data that was already ingested.
:::

To remove a tag, delete it from the **Tags** list and click **Save Configuration**.

### How to map ownership with a lookup CSV

Upload a CSV file to map the values of a tag to the team, owner, and other details that you want to break down by. For example, map each `_sourceCategory` value to a team and an owner.

The CSV needs to follow these rules:

- The first column is the key. Its header needs to match a tag configured for Usage Attribution, such as `sourceCategory`.
- Each remaining column becomes a new field you can use in **Breakdown by** and in filters. For example, `team`, `owner`, or `business_unit`.
- Each row maps one value of the key field to the values for the other columns.

Sample CSV:

```csv
sourceCategory,team,owner
prod/search/indexer,Search,dana@example.com
prod/payments/api,Payments,lee@example.com
prod/data/etl,Data Eng,sam@example.com
infra/k8s/kubelet,SRE,alex@example.com
```

After you upload a CSV, the **Lookup Mapping** section shows the key field and the columns it provides.

To upload a CSV:

1. Open the **Configure Usage Attribution** panel.
1. Under **Lookup Mapping**, click **Upload Lookup CSV**.
1. Select your CSV file.
1. Click **Save Configuration**.

To replace the mapping, upload a new CSV. To change the columns, edit the CSV and upload it again. The breakdown fields update to match the new columns.

To delete the mapping, click **Remove** under **Lookup Mapping**, and then click **Save Configuration**.

## High-cardinality tags

A tag with many distinct values, such as a request ID or a user ID, is a high-cardinality tag. High-cardinality tags make breakdowns harder to read and can slow the dashboard. Sumo Logic may show a warning when a tag has a large number of distinct values. The warning is a soft warning and does not block you from using the tag.

To keep breakdowns useful:

- Choose tags that group data by a team, service, environment, or cost center instead of by an individual event or user.
- Use the **Entity Count** panel to check how many distinct values a field has.
- Map detailed values to a smaller set of values with a lookup CSV, such as mapping many source categories to one team.

## FAQ

### Why is the Usage Attribution tab missing for me?

Make sure you have the required permissions and that the Data Volume Index is enabled for your organization. If both are in place and the tab is still missing, contact your Sumo Logic administrator.

### Why is my dashboard empty or missing recent data?

Usage Attribution data starts from the time you enable it, and Sumo Logic does not backfill earlier data. If you enabled it recently, wait for data to populate, and then reload the page.

### Why does my new tag show no data?

A new tag applies only to data ingested after you save it. Wait for new data to arrive, and then check the dashboard again.

### Why is the % Volume Tagged value low?

Part of your volume has no value for the field you selected in **Breakdown by**. Add the tag to the sources that are missing it, or add the missing values to your lookup CSV.

### What is the difference between Usage Attribution and the Data Volume Index?

The Data Volume Index records how much data you ingest, by fields such as source category, collector, and host. Usage Attribution builds on it. It adds ownership fields, custom tags, and a dashboard that attributes volume to teams and owners.

### Can I see how much my usage costs?

No. Usage Attribution reports volume and data tier only. It does not calculate dollar or credit costs.

### How do I find which team uses the most data?

Select `team` in **Breakdown by**, and then read **Top Consumers by team**. This needs an ownership lookup CSV that includes a `team` column.

## Related documentation

- [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/)
- [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets/)
- [Manage Plan](/docs/manage/manage-subscription/)
