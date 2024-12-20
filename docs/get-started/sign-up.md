---
id: sign-up
title: Sign Up and Activate Your Account
sidebar_label: Sign up and activate your account
description: Learn how to sign up with Sumo Logic and create your account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic provides everything you need to conduct real-time forensics and log management for all of your IT data—without the hassle of managing or scaling hardware or storage.

Sign up for a **Trial account** through [our website](#sign-up-through-sumo-logic) or [AWS Marketplace](#sign-up-through-aws-marketplace) and start using Sumo Logic in minutes. With your trial, you’ll have 30 days of full access to the Enterprise plan to explore all the powerful features Sumo Logic has to offer.

During the trial, you’ll experience the full capabilities of Sumo Logic’s **Continuous Intelligence Platform™**, including real-time forensics and log management, with elastic scalability to support deployments of any size—no complex installations or hardware upgrades required.

After 30 days, your account will automatically convert to a Sumo Logic [Free account](#upgrade-or-continue-with-free-account), allowing you to continue with limited features. You can [upgrade to a paid plan](https://www.sumologic.com/pricing) at any time to unlock premium features.

## Sign up through Sumo Logic

To start your 30-day free trial:

1. Go to our [free trial signup page](https://www.sumologic.com/sign-up).
1. Follow the sign-up steps to register and create your free Sumo Logic Trial account with a business email address.

Once you sign up, you'll receive an account activation email.

### Activate your account

:::note
The activation link in your email expires after 3 days. If it expires, you’ll need to complete the sign-up process again.
:::

To activate your account:

1. Check your inbox for the Sumo Logic activation email. If you do not see it, check your spam and trash folders.
1. Open the email and click **Activate Now**.
1. Fill out the **Activate Your Account** form, then click **Activate**.

Thanks for signing up! After activation, you’ll be guided through a two-step data collector installation process to start ingesting data in minutes.

### Set up Collector

1. Select the platform (Linux, Windows, macOS, or AWS) from which you want to collect data.<br/><img src={useBaseUrl('img/get-started/data-collection.png')} alt="Platform selection showing Linux, Windows, macOS, or AWS" style={{border: '1px solid gray'}} width="400" />
1. Copy, paste, and run the provided command in your Terminal or PowerShell. This will install the OpenTelemetry collector and relevant dashboards. When the installation is complete, click **Start using Sumo**. <br/><img src={useBaseUrl('img/get-started/install-otel.png')} alt="icon" style={{border: '1px solid gray'}} width="500" />

Next, you'll be taken to your onboarding checklist guide, where you can view dashboards, run your first log search, set up alerts, install more apps for your environment, and more.

### Upgrade or continue with Free account

After your trial ends, if you've not purchased a plan, your account will automatically convert to a Free account. This account lets you continue using Sumo Logic monitoring and log analytics services with limited features. To unlock premium features and scale as your needs grow, you can upgrade to a [paid plan](#essentials-plans) at any time.

<details>
<summary>What's the difference between a Trial and a Free account?</summary>

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

</details>

For information on plan types and pricing, see [Sumo Logic Pricing](https://www.sumologic.com/pricing) and [Manage Subscription](/docs/manage/manage-subscription).

#### Essentials plans

Using our self-service checkout, you can sign up for a Sumo Logic Essentials plan in just minutes using a credit card—no need to interact with the sales team. Ready to get started? [Learn how to upgrade your plan](/docs/manage/manage-subscription/upgrade-sumo-logic-credits-account).

<img src={useBaseUrl('img/manage/subscriptions/essentials-landing-page.png')} alt="Essentials landing page checkout" style={{border: '1px solid gray'}} width="600" />

#### Enterprise plans

If the Essentials plan doesn’t fully meet your needs and you’re interested in exploring further options like Cloud SIEM, contact [Sales](https://www.sumologic.com/contact-us/) to upgrade to an Enterprise plan. Our team is here to help you find the best fit for your organization.

## Sign up through AWS Marketplace

Signing up for a Sumo Logic account through the AWS Marketplace creates a new Sumo Logic organization and account. It allows you to pay your bill using your Amazon account. All you need to sign up is a company email address and your location: North America, Europe, or Australia.

:::info Valid Emails
Do not use a Google or Yahoo email account to create your Sumo Logic account.
:::

Select the plan that fits your usage requirements. The first 30 days are free of charge. All Sumo Logic features are supported for your Account Type, based on your subscription plan.

### Billing

An account that is within its limits is defined as using Reserved Capacity.

Each day you will be billed for your plan’s daily ingest data volume. Each day you can burst over the Reserved Capacity or ingest a lower amount, and at the end of the billing cycle, Sumo Logic computes the total amount for the actual usage during this time. If your actual usage exceeds the total Reserved Capacity for the billing cycle, you will be changed for usage for this difference at the on-demand rate.

The Total Reserved Capacity (usage) is: (the actual number of days in the billing cycle) X (plan daily ingest volume).

For example, for 10GB/Day:

- If the billing cycle is 30 days, the Reserved Capacity is 300GB.
- If the billing cycle is 31 days, the Reserved Capacity is 310GB.

These accounts have the following limitations:

- Because signing up through AWS Marketplace creates a new Sumo Logic organization, this option is not available for customers with existing Sumo Logic accounts.
- Personal email addresses such as Gmail or Yahoo are not supported.

To sign up through AWS Marketplace:

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

Activate your account using the email from Sumo Logic. If you did not find an email, check your Spam and Trash folders.

:::note
You have three days to activate or it will be removed. You can sign up again if you miss activating your account.
:::

To activate your Sumo Logic Trial account:

1. Locate and review the activation Sumo Logic email, then click **Activate Now**.
1. Fill out the **Activate Your Account** form.
1. Click **Activate**.

In a few minutes, your account is activated.

### Upgrade your account

If upgrades are allowed for your AWS account, you can upgrade your active account directly from Sumo Logic.

- Payment is handled by Amazon. You do not need to provide any payment information.
- The account upgrade is independent from your AWS subscription. It increases your reserved Sumo Logic ingest volume, so you are less likely to be subject to overage charges.

To upgrade:

1. Click **Upgrade** on the left navigation pane in Sumo Logic.
1. The **Upgrade** button is visible if you have an active AWS account for which upgrades are permitted.
1. On the Upgrade request form, enter the Log Ingest level you want to upgrade to. Within 24 to 48 hours, your account will be updated to reflect the change. Once the account is upgraded, the AWS Marketplace will be notified of the change.

### Cancel your account

Should you decide to cancel, you can do this through AWS Marketplace.

1. Sign in to the [AWS Marketplace](https://aws.amazon.com/marketplace) and access your account.
1. Go to **Manage your software subscriptions** and select **Sumo Logic**.
1. Click **Cancel subscription**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_cancel.png')} alt="AWS Cancel" style={{border: '1px solid gray'}} width="800" />

Your subscription will be cancelled immediately.

## Kickstart your Sumo Logic experience with placeholder data  

Get started with Sumo Logic effortlessly using **Kickstart Data**, preloaded placeholder data designed to help you explore and understand the platform’s capabilities. With Kickstart Data, you can dive in immediately and explore Sumo Logic's features without needing to set up your own data sources.  

Experience the platform with sample dashboards and data tailored to your needs, allowing you to test searches, dashboards, and alerts right away.  

Whether you're new to Sumo Logic or evaluating its features, Kickstart Data provides a hands-on way to experience the power of the platform. For more information, check out our [Quickstart Guide](/docs/get-started/quickstart).  

## Resources

* [Sumo Logic Quickstart](/docs/get-started/quickstart)
* [Onboarding checklists](/docs/get-started/onboarding-checklists)
* [Free Sumo Logic Training and Certification](/docs/get-started/training-certification-faq)
* [Sumo Logic terms and conditions](https://www.sumologic.com/support-terms)
