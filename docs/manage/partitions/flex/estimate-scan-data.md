---
id: estimate-scan-data
title: Estimate Scan Data
sidebar_label: Estimate Scan Data
description: Learn about the estimate scan data for Flex pricing.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

When you enter a query against Flex pricing, Sumo Logic will estimate and display the amount of data scanned in Flex to return the search results. This detail is vital. With Flex pricing, you're charged for the amount of data that's scanned to complete the query. 

You can view this detail by clicking the meter icon <img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" />. A popup appears that displays the estimated scan data for the chargeable tiers like Infrequent and Flex.

The example below shows the estimate of how much Flex data will be scanned for a query in the scope.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/estimated-scanned-data.png')} alt="estimated-scanned-data" style={{border:'1px solid gray'}} width="800" /> 

When you click on the session ID under the histogram, a popup with more detailed information appears. Here you can see the Flex data scanned for a query in the scope.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/scan-details.png')} alt="scan-details" style={{border:'1px solid gray'}} width="500" />

If there is no pay-as-search tier scanned, a warning message will be displayed in the **Scan Estimates** popup.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/no-scan-data.png')} alt="scan-details" style={{border:'1px solid gray'}} width="400" />

## Monitors

When [creating or modifying a partitions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), you can view the Average scan, Daily scan, and Yearly scan data information based on the selected alert frequency by clicking the meter icon <img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" /> on top of the **Monitor** right side panel. <br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/monitors_1.png')} alt="monitors_1" style={{border:'1px solid gray'}} width="450" /> 

In addition, you can also see the Model training scan details for the anomaly detection method.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/monitors_2.png')} alt="monitors_2" style={{border:'1px solid gray'}} width="450" /> 

:::note
You can view the scan estimates data only if you select the trigger type.
:::

## Scheduled searches

As Sumo Logic charges for each data scan, scheduling searches can help mitigate costs. When [creating or modifying a scheduled search](/docs/alerts/scheduled-searches/schedule-search/#schedule-a-search), you can view the Average scan, Daily scan, and Yearly scanned data information based on the selected run frequency by clicking the meter icon <img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" /> on top of the **Schedule this search** popup. <br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/scan-schedules-search.png')} alt="scan-schedules-search" style={{border:'1px solid gray'}} width="450" />

## Best practices

- Use the `_index` field to reduce the scope of the query.
