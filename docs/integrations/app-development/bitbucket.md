---
id: bitbucket
title: Bitbucket
sidebar_label: Bitbucket
description: The Sumo Logic App for Bitbucket provides insights into project management to more effectively plan the deployments. It helps you to understand the state of deployment, builds and the issues associated with it.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/bitbucket.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic App for Bitbucket provides insights to development teams into how their software delivery pipeline components are performing. The pre-configured dashboards organize issues, builds, and deployments that require the most attention.

The Bitbucket App supports only Bitbucket Cloud.


## Event Types

Sumo Logic analyzes the following required types of logs for more efficient monitoring.

There are two types of events of interest from Bitbucket to Sumo Logic: Bitbucket and Deploy events. This section provides an example of Bitbucket Events and Deploy Events log messages.

### Bitbucket Events

**Bitbucket Events** send the event request to the server URL for the Webhook whenever that event occurs.

#### Available Repository events
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Push">Push</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Fork">Fork</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Updated">Updated</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Commitcommentcreated">Commit comment created</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Buildstatuscreated">Build status created</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Buildstatusupdated">Build status updated</a>

#### Available Issue events
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Created">Created</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Updated.1">Updated</a>
* <a href="https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Commentcreated">Comment created</a>

Refer to the [event documentation](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html) for descriptions and examples of each event payload above.

For log samples, refer to [Bitbucket Event Documentation](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html)

### Sample Log

**Deploy Events** are triggered whenever code is pushed to test, staging, or production environments.
* Success Code Deploys
* Failed Code Deploys

```json title="Sample Deploy Event Log"
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


### Sample Query

This section provides a sample from the **Failed Deployments** panel on the **Bitbucket Deployment** dashboard.

Parameters:
* Event_Date:*
* Build_Number:*
* Deploy_Status:*
* Deployment_Environment:*
* Files_Committed:*
* Repo_Full_Name:*
* Repo_Owner:*
* Source_Branch:*
* Deploy_Result:*

```sql title="Query String"
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


## Collecting Logs for Bitbucket App

This section provides instructions for configuring log collection for the Bitbucket App. Configuring log collection consists of the following tasks:

### Step 1: Configure Hosted Collector to Receive Bitbucket events

In this step, you configure a Hosted Collector to receive Webhook Events from Bitbucket and set up an HTTP source on it.
1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](/docs/send-data/hosted-collectors/http-source/logs-metrics) on the hosted collector.
    * For Source Category, specify `bitbucket/events`.
    * Click **+Add Field** and provide the following:
        * **Field Name.** `_convertHeadersToFields`
        * **Value.** `true`
    * Click **Save** and make note of the HTTP address for the source. You will supply it when you configure a Jira Webhook in the next step.<br/><img src={useBaseUrl('img/integrations/app-development/bitbucket1.png')} alt="Bitbucket" />

### Step 2: Adding a Webhook in Bitbucket

1. From Bitbucket, open the repository where you want to add the Webhook.
2. Click the **Settings** link on the left side.
3. From the links on the **Settings** page, click the **Webhooks** link.
4. Click the **Add Webhook** button to create a Webhook for the repository. The **Add New Webhook** page appears.<br/><img src={useBaseUrl('img/integrations/app-development/Collect_Log_BB.png')} alt="Bitbucket" />
5. Enter a **Title** with a short description.
6. Enter Sumo Logic Http source **URL**, you configured this in [Configure Hosted Collector to Receive Bitbucket events](#Configure_Hosted_Collector_to_Receive_Bitbucket_events).
7. Click on **Status** to make it **Active**.
8. **Triggers** - Click on Choose from a full list of triggers, and choose all triggers under Repository, Issue and Pull Request.
9. Click **Save**


### Step 3: Configure the Bitbucket CI/CD Pipeline to Collect Deploy Events

A Bitbucket pipe needs to be configured to send code deploy status to Sumo Logic. Add the following pipe code to the step section of your deployment part of the `bitbucket-pipelines.yml` file. Replace `SUMOLOGIC_HTTP_URL` with HTTP Source URL configured in Step 1.

```bash
after-script:
    - pipe: docker://appdevsumologic/sumologic-send-event:1.15
        variables:
          SUMO_LOGIC_BASE_URL: '<SUMOLOGIC_HTTP_URL>'
```

If you want to deployment events to multiple Sumo Logic orgs, include a `-pipe` statement, as shown above, for each of the Sumo Logic endpoints.

For reference: This is how the [bitbucket-pipelines.yml](https://bitbucket.org/app-dev-sumo/backendservice/src/master/bitbucket-pipelines.yml) looks after adding deploy pipe code to our sample Bitbucket CI/CD pipeline.


### Step 4: Enable Bitbucket Event-Key tagging at Sumo Logic

Sumo Logic needs to understand the event type for incoming events (for example, repo:push events). To enable this, the [X-Event-Key](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-HTTPheaders) event type needs to be enabled. To enable this, perform the following steps in the Sumo Logic console:

1. From Sumo Logic, go to **Manage Date** > **Logs** > **[Fields](/docs/manage/fields.md#add-field)**.
2. Add Field ‎**X-Event-Key**‎.<br/><img src={useBaseUrl('img/integrations/app-development/BB_Collect_Log.png')} alt="Bitbucket" />


## Installing the Bitbucket App

This section provides instructions for installing the Bitbucket app.

{@import ../../reuse/apps/app-install.md}

## Viewing Bitbucket Dashboards

This section provides descriptions and examples for each of the pre-configured app dashboards.

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

The **Bitbucket - Overview** dashboard provides an overview of issues by repository, pull requests, builds and deployment status. Panels identify key trends and summarize the status across each workflow.

Use this dashboard to:
* Quickly get insight around how various Bitbucket components are being used.
* Drill-down into the specifics of builds, deploy or commit events.

<img src={useBaseUrl('img/integrations/app-development/Bitbucket_Overview.png')} alt="bitbucket" />

### Deployments

The **Bitbucket - Deployments** dashboard provides details around failed and successful deployments in production, staging, and test environments

Use this dashboard to:
* To confirm whether code was successfully deployed to production.
* To understand and drill-down into commits that led to failed deployments.
* Identify and investigate deploys to various environments that led to bugs or degradation in performance.

<img src={useBaseUrl('img/integrations/app-development/Bitbucket_Deployments.png')} alt="bitbucket" />

### Builds

The **Bitbucket - Builds** dashboard provides a detailed view of the failed and successful builds overtime and by repository. It also lists the details of each build which includes the time when it was started and also identifies the changes made to the build.

Use this dashboard to:
* Speed up the overall software delivery processes by identifying bottlenecks in build failures.
* Monitor the success/failure rate of builds and identify relevant individuals, repos, and branches.
* Identify code commits that led to failed builds.

<img src={useBaseUrl('img/integrations/app-development/Bitbucket_Builds.png')} alt="bitbucket" />

### Issues

The **Bitbucket - Issues** dashboard provides a view of issues classified by type, priority, assignee, and project. This dashboard also provides details on issues escalated, issues summary, and issues over time.

Use this dashboard to:
* Get insights into high-level statistics around software issues.
* Improve overall software delivery processes by identifying issues by priority, projects, users, and type.
* Get insights into identifying regressions and blockers.

<img src={useBaseUrl('img/integrations/app-development/Bitbucket_Issues.png')} alt="bitbucket" />

### Pull Requests

The **Bitbucket - Pull Request** dashboard gives a view of pull requests opened, merged, and declined as well as average time taken to close the pull request by repository and by reviewers.

Use this dashboard to:
* Improve the overall software delivery processes by identifying bottlenecks in review processes.
* Identify commits and code changes.
* Identify the teams and repos that take the longest to close pull requests.

<img src={useBaseUrl('img/integrations/app-development/Bitbucket_PullRequests.png')} alt="bitbucket" />
