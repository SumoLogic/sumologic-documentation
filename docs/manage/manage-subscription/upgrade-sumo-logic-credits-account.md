---
id: upgrade-sumo-logic-credits-account
title: Upgrade a Sumo Logic Credits Account
description: Learn how to upgrade a Free or Trial account to an Essentials subscription.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has instructions for upgrading a Sumo Logic Free or Trial account to an Essentials account, and for updating an existing Essentials account.

For information about Essentials accounts, see [Credits - Account Types](/docs/manage/manage-subscription/sumo-logic-credits-accounts). 

## Prerequisites

You must be an administrator to upgrade your Sumo Logic account.

## Update a Free or Trial Credits account to Essentials

import EssentialsUpgrade from '../../reuse/essentials-upgrade.md';

<EssentialsUpgrade/>

<!-- Not reflected in Figma
1. **Calculate Sumo Credits to Purchase**. Estimate your daily usage for each product variable. As you change the values, the required credits shown to the right will adjust.
   * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous Tier, in GB.
   * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous Tier.
   * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM).
   * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB. 
-->

## Update an Essentials account

This section provides instructions for modifying your Essentials account. You can switch your billing plan between monthly and annual options, or adjust the levels of log ingest, log retention, metrics, and tracing included in your plan.

* Annual Plan updates. Changes to an annual plan will take effect at the start of your next billing cycle or when your current credit balance is fully depleted. Until then, the update will remain in a "pending" status, and you can cancel it if needed.
* Monthly Plan updates. If you’re making changes to product variables for a monthly plan (without switching to an annual plan), you can choose to apply the update immediately. Otherwise, the changes will take effect at the start of your next billing cycle or when your current credit balance is depleted.

To update your Essentials plan:

1. Go to the **Manage Plan** page.
   * [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Manage Plan**.
   * [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Manage Plan**. You can also click the **Go To...** menu at the top of the screen and select **Manage Plan**. <br/>The page displays information about your current plan: whether it’s monthly or annual, the billing cycle, the total credits for the plan, and the cost per period.
    ![current-plan.png](/img/manage/subscriptions/current-plan.png)
1. Click **Upgrade**. The page refreshes to display the **Customize Plan** step.
1. Choose **Subscription Type**. Click a radio button to change your subscription type from monthly to annual, or from annual to monthly, as desired.
1. **Calculate Sumo Credits to Purchase**. Use the dropdown lists to select new values for each product variable you want to change. As you make your changes, the plan cost and credits values are updated
    * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous Tier, in GB.
    * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous Tier.
    * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM).
    * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB.
1. Click **Continue** to go to the **Payment Method** step.
1. On the **Confirm Payment Method** page, click **Continue** to use the current payment method, or click **Change payment method** to enter new payment details.
1. On the **Confirm Upgrade** page, if you have a monthly plan, you have the option to either upgrade right away, or on your next subscription billing date. The following information, which pertains to an immediate upgrade, is displayed:
    * **Remaining Days**. The number of days remaining in your billing cycle.
    * **Prorated Credits**. The number of credits for your new product variable levels through the end of your billing cycle.
    * **Prorated Cost**. The cost of the credits for your new product variable levels through the end of your billing cycle. This is the amount you’ll be charged in the next billing cycle.

    :::note
    If your plan is annual, rather than monthly, you won't be prompted with the option to upgrade immediately.
    :::

1. To upgrade immediately, leave the **Immediately** option selected in the **When do you want the upgrade to take effect section**. Otherwise, select **When subscription next bills**.
1. Click **Service Level Agreements** to review the terms of your plan, and then click **Confirm** to complete the upgrade.
1. The page refreshes and displays the **Upgrade Successful** message.
    ![upgrade-successful.png](/img/manage/subscriptions/upgrade-success.png)


## Cancel your account

Looking to cancel your Sumo Logic subscription? See [Close or Cancel a Sumo Logic Account](close-cancel-sumo-account.md).
