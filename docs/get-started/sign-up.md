---
id: sign-up
title: Sign Up and Activate Your Account
sidebar_label: Sign up and activate your account
description: Learn how to sign up with Sumo Logic and create your account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic provides everything you need to conduct real-time forensics and log management for all of your IT data without the hassle of managing or scaling hardware or storage. Start your 30-day trial and explore the full capabilities of our Sumo Logic Log Analytics Platform, including elastic scalability and powerful analytics. Sign up through the [Sumo Logic website](#sign-up-through-sumo-logic) or the [AWS Marketplace](#sign-up-through-aws-marketplace) and start using Sumo Logic in minutes.

## Sign up through Sumo Logic

To start your free trial, head to the [Sumo Logic Free Trial page](https://www.sumologic.com/sign-up). You can register for an account using either Google single sign-on (SSO) or your email address.

### Register using Google SSO

1. Click **Continue with Google** and select a Google account to use.
1. Fill out the **Complete Your Account** form, then click **Activate**.
1. Follow the setup guide to install a data collector, apps, and start ingesting data. [Learn more](#what-to-expect-after-activation).

### Register using your email address

1. Click **Continue with email** and enter your business email address.
1. Check your inbox for an activation email and click **Activate Now**.
   :::note
   The activation link expires after 3 days. If it expires, you’ll need to complete the sign-up process again.
   :::
1. Open the activation email and click **Activate Now**. (If you do not see it, check your spam and trash folders.)
1. Fill out the **Activate Your Account** form, then click **Activate**.
1. Follow the setup guide to install a data collector, apps, and start ingesting data. [Learn more](#what-to-expect-after-activation).

### Upgrade your account

During your trial, you’ll have full access to our Enterprise plan, giving you the opportunity to explore the full range of Sumo Logic's powerful features.

| Feature                         | Trial account       |
|:--------------------------------|:--------------------|
| **Data volume daily**           | 1GB             |
| **Users**                       | Up to 20       |
| **Data retention** <sup>1</sup> | 30 days   |
| **Metrics** <sup>2</sup>        | &#9989;   |
| **Data forwarding** <sup>3</sup> | &#9989; |
| **Real-time alerts** <sup>4</sup> | &#9989; |

<sup>1</sup> Data uploaded to the Sumo Logic Cloud.<br/>
<sup>2</sup> Search through and visualize your data in near real-time, with up to 1000 data points per minute.<br/>
<sup>3</sup> Forwards your logs to an S3 bucket after being collected and analyzed in Sumo Logic.<br/>
<sup>4</sup> Notifies you in real-time when errors occur on your systems.

Once your trial ends, you'll need to upgrade to a paid plan to continue using premium features. Below is an overview of the available options. For detailed pricing and plan information, see [Sumo Logic Pricing](https://www.sumologic.com/pricing) and [Manage Subscription](/docs/manage/manage-subscription).

#### Essentials plans

With our self-service checkout, you can upgrade to an Essentials plan in just minutes using a credit card—no need to contact Sales.

- [Upgrade a Flex account](/docs/manage/manage-subscription/upgrade-account/upgrade-sumo-logic-flex-account)
- [Upgrade a Credits account](/docs/manage/manage-subscription/upgrade-account/upgrade-credits-account)

<img src={useBaseUrl('img/manage/subscriptions/essentials-landing-page.png')} alt="Essentials landing page checkout" style={{border: '1px solid gray'}} width="600" />

#### Enterprise plans

If the Essentials plan doesn’t fully meet your needs and you’re interested in exploring further options like Cloud SIEM, contact [Sales](https://www.sumologic.com/contact-us/) to upgrade to an Enterprise plan. Our team is here to help you find the best fit for your organization.

## Sign up through AWS Marketplace

Signing up for a Sumo Logic account through the AWS Marketplace creates a new Sumo Logic organization and account. This option is not available for customers with existing Sumo Logic accounts.

To sign up through AWS Marketplace:

1. Sign in to the [AWS Marketplace](https://aws.amazon.com/marketplace), search for "Sumo Logic", and then click the subscription option of your choice. To sign up with an initial 30-day free trial, select **Sumo Logic Log Analytics Platform (Pay-As-You-Go with 30-day Free Trial)** highlighted below.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_new.png')} alt="AWS Marketplace" style={{border: '1px solid gray'}} width="800" />
1. Click **View purchase options**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_view_purchase_options.png')} alt="View purchase options" style={{border: '1px solid gray'}} width="800" />
1. Configure your free trial contract and click **Subscribe**.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_create_contract.png')} alt="Create contract" style={{border: '1px solid gray'}} width="800" />
1. After the subscription finishes processing, you can set up your account.<br/><img src={useBaseUrl('img/get-started/aws_marketplace_setup_new.png')} alt="Set up your account" style={{border: '1px solid gray'}} width="800" />
1. You are redirected to Sumo Logic to complete your account creation:
    - **Email**. Enter a business email address for your account (personal email addresses such as Gmail are not supported). If you have an existing Sumo Logic account, use a different email address. Signing up through AWS Marketplace requires a new email to create a separate Sumo Logic organization.
    - **Region**. Select your region: North America, Europe, or Australia.
    - **Service License Agreement**. Review and accept the [Service License Agreement](https://www.sumologic.com/service-agreement/) to proceed.
1. Click **Sign Up**. Sumo Logic will send you an email to activate your account. Follow the instructions in the email to complete the activation process.
1. At the end of the 30-day trial period for the Sumo Logic Log Analytics Platform (Pay-As-You-Go with 30-day Free Trial), the subscription converts to the paid subscription billed monthly based on actual usage.

### Upgrade your account

Upgrading increases your reserved capacity to avoid overage charges. If upgrades are allowed for your AWS account, you can upgrade your active account directly from Sumo Logic.

- Payment is handled by Amazon. You do not need to provide any payment information.
- Upgrading increases your reserved Sumo Logic ingest volume, reducing the risk of overage charges.
- Account upgrades are independent from your AWS subscription.

To upgrade:

1. Click **Upgrade** on the left navigation pane in Sumo Logic.
1. The **Upgrade** button is visible if you have an active AWS account for which upgrades are permitted.
1. On the upgrade request form, enter the Log Ingest level you want to upgrade to. Within 24 to 48 hours, your account will be updated to reflect the change. Once the account is upgraded, the AWS Marketplace will be notified of the change.

#### Cancelling

To cancel an auto-renewal subscription, you can do this through the AWS Marketplace under **Manage subscriptions**.

### Billing

An account that is within its limits is defined as using Reserved Capacity. After your trial, if you've signed up for auto-renewal, you will be billed for your plan’s daily ingest data volume.

Each day, you can burst over the Reserved Capacity or ingest a lower amount, and at the end of the billing cycle, Sumo Logic computes the total amount for the actual usage during this time. If your actual usage exceeds the total Reserved Capacity for the billing cycle, you will be charged for usage for this difference at the on-demand rate.

The Total Reserved Capacity (usage) is: (the actual number of days in the billing cycle) X (plan daily ingest volume).

For example, for 10GB/Day:

- If the billing cycle is 30 days, the Reserved Capacity is 300GB.
- If the billing cycle is 31 days, the Reserved Capacity is 310GB.


## What to expect after activation

Once your account is activated—whether you signed up via the Sumo Logic website or AWS Marketplace—you’ll be guided through our personalized onboarding experience. Head to the [Quickstart guide](/docs/get-started/quickstart) to begin your Sumo Logic journey.

You’ll walk through step-by-step instructions to:

* Explore **Kickstart Data**, preloaded with sample log data and dashboards so you can try out features immediately—no setup or ingestion required.
* Perform log searches, visualize data through dashboards, and test out real-time alerts.
* Install recommended apps from the App Catalog.
* Invite teammates and collaborate.
* Start ingesting your own data when you’re ready.

Whether you’re evaluating the platform or just getting started, this hands-on experience is designed to help you quickly understand the value of Sumo Logic and get up and running with confidence.

Once your account is activated, check out the [Quickstart guide](/docs/get-started/quickstart) to begin your Sumo Logic journey. You'll walk through a step-by-step onboarding experience where you can explore preloaded Kickstart Data, try out log search and alerts, visualize data through sample dashboards, install apps, and prepare to ingest your own data—all without any setup required. Whether you're new to Sumo Logic or evaluating its features, this hands-on guide will help you quickly understand the platform's value.

### Sign in to Sumo Logic

Once you're registered for an account, you can sign in using Google SSO, your email address and password, or—if configured by your organization—[identity provider](/docs/manage/security/saml).

### Set up data collection

Here’s a consolidated and streamlined version of your content that avoids repetition, preserves all important details, and improves flow:

---

### Sign in to Sumo Logic

Once you're registered for an account, you can sign in using Google SSO, your email address and password, or—if configured by your organization—an [identity provider](/docs/manage/security/saml).

### Set up data collection

When you're ready to collect your own data:

1. Choose your platform: AWS, Kubernetes, Linux, Windows, or macOS. This installs the OpenTelemetry collector and relevant dashboards.<br/><img src={useBaseUrl('img/get-started/data-onboarding.png')} alt="Data onboarding screen showing platform collection options like AWS, Kubernetes, Windows, macOS" style={{border: '1px solid gray'}} width="600" />
2. For AWS, deploy a single account using a CloudFormation Template, CLI, or Terraform. For Kubernetes, Linux, Windows, or macOS, run the provided install command in your Terminal or PowerShell.

Once installation is complete, click **Start using Sumo**. Your data will begin flowing within a few minutes, and you’ll be guided through a step-by-step onboarding to visualize data in dashboards, run log searches, set up alerts, and more.

Alternatively, you can skip setup and browse our [App Catalog](/docs/integrations) to explore prebuilt apps with guided installation.<br/><img src={useBaseUrl('img/get-started/data-onboarding.png')} alt="Data onboarding screen showing platform collection options like AWS, Kubernetes, Windows, macOS" style={{border: '1px solid gray'}} width="600" />

## Additional information

* [Sumo Logic Quickstart Guide](/docs/get-started/quickstart)
* [Sumo Logic Onboarding Checklists](/docs/get-started/onboarding-checklists)
* [Sumo Logic Free Training and Certification](/docs/get-started/training-certification-faq)
* [Sumo Logic Terms and Conditions](https://www.sumologic.com/support-terms)
