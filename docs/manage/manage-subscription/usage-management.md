---
id: usage-management
title: Usage Management (Beta)
description: Learn to set query level budget to define spending limits for queries. 
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

This page provides information about the Scan Budgets, which allows you to define spending limits for queries to prevent unexpected charges. This will help you manage Sumo Logic credits, especially in pay-per-use scenarios, by setting budgets on scan data volume. 

To manage the query size limit:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Administration > Account > Usage Management**. <!--Kanso <br/> [**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu, select **Administration**, and then under **Account**, select **Usage Management**. You can also click the **Go To...** menu at the top of the screen and select **Usage Management**. Kanso--><br/><img src={useBaseUrl('/img/account/usage-management.png')} alt="usage-management" style={{border:'1px solid gray'}} width="650"/>
1. You will have two options to manage the query size limit:
    - **Unlimited**. By selecting this, no limits will be added to the query. However, if you run an unoptimized query, excessive data will be scanned and accordingly the scan cost will be increased.
    - **Size Limit**. Enter the GB value based on your needs. Sumo Logic recommends a GB value per query as per the 95th percentile to be within the safe limits. You can also check the query size of the last 10 queries by clicking on **Click here** to help you determine the appropriate size limit.<br/><img src={useBaseUrl('/img/account/usage-management-click-here.png')} alt="usage-management-click-here" style={{border:'1px solid gray'}} width="300"/>
1. Click **Save Limit**.

After setting the limit, you can click on the **View violations** button to see any breaches that have occurred. Each breach above the set audit limit will generate an audit log, and you can view the details in the log search using the Sumo Logic's pre-built queries.

When you configure multiple budgets for the same user, the scope with the largest capacity takes precedence. If there is still an overlap, the budget with the most restrictive action takes precedence. For example, if you are a part of multiple groups with different query size budgets, the one with the largest capacity will be applied.

A warning message will be displayed if you run a query that exceeds the budget set, which will block the foreground searches, such as querying in search UI, dashboards, and copilots, but will not impact any background searches, such as scheduled search, monitors, SLO, and API.<br/><img src={useBaseUrl('/img/account/usage-management-warning.png')} alt="usage-management-warning" style={{border:'1px solid grey'}} width="700"/>