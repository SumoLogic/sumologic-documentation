---
id: sdo-manual-configuration
title: Manual SDO Configuration
sidebar_label: Manual Configuration
description: Learn how to set up the Software Development Optimization (SDO) Solution. You will manually configure collection and install apps for tool integration, create field extraction rules (FERs) for each supported tool, and install the SDO app.
---

These instructions help you prepare and set up the Software Development Optimization (SDO) Solution manually, without using Terraform. You will manually configure collection and install apps for tool integration, create field extraction rules (FERs) for each supported tool, and install the SDO app.

## Before you begin
Before setting up the SDO solution, you need to complete the following tasks:

* Ensure that you have permissions to configure software and platforms used in your DevOps toolchain that will emit data to Sumo using webhooks (for example, Jira, GitHub, GitLab, Bitbucket, CircleCI, PagerDuty, Opsgenie, and so on).
* If you use Jenkins, ensure that you have access to Jenkins with Manage Plugins permissions.
* Make sure you have access to the Sumo logic web app. The user account associated with a Sumo Logic role needs the following permissions:

  * Manage field extraction rules
  * View Fields
  * View field extraction rules
  * Manage Collectors
  * View Collectors
  * Manage Fields
  * Manage connections
  * Manage Content
* Create a Sumo Logic API key and ID  for the above user.

## Configure Collection and Install Apps

To set up the SDO solution manually, configure collection and install apps for each tool that you want to integrate with this solution. Complete the following instructions for each app integration:

* [Jira Cloud](/docs/integrations/app-development/jira-cloud)
* [Jira Server](/docs/integrations/app-development/jira)
* [GitHub](/docs/integrations/app-development/github)
* [Bitbucket App](/docs/integrations/app-development/bitbucket)
* [Jenkins](/docs/integrations/app-development/jenkins)
* [PagerDuty](/docs/integrations/saas-cloud/PagerDuty-V2)
* [Opsgenie](/docs/integrations/saas-cloud/Opsgenie)
* [GitLab](/docs/integrations/app-development/gitlab)
* [CircleCI](https://circleci.com/docs/sumo-logic-integration/)

## Create New FERs

You will need to manually [create new field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule.md) (FERs) that map events from tools of your choice to the SDO event schema by using the scope and parse expression from this [JSON file](https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/software-development-optimization-terraform/sdo_app_artifacts/sdo_fer.txt)
of field extraction rules for each tool.

:::note
When you copy the scope, replace the `$$<toolname>` variable with the source category you configured for the tool you configured when installing apps for tool integration.
:::

## Install the SDO App

Install the Sumo Logic App for Software Development Optimization to use the pre-configured searches and [dashboards](../install-sdo-app-view-dashboards.md) that provide you insights and visibility into your DevOps phases and pipelines.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the App Catalog, search for and select the app.
1. Select the version of the service you're using and click Add to Library.
    :::note
    Version selection is applicable only to a few apps currently. For more information, see the Install the Apps from the Library.
    :::
1. To install the app, complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app.
    * **Data Source.** Select either of these options for the data source.
        * Choose **Source Category**, and select a source category from the list.
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`).
    * **Advanced.** Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
1. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Complete Post-Setup Configurations

After setting up the SDO solution, you can complete post-setup configuration.

## Post Setup Configuration

After completing configuration, instrument your DevOps pipeline to specially identify and send build and deploy events in your pipeline to Sumo Logic. These events are correlated with other events in the DevOps lifecycle.

Complete the configuration for the build and deploy tool you use.

### Bitbucket for build and deploy

1. Access the Sumo Logic Platform and navigate to **Manage Data** > **Collection** page.
1. Search for *Software Development Optimization* Collector.
1. Under this Collector, click on **Show URL** for the source **Bitbucket Cloud.** Make a note of this **URL** and use this URL to configure the Bitbucket CI/CD Pipeline to collect deploy events:
   * **Deploy**: Follow the steps outlined in [this document](/docs/integrations/app-development/bitbucket#Collecting-Logs-for-Bitbucket-app) to configure the Bitbucket CI/CD Pipeline to collect deploy events.

### Jenkins for build and deploy

1. Install the latest Jenkins Plugin as described [here](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins).
1. Access the Sumo Logic Platform and navigate to **Manage Data** > **Collection** page.
1. Search for *Software Development Optimization* Collector.
1. Under this Collector, click on **Show URL** for the source **Jenkins.** Make a note of this **URL** and **Source Category,** you will use these to configure the Jenkins Plugin :
    * **Build Pipeline Stages**: Follow [Configure Jenkins Plugin,](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins) and optionally [Optional - Advance Configuration](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins) to configure the Jenkins Sumo Logic plugin.
    * **Build**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Build Events to Sumo Logic.
    * **Deploy**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Deploy Events to Sumo Logic.

### CircleCI for build and deploy

If you're using CircleCI for Build and Deploy, do the following:

1. Access the Sumo Logic Platform and navigate to **Manage Data** > **Collection** page.
1. [Configure a hosted collector](/docs/send-data/hosted-collectors) to ingest CircleCI data into Sumo and call it `Software Development Optimization`.
1. Under this collector, create the following two [http sources](/docs/send-data/hosted-collectors/http-source/logs-metrics):
   * `_sourcecategory=circleci/job-collector`
   * `_sourcecategory="circleci/workflow-collector"`
1. Copy and save displayed URLs associated with the sources. You will use this information to upload data.
1. We navigate to the CircleCI project environment. We need to create three [environment variables](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) in project settings of the environment:
   * `CIRCLE_TOKEN = <API personal token created in CircleCi>`
   * `JOB_HTTP_SOURCE = <url of job-collector source created above in step 3>`
   * `WORKFLOW_HTTP_SOURCE = <url of workflow-collector source created above in step 3>`
1. Add the [sumo orb](https://circleci.com/developer/orbs/orb/sumologic/sumologic) in the configuration file of the project to send custom-data elements to Sumo. You can find a sample config.yml file [here](https://sumologic-app-data.s3.amazonaws.com/SDO/config.yml.zip).
1. Navigate to **Manage Data** > **Logs** page. We select the Field Extraction Rules tab.
1. [Create two FERs](/docs/manage/field-extractions/create-field-extraction-rule.md) for CircleCI build and deploy events. The parse expression and the scope of the FERs is available [here](https://raw.githubusercontent.com/SumoLogic/sumologic-solution-templates/master/software-development-optimization-terraform/sdo_app_artifacts/sdo_fer.txt).

### Other Tools for build and deploy

The platform is ready to ingest logs and use those to light up corresponding build and deploy events related dashboards.

If you're using **tools other than Jenkins and Bitbucket pipelines** for Build and Deploy phases:

1. **Build**: Configure your tool to construct and send events using the build event schema in the section Build Event. 
1. **Deploy**: Configure your tool to construct events using the deploy event schema in the section Deploy Events.
