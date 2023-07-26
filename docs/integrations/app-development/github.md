---
id: github
title: GitHub
sidebar_label: GitHub
description: Connects to your GitHub repository at the Organization or Repository level, and ingests GitHub events through a webhook.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/GitHub.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic App for GitHub connects to your GitHub repository at the Organization or Repository level, and ingests GitHub events through a webhook. These events populate the pre-configured Dashboards to give you a complete overview of your GitHub’s branch, issues, pull requests, user activity, and security events.

:::note
The Sumo App for GitHub supports GitHub.com, GitHub Advanced Analytics, not GitHub Enterprise.
:::

This app includes dashboards for GHAS, but to be able to ingest GHAS events you must have a separate GHAS license.

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

For the GitHub Advanced Security dashboards Sumo Logic App for GitHub uses these types events, but not limited to:

* Code Scanning Alerts
* Pushes
* Secret Scanning Alerts
* Security and analysis
* Repository Vulnerability alerts.

For information on GitHub events, see the [GitHub documentation](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/about-webhooks#events).

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

The Sumo Logic App for GitHub connects to your GitHub repository at the Organization or Repository level and ingests GitHub events via a webhook. These events populate the preconfigured dashboards to give you a complete overview of your GitHub’s branch, issues, pull requests, user activity, and security events.


### Configure Hosted Collector to Receive GitHub Events

In this step, you configure a Hosted Collector to receive Webhook Events from GitHub and set up an HTTP Source on it.

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector), or select an existing hosted collector for the HTTP Source.
2. Configure an[ HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics) on the Hosted Collector.
    * For Source Category, enter any string to tag the output collected from this Source, such as **GitHub**.
    * Click **+Add Field** and provide the following:
        * **Field Name**. `_convertHeadersToFields`
        * **Value**. `true`
    * Expand **Advanced Options for Logs (Optional)** section, then **uncheck (disable)** option, then **Extract timestamp information from log file entries** in **Timestamp Parsing**
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

Now that you have set up collector GitHub, install the Sumo Logic App for GitHub to use the preconfigured searches and dashboards to analyze your data.

{@import ../../reuse/apps/app-install.md}

#### Troubleshooting

If you are getting the following error after installing the app - `Field x-github-event not found, please check the spelling and try again` - do the following to resolve:
1. In Sumo Logic, click **Manage Data** > **Logs** > [Fields and](/docs/manage/fields.md#add-field) delete your **x-github-event**.
2. Add it again using the **Dropped Fields** option.


## Viewing ​GitHub Dashboards

### Overview

The **GitHub - Overview** dashboard provides an at-a-glance view of your GitHub issues, pull requests, and the commits over time.

Use this dashboard to:
* Get an overview of GitHub commits, Pull Requests, and Issues.

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

### GHAS - Advanced Security Overview

The **GHAS - Advanced Security Overview** dashboard provides an overview of GHAS metrics across Dependabot, secret scanning, and code scanning alerts.

Use this dashboard to:

* Monitor open alerts
* Monitor alerts by severity
* Review recently closed alerts

<img src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/GitHub/GHAS-Advanced-Security-Overview.png" alt="undefined" title="Advanced Security Overview" />

### GHAS - Secret Scanning Alerts

**Use this dashboard to:**

* Monitor MTTR
* Quantify secrets found and fixed
* Check secrets by type and repository
* Compare secrets and found to secrets in fixed ratios

<img alt="undefined" class="default" src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/GitHub/GHAS-Secret-Scanning-Alerts.png"/>

### GHAS - Code Scanning Alerts

The **GHAS - Code Scanning Alerts** dashboard provides a granular overview of the code scanning alerts.

Use this dashboard to display:

* Mean Time to Resolution (average aggregate resolution time)
* Alerts created, fixed, and reopened
* Alerts found/fixed ratio
* Commit/alert ratio
* Alerts by tool, severity, or repo

<img alt="undefined" class="default" src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/GitHub/GHAS-Code-Scanning-Alerts.png" />

### GHAS - Dependabot Alerts

The **GHAS - Code Scanning Alerts** dashboard provides a granular overview of the Dependabot alerts

**Use this dashboard to display:**

* Mean Time to Resolution (average aggregate resolution time)
* Alerts created, fixed, and dismissed
* Alerts found/fixed ratio
* Vulnerabilities by repo
* New alerts by repo

<img alt="undefined" class="default" src="https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/GitHub/GHAS-Dependabot-Alerts.png" />
