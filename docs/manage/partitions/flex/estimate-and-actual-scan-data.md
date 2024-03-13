---
id: estimate-and-actual-scan-data
title: Estimate and Actual Scan Data
sidebar_label: Estimate and Actual Scan Data
description: Learn about the estimate and actual scan data for Flex pricing.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::important
Search modifier `_datatier` is not supported for any Flex query.
:::

When you enter a query against Flex pricing, Sumo Logic will estimate and display the amount of data that is scanned in Flex to return the search results. This detail is vital. With Flex pricing, you're charged for the amount of data that's scanned to complete the query. 

You can view this detail by clicking the meter icon <img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="meter-icon" width="25" />. A popup appears on click, which displays the estimated scan data breakup for the chargeable tiers like Infrequent and Flex. 

The example below shows the estimate of how much Flex data will be scanned for a query in the scope.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/estimated-scanned-data.png')} alt="estimated-scanned-data" style={{border:'1px solid gray'}} width="800" /> 

After you run a query, you can see the actual Flex data was scanned for a query in the scope.<br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/actual-scanned-data.png')} alt="actual-scanned-data" style={{border:'1px solid gray'}} width="800" />

:::note
If there is no pay-as-search tier scanned, a warning message will be displayed in the **Scan Estimates** popup.
:::

When you click in the status area under the histogram, a popup with more detailed information appears. <br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/scan-details.png')} alt="scan-details" style={{border:'1px solid gray'}} width="500" />

As Sumo Logic charges for each data scan, scheduling searches can help mitigate costs. When creating or modifying a scheduled search, you can view the data scanned in the **Time Range for Scheduled Searches** based on the selected run frequency. <br/><img src={useBaseUrl('/img/partitions-data-tiers/flex-pricing/scan-schedules-search.png')} alt="scan-schedules-search" style={{border:'1px solid gray'}} width="450" />

## Best practices

- Use the `_index` field to reduce the scope of work.