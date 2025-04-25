---
id: estimate-scan-data
title: Estimate Scan Data
sidebar_label: Estimate Scan Data
description: Learn about the estimate scan data for Flex pricing.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

When you enter a query against Flex pricing, Sumo Logic will estimate and display the amount of data scanned in Flex to return the search results. This detail is vital. With Flex pricing, you're charged for the amount of data that's scanned to complete the query. 

You can view this detail by clicking the meter icon <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" />. A popup appears that displays the estimated scan data for the chargeable tiers like Infrequent and Flex.

The example below shows the estimate of how much Flex data will be scanned for a query in the scope.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/estimated-scanned-data.png')} alt="estimated-scanned-data" style={{border:'1px solid gray'}} width="800" /> 

When you click on the session ID under the histogram, a popup with more detailed information appears. Here you can see the Flex data scanned for a query in the scope.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/scan-details.png')} alt="scan-details" style={{border:'1px solid gray'}} width="500" />

If there is no pay-per-search data scanned, a warning message will be displayed in the **Scan Estimates** popup.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/no-scan-data.png')} alt="scan-details" style={{border:'1px solid gray'}} width="400" />

## Monitors

When [creating or modifying a monitor](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), you can view the Average scan, Daily scan, and Yearly scan data information based on the selected alert frequency by clicking the meter icon <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" /> on top of the **Monitor** right side panel. <br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/monitors_1.png')} alt="monitors_1" style={{border:'1px solid gray'}} width="450" /> 

In addition, you can also see the Model training scan details for the anomaly detection method.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/monitors_2.png')} alt="monitors_2" style={{border:'1px solid gray'}} width="450" /> 

:::note
You can view the scan estimates data once you select the trigger type.
:::

The **Show Optimization Tips** button displays contextual suggestions for your monitor settings. When clicked, it highlights both the query and trigger sections, displaying relevant optimization tips below each section. These tips are tailored based on whether you're configuring a static or outlier trigger.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/show-optimized-tips.png')} alt="show-optimized-tips" style={{border:'1px solid gray'}} width="450" /> 

## Scheduled searches

As Sumo Logic charges for each data scan, scheduling searches can help mitigate costs. When [creating or modifying a scheduled search](/docs/alerts/scheduled-searches/schedule-search/), you can view the Average scan, Daily scan, and Yearly scanned data information based on the selected run frequency by clicking the meter icon <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" /> on top of the **Schedule this search** popup. <br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/scan-schedules-search.png')} alt="scan-schedules-search" style={{border:'1px solid gray'}} width="450" />

:::note
Daily scan data will not be available if scheduled search runs only on selected days and not daily.
:::

## Scan estimates in SLO

To view the Daily scan and Yearly scan data information based on a log-based SLO:

1. Go to the **Monitoring** and click the **SLO** tab.
1. Hover over your SLO, click the three-dot kebab menu, and then click **Edit**. 
1. Click the meter icon <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" /> in the upper right corner.

- For **Request-based SLOs**, data is scanned once per minute and stored in SLO storage. Any late-arriving data is accounted for in a corrective fashion and appended to the SLO storage.
- For **Window-based SLOs**, data is scanned multiple times per minute. Due to technical reasons, late-arriving data cannot be accounted for, unlike request-based SLOs. Because of this, the SLO results are stored in SLO storage with some delay (typically 1 hour). To display up-to-date SLI values across our various SLO dashboards, we need to scan the last 1 hour of data multiple times.

<img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/scan-estimates-slo.png')} alt="scan-estimates-slo" style={{border:'1px solid gray'}} width="600" />


## Dashboard scan estimates

When you enter a query to create a dashboard panel, Sumo Logic will estimate and display the amount of data scanned in Flex. This detail is crucial because, with Flex Pricing you are charged for the amount of data that is scanned to complete the query.

You can view the scan detail by clicking the meter icon <img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" />. A popup appears that displays the estimated scan data for the chargeable Flex model.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/scan-estimates-dashboard-creation.png')} alt="scan-estimates-dashboard-creation" style={{border:'1px solid gray'}} width="800" />

You can also view the actual amount of data scanned after a dashboard panel has completed loading, helping you to mitigate costs. 

To view the scan estimates for the dashboard panel you have created:
1. Go to the panel for which you want to see the scan details.
1. Click the three-dot kebab menu, and then select **Info**. 
1. You can see the scan data details against **Scanned Bytes - Flex**.

<img src={useBaseUrl('/img/manage/partitions-data-tiers/flex-pricing/scan-estimates-dashboards.png')} alt="scan-estimates-dashboards" style={{border:'1px solid gray'}} width="600" />

## Best practices

- Use the `_index` field to reduce the scope of the query.
