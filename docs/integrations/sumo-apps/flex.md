---
id: flex
title: Flex 
sidebar_label: Flex
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

<img src={useBaseUrl('img/integrations/sumo-apps/flex-tier.png')} alt="Thumbnail icon" width="55"/>

With Sumo Logic Flex, you gain an efficient and centralized log analytics framework capable of managing enterprise-wide cloud-scale log ingestion without cost concerns. It aligns cost to business value and overcomes today’s ever-growing data challenge by only charging customers for data storage and analytics executed. This revolutionary new consumption model provides customers with a scalable and efficient log analytics architecture that grows to manage enterprise-wide and cloud-scale log ingestion without the risk of runaway costs.

<details>
<summary><strong>Micro Lesson</strong>: Viewing the Flex App Dashboards</summary>
<Iframe url="https://www.youtube.com/embed/kn3SVhAIwDk?si=nMQBWvp5Ruo-nOaB"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
</details>
    
## Log types

- [Log and Tracing Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index/)
- [Metrics Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index/)
- [Log Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/#log-search-audit-index-message-fields)

:::info
By default, [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index/) and [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/#log-search-audit-index-message-fields) are enabled to collect data for the Flex app.
:::

### Log samples

<details>
<summary>Click to expand</summary>
```json
[
    {
    "field":"sourcename_and_tier_volume",
    "dataTier":"Flex",
    "sizeInBytes":11555,
    "count":1
    },
    {
    "field":"collector_and_tier_volume",
    "dataTier":"Flex",
    "sizeInBytes":366,
    "count":1
    },
    {
    "field":"source_metrics_volume",
    "dataTier":"Flex",
    "sizeInBytes":4463,
    "count":47
    },
    {
    "field":"source_and_tier_volume",
    "dataTier":"Flex",
    "sizeInBytes":731,
    "count":1
    },
    {
    "field":"sourcehost_metrics_volume",
    "dataTier":"Flex",
    "sizeInBytes":4973,
    "count":47
    },
    {
    "field":"sourcecategory_metrics_volume",
    "dataTier":"Flex",
    "sizeInBytes":5362,
    "count":47
    },
    {
    "field":"PDET/CIS/AWS/Vanta/Flow",
    "dataTier":"Flex",
    "sizeInBytes":70759,
    "count":126
    },
    {
    "field":"collector_volume",
    "dataTier":"Flex",
    "sizeInBytes":262,
    "count":1
    },
    {
    "field":"sourcename_metrics_volume",
    "dataTier":"Flex",
    "sizeInBytes":5481,
    "count":47
    },
    {
    "field":"collector_metrics_volume",
    "dataTier":"Flex",
    "sizeInBytes":5159,
    "count":47
    },
    {
    "field":"view_volume",
    "dataTier":"Flex",
    "sizeInBytes":364,
    "count":1
    },
    {
    "field":"",
    "dataTier":"Flex",
    "sizeInBytes":333,
    "count":19
    },
    {
    "field":"PDET/CIS/AWS/GuardDuty",
    "dataTier":"Flex",
    "sizeInBytes":30471,
    "count":15},
    {
    "field":"sourcehost_and_tier_volume",
    "dataTier":"Flex",
    "sizeInBytes":1158,
    "count":1
    },
    {
    "field":"view_and_tier_volume",
    "dataTier":"Flex",
    "sizeInBytes":546,
    "count":1
    },
    {
    "field":"PDET/CIS/AWS/CloudTrail/Analytics",
    "dataTier":"Flex",
    "sizeInBytes":62273,
    "count":70
    },
    {
    "field":"sourcecategory_volume",
    "dataTier":"Flex",
    "sizeInBytes":6485,
    "count":1
    },
    {
    "field":"sourcehost_volume",
    "dataTier":"Flex",
    "sizeInBytes":794,
    "count":1
    },
    {
    "field":"sedemostag/events",
    "dataTier":"Flex",
    "sizeInBytes":22790,
    "count":19
    },
    {
    "field":"source_volume",
    "dataTier":"Flex",
    "sizeInBytes":497,
    "count":1
    }
]
```
</details>

### Sample queries

``` sql title="Ingest Volume - GB/Day"
_index=sumologic_volume 
| parse regex "(?<data>\{[^\{]+\})" multi
| json field=data "field","dataTier","sizeInBytes","count" as sourcecategory, dataTier, bytes, count
| where _sourceCategory matches "sourcecategory_and_tier_volume" and dataTier matches "Flex"
| bytes/1024/1024/1024 as gbytes 
| sum(gbytes) as gbytes
| ((queryEndTime() - queryStartTime())/(1000*60*60*24)) as duration_in_day
| gbytes / duration_in_day as %"GB/Day"
| fields %"GB/Day"
```
For more examples, refer to [Log and Tracing Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index/) and [Metrics Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index/).

## Installing the Flex app

Flex app will be pre-installed for all the Flex users. 

1. Navigate to **App Catalog > Installed Apps** to find the installed Flex app. 
1. Click the **Flex** app tile.
1. Go to **What's Included > Dashboards: View content in Library** to preview the dashboards.

If you do not have the Flex app installed, follow the below steps.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Flex app dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Flex - Overview** dashboard displays the amount of data that you are ingesting and scanning in logs. It also helps you understand how much data you are ingesting in Metrics and Tracing.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Overview.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" /> 

### Capacity Utilization

The **Flex - Capacity Utilization** dashboard displays the subscribed, actual, and percentage capacity utilization for logs and metrics.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Capacity-Utilization.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" /> 

### Credits Consumed

The **Flex - Credits Consumed** dashboard provides visibility into the total amount of [Sumo Logic Credits](/docs/manage/manage-subscription/sumo-logic-credits-accounts) consumed by your organization. This allows you to monitor and control search costs.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Credits-Consumed.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" /> 

:::note
The `credits_conversion` parameter indicates the credits consumed per 1 GB of scan. The credits conversion used in the dashboard and saved searches might be different from what is defined in your contract (Credits Table) based on your account subscription type, so update this parameter for accurate calculation. Check with your account executive to determine this value for your account.
:::

### Feature Level Scan Volume

The **Flex - Feature Level Scan Volume** dashboard provides visibility into the scan volume at a feature level in order to monitor and control cost at a feature level.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Feature-Level-Scan-Volume.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" />

:::note
The `credits_conversion` parameter indicates the credits consumed per 1 GB of scan. The credits conversion used in the dashboard and saved searches might be different from what is defined in your contract (Credits Table) based on your account subscription type, so update this parameter for accurate calculation. Check with your account executive to determine this value for your account.
:::

### Log Spikes

The **Flex - Log Spikes** dashboard helps to review details of your data ingested for logs.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Log-Spikes.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" />

### Logs

The **Flex - Logs** dashboard helps you see your log ingest volume between default and non-default indexes along with the predicted growth. This dashboard also provides details about the data volume scan and predicted growth for scan volume.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Logs.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" />

### Metrics

The **Flex - Metrics** dashboard helps you review metrics details of your data ingestion and identify areas of high-volume ingest.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Metrics.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" />

### Tracing

The **Flex - Tracing** dashboard helps to review Tracing details of your data ingest and to identify areas of high-volume ingest.<br/><img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Flex/Flex-Tracing.png" alt="Flex-Overview" style={{border:'1px solid gray'}} width="800" />

## Upgrade/Downgrade the Flex app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Flex app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
