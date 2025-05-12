---
id: upgrade-cloud-flex-legacy-account
title: Upgrade a Cloud Flex Account (Legacy)
description: Learn how to upgrade Cloud Flex (Legacy) account.
---

:::note legacy account type
We recommend transitioning to a our newer [Flex Plan](/docs/manage/manage-subscription/sumo-logic-flex-accounts/) for the newest features and enhanced functionality.
:::

This page has information about upgrading a Cloud Flex Legacy plan, which has the following [account types](/docs/manage/manage-subscription/upgrade-account/upgrade-cloud-flex-legacy-account): Trial, Professional, and Enterprise.

## Upgrade options for legacy accounts

This table summarizes upgrade options for different account types.

| Account Type | Upgrade Options |
| :-- | :-- |
| Trial  | - Professional <br/>- Enterprise—Log ingest is capped at 20GB/day. |
| Professional | - You can increase or decrease the supported product variables while staying a Professional account.<br/>- Enterprise—Log ingest is capped at 20GB/day. |
| Enterprise | - You can increase or decrease the supported product variables; log ingest is capped at 20GB/day. |

## Who can upgrade my organization's account? 

It depends on your current account type:

* If your organization currently has a Sumo Logic Trial account, any admin can perform the upgrade. That admin is then known as the Account Owner, meaning that he or she is the only person in the account that can view and change the credit card information. 
* If your organization already has a Sumo Logic Professional account, only the existing Account Owner can perform upgrades.
* Sumo Logic Enterprise accounts do not have account owners, as all upgrades are handled by a Sumo Logic salesperson.

## Upgrade an account

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account > Manage Plan**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Administration**, and then under **Account** select **Manage Plan**. You can also click the **Go To...** menu at the top of the screen and select **Manage Plan**. <br/>  ![manage-plan-cloudflex.png](/img/manage/subscriptions/manage-plan-cloudflex.png)
1. The left side of the page displays your current account type.
1. **Choose a New Plan**. Click the radio button next to **Professional** or **Enterprise**. If you just want to increase product variable levels for your current account type, do not select a new plan type.
1. **Select New Log and Metric Data Volume**. As you change the values, the upgrade cost shown to the right will adjust.
    * **Log Ingest**. Select an estimate of your daily ingestion, in GB.
    * **Metrics**. Enter an estimate of the metrics to be ingested daily, in data points per minute (DPM.)
1. **Billing Frequency.** Click the radio button next to **Annually** or **Monthly**. 
1. Click **Upgrade**.
1. The page refreshes to display the **Payment Method** step.If you've previously upgraded you may choose to use the existing payment method and click **Next**.
1. To add a new payment method, click **Use a New Credit Card**, enter the credit card information you'd like Sumo Logic to bill, and click **Submit**. <br/>  ![step-2-cloudflex.png](/img/manage/subscriptions/step-2-cloudflex.png)
1. The page refreshes to show the **Confirm Upgrade** step.<br/>   ![order-summary.png](/img/manage/subscriptions/order-summary.png)
1. Read the Service Level Agreements, then click **I have read and agree to the Service Level Agreements** to continue.
1. Click **Confirm** to complete the upgrade. After you click **Confirm**, the credit card you provided to Sumo Logic is charged.
1. The upgrade is processed, then a **Congratulations** screen appears. Click **Finish**.

If you have any issues, or if you do not see a charge on your credit card within 48 hours, contact [support@sumologic.com](mailto:support@sumologic.com).

:::note
The price shown in the screenshots above may not reflect the actual current price.
:::
