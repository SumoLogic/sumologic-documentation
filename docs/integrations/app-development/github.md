---
id: github
title: Sumo Logic App for GitHub
sidebar_label: GitHub
description: Connects to your GitHub repository at the Organization or Repository level, and ingests GitHub events through a webhook.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/GitHub.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic App for GitHub connects to your GitHub repository at the Organization or Repository level, and ingests GitHub events via a webhook. These events populate the pre-configured Dashboards to give you a complete overview of your GitHub’s branch, issues, pull requests, user activity, and security events.

The Sumo App for GitHub supports GitHub.com, not GitHub Enterprise.


## Event Types

The Sumo Logic App for GitHub ingests GitHub events via a webhook. Sumo Logic ingests all events, but only uses the following events in the Dashboards:
* Fork
* Issues
* Membership
* Public
* Pull
* Pull_request
* Push
* Repository
* Team_add

For information on GitHub events, refer to [GitHub documentation](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/about-webhooks#events). For troubleshooting, see [GitHub Troubleshooting](#Troubleshooting).

:::tip
If you're just getting started with GitHub Events, see the Sumo Logic DevOps blog, "[A Beginner's Guide to GitHub Events](https://www.sumologic.com/blog/a-beginners-guide-to-github-events/)."
:::


## Log Types

The Sumo Logic App for GitHub gathers statistics and events from the GitHub Remote API on each host.

First, configure a Collector and Source in Sumo Logic, then configure a GitHub Webhook using the HTTP Source Address created in Sumo Logic.


### Sample Log Messages

GitHub sends all fields in the payload, documented according to [Event Type](https://developer.github.com/v3/activity/events/types/).


```json
{
  "action": "opened",
  "issue": {
    "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    "number": 1347,
    ...
  },
  "repository" : {
    "id": 1296269,
    "full_name": "octocat/Hello-World",
    "owner": {
      "login": "octocat",
      "id": 1,
      ...
    },
    ...
  },
  "sender": {
    "login": "octocat",
    "id": 1,
    ...
  }
}
```

### Sample Queries

```sql title="Commits Over Time"
"commits" "https://api.github.com/repos"
| json "commits[*].id[*]", "repository.name", "pusher.name" as commit_size, repo_name, user
| where commit_size != "[]"
| replace(commit_size, ",","") as Ccommit_size
| (length(commit_size) - length(Ccommit_size) + 1) as num_commits
| timeslice 1d
| count by _timeslice
```

```sql title="Members Added or Removed"
| json "action", "scope", "member.login", "member.id", "member.type", "team.name", "team.permission", "organization.login" as action, scope, member_name, member_id, member_type, team_name, team_permission, org_login
| count by member_id, action, team_name, org_login, member_name, team_permission
| order by action, member_id
| fields member_name, action, team_name, org_login, team_permission
```


```sql title="Total Number Open Issues"
| json "action", "issue.id", "issue.number", "issue.title" , "issue.state", "issue.created_at", "issue.updated_at", "issue.closed_at", "issue.body", "issue.user.login", "issue.url", "repository.name", "repository.open_issues_count" as axn, issue_ID, issue_num, issue_title, state, createdAt, updatedAt, closedAt, body, user, url, repo_name, repoOpenIssueCnt
| withtime repoOpenIssueCnt
| most_recent (repoopenissuecnt_withtime) as number_issues by repo_name
| number (number_issues)
```


## Collecting Logs for GitHub

This procedure explains how to collect logs from GitHub.

The Sumo Logic App for GitHub connects to your GitHub repository at the Organization or Repository level and ingests GitHub events via a webhook. These events populate the preconfigured dashboards to give you a complete overview of your GitHub’s branch, issues, pull requests, user activity, and security events.


### Configure Hosted Collector to Receive GitHub Events

In this step, you create a Hosted Collector to receive Webhook Events from Github and set up an HTTP Source on it.

1. Configure a [Hosted Collector](/docs/send-data/configure-hosted-collector), or select an existing hosted collector for the HTTP Source.
2. Configure an[ HTTP Source](/docs/send-data/sources/hosted-collectors/http-logs-metrics-source) on the Hosted Collector.
    * For Source Category, enter any string to tag the output collected from this Source, such as **GitHub**.
    * Click **+Add Field** and provide the following:
        * **Field Name.** `_convertHeadersToFields`
        * **Value.** true
    * Click **Save** and make note of the HTTP address for the Source. You will supply it when you configure the GitHub Webhook in the next section.<br/><img src={useBaseUrl('img/integrations/app-development/Field_GitHub.png')} alt="Field_GitHub" />

### Configure a GitHub Webhook

In GitHub, configure a Webhook to connect to your Sumo Logic HTTP Source. You can configure the Webhook at the Organization or Repository level. Once configured, it will be triggered each time one or more subscribed events occur in that Organization or Repository.

You can create up to 20 Webhooks for each event on each specific organization or repository.

To configure a GitHub Webhook:

1. Sign in to your GitHub account.
2. Go to your Organization.
3. Go to **Settings > Webhooks**.
4. Click **Add Webhook**. The Add Webhook form appears.
5. Enter Webhook form data as follows:
    1. **Payload URL**. Enter the Sumo Logic HTTP Source Address from the **source setup step.**
    2. **Content type**. Select application/json.
    3. **Secret**. Leave blank.
    4. **Which events would you like to trigger this Webhook?** Select **Send me everything**.
    5. **Active**. Check the box.
6. Click **Add Webhook**.


### Enable GitHub Event tagging at Sumo Logic

Sumo Logic needs to understand the event type for incoming events. To enable this, the [x-github-event](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads) event type needs to be enabled. To enable this, perform the following steps in the Sumo Logic console:

1. From Sumo Logic, go to **Manage Data** > **Logs** > [**Fields**](/docs/manage/fields.md#add-field).
2. Add Field ‎**x-github-event**‎.<br/><img src={useBaseUrl('img/integrations/app-development/Field_x-github-event.png')} alt="Field_GitHub" />


## Installing the GitHub App

Now that you have set up collector GitHub, install the Sumo Logic App for GitHub to use the preconfigured searches and [dashboards](#viewing-dashboards) to analyze your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


#### Troubleshooting

If you are getting the following error after installing the app - `Field x-github-event not found, please check the spelling and try again` - do the following to resolve:
1. In Sumo Logic, click **Manage Data** > **Logs** > [Fields and](/docs/manage/fields.md#add-field) delete your **x-github-event**.
2. Add it again using the **Dropped Fields** option.


## Viewing ​GitHub Dashboards

### Overview

The **GitHub - Overview** dashboard provides an at-a-glance view of your GitHub issues, pull requests, and the commits over time.

Use this dashboard to:
* Get an overview of Github commits, Pull Requests, and Issues.

<img src={useBaseUrl('img/integrations/app-development/GitHub-Overview.png')} alt="GitHub-Overview" />

### Branch Overview

The **GitHub - Branch Overview **dashboard provides information about the commits, file operations like addition, deletion, and modifications per branch.

Use this dashboard to:

* Review branch-specific details.
* Identify the type of files being added, deleted, or modified.
* Review the commit details.

<img src={useBaseUrl('img/integrations/app-development/Github-Branch-Overview.png')} alt="GitHub dashboard" />


### Issue Overview

The **GitHub - Issue Overview** dashboard provides detailed information about the issues opened, closed, and unassigned issues.

Use this dashboard to:

* Review issue status including unassigned, open, and closed issues.
* Quickly review the issue details and take action accordingly.

<img src={useBaseUrl('img/integrations/app-development/GitHubIssueOverview.png')} alt="GitHub-Overview" />

### Pull Request Overview

The **GitHub - Pull Request Overview** dashboard gives the view of pull requests by the target branch. It also provides a detailed view of the pull requests in comparison to created, merged, and declined.

Use this dashboard to:
* View and review pull requests.
* Review comments on pull requests.
* Identify open and not merged critical pull requests.

<img src={useBaseUrl('img/integrations/app-development/GitHub-Pull-Request-Overview.png')} alt="GitHub-Pull-Request-Overview" />

### Security

The **GitHub - Security **dashboard provides detailed information on the security events and repositories.

Use this dashboard to:
* Manage users.
* Review and manage repositories.
* View and manage teams.

<img src={useBaseUrl('img/integrations/app-development/GitHub-Security.png')} alt="GitHub-Overview" />

### User Activity

The **GitHub - User Activity** dashboard provides detailed insight into all user activity and potential suspicious activities.

Use this dashboard to:
* Review and manage user activity.
* Determine files added, removed, and modified by users.
* Identify any harmful file types added by users.

<img src={useBaseUrl('img/integrations/app-development/Github-User-Activity.png')} alt="GitHub-Overview" />
