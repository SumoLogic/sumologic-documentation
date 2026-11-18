---
id: install-sdo-app-view-dashboards
title: Installing the SDO App and Dashboards
sidebar_label: Install SDO App and Dashboards
description: Learn how to install the Sumo Logic SDO app and use pre-configured searches and dashboards that provide insights into your DevOps pipeline.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

If you've set up the Software Development Optimization (SDO) solution [using Terraform](/docs/observability/sdo/set-up-sdo/sdo-setup-with-terraform-script), you can skip the manual installation of SDO app.

## Installing the SDO app

Now that you've set up SDO configuration and collection, install the Sumo Logic app for Software Development Optimization to use the preconfigured searches and dashboards that provide you insights and visibility into your DevOps phases and pipelines.

The SDO app is a next-gen app. When you install it, Sumo Logic creates the following fields if they do not already exist: `event_type`, `status`, `team`, `service`, `repository_name`, `project_name`, `issue_type`, `issue_status`, `environment_name`, `priority`, `commit_id`, `closeddate_epoch`, and `datetime_epoch`.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing SDO dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

Each of the Software Development Optimization Solution apps provides a set of preconfigured dashboards that display real-time data from across your environment. Being able to access this information behind a single pane of glass allows you to more effectively monitor and troubleshoot your DevOps projects from inception through deployment.

### SDO app folders

The SDO app installs the following folders in your **Installed Apps** folder:

* **Software Development Optimization**. The top-level folder. It contains the SDO - DORA Metrics Overview and SDO - Pipeline Overview dashboards.
* **DORA Metrics**. Contains the dashboards that calculate the four DORA metrics, which help measure application release velocity and availability.
* **CI/CD Pipeline Monitoring**. Contains the dashboards that help you monitor and troubleshoot issues in individual phases of your DevOps pipelines.
* **Reports**. Contains the saved log searches that calculate the DORA metrics: Average Time to Restore Service, Change Failure Rate, Change Failure Rate Trends, Deployment Frequency Trends, Deploys per week, Lead Time, Lead Time Trends, and Time to Restore Service Trends.

## Software Development Optimization app suite

The SDO solution comprises multiple apps listed below.

* [Software Development Optimization](install-sdo-app-view-dashboards.md). Dashboards in this app provide insights into the four DORA metrics that help measure application release velocity and availability as well as help you monitor and troubleshoot issues in individual phases of your DevOps pipelines.
* [Jira Cloud app](/docs/integrations/app-development/jira-cloud) and [Jira (Server) app](/docs/integrations/app-development/jira). Dashboards in these apps provide insights into the “Plan” phase of the DevOps lifecycle, so you can more effectively plan, assign, track, report, and manage work across multiple teams.
* [Bitbucket app](/docs/integrations/app-development/bitbucket). Dashboards in this app provide insights into Bitbucket issues, pull requests, builds, and deployments.
* [Opsgenie app](/docs/integrations/saas-cloud/opsgenie) and [PagerDuty app](/docs/integrations/saas-cloud/pagerduty-v3). Dashboards in these apps provide insights into how production incidents are being created and resolved.
* [GitHub app](/docs/integrations/app-development/github). Dashboards in this app provide analytics around GitHub branch operations, issues, pull requests, user activity, and security events.
* [Jenkins app](/docs/integrations/app-development/jenkins). Dashboards in this app help you monitor build successes, failures, and Jenkins master and slave server performance.
* [GitLab app](/docs/integrations/app-development/gitlab).  Dashboards in this app provide a complete overview of your GitLab’s builds, deployments, pipelines, issues, merge requests, and commits.
* [CircleCI app](https://circleci.com/docs/2.0/insights-partnerships/#sumo-logic-integration). The CircleCI app for Sumo Logic provides advanced views to track the performance and health of your continuous integration and deployment pipelines.


## DORA Metrics Dashboards

These dashboards calculate four DORA metrics that help measure application release velocity and availability. The Software Development Optimization - DORA Metrics dashboard resides in the top-level folder created at app install time and detailed dashboards that help you drill down into the individual metrics reside in the DORA Metrics folder.

### SDO - DORA Metrics Overview

The **Software Development Optimization - DORA Metrics Overview** dashboard calculates the four key DORA metrics identified in the [State of DevOps](https://services.google.com/fh/files/misc/state-of-devops-2019.pdf) report, which help you measure application development velocity and reliability: Lead Time for Changes, Deployment Frequency, Change Failure Rate, and Time to Restore Service. It shows the current value and trend of each metric, helping you track engineering performance over time.

The four metrics are:

* Lead time, which quantifies how long it takes to go from code commit to completed production deployment. This is identified by the time taken from when a merge commit event occurs to when that commit is successfully deployed to production.
* Deployment Frequency measures how often code is deployed to production.
* Time to restore service measures the average elapsed time from when a service incident occurs to when it is resolved. This is calculated by the time it takes to close a priority 1 or most critical incident once opened.
* Change Failure rate describes the percentage of deployments to production that subsequently requires remediation (For example, by rolling a release back or deploying a hotfix). This is the percentage of the number of priority one or critical incidents to the number of successful deploys to production.

Use this dashboard to:

* Understand the effectiveness of the development and delivery process in terms of application development velocity and reliability.
* Monitor trends for each metric to identify any unexpected peaks and lows.
* Understand how the DORA metrics apply to each team, service, and application environment.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-DORA-Metrics-Overview.png')} alt="SDO - DORA Metrics Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Lead Time

The **Software Development Optimization - Lead Time** dashboard provides insights into the DORA Lead Time for Changes metric, the time from a code change being merged to it running in production. It shows average, median, minimum, and maximum lead times and daily trends, and breaks lead time down by team, service, environment, and repository, helping you identify the repositories and teams with the slowest lead times.

Use this dashboard to:

* Determine the overall lead time.
* Determine which services, teams, repositories, or pipelines affect the overall lead time.
* Monitor lead time trends and quickly identify any unexpected highs and lows.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Lead-Time.png')} alt="SDO - Lead Time dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Deployment Frequency

The **Software Development Optimization - Deployment Frequency** dashboard provides insights into the DORA Deployment Frequency metric by showing how often code is deployed to production. It shows deploys over time, average deploys per week, successful versus failed deploys, a one week comparison, and deploys by repository, helping you understand release cadence and detect unusual changes in deployment activity.

Use this dashboard to:

* Determine the overall deployment frequency.
* Monitor trends of successful and failed deploy to determine how it affects deployment frequency.
* Identify deploys by service, team, and deployment environments (production, test, staging, and similar) to determine areas of improvement.
* Monitor deployment frequency trends and quickly identify any unexpected highs and lows.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Deployment-Frequency.png')} alt="SDO - Deployment Frequency dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Change Failure Rate

The **Software Development Optimization - Change Failure Rate** dashboard provides insights into the DORA Change Failure Rate metric, the percentage of production deploys that result in high priority incidents. It shows the average change failure rate trend, top services by P1 incidents, and a weekly comparison of the top alerting services, helping you identify the services and trends that affect release quality.

Use this dashboard to:

* Determine the overall change failure rate
* Find top services that are impacted by critical incidents so you can allocate resources accordingly.
* Monitor change failure rate trends and identify unexpected highs and lows

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Change-Failure-Rate.png')} alt="SDO - Change Failure Rate dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Time to Restore Service

The **Software Development Optimization - Time to Restore Service** dashboard provides insights into the DORA Time to Restore Service metric, the time it takes to recover from a high priority incident. It shows the average time to restore service and its daily trend, along with P1 incidents by service, helping you identify the services and trends that affect recovery time.

Use this dashboard to:

* Determine the overall time to restore the service DORA metric.
* Determine top services, that are impacted by critical incidents so you can allocate resources accordingly.
* Monitor trends in the time to restore service values and identify unexpected highs and lows.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Time-to-Restore-Service.png')} alt="SDO - Time To Restore Service dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Development & Delivery Times

The **Software Development Optimization - Development & Delivery Times** dashboard helps you monitor development and delivery lead times across the three main phases of development and delivery:

* **Active Development** is the time it takes for developers to begin development on application code and have that code ready for peer review.
* **Review & Merge** is the time it takes for peers to review the code change, the developer to make any necessary changes, and to finally merge the code.
* **Deployment** is the time it takes for merged code changes to be deployed to application environments.

<img src={useBaseUrl('img/sdo/lead-time.png')} alt="SDO - Development and Delivery Times" style={{border: '1px solid gray'}} width="800" />

The dashboard shows average and weekly lead times for each phase and breaks them down by team, service, and environment, helping you find bottlenecks in your delivery process.

Use this dashboard to:

* Measure the throughput and quality of application changes
* Measure the adoption of teams practicing small batch application development and delivery
* Measure the impact of process improvements on application services and environments

#### How each phase of development is measured

The dashboard measures the time code spends in active development, review, and delivery. The method varies from the VCS tools used like BitBucket, GitHub, and GitLab.

**How Active Development is measured:**

* For each merged pull request, measure the time between the first commit push to the time the pull request was ready for review. “Ready for review” is measured by:
 * For Bitbucket and GitLab: The time the PR was created
 * For GitHub: The time the PR was marked as “Ready for Review”

* Average the Active Development time for each PR merged in the given timeframe issued by each team and for each service

**How Review Time is measured:**

* For each merged pull request, measure the time between the pull request being ready for review and it being merged.  “Ready for review” is measured by:
 * For Bitbucket and GitLab: The time the PR was created
 * For GitHub: The time the PR was marked as “Ready for Review”

* Average the Review Time for each PR merged in the given timeframe issued by each team and for each service

**Important limitations:**

For the Active Development and Review & Merge times to be accurate, the following development workflows/practices must be used:

* New application development must be on feature branches and merged into a main branch.
* Pull requests are created when the code change is ready for review, or for GitHub specifically, pull requests are marked as “Ready for Review”.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Development-Delivery-Times.png')} alt="SDO - Development & Delivery Times" style={{border: '1px solid gray'}} width="800" />

## CI/CD Pipeline Monitoring

These dashboards help you monitor and troubleshoot issues in individual phases of your DevOps pipelines. The Software Development Optimization - Pipeline Overview dashboard resides in the top-level folder created at app install time and detailed dashboards that help you drill down into the individual metrics reside in the “CI/CD Pipeline Monitoring” folder.

### SDO - Pipeline Overview

The **Software Development Optimization - Pipeline Overview** dashboard gives you an at-a-glance view of all critical aspects of your DevOps pipelines. It combines alerts, deploys, builds, pull requests, and issues, showing pipeline execution trends, deploy and build status, pull requests by status, and the latest failed deploys, failed builds, critical alerts, and critical issues, helping you quickly spot problems across the pipeline.

Use this dashboard to:

* Quickly identify the most critical and important events in each DevOps phase.
* Monitor trends across all phases and across multiple CI/CD pipelines and investigate any unexpected behavior.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Pipeline-Overview.png')} alt="SDO - Pipeline Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Alerts

The **Software Development Optimization - Alerts** dashboard provides insights into how alerts are created, escalated, and resolved across your incident management tools. It shows alerts created versus closed over time and breaks down alerts by team, service, and priority, helping you spot noisy services, high priority alerts, and trends in incident volume.

Use this dashboard to:

* Quickly identify and drill down into high priority alerts and drill down into them.
* Identify services that are impacted most by production incidents.
* Determine teams that are overloaded with production alerts.
* Monitor trends to identify and drill down into unexpected behavior.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Alerts.png')} alt="SDO - Alerts dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Deployments

The **Software Development Optimization - Deployments** dashboard provides detailed information about all deploy events across your environments. It shows deploy results, successful versus failed deploys, a one day comparison, and the last 10 deployments, and breaks down deploys by repository, service, team, and environment, helping you track release activity and troubleshoot failed deploys.

Use this dashboard to:

* Determine if code was successfully deployed to a given production or non-production environment.
* Identify and drill down into commits that led to failed deployments or that led to production or testing issues.
* Identify which services and teams have the most deployment failures.
* Monitor successful/failure deploy events across repositories, services, teams, and environments.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Deployments.png')} alt="SDO - Deployment dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Builds

The **Software Development Optimization - Builds** dashboard provides insights into the health of your CI builds. It shows successful versus failed builds over time, build results, and build volume by team and service, along with the latest failed and successful builds, helping you identify unstable pipelines and troubleshoot build failures quickly.

Use this dashboard to:

* Speed up software delivery by quickly identifying bottlenecks in build failures.
* Monitor which teams, service, and repositories need more attention than other success/failure rate of builds and identify service, team, and repos.
* Quickly identify code commits that led to failed builds.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Builds.png')} alt="SDO - Builds dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Pipeline Stage Monitoring

The **Software Development Optimization - Pipeline Stage Monitoring** dashboard provides insights into the performance of your CI/CD pipelines. It shows pipeline and stage execution counts, average pipeline and stage durations, failed stages, and the slowest pipeline steps and stages, helping you find bottlenecks and troubleshoot failing stages.

Use this dashboard to:

* Identify which pipelines are taking the longest to complete.
* Drilldown to slowest stages and steps within each pipeline.
* Compare pipeline executions to identify which runs slower or faster than others.
* Identify the failed pipeline stages and steps.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Pipeline-Stage-Monitoring.png')} alt="SDO - Pipeline Stage Monitoring dashboard" style={{border: '1px solid gray'}} width="800" />

### SDO - Pull Requests

The **Software Development Optimization - Pull Requests** dashboard provides insights into how pull requests are created, reviewed, and merged across all your repositories. It shows pull requests created versus merged versus declined, pull requests by target branch, top services and repositories by pull requests, and the top reviewers and slowest pull requests by time to close, helping you find review bottlenecks.

Use this dashboard to:

* Improve the overall software delivery processes by identifying bottlenecks in review processes.
* Identify the individuals and repos that take the longest to close pull requests.
* Analyze trends, and compare created/merged/declined pull requests to understand and optimize the velocity of your software delivery process.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Pull-Requests.png')} alt="SDO - Pull Requests" style={{border: '1px solid gray'}} width="800" />

### SDO - Issues

The **Software Development Optimization - Issues** dashboard provides a detailed view of issues from your issue tracking tools. It shows issue trends, the latest issues, and the issues that took the longest to close, and breaks down issues by type, status, priority, project, and service, along with the average time taken to close issues by project, helping you find prolonged issues and understand where work is piling up.

Use this dashboard to:

* Understand how issues are being created, closed, and reopened.
* Quickly identify issue types, services, and projects that need the most attention.
* Identify how to work in progress could affect your development and delivery lifecycle.
* Get insights into blockers and issues that are taking the longest to resolve.
* Monitor issue creation trends to identify any unexpected behavior.

<img src={useBaseUrl('img/sdo/Software-Development-Optimization-Issues.png')} alt="SDO - Issues" style={{border: '1px solid gray'}} width="800" />

## Upgrade/Downgrade the SDO app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the SDO app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
