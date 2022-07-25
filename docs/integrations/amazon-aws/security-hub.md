---
id: security-hub
title: Sumo Logic App for AWS Security Hub
sidebar_label: AWS Security Hub
description: AWS Security Hub
---

import useBaseUrl from '@docusaurus/useBaseUrl';


<img src={useBaseUrl('img/integrations/amazon-aws/security-hub.png')} alt="DB icon" width="50"/>

AWS Security Hub is an AWS security service that provides a comprehensive view of your security state within AWS and your compliance with the security industry standards and best practices.

The Sumo Logic App for AWS Security Hub leverages findings data from Security Hub and visually displays security state data in Dashboards. The dashboards provide a high-level view of findings, showing the type, when they occurred, the resources that were affected, their severity, and their distribution, showing the current security and compliance status of an AWS account from all sources.

Sumo Logic provides a seamless bi-directional integration with AWS Security Hub with the following:

* **[AWS Security Hub forwarder](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Security_Hub/1-Ingest-findings-into-AWS-Security_Hub)** - This solution forwards (sends) scheduled search results and alerts (as findings) to AWS Security Hub.
* **[AWS Security Hub collector](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Security_Hub/2-Collect-Findings-for-the-AWS-Security-Hub-App)** - This solution collects findings from AWS Security Hub to Sumo Logic where they are displayed in visual pre-defined dashboards.

The Sumo Logic integration with AWS Security Hub extends compliance checks to other key regulatory frameworks such as PCI, GDPR, HIPAA, and others.

For more information on AWS Security Hub, refer to the [Amazon AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) documentation.

Log Types

The AWS Security Hub utilizes the following log types:

* [Amazon findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)


## Send findings to AWS Security Hub
This page shows you how to enable Sumo Logic as a Finding Provider, deploy the AWS Security Hub forwarder, create a Webhook connection, and create a scheduled search.


## Collect Findings for the AWS Security Hub App
This page shows you how to add a hosted collector and AWS S3 Source and deploy an AWS Security Hub collector.



## Installing the AWS Security Hub App

Now that you have set up ingested and collected findings for AWS Security Hub, you can install the Sumo Logic App for AWS Security Hub and use the preconfigured searches and [Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Lambda/AWS-Lambda-App-Dashboards#Dashboards) that provide insight into your data.

To install the Sumo Logic App for AWS Security Hub, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the Security Hub Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.


**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Overview

**The AWS Security Hub - Overview Dashboard** provides a high-level view of findings results. Panels display data aggregated by the number of providers, findings by provider, total findings, findings in AWS accounts by severity, top recent findings, findings by resource type and severity, most severe findings, and critical findings comparison. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:

* Track findings from different finding providers.
* Get a high-level overview of actionable items from a security perspective.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Overview.png')} alt="AWS Security Hub dashboard" />


### Types

**The AWS Security Hub - Types Dashboard** provides a visual analysis of findings by AWS accounts and types namespace for: category, classifier, timeline, severity distribution, and severity Box Plot. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:
* Isolate important security findings based on finding types.
* Analyze the findings distribution across AWS accounts and their severity.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Types.png')} alt="AWS Security Hub dashboard" />


### Compliance

**The AWS Security Hub - Compliance Dashboard** provides a high-level visual analysis of compliance status, resource failures, AWS account failures, failed events, status timelines, status and severity distribution and finding types. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:
* Monitor failing compliance checks.
* Analyze the distribution of failed compliance checks across AWS accounts, their severity and finding types.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Compliance.png')} alt="AWS Security Hub dashboard" />

### Resources Affected

**The AWS Security Hub - Resources Affected Dashboard** provides a high-level visual analysis of findings by resource type by time interval, top critical resource IDs, AWS account, and the findings details. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:

* Discover which critical resources are affected.
* Analyze how they are distributed across AWS accounts.
* Filter on Finding Type, Resource Type, Provider, AWS Account, Title, Category, Resource Type with the Finding details panel.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_ResourcesAffected.png')} alt="AWS Security Hub dashboard" />
