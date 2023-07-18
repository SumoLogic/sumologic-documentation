---
id: supported-tools-schema
title: Supported Tools and Schema
description: Learn which Tools and Schema are supported by Software Development Optimization Solution.
---

The Software Development Optimization (SDO) Solution comes bundled with Terraform support for the following tools in each phase of the DevOps lifecycle. While tools not listed in the table below lack Terraform support for automated installation, virtually any DevOps tool can be configured to work with SDO through manual configuration by transforming the structure of data ingested by these tools — using Sumo Logic Field Extraction Rules (FERs) — to adhere to the schema defined below.

| DevOps Phases             | Supported with Terraform                                          |
|:---------------------------|:-----------------------------------------------------------|
| Planning Phase            | Jira Cloud, Jira Server                                   |
| Dev/Code                  | GitHub, Bitbucket, GitLab                                 |
| Build/Test/Deploy/Release | Jenkins, Bitbucket Pipelines, CircleCI  Pipelines, GitLab |
| Monitor/Operate           | PagerDuty, Opsgenie                                       |

## Software Development Optimization dashboards

The apps and dashboards that are part of this solution are organized into:

* Tool specific dashboards that are based on the logs from individual DevOps tools to monitor the operations and security of individual tools.
* Dashboards that are based on an abstracted schema to monitor DORA metrics and the stages of your CI/CD pipelines across various phases. This is done so that you don’t have to change individual dashboard queries when you replace your tools, as well as to accommodate application development teams that have their own tool sets.

##  Schema Overview

As discussed earlier, the abstraction of tools is achieved via a common event schema model, where events from DevOps tools are mapped to fields via Sumo Logic [Field Extraction Rules (FERs)](/docs/manage/field-extractions). 

This model also enables you to integrate events from any of your tools, that may not be supported at present to the Software Development Optimization solution. 

![SchemaTool.png](/img/sdo/SchemaTool.png)

## Schema Definition

The tables below show the schema for various events from DevOps pipeline. These fields are required by Software Development Optimization Solutions dashboards and queries. 

**Deploy Event** - A deploy event describes when an artifact is deployed to dev, test, stage, or production. This event belongs to the Deploy and Release **DevOps Phase.**

The table below shows how deploy events are defined in the schema:

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| `event_type` | This field indicates the type of DevOps log event. The value of this field should be set to “deploy” | Required |
| `trace_id` | This field is used to establish correlations between a deploy/build event and a code merge event. For example, a commit-id can be used to join the events<br/>Code Merge (PR) and Build<br/>Code Merge (PR) and Deploy | Required |
| `link` | This field is used to provide a URL pointer to the deploy event. | Required |
| `datetime_epoch` | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| `environment_name` | This field is used to indicate the environment to which the deploy event occurred. Values for this field should be set to one of "production", “test”, “pre-prod”. You can also send in other values if applicable as well. | Required |
| `status` | This field is used to indicate the status of the deploy event. Values for this field should be set to one of the following: "Success", "Failure", "Unstable", or "Unknown". You can also send in other values if applicable as well. | Required |
| `commit_id` | This field is used to indicate the commit ID associated with a deploy event. This field is required to correlate code repository commit information with data from your CI tools and is typically set as the merge commit hash or HEAD commit. | Required |
| `target_branch` | This field is used to indicate the target code branch associated with a deploy event. Set the value of this field to “N/A” if not available. | Optional |
| `repository_name` | This field is used to indicate the code repository associated with the deploy event. Set the value of this field to “N/A” if not available. | Optional |
| `message` | This field is used to indicate any message Set the value of this field to “N/A” if not available.| Optional |
| `title` | This field can be used to indicate a deploy job name, description of pipeline/stage. Set the value of this field to “N/A” if not available.	Optional |
| `user` | This field indicates the user associated with a deploy event. Set the value of this field to “N/A” if not available. | Optional |
| `service` | This field indicates the service that got deployed. Set the value of this field to “N/A” if not available. | Optional |
| `team` | This field indicates the team for which a deploy event occurred. Set the value of this field to “N/A” if not available. | Optional |

**Build Event.** These events describe the chain of events when a  source code repository is compiled into executable artifacts, after which a series of automated unit and regressions tests are run.  

**DevOps Phase.** Build and Test  

The table below shows how build events are defined in the schema:

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| event_type | This field indicates the type of DevOps log event. The value of this field should be set to “build” | Required |
| trace_id | his field is used to establish correlations between a deploy/build event and a code merge event. For example, a commit-id can be used to join the events<br/>Code Merge (PR) and Build<br/>Code Merge (PR) and Deploy | Required |
| link | This field is used to provide a URL pointer to the build event. | Required |
| datetime_epoch | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| status | This field is used to indicate the status of the build event. Values for this field should be set to one of the following: "Success", "Failure", "Unstable", or "Unknown". You can also send in other values if applicable as well. | Required |
| commit_id | This field is used to indicate the commit ID associated with a build event. This field is required to correlate code repository commit information with data from your CI tools and is typically set as the merge commit hash or HEAD commit. | Required | 	 	 
| target_branch | This field is used to indicate the target code branch associated with a build event. Set the value of this field to “N/A” if not available. | Optional |
| repository_name | This field is used to indicate the code repository associated with the build event. Set the value of this field to “N/A” if not available. | Optional |
| message | This field is used to indicate any message Set the value of this field to “N/A” if not available. | Optional |
| title | This field can be used to indicate a build job name, description of pipeline/stage. Set the value of this field to “N/A” if not available. | Optional |
| user | This field indicates the user associated with a build event. Set the value of this field to “N/A” if not available. | Optional |
| service | This field indicates the service that got build. Set the value of this field to “N/A” if not available. | Optional |
| team | This field indicates the team for which a build event occurred. Set the value of this field to “N/A” if not available. | Optional |

**Push Event.** These events describe right from when a developer makes the first commit to a code repository until a raised pull request is merged.

**DevOps Phase.** Code

The table below shows how Push events are represented in the schema:

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| event_type | This field indicates the type of DevOps log event. The value of this field should be set to “push-request”  | Required |
| head_commit_id | This field is used to indicate the commit_id of the head commit associated with a push event. | Required |
| head_commit_epoch | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| head_commit_message | This field is used to indicate the head commit message of the event. | Required |
| base_commit_id | This field is used to indicate the commit_id of the base commit associated with a push event. | Required |
| base_commit_epoch | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| base_commit_message | This field is used to indicate the base commit message of the event. | Required |
| repository_name | This field is used to indicate the code repository associated with the push event. Set the value of this field to “N/A” if not available. | Optional |
| user | This field indicates the user associated with a push event. Set the value of this field to “N/A” if not available. | Optional |

**Pull Request Event.** These events describe when a developer asks their peers to review and accept changes they’ve made to a code repository.

**DevOps Phase.** Code

The table below shows how Pull Request events are represented in the schema: 

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| event_type | This field indicates the type of DevOps log event. The value of this field should be set to “pull_request” | Required |
| title | This field represents either a title, subject or description of a pull request. | Required |
| link | This field is used to provide a URL pointer to the pull_request event. | Required |
| commit_id | This field is used to indicate the commit ID associated with a pull_request event. This field is required to correlate code repository commit information with data from your CI tools and is typically set as the merge commit hash or HEAD commit. | Required |
| head_commit_id | This field is used to indicate the commit_id of the head commit associated with a pull_request event. | Required |
| reviewers | This field represents a list of  reviewers. This data is expected to be in the following format: `["john","bob",..]` | Required |
| datetime_epoch | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| status | This field represents the status of the pull request event. Values for this field should be set to one of: “merged”, “declined” or “created”. You can also send in other values if applicable as well. | Required |
| closeddate_epoch | This field indicates the date and time when a pull request was either merged or closed time represented in epoch milliseconds. For pull requests events that do not represent merge or closed PRs (e.g.  created, declined, or other PRs), this field can be empty, "n/a",or "000000" | Required |
| updateddatetime_epoch | This field is used to indicate the last updated date and time in UTC epoch milliseconds of the event. | Required |
| target_branch | This field is used to indicate the target code branch associated with a pull_request event. Set the value of this field to “N/A” if not available. | Optional |
| user | This field indicates the user associated with a pull_request event. Set the value of this field to “N/A” if not available. | Optional |
| team | This field indicates the team for which a pull_request event occurred. Set the value of this field to “N/A” if not available. | Optional |
| service | This field indicates the service that got pull_request. Set the value of this field to “N/A” if not available. | Optional |
| repository_name | This field is used to indicate the code repository associated with the pull request event. Set the value of this field to “N/A” if not available. | Optional |

**Incident/Alert Event.** These events identify when a production or customer-facing incident is created, resolved, and managed through an incident management system.     

**DevOps Phase.** Monitor and Operate

The table below shows how Incident/Alert events are represented in the schema.

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| event_type | This field indicates the type of DevOps log event. Enum Values : "alert_created", "alert_closed", or other values. | Required |
| alert_id | This field represents the alert ID | Required |
| priority | Values for this field should be set to one of: “high”, “medium”, “low”. You can also send in other values if applicable as well. | Required |
| link | This field is used to provide a URL pointer to the alert event. | Required |
datetime_epoch	This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Required |
| closeddate_epoch | For closed alerts, this field represents the date and time when the alert was closed in epoch milliseconds. For alert creation, or other alert events,  this field can be empty, "n/a" or "000000"	 | Required |
| service | This field indicates the service that got pull_request. Set the value of this field to “N/A” if not available. | Optional |
| team | This field indicates the team for which an alert event occurred. Set the value of this field to “N/A” if not available. | Optional |

**Issue Event.** These events describe events when a task, bug, issue, or work item is created and updated.   

**DevOps Phase.** Plan

The table below shows how Issue events are represented in the schema.

| Field | Explanation | Required/Optional |
| :-- | :-- | :-- |
| link | This field is used to provide a URL pointer to the issue event. | Required |
| issue_key | This field represents an issue ID or key | Required |
| issue_type | This field indicates the type of DevOps log event. The value of this field should be set to “issue.” | Required |
| issue_status | This field represents the status of a given issue. Values for this field should be set to one of: “No Category”, “Complete”, “Done”, “To Do”, “New” or “In Progress”. You can also send in other values if applicable as well. | Required |
| priority | This field represents the Priority of an Issue. Values for this field should be set to one of: “Major”, “Critical”, “Medium”, “Blocker”, “Minor”, “Low”, “High”, “Highest”, “Trivial”. You can also send in other values if applicable as well. | Required |
| closeddate_epoch | For closed alerts, this field represents the date and time when the alert was closed in epoch milliseconds. For alert creation, or other alert events, this field can be empty, "n/a" or "000000" | Required |
| event_type | This field indicates the type of DevOps log event. The value of this field should be set to “issue.” | Required |
| issue_event_type | This field indicates the type of event related to an issue.  Values for this field should be set to one of: “Created”, “Deleted”, “Updated”, “Reopened” or “Closed” | Optional |
| project_name | This field represents the project associated with an issue event. Set the value of this field to “N/A” if not available. | Optional |
| service | This field indicates the service that got an alert. Set the value of this field to “N/A” if not available.  | Optional |
| team | This field indicates the team for which an alert event occurred. Set the value of this field to “N/A” if not available. | Optional |
| datetime_epoch | This field is used to indicate the date and time in UTC epoch milliseconds when the event occurred. | Optional |

## Examples

The mapping of events from tool sets to this event schema is achieved via Sumo Logic [FERs](/docs/manage/field-extractions/create-field-extraction-rule.md). For Example, For [PagerDuty V2 Incidents](https://developer.pagerduty.com/docs/webhooks/v2-overview/), we map the incident payload to the alert event schema using the following **Parse Expression.**

```
parse regex "(?<event>\{\"event\":\"incident\..+?\}(?=,\{\"event\":\"incident\..+|\]\}$))"
|json  field=event "event", "created_on", "incident" as alert_type, dateTime, incident
|json field=incident "id",  "service.name" , "urgency", "teams[0].summary", "html_url"  as alert_id, service, priority, team, link
|json  field=incident "created_at" as closeddate nodrop
| where alert_type in ("incident.trigger", "incident.resolve")
| parseDate(dateTime, "yyyy-MM-dd'T'HH:mm:ss'Z'") as dateTime_epoch
| parseDate(closeddate, "yyyy-MM-dd'T'HH:mm:ss'Z'") as closeddate_epoch
| if (alert_type matches "*trigger", "alert_created", if(alert_type matches "*resolve", "alert_closed", "other") ) as event_type
```

The field extraction rule created is shown in the diagram below: 

![pagerduty-v2-alerts.png](/img/sdo/pagerduty-v2-alerts.png)


Examples of mapping field extraction rules to the other out-of-the-box tools can be found in [this JSON file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/software-development-optimization-terraform/sdo_app_artifacts/sdo_fer.txt).

## Enriching the schema with additional fields

You can add additional fields such as project, product, or server names to the above schema by following the steps below: 

1. Modify the existing set of FERs, by adding a new field in the definition of that FER . For example, if you are modifying the Sumo Logic Jenkins FER, then you can add this field either in:
    * The [SumoUpload](https://github.com/jenkinsci/sumologic-publisher-plugin#sumoupload) function in the Jenkins plugin.
    * Add [metadata fields](/docs/manage/fields) at the Sumo Logic source.  
1. Write and test Sumo Logic searches using this new field to derive the insights you want.
1. Add [panels](/docs/dashboards/panels) based on the above searches to the existing set of dashboards.
1. Add [filters](../../dashboards/edit-dashboards/use-filters-dashboards.md) to the dashboards.
