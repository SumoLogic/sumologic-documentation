---
id: upgrade-cloud-flex-credits-account
title: Upgrade a Cloud Flex Credits Account
---

This section has instructions for upgrading a Sumo Logic Free or Trial account to a monthly or annual Essentials account, and for requesting updates to an existing Essentials account.

For information about Essentials accounts, see [Cloud Flex Credits - Account Types](cloud-flex-credits-accounts.md). 

:::note
For information about cancelling a Sumo Logic subscription, see [Close or Cancel a Sumo Logic Account](close-cancel-sumo-account.md).
:::

## Update a Free or Trial Credits account to Essentials

:::note
You must be an admin to upgrade your CloudFlex Credits free or trial account.
:::

1. To initiate your account upgrade, click the **Upgrade** link at the top of the Sumo Logic UI in your account, or go to **Administration** \> **Account** \> **Manage Plan**.
1. The **Manage Plan** page appears. The left side of the page displays the type of account you currently have.

    ![step-1.png](/img/subscriptions/upgrade-cloud-flex-step-1.png)

1. Choose **Monthly Subscription** or **Annual Subscription**. Monthly subscription billing is charged at the start of each billing cycle. An annual subscription is billed at the start of the subscription.
1. Estimate your daily usage for each product variable. As you change the values, the required credits shown to the right will adjust.

   * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous tier, in GB.
   * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous tier.
   * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM.)
   * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB. 

1. After making your selection for each product variable, click **Upgrade to Essentials**.
1. The page refreshes to display the **Payment Method** step.

    ![step-2.png](/img/subscriptions/upgrade-cloud-flex-step-2.png)

1. Enter credit card and contact details and click **Submit**. 
1. The page refreshes to display the **Confirm Upgrade** step, displaying the cost per period for the subscription, the subscription period, your estimates for each product variable, and the cost of the subscription per period. 

    ![step-3.png](/img/subscriptions/upgrade-cloud-flex-step-3.png)

1. Click **Service Level Agreements** to review the terms of the subscription.
1. To complete the upgrade, click the checkbox to acknowledge the Service Level Agreements, and click **Confirm & Pay**.

:::note
The payment will be calculated for the full day on which you confirm and pay. The start date and time for your subscription will be midnight Pacific Standard Time (PST) of the day you confirm and pay. 
:::

## Request updates to your Essentials plan

If you want to change the levels for any of the product variables in your Essentials plan, you can request an account update on the **Manage Plan** page. 

1. Go to **Administration** \> **Account** \> **Manage Plan**. The page displays your current product variable levels.

    ![update-plan-from-essentials.png](/img/subscriptions/update-plan-from-essentials.png)

1. Click **Update Plan**.
1. On the **Update Plan** popup:

    * **Email**. Enter your email address.
    * **Continuous Log Ingest**. Select an estimate of your daily ingestion to the Continuous tier, in GB.
    * **Continuous Log Storage**. Select the number of days you want to retain the data ingested to the Continuous tier.
    * **Metrics**. Enter an estimate of the [metrics](/docs/metrics) to be ingested daily, in data points per minute (DPM.)
    * **Tracing Ingest**. Enter an estimate of your daily ingestion of [transaction traces](/docs/apm/traces), in GB.
    * **Other Details**. (Optional)

1. Click **Submit Request**.    

    ![update-plan.png](/img/subscriptions/update-plan.png)

1. Your update request will be sent to your Sumo Logic Account Manager.     
