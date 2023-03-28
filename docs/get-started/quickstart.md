---
id: quickstart
title: Quickstart Your Sumo Logic Experience
sidebar_label: Quickstart
description: Follow our quickstart guide to get up and running with Sumo Logic in minutes.
tags: [get started, getting started]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/business/mission.png')} alt="icon" width="50"/>

Sumo Logic provides extensive features and options to gather, monitor, and analyze data, manage your infrastructure, integrate with third-party applications, and so much more!

Follow this quickstart guide to connect, integrate, configure, and start using Sumo Logic for your organization. If you're new to Sumo Logic, check out the [Sumo Logic Overview](/docs/get-started/overview).

What you'll learn:
* Get your data into Sumo
* Search and analyze your data
* Monitor and troubleshoot your environment
* Share your findings with your team

:::sumo Need help?
Contact us at the [Sumo Dojo Slack](https://sumodojo.slack.com/) or [submit a support ticket](https://support.sumologic.com/hc/en-us).
:::

## Your Sumo Logic Journey

Sumo Logic puts the power of data analytics at the fingertips of everyone on your team. Sumo's pre-configured searches and at-a-glance visual dashboards make it easy to search, filter, and analyze your data. Visual displays of up-to-date data allow you to monitor the health and fitness of your application and network, providing insights for troubleshooting and timely resolutions.

Let's get started!

## Step 1: Get your data into Sumo

:::tip
If you haven't yet, sign up for free trial through [Sumo Logic or AWS Marketplace](/docs/get-started/sign-up).
:::

The journey of 10,000 logs begins with a single collector. Your data analytics journey starts by sending your data to Sumo.

### Set up Collector

After you've logged into Sumo Logic, choose a collector.

#### OpenTelemetry Collector

[OpenTelemetry Collector](/docs/send-data/opentelemetry-collector)

1. Go to **App Catalog** and click on the app you'd like to install.
1. Click the **Add a New Collector** option during app installation.
1. After you've installed the collector, you'll be prompted with instructions to set up the source.

<!--
:::note
Only V2 apps have the "Add a New Collector" option. For V1 apps and below,
:::
-->

#### Installed and Hosted Collectors

Go to **Manage Data** > **Collection** > **Collection** tab, and select **Add Collector**. Next, choose from a local [Installed Collector](/docs/send-data/installed-collectors) or web-[Hosted Collector](/docs/send-data/hosted-collectors).

Next, you'll choose the data sources that will provide the most value for you.

### Set up Source

You can set up a Source when your Installed Collector appears in the table on the Collection page, by navigating to the collector and selecting **Add** > **Add Source**. For more information, see [Sources for Installed Collectors](/docs/send-data/installed-collectors/sources/) and [Hosted Collectors](/docs/send-data/hosted-collectors/).

![WTS_Collection_Page](/img/get-started/WTS_Collection_Page.png)

For more information, see [Choosing a Sumo Logic Collector and Source](/docs/send-data/choose-collector-source/).


## Step 2: Search and analyze your data

Once your data is available in Sumo, you and your colleagues can search your logs and metrics to identify unusual conditions or errors that could indicate a problem. You do this by creating queries and parsing the resulting messages.

You can start a log search, metrics search, or live tail from the Sumo Home page by clicking the respective icon. For walkthrough instructions on how to create a query and parse the messages, see [About Search Basics](/docs/search/get-started-with-search/search-basics/about-search-basics/).

![WTS Home Search Icons](/img/get-started/WTS_Home-Search-icons.png)

The [Setup Wizard](/docs/send-data/setup-wizard) is a quick way to get started loading data into Sumo Logic, then searching an analyzing the data with Sumo Logic's predefined searches and dashboards.

## Step 3: Monitor and troubleshoot your environment

Not sure how to use your data to monitor and and troubleshoot your environment? Sumo Logic offers a variety of Apps with predefined queries and visualizations that help you get up and running quickly.

### App Catalog

You can **browse our library of available apps** by selecting **App Catalog** in the left navigation panel, then scrolling through the library or entering a name in the search field. For more information, see [Apps and Integrations](/docs/get-started/apps-integrations/).

![Apps Catalog](/img/get-started/WTS_Apps-Catalog.png)

### Dashboards

You can **view your data with predefined searches and dashboards** that facilitate monitoring and troubleshooting. For more information, see [Get Started with Metrics](/docs/metrics/introduction/get-started-metrics/).

![View Dashboards](/img/get-started/WTS_View-Dashboards.png)

## Step 4: Share your findings with your team

You have downloaded an app and analyzed your data with searches and dashboards. You may even have [modified your dashboards](/docs/dashboards/edit-dashboards/manage-dashboards), and now you want to share your findings with your team. You can easily share a dashboard by clicking the share icon in the top menu bar.

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

![Welcome Learn](/img/get-started/Welcome_learn.png)

Don't just learn it - master it! Get recognized as a Sumo Logic expert by completing the courses in the [Sumo Logic Certification Program](/docs/get-started/training-certification-faq/#what-certifications-does-sumo-logic-offer). We’re happy to help you get certified right from the product.


## More Resources

* [AWS Observability Quickstart](/docs/observability/aws/quickstart). This guide will walk you through setting up the Sumo Logic AWS Observability integration.
* [Kubernetes Quickstart](/docs/observability/kubernetes/quickstart). Get up and running with the Sumo Logic Kubernetes solution in minutes.
* [Traces Quickstart](docs/apm/traces#quickstart). This guide demonstrates how to measure application microservice performance.
* [Ingest Budgets Quickstart](/docs/manage/ingestion-volume/ingest-budgets/quickstart). Learn how to create and use Ingest Budgets.

See more quickstart tutorials in the [Sumo Logic Training Portal](/docs/get-started/training-certification-faq/#how-do-i-access-the-training-portal).
