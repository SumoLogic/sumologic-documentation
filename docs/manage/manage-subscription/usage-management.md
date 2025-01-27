---
id: usage-management
title: Usage Management
description: Learn to set query level budget to define spending limits for queries. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page provides information about the Scan Budgets, which allows you to define spending limits for queries to prevent unexpected charges. This will help you manage Sumo Logic credits, especially in pay-per-use scenarios, by setting budgets on scan data volume. 

Sumo Logic provides two modes with which you can set the query limits:
- Basic
- Advanced

## Basic

### Availability

| Account Type | Account Level |
|:--------------|:--------------------------------------|
| Credits | Free, Trial, Essentials (Flex), Enterprise Operations (Flex), Enterprise Security (Flex), Enterprise Suite |

### Set query size limit

To manage the query size limit using the **Basic** configuration:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Usage Management**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Administration**, and then under **Account**, select **Usage Management**. You can also click the **Go To...** menu at the top of the screen and select **Usage Management**. <br/><img src={useBaseUrl('/img/manage/account/usage-management.png')} alt="usage-management" style={{border:'1px solid gray'}} width="650"/>
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

## Advanced

The **Advanced** method for setting scan budgets allows you to configure limits for individual users and helps admins assign roles for easier group selection. This method also provides flexibility in your actions when the budget limit is reached.

### Availability

| Account Type | Account Level |
|:--------------|:--------------------------------------|
| Credits | Essentials (Flex) and Enterprise Suite |

### Set scan budgets

To create the query size limit using the **Advanced** configuration:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Usage Management**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Administration**, and then under **Account**, select **Usage Management**. You can also click the **Go To...** menu at the top of the screen and select **Usage Management**.
1. Navigate to **Advanced** tab and click on **+ Create Scan Budget**. <br/><img src={useBaseUrl('/img/manage/account/usage-management-advanced.png')} alt="usage-management" style={{border:'1px solid gray'}} width="800"/>
1. **Scope**. Include or exclude the users and roles for whom the scan budget should apply.
1. **Capacity**. You can set either query level or time-phased budgets. You can also check the query size of the last 10 queries by clicking on the **Click here** button to help you determine the appropriate size limit.
    - **Query level budgets**. Select **Query** from the **Budget Type** dropdown and enter the GB value based on your needs. Sumo Logic recommends setting a GB value per query based on the 95th percentile to stay within safe limits. 
    - **Time-phased budgets**. Select **Daily**, **Weekly**, or **Monthly** from the **Budget Type** dropdown and enter the maximum amount of budget in GB. You can set a single shared budget for an entire group by selecting the **Capacity for the Group** option, whereas, you can set a budget for individual user in the selected scope by selecting the **Capacity per User** option.
    :::note
    - For **Daily** budgets, the capacity resets at midnight PST.
    - For **Weekly** budgets, the capacity resets on Monday at 00:00 PST.
    - For **Monthly** budgets, the capacity resets on the 1st day of every calendar month at 00:00 PST.
    :::
1. **Action**. Select the type of action/response you require when the budget limit is reached.
    - **Show Warning to the user**. Query result will be displayed with a the error message.
    - **Only allow background query scans**. A warning message will be displayed if you run a query that exceeds the budget set. This will block the foreground searches but will not impact any background searches/automated queries.
    :::info
    Sumo Logic defines scan as two types:
    - **Foreground interactive search**. Search page UI, Copilot, and Dashboards.
    - **Background search**. API, Scheduled Search, Monitors, Scheduled Views, and SLO. 
    :::
1. **Details**. Enter the name for the scan budget.<br/><img src={useBaseUrl('/img/manage/account/create-scan-budget.png')} alt="create-scan-budget" style={{border:'1px solid gray'}} width="650"/>
1. Click **Save** to create the scan budget.

:::note
It may take up to 5 minutes for a newly created budget to become active and enforceable in the system.
:::

### View details about a Scan Budget

To view the selected scan budget:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Usage Management**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Administration**, and then under **Account**, select **Usage Management**. You can also click the **Go To...** menu at the top of the screen and select **Usage Management**.
1. Navigate to **Advanced** tab and click the row with the scan budget you want to view.
1. In the details section: <br/><img src={useBaseUrl('/img/manage/account/view-scan-budget.png')} alt="view-scan-budget" style={{border:'1px solid gray'}} width="400"/>
  - **Edit**. Click the **Edit** button to open the pane for editing. Edit the required fields and click on **Save**.
    :::note
    You can only edit the **Capacity** for *Org-wide Query Budget* set using Basic.
    :::
  - **Deactivate/Activate**. Click the **Deactivate/Activate** button to deactivate/activate the selected scan budget.
  - **Delete**. Click the **Delete** button to delete the selected scan budget.
  - **View violations**. Sumo Logic recommends a GB value per query as per the 95th percentile to be within the safe limits. You can also check the query size of the last 10 queries by clicking on **Click here** to help you determine the appropriate size limit.
  - **Budget Type**. Defines the type of budget set: Query level or time-phased budgets.
    - **Per Query Budget**. Limits the data (in GBs) that a single query can consume. If the query size exceeds the set limit, you will not be able to continue scanning until they are within the query size limit.
    - **Time phased budgets**. Limits the data (in GBs) that a single user or a group can consume based on the time phase selected while creating the budget.
  - **Status**. Describes if the scan budget is active or inactive.
  - **Usage Category**. Describes the type of scan. For Flex this is shown as **Flex Scan** and for Data tier this is shown as **Infrequent Scan**.
  - **Scope**. Displays the list of roles or users for whom the selected scan budget is applied for or excluded from.
  - **Capacity (per user)**. Describes the budget set for individual user search.
  - **Action when capacity reached**. Describes the type of action sected to notify when the budget limit is reached.
  - **Reset every day/week/month at**. Displays the time phase when the budget can reset.
  - **Created**. The user who created the scan budget. 
  - **Modified**. The user that most recently modified the scan budget.
  - **Audit Logs**. Records the budget definition changes. Click on **View Details** to view the budget definition changes.
  - **System Audit**. Records the breaches and budget enforcement. Click on **View Details** to view the list of breaches.

## FAQs

### Handle overlapping budgets

When you configure multiple budgets for the same user, the scope with the largest capacity takes precedence. However, if the budgets are of same values (for example, Budget A and Budget B are of same value 10 GB) then the most restrictive budget takes precedence. 

### Exceeding the scan budget 

When you perform a log search, if the results exceed the specified capacity limit, an error message will be displayed with no results. For example, consider you set a budget of 1 GB/query, and when your log search results exceed the set budget limit, an error message will be displayed as shown below.<br/><img src={useBaseUrl('/img/manage/account/exceed-scan-budget-warning.png')} alt="exceed-scan-budget-warning" style={{border:'1px solid gray'}} width="800"/>

## Update the budget time window, applied on, capacity, or action

- Changing the time window (for example, from Daily to Weekly) resets budget usage, and the new configuration is applied immediately.
- Adjusting the **Applied on** setting (for example, from Capacity for the Group to Capacity per User) resets budget usage, with the updated configuration taking effect immediately.
- Updating the budget **Capacity** (for example, from 10GB to 20GB) applies the new limit instantly, with error and warning messages reflecting the changes.
- Modifying the budget **Action** (for example, from StopForegroundScan to Warn) updates the system behavior immediately, issuing a warning message when the new threshold is breached.

## Manage new user addition to an existing budget

If you are added to an existing budget as a new user, your usage will draw from the remaining capacity, aligned with the updated configuration and the specified limits for your role.

## Handling budgets in relation to each other

Each budget type (daily, weekly, monthly, or query) is treated independently, without conflicts between them. Usage is evaluated based on the maximum capacity defined for each budget type. For example, if the daily budget is exceeded and a Stop action is triggered, the user will be blocked from scanning until the daily budget resets, regardless of any remaining capacity in the monthly budget.