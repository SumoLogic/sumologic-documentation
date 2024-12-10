---
id: sign-up
title: Sign Up and Activate Your Account
sidebar_label: Sign up and activate your account
description: Learn how to sign up with Sumo Logic and create your account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic provides everything you need to conduct real-time forensics and log management for all of your IT data—without the hassle of managing or scaling hardware or storage. Start your 30-day trial and explore the full capabilities of our Continuous Intelligence Platform™, including elastic scalability and powerful analytics.

After your trial, your account will automatically convert to a [Free account](#upgrade-or-continue-with-free-account), allowing you to continue with limited features. You can [upgrade to a paid plan](https://www.sumologic.com/pricing) at any time to unlock premium features. Choose to sign up via the [Sumo Logic website](#sign-up-through-sumo-logic) or the [AWS Marketplace](#sign-up-through-aws-marketplace) and start using Sumo Logic in minutes.

## Sign up through Sumo Logic

To start your free trial:

1. Go to the [Sumo Logic Free Trial page](https://www.sumologic.com/sign-up).
1. Register with a business email address to create your account.
1. Check your inbox for the activation email and follow the steps below.

### Activate your account

:::note
The activation link expires after 3 days. If it expires, you’ll need to complete the sign-up process again.
:::

1. Open the activation email and click **Activate Now**. (If you do not see it, check your spam and trash folders.)
1. Fill out the **Activate Your Account** form, then click **Activate**.
1. Follow the setup guide to install a data collector and start ingesting data.

### Set up Collector

1. Select the platform (Linux, Windows, macOS, or AWS) from which you want to collect data.<br/><img src={useBaseUrl('img/get-started/data-collection.png')} alt="Platform selection showing Linux, Windows, macOS, or AWS" style={{border: '1px solid gray'}} width="400" />
1. Copy, paste, and run the provided command in your Terminal or PowerShell to install the OpenTelemetry collector and relevant dashboards.
1. When the installation is complete, click **Start using Sumo**. <br/><img src={useBaseUrl('img/get-started/install-otel.png')} alt="icon" style={{border: '1px solid gray'}} width="500" />

Next, you'll be taken to your onboarding checklist guide, where you can view dashboards, run your first log search, set up alerts, install more apps for your environment, and more.

### Upgrade or continue with Free account

After your trial ends, your account will automatically convert to a Free account. This account lets you continue using Sumo Logic monitoring and log analytics services with limited features. To unlock premium features and scale as your needs grow, you can upgrade to a paid plan at any time.

With your trial, you’ll have full access to our Enterprise plan to explore all the powerful features Sumo Logic has to offer.

|             | Trial accounts | Free accounts
|:------------|:---------------|:------------
| Data volume daily | 1GB | 500MB
| Users | Up to 20 | Up to 3
| Data Retention <sup>1</sup>| 30 days | 7 days
| Metrics <sup>2</sup> | &#9989; | &#10060;
| Data Forwarding <sup>3</sup> | &#9989; | &#10060;
| Real-time Alerts <sup>4</sup> | &#9989; | &#10060;

<sup>1</sup> Data uploaded to the Sumo Logic Cloud.<br/>
<sup>2</sup> Search through and visualize your data in near real-time, with up to 1000 data points per minute.<br/>
<sup>3</sup> Forwards your logs to an S3 bucket after being collected and analyzed in Sumo Logic.<br/>
<sup>4</sup> Notifies you in real-time when errors occur on your systems.

For information on plan types and pricing, see [Sumo Logic Pricing](https://www.sumologic.com/pricing) and [Manage Subscription](/docs/manage/manage-subscription).

## Sign up through AWS Marketplace

Signing up for a Sumo Logic account through the AWS Marketplace creates a new Sumo Logic organization and account. You'll be billed through your Amazon account.

:::info important
- Use a business email (e.g., no Gmail or Yahoo addresses).
- AWS Marketplace signup is unavailable for existing Sumo Logic accounts.
:::

Select the plan that fits your usage requirements. The first 30 days are free of charge. All Sumo Logic features are supported for your Account Type, based on your subscription plan.

<!-- Update screenshots and instructions. Awaiting clarification from PM. -->

1. Sign in to the [AWS Marketplace](https://aws.amazon.com/marketplace) and search for Sumo Logic.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_new.png')} alt="AWS Marketplace" style={{border: '1px solid gray'}} width="800" />
1. Select a Sumo Logic product and click **View purchase options** or **Try it for free**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_view_purchase_options.png')} alt="View purchase options" style={{border: '1px solid gray'}} width="800" />
1. Configure the software contract and click **Create contract**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_create_contract.png')} alt="Create contract" style={{border: '1px solid gray'}} width="800" />
1. Finalize the software contract and click **Set up your account**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_setup_new.png')} alt="Set up your account" style={{border: '1px solid gray'}} width="400" />
1. You are redirected to Sumo Logic to complete your account creation:
    - **Email** - Enter an email for your account. If you have an existing Sumo Logic account, use a different email address. Signing up through AWS Marketplace will create a new Sumo Logic organization.
    - **Region** - Select your region: North America, Europe, or Australia.
    - Review and accept the [Service License Agreement](https://www.sumologic.com/service-agreement/) to proceed.
1. Click **Sign Up**.

Sumo Logic sends you an email to activate your account.

### Activate your account

1. Open the activation email and click **Activate Now**.
1. Complete the **Activate Your Account** form and click **Activate**.

### Billing

An account that is within its limits is defined as using Reserved Capacity.

Each day you will be billed for your plan’s daily ingest data volume. Each day you can burst over the Reserved Capacity or ingest a lower amount, and at the end of the billing cycle, Sumo Logic computes the total amount for the actual usage during this time. If your actual usage exceeds the total Reserved Capacity for the billing cycle, you will be charged for usage for this difference at the on-demand rate.

The Total Reserved Capacity (usage) is: (the actual number of days in the billing cycle) X (plan daily ingest volume).

For example, for 10GB/Day:

- If the billing cycle is 30 days, the Reserved Capacity is 300GB.
- If the billing cycle is 31 days, the Reserved Capacity is 310GB.

### Upgrade your account

Upgrading increases your reserved capacity to avoid overage charges. If upgrades are allowed for your AWS account, you can upgrade your active account directly from Sumo Logic.

- Payment is handled by Amazon. You do not need to provide any payment information.
- The account upgrade is independent from your AWS subscription. It increases your reserved Sumo Logic ingest volume, so you are less likely to be subject to overage charges.

To upgrade:

1. Click **Upgrade** on the left navigation pane in Sumo Logic.
1. The **Upgrade** button is visible if you have an active AWS account for which upgrades are permitted.
1. On the upgrade request form, enter the Log Ingest level you want to upgrade to. Within 24 to 48 hours, your account will be updated to reflect the change. Once the account is upgraded, the AWS Marketplace will be notified of the change.

To cancel your subscription, you can do this through the AWS Marketplace.

## Kickstart your Sumo Logic experience with placeholder data  

Get started with Sumo Logic effortlessly using **Kickstart Data**, preloaded sample data and dashboards designed to help you explore and understand the platform’s capabilities. With Kickstart Data, you can immediately dive into Sumo Logic's features—like Log Search, Alerts, and Dashboards—without needing to set up your own data sources.  

Whether you're new to Sumo Logic or evaluating its features, Kickstart Data offers a hands-on way to experience the platform's power. For more details, see our [Quickstart Guide](/docs/get-started/quickstart).


## Resources

* [Sumo Logic Quickstart](/docs/get-started/quickstart)
* [Onboarding checklists](/docs/get-started/onboarding-checklists)
* [Free Training and Certification](/docs/get-started/training-certification-faq)
* [Sumo Logic terms and conditions](https://www.sumologic.com/support-terms)
