---
id: sdo-setup-with-terraform-script
title: SDO Setup with Terraform Script
sidebar_label: Terraform Configuration
description: Learn how to set up the Software Development Optimization (SDO) Solution using a Terraform script.
---

These instructions help you prepare and set up the Software Development Optimization (SDO) Solution using a Terraform script. 

The Terraform script performs the following actions:

* Creates Sumo Logic collection resources including Collector, Sources, and Folder.
* Configures collection mechanisms in the supported tools, for example Webhooks in Pagerduty and GitHub.
* Sets up Sumo Logic Field Extraction Rules (FERs) to enrich the data.
* Configures connections in Sumo Logic to send alerts from Sumo Logic to issue management and incident management platforms including Jira, PagerDuty, and Opsgenie. 
* Installs Sumo Logic Apps in the configured folder.

The Terraform script requires a set of parameters to be configured.

## Before you begin
Before setting up the SDO solution, you need to complete the following tasks:

* Create or collect API Keys and credentials for Jira, GitHub, GitLab, Jenkins, Bitbucket, CircleCI, and Opsgenie with Webhook creation capabilities.
* Get access to Jenkins with Manage Plugins permissions.
* Make sure you have access to the Sumo logic console. The user account associated with a Sumo Logic role needs the following permissions:
  * Manage field extraction rules
  * View Fields
  * View field extraction rules
  * Manage Collectors
  * View Collectors
  * Manage Fields
  * Manage connections
  * Manage Content
* Create a Sumo Logic API key and ID  for the above user.

### Terraform Script Setup Considerations

The Terraform Script automates the setup of all the necessary resources for collecting Atlassian, GitHub, GitLab, and Pagerduty product logs and displaying the data in Sumo Logic pre-configured intuitive-analytic dashboards.   

Review the following considerations before proceeding with the Terraform template method:

* With the Terraform script, you can easily manage the integration of Sumo Logic with Atlassian products (including Bitbucket, Jira, Jira Service Desk, and Opsgenie), GitHub, GitLab, CircleCI, and Pagerduty. If you would like to bring your own toolset, follow [this page to integrate your tool with the SDO solution](../integrate-tools-with-sdo.md).
* The Terraform script allows you to quickly get started by installing a copy of the configured applications. After the initial setup, if you need additional copies of the Sumo Logic applications, you can install them from the Sumo Logic App catalog.
* If you plan to integrate Jenkins with this solution, you need to complete additional configuration. The Terraform script does not configure Jenkins. See the following guides to install and configure the Jenkins Sumo Logic plugin:
  * [Install the Jenkins Plugin](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins)
  * [Configure Jenkins Plugin](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins)
  * [Optional - Advanced Configuration](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins)
  * In [Configure Jenkins Plugin](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins), a source category is configured which is utilized by the plugin.  Use this source category in the file **sumologic.auto.tfvars file**. The Jenkins source, app, and FERs are installed by Terraform.
* This script configures Jira Server WebHooks and creates resources in Sumo Logic. Jira Server Logs collection needs to be configured as explained in Step 1 [here](/docs/integrations/app-development/jira#Collecting-Logs-for-the-Jira-App). Configure the log collection and update the variable *jira_server_access_logs_sourceCategory* in **atlassian.auto.tfvars** with the selected source category.
* If you plan to integrate CircleCI with the SDO solution, you need to complete additional configuration. The Terraform script does not configure CircleCI. Use the following steps configure the CircleCI Sumo Logic plugin. Once configured, this plugin will send CircleCI Workflow and Job related data to Sumo Logic: * Since the SDO dashboards require ‘environment’, ‘team’, and ‘service’ fields for lighting up panels, you need to send them as [*custom-data*](https://circleci.com/developer/orbs/orb/circleci/sumologic#usage-examples) in the configuration file of the pipeline.
  * Add the [*sumo orb*](https://circleci.com/developer/orbs/orb/circleci/sumologic) in the configuration file of the project to send custom-data elements to Sumo:<br/>![circleci-custom-data.png](/img/sdo/circleci-custom-data.png)
    See [*this sample*](https://sumologic-app-data.s3.amazonaws.com/SDO/config.yml.zip) CircleCI Configuration file which sends CircleCI data, including custom-data, to Sumo Logic.
  * The Terraform script also allows you to only install the CircleCI app from the app catalog. It creates a source with placeholder value for _sourceCategory from the **sumologic.auto.tfvars** file.
* Sumo Logic to Jira and Sumo Logic to Opsgenie Webhooks are in Beta. To participate, contact your Sumo account executive.

### SDO Script File Groups

The SDO solution script is organized into following groups of files ([GitHub repository](https://github.com/SumoLogic/sumologic-solution-templates)):

| Group | Files |
| :-- |:-- |
| Configuration Files | sumologic.auto.tfvars<br/>sumologic_fer.auto.tfvars<br/>sumologic_webhooks.auto.tfvars<br/>pagerdutyv2.auto.tfvars<br/>pagerdutyv3.auto.tfvars<br/>github.auto.tfvars<br/>gitlab.auto.tfvars<br/>atlassian.auto.tfvars<br/>circleci.auto.tfvars |
| Sumo Logic Resource Creation Files | sumologic_collection_content.tf<br/>sumologic_fer.tf<br/>sumologic_webhooks.tf |
| Other Systems Resource Creation Files | atlassian.tf<br/>pagerduty.tf<br/>pagerdutyv2.auto.tfvars<br/>pagerdutyv3.auto.tfvars<br/>github.tf<br/>gitlab.tf |
| System Files | outputs.tf<br/>providers.tf<br/>variables.tf |
| Test Files | integration_test.go<br/>fileutil.go<br/>unit_tests.sh |

## Set Up the Terraform environment

Before you run the Terraform script, please perform the following
actions on a server machine of your choice:

1. Install [Terraform](https://www.terraform.io/) version equal or greater than [0.12.20](https://releases.hashicorp.com/terraform/) and lower than 0.13.0. 
1. Install the latest version of [curl](https://curl.haxx.se/download.html).
1. Install [Python](https://www.python.org/) version 2.7 or later.
1. Install the following third-party Terraform providers:
    [Rest API Terraform Provider](https://github.com/Mastercard/terraform-provider-restapi) version 1.12 and above:

   1. Download terraform-provider-restapi binary from [GitHub](https://github.com/Mastercard/terraform-provider-restapi/releases)
   1. Move the **terraform-provider-restapi** binary to **$HOME/.terraform.d/plugins** directory:

        ```
        mkdir -p $HOME/.terraform.d/plugins
        mv terraform-provider-restapi $HOME/.terraform.d/plugins/terraform-provider-restapi
        chmod +x terraform-provider-restapi
        ```

    If you plan to use Jira, install [Jira](https://github.com/fourplusone/terraform-provider-jira/releases) Terraform Provider version  0.1.11 and above:
   1. Download terraform-provider-jira binary from [GitHub](https://github.com/fourplusone/terraform-provider-jira/releases).
   1. Unzip the zip file.
   1. Move the **terraform-provider-jira** binary to **$HOME/.terraform.d/plugins** directory:
        ```bash
        mkdir -p $HOME/.terraform.d/plugins
        mv terraform-provider-jira $HOME/.terraform.d/plugins/terraform-provider-jira
        chmod +x terraform-provider-jira
        ```

:::note
The following Terraform providers with mentioned versions are automatically installed during the **terraform init** phase as described below:

* [Template](https://www.terraform.io/docs/providers/template/index.html) version 2.1 and above.
* [Null](https://www.terraform.io/docs/providers/null/index.html) version 2.1 and above.
* [BitBucket Terraform Provider](https://www.terraform.io/docs/providers/bitbucket/index.html) version 1.2 and above.
* [Sumo Logic Terraform Provider](https://www.terraform.io/docs/providers/sumologic/index.html) version 2.1.00 and above.
* [GitHub Terraform Provider](https://www.terraform.io/docs/providers/github/index.html) version 2.8 and above.
* [Pagerduty Terraform Provider](https://www.terraform.io/docs/providers/pagerduty/index.html) version 1.7 and above.
* [GitLab Terraform Provider](https://registry.terraform.io/providers/gitlabhq/gitlab/3.6.0) version 3.6.0.
:::

## Configure the Terraform script

1. Clone the [GitHub repository](https://github.com/SumoLogic/sumologic-solution-templates):  
  ```
  $ git clone https://github.com/SumoLogic/sumologic-solution-templates
  ```
1. Initialize the Terraform working directory by navigating to the directory **sumologic-solution-templates/software-development-optimization-terraform.** and running **terraform init**. This will install the required Terraform providers: [Sumo Logic Terraform Provider](https://www.terraform.io/docs/providers/sumologic/index.html), [Template](https://www.terraform.io/docs/providers/template/index.html), [Null](https://www.terraform.io/docs/providers/null/index.html), [BitBucket Terraform Provider](https://www.terraform.io/docs/providers/bitbucket/index.html), [GitHub Terraform Provider](https://www.terraform.io/docs/providers/github/index.html), [GitLab Terraform](https://registry.terraform.io/providers/gitlabhq/gitlab/3.6.0) [Provider](https://registry.terraform.io/providers/gitlabhq/gitlab/3.6.0), and [Pagerduty Terraform Provider](https://www.terraform.io/docs/providers/pagerduty/index.html).
1. Choose which Sumo Logic Applications to configure by updating the values of the following variables in the **sumologic.auto.tfvars** file:
   * install_jira_cloud
   * nstall_jira_server
   * install_bitbucket_cloud
   * install_opsgenie
   * install_github
   * install_gitlab
     * This is only used for installing GitLab app from the app catalog and uses webhook.
     * Valid options for this are:
       * `all` - It’s a default option, for installing all the components of the setup.
       * `app` - This is for only installing the app
       * `collection` - for configuring collection in Sumo Logic (fers, the sources) and/or in other systems (webhooks).
       * `fer` - This will only create the fer.
       * `none` - for skipping the entire integration/installation.
     * install_pagerduty
     * install_pagerduty_version
       * The options for variable values are ‘v2’ and ‘v3’. Default is ‘v3’
     * install_jenkins
     * install_sdo
       * The options for variable values are `all`, `app`, `fer`, `collection`, and `none`. For SDO, `app` and `none` are the valid options.
       * For Jenkins, collection is not configured in Jenkins. Choosing `collection` will create the source in Sumo and set up the field extraction rules.
       * If you do not want to install the GitHub collection or application, rename the file **github.tf** to **github.tf_backup**.
       * If you do not want to install the GitLab collection or application, rename the file **gitlab.tf** to **gitlab.tf_backup**.
     * install_circleci
       * This is only used for installing the CircleCI app from the app catalog and uses a webhook.
       * Valid options for this values are : `all`, `app`, `collection`, and `none`. If you choose:
         * `all` - It’s a default option, for installing every component of the setup
         * `app` - for only installing the app
         * `collection` - for configuring collection in Sumo Logic (fers, the sources) and/or in other systems (webhooks)
         * `none` - for skipping the entire integration/installation
     * install_circleci_SDO_plugin
       * This is used to integrate CircleCI into the SDO solution.
       * valid options for this variable are:  `all` ,`none` ,`fer` and `collection`. If you choose:
         * `all`  - It’s a default option, for installing every component of the setup
         * `fer` - for only installing the FERs
         * `collection` - for configuring collection in Sumo Logic (fers, the sources) and/or in other systems (webhooks)
         * `none` - for skipping the entire integration/installation
         * Choosing `collection` will create two sources in Sumo and set up the field extraction rules.
1.  You can choose which Webhooks to configure by updating the variables in **sumologic.auto.tfvars**. * install_sumo_to_opsgenie_webhook
    * install_sumo_to_jiraserver_webhook
    * install_sumo_to_jiraservicedesk_webhook 
    * install_sumo_to_jiracloud_webhook
    * install_sumo_to_pagerduty_webhook 
1.  Update the following placeholder values in the **sumologic.auto.tfvars** file: **atlassian.auto.tfvars**, **pagerdutyv2.auto.tfvars**, **pagerdutyv3.auto.tfvars**,**github.auto.tfvars**, **gitlab.auto.tfvars**, **sumologic_fer.auto.tfvars**, and **sumologic_webhooks.auto.tfvars** so they correspond with your Sumo Logic, Atlassian, GitHub, GitLab, CircleCI, and Pagerduty environments. See [Configurable Parameters](#configurable-parameters) for the full list of input parameters.

## Install the Software Development Optimization (SDO) Solution

You have the following available methods to install the Software Development Optimization solution using the Terraform script:

* [Option 1: Install the complete Software Development Optimization solution](#option-1-install-the-complete-sdo-solution): Choose this method if you have not set up any collection of data or apps in Sumo Logic already.
* [Option 2: Install one or more parts of the solution](#option-2-install-one-or-more-parts-of-the-solution): Select one or more of the options to install only the Sumo Logic Apps, the FERs, and outgoing connections.

### Option 1: Install the complete SDO solution

This procedure will configure collection in other systems (for example, Jira Cloud) and create sources and FERs/Fields and connections in Sumo Logic along with App installation:

1.  Set install_(app) variables as `all` for the required applications in **sumologic.auto.tfvars**, as defined in [this](#configurable-parameters) section. This configuration will result in installing Sumo Logic apps, configuring collectors, and creating field extraction rules and fields in Sumo Logic.
2.  Set install_(app) variable as `none` for the tools that are not applicable to your environment.
3.  To install the outbound connections in Sumo Logic, configure the install_sumo_to_(app)_webhook variables as 'true' as defined in [this](#install-the-sumo-logic-outgoing-connections) section.
4.  Configure required variables in **sumologic.auto.tfvars, atlassian.auto.tfvars**, **github.auto.tfvars**, **gitlab.auto.tfvars**, **pagerdutyv2.auto.tfvars**, **pagerdutyv3.auto.tfvars**,and **circleci.auto.tfvars**.
5.  Navigate to the directory **sumologic-solution-templates/software-development-optimization-terraform** and execute the commands below:
  ```bash
  $ terraform plan
  $ terraform apply
  ```

### Option 2: Install one or more parts of the solution

You have the following options when installing parts of the solution:
installing only the Sumo Logic Apps, only the FERs, and only
connections.

* [Install only the Sumo Logic Apps](#install-only-the-apps):  Choose this method if you are already collecting data and have set up Webhooks. This will not configure collectors, sources, FERs, and connections in Sumo Logic and will not configure webhooks in other systems.
* [Install only the FERs](#install-fers): Choose this method if you have already configured and set up the collection and have installed the relevant apps. This will not configure collectors, sources, App installation, and connections in Sumo Logic and will not configure Webhooks in other systems.
* [Install outgoing connections](#install-the-sumo-logic-outgoing-connections): Choose this method if you want to only configure Sumo Logic connections. This will not configure collectors, sources, App installation, and FERs in Sumo Logic and will not configure Webhooks in other systems.

### Install only the Apps 

To use existing sources, FERs/Fields, or configure these manually and install only the applications: 

1. Other than the SDO app, configure collection in Sumo Logic if not already done Based on the app documentation
1. Populate source categories that you set up during the collection phase in **sumologic.auto.tfvars**, as defined in [this](#configurable-parameters) section.
1. Set install_(app) variables as `app` for the required applications in **sumologic.auto.tfvars**, as defined in [this](#configurable-parameters) section.
1. Setting this flag as `app` will result in app installation in Sumo Logic, it will not configure collection in other systems (for example, Jira Cloud) and it will not create sources and FERs/Fields in Sumo Logic.
1. Set install_(app) variables as ‘none’ for the applications which should not be configured.
1. Set install_sumo_to_(app)_webhook variables as ‘false’ for the Sumo Logic connections if you do not wish to configure the outgoing connections in Sumo Logic.
1. For pagerduty, set install_pagerduty_version = “v2” or “v3” to install either version of the app.
1. Navigate to the directory **sumologic-solution-templates/software-development-optimization-terraform** and execute the commands:
  ```bash
  $ terraform plan
  $ terraform apply
  ```

### Install FERs

To use existing sources and apps, or configure these manually:

1. Configure sources and source categories in Sumo Logic.
1. Configure collection in respective systems for example, Jira Cloud.
1. Populate source categories in **sumologic.auto.tfvars**, as defined in [this](#configurable-parameters) section.
1. Set install_(app) variable as `fer` for the required applications in **sumologic.auto.tfvars**, as defined in [this](#configurable-parameters) section.
1. Setting install_(app) variable as `fer` will result in FER configuration in Sumo Logic, it will not configure collection in other systems (for example, Jira Cloud) and it will not create sources and Fields in Sumo Logic and will not install Apps.
1. Navigate to the directory **sumologic-solution-templates/software-development-optimization-terraform** and execute the commands:
  ```bash
  $ terraform plan
  $ terraform apply
  ```

### Install the Sumo Logic outgoing connections

To configure the Sumo Logic connections only:
1. Set install_(app)_webhook variables as ‘none’ for all the applications except Opsgenie. Opsgenie connection cannot be installed without configuring Opsgenie collection as there is a cyclic dependency.
1. Set install_sumo_to_(app)_webhook variables as ‘true’ for the Sumo Logic connections which should be configured in Sumo Logic.
1. Configure required variables in **sumologic_webhooks.auto.tfvars.**
1. Navigate to the directory **sumologic-solution-templates/software-development-optimization-terraform** and execute the commands:
  ```bash
  $ terraform plan
  $ terraform apply
  ```

## Complete Post-Setup Configurations

After completing configuration, instrument your DevOps pipeline to specially identify and send build and deploy events in your pipeline to Sumo Logic. These events are correlated with other events in the DevOps lifecycle. Complete the configuration for the build and deploy tool you use.

### Bitbucket for build and deploy

1. Access the Sumo Logic Platform and navigate to **Manage Data** > **Collection** page.
1. Search for *Software Development Optimization* Collector.
1. Under this Collector, click on **Show URL** for the source **Bitbucket Cloud.** Make a note of this **URL** and use this URL to configure the Bitbucket CI/CD Pipeline to collect deploy events:
 * **Deploy**: Follow the steps outlined in [this document](/docs/integrations/app-development/bitbucket#Collecting-Logs-for-Bitbucket-app) to configure the Bitbucket CI/CD Pipeline to collect deploy events.

### Jenkins for build and deploy

1. Install the latest Jenkins Plugin as described [here](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins)
1. Access the Sumo Logic Platform and navigate to **Manage Data** > **Collection** page.
1. Search for *Software Development Optimization* Collector.
1. Under this Collector, click on **Show URL** for the source **Jenkins.** Make a note of this **URL** and **Source Category,** you will use these to configure the Jenkins Plugin:
   * **Build Pipeline Stages**: Follow [Configure Jenkins Plugin,](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins) and optionally [Optional - Advance Configuration](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins) to configure the Jenkins Sumo Logic plugin.
   * **Build**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Build Events to Sumo Logic.
   * **Deploy**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Deploy Events to Sumo Logic.

### CircleCI for build and deploy

1. Create three environment variables in project settings of CircleCI environment:
    * `CIRCLE_TOKEN = <[*API personal token*](https://circleci.com/docs/2.0/managing-api-tokens/) created in CircleCi>`
    * `JOB_HTTP_SOURCE = <url of job-collector source created by the Terraform script output>`
    * `WORKFLOW_HTTP_SOURCE = <url of workflow-collector source created by the Terraform script output>`

### CircleCI app installation

1. Create a [*webhook connection*](https://circleci.com/docs/2.0/webhooks/#setting-up-a-hook) in project settings of CircleCI environment: 
    * `Receiver URL = <url of circleci source created by the Terraform script>`

### Other Tools for build and deploy

If you're using **tools other than Jenkins and Bitbucket pipelines** for Build and Deploy phases:

1. **Build**: Configure your tool to construct and send events using the build event schema in the section Build Event. 
1. **Deploy**: Configure your tool to construct events using the deploy event schema in the section Deploy Events.

## Uninstalling the Solution

To uninstall the solution, navigate to the directory **sumologic-solution-templates/software-development-optimization-terraform** and execute the command:

```
$ terraform destroy
```

## Configurable Parameters

Configure the following parameters in specific files according to app or
service.

### Sumo Logic

Configure these parameters in **sumologic.auto.tfvars**.

| Parameter | Description | Default |
| :-- | :-- | :-- |
| sumo_access_id | [Sumo Logic Access ID](/docs/manage/security/access-keys.md) | |
| sumo_access_key | [Sumo Logic Access Key](/docs/manage/security/access-keys.md) |  |
| deployment | [Sumo Logic Deployment](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) | us1 |
| sumo_api_endpoint | [Sumo Logic API Endpoint.](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) Make sure the trailing "/" is present. | https://api.sumologic.com/api/v1/ |
| app_installation_folder | The Sumo Logic apps will be installed in a folder under your personal folder in Sumo Logic. | Software Development Optimization |
| install_jira_cloud | Install [Sumo Logic Application and WebHooks for Jira Cloud](/docs/integrations/app-development/jira-cloud). Options: app, collection, fer, all, and none. | all |
| install_jira_server | Install [Sumo Logic Application and WebHooks for Jira Server](/docs/integrations/app-development/jira). Options: app, collection, fer, all, and none. | all |
| install_bitbucket_cloud | Install [Sumo Logic Application and WebHooks for BitBucket Cloud](/docs/integrations/app-development/bitbucket). Options: app, collection, fer, all, and none. | all |
| install_opsgenie | Install [Sumo Logic Application and WebHooks for Opsgenie](/docs/integrations/saas-cloud/Opsgenie). Options: app, collection, fer, all, and none. | all |
| install_github | Install [Sumo Logic Application and WebHooks for GitHub](/docs/integrations/app-development/github). Options: app, collection, fer, all, and none.  If you do not wish to install the GitHub collection or application, rename the file github.tf to github.tf_backup. | all |
| install_gitlab | Install [Sumo Logic Application and WebHooks for GitLab](/docs/integrations/app-development/gitlab). Options: app, collection, fer, all, and none.  If you do not wish to install the GitLab collection or application, rename the file gitlab.tf to gitlab.tf_backup. | all |
| install_pagerduty | Install [Sumo Logic Application and WebHooks for Pagerduty](/docs/integrations/saas-cloud/PagerDuty-V2). Options: app, collection, fer, all, and none. | all |
| install_pagerduty_version | Lets you install either v2 or v3 alertFER/app version. | v3  |
| install_jenkins | Install [Sumo Logic Application for Jenkins](/docs/integrations/app-development/jenkins). Options: app, collection, fer, all, and none. The Terraform script does not configure the Jenkins Sumo Logic plugin, choosing `collection` will create http source in Sumo Logic for Jenkins and will configure the Jenkins FERs. | all |
| install_sdo |  Install [Sumo Logic Application for Software Development Optimization](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/software-development-observability-terraform). Options: app or none. | app |
| install_circleci | Install Sumo Logic Application for CircleCI. Options: app, collection, all, and none. | all |
| install_circleci_SDO_plugin | Install Sumo Logic Collection and FER for CircleCI SDO integration. | all |
| install_sumo_to_opsgenie_webhook | Install[ Sumo Logic to Opsgenie WebHook](/docs/alerts/webhook-connections/opsgenie.md). install_opsgenie should be true for this option to be true. | true |
| install_sumo_to_jiracloud_webhook | Install [Sumo Logic to Jira Cloud WebHook](/docs/alerts/webhook-connections/jira-cloud.md). | true |
| install_sumo_to_jiraserver_webhook | Install [Sumo Logic to Jira Server WebHook](/docs/alerts/webhook-connections/jira-server.md). | true |
| install_sumo_to_jiraservicedesk_webhook | Install [Sumo Logic to Jira Service Desk WebHook](/docs/alerts/webhook-connections/jira-server.md) | true |
| install_sumo_to_pagerduty_webhook | Install [Sumo Logic to Pagerduty WebHook](/docs/alerts/webhook-connections/pagerduty.md) | true |
| jira_cloud_sc | Source Category for [Jira Cloud](/docs/integrations/app-development/jira-cloud) | SDO/Jira/Cloud |
| jira_server_sc | Source Category for [Jira Server](/docs/integrations/app-development/jira) | SDO/Jira/Server/Events |
| bitbucket_sc | Source Category for [BitBucket Cloud](/docs/integrations/app-development/bitbucket) | SDO/Bitbucket |
| opsgenie_sc | Source Category for [Opsgenie](/docs/integrations/saas-cloud/Opsgenie) | SDO/Opsgenie |
| pagerduty_sc | Source Category for [Pagerduty](/docs/integrations/saas-cloud/PagerDuty-V2) | SDO/Pagerduty |
| github_sc | Source Category for [GitHub](/docs/integrations/app-development/github) | SDO/GitHub |
| gitlab_sc | Source Category for [GitLab](/docs/integrations/app-development/gitlab) | SDO/GitLab |
| jenkins_sc | Source Category for [Jenkins](/docs/integrations/app-development/jenkins) | SDO/Jenkins |
| circlecl_app_sc | Source Category for CircleCI | SDO/CircleCI |

### Sumo Logic Field Extraction Rules

Configure these parameters in **sumologic_fer.auto.tfvars**. There is a set of FER's for the SDO Apps. Each FER needs scope and a parse expression. In most cases default values will suffice, if required you can edit the scope and parse expression as per your requirements.

| Parameter | Description |
|:-- | :--|
| (app)_pull_request_fer_scope | A [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions) that points to the subset of logs you'd like to parse. For more details see [FER](/docs/manage/field-extractions/create-field-extraction-rule). |
| (app)_pull_request_fer_parse | A valid parse expression with [supported parse and search operators.](/docs/manage/field-extractions/create-field-extraction-rule.md) For more details see [FER](/docs/manage/field-extractions/create-field-extraction-rule.md). |

:::note
The App can be jira_cloud, jira_server, GitHub, GitLab, Bitbucket, PagerDuty, Opsgenie, Jenkins, or CircleCI.
:::

### Jira Cloud

Configure these parameters in **atlassian.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| jira_cloud_url | Jira Cloud URL |
| jira_cloud_user | Jira Cloud Username |
| jira_cloud_password | Jira Cloud Password or [API Key](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) |
| jira_cloud_jql | Jira Cloud [Query Language](https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-searching-in-jira-cloud/) Example: "project = Sumo" |
| jira_cloud_events | Jira Cloud [Events](https://developer.atlassian.com/cloud/jira/platform/webhooks/) |

### Sumo Logic to Jira Cloud Webhook

Sumologic to Jira Webhook is in Beta. To participate, contact your Sumo account executive.

Configure these parameters in **webhooks.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| jira_cloud_auth | To generate Authorization Header follow this [doc](/docs/alerts/webhook-connections/jira-cloud.md) |
| jira_cloud_user | Jira Cloud Username |
| jira_cloud_password | Jira Cloud Password or [API Key](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) |
| jira_cloud_jql | Jira Cloud [Query Language](https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-searching-in-jira-cloud/) Example: "project = Sumo" |
| jira_cloud_events | Jira Cloud [Events](https://developer.atlassian.com/cloud/jira/platform/webhooks/) |

### Sumo Logic to Jira Service Desk Webhook

:::note
Sumologic to Jira Webhook is in Beta. To participate, contact your Sumo account executive.
:::

Configure these parameters in **webhooks.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| jira_servicedesk_url | Jira Service Desk URL, can be same as Jira Cloud URL |
| jira_server_auth | [Basic Authorization Header](/docs/alerts/webhook-connections/jira-server.md) |
| jira_server_projectkey | Jira Server [Project Key](https://confluence.atlassian.com/adminjiraserver/defining-a-project-938847066.html) |
| jira_server_issuetype  | Jira Server [Issue Type](https://confluence.atlassian.com/adminjiraserver/defining-issue-type-field-values-938847087.html), for example 'Bug' |
| jira_server_priority | Issue [Priority](https://confluence.atlassian.com/adminjiraserver/associating-priorities-with-projects-939514001.html). For Example, 3 |

### Jira Server

Configure these parameters in **atlassian.auto.tfvars**.

:::note
This script configures Jira Server WebHooks and creates resources in Sumo Logic. Jira Server Logs collection needs to be configured as explained in Step 1 [here](/docs/integrations/app-development/jira#Collecting-Logs-for-the-Jira-App). Configure the log collection and update the variable `jira_server_access_logs_sourceCategory` in **atlassian.auto.tfvars** with the selected source category.
:::

| Parameter | Description |
|:--|:--|
| jira_server_access_logs_sourceCategory | Jira Server Access Logs Source Category, default "SDO/Jira/Server\*", refer to [this](/docs/integrations/app-development/jira#Collecting-Logs-for-the-Jira-App) link. |
| jira_server_url | Jira Server URL |
| jira_server_user | Jira Server Username |
| jira_server_password | Needs to be the password. API Key is not supported on Jira Server yet. |
| jira_server_jql | Jira Server [Query](https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-searching-in-jira-cloud/) Language Example: "project = Sumo" |
| jira_servicedesk_priority | Jira Server [Events](https://developer.atlassian.com/server/jira/platform/webhooks/) |

### Sumo Logic to Jira Server Webhook

:::note
Sumologic to Jira Webhook is in Beta. To participate, contact your Sumo account executive.
:::

Configure these parameters in **webhooks.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| jira_server_auth | [Basic Authorization Header](/docs/alerts/webhook-connections/jira-server.md) |
| jira_server_projectkey | Jira Server [Project Key](https://confluence.atlassian.com/adminjiraserver/defining-a-project-938847066.html) |
| jira_server_issuetype  | Jira Server [Issue Type](https://confluence.atlassian.com/adminjiraserver/defining-issue-type-field-values-938847087.html), for example 'Bug' |
| jira_server_priority | Issue [Priority](https://confluence.atlassian.com/adminjiraserver/associating-priorities-with-projects-939514001.html), for example 3 |

### Bitbucket

Configure these parameters in **atlassian.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| bitbucket_cloud_user | Bitbucket Username |
| bitbucket_cloud_password | Bitbucket password or [App Password](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html) |
| bitbucket_cloud_owner | The owner of the repositories. Can be you or any team having write access. |
| bitbucket_cloud_repos | Specify the repositories for which WebHooks should be created. Format: \["repo1","repo2"\] |
| bitbucket_cloud_desc | The name / description to show in the UI |
| bitbucket_cloud_events | Bitbucket [Events](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html) to track |

### Opsgenie

Configure these parameters in **atlassian.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| opsgenie_api_url | [Opsgenie API URL](https://docs.opsgenie.com/docs/api-overview). Do not add the trailing "/". If using the EU instance of Opsgenie, the URL needs to be\<https://api.eu.opsgenie.com\> for requests to be executed. |
| opsgenie_key | [Opsgenie API Key](https://docs.opsgenie.com/docs/api-integration) |

### Sumo Logic to Opsgenie Webhook

:::note
Sumologic to Opsgenie Webhook is in Beta. To participate, contact your Sumo account executive.
:::

Configure these parameters in **webhooks.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| opsgenie_priority | [Opsgenie Alert Priority](https://docs.opsgenie.com/docs/priority-field) |

### PagerDuty

Configure these parameters in **pagerdutyv2.auto.tfvars** or **pagerdutyv3.auto.tfvars**.

For v2:

| Parameter | Description |
|:--|:--|
| pagerduty_api_key | [Pagerduty API Key](https://support.pagerduty.com/docs/generating-api-keys#section-generating-a-general-access-rest-api-key). |
| pagerduty_services_pagerduty_webhooks | List of Pagerduty Service IDs. Example: \["P1QWK8J","PK9FKW3"\]. You can get these from the URL after opening a specific service in Pagerduty. Webhooks are created for these services. |

For v3:

| Parameter | Description |
|:--|:--|
| pagerduty_api_key | [Pagerduty API Key](https://support.pagerduty.com/docs/generating-api-keys#section-generating-a-general-access-rest-api-key). |
| pagerduty_services_pagerduty_webhooks | List of Pagerduty Service IDs. Example: \["P1QWK8J","PK9FKW3"\]. You can get these from the URL after opening a specific service in Pagerduty. Webhooks are created for these services. |
| create_account_webhook | Bool value for creating a Pagerduty account webhook |
| create_teams_webhooks | List of Pagerduty Team IDs. Example: \["P1QWK8J","PK9FKW3"\]. You can get these from the URL after opening a specific team in Pagerduty. Webhooks are created for these teams. |

### Sumo Logic to PagerDuty Webhook

Configure these parameters in **webhooks.auto.tfvars**.

| Parameter | Description |
|:--|:--|
| pagerduty_services_sumo_webhooks | [Sumo Logic to Pagerduty Webhook](/docs/alerts/webhook-connections/pagerduty.md). List of Pagerduty Service IDs. Example: \["P1QWK8J","PK9FKW3"\]. You can get these from the URL after opening a specific service in Pagerduty. Alerts are sent from Sumo to Pagerduty for these services. |

### GitHub

Configure these parameters in **github.auto.tfvars**. If you do not wish to install the GitHub collection or application, rename the file github.tf to github.tf_backup.

| Parameter | Description |
|:--|:--|
| github_token | [GitHub Token](https://github.com/settings/tokens) |
| github_organization | Organization Name. |
| github_repo_webhook_create | Create webhooks at repo level. Default "true". |
| github_repository_names | List of repository names for which webhooks need to be created. Example, \["repo1","repo2"\] |
| github_org_webhook_create  | Create webhooks at org level. Default "false". |
| github_repo_events | List of repository [events](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads) which should be sent to Sumo Logic. Example, \["create","delete","fork"\] |
| github_org_events | List of organization level [events](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads) which should be sent to Sumo Logic. Example, \["create","delete","fork"\] |

### GitLab

Configure these parameters in **gitlab.auto.tfvars**. If you do not wish to install the GitLab collection or application, rename the file gitlab.tf to gitlab.tf_backup.

| Parameter | Description |
|:--|:--|
| gitlab_token | [GitLab Token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) |
| gitlab_project_webhook_create | Create webhooks at project level. Default "true". |
| gitlab_project_names | List of project names for which webhooks need to be created. Example, \["project1","project2"\] |

### Jenkins

The Terraform script does not configure the Jenkins Sumo Logic plugin, it creates an HTTP source in Sumo Logic for Jenkins and configures the Jenkins FERs.

| Parameter  | Description |
|:--|:--|
| jenkins_sc | [Jenkins Source Category](/docs/integrations/app-development/jenkins#Collecting-Logs-and-Metrics-for-Jenkins). |

### CircleCI

The Terraform script does not configure the CircleCI Sumo Logic plugin, it creates HTTP sources in Sumo Logic for CircleCI and configures the CircleCI FERs.

It also allows to install the CircleCI app that can be configured using a CircleCI webhook.

| Parameter               | Description                          |
|:------------------------|:-------------------------------------|
| `circlesi_app_sc`         | CircleCI App Source Category         |
| `circleci_build_jobname`  | CircleCI build job name for SDO FER  |
| `circleci_deploy_jobname` | CircleCI deploy job name for SDO FER |
