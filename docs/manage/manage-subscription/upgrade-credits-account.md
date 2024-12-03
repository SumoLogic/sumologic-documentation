---
id: upgrade-credits-account
title: Upgrade a Sumo Logic Credits Account
description: Learn how to upgrade a Free or Trial account to an Essentials subscription.
---

This page has instructions for upgrading a Sumo Logic Free or Trial account to an Essentials account, and for updating an existing Essentials account.

For information about Essentials accounts, see [Credits - Account Types](/docs/manage/manage-subscription/sumo-logic-credits-accounts). 

:::note
For information about canceling a Sumo Logic subscription, see [Close or Cancel a Sumo Logic Account](close-cancel-sumo-account.md).
:::

## Update a Free or Trial Credits account to Essentials

:::note
You must be an admin to upgrade your Credits free or trial account.
:::

1. To initiate your account upgrade:
     * Click the **Upgrade** link at the top of the Sumo Logic UI in your account, or
     * [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Manage Plan**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Manage Plan**. You can also click the **Go To...** menu at the top of the screen and select **Manage Plan**.
2. The **Manage Plan** page appears.
    ![step-1.png](/img/manage/subscriptions/manage-plan-upgrade-to-essentials.png)
3. Click **Upgrade**. The page refreshes to display the **Customize Plan** step.
    ![step-2.png](/img/manage/subscriptions/customize-plan-new-levels.png)
4. **Choose Subscription Type**. Click a radio button to change your subscription type from monthly to annual, or from annual to monthly, as desired. (In this case, we choose Monthly.) Monthly subscription billing is charged at the start of each billing cycle. An annual subscription is billed at the start of the subscription.
5. **Calculate Sumo Credits to Purchase**. Estimate your daily usage for each product variable. As you change the values, the required credits shown to the right will adjust.
   * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous Tier, in GB.
   * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous Tier.
   * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM.)
   * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB. 
6. After making your selection for each product variable, click **Continue**.
7. On the **Enter Payment Method** page, enter your payment details, and click **Submit**.
    ![step-2.png](/img/manage/subscriptions/enter-payment-method.png)
8.  The page refreshes to display the **Confirm Upgrade** step, displaying the cost per period for the subscription, the subscription period, your estimates for each product variable, and the cost of the subscription per period. 
    ![step-3.png](/img/manage/subscriptions/confirm-upgrade.png)
9.  Click **Service Level Agreements** to review the terms of the subscription.
10. To complete the upgrade, click the checkbox to acknowledge the Service Level Agreements, and click **Confirm & Pay**.

:::note
The payment will be calculated for the full day on which you confirm and pay. The start date and time for your subscription will be midnight Pacific Standard Time (PST) of the day you confirm and pay. 
:::

## Update an Essentials account

This section has instructions for making changes to your Essentials account. You can change your plan from monthly to annual or from annual to monthly. You can also increase or decrease the levels of Log Ingest, Log Retention, Metrics, and Tracing provided by your plan.

Updates to an annual plan will take effect upon your next billing cycle, or when your current credit balance is depleted. Until the update takes effect, it will be in a “pending” status and you can cancel it.

When you update the product variables for a monthly plan (without changing to an annual plan), you have the option to upgrade immediately. Otherwise the updates will take effect upon your next billing cycle, or when your current credit balance is depleted.

**To update your Essentials plan**

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Manage Plan**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Manage Plan**. You can also click the **Go To...** menu at the top of the screen and select **Manage Plan**. <br/>The page displays information about your current plan: whether it’s monthly or annual, the billing cycle, the total credits for the plan, and the cost per period.
    ![current-plan.png](/img/manage/subscriptions/current-plan.png)
2. Click **Upgrade**. The page refreshes to display the **Customize Plan** step.
    ![current-levels.png](/img/manage/subscriptions/current-levels.png)
4. Choose **Subscription Type**. Click a radio button to change your subscription type from monthly to annual, or from annual to monthly, as desired.
5. **Calculate Sumo Credits to Purchase**. Use the dropdown lists to select new values for each product variable you want to change. As you make your changes, the plan cost and credits values are updated
    * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous Tier, in GB.
    * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous Tier.
    * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM.)
    * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB.
       ![new-levels.png](/img/manage/subscriptions/new-levels.png)
6. Click **Continue** to go to the **Payment Method** step.
7. On the **Confirm Payment Method** page, click **Continue** to use the current payment method, or click **Change payment method** to enter new payment details.
   ![confirm.png](/img/manage/subscriptions/confirm-payment-method.png)
8. On the **Confirm Upgrade** page, if you have a monthly plan, you have the option to either upgrade right away, or on your next subscription billing date. The following information, which pertains to an immediate upgrade, is displayed:
    * **Remaining Days**. The number of days remaining in your billing cycle.
    * **Prorated Credits**. The number of credits for your new product variable levels through the end of your billing cycle.
    * **Prorated Cost**. The cost of the credits for your new product variable levels through the end of your billing cycle. This is the amount you’ll be charged in the next billing cycle.

    :::note
    If your plan is annual, rather than monthly, you won't be prompted with the option to upgrade immediately.
    :::

   ![confirm-payment-method.png](/img/manage/subscriptions/confirm-payment-method.png)
9. To upgrade immediately leave the **Immediately** option selected in the **When do you want the upgrade to take effect section**. Otherwise select **When subscription next bills…**
10. Click **Service Level Agreements** to review the terms of your plan, and then click **Confirm** to complete the upgrade.
11. The page refreshes and displays the **Upgrade Successful** message.
    ![upgrade-successful.png](/img/manage/subscriptions/upgrade-success.png)
