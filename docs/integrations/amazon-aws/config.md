---
id: config
title: Sumo Logic App for AWS Config
sidebar_label: AWS Config
description: AWS Config
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/config.png')} alt="DB icon" width="50"/>


Amazon Web Services (AWS) Config provides a simple web services interface that can be used to track modifications made to the resources that belong to an AWS account. The Sumo Logic App for AWS Config presents modification notifications that contain snapshots of resource configurations and information about the modifications made to a resource. The app uses predefined Live and Interactive Dashboards and filters, which provide visibility into your environment for real-time analysis of overall usage.


## Collecting Logs and Metrics

### Log Types
The Sumo Logic App for AWS Config leverages AWS Config’s Simple Notification Service (SNS) notifications.



## Installing the AWS Config App

Now that you have configured AWS Config, install the Sumo Logic App for AWS Config to take advantage of the pre-configured searches and dashboards to analyze your AWS Config data.

To install the app:

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


## Viewing AWS Config Dashboards

This section describes the dashboards provided by the AWS Config app. For general information about dashboards, see [About Dashboards](https://help.sumologic.com/Visualizations-and-Alerts/Dashboards/01-About-Dashboards).

The AWS Config app is an older application, implemented when Sumo dashboards could not be toggled back and forth between Live and Interactive mode. For this reason, the app provides two versions of the AWS Config Overview dashboard, one that runs in Live mode, and one that runs in Interactive mode.


### AWS Config Overview

The AWS Config Overview dashboard runs in Live mode. Live mode dashboards automatically refresh; they do not backfill with historical data.  An interactive version of this dashboard, described in the following section, is also provided.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-config-overview.png')} alt="AWS Config" />

**Recent Modifications.** Displays the number of Resource Change Notifications as a single value chart for the last 24 hours.

**Configuration Activity by AWS Region.** Shows the distribution of the Resource Change Notifications by AWS Region in a map chart for the last 14 days.

**Changed Resources by Type.** Provides the Resource Change Notifications of type “OK” in a pie chart of (Resource Changed, not Created or Deleted) grouped by Resource Type for the last 14 days.

**Resource Modifications Trend.** Provides the distribution of the Resource Change Notifications by AWS Resource in a stacked bar chart for the last 14 days.

**Discovered Resources by Type.** Displays the Resource Change Notifications of type “ResourceDiscovered” grouped by Resource Type in a pie chart for the last 14 days.

**Modifications by Day - Outlier.** Displays the quantity of Resource Change Notifications grouped by day in an outlier line chart for the last 14 days.

**Modifications by Day - Trend.** Shows the quantity of Resource Change Notifications in a line chart with a trend line grouped by day for the last 14 days.

**Deleted Resources by Type.** Displays the Resource Change Notifications of type “ResourceDeleted” grouped by Resource Type in a pie chart for the last 14 days.


### AWS Overview - Interactive

This dashboard is identical to the [AWS Config Overview](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Config/AWS-Config-App-Dashboards#AWS_Config_Overview) dashboard, described above, but runs in interactive mode. In interactive mode, a dashboard backfills with historical data, per your selected time range, but does not automatically refresh. You can manually refresh an interactive dashboard, by refreshing your browser, or using the **Refresh** option on the Details menu on the dashboard.


### Resource Modifications Details - Interactive

This dashboard runs in interactive mode. As described above, interactive dashboards backfills with historical data, and must be manually refreshed to see new data.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Config_app_resource.png')} alt="AWS Config" />

**Resource Modifications.** Shows a table of recent Resource Change Notifications, including the configuration diff provided in the SNS Notification for the last six hours.

**Resource Relationships.** Displays a table of relationships related to the resources modified in recent Resource Change Notifications for the last six hours.

**Resource Tags.** Provides a table of tags related to the resources modified in recent Resource Change Notifications for the last six hours.

**Resource Modifications Trend.** Displays the distribution of the Resource Change Notifications by AWS Resource in a stacked column chart for the last 14 days.

**Network ACL Rules.** Shows a table of Network ACL Rules related to the NetworkAcl resources modified in recent Resource Change Notifications for the last six hours.

**VPN Gateway Telemetry.** Provides a table of Telemetry messages related to the VPNConnection resources modified in recent Resource Change Notifications for the last six hours.


#### Filters

The following filters are provided for use with the AWS Overview - Interactive and Resource Modifications Details - Interactive dashboards.
* **Resource Type.** The type of the resource modified. Examples: `AWS::EC2::Instance`, `AWS::EC2::NetworkAcl`
* **Resource Id.** The id of the resource modified. Examples: `vpc-0000001`, `i-ffffffff`
* **Region.** The AWS Region where the resource modified is located. Examples: `us-east-1`, `us-west-2`
* **Account Id.** The AWS Account containing the resource modified. Example: `1234567891011`
* **Tag.** The Tag key displayed in the Resource Tags panel. Examples: `Name`, `Stack`.
* **Tag Value.** The Tag Value displayed in the Resource Tags panel. Examples: `Test-VPN`, `DB Instance`.
