---
id: bitbucket
title: Sumo Logic App for Bitbucket
sidebar_label: Bitbucket
description: The Sumo Logic App for Bitbucket provides insights into project management to more effectively plan the deployments. It helps you to understand the state of deployment, builds and the issues associated with it.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/bitbucket.png')} alt="DB icon" width="50"/>


The Sumo Logic App for Bitbucket provides insights to development teams into how their software delivery pipeline components are performing. The pre-configured dashboards organize issues, builds, and deployments that require the most attention.


1

The Bitbucket App supports only Bitbucket Cloud.


#### Log Types

Sumo Logic analyzes the following required types of logs for more efficient monitoring:


##### Bitbucket Events


<table>
  <tr>
   <td>Event Type
   </td>
   <td>Available Events
   </td>
  </tr>
  <tr>
   <td>Repository events
   </td>
   <td>
<ul>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Push">Push</a></li>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Fork">Fork</a></li>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Updated">Updated</a></li>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Commitcommentcreated">Commit comment created</a></li>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Buildstatuscreated">Build status created</a></li>

<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Buildstatusupdated">Build status updated</a>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Issue events
   </td>
   <td>
<ul>
<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Created">Created</a></li>
<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Updated.1">Updated</a></li>
<li><a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Commentcreated">Comment created</a></li>
<li> \
 \
 \

</li>
</ul>
   </td>
  </tr>
</table>


Refer to the [event documentation](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html) for descriptions and examples of each event payload above.


##### Deploy Events

Deploy events are triggered whenever code is pushed to test, staging or production environments.
* Success Code Deploys
* Failed Code Deploys



## Collect Logs for Bitbucket App

This page provides instructions for configuring log collection for the Bitbucket App. Click a link to jump to a section:

* [Collection Overview](#Collection_Overview)
* [Configure Hosted Collector to Receive Bitbucket events](#Step_1:_Configure_Hosted_Collector_to_Receive_Bitbucket_events)
* [Adding a Webhook in Bitbucket](#Step_2:_Adding_a_Webhook_in_Bitbucket)
* [Configure the Bitbucket CI/CD Pipeline to Collect Deploy Events](#Step_3:_Configure_the_Bitbucket_CI.2FCD_Pipeline_to_Collect_Deploy_Events)
* [Enable Bitbucket Event-Key Tagging at Sumo Logic](#Step_4._Enable_Bitbucket_Event-Key_tagging_at_Sumo_Logic)
* [Sample Log Messages](#Sample_Log_Messages)
* [Query Example](#Query_Example)


#### Collection Overview

Configuring log collection consists of the following tasks:

1. Configuring a Hosted Collector in Sumo Logic to receive Bitbucket Events
2. Registering a Webhook in Bitbucket
3. Configuring the Bitbucket CI/CD pipeline to collect deploy Events
4. Enable Bitbucket for Event-Key tagging

There are 2 types of events of interest from Bitbucket to Sumo Logic:

**Bitbucket Events** sends the event request to the server URL for the Webhook whenever that event occurs.

**Deploy Events** are triggered whenever code is pushed to test, staging or production environments. These events are in the form of Success deploy events or the Failed deploy events.


##### Configure Hosted Collector to Receive Bitbucket events

In this step, you create a Hosted Collector to receive Webhook Events from Bitbucket and set up an HTTP source on it.

1. Configure a [Hosted Collector](/docs/send-data/configure-hosted-collector), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](/docs/send-data/sources/sources-hosted-collectors/http-logs-metrics-source) on the hosted collector.
    * For Source Category, specify `bitbucket/events.`
    * Click **+Add Field **and provide the following:
        * **Field Name. **_convertHeadersToFields
        * **Value. **true
    * Click **Save** and make note of the HTTP address for the source. You will supply it when you configure a Jira Webhook in the next step.


2

##### Adding a Webhook in Bitbucket

1. From Bitbucket, open the repository where you want to add the Webhook.
2. Click the **Settings** link on the left side.
3. From the links on the **Settings** page, click the **Webhooks** link.
4. Click the **Add Webhook** button to create a Webhook for the repository. The **Add New Webhook** page appears.


3

1. Enter a **Title** with a short description.
2. Enter Sumo Logic Http source **URL**, you configured this in [Configure Hosted Collector to Receive Bitbucket events](#Configure_Hosted_Collector_to_Receive_Bitbucket_events).
3. Click on **Status** to make it **Active**.
4. **Triggers - **Click on** Choose from a full list of triggers, and choose all triggers under Repository, Issue and Pull Request.
5. Click **Save**


##### Configure the Bitbucket CI/CD Pipeline to Collect Deploy Events

A Bitbucket pipe needs to be configured to send code deploy status to Sumo Logic. Add the following pipe code to the step section of your deployment part of the `bitbucket-pipelines.yml` file. Replace **SUMOLOGIC_HTTP_URL** with HTTP Source URL configured in Step 1.


```
after-script:
          - pipe: docker://appdevsumologic/sumologic-send-event:1.15
            variables:
              SUMO_LOGIC_BASE_URL: '<SUMOLOGIC_HTTP_URL>'
```



4
If you want to deployment events to multiple Sumo Logic orgs, include a `-pipe` statement, as shown above, for each of the Sumo Logic endpoints.

For reference - This is how [bitbucket-pipelines.yml](https://bitbucket.org/app-dev-sumo/backendservice/src/master/bitbucket-pipelines.yml) looks like after adding deploy pipe code to our sample Bitbucket CI/CD pipeline.


##### Enable Bitbucket Event-Key tagging at Sumo Logic

Sumo Logic needs to understand the event type for incoming events (for example, repo:push events). To enable this, the [X-Event-Key](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-HTTPheaders) event type needs to be enabled. To enable this,  perform the following steps in the Sumo Logic console:



1. From Sumo Logic, go to **Manage Date **- > **Logs** - > **[Fields](/docs/manage/fields.md#add-field)**.
2. Add Field ‎**X-Event-Key**‎


5



#### Sample Log Messages

This section provides an example of Bitbucket Events and Deploy Events log messages.

**Bitbucket Events**

* Refer to[ Bitbucket Event Documentation](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html)

**Deploy Events**


```json
{
  "buildNumber": "160",
  "deploymentEnvironment": "production",
  "gitHttpOrigin": "http://bitbucket.org/sumo/backendservice",
  "commit": "67be2cdb4db18556df9b49872d7d3945ada3cb09",
  "branch": "master",
  "tag": "",
  "prDestinationBranch": "",
  "projectKey": "",
  "repoFullName": "app-dev-sumo/backendservice",
  "repoOwner": "app-dev-sumo",
  "pr_id": "",
  "pipe_result_link": "https://bitbucket.org/sumo/backendservice/addon/pipelines/home#!/results/160",
  "deploy_status": "0",
  "commit_link": "https://bitbucket.org/sumo/backendservice/commits/67be2cdb4db18556df9b49872d7d3945ada3cb09",
  "event_date": "2020-03-23 08:07:34"
}
```



#### Query Example

This section provides a sample from the **Failed Deployments** panel on the **Bitbucket Deployment **dashboard.

**Parameters**

* Event_Date:*
* Build_Number:*
* Deploy_Status:*
* Deployment_Environment:*
* Files_Committed:*
* Repo_Full_Name:*
* Repo_Owner:*
* Source_Branch:*
* Deploy_Result:* \


**Query String**


```
_sourceCategory="bitbucket" production  deploymentEnvironment pipe_result_link deploy_status commit_link
| json field=_raw "buildNumber", "deploymentEnvironment", "branch", "repoFullName", "pipe_result_link", "deploy_status", "pr_id", "commit", "tag", "projectKey", "repoOwner", "commit_link" , "event_date"
| repoFullName as repo_name
| where   repoFullName matches "*"  AND buildNumber matches "*"
| branch as source_branch
| if (deploy_status matches "0", "Success", "Failed") as deploy_status
| where deploymentEnvironment="production" and deploy_status="Failed"
| tourl (commit_link, concat("Commit # ",commit)) as files_commited
| tourl (pipe_result_link, buildNumber) as deploy_result
| count by event_date, buildNumber, deploy_status, deploymentEnvironment, files_commited, repoFullName, repoOwner, source_branch, deploy_result
| fields - _count
```



## Install the Bitbucket App and View the Dashboards

This page provides instructions for installing the Bitbucket app, as well as offering descriptions and examples for each of the pre-configured app dashboards.


### Install the App

This section demonstrates how to install the Bitbucket App.

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

6

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


### Dashboard Filter with Template Variables     

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](/docs/dashboards-new/filter-with-template-variables.md) help page.

You can use template variables to drill down and examine the data on a granular level.


### Bitbucket - Overview

The **Bitbucket - Overview** dashboard provides an overview of issues by repository, pull requests, builds and deployment status. Panels identify key trends and summarize the status across each workflow.

Use this dashboard to:


* Quickly get insight around how various Bitbucket components are being used.
* Drill-down into the specifics of builds, deploy or commit events.

7



### Bitbucket - Deployments

The **Bitbucket - Deployments** dashboard provides details around failed and successful deployments in production, staging, and test environments

Use this dashboard to:

* To confirm whether code was successfully deployed to production.
* To understand and drill-down into commits that led to failed deployments.
* Identify and investigate deploys to various environments that led to bugs or degradation in performance.


8


### Bitbucket - Builds

The **Bitbucket - Builds** dashboard provides a detailed view of the failed and successful builds overtime and by repository. It also lists the details of each build which includes the time when it was started and also identifies the changes made to the build.

Use this dashboard to:

* Speed up the overall software delivery processes by identifying bottlenecks in build failures.
* Monitor the success/failure rate of builds and identify relevant individuals, repos, and branches.
* Identify code commits that led to failed builds.

9



### Bitbucket - Issues

The **Bitbucket - Issues** dashboard provides a view of issues classified by type, priority, assignee, and project. This dashboard also provides details on issues escalated, issues summary, and issues over time.

Use this dashboard to:\
* Get insights into high-level statistics around software issues.
* Improve overall software delivery processes by identifying issues by priority, projects, users, and type.
* Get insights into identifying regressions and blockers.

10


### Bitbucket - Pull Requests

The **Bitbucket - Pull Request** dashboard gives a view of pull requests opened, merged, and declined as well as average time taken to close the pull request by repository and by reviewers.

Use this dashboard to:

* Improve the overall software delivery processes by identifying bottlenecks in review processes.
* Identify commits and code changes.
* Identify the teams and repos that take the longest to close pull requests.

11
