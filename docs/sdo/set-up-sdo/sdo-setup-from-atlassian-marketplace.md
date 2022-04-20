---
id: sdo-setup-from-atlassian-marketplace
---

# SDO Setup from Atlassian Marketplace

These instructions help you prepare and set up the Software Development Optimization (SDO) Solution through the Atlassian Marketplace. 

## Before you begin

Before setting up the SDO solution, you need to complete the following tasks:

* Create or collect API Keys and credentials for Jira, Github, GitLab, Jenkins, Bitbucket, CircleCI, and Opsgenie with Webhook creation capabilities. 
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

## Install the Software Development Optimization App in Jira

You have two options to install the Jira app:

* Install from Atlassian Marketplace
* Upload and install manually

### Install from Atlassian Marketplace

To install the SDO app in Jira from the Atlassian Marketplace:

1.  In the Atlassian console, click **Find new apps** and search for Software Development Optimization.
2.  Select the Sumo Logic Software Development Optimization tile and install the app.

![sdo-jira-app1.png](/img/sdo/sdo-jira-app1.png)

### Manually Install by Uploading the App

:::sumo
The following option is for Beta Customers.
:::

To upload the app and install manually:

1.  Select the **Manage apps** tab.

![sdo-atlassian-manageapps.png](/img/sdo/sdo-atlassian-manageapps.png)

2.  If you do not have an upload option, click **Settings** and make sure you have **Enable development mode** checked. With this enabled, you will see **Upload app** link.

![sdo-upload-settings.png](/img/sdo/sdo-upload-settings.png)

3.  Click **Upload app**.  Enter [https://atlassian-sdo.integration.sumologic.com/atlassian-connect.json](https://atlassian-sdo.integration.sumologic.com/atlassian-connect.json) in app descriptor URL, and click **Upload**.

![sdo-upload.png](/img/sdo/sdo-upload.png)

You should see the **Sumo Logic Jira** app installed as show in below
screenshot.

![sdo-installed-apps.png](/img/sdo/sdo-installed-apps.png)

## Configure resources using the application setup wizard

The application setup wizard automates the setup of all the necessary resources for collecting Atlassian, GitHub, and Pagerduty product logs and displaying the data in pre-configured intuitive-analytic dashboards. 

* The application setup wizard allows you to quickly get started by installing a copy of the configured applications. After the initial setup, if you need additional copies of the Sumo Logic applications, you can install them from the Sumo Logic App catalog.

* If you plan to integrate Jenkins with this solution, the Jenkins plugin is not configured during setup. To configure Jenkins collection, see [Install the Jenkins Plugin] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md "Collect Logs and Metrics for Jenkins"), [Configure Jenkins Plugin] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md "Collect Logs and Metrics for Jenkins") (use **SDO/Jenkins** as the source category), and [Optional - Advanced Configuration] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md "Collect Logs and Metrics for Jenkins") to install and configure the Jenkins Sumo Logic plugin.

* Currently only Jira Cloud is supported as an issue management application.

The application setup completes the following actions:

* Creates Sumo Logic collection resources including Collector, Sources, and Folder.
* Configures collection mechanisms in the supported tools, for example Webhooks in Pagerduty and GitHub.
* Sets up Sumo Logic Field Extraction Rules (FERs) to enrich the data.
* Configures connections in Sumo Logic to send alerts from Sumo Logic to issue management and incident management platforms including Jira, PagerDuty, and Opsgenie. 
* Installs Sumo Logic Apps in the configured folder.

:::note
You will need the credentials prepared before you began installation and configuration. See [Before you begin](#before-you-begin) prerequisites and details.
:::

To configure using the wizard:

1. Click **Get Started** in the Sumo Logic Jira app.

![sdo-wizard1.png](/img/sdo/sdo-wizard1.png)

1. In the Welcome to application setup, enter the access id, access key, and deployment. Click **Test** to verify the credentials. Click **Next** to continue.

![sdo-wizard2.png](/img/sdo/sdo-wizard2.png)

1. For Jira Cloud, configure the following settings: 

   * Jira Cloud URL - Jira Cloud URL, for example [*https://sdodevstaging.atlassian.net*](https://sdodevstaging.atlassian.net). Do not use a trailing slash (/) at the end of the url.
   * Jira Cloud Username - Your email ID configured in Jira Cloud.
   * Jira Cloud Password or API Key - Your Jira Cloud login password or API key. See [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) to generate API keys.
   * Jira Cloud Issue Type - Issue Type. See [What are issue types](https://support.atlassian.com/jira-cloud-administration/docs/what-are-issue-types/) for the “Jira Software (software projects) issue types” section to see available types.
   * Jira Cloud Priority - Priority ID of the issue. To access the **Edit Priority** page, see the “Adding, editing, and deleting a priority” section at [Configure statuses, resolutions, and priorities](https://support.atlassian.com/jira-cloud-administration/docs/configure-statuses-resolutions-and-priorities/) and get the ID from the URL.       
  
    ![sdo-jira-priority.png](/img/sdo/sdo-jira-priority.png)
   
   * Jira Cloud Project Key - Your project key. Click **View all Projects** under the Projects tab to get the value from the key column corresponding to your project name.

    ![sdo-jira-projectkey.png](/img/sdo/sdo-jira-projectkey.png)

   * Jira Cloud Events - List of Jira Cloud events as per [Available webhook events](https://developer.atlassian.com/cloud/jira/platform/webhooks/#available-webhook-events).

    ![sdo-jira-cloud.png](/img/sdo/sdo-jira-cloud.png)

1. For Version Control, select one of the following applications. Configure settings and click **Apply**.

<Tabs
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'GitHub', value: 'tab1'},
    {label: 'GitLab', value: 'tab2'},
    {label: 'Bitbucket', value: 'tab3'},
  ]}>

<TabItem value="tab1">

Fields include:

* GitHub Token - Enter the GitHub access token generated following [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
* Organization Name - Enter the name of your [Organization](https://github.com/settings/organizations).
* Create webhooks at org level? - Select the checkbox if you want to create webhooks at the organization level.
* List of organization level events - Specify a list of organization level events to send to Sumo Logic, for example "create", "delete", and "fork".
* List of repository events - Specify a list of repository events to send to Sumo Logic, for example "create", "delete", and "fork".
* Create webhooks at repo level? - Select the checkbox if you want to create webhooks at repository level.
* List of repository names - Specify a list of repository names to create webhooks for.

![screen](/img/sdo/sdo-github-settings.png)

</TabItem>
<TabItem value="tab2">

Do the following:

* URL - Enter the Url of Http Source created in SumoLogic.
* Gitlab Token - Enter the Gitlab access token generated following [Creating a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
* Trigger - Select the events you want to create a webhook for.
* Enable SSL - Tick this checkbox.
* Click on Add Webhook.

![screen](/img/sdo/gitlab-webhook.png)

</TabItem>
<TabItem value="tab3">

Do the following:

* Bitbucket Username - Enter the Bitbucket cloud username.
* Bitbucket Password -  Enter the Bitbucket cloud password or App Password. To generate App Passwords, see [App passwords](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html). 
* The owner of the repositories -  Enter the owner of the repositories, which can be you or any team with write access.
* Specify the repositories -  Specify the repositories to create webhooks for.
* The name / description to show in the UI -  Enter the webhook title.
* Bitbucket Events - Specify Bitbucket Events to track.

![screen](/img/sdo/sdo-bitbucket-settings.png)

</TabItem>
</Tabs>

1. For CI (Continuous Integration), select one of the applications. Configure settings and click **Apply**.

<Tabs
  className="unique-tabs"
  defaultValue="tab4"
  values={[
    {label: 'BitBucket', value: 'tab4'},
    {label: 'Jenkins', value: 'tab5'},
  ]}>

<TabItem value="tab4">

Do the following:

1. If you previously provided settings, parameters have been configured.
1. If you need to configure, select the Refer to the Post Set up Configuration section link to provide configuration settings.
1. Click **Apply** to continue.

![screen](/img/sdo/sdo-bitbucket-apply.png)

</TabItem>
<TabItem value="tab5">

Click **Apply**. You will configure Jenkins as part of [post-set-up configuration](#complete-post-setup-configurations).

![screen](/img/sdo/sdo-jenkins-apply.png)

</TabItem>
</Tabs>

1. For Deployment, select one of the applications. Configure settings and click **Apply**.

<Tabs
  className="unique-tabs"
  defaultValue="tab6"
  values={[
    {label: 'Bitbucket', value: 'tab6'},
    {label: 'Jenkins', value: 'tab7'},
  ]}>

<TabItem value="tab6>

Do the following:

1. If you previously provided settings, parameters have been configured.
1. If you need to configure, select the Refer to the Post Set up Configuration section link to provide configuration settings.
1. Click **Apply** to continue.

![screen](/img/sdo/sdo-bitbucket-apply.png)

</TabItem>
<TabItem value="tab7">

Click **Apply**. You will configure Jenkins as part of [post-set-up configuration](#complete-post-setup-configurations).

![screen](/img/sdo/sdo-bitbucket-apply.png)

</TabItem>
</Tabs>

1. For Incident Management, select one of the following applications, configure settings, and click **Apply**:

<Tabs
  className="unique-tabs"
  defaultValue="tab8"
  values={[
    {label: 'OpsGenie', value: 'tab8'},
    {label: 'Tab 2', value: 'tab9'},
  ]}>

<TabItem value="tab8">

Do the following:

1. Opsgenie API URL - Enter the api url. Default is https://api.opsgenie.com. If using the EU instance of Opsgenie, the URL needs to be https://api.eu.opsgenie.com for requests to be executed. Refer to the api overview doc. Do not add the trailing "/".
1. Opsgenie API Key - Enter the api key.To generate the key refer to the doc.

![screen](/img/sdo/sdo-opsgenie-settings.png)

</TabItem>
<TabItem value="tab9">

Do the following:

1. Pagerduty API Key - Enter the api key. To generate the key refer to the doc.
1. List of Pagerduty Service IDs - List of Pagerduty Service IDs. Example, "P1QWK8J","PK9FKW3". You can get these from the URL after opening a specific service in Pagerduty.

![screen](/img/sdo/sdo-pagerduty-settings.png)

</TabItem>
</Tabs>

1. Click **Save** to complete the setup wizard. A completion message will appear after saving.

![sdo-wizard-save.png](/img/sdo/sdo-jenkins-apply.png)

## Complete Post-Setup Configurations

After setting up the SDO solution, you can complete post-setup configuration.

After completing configuration, instrument your DevOps pipeline to specially identify and send build and deploy events in your pipeline to Sumo Logic. These events are correlated with other events in the DevOps
lifecycle.

Complete the configuration for the build and deploy tool you use.

### Bitbucket for build and deploy

1. Access the Sumo Logic Platform and navigate to **Manage Data** \> **Collection** page.

1. Search for *Software Development Optimization* Collector.

1. Under this Collector, click on **Show URL** for the source **Bitbucket Cloud.** Make a note of this **URL** and use this URL to configure the Bitbucket CI/CD Pipeline to collect deploy events:

   * **Deploy**: Follow the steps outlined in [this document] (../../../07Sumo-Logic-Apps/08App_Development/Bitbucket/Collect_Logs_for_Bitbucket_App.md) to configure the Bitbucket CI/CD Pipeline to collect deploy events.

### Jenkins for build and deploy

1. Install the latest Jenkins Plugin as described [here] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md)

1. Access the Sumo Logic Platform and navigate to **Manage Data** \> **Collection** page.

1. Search for *Software Development Optimization* Collector.

1. Under this Collector, click on **Show URL** for the source **Jenkins.** Make a note of this **URL** and **Source Category,** you will use these to configure the Jenkins Plugin :
 * **Build Pipeline Stages**: Follow [Configure Jenkins Plugin,] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md) and optionally [Optional - Advance Configuration] (../../../07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins.md) to configure the Jenkins Sumo Logic plugin.
 * **Build**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Build Events to Sumo Logic.
 * **Deploy**: Follow [this](../jenkins-plugin-build-deploy-events.md) doc to modify your Jenkins plugin to explicitly identify, enrich, and send Deploy Events to Sumo Logic.

If you are using **tools other than Jenkins and Bitbucket pipelines** for Build and Deploy phases:

1. **Build**: Configure your tool to construct and send events using the build event schema in the section Build Event. 

**Deploy**: Configure your tool to construct events using the deploy event schema in the section Deploy Events.

### Access Dashboards from the Atlassian console

With solution installation setup completed, access dashboards in Atlassian:

1. Click **Apps** and select Sumo Logic Dashboard.

  ![sdo-apps-tab.png](/img/sdo/sdo-apps-tab.png)

1. In the new window you should be able to see all the dashboard under **DORA METRICS and DEVOPS LIFECYCLE** section. Click on each of them to view the dashboard.

  ![sdo-metrics.png](/img/sdo/sdo-metrics.png)

## Atlassian Setup FAQs

**How do I change the Sumo Logic credentials after completing the installation setup?**

To update the Sumo Logic access ids and access key:

1. Click the **Get Started** button in the Sumo Logic Jira app to open the wizard.
1. In the “Welcome to application setup”, uncheck the **Recreate resources** checkbox.
1. Click **Save**.

**How do I migrate the existing solution to the new Sumo Logic org?**

You will need to reinstall the app using the new credentials. To move the solution to a new Sumo Logic org:

1. Select the **Manage** **apps** tab and expand the Sumo Logic Jira app section. 

  ![sdo-atlassian-manageapps.png](/img/sdo/sdo-atlassian-manageapps.png)

1. Click **Uninstall** to remove the setup. 

  ![sdo-app-uninstall.png](/img/sdo/sdo-app-uninstall.png)

1. Complete the setup again using the credentials of the new Sumo Logic org. Follow all instructions to install and configure the app starting with [Install the Software Development Optimization App in Jira](sdo-setup-from-atlassian-marketplace.md).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';