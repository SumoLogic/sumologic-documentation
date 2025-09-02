---
id: organization-usage-limits
title: Organization Usage Limits
description: Learn to set query level budget to define spending limits for queries. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page provides information about the query budget usage limits, which allows you to define spending limits for queries to prevent unexpected charges. This will help you manage Sumo Logic credits, especially in pay-per-use scenarios, by setting budgets on scan data volume. 

## Ingestion - Throttling Limits

:::info
Only **Administrators** have the access to view the **Ingestion - Throttling Limits** section.
:::

This section provides information about the baseline and throttling limits set. Click **View Usage and Throttling Limits** button to view the logs, traces, and traces ingestion rate over the selected time range. With [View Recent Breaches](/docs/manage/security/audit-indexes/audit-index/#throttling-events) button you can view recent throttling limit breaches.

## Availability

| Account Type | Account Level |
|:--|:--|
| Credits | Free, Trial, Essentials (Flex), Enterprise Operations (Flex), Enterprise Security (Flex), Enterprise Suite |

## Set query size limit

To manage the query size limit follow the below steps:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Organization Usage Limits**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Administration**, and then under **Account**, select **Organization Usage Limits**. You can also click the **Go To...** menu at the top of the screen and select **Organization Usage Limits**. <br/><img src={useBaseUrl('/img/manage/account/organization-usage-limits.png')} alt="organization-usage-limits" style={{border:'1px solid gray'}} width="650"/>
1. **Enable Query Limit**. Select this checkbox and enter the GB value based on your needs. Sumo Logic recommends setting a GB value per query based on the 95th percentile to stay within safe limits. You can also check the query size of the last 10 queries by clicking on **Click here** to help you determine the appropriate size limit. If you leave this checkbox unchecked, no limits will be added to the query.
1. Click **Save Limit**.

:::info
Sumo Logic defines scan as two types:
  - **Foreground interactive search**. Search page UI, Copilot, and Dashboards.
  - **Background search**. API, Scheduled Search, Monitor, Scheduled Views, and SLO. 
:::

:::note
It may take up to 5 minutes for a newly created budget to become active and enforceable in the system.
:::

The **Advanced** method for setting the budgets allows you to configure limits for individual users and helps admins assign roles for easier group selection. [Learn more](/docs/manage/manage-subscription/scan-budgets).
