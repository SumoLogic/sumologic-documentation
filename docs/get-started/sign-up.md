---
id: sign-up
title: Sign Up and Activate Your Account
description: Learn how to sign up with Sumo Logic and create your account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic provides everything you need to conduct real-time forensics and log management for all of your IT data—without having to manage and scale any hardware or storage.

By signing up for a **Trial account**, which you can do through [our website](#sign-up-through-sumo-logic) or [AWS Marketplace](#aws-marketplace), you can start using Sumo Logic in minutes. You'll have 30 days of full Enterprise account access to review and use our Continuous Intelligence Platform&#8482; features.

After 30 days, if you've not purchased a plan, your account will convert to a Sumo Logic [Free account](#upgrade-or-continue-with-free-account), and you can [upgrade to a plan](https://www.sumologic.com/pricing) at any time.

## Sign up through Sumo Logic

To start your 30-day free trial:

1. Go to our [free trial signup page](https://www.sumologic.com/sign-up).
1. Follow the sign-up steps to register and create your free Sumo Logic instance with a business address.

You'll then receive an account activation email.

### Activate your account

:::note
The link in your account activation email will expire after 3 days. If the link has expired, you'll need to complete the signup process again.
:::

To activate your Sumo Logic Trial account:

1. Check your email inbox for the activation Sumo Logic email. If you don't see it, check your Spam and Trash folders.
1. In the email, click **Activate Now**.
1. Fill out the **Activate Your Account** form, then click **Activate**.

Next, you'll be taken to a brief two-step data collector installation process, which will get you up and running with your data in a couple of minutes.

### Set up Collector

1. Select the platform (Linux, Windows, macOS, or AWS) from which you'd like to collect data.<br/><img src={useBaseUrl('img/get-started/data-collection.png')} alt="icon" width="400" />
1. Copy, paste, and run the provided command to your PowerShell or Terminal. This will install the OpenTelemetry collector and relevant dashboards.
1. When finished, click **Start using Sumo**. <br/><img src={useBaseUrl('img/get-started/install-otel.png')} alt="icon" width="400" />

That's it - congrats! Next, you'll be taken to your onboarding checklist guide, where you can view your Dashboards, run your first log search, set up alerts, install more apps for your environment, and more.


### Upgrade or continue with Free account

After 30 days, your Sumo Logic **Trial account** will convert to a **Free account**. You can continue using our monitoring and continuous intelligence services, but with limited features. You can [upgrade to a paid plan](https://www.sumologic.com/pricing) at any time.

|             | Trial accounts | Free accounts
|:------------|:---------------|:------------
| Data volume daily | 1GB | 500MB
| Users | 20 users max. | 3 users max.
| Data retention <sup>1</sup>| 30 days | 7 days
| Metrics <sup>2</sup> | &#9989; | &#10060;
| Data Forwarding <sup>3</sup> | &#9989; | &#10060;
| Real-time alerts <sup>4</sup> | &#9989; | &#10060;

<sup>1</sup> Data uploaded to the Sumo Logic Cloud.<br/>
<sup>2</sup> Search through and visualize your data in near real-time, with up to 1000 data points per minute.<br/>
<sup>3</sup> Forwards your logs to an S3 bucket after being collected and analyzed in Sumo Logic.<br/>
<sup>4</sup> Notifies you in real-time when errors occur on your systems.

For more information, see [Sumo Logic Account Usage](/docs/manage/manage-subscription).

## Sign up through AWS Marketplace

Signing up for a Sumo Logic account through the AWS Marketplace creates a new Sumo Logic organization and account. It allows you to pay your bill using your Amazon account. All you need to sign up is a company email address and your location: North America, Europe, or Australia.

:::info Valid Emails
Do not use a Google or Yahoo email account to create your Sumo Logic account.
:::

Select the plan that fits your usage requirements. The first 30 days are free of charge. All Sumo Logic features are supported for your Account Type, based on your subscription plan.

### Billing

Accounts have two capacities that affect billing:

- An account that is within its limits is defined as using Reserved Capacity.
- An account that is over its limits is defined as using On-Demand Capacity.

Each day you will be billed for your plan’s daily ingest data volume. For example, if your plan is Professional - 10GB/Day, your daily Reserved ingest is 10GB. Each day you can burst over the Reserved Capacity or ingest a lower amount, and at the end of the billing cycle, Sumo Logic computes the total amount for the actual usage during this time. If your actual usage exceeds the total Reserved Capacity for the billing cycle, you will be changed for usage for this difference at the On-Demand Capacity rate.

The Total Reserved Capacity (usage) is: (the actual number of days in the billing cycle) X (plan daily ingest volume).

For example, for 10GB/Day:

- If the billing cycle is 30 days, the Reserved Capacity is 300GB.
- If the billing cycle is 31 days, the Reserved Capacity is 310GB.

These accounts have the following limitations:

- Because signing up through AWS Marketplace creates a new Sumo Logic organization, this option is not available for customers with existing Sumo Logic accounts.
- Personal email addresses such as Gmail or Yahoo are not supported.

To sign up through AWS Marketplace:

1. Sign in to the [AWS Marketplace](https://aws.amazon.com/marketplace) and search for Sumo Logic.<br/>  ![AWS Marketplace](/img/get-started/aws_marketplace_new.png)
1. Select a Sumo Logic product and click **View purchase options** or **Try it for free**.<br/>  ![View purchase options](/img/get-started/aws_marketplace_view_purchase_options.png)
1. Configure the software contract and click **Create contract**.<br/> ![Create contract](/img/get-started/aws_marketplace_create_contract.png)
1. Finalize the software contract and click **Set up your account**.<br/>  ![AWS setup](/img/get-started/aws_marketplace_setup_new.png)
1. You are redirected to Sumo Logic to complete your account creation:
    - **Email** - Enter an email for your account. If you have an existing Sumo Logic account, use a different email address. Signing up through AWS Marketplace will create a new Sumo Logic organization.
    - **Region** - Select your region: North America, Europe, or Australia.
    - Review and accept the [Service License Agreement](https://www.sumologic.com/service-agreement/) to proceed.
1. Click **Sign Up**.

Sumo Logic sends you an email to activate your account, and the Sumo Logic Setup Wizard is displayed.

### Activate your account

Activate your account using the email from Sumo Logic. If you did not find an email, check your Spam and Trash folders.

:::note
You have three days to activate or it will be removed. You can sign up again if you miss activating your account.
:::

To activate your Sumo Logic Trial account:

1. Locate and review the activation Sumo Logic email, then click **Activate Now**.
1. Fill out the **Activate Your Account** form.
1. Click **Activate**.

In a few minutes, your account is activated and the Sumo Logic Setup Wizard displays in a new browser tab.

Next, use the [Setup Wizard](/docs/send-data/setup-wizard) to send your logs to Sumo Logic.

### Upgrade your account

If upgrades are allowed for your AWS account, you can upgrade your active account directly from Sumo Logic.

- Payment is handled by Amazon. You don't need to provide any payment information.
- The account upgrade is independent from your AWS subscription. It increases your reserved Sumo Logic ingest volume, so you are less likely to be subject to overage charges.

To upgrade:

1. Click **Upgrade** on the left navigation pane in Sumo Logic.
1. The **Upgrade** button is visible if you have an active AWS account for which upgrades are permitted.
1. On the Upgrade request form, enter the Log Ingest level you want to upgrade to. Within 24 to 48 hours, your account will be updated to reflect the change. Once the account is upgraded, the AWS Marketplace will be notified of the change.

### Cancel your account

Should you decide to cancel, you can do this through AWS Marketplace.

1. Sign in to the [AWS Marketplace](https://aws.amazon.com/marketplace) and access your account.
1. Go to **Manage your software subscriptions** and select **Sumo Logic**.
1. Click **Cancel subscription**.<br/>  ![AWS Cancel](/img/get-started/aws_marketplace_cancel.png)

Your subscription will be cancelled immediately.

## Resources

* [Sumo Logic Quickstart](/docs/get-started/quickstart)
* [Onboarding checklists](/docs/get-started/onboarding-checklists)
* [Free Sumo Logic Training and Certification](/docs/get-started/training-certification-faq)
* [Sumo Logic terms and conditions](https://www.sumologic.com/support-terms)
