---
id: quickstart
title: Quickstart Your Sumo Logic Experience
sidebar_label: Quickstart
description: Follow our quickstart guide to get up and running with Sumo Logic in minutes.
keywords:
  - quickstart
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/mission.png')} alt="icon" width="35"/>

Sumo Logic provides extensive features and options to gather, monitor, and analyze data, manage your infrastructure, integrate with third-party applications, and so much more!

Follow this quickstart guide to connect, integrate, configure, and start using Sumo Logic for your organization. If you're new to Sumo Logic, check out the [Sumo Logic Overview](/docs/get-started/overview).

What you'll learn:
* Get your data into Sumo
* Search and analyze your data
* Monitor and troubleshoot your environment
* Share your findings with your team

## Prerequisites

You'll need a Sumo Logic account. Sign up for a free trial [here](/docs/get-started/sign-up).

## Getting started with Kickstart Data in your trial

With your [Sumo Logic trial](/docs/get-started/sign-up), you can access preloaded placeholder Kickstart Data to explore Sumo Logic instantly prior to setting up your own data. This feature helps trial users see immediate value and bypass setup barriers like firewall and security configurations.

:::warning limited availability
* Your trial workflow—Kickstart Data or custom data—is automatically determined by marketing-based user profiling. Manual selection of a workflow is not currently supported.
* This feature is only available to select trial users during the initial rollout phase.
:::

### Key benefits

* **Immediate insights**. Explore Sumo Logic right away, without initial data setup, to quickly see its value and decide if it’s a fit for you.
* **Quick setup**. Kickstart Data removes technical hurdles, making onboarding faster and easier.
* **Guided experience**. Access pre-built dashboards and reports that demonstrate real-world scenarios, helping you make the most of your trial.
* **Safe exploration**. Evaluate our platform in a secure environment with no exposure of sensitive data.

### How it works

1. **User assignment**. When you start your trial, you will be automatically assigned to either the Kickstart Data workflow or a custom data workflow, based on your user profile.
2. **Sample dashboards**. If you are assigned the Kickstart Data option, sample data will be preloaded into the platform, along with dashboards and log searches tailored to your monitoring and troubleshooting use cases.
   * **Application reliability**. Metrics like Homepage Load Time, Checkout Errors, and Internal Server Orders.
   * **Business KPIs**. Revenue Trends, Promo Performance, and Customer Feedback Metrics.
3. **Onboarding checklist**. You will follow a guided checklist that helps you:
    * Analyze sample data.
    * Perform log searches.
    * Invite team members to join and explore the platform with you.
4. **Seamless transition to real data**. After you complete the sample data onboarding steps, you can set up your own data ingestion while continuing to use the platform’s core features. When your trial ends, Kickstart Data is deactivated automatically.

You can skip Kickstart Data anytime and begin ingesting your own data.

## Step 1: Get your data into Sumo

The journey of 10,000 logs begins with a single collector. Your data analytics journey starts by sending your data to Sumo.

### Set up Collector

:::info
OpenTelemetry is our preferred collector unless you're configuring security data ingestion.
:::

#### OpenTelemetry Collector

1. Log in to Sumo Logic.
1. In the main Sumo Logic menu, select **App Catalog**.
1. Click the app you'd like to install.
1. Click the **Add a New Collector** option during app installation.
   :::note
   Only V2 apps have the **Add a New Collector** option.
   :::
1. After you've installed the collector, you'll be prompted with instructions to set up the source.

#### Installed and Hosted Collector

1. Log in to Sumo Logic.
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. Select **Add Collector**.<br/><img src={useBaseUrl('img/get-started/WTS_Collector_page.png')} alt="Add Collector" />
1. Choose from our [Hosted Collector](/docs/send-data/hosted-collectors) (web-hosted) or [Installed Collector](/docs/send-data/installed-collectors) (locally installed on your machine).

### Set up Source

In this step, you'll choose the data sources that will provide the most value for you.

#### OpenTelemetry Collector

See [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector).

#### Installed and Hosted Collector

1. Find your Collector in the Collection page table and select **Add** > **Add Source**. <br/>![WTS_Collection_Page](/img/get-started/WTS_Collection_Page.png)
1. Follow the prompts to set up your desired Source. For more information on configuring specific sources, see [Installed Collector Sources](/docs/send-data/installed-collectors/sources/) and [Configure a Hosted Collector Source](/docs/send-data/hosted-collectors/configure-hosted-collector/#step-2-configure-a-source).

## Step 2: Search and analyze your data

Once your data is available in Sumo, you and your colleagues can search your logs and metrics to identify unusual conditions or errors that could indicate a problem. You do this by creating queries and parsing the resulting messages.

You can start a log search, metrics search, or live tail from the Sumo Home page by clicking the respective icon. For walkthrough instructions on how to create a query and parse the messages, see [About Search Basics](/docs/search/get-started-with-search/search-basics/about-search-basics/).

## Step 3: Monitor and troubleshoot your environment

Not sure how to use your data to monitor and and troubleshoot your environment? Sumo Logic offers a variety of Apps with predefined queries and visualizations that help you get up and running quickly.

### App Catalog

You can **browse our library of available apps** by selecting **App Catalog**, then scrolling through the library or entering a name in the search field. For more information, see [Apps and Integrations](/docs/get-started/apps-integrations/).

![Apps Catalog](/img/get-started/WTS_Apps-Catalog.png)

### Dashboards

You can **view your data with predefined searches and dashboards** that facilitate monitoring and troubleshooting. For more information, see [Get Started with Metrics](/docs/metrics/introduction/get-started-metrics/).

![View Dashboards](/img/get-started/WTS_View-Dashboards.png)

## Step 4: Share your findings with your team

You have downloaded an app and analyzed your data with searches and dashboards. You may even have [modified your dashboards](/docs/dashboards/panels/modify-chart), and now you want to share your findings with your team. You can easily share a dashboard by clicking the share icon in the top menu bar.

![Share Dashboard](/img/get-started/WTS_Share-dashboard.png)

You have the ability to share with individual users and groups with specific roles, setting the specific access permissions. You can edit the sharing permissions at any time, and share and revoke permissions as needed. For more information, see [Content Sharing in Sumo Logic](/docs/manage/content-sharing).

## Have fun with Sumo Logic

Learning and mastering Sumo skills is important, but so is having fun. Enjoy the Sumo journey. The journey is its own reward when you empower others along the way.


## Training and Certification

Knowledge is power, and Sumo Logic provides tools for you to empower yourself. Within Sumo Logic, you have easy access to training, help, and a community of other Sumo Logic users. [Learn more](/docs/get-started/training-certification-faq).

From the Sumo Logic Home page, click the **Learn** tab to access:

- Quickstart videos
- Getting Started tutorials
- Sumo docs, support, community, and training

<img src={useBaseUrl('img/get-started/Welcome_learn.png')} alt="Learn tab" style={{border: '1px solid gray'}} width="800" />

Don't just learn it - master it! Get recognized as a Sumo Logic expert by completing the courses in the [Sumo Logic Certification Program](/docs/get-started/training-certification-faq/#what-certifications-does-sumo-logic-offer). We’re happy to help you get certified right from the product.


## More Resources

:::sumo Need help?
Contact us at the [Sumo Dojo Slack](https://sumodojo.slack.com/) or [submit a support ticket](https://support.sumologic.com/support/s).
:::

* [Choosing a Sumo Logic Collector and Source](/docs/send-data/choose-collector-source/)
* [Kubernetes Quickstart](/docs/observability/kubernetes/quickstart). Get up and running with the Sumo Logic Kubernetes solution in minutes.
* [Traces Quickstart](/docs/apm/traces/quickstart). This guide demonstrates how to measure application microservice performance.

See more quickstart tutorials in the [Sumo Logic Training Portal](/docs/get-started/training-certification-faq/#how-do-i-access-the-training-portal).
