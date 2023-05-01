---
id: jira-cloud
title: Jira Cloud
sidebar_label: Jira Cloud
description: The Sumo Logic App for Jira Cloud provides insights into project management issues that enable you to more effectively plan, assign, track, report, and manage work across multiple teams.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jira.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic App for Jira Cloud provides insights into how your Jira projects and issues are being managed so as to enable you to be more effective and manage work across multiple teams. This guide provides instructions for installing and configuring the Jira Cloud App, as well as offering examples and descriptions of the app pre-configured dashboards.


## Log Types

The Jira Cloud App uses the following types of logs:

* Issue related events
* Project-related events
* User related events
* Jira configuration related events
* Jira Software related events

For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/) in Jira help


### Sample Log Messages

For more information about log messages, see [Sample Log for Jira Cloud](https://developer.atlassian.com/cloud/jira/platform/rest/v2/).


### Sample Query

This section provides a sample query from the **Unassigned Issues** panel on the **Jira Cloud - Issue Details** dashboard.

**Parameters**

* Issue:*
* Issue_Summary:*

```sql title="Query String"
_sourceCategory="jira_cloud" *issue*
| json field=_raw "webhookEvent", "issue_event_type_name", "changelog", "issue.fields.creator.displayName", "issue.self",  "issue.key", "timestamp", "issue.fields.issuetype.name", "issue.fields.status.name", "issue.fields.resolution.name", "issue.fields.project.name", "issue.fields.status.statusCategory.name", "user.active",  "issue.fields.assignee.displayName", "issue.fields.summary", "issue.fields.priority.name", "issue.fields.components", "issue.fields.labels" as  event_name, event_type, change_log, issue_creator, jira_self, issue_key, timestamp, type, status, resolution, project_name, status_category, is_active, issue_assignee, issue_summary, priority, components, labels  nodrop
| where   project_name matches "*" AND issue_key matches "*" AND type matches "*" AND priority matches "*" AND status_category matches "*" AND status matches "*"
| isNull(issue_assignee) ? "Unassigned" : issue_assignee as issue_assignee
| parse regex field=labels "\"(?<label>[\S]+?)\"" multi nodrop
| parse regex field=components "\"name\":\"(?<component>[\S]+?)\"" multi nodrop
| where component matches "*" and  label matches "*"
| json field=change_log "items" as changes nodrop
| formatDate(fromMillis(timestamp), "MM-dd-yyyy HH:mm:ss", "UTC") as date_time
| parse regex field=jira_self "https:\/\/(?<base_url>.*?)\/"
| concat("https://",base_url,"/browse/", issue_key) as issue_url
| tourl(issue_url, issue_key) as issue
| withtime issue_assignee
| most_recent(issue_assignee_withtime) as user by issue, issue_summary
| where user="Unassigned"
| count as count by issue, issue_summary
| fields - count
```


## Collecting Logs for the Jira Cloud App

This section provides instructions for configuring log collection for the Jira Cloud App.

Configuring log collection consists of the following tasks:
* **Configuring a Hosted Collector in Sumo Logic to receive Jira Cloud Events:** A Hosted Collector is installed to receive the Webhooks from Jira. The Webhooks configuration helps to notify the app or web application when certain events occur in Jira. Using the Webhooks the remote applications do not have to monitor whether changes have occurred
* **Registering a Webhook in Jira Cloud:** Webhooks are registered in Jira for various events by Jira administration console or Jira REST API methods. These Webhooks can be used as an alert to the remote application when the issues are updated or sprints are started.

For more information, please see the [documentation](https://developer.atlassian.com/server/jira/platform/webhooks/) for Webhooks in Jira Cloud.


### Step 1: Configure Hosted Collector to Receive Webhooks

In this step, you create a host collector to receive Webhooks from Jira and set up an HTTP source on it.
1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector), or select an existing hosted collector for the HTTP source.
2. Configure an [HTTP source](/docs/send-data/hosted-collectors/http-source/logs-metrics) on the hosted collector.
    * For **Source Category**, specify `jira_cloud/events`.
    * Make a note of the HTTP address for the source. You will supply it when you configure a Jira Webhook in the next step.


### Step 2: Register Webhook in Jira

Follow the instructions on [Webhooks](https://confluence.atlassian.com/adminjiracloud/managing-webhooks-776636231.html) in Jira help to register a Webhook for the following events:


#### Issue Related Events

* Issue
    * created
    * updated
    * deleted
* Comment
    * created
    * updated
    * deleted
* Attachment
    * created
    * deleted
* Worklog
    * created
    * updated
    * deleted
* Entity property
    * created or updated
    * deleted
* Issue link
    * created
    * deleted


#### Project-related Events

* Version
    * released
    * unreleased
    * created
    * moved
    * updated
    * merged
    * deleted
* Project
    * created
    * updated
    * deleted


#### User-Related Events

* User
    * created
    * deleted
    * updated


#### Jira Configuration Related Events

* Features status change (enabled/disabled)
    * voting
    * watching
    * unassigned issues
    * subtasks
    * attachments
    * issue links
    * time tracking
    * time tracking provider


#### Jira Software Related Events

* Board
    * created
    * deleted
    * updated
    * configuration changed

#### Sprint Events

* Sprint
    * created
    * deleted
    * updated
    * started
    * closed

When you configure the Webhook, enter the URL for the HTTP source you created in [Step 2](#step-2-register-webhook-in-jira) as the endpoint for the Webhook.


## Installing the Jira Cloud App

This section demonstrates how to install the Jira Cloud App.

{@import ../../reuse/apps/app-install.md}

## Viewing Jira Cloud Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::


### Issue Overview

The **Jira Cloud - Issue Overview** dashboard provides users with a high-level view of activities such as issues created, closed, reopened, and in progress.

Use this dashboard to:

* Understand how issues are being created, closed and reopened.
* Quickly identify issue types, components, and projects that need the most attention.
* Identify how work in progress could affect your development and delivery lifecycle.

<img src={useBaseUrl('img/integrations/app-development/Jira_Cloud_Issue_Overview.png')} alt="jira cloud" />


### Issue Details

The **Jira Cloud - Issue Details** dashboard provides a visual overview of issues in Jira. The analytics help you visually examine critical information related to issues created compared to issues closed. The panels also provide details on open and closed issues, issue assignments and escalations. a list of issues escalated, unassigned, or reopened, and the average time is taken to close issues.

Use this dashboard to:

*  Identifying issues, components, teams, and initiatives that require the most attention.
*  Get insight into the time taken to close Jira issues by projects, types, and users.

<img src={useBaseUrl('img/integrations/app-development/Jira_Cloud_Issue_Details.png')} alt="jira cloud" />

### Recent Issues Changes

The **Jira Cloud - Recent Issues Changes** dashboard tracks the recent progress of Jira issues. The panels provide information about the type of issue, the timestamp when it was created, issue status, category, assignee, and issue summary.

Use this dashboard to:
* Identify the recent progress of Issues. This dashboard gives the progress of your software delivery processes in chronological order. You can use filters to drill down to a more detailed view.

Following drill down, filters are available: Components, Project Name, Status, Label, Issue Key, Issue Type, Priority, and Status Category.

<img src={useBaseUrl('img/integrations/app-development/Jira_Cloud_Recent_Issue_Changes.png')} alt="jira cloud" />

### Sprint Events

The **Jira Cloud - Sprint Events** dashboard provides an at-a-glance view of sprint events. The panels also provide tabular representations of all sprint events spread over a week, sprints created, sprints started, and sprints closed.

Use this dashboard to:
* Monitor the progress of sprints in your development cycle. You can track active sprints and their start and end dates.

<img src={useBaseUrl('img/integrations/app-development/Jira_Cloud_Sprint_Events.png')} alt="jira cloud" />



### User Events

The **Jira Cloud - User Events** dashboard provides an overview of user profiles. The analytics allow you to closely monitor the unusual activity related to users created, updated, and deleted.

Use this dashboard to:

* Monitor and audit all administrative activities related to the creation and modification of Jira Cloud users.

<img src={useBaseUrl('img/integrations/app-development/Jira_Cloud_User_Events.png')} alt="jira cloud" />
